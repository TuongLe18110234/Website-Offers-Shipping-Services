const express = require('express');

const {getAllOrders, createOneOrder, updateOneOrder, deleteOneOrder, getAllOrdersByUser,
    countOrderByUser, getTotalFareOrderByUser, getOneOrderbyId,
    getTotalFare, getTotalFareByDate, countOrderByMonth,
    caculateBusinessOrderByDate, getAllOrdersByBusiness, getAllOrdersByBusinessByMonth,
    getFareByBusiness, countOrderByMonthByBusinessId, getAllOrderByBusinessByDate}
         = require('../../controllers/orderController');

const {verifyToken} = require('../../middlewares/verifyToken');

const Router = express.Router();

// Befor create Order need to verify token
Router.route('/').get(verifyToken, getAllOrdersByUser).post(verifyToken, createOneOrder);

// Befor get all order to verify token
Router.route('/all').get(verifyToken, getAllOrders);

// Befor create Order need to verify token
Router.route('/count').get(verifyToken, countOrderByUser);

// Get total fare by user id
Router.route('/fare').get(verifyToken, getTotalFareOrderByUser);

//------------------------For admin-------------------------
// Get total fare
Router.route('/total-fare').get(verifyToken, getTotalFare);

// Get total fare 
Router.route('/total-fare-by-date/:startDate/:endDate').get(verifyToken, getTotalFareByDate);

//date count Order By Current Month
Router.route('/count-order-by-month/:month').get(verifyToken, countOrderByMonth);

//caculate Business OrderBy Date
Router.route('/caculate-business-order-by-date/:startDate/:endDate').get(verifyToken, caculateBusinessOrderByDate);

//Get orders by business
Router.route('/business/get-all/:busId').get(verifyToken, getAllOrdersByBusiness);

//Get orders by business by month
Router.route('/business/get-all-by-month/:busId/:month').get(verifyToken, getAllOrdersByBusinessByMonth);


//-------------------------------------Business-------------------
//Get total fare by business
Router.route('/business/fare').get(verifyToken, getFareByBusiness);

//date count Order By Current Month by business id
Router.route('/business/count-order-by-month/:month').get(verifyToken, countOrderByMonthByBusinessId);

//Get orders by business by date
Router.route('/business/get-all-by-date/:start/:end').get(verifyToken, getAllOrderByBusinessByDate);

//Truyen vao id
Router.route('/:orderId').get(verifyToken, getOneOrderbyId).put(verifyToken, updateOneOrder).delete(verifyToken, deleteOneOrder);

module.exports = Router;