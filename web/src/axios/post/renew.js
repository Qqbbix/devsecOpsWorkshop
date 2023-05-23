import axios from 'axios'

const renew = async () => {
  return axios.post('/api/login/renew/');
};

export default renew
