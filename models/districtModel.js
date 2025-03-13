const mongoose = require('mongoose');
const stateModel = require('./stateModel');

const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    state_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: stateModel,
        required: true
    }, isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
}
);
const districtModel =mongoose.model('Districts', districtSchema);
module.exports = districtModel;
