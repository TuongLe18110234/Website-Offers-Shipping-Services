const express = require('express');

const Router = express.Router();

const {createOne, getAll, getOneById, updateOneById, deleteOneById,
    approveRegisterBusines} = require('./../../../controllers/RegisteredInfoController');


Router.route('/').post(createOne);

Router.route('/approve-register-busines/:rid').post(approveRegisterBusines);

Router.route('/').get(getAll);
Router.route('/:regid').get(getOneById);
Router.route('/:regid').put(updateOneById);
Router.route('/:regid').delete(deleteOneById);


module.exports = Router;