const express = require('express');
const searchController = require('../../controllers/client/searchController');

const Router = express.Router();

Router.route('/').get(searchController.search);

module.exports = Router;
