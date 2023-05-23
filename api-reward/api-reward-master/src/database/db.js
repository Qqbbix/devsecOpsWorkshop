const mariadb = require('mariadb')
const dbConfig = require('../env').databaseConfig

const pool = mariadb.createPool({
  host: dbConfig.hostname,
  user: dbConfig.username,
  password: dbConfig.password,
  connectionLimit: dbConfig.connectionLimit,
  database: dbConfig.database,
})

const getConnection = () => pool.getConnection()

const checkConnection = async () => {
  let conn
  try {
    conn = await pool.getConnection()

    return await conn.query('SELECT 1 as val')
  } finally {
    if (conn != null) conn.end()
  }
}

module.exports = {
  getConnection,
  checkConnection,
}
