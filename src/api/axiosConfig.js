import axios from 'axios';



const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // opcional si usás cookies; necesario si el backend usa sesiones
});

// ✅ Interceptor para agregar token a todas las peticiones
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;


