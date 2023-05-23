import axios from 'axios'

const get = async () => {
  return axios.get('/api/login/info/');
};

export default {
  get,
}
