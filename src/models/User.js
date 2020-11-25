const { Model, DataTypes, Sequelize } = require('sequelize');
const bcryptjs = require('bcryptjs');
const { uuid } = require('uuidv4');

class User extends Model {
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
      password_hash: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Field password must have be from 6 to 50 characters',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeCreate', async (user) => {
      user.id = uuid();
      user.password_hash = await bcryptjs.hash(user.password, 8);
      user.email = user.email.toLowerCase();
    });
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  getAttributes(props) {
    const clone = {};

    for (const key of props) {
      if (this[key]) { clone[key] = this[key]; }
    }

    return clone;
  }
}

module.exports = User;
