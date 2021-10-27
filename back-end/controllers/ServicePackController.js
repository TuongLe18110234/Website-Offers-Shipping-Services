const ServicePacks = require('./../models/ServicePacks');

//Import jwt cap quyen truy cap
const jwt = require('jsonwebtoken');

//Giai ma
const bcrypt = require('bcryptjs');


exports.createOne = async (req, res, next) => {
    try {
        // req.SP

        // const sp = ServicePacks.create({
        //     Cost: 1500,
        //     Period: 12,
        //     MaxOrders: 300,
        // });

        const sp = await ServicePacks.create({... req.body});

        res.status(201).json({
            status: 'success',
            message: {sp},
        });
    } catch(error) {
        next(error);
    }
}

exports.getAll = async(req, res, next) => {
    try {
        // req nothing
        const sps = await ServicePacks.find({});

        res.status(200).json({
            status: 'success',
            results: sps.length,
            data: {sps},
        });

    } catch(error) {
        next(error);
    }
}

exports.getOneById = async(req, res, next) => {
    try {
        // req nothing
        const sp = await ServicePacks.findById(req.params.spid);

        res.status(200).json({
            status: 'success',
            data: {sp},
        });

    } catch(error) {
        next(error);
    }
}

exports.updateOneById = async(req, res, next) => {
    try {
        // req.RI and params.id
        const sid = req.params.spid;
        const sp = await ServicePacks.findByIdAndUpdate(sid, {...req.body});

        res.status(200).json({
            status: 'success',
            message: {sp},
        });

    } catch(error) {
        next(error);
    }
}

exports.deleteOneById = async(req, res, next) => {
    try {
        const sid = req.params.spid;
        await ServicePacks.findByIdAndDelete(sid);

        res.status(200).json({
            status: 'success',
            message: 'Deleted service',
        })
    } catch(error) {
        next(error);
    }
}