const morgan = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const fs = require('fs');
const path = require('path');
const sessionConfig = require('./sessionConfig');
const { cookiesCleaner, resLocals, getUser } = require('../middleware/auth');
const ssr = require('../middleware/ssr');

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });

// главная конфигурация приложения
const serverConfig = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('tiny', { stream: accessLogStream }));
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(ssr);
  app.use(getUser);
  app.use(resLocals);
  app.use(cookiesCleaner);
};

module.exports = serverConfig;
