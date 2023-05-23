const mariadb = require('mariadb')
const dbConfig = require('../../src/env').databaseConfig

const pool = mariadb.createPool({
     host: dbConfig.hostname, 
     user: dbConfig.username,
     password: dbConfig.password,
     connectionLimit: dbConfig.connectionLimit,
      database: dbConfig.database
})

const getConnection = () => pool.getConnection()

const disconnect = async () => {
  await pool.end() 
  console.info('All database connections are now closed')
}

const checkConnection = async () => {
  let conn 
  try {
     conn = await pool.getConnection()
    
    return await conn.query('SELECT * FROM REWARD')

  }finally{
    if(conn != null) conn.end()
  }
}

module.exports = {
  getConnection,
  checkConnection,
  disconnect,
}