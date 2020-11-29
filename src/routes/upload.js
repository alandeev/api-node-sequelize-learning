const { Router } = require('express');

const Controller = require('../controllers/Upload');

const routes = Router();

routes.post('/', Controller.store);

module.exports = (app) => app.use('/upload', routes);
