const mongoose = require('mongoose');

//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const stateAccountingrSchema = new mongoose.Schema({
    accId: {type: String},

    mileston: {type: String, required: [true, 'Mileston much be required']},
    time: {type: Date}
}, {timestamps: true})

//Truoc khi luu database kich hoat ham, Midware
stateAccountingrSchema.pre('save', function(next) {
    next();
})

//Tao model dua vao co che StateOrder
const satateAccounting = mongoose.model('StateAccounting', stateAccountingrSchema)

module.exports = satateAccounting; 