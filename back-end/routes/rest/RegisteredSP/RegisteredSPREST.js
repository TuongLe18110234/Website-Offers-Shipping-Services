const express = require('express');

const Router = express.Router();

const {createOne, getAll, getOneById, updateOneById, deleteOneById,
    groupByBusinessByDate, getAllByBusId, changeStateRSP} = require('./../../../controllers/RegisteredSPController');

const {verifyToken} = require('../../../middlewares/verifyToken');

Router.route('/').post(createOne);
Router.route('/').get(getAll);

Router.route('/group-by-business-by-date/:start/:end').get(groupByBusinessByDate);

Router.route('/business/:busId').get(getAllByBusId);

Router.route('/change-state/:rspId').put(verifyToken, changeStateRSP);

Router.route('/:id').get(getOneById);
Router.route('/:id').put(updateOneById);
Router.route('/:id').delete(deleteOneById);


module.exports = Router;