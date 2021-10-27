const express = require('express');

//Add login, register
const {getAllUsers, login, register, getCurrentUser, getCurentUserInfo, updateCurrentUser,
    changePassword, getAllCustormers, getAllBusinesses} = require('../../controllers/authController');
const { checkCurrentUser } = require('../../middlewares/checkCurrentUser');
const { verifyToken } = require('../../middlewares/verifyToken');

const Router = express.Router();

Router.route('/register').post(register);
Router.route('/login').post(login);
// Check curent user (Midleware)
Router.route('/').get(checkCurrentUser, getCurrentUser);

// Get and update user info
Router.route('/info').get(checkCurrentUser, getCurentUserInfo).post(checkCurrentUser, updateCurrentUser);

// Get all user
Router.route('/users').get(checkCurrentUser, getAllUsers);

// Chang password
Router.route('/change-password').put(verifyToken, changePassword);

// Get all customer
Router.route('/customers').get(verifyToken, getAllCustormers);

// Get all business
Router.route('/businesses').get(verifyToken, getAllBusinesses);

module.exports = Router;