const express = require('express')

const app = express()
const db = require('./database/db')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const { getReward, addReward, updateReward, redeemReward } = require('./controller/reward')
const config = require('./env')


app.disable('x-powered-by')
app.use(bodyParser.json())

app
  .get('/', getReward)
  .post('/', addReward)
  .get('/:rewardID/', getReward)
  .put('/:rewardID/', updateReward)
  .put('/redeem/:rewardID/', redeemReward)

const appShutdownHandler = async (opt) => {
  console.log('Shutdown app with sign :', opt.signal)
  await db.disconnect()
  process.exit(0)
}

process.on('SIGUSR2', appShutdownHandler.bind(null, { signal: 'SIGUSR2' }))
process.on('SIGINT', appShutdownHandler.bind(null, { signal: 'SIGINT' }))
process.on('SIGTERM', appShutdownHandler.bind(null, { signal: 'SIGTERM' }))

const server = async () => {
  config.showConfig()

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