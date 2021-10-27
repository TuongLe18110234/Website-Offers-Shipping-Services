const mongoose = require('mongoose');

//Midware
const bcrypt = require('bcryptjs');

const couponSchema = new mongoose.Schema({
    CouponCode: {type: String, unique: true, trim: true, required: [true, 'Required']},
    TimeBegin: {type: Date, required: [true, 'Required']},
    TimeEnd: {type: Date, required: [true, 'Required']},
    TheRemainingAmount: {type: Number, required: [true, 'Required']},
    ListCustomerUsed: [{
        CusID: {type: String, trim: true, required: [true, 'Required']},
    }],
    Propotion: {type: Number, required: [true, 'Required']},
    MaxValue: {type: Number, required: [true, 'Required']},
}, {timestamps: true});

// Middleware here



const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;