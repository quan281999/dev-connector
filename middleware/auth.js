const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Check header
  if (!req.header('Authorization')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  } else {
    const auth = req.header('Authorization').split(' ');
    // Extract token
    if (auth.length === 2 && /^Bearer$/i.test(auth[0])) {
      const token = auth[1];
      // Verify token
      try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
      } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
      }
    } else {
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  }
};