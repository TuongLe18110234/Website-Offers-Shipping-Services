const mongoose = require('mongoose');
const User = require('../models/User');


//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const orderSchema = new mongoose.Schema({
    cusId: {type: String}, // Auto fill
    busId: {type: String, required: [true, 'Business ID must be required']},
    fare: {type: Number},
    name:{type: String, required: [true, 'Order title must be required']},
    note:{type: String}, //Optional

    weight: {type: Number, required: [true, 'Order weight must be required']},

    quantity: {type: Number, required: [true, 'Quantity must be required']},

    senderName: {type: String, required: [true, 'Sender name must be required']},
    senderPhone: {type: String, required: [true, 'Sender phone must be required']},
    senderEmail: {type: String, required: [true, 'Sender email must be required']},
    sendAddress: {type: String, required: [true, 'Sender address must be required']},
    sendLine: {type: String, required: [true, 'Send line must be required']},

    reciverName: {type: String, required: [true, 'Reciver name must be required']},
    reciverPhone: {type: String, required: [true, 'Reciver phone must be required']},
    reciverEmail: {type: String, required: [true, 'Reciver email must be required']},
    reciverAddress: {type: String, required: [true, 'Reciver address must be required']},
    reciverLine: {type: String, required: [true, 'Reciver line must be required']},

    timeRecive: {type: Date}, // Auto fill

    lastMileston: {type: String}, // Auto fill
    lastTime: {type: Date}, // Auto fill

    packageId: {type: String} //Autofiled
}, {timestamps: true})

//Truoc khi luu database kich hoat ham, Midware
orderSchema.pre('save', function(next) {
    next();
})

//Tao model dua vao co che userSchema
const order = mongoose.model('Order', orderSchema)

module.exports = order; 