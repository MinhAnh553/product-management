const express = require('express');
const Router = express.Router();
const multer = require('multer');

const productCategoryController = require('../../controllers/admin/productCategoryController');
const uploadCloudMiddleware = require('../../middlewares/admin/uploadCloudMiddleware');
const fileUpload = multer();

Router.route('/').get(productCategoryController.index);

Router.route('/create')
    .get(productCategoryController.pageCreate)
    .post(
        fileUpload.single('thumbnail'),
        uploadCloudMiddleware.uploadCloud,
        productCategoryController.create
    );

Router.route('/edit/:id')
    .get(productCategoryController.pageEdit)
    .patch(
        fileUpload.single('thumbnail'),
        uploadCloudMiddleware.uploadCloud,
        productCategoryController.edit
    );

module.exports = Router;
