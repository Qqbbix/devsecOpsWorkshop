const jwtUtil = require('../../src/utils')

describe('create JWT Token', () => {
  const loginConfig = {
    adminSecretKey: 'secret_admin',
    userSecretKey: 'secret_user',
    tokenTimeout: 60
  }


  const userDatas = [
    { "loginType": "ADMIN", "user": { "id": 1, "name": "admin", "role": "admin" }, "status": 200 },
    { "loginType": "CUSTOMER", "user": { "id": 2, "name": "customer2", "role": "customer" }, "status": 200 },
  ]

  const badUserData = [
    { "loginType": "ADMIN","testCase": "No payload", "msg": "Payload not set." },
    { "loginType": "ADMIN","testCase": "empty user object", "user": {}, "msg": "ID not defined" },
    { "loginType": "ADMIN","testCase": "id is null", "user": { "id": null }, "msg": "ID not defined" },
    { "loginType": "ADMIN","testCase": "id value type string", "user": { "id": "1" }, "msg": "ID is not a number" },
    { "loginType": "ADMIN","testCase": "id value type object", "user": { "id": {} }, "msg": "ID is not a number" },
    { "loginType": "ADMIN","testCase": "id value type boolean", "user": { "id": true }, "msg": "ID is not a number" },
    { "loginType": "ADMIN","testCase": "id value 0", "user": { "id": 0 }, "msg": "ID not defined" },
    { "loginType": "ADMIN","testCase": "id value -1", "user": { "id": -1 }, "msg": "ID out of range" },
    { "loginType": "ADMIN","testCase": "id value 11111111", "user": { "id": 11111111 }, "msg": "ID out of range" },
    { "loginType": "ADMIN","testCase": "no name key", "user": { "id": 1 }, "msg": "name not defined" },
    { "loginType": "ADMIN","testCase": "name is null", "user": { "id": 1, "name": null }, "msg": "name not defined" },
    { "loginType": "ADMIN","testCase": "name empty value", "user": { "id": 1, "name": "" }, "msg": "name not defined" },
    { "loginType": "ADMIN","testCase": "name white space value", "user": { "id": 1, "name": " " }, "msg": "name is null or empty" },
    { "loginType": "ADMIN","testCase": "name value is object", "user": { "id": 1, "name": {} }, "msg": "name is not a string" },
    { "loginType": "ADMIN","testCase": "name value is boolean", "user": { "id": 1, "name": true }, "msg": "name is not a string" },
    { "loginType": "ADMIN","testCase": "name value is number", "user": { "id": 1, "name": 1 }, "msg": "name is not a string" },
    { "loginType": "ADMIN","testCase": "role is undefined", "user": { "id": 1, "name": "admin" }, "msg": "Role not defined" },
    { "loginType": "ADMIN","testCase": "role is null", "user": { "id": 1, "name": "admin", "role": null }, "msg": "Role not defined" },
    { "loginType": "ADMIN","testCase": "role is empty", "user": { "id": 1, "name": "admin", "role": "" }, "msg": "Role not defined" },
    { "loginType": "ADMIN","testCase": "role is whitespace", "user": { "id": 1, "name": "admin", "role": " " }, "msg": "Role is null or empty" },
    { "loginType": "ADMIN","testCase": "role is object", "user": { "id": 1, "name": "admin", "role": {} }, "msg": "Role is not a string" },
    { "loginType": "ADMIN","testCase": "role is boolean[false]", "user": { "id": 1, "name": "admin", "role": false }, "msg": "Role not defined" },
    { "loginType": "ADMIN","testCase": "role is boolean[true]", "user": { "id": 1, "name": "admin", "role": true }, "msg": "Role is not a string" },
    { "loginType": "ADMIN","testCase": "role is number", "user": { "id": 1, "name": "admin", "role": 1 }, "msg": "Role is not a string" },
    { "loginType": "ADMIN","testCase": "role set to guest", "user": { "id": 1, "name": "admin", "role": "guest" }, "msg": "Invalid user role[guest]." },
  ]

  userDatas.forEach(userData => {
    it(`create ${userData.loginType} Token should return a token`, () => {

      const token = jwtUtil.createJWT(userData.user, loginConfig)
      expect(token).toBeDefined()
      expect(token).toBeTruthy()
      expect(token.length).toBeGreaterThan(100)
    })
  })

  badUserData.forEach(data => {
    it(`create Token with bad payload '${data.testCase}' should return exception`, () => {
      expect(() => {
        jwtUtil.createJWT(data.user)
      }).toThrowError(data.msg)

    })

  })
})