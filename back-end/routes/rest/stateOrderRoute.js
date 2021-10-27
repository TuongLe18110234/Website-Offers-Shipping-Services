const express = require('express');

const {createStateOrder}
         = require('../../controllers/stateOrderController');

const {verifyToken} = require('../../middlewares/verifyToken');

const Router = express.Router();

// State
Router.route('/').post(verifyToken, createStateOrder);

module.exports = Router;