const mongoose = require('mongoose');

const serviceModel = new mongoose.Schema({
    s_name: {
        type: String,
        required: true,
        unique: true
    },
    s_desc: {
        type: String,
        required: true
    },
    s_duration: {
        type: String,
        required: true
    },
    s_price: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});

const Service = mongoose.model("services", serviceModel);

module.exports = Service;
