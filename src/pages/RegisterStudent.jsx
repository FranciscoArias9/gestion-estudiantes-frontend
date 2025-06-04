import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axiosConfig';
import '../styles/RegisterStudent.css';
import Select from 'react-select';

const RegisterStudent = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    segundoApellido: '',
    numero_identificacion: '',
    correo: '',
    genero: '',
    tipo_maestria: '',
    nacionalidad: '',
    universidad_origen: '',
    estado_estudiante: '',
    notas_adicionales: '',
    telefono: '',
    adaptabilidad: '',
    anio_admision: '',
    anotaciones_estado: '',
    carreras_universitarias: '',
    comentario_exoneracion: '',
    comunicacion: '',
    experiencia_previa: '',
    funcion_trabajo: '',
    lugar_residencia: '',
    lugar_trabajo: '',
    modalidad: '',
    motivacion_objetivos: '',
    numero_promocion: '',
    otras_observaciones: '',
    programa_maestria: '',
    solicitud_exoneracion: false,
    tipo_empadronamiento: '',
    grado_academico: '',
  });

  const [foto, setFoto] = useState(null);
  const [nuevaCarrera, setNuevaCarrera] = useState('');

  const agregarCarrera = () => {
    if (nuevaCarrera.trim() === '') return;
    const carreras = form.carreras_universitarias
      ? form.carreras_universitarias.split(', ')
      : [];
    if (!carreras.includes(nuevaCarrera.trim())) {
      const nuevasCarreras = [...carreras, nuevaCarrera.trim()].join(', ');
      setForm({ ...form, carreras_universitarias: nuevasCarreras });
    }
    setNuevaCarrera('');
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;
    if (type === 'number') {
      newValue = value === '' ? '' : parseInt(value);
    }
    setForm({ ...form, [name]: newValue });
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apellidosCombinados = `${form.apellido} ${form.segundoApellido}`.trim();
    const finalForm = { ...form, apellidos: apellidosCombinados };
    delete finalForm.apellido;
    delete finalForm.segundoApellido;

    const formData = new FormData();
    formData.append("estudiante", new Blob([JSON.stringify(finalForm)], { type: "application/json" }));
    if (foto) formData.append("foto", foto);

    try {
      await axios.post("/estudiantes/con-foto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Estudiante registrado con éxito");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar estudiante");
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <h2 className="register-title">Añadir alumno al sistema</h2>
      <div className="register-content">
        <form onSubmit={handleSubmit} className="register-form">
          {/* el mismo formulario que ya tenías, sin cambios */}
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
