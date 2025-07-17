import axios from 'axios';

const api = axios.create({
  baseURL: 'https://suitmedia-backend.suitdev.com/api',
  timeout: 10000, // 10 detik timeout
});

export const fetchIdeas = async ({ page = 1, size = 10, sort = '-published_at' }) => {
  try {
    const response = await api.get('/ideas', {
      params: {
        'page[number]': page,
        'page[size]': size,
        'append[]': ['small_image', 'medium_image'],
        sort,
      },
    });
    
    // Debug log untuk melihat struktur data
    console.log('API Response:', response.data);
    if (response.data.data && response.data.data.length > 0) {
      console.log('First item structure:', response.data.data[0]);
      console.log('Small image:', response.data.data[0].small_image);
      console.log('Medium image:', response.data.data[0].medium_image);
    }
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};