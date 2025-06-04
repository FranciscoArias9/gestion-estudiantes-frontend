import { useState } from 'react';
import axios from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import '../styles/RegisterEncargado.css';

const RegisterEncargado = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    puesto: '',
    clasificacion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/encargado', form);
      alert('Encargado registrado con éxito');
      setForm({
        nombre: '',
        apellidos: '',
        correo: '',
        contrasena: '',
        puesto: '',
        clasificacion: '',
      });
    } catch (error) {
      console.error('Error al registrar encargado:', error);
      alert('Error al registrar encargado');
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <h2 className="register-title">Registrar nuevo encargado</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Apellidos" required />
        <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correo" required />
        <input name="contrasena" type="password" value={form.contrasena} onChange={handleChange} placeholder="Contraseña" required />
        <input name="puesto" value={form.puesto} onChange={handleChange} placeholder="Puesto" required />
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

export default RegisterEncargado;
