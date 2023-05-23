import axios from 'axios'

axios.interceptors.response.use((response) => {
  return Promise.resolve({ error: undefined, result: response.data })
}, (error) => {
  return Promise.resolve({ error, result: undefined })
})
