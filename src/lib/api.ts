const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_BASE_URL_NETWORK = process.env.API_BASE_URL_NETWORK || 'http://10.199.165.225:5000';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class ApiClient {
  private baseUrl: string;
  private networkUrl: string;

  constructor(baseUrl: string = API_BASE_URL, networkUrl: string = API_BASE_URL_NETWORK) {
    this.baseUrl = baseUrl;
    this.networkUrl = networkUrl;
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Try localhost first, then network IP as fallback
    const urls = [this.baseUrl, this.networkUrl];
    
    for (let i = 0; i < urls.length; i++) {
      try {
        const url = `${urls[i]}${endpoint}`;
        
        const defaultHeaders = {
          'Content-Type': 'application/json',
        };

        const config: RequestInit = {
          ...options,
          headers: {
            ...defaultHeaders,
            ...options.headers,
          },
        };

        console.log(`API Request (attempt ${i + 1}): ${config.method || 'GET'} ${url}`);

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
          // If this is not the last URL, continue to next
          if (i < urls.length - 1) {
            console.log(`Request failed with ${response.status}, trying next URL...`);
            continue;
          }
          
          return {
            success: false,
            error: data.message || `HTTP ${response.status}`,
            message: data.message || 'Request failed',
          };
        }

        // Success - log which URL worked
        console.log(`API Request successful using: ${urls[i]}`);
        return {
          success: true,
          data,
          message: data.message,
        };
      } catch (error) {
        console.error(`API Request failed for ${urls[i]}:`, error);
        
        // If this is the last URL, return error
        if (i === urls.length - 1) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            message: 'Network error or server unavailable on all endpoints',
          };
        }
        
        // Otherwise, continue to next URL
        console.log('Trying next URL...');
      }
    }

    // This should never be reached, but just in case
    return {
      success: false,
      error: 'All endpoints failed',
      message: 'Network error or server unavailable',
    };
  }

  // Auth endpoints
  async login(email: string, password: string, type: string = 'alumni') {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, type }),
    });
  }

  async register(userData: any) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async forgotPassword(email: string) {
    return this.request('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Alumni endpoints
  async getAlumniProfile(id: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return this.request(`/api/alumni/${id}`, { headers });
  }

  async updateAlumniProfile(id: string, data: any, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return this.request(`/api/alumni/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
  }

  // Chat endpoints
  async getChatHistory(token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return this.request('/api/chat/history', { headers });
  }

  async sendMessage(message: string, token?: string) {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return this.request('/api/chat/send', {
      method: 'POST',
      headers,
      body: JSON.stringify({ message }),
    });
  }
}

export const apiClient = new ApiClient();