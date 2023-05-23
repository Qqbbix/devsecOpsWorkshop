import axios from 'axios'

const get = async () => {
  return axios.get('/api/reward/')
}

export default {
  get,
}
