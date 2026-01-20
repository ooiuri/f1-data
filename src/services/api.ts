import axios from 'axios';

const host = 'https://api.jolpi.ca/ergast/f1/';

const apiClient = axios.create({
  baseURL: host,
});

export default apiClient;