const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const isAuthenticated = require('../middleware/is-authenticated');

router.post('/signup', UserController.createUser);

router.post('/login', UserController.userLogin);

router.put('/edit', isAuthenticated, UserController.editUser);

router.put('/change-password', isAuthenticated, UserController.changePassword);

router.get('/:userId', isAuthenticated, UserController.getUser);

module.exports = router;
