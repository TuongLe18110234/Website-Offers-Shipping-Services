const express = require('express');

const {getAllDistricts ,getAllDistances, caculateDistanceAndCost}
         = require('../../controllers/districtController');

const {verifyToken} = require('../../middlewares/verifyToken');

const Router = express.Router();

// State
Router.route('/').get(verifyToken, getAllDistricts);

// State
Router.route('/get-all-distances').get(verifyToken, getAllDistances);

// State
Router.route('/caculate-distance-and-cost/:from/:to/:weight').get(verifyToken, caculateDistanceAndCost);

module.exports = Router;