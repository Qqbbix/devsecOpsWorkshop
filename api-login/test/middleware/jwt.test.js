const jwt = require('../../src/middleware/jwt')

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.user = {}
  res.end = jest.fn()
  return res
}

describe("JWT Middleware", () => {
  beforeEach(() => {
    jest.resetModules() //clear cache
  })

  describe('check Token', () => {
    const loginDatas = [
      { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY1ODQyNzA0Nn0.J8DH3NB20EQXXFoWsZoWxwh5qpWmVWSgASZx7NHVyUg", "userType": "admin" },
      { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImN1c3RvbWVyMSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NTg0MjY5OTZ9.vUCqw6DkNgvtgMwe5WJVTz3m4m4XiTMUctmHyerSc8E", "userType": "customer" }
    ]

    loginDatas.forEach(loginData => {
      it(`check ${loginData.userType} token should return userinfo role ${loginData.userType}`, async () => {
        const token = loginData.token
        const req = {
          cookies: 
            { token }
        }

        const res = mockResponse()
        const next = jest.fn()

        await jwt.checkToken(req, res, next)

        expect(next.mock.calls.length).toBe(1)

      })

    })
  })

  describe('getSecretByJWT', () => {
    const badLoginDatas = [
      { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6Imd1ZXN0In0sImlhdCI6MTY1ODQyNzA0Nn0.mWAhzw-zXFheSs_TxmrztOuGCzWYJbGJJqigP_PZw98", "userType": "guest" },
      { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImN1c3RvbWVyMSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NTg0MjY5OT.vUCqw6DkNgvtgMwe5WJVTz3m4m4XiTMUctmHyerSc8E", "userType": "admin bad jwt" },
      { 'token': '', 'userType': 'no token' },
      { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImN1c3RvbWVyMSIsInJvbGUiOiJjdXN0b21lciJ9LCJpYXQiOjE2NTg0MjY5OTYsImV4dCI6MTY1ODQyNzk5Nn0.ebaC_FgWl9DIPWLcrgy0O8dB-gQg7fK-pJQadTOb7CU', 'userType': 'bad token' }

    ]

    badLoginDatas.forEach(data => {
      it(`check ${data.userType} token should return userinfo role ${data.userType}`, async () => {
        const token = data.token
        const req = {
          cookies: {
            token     
          }
        }

        const res = mockResponse()
        const next = jest.fn()

        await jwt.checkToken(req, res, next)

        expect(next.mock.calls.length).toBe(0)

        expect(res.status.mock.calls[0][0]).toBe(401)

      })

    })
  })
})