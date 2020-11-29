const { Model, DataTypes } = require('sequelize');

class Photo extends Model {
  static init(sequelize) {
    super.init({
      aluno_id: DataTypes.UUID,
      originalname: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      path: DataTypes.STRING,
      filename: DataTypes.STRING,
    }, {
      sequelize,
    });
    this.addHook('beforeCreate', (user) => {
      console.log(user.toJSON());
    })
  }

  static associate(models){
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id', as: 'aluno' });
  }
}

module.exports = Photo;
