import callApi from '../config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function getDashboard() {
  const url = `${ROOT_API}/${API_VERSION}/player/dashboard`;

  return callApi({
    url,
    method: 'GET',
    token: true
  });
}

export async function getTransactionHistory() {
  const url = `${ROOT_API}/${API_VERSION}/player/history`;

  return callApi({
    url,
    method: 'GET',
    token: true
  });
}
