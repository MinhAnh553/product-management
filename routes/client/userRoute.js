const express = require('express');
const userController = require('../../controllers/client/userController');
const userValidation = require('../../validations/client/userValidation');

const Router = express.Router();

Router.route('/register')
    .get(userController.registerPage)
    .post(userValidation, userController.registerUser);

module.exports = Router;
