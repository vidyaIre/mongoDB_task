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
    }
});
const stateModel =mongoose.model('State', stateSchema);
module.exports = stateModel;