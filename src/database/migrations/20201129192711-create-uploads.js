'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('photos',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      aluno_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'alunos',
          key: 'id',
          onDelete: "CASCADE"
        }
      },
      originalname: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      path: DataTypes.STRING,
      filename: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('photos');
  }
};
