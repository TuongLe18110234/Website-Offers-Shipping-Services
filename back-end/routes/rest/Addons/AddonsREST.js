const express = require('express');

const Router = express.Router();

const {createOne, getAll, getOneById, updateOneById, deleteOneById} = require('./../../../controllers/AddonsController');


Router.route('/').post(createOne);
Router.route('/').get(getAll);
Router.route('/:id').get(getOneById);
Router.route('/:id').put(updateOneById);
Router.route('/:id').delete(deleteOneById);


module.exports = Router;