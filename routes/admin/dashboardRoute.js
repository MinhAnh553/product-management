const express = require('express');
const Router = express.Router();
const dashboardController = require('../../controllers/admin/dashboardController');

Router.route('/').get(dashboardController.index);

module.exports = Router;
