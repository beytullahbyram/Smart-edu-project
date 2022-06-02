const express = require('express');
const User = require('../models/User');

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const { body } = require('express-validator');

const router = express.Router();
router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please enter your name'),

        body('email').isEmail().withMessage('Please enter email')
        .custom((userEmail)=>{
            return User.findOne({email:userEmail}).then(user =>{
                if(user){
                    return Promise.reject('Email is already exists')
                }
            })
        }),

        body('password').not().isEmpty().withMessage('Please enter your password'),
    ]
    ,authController.createUser) //localhost:3000/users/signup
router.route('/login').post(authController.loginUser) //localhost:3000/users/lgin
router.route('/logout').get(authController.logoutUser) //localhost:3000/users/logout
router.route('/dashboard').get(authMiddleware,authController.getDashboardPage) //localhost:3000/users/dashboard

module.exports = router