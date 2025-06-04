import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axiosConfig';
import '../styles/RegisterStudent.css';
import Select from 'react-select';

const RegisterStudent = () => {
  const [form, setForm] = useState({
    nombre: '', apellido: '', segundoApellido: '', numero_identificacion: '', correo: '',
    genero: '', tipo_maestria: '', nacionalidad: '', universidad_origen: '', estado_estudiante: '',
    notas_adicionales: '', telefono: '', adaptabilidad: '', anio_admision: '', anotaciones_estado: '',
    carreras_universitarias: '', comentario_exoneracion: '', comunicacion: '', experiencia_previa: '',
    funcion_trabajo: '', lugar_residencia: '', lugar_trabajo: '', modalidad: '', motivacion_objetivos: '',
    numero_promocion: '', otras_observaciones: '', programa_maestria: '', solicitud_exoneracion: false,
    tipo_empadronamiento: '', grado_academico: ''
  });

  const [foto, setFoto] = useState(null);
  const [nuevaCarrera, setNuevaCarrera] = useState('');
  const [rol, setRol] = useState(null);
  const [usuarioCargado, setUsuarioCargado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/auth/actual')
      .then(res => setRol(res.data.rol))
      .catch(() => setRol(null))
      .finally(() => setUsuarioCargado(true));
  }, []);

  const agregarCarrera = () => {
    if (nuevaCarrera.trim() === '') return;
    const carreras = form.carreras_universitarias ? form.carreras_universitarias.split(', ') : [];
    if (!carreras.includes(nuevaCarrera.trim())) {
      const nuevasCarreras = [...carreras, nuevaCarrera.trim()].join(', ');
      setForm({ ...form, carreras_universitarias: nuevasCarreras });
    }
    setNuevaCarrera('');
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = type === 'number' ? (value === '' ? '' : parseInt(value)) : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleCheckboxChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
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

  if (!usuarioCargado) return <p>Cargando usuario...</p>;
  if (rol !== 'encargado') {
    return (
      <div>
        <Navbar />
        <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
          🚫 Acceso denegado: solo los <u>usuarios encargados</u> pueden registrar estudiantes.
        </p>
      </div>
    );
  }

  return (
    <div className="register-container">
      <Navbar />
      <h2 className="register-title">Añadir alumno al sistema</h2>
      <div className="register-content">
        <form onSubmit={handleSubmit} className="register-form">



          <div className="form-grid">
            <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" />
            <input name="apellido" value={form.apellido} onChange={handleChange} placeholder="Primer apellido" />
            <input name="segundoApellido" value={form.segundoApellido} onChange={handleChange} placeholder="Segundo apellido" />
            <input name="numero_identificacion" value={form.numero_identificacion} onChange={handleChange} placeholder="Cédula o ID de identidad" />
            <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correo institucional" />
            <select name="genero" value={form.genero} onChange={handleChange}>
              <option value="">Seleccione sexo</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="No especifica">No especifica</option>
            </select>
            <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Número de teléfono" />
            <input name="nacionalidad" value={form.nacionalidad} onChange={handleChange} placeholder="País de origen" />
            <input name="universidad_origen" value={form.universidad_origen} onChange={handleChange} placeholder="Universidad de procedencia" />
            {/* <input name="programa_maestria" value={form.programa_maestria} onChange={handleChange} placeholder="Programa de maestría" /> */}
            <select name="programa_maestria" value={form.tipo_maestria} onChange={handleChange}>
              <option value="">Seleccione programa de  maestría</option>
              <option value="Maestría en Abastecimiento y Logística Global">Abastecimiento y Logística Global</option>
              <option value="Maestría en Relaciones Internacionales y Diplomacia">Relaciones Internacionales y Diplomacia</option>
              <option value="Maestría en Responsabilidad Social y Sostenibilidad">Responsabilidad Social y Sostenibilidad</option>
            </select>
            <select name="tipo_maestria" value={form.tipo_maestria} onChange={handleChange}>
              <option value="">Seleccione el tipo de maestría</option>
              <option value="Académica">Académica</option>
              <option value="Profesional">Profesional</option>
            </select>
            <input name="anio_admision" type="number" value={form.anio_admision} onChange={handleChange} placeholder="Año de admisión" />
            <input name="numero_promocion" value={form.numero_promocion} onChange={handleChange} placeholder="Número de promoción" />
            <select name="modalidad" value={form.modalidad} onChange={handleChange}>
              <option value="">Seleccione modalidad</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="bimodal">Bimodal</option>
            </select>

            <input name="lugar_residencia" value={form.lugar_residencia} onChange={handleChange} placeholder="Lugar de residencia" />
            <input name="lugar_trabajo" value={form.lugar_trabajo} onChange={handleChange} placeholder="Lugar de trabajo" />
            <input name="funcion_trabajo" value={form.funcion_trabajo} onChange={handleChange} placeholder="Función en el trabajo" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                value={nuevaCarrera}
                onChange={(e) => setNuevaCarrera(e.target.value)}
                placeholder="Añadir carrera"
              />
              <button type="button" onClick={agregarCarrera}>Aceptar</button>
            </div>
            <div>
              <small><strong>Carreras seleccionadas:</strong> {form.carreras_universitarias}</small>
            </div>

            <select name="tipo_empadronamiento" value={form.tipo_empadronamiento} onChange={handleChange}>
              <option value="">Seleccione tipo de empadronamiento</option>
              <option value="físico">Físico</option>
              <option value="digital">Digital</option>
              <option value="web">Web</option>
            </select>
            <label>Grado Académico (selección múltiple):</label>
            <Select
              isMulti
              name="grado_academico"
              options={[
                { value: 'Bachillerato Universitario', label: 'Bachillerato Universitario' },
                { value: 'Licenciatura', label: 'Licenciatura' },
                { value: 'Maestría', label: 'Maestría' },
              ]}
              classNamePrefix="select"
              className="select-container"
              value={(form.grado_academico || '').split(', ').filter(Boolean).map(val => ({
                value: val,
                label: val
              }))}
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(opt => opt.value).join(', ');
                setForm({ ...form, grado_academico: selectedValues });
              }}
            />



            <div className="inline-select-link">
              <select name="solicitud_exoneracion" value={form.solicitud_exoneracion} onChange={handleChange}>
                <option value="">¿Solicita exoneración?</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <a href="https://app.smartsheet.com/b/form/a12a17e3072848de8758878428cfbf87" target="_blank" rel="noopener noreferrer">
                Formulario
              </a>
            </div>
            <textarea name="comentario_exoneracion" value={form.comentario_exoneracion} onChange={handleChange} placeholder="Comentario de exoneración (opcional)" />
            <textarea name="otras_observaciones" value={form.otras_observaciones} onChange={handleChange} placeholder="Otras observaciones" />
            <textarea name="notas_adicionales" value={form.notas_adicionales} onChange={handleChange} placeholder="Notas adicionales" />
            <textarea name="anotaciones_estado" value={form.anotaciones_estado} onChange={handleChange} placeholder="Anotaciones sobre el estado" />
            <select name="estado_estudiante" value={form.estado_estudiante} onChange={handleChange}>
              <option value="">Estado del estudiante</option>
              <option value="Activo">Activo</option>
              <option value="Egresado">Egresado</option>
              <option value="Graduado">Graduado</option>
              <option value="Retirado">Retirado</option>
              <option value="Suspendido">Suspendido</option>
              <option value="Postulante">Postulante</option>
            </select>
            <div>
              <label>Motivación y Claridad de Objetivos (1–5)</label>
              <select name="motivacion_objetivos" value={form.motivacion_objetivos} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Experiencia y Conocimientos Previos (1–5)</label>
              <select name="experiencia_previa" value={form.experiencia_previa} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Adaptabilidad y Apertura al Aprendizaje (1–5)</label>
              <select name="adaptabilidad" value={form.adaptabilidad} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Comunicación Efectiva (1–5)</label>
              <select name="comunicacion" value={form.comunicacion} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="form-side">
            <label>Foto (opcional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className="register-btn">Añadir alumno al sistema</button>

          

          
        </form>hh
      </div>
    </div>
  );
};

export default RegisterStudent;
