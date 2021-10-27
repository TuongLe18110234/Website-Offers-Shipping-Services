const express = require('express');

const Router = express.Router();

const {createOne, getAll, getOneById, updateOneById, deleteOneById,
    getAllByBusiness} = require('./../../../controllers/FaresController');

const {verifyToken} = require('../../../middlewares/verifyToken');

Router.route('/').post(verifyToken, createOne);
Router.route('/').get(getAll);

Router.route('/get-all/:busId').get(getAllByBusiness);

Router.route('/:id').get(getOneById);
Router.route('/:id').put(updateOneById);
Router.route('/:id').delete(deleteOneById);


module.exports = Router;