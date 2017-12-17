
const CONFIG = require('./config')
const axios = require('axios')

class Api {
  get(data) {
    data.method ='get'
    return request(data)
  }

  put(data) {
    data.method = 'put'
    return request(data)
  }

  post(data) {
    data.method = 'post'
    return request(data)
  }

  delete (data) {
    data.method = 'delete'
    return request(data)
  }

  request(data) {
    const config = Object.assign({}, CONIG)
    const ACCESS_TOKEN = '872a5148-c8dd-4afa-8100-137c29df2f55'
    data.header && (config.headers = data.header)
    config.body = data.params
    data.accesstoken && (config.body.accesstoken = ACCESS_TOKEN)
    config.url = data.url
    config.method = data.method
    axios.default.withCredentials = true
    return axios(config)
  }
}

module.exports = new Api;