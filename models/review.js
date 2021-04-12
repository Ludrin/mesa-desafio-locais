const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    score: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    localId: {
        type: Schema.Types.ObjectId,
        ref: 'Local',
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);