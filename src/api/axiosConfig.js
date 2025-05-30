import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gestion-estudiantes-backend-production.up.railway.app',
  withCredentials: true, // <- importante si usás cookies
  headers: {
    'Content-Type': 'application/json',
  },
});
