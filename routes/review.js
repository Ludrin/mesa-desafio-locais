const express = require('express');
const router = express.Router();

const ReviewController = require('../controllers/review');
const isAuthenticated = require('../middleware/is-authenticated');

router.post('/create', isAuthenticated, ReviewController.createReview);

router.get('/:reviewId', isAuthenticated, ReviewController.getReview);

module.exports = router;
