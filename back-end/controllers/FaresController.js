const Fares = require('./../models/Fares');

//Import jwt cap quyen truy cap
const jwt = require('jsonwebtoken');

//Giai ma
const bcrypt = require('bcryptjs');


exports.createOne = async (req, res, next) => {
    try {

        const {userId} = req.user;

        if(req.body.minValue == null){
            req.body.minValue = 0
        }

        if(req.body.maxValue == null){
            req.body.maxValue = 0
        }
        
        if(req.body.constraints == null){
            req.body.constraints = 0
        }

        const fare = await Fares.create({...req.body, busId: userId});

        res.status(201).json({
            status: 'success',
            data: fare,
        });
    } catch(error) {
        next(error);
    }
}

exports.getAll = async(req, res, next) => {
    try {
        // req nothing
        const fares = await Fares.find({});

        res.status(200).json({
            status: 'success',
            results: fares.length,
            data: {fares},
        });

    } catch(error) {
        next(error);
    }
}

exports.getOneById = async(req, res, next) => {
    try {
        // req nothing
        const fare = await Fares.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {fare},
        });

    } catch(error) {
        next(error);
    }
}

exports.updateOneById = async(req, res, next) => {
    try {
        // req.Fare and params.id
        const sid = req.params.id;
        const fare = await Fares.findByIdAndUpdate(sid, {...req.body});

        res.status(200).json({
            status: 'success',
            message: 'Updated Coupon',
        });

    } catch(error) {
        next(error);
    }
}

exports.deleteOneById = async(req, res, next) => {
    try {
        const sid = req.params.id;
        await Fares.findByIdAndDelete(sid);

        res.status(200).json({
            status: 'success',
            message: 'Deleted',
        })
    } catch(error) {
        next(error);
    }
}

exports.getAllByBusiness = async(req, res, next) => {
    try {
        // req nothing
        const {busId} = req.params;

        const fares = await Fares.find({busId: busId});

        res.status(200).json({
            status: 'success',
            results: fares.length,
            data: {fares},
        });

    } catch(error) {
        next(error);
    }
}