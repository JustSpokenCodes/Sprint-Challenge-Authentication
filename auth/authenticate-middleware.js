/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets,js');

const Jokes = require('../jokes/jokes-model.js');

module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (tokenHeader) {
      jwt.verify(tokenHeader, secrets.jwtSecret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({message: 'verifying token is coming up error wise', error:err.message});
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
  } else {
    res.status(401).json({ you: 'shall not pass!...because you are mainly missing Auth header' });
  }
};
