import axios from 'axios';
import { LoginTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function signUp(data: any) {
  const URL = 'auth/sign-in';
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.post(fullUrl, data).catch((err) => err.response);
  const axiosResponse = response.data;

  if (axiosResponse.error === 1) {
    return axiosResponse;
  }

  return axiosResponse.data;
}

export async function signIn(data: LoginTypes) {
  const URL = 'auth/sign-in';
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.post(fullUrl, data).catch((err) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null
    };
    return res;
  }

  const res = {
    error: false,
    message: 'Login Success',
    data: response.data.data
  };

  return res;
}
