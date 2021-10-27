//Import model
const Order = require('../models/Order');
const StateOrder = require('../models/StateOrder');
const e = require('express');

//Ham bat dong bo
exports.createStateOrder = async (req, res, next)=>{
    try{
        var stateOrder =  new StateOrder();
        stateOrder.orderId = req.body.orderId;
        stateOrder.mileston = req.body.mileston;
        stateOrder.time = new Date();

        stateOrder.save(function (err, stateOrder) {
            if (err) return console.error(err);
                console.log(stateOrder.orderId + " saved to bookstore collection.");
        });

        var lastMileston = "";
        if(stateOrder.mileston == "Tiếp nhận đơn hàng"){
            lastMileston = "Chờ lấy hàng";
        } else if(stateOrder.mileston == "Lấy hàng"){
            lastMileston = "Đang giao";
        } else if(stateOrder.mileston == "Giao hàng thành công"){
            lastMileston = "Đã giao";
        } else if(stateOrder.mileston == "Hủy đơn hàng"){
            lastMileston = "Đã hủy";
        }
        
        const order = await Order.findByIdAndUpdate(stateOrder.orderId, {lastMileston: lastMileston}, {new: true, runValidator: true});

        res.status(200).json({
            status:'success',
            data:{stateOrder},
            order: {order}
        })
    } catch(error){
        next(error);
    }
}