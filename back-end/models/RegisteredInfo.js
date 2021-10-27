const mongoose = require('mongoose');

//Midware
const bcrypt = require('bcryptjs');

const registeredInfoSchema = new mongoose.Schema({
    Name: {type: String, unique: false, trim: true, required: [true, 'Required']},
    City: {type: String, trim: true, required: [true, 'Required']},
    District: {type: String, trim: true, required: [true, 'Required']},
    Ward: {type: String, trim: true, required: [true, 'Required']},
    AddressLine: {type: String, trim: true, required: [true, 'Required']},
    PhoneNumber: {type: String, trim: true, required: [true, 'Required']},
    Email: {type: String, trim: true, required: [true, 'Required']},
    Website: {type: String, trim: true, required: [true, 'Required']},
    state: {type: String}
}, {timestamps: true});

// Midware here



const RegisteredInfo = mongoose.model('RegisteredInfo', registeredInfoSchema);

module.exports = RegisteredInfo;