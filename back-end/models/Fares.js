const mongoose = require('mongoose');

const faresSchema = new mongoose.Schema({
    busId: {type: String, unique: false, trim: true, required: [true, 'BusID cant be blank']},
    minValue: {type: Number, required: [true, 'Required']},
    maxValue: {type: Number, required: [true, 'Required']},
    constraints: {type: Number, required: [true, 'Required']},
    cost: {type: Number, required: [true, 'Required']},
    unit: {type: String, required: [true, 'Required']},
    time: {type: Number, required: [true, 'Required']},
}, {timestamps: true});

// Midware here



const Fares = new mongoose.model('Fare', faresSchema);

module.exports = Fares;