const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    const userReqBody = req.body;

    bcrypt.hash(userReqBody.password, 10)
        .then(passwordHash => {
            const user = new User({
                name: userReqBody.name,
                email: userReqBody.email,
                password: passwordHash
            });
            user.save()
                .then(createdUser => {
                    res.status(201).json({
                        message: 'Usuário ' + userReqBody.name + ' criado.',
                        result: createdUser
                    });
                })
                .catch(err => {
                    const errorMessage = 'Erro ao criar usuário: ' + err;
                    res.status(500).json({
                        message: errorMessage
                    });
                });
        });
};

exports.editUser = (req, res, next) => {
    const userReqBody = req.body;

    User.findById(userReqBody._id)
        .then(user => {
            if (user) {
                user.name = userReqBody.name;
                user.email = userReqBody.email;

                user.save()
                    .then(updatedUser => {
                        res.status(200).json({
                            message: 'Usuário ' + userReqBody.name + ' atualizado.',
                            result: updatedUser
                        });
                    })
                    .catch(err => {
                        const errorMessage = 'Erro ao atualizar usuário: ' + err;
                        res.status(500).json({
                            message: errorMessage
                        });
                    });
            } else {
                res.status(404).json({
                    message: 'Usuário com id ' + userReqBody_id + ' não encontrado.'
                });
            }
        })
};

exports.changePassword = (req, res, next) => {
    const userReqBody = req.body;

    bcrypt.hash(userReqBody.password, 10)
        .then(passwordHash => {
            User.findById(userReqBody._id)
                .then(user => {
                    user.password = passwordHash;

                    user.save()
                        .then(updatedUser => {
                            res.status(200).json({
                                message: 'Senha do usuário ' + updatedUser.name + ' atualizada.',
                                result: updatedUser
                            });
                        })
                        .catch(err => {
                            const errorMessage = 'Erro ao atualizar senha de usuário: ' + err;
                            res.status(500).json({
                                message: errorMessage
                            });
                        });
                });
        });
};

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then(existingUser => {
            if (existingUser) {
                res.status(200).json({
                    message: 'Usuário ' + existingUser.name + ' retornado.',
                    result: existingUser
                });
            } else {
                res.status(404).json({
                    message: 'Usuário com id ' + userId + ' não encontrado.'
                });
            }
        })
};

exports.userLogin = (req, res, next) => {
    let existingUser;

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Não há usuário cadastrado para o e-mail informado: ' + req.body.email
                });
            }
            existingUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(passwordMatch => {
            if (!passwordMatch) {
                return res.status(401).json({
                    message: 'A senha informada está incorreta.'
                });
            }

            const token = generateToken(existingUser);

            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: existingUser._id
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Erro ao autenticar usuário: ' + err
            });
        });
};

function generateToken(user) {
    const payload = {
        email: user.email,
        userId: user._id
    };

    const secret = process.env.JWT_KEY;

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secret, options);
}
