import callApi from '../config/api';
import { LoginTypes } from './data-types';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function signUp(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/auth/sign-in`;

  return callApi({
    url,
    method: 'POST',
    data
  });
}

export async function signIn(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VERSION}/auth/sign-in`;

  return callApi({
    url,
    method: 'POST',
    data
  });
}
