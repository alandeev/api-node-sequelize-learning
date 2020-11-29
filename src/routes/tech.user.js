const { Router } = require('express');

const Controller = require('../controllers/Tech');

const routes = Router();

routes.get('/', Controller.index);
routes.post('/', Controller.create);

module.exports = (app) => app.use('/teches', routes);
