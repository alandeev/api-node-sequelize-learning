const { Model, DataTypes } = require('sequelize');
const { baseURL } = require('../config/server.json');

class Photo extends Model {
  static init(sequelize) {
    super.init({
      aluno_id: DataTypes.UUID,
      originalname: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      path: DataTypes.STRING,
      filename: DataTypes.STRING,
      url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${baseURL}/images/${this.getDataValue('filename')}`;
        }
      }
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
