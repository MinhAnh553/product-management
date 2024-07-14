const express = require('express');
const userController = require('../../controllers/client/userController');
const userValidation = require('../../validations/client/userValidation');

const Router = express.Router();

Router.route('/register')
    .get(userController.registerPage)
    .post(userValidation.register, userController.registerUser);

Router.route('/login')
    .get(userController.loginPage)
    .post(userValidation.login, userController.loginUser);

Router.route('/logout').get(userController.logoutUser);

module.exports = Router;
