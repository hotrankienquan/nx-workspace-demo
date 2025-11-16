import axios from 'axios';
import { BASE_URL_APP } from '../../constants';

const apiClient = axios.create({
  baseURL: BASE_URL_APP,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
