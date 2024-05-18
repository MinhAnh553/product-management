const express = require('express');
const Router = express.Router();
const productController = require('../../controllers/client/productController');

Router.route('/').get(productController.index);

module.exports = Router;
