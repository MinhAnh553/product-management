const express = require('express');
const usersController = require('../../controllers/client/usersController');

const Router = express.Router();

Router.route('/not-friend').get(usersController.notFriend);

Router.route('/request').get(usersController.request);

Router.route('/accept').get(usersController.accept);

Router.route('/friends').get(usersController.friends);

module.exports = Router;
