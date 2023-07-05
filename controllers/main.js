const { BADRequestError } = require('../errors')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
  const { username, password } = req.body

  // Mongo validation
  //Joi
  // Controller validation
  if (!username || !password) {
    throw new BADRequestError('Please provide email or password')
  }

  const id = Math.floor(Math.random() * 100)

  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  res.json({ msg: 'User has created', token })
}

const dashboard = async (req, res) => {
  const secret = Math.floor(Math.random() * 100)
  res.json({
    msg: `Welcome ${req.user.username}`,
    secret: `Your secret value is ${secret}`,
  })
}

module.exports = { login, dashboard }
