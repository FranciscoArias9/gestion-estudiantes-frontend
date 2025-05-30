import axios from './axiosConfig';

export const getEstudiantes = () => axios.get('/estudiantes');
export const getEstudianteById = (id) => axios.get(`/estudiantes/${id}`);
export const crearEstudiante = (data) => axios.post('/estudiantes', data);
export const actualizarEstudiante = (id, data) => axios.put(`/estudiantes/${id}`, data);
export const eliminarEstudiante = (id) => axios.delete(`/estudiantes/${id}`);
