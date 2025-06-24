// Importación de hooks y módulos necesarios
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../api/axiosConfig';
import Select from 'react-select';
import '../styles/RegisterStudent.css';

// Componente para mostrar y editar el perfil de un estudiante
const StudentProfile = () => {
  // Obtiene el ID del estudiante desde la URL
  const { id } = useParams();

  // Estados del formulario, modo edición y URL de la foto
  const [form, setForm] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [fotoUrl, setFotoUrl] = useState(null);

  // Carga los datos del estudiante desde el backend al cargar el componente
  useEffect(() => {
    axios.get(`/estudiantes/${id}`).then(res => {
      const estudiante = res.data;

      // Asegura que el campo gradoAcademico sea un array
      if (!Array.isArray(estudiante.gradoAcademico)) {
        estudiante.gradoAcademico = [];
      }

      setForm(estudiante);
      setFotoUrl(estudiante.fotoUrl); // Guarda la URL de la foto para mostrarla
    });
  }, [id]);

  // Si los datos aún no se han cargado
  if (!form) return <p>Cargando...</p>;

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = type === 'number' ? parseInt(value) || '' : value;
    setForm({ ...form, [name]: newValue });
  };

  // Maneja los cambios en el selector múltiple de grado académico
  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(opt => opt.value);
    setForm({ ...form, gradoAcademico: selectedValues });
  };

  // Maneja el envío del formulario para actualizar el estudiante
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedForm = { ...form };

      // Si se subió una nueva foto, la envía al backend
      if (form.nuevaFoto) {
        const formData = new FormData();
        formData.append("foto", form.nuevaFoto);

        const uploadResponse = await axios.post(`/estudiantes/${id}/foto`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        updatedForm.fotoUrl = uploadResponse.data.filename;
      }

      delete updatedForm.nuevaFoto;

      // Actualiza los datos del estudiante
      await axios.put(`/estudiantes/${id}`, updatedForm);

      alert('Perfil actualizado con éxito');
      setEditMode(false);
      setFotoUrl(updatedForm.fotoUrl);
    } catch (err) {
      console.error(err);
      alert('Error al actualizar');
    }
  };

  // Elimina el estudiante con confirmación
  const handleDelete = async () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este estudiante? Esta acción no se puede deshacer.");
    if (!confirmacion) return;

    try {
      await axios.delete(`/estudiantes/${id}`);
      alert("Estudiante eliminado con éxito.");
      window.location.href = "/estudiantes";
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar el estudiante.");
    }
  };

  // Renderiza un input reutilizable
  const renderInput = (name, label, type = 'text') => (
    <div className="row">
      <label>{label}</label>
      <input name={name} type={type} value={form[name]} onChange={handleChange} disabled={!editMode} />
    </div>
  );

  // Renderiza un textarea reutilizable
  const renderTextarea = (name, label) => (
    <div className="row">
      <label>{label}</label>
      <textarea name={name} value={form[name]} onChange={handleChange} disabled={!editMode} />
    </div>
  );

  return (
    <div className="register-container">
      <Navbar />
      <h2 className="register-title">Perfil del Estudiante</h2>

      <div className="register-content">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-grid">
            {/* Inputs estándar */}
            {renderInput('nombre', 'Nombre')}
            {renderInput('apellidos', 'Apellidos')}
            {renderInput('numero_identificacion', 'Número de Identificación')}
            {renderInput('correo', 'Correo', 'email')}
            {renderInput('telefono', 'Teléfono')}
            {renderInput('nacionalidad', 'Nacionalidad')}
            {renderInput('universidad_origen', 'Universidad de Origen')}
            {renderInput('programa_maestria', 'Programa de Maestría')}
            {renderInput('tipo_maestria', 'Tipo de Maestría')}
            {renderInput('anio_admision', 'Año de Admisión', 'number')}
            {renderInput('numero_promocion', 'Número de Promoción', 'number')}
            {renderInput('modalidad', 'Modalidad')}
            {renderInput('lugar_residencia', 'Lugar de Residencia')}
            {renderInput('lugar_trabajo', 'Lugar de Trabajo')}
            {renderInput('funcion_trabajo', 'Función en el Trabajo')}
            {renderInput('carreras_universitarias', 'Carreras Universitarias')}
            {renderInput('tipo_empadronamiento', 'Tipo de Empadronamiento')}

            {/* Selector múltiple para grado académico */}
            <div className="row">
              <label>Grado Académico</label>
              <Select
                isMulti
                name="gradoAcademico"
                options={[
                  { value: 'Bachiller universitario', label: 'Bachiller universitario' },
                  { value: 'Licenciatura', label: 'Licenciatura' },
                  { value: 'Maestría', label: 'Maestría' }
                ]}
                classNamePrefix="select"
                className="select-container"
                value={form.gradoAcademico.map(val => ({ value: val, label: val }))}
                onChange={handleSelectChange}
                isDisabled={!editMode}
              />
            </div>

            {/* Textareas */}
            {renderTextarea('comentario_exoneracion', 'Comentario de Exoneración')}
            {renderTextarea('otras_observaciones', 'Otras Observaciones')}
            {renderTextarea('notas_adicionales', 'Notas Adicionales')}
            {renderTextarea('anotaciones_estado', 'Anotaciones del Estado')}

            {/* Inputs adicionales con números */}
            {renderInput('estado_estudiante', 'Estado del Estudiante')}
            {renderInput('motivacion_objetivos', 'Motivación y Objetivos', 'number')}
            {renderInput('experiencia_previa', 'Experiencia Previa', 'number')}
            {renderInput('adaptabilidad', 'Adaptabilidad', 'number')}
            {renderInput('comunicacion', 'Comunicación', 'number')}

            {/* Campo para subir nueva foto, solo si se está en modo edición */}
            {editMode && (
              <div className="row">
                <label>Cambiar Foto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, nuevaFoto: e.target.files[0] })}
                />
              </div>
            )}
          </div>

          {/* Muestra la foto actual del estudiante */}
          {fotoUrl && (
            <div className="foto-estudiante">
              <img
                src={
                  fotoUrl.startsWith('http')
                    ? fotoUrl
                    : `https://gestion-estudiantes-backend-production.up.railway.app/estudiantes/fotos/${fotoUrl}`
                }
                alt="Foto del estudiante"
              />
            </div>
          )}

          {/* Botones: guardar/cancelar/editar/eliminar */}
          {editMode ? (
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" className="btn-update">Guardar</button>
              <button type="button" onClick={() => setEditMode(false)} className="btn-cancel">Cancelar</button>
              <button type="button" onClick={handleDelete} className="btn-delete">Eliminar</button>
            </div>
          ) : (
            <button type="button" onClick={() => setEditMode(true)} className="btn-edit">
              Editar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
