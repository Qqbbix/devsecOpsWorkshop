const isNullOrEmpty = (input) => input.trim() === ''

const validateUserRoles = (user) => ['customer', 'admin'].includes(user.role)

const validateString = (input) => {
  if (!input) return ['not defined', false]
  if (typeof input !== 'string') return ['is not a string', false]
  if (isNullOrEmpty(input)) return ['is null or empty', false]

  return [null, true]
}

const validateNumber = (input, lowerBound, upperBound) => {
  if (input === null) return ['value not assigned', false]
  if (typeof input !== 'number') return ['is not a number', false]

  if (lowerBound !== undefined && upperBound !== undefined) {
    if (input < lowerBound || input > upperBound) return ['out of range', false]
  } else if (lowerBound !== undefined && upperBound === undefined) {
    if (input < lowerBound) return ['out of range', false]
  } else if (lowerBound === undefined && upperBound !== undefined) {
    if (input > upperBound) return ['out of range', false]
  }

  return [null, true]
}

const customerLogin = (input) => {
  const [idError, idValid] = validateNumber(input.id, 1, 999999)

  if (!idValid) return [`ID ${idError}`, false]

  if (input.password === '') return [null, true]
  const [passwordError, passwordValid] = validateString(input.password)

  if (!passwordValid) return [passwordError, false]
  return [null, true]
}

module.exports = {
  validateUserRoles,
  validateString,
  validateNumber,
  isNullOrEmpty,
  customerLogin,
}
