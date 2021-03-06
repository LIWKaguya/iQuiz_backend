const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const questionsRouter = require('./controllers/questions')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose');
const categoriesRouter = require('./controllers/categories');

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
})
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
})

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/login', loginRouter);
app.use('/api/categories', categoriesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler)

module.exports = app
