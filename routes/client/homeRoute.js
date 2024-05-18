const express = require('express');
const Router = express.Router();
const homeController = require('../../controllers/client/homeController');

Router.route('/').get(homeController.index);

module.exports = Router;
