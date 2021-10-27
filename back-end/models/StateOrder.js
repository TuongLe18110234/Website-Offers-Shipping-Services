const mongoose = require('mongoose');

//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const stateOrderSchema = new mongoose.Schema({
    orderId: {type: String},

    mileston: {type: String, required: [true, 'Mileston much be required']},
    time: {type: Date}
}, {timestamps: true})

//Truoc khi luu database kich hoat ham, Midware
stateOrderSchema.pre('save', function(next) {
    next();
})

//Tao model dua vao co che StateOrder
const stateOrder = mongoose.model('StateOrder', stateOrderSchema)

module.exports = stateOrder; 