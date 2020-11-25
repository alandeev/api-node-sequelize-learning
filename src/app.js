// express import
const express = require('express');

// routes import
const { userRoutes } = require('./routes/user');
const { authRoutes } = require('./routes/auth');

// database connection
require('./database/database');

// App Class
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/user', userRoutes);
    this.app.use('/', authRoutes);
  }
}

// export App to use
module.exports = new App().app;
