const express = require('express');
const Router = express.Router();
const multer = require('multer');

const accountController = require('../../controllers/admin/accountController');
const uploadCloudMiddleware = require('../../middlewares/uploadCloudMiddleware');
const fileUpload = multer();

Router.route('/').get(accountController.index);
Router.route('/create')
    .get(accountController.createPage)
    .post(
        fileUpload.single('avatar'),
        uploadCloudMiddleware.uploadCloud,
        accountController.createAccount
    );

module.exports = Router;
