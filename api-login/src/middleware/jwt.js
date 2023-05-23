const jwt = require('jsonwebtoken')
const jwtUtil = require('../utils')

const checkToken = async (req, res, next) => {
  const token = req.cookies.token

  const [error,user] = jwtUtil.verifyToken(token)
  if(error) {
    console.log(error)
    res.status(401).end()
    return
  }

  req.user = user

  next()
}

module.exports = {
  checkToken,
}
