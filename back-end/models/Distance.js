const mongoose = require('mongoose');


//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const distanceSchema = new mongoose.Schema({
    from: {type: String, required: [true, 'From must be required']},
    to: {type: String, required: [true, 'To must be required']},
    distance: {type: Number, required: [true, 'Distance must be required']} 
}, {timestamps: true})

//Truoc khi luu database kich hoat ham, Midware
distanceSchema.pre('save', function(next) {
    next();
})

//Tao model dua vao co che userSchema
const distance = mongoose.model('Distance', distanceSchema)

module.exports = distance; 