// express import
const express = require('express');
const consign = require('consign');

// database connection
require('./database/database');

// App Class
class App {
  constructor() {
    this.app = express();
    this.middlewares();

    // starting routes;
    consign().include('src/routes').into(this.app);
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {

  }
}

// export App to use
module.exports = new App().app;
