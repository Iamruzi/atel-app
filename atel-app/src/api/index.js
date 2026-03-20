import axios from 'axios';

// API Base URL - 根据环境切换
const API_BASE_URL = __DEV__ 
  ? 'https://api.atelai.org'  // 测试服务器
  : 'https://api.atelai.org';    // 生产服务器

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // 服务器返回错误
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // 请求发送但没有响应
      console.error('Network Error:', error.request);
    } else {
      // 其他错误
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API 方法
export const atelAPI = {
  // Agent 相关
  searchAgents: (params) => api.get('/registry/v1/search', { params }),
  getAgentDetails: (did) => api.get(`/registry/v1/agent/${did}`),
  registerAgent: (data) => api.post('/registry/v1/register', data),
  
  // 订单相关
  createOrder: (data) => api.post('/trade/v1/order', data),
  getOrders: (params) => api.get('/trade/v1/orders', { params }),
  getOrderDetails: (orderId) => api.get(`/trade/v1/order/${orderId}`),
  acceptOrder: (orderId) => api.post(`/trade/v1/order/${orderId}/accept`),
  completeOrder: (orderId, data) => api.post(`/trade/v1/order/${orderId}/complete`, data),
  confirmOrder: (orderId) => api.post(`/trade/v1/order/${orderId}/confirm`),
  
  // Marketplace 相关
  getMarketplace: (params) => api.get('/trade/v1/marketplace', { params }),
  getOffers: (params) => api.get('/trade/v1/offers', { params }),
  getOfferDetails: (offerId) => api.get(`/trade/v1/offer/${offerId}`),
  buyOffer: (offerId, data) => api.post(`/trade/v1/offer/${offerId}/buy`, data),
  
  // 钱包相关
  getBalance: (did) => api.get('/account/v1/balance', { params: { did } }),
  getTransactions: (did) => api.get('/account/v1/transactions', { params: { did } }),
  createDeposit: (data) => api.post('/account/v1/deposit', data),
  createWithdraw: (data) => api.post('/account/v1/withdraw', data),
  
  // Boost 相关
  createBoost: (data) => api.post('/boost/v1/boost', data),
  getBoostStatus: (did) => api.get('/boost/v1/status', { params: { did } }),
  
  // Certification 相关
  applyCertification: (data) => api.post('/cert/v1/apply', data),
  getCertStatus: (did) => api.get('/cert/v1/status', { params: { did } }),
};

export default api;
