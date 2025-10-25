import axios from 'axios';

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

    // Add auth token to requests
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
  }

  // Mock data for now
  async getNearbyListings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Fresh Homemade Pasta',
            category: 'meals',
            quantity: '4 servings',
            location: { address: 'Koramangala, Bangalore' },
            ai_predictions: { freshness_score: 95 },
            donor_name: 'Priya',
            images: ['https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400']
          },
          {
            id: '2',
            title: 'Organic Vegetables',
            category: 'vegetables',
            quantity: '2kg mixed',
            location: { address: 'Indiranagar, Bangalore' },
            ai_predictions: { freshness_score: 88 },
            donor_name: 'Rahul',
            images: ['https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400']
          }
        ]);
      }, 1000);
    });
  }

  // Register a new user
  // Expects the backend to accept the payload described in the app UI and return
  // an object containing { user, access_token, token_type } on success.
  async register(userData) {
    try {
      const response = await this.api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      // Re-throw so callers can inspect error.response / error.message
      throw error;
    }
  }

  // Login user
  // Expects { email, password } and returns { access_token, token_type, user }
  async login(credentials) {
    try {
      const response = await this.api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new APIService();
