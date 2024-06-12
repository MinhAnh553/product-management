const express = require('express');
const Router = express.Router();

const roleController = require('../../controllers/admin/roleController');

Router.route('/').get(roleController.index);
Router.route('/create')
    .get(roleController.pageCreate)
    .post(roleController.create);
Router.route('/edit/:id')
    .get(roleController.pageEdit)
    .patch(roleController.edit);

module.exports = Router;
