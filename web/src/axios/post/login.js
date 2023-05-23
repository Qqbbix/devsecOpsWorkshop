import axios from 'axios'

const getLogin = async (body) => {
  return axios.post('/api/login/customer/', body);
};

export default {
  getLogin,
}
