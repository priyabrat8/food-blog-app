const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'];

    try {
    if (token && token.startsWith('Bearer ')) {
        token = token.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET,(err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Invalid token!' });
            }else{
            req.user = decoded; // Attach user info to request object
            } 
        });
        next(); // Proceed to the next middleware or route handler
    }else {
        return res.status(400).json({ message: 'Invalid token!' });
    }
} catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = verifyToken;