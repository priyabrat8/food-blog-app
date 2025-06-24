const express = require('express');
const {loginUser, signupUser, logoutUser, getUser} = require('../controller/user.js');
const router = express.Router();

router.post('/login',loginUser);
router.post('/signup',signupUser);
router.post('/logout',logoutUser);
router.get('/user/:id',getUser);
router.use((err, req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;    