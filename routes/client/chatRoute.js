const express = require('express');
const chatController = require('../../controllers/client/chatController');

const Router = express.Router();

Router.route('/').get(chatController.index);

module.exports = Router;
