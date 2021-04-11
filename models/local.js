const mongoose = require("mongoose");

const localSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scoreAverage: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    roadName: {
        type: String,
        required: true
    },
    roadNumber: {
        type: Number,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Local", localSchema);
