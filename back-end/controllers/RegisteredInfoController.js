const RegisteredInfo = require('./../models/RegisteredInfo');

//Import jwt cap quyen truy cap
const jwt = require('jsonwebtoken');

//Giai ma
const bcrypt = require('bcryptjs');
const User = require('../models/User');


exports.createOne = async (req, res, next) => {
    try {
        // req.RI

        // const regInfo = RegisteredInfo.create({
        //     Name: "87hvnxvy",
        //     City: "Ho Chi Minh",
        //     District: "Thu Duc",
        //     Ward: "Linh Trung",
        //     AddressLine: "1234 Kha Van Can",
        //     PhoneNumber: "0981234456",
        //     Email: "somecat@outlook.com",
        //     Website: "nothing.com",
        // });

        const regInfo = await RegisteredInfo.create({... req.body});

        res.status(201).json({
            status: 'success',
            message: 'Created new request for join VN Delivery',
        });
    } catch(error) {
        next(error);
    }
}

exports.getAll = async(req, res, next) => {
    try {
        // req nothing
        const regInfos = await RegisteredInfo.find({});

        res.status(200).json({
            status: 'success',
            results: regInfos.length,
            data: {regInfos},
        });

    } catch(error) {
        next(error);
    }
}

exports.getOneById = async(req, res, next) => {
    try {
        // req nothing
        const regInfo = await RegisteredInfo.findById(req.params.regid);

        res.status(200).json({
            status: 'success',
            data: {regInfo},
        });

    } catch(error) {
        next(error);
    }
}

exports.updateOneById = async(req, res, next) => {
    try {
        // req.RI and params.id
        const rid = req.params.regid;
        const regInfo = await RegisteredInfo.findByIdAndUpdate(rid, {...req.body});

        res.status(200).json({
            status: 'success',
            message: 'Updated request for join VN Delivery',
        });

    } catch(error) {
        next(error);
    }
}

exports.deleteOneById = async(req, res, next) => {
    try {
        const sid = req.params.regid;
        await RegisteredInfo.findByIdAndDelete(sid);

        res.status(200).json({
            status: 'success',
            message: 'Deleted',
        })
    } catch(error) {
        next(error);
    }
}

var nodemailer = require('nodemailer');
exports.approveRegisterBusines = async(req, res, next) => {
    try {
        // req.RI and params.id
        const rid = req.params.regid;

        const regInfo = await RegisteredInfo.findOne(rid);

        //Send email
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tuonglnspkt@gmail.com',
              pass: 'Lnt2000@'
            }
          });
          
          var mailOptions = {
            from: 'tuonglnspkt@gmail.com',
            to: regInfo.Email,
            subject: 'Đăng ký trở thành đối tác hệ thống vận chuyển thành công!',
            text: 'Chào' + regInfo.Name +' chúc mừng đã đăng ký tài khoản thành công!\nEmail: ' + regInfo.Email + '\nPassword: 123456'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          //End of send email

        var user = new User();

        user.role = 'business';
        user.name = regInfo.Name;
        user.email = regInfo.Email;
        
        const hashedPass = await bcrypt.hash("123456", 10);
        user.password = hashedPass;
        user.save();

        res.status(200).json({
            status: 'success',
            user: {user},
        });

    } catch(error) {
        next(error);
    }
}