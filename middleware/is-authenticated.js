const jwt = require('jsonwebtoken');
const jwtKey = require('../middleware/jwt-key').jwtKey;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtKey);

        req.userData = {
            email: decodedToken.email,
            userId: decodedToken.userId
        };

        next();
    } catch (error) {
        res.status(401).json({
            message: 'Usuário não autenticado. É necessário login antes de acessar o site.'
        });
    }
};
