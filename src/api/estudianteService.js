// Importa la instancia de Axios personalizada desde el archivo de configuración
import axios from './axiosConfig';

// Obtiene la lista completa de estudiantes desde el backend
export const getEstudiantes = () => axios.get('/estudiantes');

// Obtiene un estudiante específico por su ID
export const getEstudianteById = (id) => axios.get(`/estudiantes/${id}`);

// Crea un nuevo estudiante enviando los datos al backend
export const crearEstudiante = (data) => axios.post('/estudiantes', data);

// Actualiza un estudiante existente, identificado por su ID
export const actualizarEstudiante = (id, data) => axios.put(`/estudiantes/${id}`, data);

// Elimina un estudiante por su ID
export const eliminarEstudiante = (id) => axios.delete(`/estudiantes/${id}`);
