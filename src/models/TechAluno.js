const { Model, DataTypes } = require('sequelize');

class TechAluno extends Model {
  static init(sequelize) {
    super.init({
      aluno_id: DataTypes.INTEGER,
      tech_id: DataTypes.INTEGER,
    }, {
      sequelize,
    });
  }
}

module.exports = TechAluno;
