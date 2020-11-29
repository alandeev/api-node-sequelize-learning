const { Sequelize } = require('sequelize');

const db = require('../config/database');

const User = require('../models/User');
const Aluno = require('../models/Aluno');
const Tech = require('../models/Tech');

// eslint-disable-next-line
const connection = new Sequelize(db);

User.init(connection);
Aluno.init(connection);
Tech.init(connection);

Aluno.associate(connection.models);
Tech.associate(connection.models);
