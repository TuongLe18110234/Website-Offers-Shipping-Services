const Addons = require('./../models/Addons');

//Import jwt cap quyen truy cap
const jwt = require('jsonwebtoken');

//Giai ma
const bcrypt = require('bcryptjs');


exports.createOne = async (req, res, next) => {
    try {
        // req.Addon

        // const addon = Addons.create({
        //     BusID: '60c9d0906eec542f00c2874a',
        //     Insurance: 20,
        //     Fast: 22,
        //     Fragile: 10,
        //     HighValue: 60,
        //     SeeInside:5,
        // });

        const addon = await Addons.create({... req.body});

        res.status(201).json({
            status: 'success',
            message: 'Created new Addon',
        });
    } catch(error) {
        next(error);
    }
}

exports.getAll = async(req, res, next) => {
    try {
        // req nothing
        const addons = await Addons.find({});

        res.status(200).json({
            status: 'success',
            results: addons.length,
            data: {addons},
        });

    } catch(error) {
        next(error);
    }
}

exports.getOneById = async(req, res, next) => {
    try {
        // req nothing
        const addon = await Addons.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {addon},
        });

    } catch(error) {
        next(error);
    }
}

exports.updateOneById = async(req, res, next) => {
    try {
        // req.RSP and params.id
        const sid = req.params.id;
        const addon = await Addons.findByIdAndUpdate(sid, {...req.body});

        res.status(200).json({
            status: 'success',
            message: 'Updated Addon',
        });

    } catch(error) {
        next(error);
    }
}

exports.deleteOneById = async(req, res, next) => {
    try {
        const sid = req.params.id;
        await Addons.findByIdAndDelete(sid);

        res.status(200).json({
            status: 'success',
            message: 'Deleted',
        })
    } catch(error) {
        next(error);
    }
}