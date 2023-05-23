const mariadb = require('mariadb')
const jwt = require('jsonwebtoken')

jest.mock('mariadb')

const loginTests = [
  {
    'testCase': 'customer ',
    'input': { 'id': 1, 'password': 'customer1x' },
    'mockUser': { 'ID': 1, 'NAME': 'customer1', 'PASSWORD': '882f9c6be1ebea5753322862afe5a339342bd5b3', 'ADD_DATE': '2022-07-13 16:01:18', 'NONCE': '16577280780002312416', },
    'expectedValue': {
      'status': 200,
      'user': { 'id': 1, 'name': 'customer1', 'role': 'customer' }
    }
  }
]

const customers = [{
  'ID': 1,
  'NAME': 'customer1',
  'PASSWORD': '882f9c6be1ebea5753322862afe5a339342bd5b3',
  'ADD_DATE': '2022-07-13 16:01:18',
  'NONCE': '16577280780002312416',
}]

const loginBadData = [
  {
    'testCase': 'no id in customer',
    'input': { 'id': 99, 'password': 'customer1x' },
    'mockReturnValue': [],
  },
  {
    'testCase': 'wrong password',
    'input': { 'id': 1, 'password': '1234' },
    'mockReturnValue': customers,
  },
]

describe('Service', () => {

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  const pool = {
    getConnection: jest.fn(),
    end: jest.fn(),
  }

  const connection = {
    query: jest.fn(),
    end: jest.fn(),
  }

  describe('login service', () => {

    const loginData = loginTests[0]

    it(`login with ${loginData.testCase} id=${loginData.input.username} and password ${loginData.input.password} should return status ${loginData.status} and token`, async () => {

      mariadb.createPool.mockImplementation(() => pool)
      pool.getConnection.mockResolvedValue(connection)
      pool.end.mockResolvedValue(null)

      connection.query.mockResolvedValue(customers)
      connection.end.mockResolvedValue(null)

      const service = require('../../src/service')

      const [status, token] = await service.customerLogin(loginData.input)

      expect(status).toEqual(loginData.expectedValue.status)
      expect(token).toBeDefined()

      const decodedUser = jwt.decode(token)
      expect(decodedUser.user).toEqual(loginData.expectedValue.user)
    })

    loginBadData.forEach(badData => {
      it(`login with ${badData.testCase} id=${badData.input.id} and password ${badData.input.password} should return status 401 and null token`, async () => {

        mariadb.createPool.mockImplementation(() => pool)
        pool.getConnection.mockResolvedValue(connection)
        pool.end.mockResolvedValue(null)

        connection.query.mockResolvedValue(badData.mockReturnValue)
        connection.end.mockResolvedValue(null)
        const service = require('../../src/service')

        const [status,] = await service.customerLogin(badData.input)
        expect(status).toEqual(401)
      })
    })

    it('login with error from database should return status 500 and null token', async () => {

      mariadb.createPool.mockImplementation(() => pool)
      pool.getConnection.mockResolvedValue(connection)
      pool.end.mockResolvedValue(null)

      connection.query.mockRejectedValue(new Error('error'))
      connection.end.mockResolvedValue(null)
      const service = require('../../src/service')

      const [status,] = await service.customerLogin({ id: 1, password: 'password1x' })
      expect(status).toEqual(500)
    })

    it('login with database connection fail should return status 500 and null token', async () => {

      mariadb.createPool.mockImplementation(() => pool)
      pool.getConnection.mockRejectedValue(new Error('get connection error'))
      pool.end.mockResolvedValue(null)

      connection.query.mockRejectedValue(new Error('error'))
      connection.end.mockResolvedValue(null)
      const service = require('../../src/service')

      const [status,] = await service.customerLogin({ id: 1, password: 'password1x' })
      expect(status).toEqual(500)
    })
  })

  describe('renew token', () => {
    it('renew token should return status 200 and token', async () => {
      const service = require('../../src/service')

      const payload = { id: 1, name: 'customer1', role: 'customer' } 

      const renewToken = service.renewToken(payload)
      expect(renewToken).toBeDefined()
    })
  })

  describe('logout', () => {
    it('with token ', async () => {
      const service = require('../../src/service')

      const payload = { id: 1, name: 'customer1', role: 'customer' } 

      const renewToken = service.renewToken(payload)
      expect(renewToken).toBeDefined()
    })
  })
})
