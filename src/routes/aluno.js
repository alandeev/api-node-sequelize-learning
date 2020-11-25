const { Router } = require('express');

// const Controller = require('../controllers/Aluno');

const alunoRoutes = Router();

module.exports = (app) => app.use('/alunos', alunoRoutes);
