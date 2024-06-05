const express = require('express');
const Router = express.Router();
const multer = require('multer');

const productCategoryController = require('../../controllers/admin/productCategoryController');
const uploadCloudMiddleware = require('../../middlewares/uploadCloudMiddleware');
const fileUpload = multer();

Router.route('/').get(productCategoryController.index);

Router.route('/create')
    .get(productCategoryController.pageCreate)
    .post(
        fileUpload.single('thumbnail'),
        uploadCloudMiddleware.uploadCloud,
        productCategoryController.create
    );

module.exports = Router;
