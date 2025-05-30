import axios from './axiosConfig';

export const login = async (correo, contrasena) => {
  const response = await axios.post('/auth/login', { correo, contrasena });
  return response.data;
};