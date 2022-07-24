import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallApiProps extends AxiosRequestConfig {
  token?: boolean;
}

export default async function callApi({ url, method, data, token }: CallApiProps) {
  let headers = {};

  if (token) {
    const tokenCookie = Cookies.get('token');
    if (tokenCookie) {
      const jwtToken = atob(tokenCookie);
      headers = {
        Authorization: `Bearer ${jwtToken}`
      };
    }
  }

  const response = await axios({
    url,
    method,
    data,
    headers
  }).catch((err: any) => err.response);

  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message,
      data: null
    };
    return res;
  }

  const { length } = Object.keys(response.data);

  const res = {
    error: false,
    message: 'Success',
    data: length > 1 ? response.data : response.data.data
  };

  return res;
}
