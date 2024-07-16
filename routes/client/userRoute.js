const express = require('express');
const userController = require('../../controllers/client/userController');
const userValidation = require('../../validations/client/userValidation');
const authMiddleware = require('../../middlewares/client/authMiddleware');

const Router = express.Router();

Router.route('/register')
    .get(userController.registerPage)
    .post(userValidation.register, userController.registerUser);

Router.route('/login')
    .get(userController.loginPage)
    .post(userValidation.login, userController.loginUser);

Router.route('/logout').get(userController.logoutUser);

Router.route('/password/forgot')
    .get(userController.forgotPasswordPage)
    .post(userController.forgotPassword);

Router.route('/password/otp')
    .get(userController.otpPasswordPage)
    .post(userController.otpPassword);

Router.route('/password/reset')
    .get(userController.resetPasswordPage)
    .post(userValidation.resetPassword, userController.resetPassword);

Router.route('/user-info').get(authMiddleware, userController.userInfo);

module.exports = Router;
