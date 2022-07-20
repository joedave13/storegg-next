import axios from 'axios';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function signUp(data: any) {
  const URL = 'auth/sign-up';
  const fullUrl = `${ROOT_API}/${API_VERSION}/${URL}`;

  const response = await axios.post(fullUrl, data);
  const axiosResponse = response.data;

  return axiosResponse.data;
}

export async function signIn() {
  return true;
}
