const validate = require('../../src/validate')

const userRoles = [
  { 'role': 'admin', 'expect': true },
  { 'role': 'customer', 'expect': true },
  { 'role': 'guest', 'expect': false },
  { 'role': '', 'expect': false },
  { 'role': null, 'expect': false },
  { 'role': undefined, 'expect': false },
  { 'role': 1, 'expect': false }
]

const validateNumberInputs = [
  { 'id': 1, 'input': 1, 'lowerBound': 0, 'upperBound': 1, 'expect': true },
  { 'id': 2, 'input': 2, 'lowerBound': 1, 'upperBound': 3, 'expect': true },
  { 'id': 3, 'input': 3, 'lowerBound': 3, 'upperBound': 3, 'expect': true },
  { 'id': 4, 'input': 1, 'lowerBound': 1, 'upperBound': 0, 'expect': false },
  { 'id': 5, 'input': 1, 'lowerBound': 0, 'upperBound': -1, 'expect': false },
  { 'id': 6, 'input': 1, 'lowerBound': -1, 'upperBound': -1, 'expect': false },
  { 'id': 7, 'input': 1, 'lowerBound': -1, 'upperBound': 0, 'expect': false },
  { 'id': 8, 'input': 1, 'lowerBound': 0, 'upperBound': 0, 'expect': false },
  { 'id': 9, 'input': null, 'lowerBound': 0, 'upperBound': 0, 'expect': false },
  { 'id': 10, 'input': undefined, 'lowerBound': 0, 'upperBound': 0, 'expect': false },
  { 'id': 11, 'input': 1, 'expect': true },
  { 'id': 12, 'input': 10, 'upperBound': 2, 'expect': false },
  { 'id': 13, 'input': 2, 'upperBound': 2, 'expect': true },
  { 'id': 14, 'input': 1, 'lowerBound': 2, 'expect': false },
  { 'id': 15, 'input': 10, 'lowerBound': 2, 'expect': true },
]

describe('Validate', () => {
  describe('validate User Role', () => {
    userRoles.forEach(userRole => {
      it(`should return ${userRole.expect} for ${userRole.role}`, () => {
        const user = {
          'role': userRole.role
        }
        expect(validate.validateUserRoles(user)).toEqual(userRole.expect)
      })
    })
  })


  describe('validate String', () => { })

  describe('validate Number', () => {
    validateNumberInputs.forEach(validateNumberInput => {
      it(`[${validateNumberInput.id}] should return ${validateNumberInput.expect} for ${validateNumberInput.input} bound[${validateNumberInput.lowerBound},${validateNumberInput.upperBound}]`, () => {

        let status = []
        if (validateNumberInput.lowerBound !== undefined && validateNumberInput.upperBound !== undefined) {
          status = validate.validateNumber(validateNumberInput.input, validateNumberInput.lowerBound, validateNumberInput.upperBound)
        } else if (validateNumberInput.lowerBound !== undefined && validateNumberInput.upperBound === undefined) {
          status = validate.validateNumber(validateNumberInput.input, validateNumberInput.lowerBound)
        } else if (validateNumberInput.lowerBound === undefined && validateNumberInput.upperBound !== undefined) {
          status = validate.validateNumber(validateNumberInput.input, undefined, validateNumberInput.upperBound)
        } else {
          status = validate.validateNumber(validateNumberInput.input)
        }

        expect(status[1]).toEqual(validateNumberInput.expect)
      })
    })
  })

  const loginDataList = [
    { 'id': 1, 'password': 'password', 'expect': true },
    { 'id': 2, 'password': '', 'expect': true },
    { 'id': 3, 'password': null, 'expect': false },
    { 'id': 1000000, 'password': '1234', 'expect': false },
  ]

  describe('validate login', () => {
    loginDataList.forEach(loginData => {
      it(`login with ID: ${loginData.id} password: ${loginData.password} should return ${loginData.expect}`, () => {
        
        const actual = validate.customerLogin(loginData)
        expect(actual[1]).toEqual(loginData.expect)

      })
    })
  })

})
