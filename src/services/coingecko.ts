import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
});

export const getUsdPrice = async (id: string, include_24hr_change = false) => {
  try {
    const resp = await httpClient.get(`/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=${include_24hr_change}`);
    if (include_24hr_change) {
      return resp.data[id];
    }

    return resp.data[id]?.usd;
  } catch (error) {
    console.error('Getting price error: ', error.message);
  }
};