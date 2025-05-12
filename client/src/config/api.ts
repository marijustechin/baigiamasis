import axios from 'axios';

const BASE_URL = 'http://localhost:3003/api/v1';

const $axios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default $axios;
