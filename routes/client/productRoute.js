const express = require('express');
const Router = express.Router();
const productController = require('../../controllers/client/productController');

Router.route('/').get(productController.index);

Router.route('/:slugCategory').get(productController.categoryPage);

// Router.route('/:slug').get(productController.detailProduct);

module.exports = Router;
