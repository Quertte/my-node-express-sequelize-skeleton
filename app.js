require('dotenv').config();
require('@babel/register');

const express = require('express');
const { sequelize } = require('./db/models');
const serverConfig = require('./config/serverConfig');
const apiRouter = require('./routes/api/api.main');
const mainRouter = require('./routes/render/main.route');
const authRouter = require('./routes/render/auth.route');
const regaRouter = require('./routes/render/req.route');

const app = express();

const PORT = process.env.PORT ?? 3000;

serverConfig(app);

app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/registration', regaRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
  try {
    sequelize.authenticate();
    console.log('Соединение с БД установлено');
  } catch (error) {
    console.log('Ошибка при подключении к бд', error.message);
  }
});
