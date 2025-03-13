const mongoose = require('mongoose');
const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    population: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
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
const stateModel =mongoose.model('States', stateSchema);
module.exports = stateModel;