const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
    const {email, password, username} = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({message: 'Email, password and username are required'});
    }

    const user = await User.findOne({email});
    if (user) {
        return res.status(400).json({message: 'User already exists'});
    }

    if (password.length < 6) {
        return res.status(400).json({message: 'Password must be at least 6 characters long'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
    const newUser = await User.create({username, email, password: hashedPassword});
    let token = jwt.sign({id: newUser._id,email}, process.env.JWT_SECRET, {expiresIn: '20h'});
    let userData = {
            email: newUser.email,
            username: newUser.username,
            id: newUser._id
        };
    res.status(201).json({user: userData, token});
}catch(error){
    res.status(500).json({message: 'Error in creating user'});
}
    
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Email and password are required'});
    }
    
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        let token = jwt.sign({id: user._id, email}, process.env.JWT_SECRET, {expiresIn: '24h'});
        let userData = {
            email: user.email,
            username: user.username,
            id: user._id
        };
        return res.status(200).json({user: userData, token});
    } else {
        return res.status(400).json({message: 'Invalid email or password'});
    }
};

const getUser = async (req, res) => {
    try{
    const user = await User.findById(req.params.id);
    res.json({email: user.email, username: user.username});
} catch(error) {
    res.status(404).json({message: 'User not found'});
}
};

const logoutUser = async (req, res) => {};

module.exports = {
    signupUser,
    loginUser,
    getUser,
    logoutUser
};