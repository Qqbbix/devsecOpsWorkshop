
describe('test envernment', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() //clear cache
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  const dbConfig = {
    hostname: 'localhost',
    username: 'root',
    password: 'root',
    connectionLimit: 10,
    database: 'K1'
  }

  const loginConfig = {
    adminSecretKey: 'secret_admin',
    userSecretKey: 'secret_user',
    tokenTimeout: 60
  }

  it('Set Config all env should return config matches dbConfig and loginConfig', () => {
    process.env.DB_HOSTNAME = dbConfig.hostname
    process.env.DB_USERNAME = dbConfig.username
    process.env.DB_PASSWORD = dbConfig.password
    process.env.DB_DATABASE = dbConfig.database
    process.env.DB_CONNECTION_LIMIT = dbConfig.connectionLimit

    process.env.SECRET_KEY_ADMIN = loginConfig.adminSecretKey
    process.env.SECRET_KEY_USER = loginConfig.userSecretKey
    process.env.TOKEN_TIMEOUT_SECONDS = loginConfig.tokenTimeout

    const env = require('../../src/env')

    expect(env).toBeDefined()
    expect(env.databaseConfig).toBeDefined()
    expect(env.loginConfig).toBeDefined()
    expect(env.databaseConfig).toEqual(dbConfig)
    expect(env.loginConfig).toEqual(loginConfig)
  })

  it('Set config with used default env should return config with default value', () => {
    delete process.env.DB_HOSTNAME
    process.env.DB_USERNAME = dbConfig.username
    process.env.DB_PASSWORD = dbConfig.password
    delete process.env.DB_DATABASE
    delete process.env.DB_CONNECTION_LIMIT

    delete process.env.SECRET_KEY_ADMIN
    delete process.env.SECRET_KEY_USER
    delete process.env.TOKEN_TIMEOUT_SECONDS

    const env = require('../../src/env')

    expect(env).toBeDefined()
    expect(env.databaseConfig).toBeDefined()
    expect(env.loginConfig).toBeDefined()
    expect(env.databaseConfig).toEqual(dbConfig)
    expect(env.loginConfig).toEqual(loginConfig)
  })

  it('Enveronment DB_USERNAME not set should process.exit()', () => {
    process.env.DB_HOSTNAME = 'localhost'
    delete process.env.DB_USERNAME

    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() called')
    })

    expect(() => {
      require('../../src/env')
    }).toThrow("process.exit() called")

    expect(process.exit).toHaveBeenCalled()

  })

  it('Enveronment DB_PASSWORD not set should process.exit()', () => {
    process.env.DB_HOSTNAME = 'localhost'
    process.env.DB_USERNAME = 'root'
    delete process.env.DB_PASSWORD

    jest.spyOn(process, 'exit').mockImplementationOnce(() => {
      throw new Error('process.exit() called')
    })

    expect(() => {
      require('../../src/env')
    }).toThrow("process.exit() called")

    expect(process.exit).toHaveBeenCalled()

  })

  it('call function showConfig should not error', () => {
    const env = require('../../src/env')

    expect(() => {
      env.showConfig()
    }).not.toThrow()
  })


})