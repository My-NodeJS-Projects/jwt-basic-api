const { UnAuthorizedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnAuthorizedError('No Auth Headers')
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    // console.log(decoded)
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnAuthorizedError(`Invalid token`)
  }
}

module.exports = authMiddleware
