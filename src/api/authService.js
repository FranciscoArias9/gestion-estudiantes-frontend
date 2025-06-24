// Importa la instancia configurada de Axios con baseURL y headers predefinidos
import axios from './axiosConfig';

/**
 * Función para iniciar sesión en el sistema.
 * Realiza una petición POST al endpoint '/auth/login' con las credenciales del usuario.
 * 
 * @param {string} correo - Correo electrónico del usuario
 * @param {string} contrasena - Contraseña del usuario
 * @returns {Promise<Object>} - Respuesta del backend que usualmente contiene el token y datos del usuario
 */
export const login = async (correo, contrasena) => {
  const response = await axios.post('/auth/login', { correo, contrasena });
  return response.data;
};
