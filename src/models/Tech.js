const { Model, DataTypes } = require('sequelize');

class Tech extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        unique: {
          msg: "name technology already exists",
        },
        validate: {
          len: {
            args: [2, 30],
            msg: 'Field name must have be from 2 to 30 characters',
          },
        },
      },
    }, {
      sequelize,
    });
  }

  static associate(models){
    this.belongsToMany(models.Aluno, { through: 'tech_alunos', as: 'alunos', foreignKey: 'tech_id' })
  }
}

module.exports = Tech;
