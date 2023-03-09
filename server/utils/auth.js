const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req, connection }, res, next) {
    const { token } = req.query || {};
    const authHeader = req.headers.authorization || '';
    const tokenParts = authHeader.split(' ');
    const bearerToken = tokenParts.length === 2 && tokenParts[0] === 'Bearer' ? tokenParts[1] : null;
    const finalToken = token || bearerToken;

    if (!finalToken) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    try {
      const { data } = require('jsonwebtoken').verify(finalToken, 'mysecretsshhhhh', { maxAge: '2h' });
      req.user = data;
      if (req) {
        req.context = {
          user: req.user,
        };
      } else if (connection) {
        connection.context = {
          user: req.user,
        };
      }
      next();
    } catch (err) {
      console.error('Error verifying token:', err);
      return res.status(400).json({ message: 'Invalid token!' });
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return require('jsonwebtoken').sign({ data: payload }, 'mysecretsshhhhh', { expiresIn: '2h' });
  },
};