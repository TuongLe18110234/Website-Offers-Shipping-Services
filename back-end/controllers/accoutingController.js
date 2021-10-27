//Import model
const Accounting = require('../models/Accounting');
const StateAccounting = require('../models/StateAccounting');
const Order = require('../models/Order');
const StateOrder = require('../models/StateOrder');
const RegisteredSP = require('../models/RegisteredSP');
const User = require('../models/User');
const e = require('express');

//------------------------------------Order for user---------------------------------//
//Get all order
exports.getAllAccountingByMonth = async (req, res, next) =>{
    try{
        var {month} = req.params;

        var curentDate = new Date();
        var date = new Date(month);
        var firstDate = new Date(month);
        var lastDate = new Date(month);
        
        firstDate.setDate(date.getDate() - 1);
        lastDate.setMonth(date.getMonth() + 1);

        const accountings = await Accounting.find({
            month: month
        });

        const businesses = await User.find({role: 'business'});
        const orders = await Order.find({
            lastMileston: "Đã giao",
            createdAt: { 
                $gte: firstDate, 
                $lte: lastDate 
            }
        });

        businesses.forEach(business => {
            var isAddNew = true;
            var currentAccounting;

            accountings.forEach(accounting=> {
                if(accounting.busId == business._id){
                    isAddNew = false;
                    currentAccounting = accounting;
                }
            });

            var totalOrder = 0;
            var totalCost = 0;
            var payBack = 0;
            orders.forEach(order => {
                if (order.busId == business._id){
                    totalCost += order.fare;
                    totalOrder += 1;
        
                    if(order.packageId == "Gói cơ bản"){
                        payBack += order.fare * 0.05;
                    }
                }
            });

            if(isAddNew){
                currentAccounting = new Accounting();
                currentAccounting.busId = business._id;
                currentAccounting.busName = business.name;
                currentAccounting.totalOrder = totalOrder;
                currentAccounting.totalCost = totalCost;
                currentAccounting.payBack = payBack;
                currentAccounting.actuallyReceived = totalCost - payBack;
                currentAccounting.lastMileston = "Chưa gửi hạch toán";
                currentAccounting.lastTime = curentDate;
                currentAccounting.month = month;
                currentAccounting.feedBack = "Chưa có phản hồi";

                currentAccounting.save(function (err, accounting) {
                    if (err) return console.error(err);
                        console.log(accounting.busName + " saved to bookstore collection.");
                });

                var stateAccounting = new StateAccounting({
                    accId: currentAccounting._id,
                    mileston: currentAccounting.lastMileston,
                    time: currentAccounting.lastTime
                });
                stateAccounting.save(function (err, stateAccounting) {
                    if (err) return console.error(err);
                        console.log(stateAccounting.accId + " saved to bookstore collection.");
                });

                accountings.push(currentAccounting);
            } else {
                currentAccounting.totalOrder = totalOrder;
                currentAccounting.totalCost = totalCost;
                currentAccounting.payBack = payBack;
                currentAccounting.actuallyReceived = totalCost - payBack;

                currentAccounting.save(function (err, accounting) {
                    if (err) return console.error(err);
                    console.log(accounting.busName + " saved to bookstore collection.");
                  });
            }
        });

        res.status(200).json({
            status:'success',
            results: accountings.length,
            data:{accountings}
        })
    } catch(error){
        res.json(error);
    }
}

//Get accounting
exports.getOneAccountingByID = async (req, res, next)=>{
    try{
        const data = {accounting: null, states: null}
        const {accId} = req.params;
        
        data.accounting = await Accounting.findOne({_id: accId});
        data.states = await StateAccounting.find({accId: accId});

        res.status(200).json({
            status:'success',
            data: data
        })
    } catch(error){
        next(error);
    }
}

//Update accounting
exports.updateAccountingById = async (req, res, next)=>{
    try{
        const {accId} = req.params;

        const accounting = await Accounting.findByIdAndUpdate(accId, {...req.body}, {new: true, runValidator: true});

        res.status(200).json({
            status: 'success',
            data: { accounting }
        })
    } catch(error){
        next(error);
    }
}

//Get accounting
exports.getOneAccountingByBusIdByMonth = async (req, res, next)=>{
    try{
        const {userId} = req.user;
        const data = {accounting: null, states: null}

        var {month} = req.params;
        
        data.accounting = await Accounting.findOne({
            busId: userId,
            month: month
        });

        data.states = await StateAccounting.find({accId: data.accounting._id});

        res.status(200).json({
            status:'success',
            data: data
        })
    } catch(error){
        next(error);
    }
}