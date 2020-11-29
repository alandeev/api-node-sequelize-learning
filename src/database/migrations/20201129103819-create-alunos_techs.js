'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('techalunos',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      aluno_id: {
        type: DataTypes.UUID,
        references: {
          model: 'alunos',
          key: 'id',
          onDelete: "CASCADE"
        }
      },
      tech_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'teches',
          key: 'id',
          onDelete: "CASCADE"
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('techalunos');
  }
};
