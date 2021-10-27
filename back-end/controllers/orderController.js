//Import model
const Order = require('../models/Order');
const StateOrder = require('../models/StateOrder');
const RegisteredSP = require('../models/RegisteredSP');
const User = require('../models/User');
const Accounting = require('../models/Accounting');
const ServicePacks = require('../models/ServicePacks');
const e = require('express');


//------------------------------------Order for user---------------------------------//
//Get all order
exports.getAllOrdersByUser = async (req, res, next) =>{
    try{
        const {userId} = req.user;

        const orders = await Order.find({cusId: userId});

        res.status(200).json({
            status:'success',
            results: orders.length,
            data:{orders}
        })
    } catch(error){
        res.json(error);
    }
}

// Create one order
exports.createOneOrder = async (req, res, next) =>{
    try{
        const {userId} = req.user;

        var busId = req.body.busId;
        var currentDate = new Date();

        var rsp = await RegisteredSP.find({
            BusID: busId,
            StateUse: "Đang dùng",
            DateEnd: { 
                $gte: currentDate
            }
        });

        var packId = "Gói cơ bản";

        if (rsp[0] != null) {
            var sp = await ServicePacks.findById(rsp[0].PackID);


            if(sp.Name != "Gói cơ bản"){
                if(rsp[0].CountOrders + 1 <= rsp[0].MaxOrders){
                    rsp[0].CountOrders ++;
                    packId = rsp[0].PackID;
                    rsp[0].save();
                }
            }
        }
        
        //...req.body Lay toan bo thong tin trong req.body
        const order = await Order.create({...req.body, cusId: userId, packageId: packId,
            lastMileston: 'Chưa thanh toán', lastTime: new Date()});
        //await StateOrder.create({orderId: order._id, mileston: order.lastMileston, time: order.lastTime})

        res.status(200).json({
            status:'success',
            data:{order}
        })
    } catch(error){
        next(error);
    }
}

// Update one order
exports.updateOneOrder = async (req, res, next) =>{
    try{
        const {orderId} = req.params;

        // new: true phan hoi lai bai order da update
        const order = await Order.findByIdAndUpdate(orderId, {...req.body}, {new: true, runValidator: true});

        res.status(200).json({
            status:'success',
            data:{order}
        })
    } catch(error){
        next(error);
    }
}

// Delete one order
exports.deleteOneOrder = async (req, res, next) =>{
    try{
        const {orderId} = req.params;
        
        await Order.findByIdAndDelete(orderId);

        res.status(200).json({
            status:'success',
            massage: 'Order has been deleted'
        })
    } catch(error){
        next(error);
    }
}

// Count order by user id
exports.countOrderByUser = async (req, res, next) =>{
    try{
        const {userId} = req.user;

        const orders = await Order.find({cusId: userId});

        res.status(200).json({
            status:'success',
            results: orders.length
        })
    } catch(error){
        res.json(error);
    }
}

// Get total fare by user id
exports.getTotalFareOrderByUser = async (req, res, next) =>{
    try{
        const {userId} = req.user;

        const orders = await Order.find({cusId: userId});

        var totalFare = 0;

        orders.forEach(element => {
            totalFare += element.fare;
        });

        res.status(200).json({
            status:'success',
            totlaFare: totalFare
        })
    } catch(error){
        res.json(error);
    }
}

// Get one order by id
exports.getOneOrderbyId = async (req, res, next) =>{
    try{
        const data = {order: null, states: null}
        const {orderId} = req.params;
        
        data.order = await Order.findOne({_id: orderId});
        data.states = await StateOrder.find({orderId: orderId});

        res.status(200).json({
            status:'success',
            data: data
        })
    } catch(error){
        next(error);
    }
}

//------------------------------------Order for admin---------------------------------//

//Get all order (Doanh số)
exports.getAllOrders = async (req, res, next) =>{
    try{
        const orders = await Order.find({});

        res.status(200).json({
            status:'success',
            results: orders.length,
            data:{orders}
        })
    } catch(error){
        res.json(error);
    }
}
// Get total fare by time (Tổng doanh thu theo thời gian)
exports.getTotalFare = async (req, res, next) =>{
    try{
        startDate = req.body.startDate;

        const orders = await Order.find({});
        const spBus = await RegisteredSP.find({});
        const accountings = await Accounting.find({});

        var totalFare = 0;

        orders.forEach(element => {
            totalFare += element.fare;
        });

        spBus.forEach(element => {
            totalFare += element.Pay;
        });

        var totalPaid = 0;
        accountings.forEach(element => {
            if(element.lastMileston == "Chấp nhận"){
                totalPaid += element.actuallyReceived;
            }
        });


        res.status(200).json({
            status:'success',
            totalOrder: orders.length,
            totlaFare: totalFare,
            totalPaid: totalPaid
        })
    } catch(error){
        res.json(error);
    }
}

// Get total fare (Tổng doanh thu)
// Body start date, end date
exports.getTotalFareByDate = async (req, res, next) =>{
    try{
        var startDate = new Date(req.params.startDate); 
        var endDate = new Date(req.params.endDate);

        startDate.setDate(startDate.getDate() -1);
        endDate.setDate(endDate.getDate() + 1);

        const orders = await Order.find({
            createdAt: { 
                $gte: startDate, 
                $lte: endDate 
            }
        });

        const spBus = await RegisteredSP.find({
            createdAt: { 
                $gte: startDate, 
                $lte: endDate 
            }
        });

        // const accountings = await Accounting.find({
        //     createdAt: { 
        //         $gte: startDate, 
        //         $lte: endDate 
        //     }
        // });

        var totalFare = 0;
        var totalPaid = 0;
        orders.forEach(element => {
            totalFare += element.fare;

            if(element.packageId == "Gói cơ bản"){
                totalPaid += element.fare*0.05;
            } else{
                totalPaid += element.fare;
            }
        });

        spBus.forEach(element => {
            totalFare += element.Pay;
        });

        // accountings.forEach(element => {
        //     if(element.lastMileston == "Chấp nhận"){
        //         totalPaid += element.actuallyReceived;
        //     }
        // });

        res.status(200).json({
            status:'success',
            totalOrder: orders.length,
            totlaFare: totalFare,
            totalPaid: totalPaid,
            profit: totalFare - totalPaid
        })
    } catch(error){
        res.json(error);
    }
}

// Get total paid

// Caculate order by month
// [Admin] Đếm các order cho admin và tổng tiền phí
exports.countOrderByMonth = async (req, res, next) =>{
    try{
        var {month} = req.params;
        month = month + '-01';

        var firstDate = new Date(month);
        var lastDate = new Date(month);
        lastDate.setMonth(firstDate.getMonth() + 1);
        firstDate.setDate(firstDate.getDate() - 1);

        const orders = await Order.find({
            createdAt: { 
                $gte: firstDate, 
                $lte: lastDate 
            }
        });

        var orderCount = [];
        lastDate.setDate(lastDate.getDate() - 1);
        lastDay = lastDate.getDate();
        for(var i=0; i<lastDay; i++){
            var count = 0;
            orders.forEach(element => {
                if(element.createdAt.getDate() == i + 1){
                    count++;
                }
            });
            orderCount.push(count);
        }

        const spBus = await RegisteredSP.find({
            createdAt: { 
                $gte: firstDate, 
                $lte: lastDate 
            }
        });

        var totalCost = 0, totalPaid = 0;
        orders.forEach(element => {
            totalCost += element.fare;

            if(element.packageId == "Gói cơ bản"){     
                totalPaid += element.fare*0.95;
            } else{
                totalPaid += element.fare;
            }
        });

        spBus.forEach(element => {
            totalCost += element.Pay;
        });

        res.status(200).json({
            status:'success',
            totalCost: totalCost,
            totalPaid: totalPaid,
            totalOrder: orders.length,
            totalDate: lastDay,
            data: {orderCount}
        })
    } catch(error){
        res.json(error);
    }
}

// Caculate business order by date

exports.caculateBusinessOrderByDate = async (req, res, next) =>{
    try{
        var startDate = new Date(req.params.startDate);
        var endDate = new Date(req.params.endDate);

        startDate.setDate(startDate.getDate() -1);
        endDate.setDate(endDate.getDate() + 1);

        var businessCount = [];
        const businesses = await User.find({role: 'business'});
        const orders = await Order.find({
            createdAt: { 
                $gte: startDate, 
                $lte: endDate 
            }
        });

        businesses.forEach(business => {
            var cost = 0;
            var count = 0;
            var totalCost = 0;

            orders.forEach(order => {
                totalCost += order.fare;
                if(order.busId == business._id) {
                    cost += order.fare;
                    count += 1;
                }
            });

            var percent = 0;
            if(count != 0){
                percent = (cost/totalCost)*100
            }

            businessCount.push({
                name: business.name,
                totalOrder: count,
                totalCost: cost,
                percent: percent
            })
        });

        res.status(200).json({
            status:'success',
            totalBusiness: businesses.length,
            data: {businessCount},
        })
    } catch(error){
        res.json(error);
    }
}

//Get all order by business
exports.getAllOrdersByBusiness = async (req, res, next) =>{
    try{
        const {busId} = req.params;

        const orders = await Order.find({busId: busId});

        var totalCost = 0;
        var payBack = 0;
        orders.forEach(element => {
            totalCost += element.fare;

            if(element.packageId == "Gói cơ bản"){
                payBack += element.fare * 0.05;
            }
        });

        res.status(200).json({
            status:'success',
            totalOrders: orders.length,
            totalCost: totalCost,
            payBack: payBack,
            actuallyReceived: totalCost - payBack,
            data:{orders}
        })
    } catch(error){
        res.json(error);
    }
}

//Get all order by business bu month
//{Business} {Admin} Hoạch toán
exports.getAllOrdersByBusinessByMonth = async (req, res, next) =>{
    try{
        const {busId} = req.params;

        // 2021
        const {month} = req.params;


        var firstDate = new Date(month);
        var lastDate = new Date(month);
        lastDate.setMonth(firstDate.getMonth() + 1);
        firstDate.setDate(firstDate.getDate() - 1);

        const orders = await Order.find({busId: busId,
            lastMileston: "Đã giao",
            createdAt: { 
                $gte: firstDate, 
                $lte: lastDate 
            }
        });

        var totalCost = 0;
        var payBack = 0;
        orders.forEach(element => {
            totalCost += element.fare;

            if(element.packageId == "Gói cơ bản"){
                payBack += element.fare * 0.05;
            }
        });

        res.status(200).json({
            status:'success',
            totalOrders: orders.length,
            totalCost: totalCost,
            payBack: payBack,
            actuallyReceived: totalCost - payBack,
            data:{orders}
        })
    } catch(error){
        res.json(error);
    }
}

//------------------------------------Order for business---------------------------------//
exports.getFareByBusiness = async (req, res, next) =>{
    try{
        const {userId} = req.user;

        const orders = await Order.find({busId: userId});
        const spBus = await RegisteredSP.find({BusID: userId});

        var totalFare = 0;
        var totalPaid = 0;

        orders.forEach(element => {
            if(element.packageId == "Gói cơ bản"){
                totalFare += element.fare*0.95;
            } else{
                totalFare += element.fare;
            }
        });

        spBus.forEach(element => {
            totalPaid += element.Pay;
        });

        res.status(200).json({
            status:'success',
            totalOrder: orders.length,
            totlaFare: totalFare,
            totalPaid: totalPaid,
            busId: userId
        })
    } catch(error){
        res.json(error);
    }
}

// Caculate order by month by business id
// Xuất ra trang chủ của business đầy đủ các thông tin (Dashboard)
exports.countOrderByMonthByBusinessId = async (req, res, next) =>{
    try{
        const {userId} = req.user;
        var {month} = req.params;
        month = month + '-01';

        var firstDate = new Date(month);
        var lastDate = new Date(month);
        lastDate.setMonth(firstDate.getMonth() + 1);
        firstDate.setDate(firstDate.getDate() - 1);

        const orders = await Order.find({
            busId: userId,
            createdAt: { 
                $gte: firstDate, 
                $lte: lastDate 
            }
        });

        var orderCount = [];
        lastDate.setDate(lastDate.getDate() - 1);
        lastDay = lastDate.getDate();
        for(var i=0; i<lastDay; i++){
            var count = 0;
            orders.forEach(element => {
                if(element.createdAt.getDate() == i + 1){
                    count++;
                }
            });
            orderCount.push(count);
        }

        const spBus = await RegisteredSP.find({
            BusID: userId,
            createdAt: { 
                $gte: firstDate, 
                $lte: lastDate 
            }
        });

        var totalCost = 0; 
        var order_wait= 0, order_processing = 0, order_delivering = 0, order_deliveried = 0, order_cancel = 0;
        orders.forEach(element => {
            if(element.packageId == "Gói cơ bản"){     
                totalCost += element.fare*0.95;
            } else{
                totalCost += element.fare;
            }

            if(element.lastMileston == "Chờ xác nhận"){
                order_wait++;
            } else if(element.lastMileston == "Chờ lấy hàng"){
                order_processing++;
            } else if(element.lastMileston == "Đang giao"){
                order_delivering++;
            } else if(element.lastMileston == "Đã giao"){
                order_deliveried++;
            } else if(element.lastMileston == "Đã hủy"){
                order_cancel++;
            }
        });

        var totalPaid = 0;
        spBus.forEach(element => {
            totalPaid += element.Pay;
        });

        res.status(200).json({
            status:'success',
            totalCost: totalCost,
            totalPaid: totalPaid,
            totalOrder: orders.length,
            totalDate: lastDay,
            order_processing: order_processing,
            order_delivering: order_delivering,
            order_deliveried: order_deliveried,
            order_cancel: order_cancel,
            data: {orderCount}
        })
    } catch(error){
        res.json(error);
    }
}

// get all order by business order by date
// Lấy tất cả cán đơn hàng theo ngày dành cho business
// {business}
exports.getAllOrderByBusinessByDate = async (req, res, next) =>{
    try{
        const {userId} = req.user;
        const {start} =  req.params;
        const {end} =  req.params;

        var startDate = new Date(start);
        var endDate = new Date(end);

        startDate.setDate(startDate.getDate() -1);
        endDate.setDate(endDate.getDate() + 1);

        const orders = await Order.find({
            busId: userId,
            createdAt: { 
                $gte: startDate, 
                $lte: endDate 
            }
        });

        const spBus = await RegisteredSP.find({
            BusID: userId,
            createdAt: { 
                $gte: startDate, 
                $lte: endDate 
            }
        });

        var totalCost = 0;
        orders.forEach(element => {
            if(element.packageId == "Gói cơ bản"){     
                totalCost += element.fare*0.95;
            } else{
                totalCost += element.fare;
            }
        });

        var totalPaid = 0;
        spBus.forEach(element => {
            totalPaid += element.Pay;
        });

        res.status(200).json({
            status:'success',
            totalOrders: orders.length,
            totalCost: totalCost,
            totalPaid: totalPaid,
            profit: totalCost - totalPaid,
            data: {orders}
        })
    } catch(error){
        res.json(error);
    }
}