const jwt = require('jsonwebtoken');
const User = require('../model/users');


/* eslint-disable-next-line no-unused-vars */
const auth= async (req, res, next)=> {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return next(err);
      }
      const user = await User.findById(decoded.id).exec();
      if(!user) return next(new Error('User not Found with provided token.'))
      req.user = user.toJSON();
      return next();
    });
  } else {
    return next();
  }
}

module.exports = auth;