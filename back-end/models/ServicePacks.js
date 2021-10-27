const mongoose = require('mongoose');

//Midware
const bcrypt = require('bcryptjs');

const servicePacksSchema = new mongoose.Schema({
    Name: {type: String, required: [true, 'Required']},
    Cost: {type: Number, required: [true, 'Required']},
    Period: {type: Number, required: [true, 'Required']},
    MaxOrders: {type: Number, required: [true, 'Required']},
}, {timestamps: true});

// Midware here


const ServicePacks = mongoose.model('ServicePacks', servicePacksSchema);

module.exports = ServicePacks;