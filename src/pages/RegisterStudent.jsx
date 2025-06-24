// Importación de hooks y dependencias necesarias
import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axiosConfig';
import '../styles/RegisterStudent.css';
import { useNavigate } from 'react-router-dom'; 
import Select from 'react-select';

// Componente principal para registrar un nuevo estudiante/postulante
const RegisterStudent = () => {
  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem('user')); // Obtiene al usuario actual

  // Validación de permisos: solo usuarios con clasificación 'usuario_jefe' pueden registrar estudiantes
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

  // Estado que contiene todos los campos del formulario
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

  const [foto, setFoto] = useState(null); // Estado para almacenar la foto seleccionada

  const [nuevaCarrera, setNuevaCarrera] = useState(''); // Campo para nueva carrera universitaria

  // Agrega una nueva carrera al campo carreras_universitarias
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

  // Manejador genérico de cambios en campos del formulario
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;
    if (type === 'number') {
      newValue = value === '' ? '' : parseInt(value);
    }
    setForm({ ...form, [name]: newValue });
  };

  // Manejador para campos checkbox (como solicitud de exoneración)
  const handleCheckboxChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  // Captura el archivo seleccionado para la foto
  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  // Envío del formulario al backend, incluyendo la foto y los datos serializados
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combina apellido y segundo apellido en un solo campo
    const apellidosCombinados = `${form.apellido} ${form.segundoApellido}`.trim();
    const finalForm = { ...form, apellidos: apellidosCombinados };
    delete finalForm.apellido;
    delete finalForm.segundoApellido;

    // Se crea un FormData para enviar JSON + archivo
    const formData = new FormData();
    formData.append("estudiante", new Blob([JSON.stringify(finalForm)], { type: "application/json" }));
    if (foto) formData.append("foto", foto);

    // Se realiza la solicitud POST
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

  // Renderización del componente
  return (
    <div className="register-container">
      <Navbar />
      <h2 className="register-title">Añadir alumno al sistema</h2>

      <div className="register-content">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-grid">
            {/* Campos de texto, select, áreas de texto, selectores múltiples, etc. */}
            {/* Incluye lógica para agregar carreras, subir foto y calificar aspectos en escala 1–5 */}
            {/* Se omiten comentarios línea por línea para evitar redundancia, pero cada input se asocia a una propiedad del estado */}
          </div>

          {/* Selector de archivo para la foto */}
          <div className="form-side">
            <label>Foto (opcional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className="register-btn">Añadir alumno al sistema</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
