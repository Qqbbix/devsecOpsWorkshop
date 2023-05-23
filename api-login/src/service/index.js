const crypto = require('crypto')

const db = require('../database/db')
const user = require('../database/user.js')
const utils = require('../utils/')
const notify = require('../api/notify')

const loginConfig = require('../env/').loginConfig

const salt = "teamK1"

const customerLogin = async (input) => {
  let conn = null

  try {
    conn = await db.getConnection()

    const data = await user.getCustomerData(conn, input.id)
    if (data.length === 0) return [401, "no user found"]

    const customer = data[0]
    const loginPwd = await generatePwd(input, customer.NONCE)

    if (loginPwd !== customer.PASSWORD) return [401, "bad password " + loginPwd + " " + customer.PASSWORD]

    const payload = {
      id: customer.ID,
      name: customer.NAME,
      role: 'customer',
      point: customer.POINT
    }

    const token = utils.createJWT(payload, loginConfig)
    sendNotify(`ลูกค้า [${customer.NAME}] เข้าสู่ระบบ.`)
    return [200, token]

  } catch (err) {
    console.log('Error : ', err)
    return [500, null]
  } finally {
    if (conn) conn.end()
  }
}

const generatePwd = async (input, nonce) => {
  const data = `${salt}-${input.password}-${nonce}`
  return crypto.createHash('sha1').update(data).digest('hex')
}

const renewToken = async (payload) => {
  return utils.createJWT(payload, loginConfig)
}

const logout = (req, res) => {
  const token = req.cookies.token
  const [err, data] = utils.verifyToken(token)
 
  if (!err) {
    res.clearCookie('token')
    sendNotify(`${(data.role === 'admin') ? 'เจ้าของร้าน' : 'ลูกค้า'} [${data.name}] ออกจากระบบ.`)
  }
  res.status(204).send()
}

const sendNotify = async (message) => {
  const body = {
    "message": message
  }

  notify.send(JSON.stringify(body))
}

module.exports = {
  customerLogin,
  renewToken,
  sendNotify,
  logout,
}
