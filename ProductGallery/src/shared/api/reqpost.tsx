import { request } from '../js';

export const login = (data: any) =>
  request({
    method: 'post',
    endpoint: 'auth/login',
    data,
  });

export const addEditProduct = (data: any) =>
  request({
    method: 'post',
    endpoint: 'product',
    data,
  });

export const getProducts = (data: any) =>
  request({
    method: 'post',
    endpoint: 'products',
    data,
  });
