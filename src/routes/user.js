const { Router } = require('express');

const Controller = require('../controllers/User');

const middleware = require('../middlewares');

const userRoutes = new Router();

userRoutes.use(middleware);

userRoutes.get('/', (req, res) => res.json(req.requester));
userRoutes.put('/', Controller.update);

module.exports = (app) => app.use('/user', userRoutes);
