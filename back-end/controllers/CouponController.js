const Coupon = require('./../models/Coupon');

//Import jwt cap quyen truy cap
const jwt = require('jsonwebtoken');

//Giai ma
const bcrypt = require('bcryptjs');


exports.createOne = async (req, res, next) => {
    try {
        // req.Coupon

        // const coupon = Coupon.create({
        //     CouponCode: 'FREE50',
        //     TimeBegin: '2021-06-16T09:53:53.533+00:00',
        //     TimeEnd: '2021-06-18T09:53:53.533+00:00',
        //     TheRemainingAmount: 99,
        //     ListCustomerUsed: [{
        //         CusID: '60c7785cb6206000155cbabb',
        //     }],
        //     Propotion: 15,
        //     MaxValue: 50,
        // });

        const coupon = await Coupon.create({... req.body});

        res.status(201).json({
            status: 'success',
            message: 'Created new Coupon',
        });
    } catch(error) {
        next(error);
    }
}

exports.getAll = async(req, res, next) => {
    try {
        // req nothing
        const coupons = await Coupon.find({});

        res.status(200).json({
            status: 'success',
            results: coupons.length,
            data: {coupons},
        });

    } catch(error) {
        next(error);
    }
}

exports.getOneById = async(req, res, next) => {
    try {
        // req nothing
        const coupon = await Coupon.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {coupon},
        });

    } catch(error) {
        next(error);
    }
}

exports.updateOneById = async(req, res, next) => {
    try {
        // req.RSP and params.id
        const sid = req.params.id;
        const coupon = await Coupon.findByIdAndUpdate(sid, {...req.body});

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
        await Coupon.findByIdAndDelete(sid);

        res.status(200).json({
            status: 'success',
            message: 'Deleted',
        })
    } catch(error) {
        next(error);
    }
}