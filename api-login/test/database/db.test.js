/* eslint-disable no-undef */
const mariadb = require('mariadb')

const newLocal = '../../src/database/db'

jest.mock('mariadb')

describe('db', () => {
  afterEach(() => {
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

  it('connect to database with good env should return connection', async () => {
    mariadb.createPool.mockImplementation(() => pool)
    pool.getConnection.mockResolvedValue(connection)
    pool.end.mockResolvedValue(null)

    connection.query.mockResolvedValue({ val: 1 })
    connection.end.mockResolvedValue(null)

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const db = require(newLocal)

    expect(db.getConnection).toBeDefined()

    const conn = await db.getConnection()

    expect(conn).toBeDefined()
    expect(conn.query).toBeDefined()
    expect(conn.end).toBeDefined()
  })

  it('connect to database with bad env should return error', async () => {
    mariadb.createPool.mockRejectedValue(new Error('error'))

    pool.getConnection.mockResolvedValue(connection)
    pool.end.mockResolvedValue(null)

    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const db = require(newLocal)

      await db.getConnection()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  it('Check database connection good connection should return success', async () => {
    mariadb.createPool.mockImplementation(() => pool)
    pool.getConnection.mockResolvedValue(connection)
    pool.end.mockResolvedValue(null)

    connection.query.mockResolvedValue({ val: 1 })
    connection.end.mockResolvedValue(null)

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const db = require(newLocal)

    const result = await db.checkConnection()

    expect(result).toBeDefined()
    expect(result.val).toBe(1)
  })

  it('Check database connection bad connection should return exception', async () => {
    mariadb.createPool.mockImplementation(() => pool)
    pool.getConnection.mockRejectedValue(new Error('error'))

    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const db = require(newLocal)

      await db.checkConnection()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  it('disconnect database should return success', async () => {
    mariadb.createPool.mockImplementation(() => pool)
    pool.getConnection.mockResolvedValue(connection)
    pool.end.mockResolvedValue(null)

    connection.query.mockResolvedValue({ val: 1 })
    connection.end.mockResolvedValue(null)

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const db = require(newLocal)

    await db.disconnect()

    expect(pool.end).toHaveBeenCalled()
  })

})
