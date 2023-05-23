const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const db = require('./database/db')
const service = require('./service')
const validate = require('./validate')
const jwtMiddleware = require('./middleware/jwt')
const appConfig = require('./env/index')
const appInfo = require('../package.json')

const app = express()
const port = 3000

app.use(helmet())
app.use(express.json())
app.use(cookieParser())

app.get('/version/', (_, res) => {
  res.send({ version: appInfo.version })
})

app.get('/info/', jwtMiddleware.checkToken, (req, res) => {
  return res.json(req.user)
})

app.post('/customer/', async (req, res) => {

  const [errorValidate,] = validate.customerLogin(req.body)
  if (errorValidate) return res.status(400).send(errorValidate)

  const [status, token] = await service.customerLogin(req.body)

  if (status === 200) {

    res.status(status).json({ token })
  } else {
    console.error("Login failed cause by ", token)
    res.status(status).send()
  }
})

app.post('/renew/', jwtMiddleware.checkToken, async (req, res) => {
  console.log(req)
  const token = await service.renewToken(req.user)

  res.json({ token })

})

app.post('/logout/', async (req, res) => {
  service.logout(req, res)
})

const appShutdownHandler = async (opt) => {
  console.log('Shutdown app with sign :', opt.signal)
  await db.disconnect()
  process.exit(0)
}

process.on('SIGUSR2', appShutdownHandler.bind(null, { signal: 'SIGUSR2' }))
process.on('SIGINT', appShutdownHandler.bind(null, { signal: 'SIGINT' }))
process.on('SIGTERM', appShutdownHandler.bind(null, { signal: 'SIGTERM' }))

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
