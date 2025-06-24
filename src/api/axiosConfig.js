// Importa la librería Axios para hacer peticiones HTTP
import axios from 'axios';

// Crea una instancia personalizada de Axios con configuración base
const instance = axios.create({
  // Establece la URL base para todas las peticiones (se lee desde una variable de entorno)
  baseURL: import.meta.env.VITE_API_URL,

  // Define el encabezado por defecto para las peticiones (JSON)
  headers: {
    'Content-Type': 'application/json',
  },

  // Habilita el envío de cookies y cabeceras de autenticación en peticiones cross-site
  withCredentials: true 
});

// Exporta la instancia configurada para ser usada en otros archivos del proyecto
export default instance;
