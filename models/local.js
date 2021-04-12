const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
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

const localSchema = Schema({
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
    },
    reviews: [
        {
            reviewId: {
                type: Schema.Types.ObjectId,
                ref: 'Review',
                required: true
            }
        }
    ]
});

localSchema.methods.addReview = function (review) {
    // Calcula a nova nota média
    const average = this.scoreAverage;
    const qtdReviews = this.reviews.length;
    const totalScore = average * qtdReviews;

    const newTotalScore = totalScore + review.score;
    const newAverage = newTotalScore / (qtdReviews + 1);
    this.scoreAverage = newAverage;

    // Adiciona o ID da nova análise na lista
    this.reviews.push({ reviewId: review._id });

    return this.save();
};

module.exports = mongoose.model('Local', localSchema);
