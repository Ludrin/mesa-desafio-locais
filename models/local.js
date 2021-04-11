const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const localSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scoreAverage: {
        type: Number,
        required: true
    },
    location: {
        mapPoint: {
            type: pointSchema,
            index: '2dsphere',
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
    }
});

module.exports = mongoose.model("Local", localSchema);
