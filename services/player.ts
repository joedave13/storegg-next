import axios from 'axios';
import callApi from '../config/api';
import { CheckoutItemTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getFeaturedGame() {
  const URL = 'player/landing-page';
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.get(fullUrl);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getDetailVoucher(id: string) {
  const URL = `player/${id}/detail`;
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.get(fullUrl);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function getGameCategory() {
  const URL = 'player/category';
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.get(fullUrl);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function checkout(data: CheckoutItemTypes) {
  const url = `${ROOT_API}/${API_VERSION}/player/checkout`;

  return callApi({
    url,
    method: 'POST',
    data,
    token: true
  });
}
