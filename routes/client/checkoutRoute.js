const express = require('express');
const checkoutController = require('../../controllers/client/checkoutController');

const Router = express.Router();

Router.route('/').get(checkoutController.index);

Router.route('/order').post(checkoutController.order);

module.exports = Router;
