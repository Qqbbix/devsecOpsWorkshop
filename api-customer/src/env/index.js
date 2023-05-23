/* eslint-disable no-console */
const dbHostname = process.env.DB_HOSTNAME ?? 'localhost'
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbConnectionLimit = process.env.DB_CON_LIMIT ?? '10'
const dbDatabaseName = process.env.DB_DATABASE ?? 'K1'

const secretKeyAdmin = process.env.SECRET_KEY_ADMIN ?? 'secret_admin'
const secretKeyUser = process.env.SECRET_KEY_USER ?? 'secret_user'
const tokenTimeout = process.env.TOKEN_TIMEOUT_SECONDS ?? '60'

const notifyUrl = process.env.NOTIFY_URL ?? null

if (dbUsername == null) {
  console.log('Please set the environment "DB_USERNAME" variables for the database')
  process.exit(1)
}
 
if (dbPassword == null) {
  console.log('Please set the environment "DB_PASSWORD" variables for the database')
  process.exit(1)
}

const showConfig = () => {
  console.info('|==================================')
  console.info("|-------- Database Config ---------")
  console.info('|==================================')
  console.info('|')
  console.info(`| hostname: ${dbHostname}`)
  console.info(`| username: ${dbUsername}`)
  console.info(`| connectionLimit: ${dbConnectionLimit}`)
  console.info(`| database: ${dbDatabaseName}`)
  console.info('|')  
  console.info('|==================================')
  console.info("|---------- Login Config ----------")
  console.info('|==================================')
  console.info('|')
  console.info(`| Token Timeout: ${tokenTimeout} Seconds.`)
  console.info('|')
  console.info('|==================================')
  console.info("|---------- Notify Config ---------")
  console.info('|==================================')
  console.info('|')
  console.info(`| Notify URL: ${notifyUrl}`)
  console.info('|')
  console.info("-----------------------------------\n")
}

module.exports = {
  databaseConfig: {
    hostname: dbHostname,
    username: dbUsername,
    password: dbPassword,
    connectionLimit: Number(dbConnectionLimit),
    database: dbDatabaseName,
  },
  loginConfig: {
    adminSecretKey: secretKeyAdmin,
    userSecretKey: secretKeyUser,
    tokenTimeout: Number(tokenTimeout),
  },
  notify: {
    url: notifyUrl,
  },
  showConfig,
}
