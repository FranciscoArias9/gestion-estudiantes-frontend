import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import '../styles/RegisterTFG.css';

const RegisterTFG = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [nuevoEvaluador, setNuevoEvaluador] = useState('');
  const [evaluadores, setEvaluadores] = useState([]);

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
    notasSeguimiento: '',
    tipo_maestria: ''
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

  const handleAgregarEvaluador = () => {
    if (nuevoEvaluador.trim() !== '') {
      setEvaluadores([...evaluadores, nuevoEvaluador.trim()]);
      setNuevoEvaluador('');
    }
  };

  const handleEliminarEvaluador = (index) => {
    const nuevos = evaluadores.filter((_, i) => i !== index);
    setEvaluadores(nuevos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      tema: form.tema,
      tipo_maestria: form.tipo_maestria,
      modalidadTfg: form.modalidadTFG,
      fechaAprobacion: form.fechaAprobacion,
      equipoAsesor: evaluadores.join(', '),
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
          Authorization: `Bearer ${token}`
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
        {/* ... otros campos ... */}

        <label>Equipo asesor</label>
        <div className="evaluador-input">
          <input
            type="text"
            value={nuevoEvaluador}
            onChange={(e) => setNuevoEvaluador(e.target.value)}
            placeholder="Nombre del evaluador"
          />
          <button type="button" onClick={handleAgregarEvaluador}>Agregar</button>
        </div>

        <div className="evaluadores-list">
          {evaluadores.map((evalName, idx) => (
            <span className="evaluador-chip" key={idx}>
              {evalName} <button type="button" onClick={() => handleEliminarEvaluador(idx)}>x</button>
            </span>
          ))}
        </div>

        {/* ... otros campos y botón de submit ... */}
        <button type="submit" className="register-btn">Registrar TFG</button>
      </form>
    </div>
  );
};

export default RegisterTFG;
