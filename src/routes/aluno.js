const { Router } = require('express');

const Controller = require('../controllers/Aluno');

const alunoRoutes = Router();

alunoRoutes.get('/', Controller.index);
alunoRoutes.post('/', Controller.create);
alunoRoutes.get('/techs/:aluno_id/:tech_id', Controller.addTech);

module.exports = (app) => app.use('/alunos', alunoRoutes);
