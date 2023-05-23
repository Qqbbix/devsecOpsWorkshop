const jwt = require('jsonwebtoken')
const validate = require('../validate')

const { loginConfig } = require('../env')

const getSecretByJWT = (token) => {
  try {
    const loginInfo = jwt.decode(token)

    return getSecretByRole(loginInfo.user.role, loginConfig)
  } catch (err) {
    console.log(`getSecretByJWT >> error: ${err.message}`)
    return [err.message]
  }
}

function getSecretByRole(role, loginConfig) {
  switch (role) {
    case 'admin':
      return [null, loginConfig.adminSecretKey]
    case 'customer':
      return [null, loginConfig.userSecretKey]
    default:
      return ['Invalid user role.']
  }
}

const validatePayload = (payload) => {
  if (!payload) return ['Payload not set.', false]

  if (!payload.id) return ['ID not defined', false]
  const [errorId, idStatus] = validate.validateNumber(payload.id, 0, 999999)
  if (!idStatus) return [`ID ${errorId}`, false]

  const [errorUsername, usernameStatus] = validate.validateString(payload.name)
  if (!usernameStatus) return [`Username ${errorUsername}`, false]

  const [errorRole, roleStatus] = validate.validateString(payload.role)
  if (!roleStatus) return [`Role ${errorRole}`, false]

  if (!validate.validateUserRoles(payload)) return [`Invalid user role[${payload.role}].`, false]

  return [null, true]
}

const createJWT = (user, loginConfig) => {
  const [errorMessage, validateStatus] = validatePayload(user)

  if (!validateStatus) throw new Error(errorMessage)

  const payload = { user }

  const options = { expiresIn: loginConfig.tokenTimeout }

  const [, secret] = getSecretByRole(user.role, loginConfig)

  return jwt.sign(payload, secret, options)
}

const verifyToken = (token) => {
  if (!token) {
    console.error('checkToken : No token, authorization denied')
    return ["no token", null]
  }

  const [_err, secret] = getSecretByJWT(token)

  if (_err) {
    console.error('checkToken : ', _err)
    return [_err, null]
  }

  try {
    const decoded = jwt.verify(token, secret)
    return [null, decoded.user]
  } catch (err) {
    console.error('checkToken : ', err.message)
    return [err.message, null]
  }

}

module.exports = {
  createJWT,
  getSecretByRole,
  verifyToken,
}
