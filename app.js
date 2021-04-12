const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const localRoutes = require('./routes/local');
const reviewRoutes = require('./routes/review');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/user', userRoutes);
app.use('/api/local', localRoutes);
app.use('/api/review', reviewRoutes);

const MONGO_URI = 'mongodb+srv://mesaAdmin:0UvYtmtX7svtfhS5@cluster0.355un.mongodb.net/mesa-local?retryWrites=true';
const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
    .connect(MONGO_URI, MONGO_OPTIONS)
    .then(() => {
        console.log('Conectado no banco de dados.')
        app.listen(3000);
    })
    .catch(err => console.log('Erro ao inicializar app: ', err));
