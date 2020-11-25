const { Sequelize } = require('sequelize');

const User = require('../models/User');

const db = require('../config/database');

// eslint-disable-next-line
const connection = new Sequelize(db);

User.init(connection);
