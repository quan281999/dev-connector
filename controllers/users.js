const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const Profile = require('../models/Profile');

// Create user
exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
    })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};