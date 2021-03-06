const express = require('express');
const router = express.Router();

const LocalController = require('../controllers/local');
const isAuthenticated = require('../middleware/is-authenticated');

router.post('/create', isAuthenticated, LocalController.createLocal);

router.post('/map', isAuthenticated, LocalController.getMapLocal);

router.get('/list', isAuthenticated, LocalController.getListLocal);

router.get('/:localId', isAuthenticated, LocalController.getLocal);

module.exports = router;
