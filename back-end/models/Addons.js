const mongoose = require('mongoose');

//Midware
const bcrypt = require('bcryptjs');

const addonsSchema = new mongoose.Schema({
    BusID: {type: String, unique: true, trim: true, required: [true, 'BusID cant be blank']},
    Insurance: {type: Number, required: [true, 'Required']},
    Fast: {type: Number, required: [true, 'Required']},
    Fragile: {type: Number, required: [true, 'Required']},
    HighValue: {type: Number, required: [true, 'Required']},
    SeeInside:{type: Number, required: [true, 'Required']},
}, {timestamps: true});

// Midware here




const Addons = mongoose.model('Addons', addonsSchema);

module.exports = Addons;