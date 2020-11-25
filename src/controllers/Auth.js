const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

class AuthController {
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ errors: ['Do you need send E-mail'] });
      }
      if (!password) {
        return res.status(400).json({ errors: ['Do you need send Password'] });
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ errors: ['E-mail not found'] });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({ errors: ['Password invalid'] });
      }

      const token = jwt.sign(
        user.getAttributes(['id', 'name']),
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        },
      );

      return res.json({ token: `Bearer ${token}` });
    } catch (err) {
      return res.status(400).json({ errors: [err.message] });
    }
  }

  async signup(req, res) {
    const { name, email, password } = req.body;

    try {
      await User.create({ name, email, password });
      return res.status(201).json();
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

module.exports = new AuthController();
