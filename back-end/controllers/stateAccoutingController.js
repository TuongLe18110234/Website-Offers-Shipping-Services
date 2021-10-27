//Import model
const Accounting = require('../models/Accounting');
const StateAccounting = require('../models/StateAccounting');
const e = require('express');

//Ham bat dong bo
exports.createOneStateAccounting = async (req, res, next)=>{
    try{
        const stateAcc = await StateAccounting.create({...req.body, time: new Date, });

        const accounting = await Accounting.findByIdAndUpdate(stateAcc.accId, {
            lastMileston: stateAcc.mileston,
            lastTime: stateAcc.time
        }, {new: true, runValidator: true});

        res.status(200).json({
            status: 'success',
            data: { stateAcc }
        })
    } catch(error){
        next(error);
    }
}