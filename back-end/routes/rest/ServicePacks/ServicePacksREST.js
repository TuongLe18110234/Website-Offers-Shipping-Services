const express = require('express');

const Router = express.Router();

const {createOne, getAll, getOneById, updateOneById, deleteOneById} = require('./../../../controllers/ServicePackController');


Router.route('/').post(createOne);
Router.route('/').get(getAll);
Router.route('/:spid').get(getOneById);
Router.route('/:spid').put(updateOneById);
Router.route('/:spid').delete(deleteOneById);


module.exports = Router;