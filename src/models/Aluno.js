const { Model, DataTypes } = require('sequelize');
const { uuid } = require('uuidv4');

class Aluno extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 30],
            msg: 'Field name must have be from 2 to 30 characters',
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [2, 30],
            msg: 'Field lastname must have be from 2 to 30 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail already exists',
        },
        validate: {
          isEmail: {
            msg: 'Email invalid.',
          },
        },
      },
      age: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
        validate: {
          min: {
            args: 17,
            msg: "You are young, you need 17 age to create account"
          },
          max: {
            args: 60,
            msg: "You are grandfather, need die and live again to create account"
          },
          isNumeric: {
            msg: "Do need send type number"
          }
        }
      }
    }, {
      sequelize,
    });

    this.addHook('beforeCreate', async (user) => {
      user.id = uuid();
      user.email = user.email.toLowerCase();
    });
  }

  static associate(models){
    this.hasOne(models.Photo, { foreignKey: 'aluno_id', as: 'profile' });
    this.belongsToMany(models.Tech, { through: 'tech_alunos', as: 'teches', foreignKey: 'aluno_id' })
  }

  getAttributes(props) {
    const clone = {};

    for (const key of props) {
      if (this[key]) { clone[key] = this[key]; }
    }

    return clone;
  }
}

module.exports = Aluno;
