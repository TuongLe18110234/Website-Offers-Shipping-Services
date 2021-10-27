const RegisteredSP = require('./../models/RegisteredSP');
const ServicePacks = require('./../models/ServicePacks');
const User = require('../models/User');

//Import jwt cap quyen truy cap
const jwt = require('jsonwebtoken');

//Giai ma
const bcrypt = require('bcryptjs');


exports.createOne = async (req, res, next) => {
    try {
        // req.RSP

        // const rsp = RegisteredSP.create({
        //     BusID: '60c9d0906eec542f00c2874a',
        //     PackID: '60c9ca314bae12935c1f18dd',
        //     DateBegin: '2021-06-16T09:53:53.533+00:00',
        //     DateEnd: '2021-09-16T09:53:53.533+00:00',
        //     Pay: 505,
        // });

        const sp = await ServicePacks.findById(req.body.PackID);

        var startDate = new Date();
        var endDate = new Date();
        endDate.setMonth(endDate.getMonth() + sp.Period);
        
        var rsp = new RegisteredSP({
            BusID: req.body.BusID,
            PackID: sp._id,
            DateBegin: startDate,
            DateEnd: endDate,
            Pay: sp.Cost,
            MaxOrders: sp.MaxOrders,
            CountOrders: 0,
            StateUse: "Sử dụng"
        })

        rsp.save();

        res.status(201).json({
            status: 'success',
            message: rsp,
        });
    } catch(error) {
        next(error);
    }
}

exports.getAll = async(req, res, next) => {
    try {
        // req nothing
        const rsps = await RegisteredSP.find({});

        res.status(200).json({
            status: 'success',
            results: rsps.length,
            data: {rsps},
        });

    } catch(error) {
        next(error);
    }
}

exports.getOneById = async(req, res, next) => {
    try {
        // req nothing
        const rsp = await RegisteredSP.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {rsp},
        });

    } catch(error) {
        next(error);
    }
}

exports.updateOneById = async(req, res, next) => {
    try {
        // req.RSP and params.id
        const sid = req.params.id;
        const rsp = await RegisteredSP.findByIdAndUpdate(sid, {...req.body});

        res.status(200).json({
            status: 'success',
            message: 'Updated SP',
        });

    } catch(error) {
        next(error);
    }
}

exports.deleteOneById = async(req, res, next) => {
    try {
        const sid = req.params.id;
        await RegisteredSP.findByIdAndDelete(sid);

        res.status(200).json({
            status: 'success',
            message: 'Deleted',
        })
    } catch(error) {
        next(error);
    }
}

// --------------------FOR ADMIN------------------------
// Caculate business service packge by date
exports.groupByBusinessByDate = async (req, res, next) =>{
    try{
        var {start} = req.params;
        var {end} = req.params;

        var startDate = new Date(start);
        var endDate = new Date(end);

        startDate.setDate(startDate.getDate() -1);
        endDate.setDate(endDate.getDate() + 1);

        var businessPack = [];
        const businesses = await User.find({role: 'business'});
        const registerSps = await RegisteredSP.find({
            createdAt: { 
                $gte: startDate, 
                $lte: endDate 
            }
        });

        var count = 0;
        var totalPay = 0;
        businesses.forEach(business => {

            registerSps.forEach(registerSp => {
                if(registerSp.BusID == business._id) {
                    count += 1;
                    totalPay += registerSp.Pay;
                    businessPack.push({
                        name: business.name,
                        pay: registerSp.Pay,
                        percent: 0
                    })
                }
            });
        });

        businessPack.forEach(element => {
            element.percent = (element.pay/totalPay)*100;
        });

        res.status(200).json({
            status:'success',
            totalRegister: count,
            totalPay: totalPay,
            data: {businessPack}
        })
    } catch(error){
        res.json(error);
    }
}

//--------------------------------For business
// Lấy danh sách các đơn đăng ký còn hạng để sử dụng.
exports.getAllByBusId = async(req, res, next) => {
    try {
        const {busId} = req.params;

        var currentDate = new Date();

        // req nothing
        const rsps = await RegisteredSP.find({
            BusID: busId,
            DateEnd: { 
                $gte: currentDate
            }
        }).populate('PackID', 'Name');

        res.status(200).json({
            status: 'success',
            results: rsps.length,
            data: {rsps},
        });

    } catch(error) {
        next(error);
    }
}

// Thay đổi trạng thái đơn đăng ký
exports.changeStateRSP = async(req, res, next) => {
    try {
        const {rspId} = req.params;
        const {userId} = req.user;

        var currentDate = new Date();

        // req nothing
        const rsps = await RegisteredSP.find({
            BusID: userId,
            DateEnd: { 
                $gte: currentDate
            }
        }).populate('PackID', 'Name');

        rsps.forEach(element => {
            if(element._id == rspId){
                element.StateUse = "Đang dùng";
            } else{
                element.StateUse = "Sử dụng";
            }
            element.save();
        });

        res.status(200).json({
            status: 'success',
            data: "Change state successfully"
        });

    } catch(error) {
        next(error);
    }
}