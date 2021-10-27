const express = require('express');

const {createOneStateAccounting}
         = require('../../controllers/stateAccoutingController');

const {verifyToken} = require('../../middlewares/verifyToken');

const Router = express.Router();

// State
Router.route('/').post(verifyToken, createOneStateAccounting);

module.exports = Router;