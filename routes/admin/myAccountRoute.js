const express = require('express');
const Router = express.Router();
const multer = require('multer');

const myAccountController = require('../../controllers/admin/myAccountController');
const uploadCloudMiddleware = require('../../middlewares/uploadCloudMiddleware');
const fileUpload = multer();

Router.route('/').get(myAccountController.index);
Router.route('/edit')
    .get(myAccountController.editPage)
    .patch(
        fileUpload.single('avatar'),
        uploadCloudMiddleware.uploadCloud,
        myAccountController.edit
    );

module.exports = Router;
