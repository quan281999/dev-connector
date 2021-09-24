const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../models/User');

// Get current user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

// Authenticate user
exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token })
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

