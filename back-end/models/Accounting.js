const mongoose = require('mongoose');


//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const accountingSchema = new mongoose.Schema({
    busId: {type: String, required: [true, 'Business ID must be required']},
    busName: {type: String},
    servicePack: {type: String},
    totalOrder: {type: Number},
    totalCost: {type: Number},
    payBack: {type: Number},
    actuallyReceived: {type: Number},
    month: {type: String},

    lastMileston: {type: String}, // Auto fill
    lastTime: {type: Date}, // Auto fill

    feedBack: {type: String}

}, {timestamps: true})

//Truoc khi luu database kich hoat ham, Midware
accountingSchema.pre('save', function(next) {
    next();
})

//Tao model dua vao co che userSchema
const accounting = mongoose.model('Accounting', accountingSchema)

module.exports = accounting; 