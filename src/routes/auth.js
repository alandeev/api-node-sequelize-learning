const { Router } = require('express');

const Controller = require('../controllers/Auth');

const authRoutes = Router();

authRoutes.post('/authenticate', Controller.authenticate);
authRoutes.post('/signup', Controller.signup);

module.exports = { authRoutes };
