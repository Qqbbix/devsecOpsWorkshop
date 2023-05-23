const axios = require('axios')

const notifyConfig = require('../env').notify
const interceptors = require('../middleware/axios')

axios.interceptors.request.use(interceptors.request, interceptors.requestReject)
axios.interceptors.response.use(interceptors.response, interceptors.responseReject)

const send = async (body, customHeaders) => {

  if (!notifyConfig.url) return [null]

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders
  }

  const options = { headers, timeout: notifyConfig.timeout * 1000 }

  try {
    const res = await axios.post(`${notifyConfig.url}/`, body, options)
    return [null, res]
  } catch (error) {
    return [error, null]
  }
}

module.exports = {
  send,
}
