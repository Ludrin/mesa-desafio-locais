const Review = require('../models/review');
const User = require('../models/user');
const Local = require('../models/local');

exports.createReview = (req, res, next) => {
    const reviewReqBody = req.body;

    Local.findById(reviewReqBody.localId)
        .then(existingLocal => {
            if (!existingLocal) {
                return res.status(404).json({
                    message: 'Local com id ' + reviewReqBody.localId + ' não encontrado.'
                });
            }

            return existingLocal;
        })
        .then(existingLocal => {
            existingLocal
                .populate('reviews.reviewId')
                .execPopulate()
                .then(populatedLocal => {
                    const existingReviewForLoggedUser = populatedLocal.reviews.filter(review => {
                        return review.reviewId.userId.toString() === req.userData.userId.toString();
                    });

                    if (existingReviewForLoggedUser.length > 0) {
                        res.status(500).json({
                            message: 'Já existe uma análise feita por você nesse local.'
                        });
                    } else {
                        const review = new Review({
                            score: reviewReqBody.score,
                            comment: reviewReqBody.comment,
                            userId: req.userData.userId,
                            localId: reviewReqBody.localId
                        });

                        review.save()
                            .then(createdReview => {
                                existingLocal.addReview(createdReview)
                                    .then(() => {
                                        res.status(201).json({
                                            message: 'Análise criada.',
                                            result: createdReview
                                        });
                                    });
                            });
                    }
                });
        })
        .catch(err => {
            const errorMessage = 'Erro ao criar análise: ' + err;
            res.status(500).json({
                message: errorMessage
            });
        });
};

exports.getReview = (req, res, next) => {
    const reviewId = req.params.reviewId;

    Review.findById(reviewId)
        .then(existingReview => {
            if (existingReview) {
                res.status(200).json({
                    message: 'Análise retornada.',
                    result: existingReview
                });
            } else {
                res.status(404).json({
                    message: 'Análise com id ' + reviewId + ' não encontrada.'
                });
            }
        })
        .catch(err => {
            const errorMessage = 'Erro ao buscar análise: ' + err;
            res.status(500).json({
                message: errorMessage
            });
        });
};
