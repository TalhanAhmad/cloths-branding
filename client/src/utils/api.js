import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const productAPI = {
  getAll: (filters) => API.get('/products', { params: filters }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`)
};

export const userAPI = {
  register: (data) => API.post('/users/register', data),
  login: (data) => API.post('/users/login', data),
  getProfile: (id) => API.get(`/users/${id}`)
};

export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getUserOrders: (userId) => API.get(`/orders/user/${userId}`),
  getAll: () => API.get('/orders'),
  updateStatus: (id, status) => API.put(`/orders/${id}`, { orderStatus: status })
};

export const reviewAPI = {
  create: (data) => API.post('/reviews', data),
  getByProduct: (productId) => API.get(`/reviews/product/${productId}`)
};

export default API;
