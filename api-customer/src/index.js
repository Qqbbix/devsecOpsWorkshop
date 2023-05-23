const express = require('express')
const helmet = require('helmet')

const appConfig = require('./env/index')
const db = require('./database/db')
const bodyParser = require('body-parser');
const { getCustomer, addPoint } = require('./controller/customer')

const app = express()
const port = 3000

app.use(helmet())
app.use(bodyParser.json())


const appShutdownHandler = async (opt) => {
  console.log('Shutdown app with sign :', opt.signal)
  await db.disconnect()
  process.exit(0)
}

process.on('SIGUSR2', appShutdownHandler.bind(null,{signal: 'SIGUSR2'}))
process.on('SIGINT', appShutdownHandler.bind(null,{signal: 'SIGINT'}))
process.on('SIGTERM', appShutdownHandler.bind(null,{signal: 'SIGTERM'}))

app
  .get('/', getCustomer)
  .get('/:cusID/', getCustomer)
  .put('/:cusID/addPoint/:point/', addPoint)
  const server = async () => {
    appConfig.showConfig()
    try {
      await db.checkConnection()
    } catch (err) {
      console.log(err.message)
      process.exit(1)
    }
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
  
  server()