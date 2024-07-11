const express = require('express');
const cartController = require('../../controllers/client/cartController');

const Router = express.Router();

Router.route('/add/:idProduct').post(cartController.addProduct);

module.exports = Router;
