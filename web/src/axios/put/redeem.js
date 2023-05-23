import axios from 'axios'

const getRedeem = async (rewardId, body) => {
  return axios.put(`/api/reward/redeem/${rewardId}`, body);
};

export default {
  getRedeem,
}
