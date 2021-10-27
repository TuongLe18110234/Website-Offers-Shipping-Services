const express = require('express');

const {getAllAccountingByMonth, getOneAccountingByID, updateAccountingById,
    getOneAccountingByBusIdByMonth}
         = require('../../controllers/accoutingController');

const {verifyToken} = require('../../middlewares/verifyToken');

const Router = express.Router();

// Befor create Order need to verify token
Router.route('/get-all/:month').get(verifyToken, getAllAccountingByMonth);

// Befor create Order need to verify token
Router.route('/get-all-by-business/:month').get(verifyToken, getOneAccountingByBusIdByMonth);

// Befor create Order need to verify token
Router.route('/:accId').get(verifyToken, getOneAccountingByID).put(verifyToken, updateAccountingById);

module.exports = Router;