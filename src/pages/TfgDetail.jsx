// Importación de hooks y dependencias
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID desde la URL
import axios from '../api/axiosConfig'; // Axios con configuración base
import Navbar from '../components/Navbar'; // Navbar reutilizable

// Componente que muestra el detalle de un TFG específico
const TfgDetail = () => {
  const { id } = useParams(); // Obtiene el ID del TFG desde la URL

  // Estados del componente
  const [tfg, setTfg] = useState(null); // TFG que se está mostrando
  const [originalTfg, setOriginalTfg] = useState(null); // TFG antes de editar (para restaurar si se cancela)
  const [loading, setLoading] = useState(false); // Indica si hay una petición en proceso
  const [isEditing, setIsEditing] = useState(false); // Activa el modo de edición

  // Carga el TFG al montar el componente
  useEffect(() => {
    axios.get(`/tfgs/${id}`).then((res) => {
      setTfg(res.data); // Guarda los datos actuales
      setOriginalTfg(res.data); // También los guarda como copia original
    });
  }, [id]);

  // Maneja cambios en los campos del formulario
  const handleChange = (field, value) => {
    setTfg((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Guarda los cambios en el backend
  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`/tfgs/${id}`, tfg); // Actualiza el TFG
      alert('Cambios guardados');
      setIsEditing(false);
      setOriginalTfg(tfg); // Actualiza la copia original
    } catch (err) {
      console.error(err);
      alert('Error al guardar');
    }
    setLoading(false);
  };

  // Cancela la edición y restaura los valores originales
  const handleCancel = () => {
    setTfg(originalTfg);
    setIsEditing(false);
  };

  // Elimina el TFG del sistema con confirmación previa
  const handleDelete = async () => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este TFG? Esta acción no se puede deshacer.');
    if (!confirm) return;

    setLoading(true);
    try {
      await axios.delete(`/tfgs/${id}`);
      alert('TFG eliminado correctamente.');
      window.location.href = '/tfgs'; // Redirige a la lista de TFGs (ajustar si cambia la ruta)
    } catch (err) {
      console.error(err);
      alert('Error al eliminar el TFG.');
    }
    setLoading(false);
  };

  // Mientras se cargan los datos
  if (!tfg) return <div>Cargando...</div>;

  // Interfaz de visualización y edición
  return (
    <div className="students-list-page">
      <Navbar />
      <div className="students-header">
        <h2>Detalle del TFG</h2>
      </div>

      <div className="register-form" style={{ maxWidth: '700px', margin: 'auto' }}>
        {/* Campo: Tema */}
        <label>Tema del TFG</label>
        {isEditing ? (
          <input
            type="text"
            value={tfg.tema || ''}
            onChange={(e) => handleChange('tema', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.tema}</strong></p>
        )}

        {/* Campo: Modalidad */}
        <label>Modalidad del TFG</label>
        {isEditing ? (
          <input
            type="text"
            value={tfg.modalidadTfg || ''}
            onChange={(e) => handleChange('modalidadTfg', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.modalidadTfg}</strong></p>
        )}

        {/* Campo: Fecha de Aprobación */}
        <label>Fecha de aprobación</label>
        {isEditing ? (
          <input
            type="date"
            value={tfg.fechaAprobacion || ''}
            onChange={(e) => handleChange('fechaAprobacion', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.fechaAprobacion}</strong></p>
        )}

        {/* Campo: Fecha de Vencimiento */}
        <label>Fecha de vencimiento</label>
        {isEditing ? (
          <input
            type="date"
            value={tfg.fechaVencimiento || ''}
            onChange={(e) => handleChange('fechaVencimiento', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.fechaVencimiento}</strong></p>
        )}

        {/* Campo: Equipo asesor */}
        <label>Equipo asesor</label>
        {isEditing ? (
          <textarea
            value={tfg.equipoAsesor || ''}
            onChange={(e) => handleChange('equipoAsesor', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.equipoAsesor}</strong></p>
        )}

        {/* Campo: Estado */}
        <label>Estado</label>
        {isEditing ? (
          <input
            type="text"
            value={tfg.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.status}</strong></p>
        )}

        {/* Campo: Notas de seguimiento */}
        <label>Notas de seguimiento</label>
        {isEditing ? (
          <textarea
            value={tfg.notasSeguimiento || ''}
            onChange={(e) => handleChange('notasSeguimiento', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.notasSeguimiento}</strong></p>
        )}

        {/* Botones de acción */}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
          {!isEditing ? (
            <>
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button
                onClick={handleDelete}
                style={{
                  backgroundColor: '#e63946',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSave} disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button onClick={handleCancel} style={{ marginLeft: '1rem' }}>
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TfgDetail;
