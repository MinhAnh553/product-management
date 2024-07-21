const express = require('express');
const Router = express.Router();
const multer = require('multer');

const productController = require('../../controllers/admin/productController');
const productValidation = require('../../validations/admin/productValidation');
const uploadCloudMiddleware = require('../../middlewares/admin/uploadCloudMiddleware');
const fileUpload = multer();

Router.route('/').get(productController.index);

Router.route('/change-status/:status/:id').patch(
    productController.changeStatus
);
Router.route('/change-multi').patch(productController.changeMulti);

Router.route('/delete/:id').delete(productController.deleteItem);

Router.route('/create')
    .get(productController.pageCreate)
    .post(
        fileUpload.single('thumbnail'),
        uploadCloudMiddleware.uploadCloud,
        productValidation.createNew,
        productController.createProduct
    );

Router.route('/edit/:id')
    .get(productController.pageEdit)
    .patch(
        fileUpload.single('thumbnail'),
        uploadCloudMiddleware.uploadCloud,
        productValidation.createNew,
        productController.updateProduct
    );

Router.route('/detail/:id').get(productController.detailProduct);

module.exports = Router;
