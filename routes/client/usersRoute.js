const express = require('express');
const usersController = require('../../controllers/client/usersController');

const Router = express.Router();

Router.route('/not-friend').get(usersController.notFriend);

module.exports = Router;
