import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import Navbar from '../components/NavBar';
import '../styles/RegisterTFG.css';

const RegisterTFG = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [form, setForm] = useState({
    estudianteId: '',
    nombreEstudiante: '',
    correo: '',
    telefono: '',
    
    tema: '',
    modalidadTFG: '',
    fechaAprobacion: '',
    equipoAsesor: '',
    fechaVencimiento: '',
    status: '',
    notasSeguimiento: ''
    ,tipo_maestria: ''
  });

  useEffect(() => {
    axios.get('/estudiantes').then(res => {
      setEstudiantes(res.data);
    });
  }, []);

  const handleStudentChange = (e) => {
    const estudianteId = e.target.value;
    setSelectedStudentId(estudianteId);
    const estudiante = estudiantes.find(est => est.id === parseInt(estudianteId));
    if (estudiante) {
      setForm({
        ...form,
        estudianteId,
        nombreEstudiante: estudiante.nombre + ' ' + estudiante.apellidos,
        correo: estudiante.correo,
        telefono: estudiante.telefono,
        tipo_maestria: estudiante.tipo_maestria
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // si usás autenticación
  
    const payload = {
      tema: form.tema,
      tipo_maestria: form.tipo_maestria,
      modalidadTfg: form.modalidadTFG,
      fechaAprobacion: form.fechaAprobacion,
      equipoAsesor: form.equipoAsesor,
      fechaVencimiento: form.fechaVencimiento,
      status: form.status,
      notasSeguimiento: form.notasSeguimiento,
      estudiante: {
        id: parseInt(form.estudianteId)
      }
    };
  
    try {
      await axios.post('/tfgs', payload, {
        headers: {
          Authorization: `Bearer ${token}` // omitilo si no usás autenticación
        }
      });
      alert('TFG registrado con éxito');
    } catch (err) {
      console.error('Error al registrar TFG:', err);
      alert('Error al registrar TFG');
    }
  };
  

  return (
    <div className="register-container">
      <Navbar />
      <h2 className="register-title">Registrar nuevo TFG</h2>
      <form onSubmit={handleSubmit} className="register-form">
  <label>Estudiante</label>
  <select value={selectedStudentId} onChange={handleStudentChange} required>
    <option value="">Seleccione estudiante</option>
    {estudiantes.map((e) => (
      <option key={e.id} value={e.id}>{e.nombre} {e.apellidos}</option>
    ))}
  </select>

  <label>Correo electrónico</label>
  <input name="correo" value={form.correo} readOnly placeholder="Correo" />

  <label>Teléfono</label>
  <input name="telefono" value={form.telefono} readOnly placeholder="Teléfono" />

  <label>Modalidad de la Maestría</label>
  <input name="tipo_maestria" value={form.tipo_maestria} readOnly placeholder="Modalidad de la Maestría" />

  <label>Tema del TFG</label>
  <input name="tema" value={form.tema} onChange={handleChange} placeholder="Tema del TFG" required />

  <label>Modalidad del TFG</label>
  <select name="modalidadTFG" value={form.modalidadTFG} onChange={handleChange} required>
    <option value="">Seleccione una modalidad</option>
    <option value="Tesis">Tesis</option>
    <option value="Proyecto">Proyecto</option>
    <option value="Seminario">Seminario</option>
    <option value="Práctica">Práctica</option>
  </select>

  <label>Fecha de aprobación</label>
  <input name="fechaAprobacion" type="date" value={form.fechaAprobacion} onChange={handleChange} required />

  <label>Equipo asesor</label>
  <input name="equipoAsesor" value={form.equipoAsesor} onChange={handleChange} placeholder="Equipo asesor" />

  <label>Fecha de vencimiento</label>
  <input name="fechaVencimiento" type="date" value={form.fechaVencimiento} onChange={handleChange} />

  <label>Estado del TFG</label>
  <select name="status" value={form.status} onChange={handleChange} required>
    <option value="">Seleccione un estado</option>
    <option value="No solicitado">No solicitado</option>
    <option value="Vigente">Vigente</option>
    <option value="Vigente con prórroga">Vigente con prórroga</option>
    <option value="Vencido">Vencido</option>
  </select>

  <label>Notas de seguimiento</label>
  <textarea name="notasSeguimiento" value={form.notasSeguimiento} onChange={handleChange} placeholder="Notas de seguimiento" />

  <button type="submit" className="register-btn">Registrar TFG</button>
</form>

    </div>
  );
};

export default RegisterTFG;
