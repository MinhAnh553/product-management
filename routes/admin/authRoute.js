const express = require('express');
const Router = express.Router();

const authController = require('../../controllers/admin/authController');

Router.route('/login').get(authController.pageLogin).post(authController.login);

Router.route('/logout').get(authController.logout);

module.exports = Router;
