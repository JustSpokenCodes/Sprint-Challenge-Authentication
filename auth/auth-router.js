const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

const Jokes = require('../jokes/jokes-model.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Jokes.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  Jokes.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({message: `Hey There ${user.username} ! How you been?`, token});
      } else {
        res.status(401).json({message: 'Invalid Credentials or to say better someone is not correct'})
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function genToken(user) {
  const payload = {
    subject: "user",
    username: user.username
  };
  const secret = secrets.jwtSecret;
  const options ={
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
