const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const MONGO_URI = 'mongodb+srv://mesaAdmin:0UvYtmtX7svtfhS5@cluster0.355un.mongodb.net/mesa-local?retryWrites=true';
const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
    .connect(MONGO_URI, MONGO_OPTIONS)
    .then(() => {
        console.log('Conectado no banco de dados!')
        app.listen(3000);
    })
    .catch(err => console.log('Erro ao inicializar app: ', err));
