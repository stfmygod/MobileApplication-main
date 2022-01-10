import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

import { getToken } from '../../auth';

const ENDPOINT_URL = 'http://localhost:3000/';

const handleSuccessResponse = (response: AxiosResponse) => {
  const { data } = response || {};
  const { response: nestedResponse } = data || {};

  return nestedResponse || data;
};

const handleErrorResponse = (response: AxiosResponse) => {
  const { data } = response || {};

  return data;
};

interface RequestParams {
  method: 'post' | 'put' | 'get';
  endpoint: string;
  data?: any;
  params?: any;
  options?: any;
}

export const request = async ({ method, endpoint, data, params, options = {} }: RequestParams) => {
  const headers: AxiosRequestHeaders = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  const url = `${ENDPOINT_URL}${endpoint}`;
  const { value: token } = await getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({ url, method, data, headers, params, ...options })
    .then(handleSuccessResponse)
    .catch(handleErrorResponse);
};
