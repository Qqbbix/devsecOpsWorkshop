const requestInterceptor = (config) => {
  console.info(">>>", `Request To : ${config.url}`)
  config.metadata = { startTime: new Date() }

  return config
}

const requestRejectInterceptor = (error) => {
  return Promise.reject(error)
}

const responseInterceptor = (response) => {
  console.info("<<<", `Receive From : ${response.config.url} response status: ${response.status}`)
  response.config.metadata.endTime = new Date()
  response.responseTime = response.config.metadata.endTime - response.config.metadata.startTime
  console.info("==>", `Response Time : ${response.responseTime / 1000} sec.`)
  return response
}

const responseRejectInterceptor = (error) => {
  console.log('=====>>>',error.message)
  if(error.response)
    console.info("<<<", `Receive From : ${error.config.url} response status: ${error.response.status}`)
  else 
    console.error("<<<", `Receive From : ${error.config.url} ERROR: ${error.code} - ${error.message}`)

  error.config.metadata.endTime = new Date()
  error.responseTime = error.config.metadata.endTime - error.config.metadata.startTime
  console.info("==>", `Response Time : ${error.responseTime / 1000} sec.`)
  return Promise.reject(error)
}

module.exports = {
  request: requestInterceptor,
  requestReject: requestRejectInterceptor,
  response: responseInterceptor,
  responseReject: responseRejectInterceptor,
}
