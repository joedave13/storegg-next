import axios from 'axios';

export async function getFeaturedGame() {
  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const API_VERSION = 'api/v1';
  const URL = 'player/landing-page';
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.get(fullUrl);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getDetailVoucher() {
  return null;
}
