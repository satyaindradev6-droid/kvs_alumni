const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';
const API_BASE_URL_NETWORK = process.env.API_BASE_URL_NETWORK || 'http://10.199.165.225:5000';

export async function tryBackendRequest(endpoint: string, options: RequestInit) {
  const urls = [API_BASE_URL, API_BASE_URL_NETWORK];
  
  for (let i = 0; i < urls.length; i++) {
    try {
      console.log(`Trying backend request (attempt ${i + 1}): ${urls[i]}${endpoint}`);
      
      const response = await fetch(`${urls[i]}${endpoint}`, options);
      const data = await response.json();
      
      console.log(`Backend request successful using: ${urls[i]}`);
      return { response, data };
    } catch (error) {
      console.error(`Backend request failed for ${urls[i]}:`, error);
      
      // If this is the last URL, throw the error
      if (i === urls.length - 1) {
        throw error;
      }
    }
  }
  
  throw new Error('All backend endpoints failed');
}