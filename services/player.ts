import axios from 'axios';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getFeaturedGame() {
  const URL = 'player/landing-page';
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.get(fullUrl);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getDetailVoucher(id) {
  const URL = `player/${id}/detail`;
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.get(fullUrl);
  const axiosResponse = response.data;

  return axiosResponse.data;
}
