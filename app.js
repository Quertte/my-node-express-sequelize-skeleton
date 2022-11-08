require('dotenv').config();
require('@babel/register');

const express = require('express');
const { sequelize } = require('./db/models');
const serverConfig = require('./config/serverConfig');

const app = express();

const PORT = process.env.PORT ?? 3000;

serverConfig(app);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
  try {
    sequelize.authenticate();
    console.log('Соединение с БД установлено');
  } catch (error) {
    console.log('Ошибка при подключении к бд', error.message);
  }
});
