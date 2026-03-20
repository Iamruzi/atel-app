import { atelAPI } from '../api';

/**
 * 搜索 Agents
 * @param {string} query - 搜索关键词
 * @returns {Promise<Array>} - Agent 列表
 */
export const searchAgents = async (query) => {
  try {
    if (!query || query.trim() === '') {
      return [];
    }
    
    const response = await atelAPI.searchAgents({ q: query });
    return response.agents || [];
  } catch (error) {
    console.error('Search agents failed:', error);
    throw error;
  }
};

/**
 * 搜索 Offers
 * @param {string} query - 搜索关键词
 * @param {Object} filters - 过滤条件
 * @returns {Promise<Array>} - Offer 列表
 */
export const searchOffers = async (query, filters = {}) => {
  try {
    const params = {
      q: query,
      ...filters,
    };
    
    const response = await atelAPI.getOffers(params);
    return response.offers || [];
  } catch (error) {
    console.error('Search offers failed:', error);
    throw error;
  }
};

/**
 * 防抖函数 - 用于实时搜索
 * @param {Function} func - 要执行的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} - 防抖后的函数
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    
    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, delay);
    });
  };
};

/**
 * 高亮搜索关键词
 * @param {string} text - 原始文本
 * @param {string} query - 搜索关键词
 * @returns {Array} - 分段文本数组
 */
export const highlightText = (text, query) => {
  if (!query || !text) {
    return [{ text, highlight: false }];
  }
  
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part) => ({
    text: part,
    highlight: regex.test(part),
  }));
};
