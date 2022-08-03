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

export async function getTransactionHistory(status: string) {
  let params = '';

  if (status === 'ALL') {
    params = '';
  } else {
    params = status;
  }
  const url = `${ROOT_API}/${API_VERSION}/player/history?status=${params}`;

  return callApi({
    url,
    method: 'GET',
    token: true
  });
}

export async function getTransactionHistoryDetail(id: string, token: string) {
  const url = `${ROOT_API}/${API_VERSION}/player/history/${id}/detail`;

  return callApi({
    url,
    method: 'GET',
    serverToken: token
  });
}
