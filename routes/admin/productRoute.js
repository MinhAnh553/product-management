const express = require('express');
const Router = express.Router();
const multer = require('multer');

const productController = require('../../controllers/admin/productController');
const productValidation = require('../../validations/admin/productValidation');
const multerStorage = require('../../helpers/multerStorage');
const upload = multer({ storage: multerStorage() });

Router.route('/').get(productController.index);

Router.route('/change-status/:status/:id').patch(
    productController.changeStatus
);
Router.route('/change-multi').patch(productController.changeMulti);

Router.route('/delete/:id').delete(productController.deleteItem);

Router.route('/create')
    .get(productController.pageCreate)
    .post(
        upload.single('thumbnail'),
        productValidation.createNew,
        productController.createProduct
    );

Router.route('/edit/:id')
    .get(productController.pageEdit)
    .patch(
        upload.single('thumbnail'),
        productValidation.createNew,
        productController.updateProduct
    );

module.exports = Router;
