// Hooks y dependencias necesarias
import { useState } from 'react';
import axios from '../api/axiosConfig'; // Instancia preconfigurada de Axios
import Navbar from '../components/Navbar'; // Barra de navegación superior
import '../styles/RegisterEncargado.css'; // Estilos específicos para esta vista
import { useNavigate } from 'react-router-dom'; // Navegación entre rutas

// Componente para registrar un nuevo usuario encargado
const RegisterEncargado = () => {
  const navigate = useNavigate(); // Hook para redireccionar programáticamente
  const user = JSON.parse(localStorage.getItem('user')); // Recupera el usuario autenticado desde localStorage

  // Solo los usuarios con clasificación 'usuario_jefe' pueden acceder a esta vista
  if (!user || user.clasificacion !== 'usuario_jefe') {
    return (
      <div className="register-container">
        <Navbar />
        <div className="register-content">
          <h2 style={{ color: 'red', fontWeight: 'bold' }}>
            Acceso denegado: Solo los usuarios con clasificación "usuario_jefe" pueden registrar estudiantes.
          </h2>
        </div>
      </div>
    );
  }

  // Estado para el formulario del nuevo encargado
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    puesto: '',
    clasificacion: '',
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // Actualiza el campo correspondiente
  };

  // Envía los datos al backend para registrar un nuevo encargado
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      await axios.post('/encargado', form); // Realiza la solicitud POST al backend
      alert('Encargado registrado con éxito'); // Notifica éxito al usuario
      // Limpia el formulario después del envío exitoso
      setForm({
        nombre: '',
        apellidos: '',
        correo: '',
        contrasena: '',
        puesto: '',
        clasificacion: '',
      });
    } catch (error) {
      // Manejo de errores
      console.error('Error al registrar encargado:', error);
      alert('Error al registrar encargado');
    }
  };

  // Renderizado del formulario
  return (
    <div className="register-container">
      <Navbar /> {/* Barra de navegación */}
      <h2 className="register-title">Registrar nuevo encargado</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Apellidos" required />
        <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correo" required />
        <input name="contrasena" type="password" value={form.contrasena} onChange={handleChange} placeholder="Contraseña" required />
        <input name="puesto" value={form.puesto} onChange={handleChange} placeholder="Puesto" required />
        
        {/* Selector de clasificación */}
        <select name="clasificacion" value={form.clasificacion} onChange={handleChange} required>
          <option value="">Seleccione clasificación</option>
          <option value="usuario_jefe">Usuario jefe</option>
          <option value="usuario_auxiliar">Usuario auxiliar</option>
        </select>

        <button type="submit" className="register-btn">Registrar encargado</button>
      </form>
    </div>
  );
};

// Exporta el componente para que pueda ser usado en las rutas
export default RegisterEncargado;
