import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class APIService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          window.location.href = '/login';
          toast.error('Session expired. Please login again.');
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async register(userData) {
    try {
      const response = await this.api.post('/auth/register', userData);
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        toast.success('Registration successful!');
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  }

  async login(email, password) {
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await this.api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        toast.success('Login successful!');
      }
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
      throw error;
    }
  }

  async getCurrentUser() {
    const response = await this.api.get('/auth/me');
    return response.data;
  }

  // Food listing methods
  async createFoodListing(listingData) {
    try {
      const response = await this.api.post('/food/listings', listingData);
      toast.success('Food listing created successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create listing');
      throw error;
    }
  }

  async getNearbyListings(longitude, latitude, radius = 5000, category = null) {
    const params = { longitude, latitude, radius };
    if (category) params.category = category;
    
    const response = await this.api.get('/food/listings/nearby', { params });
    return response.data;
  }

  async claimFoodListing(listingId, message) {
    try {
      const response = await this.api.post(`/food/listings/${listingId}/claim`, 
        message ? { message } : {}
      );
      toast.success('Food claimed successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to claim food');
      throw error;
    }
  }

  async uploadFoodImages(listingId, files) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    const response = await this.api.post(
      `/food/listings/${listingId}/upload-images`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  }

  logout() {
    localStorage.removeItem('access_token');
    toast.success('Logged out successfully');
  }

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  }
}

export default new APIService();
