const express = require('express');
const router  = express.Router();
const authController = require('../controller/auth.controller');

//the actual api register link:->  api/auth/register
router.post('/register',authController.UserRegister); 

//the actual api login link:->  api/auth/login
router.post('/login',authController.UserLogin);
module.exports = router; 