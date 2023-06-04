import axios from 'axios';

const API_KEY = 'Ow8jNHKa3HmmX0lYtOtaxfTS7RNHu6d2PjFPVaYCUY6tEai5zP2mFECe';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const result = await axios.get(`search?query=${query}&page=${page}`);
  return result.data;
};
