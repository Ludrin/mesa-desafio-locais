const path = require('path');
const fs = require('fs');

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const userRoutes = require('./routes/user');
const localRoutes = require('./routes/local');
const reviewRoutes = require('./routes/review');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

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

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.355un.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true`;
const MONGO_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
    .connect(MONGO_URI, MONGO_OPTIONS)
    .then(() => {
        console.log('Conectado no banco de dados.')
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log('Erro ao inicializar app: ', err));
