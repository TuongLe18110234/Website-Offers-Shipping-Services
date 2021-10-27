const mongoose = require('mongoose');

//Midware
const bcrypt = require('bcryptjs');

const registeredSPSchema = new mongoose.Schema({
    BusID: {type: String, trim: true, required: [true, 'Required']},
    PackID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServicePacks',
        trim: true,
        required: [true, 'Required']
    },

    DateBegin: {type: Date, required: [true, 'Required']},
    DateEnd: {type: Date, required: [true, 'Required']},
    Pay: {type: Number, required: [true, 'Required']},

    MaxOrders: {type: Number, required: [true, 'Required']},
    CountOrders: {type: Number, required: [true, 'Required']},
    StateUse: {type: String}
}, {timestamps: true});

// Midware

const RegisteredSP = mongoose.model('RegisteredSP', registeredSPSchema);

module.exports = RegisteredSP;