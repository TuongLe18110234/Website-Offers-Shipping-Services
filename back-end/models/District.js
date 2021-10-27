const mongoose = require('mongoose');


//Quy dinh bo khuon mau
//Quy dinh cau tru tai nguyen
//id duoc tu dong tao boi mongoDB
const districtSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Business ID must be required']}
}, {timestamps: true})

//Truoc khi luu database kich hoat ham, Midware
districtSchema.pre('save', function(next) {
    next();
})

//Tao model dua vao co che userSchema
const district = mongoose.model('District', districtSchema)

module.exports = district; 