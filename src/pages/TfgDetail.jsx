import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Navbar from '../components/Navbar';

const TfgDetail = () => {
  const { id } = useParams();
  const [tfg, setTfg] = useState(null);
  const [originalTfg, setOriginalTfg] = useState(null); // para restaurar si se cancela
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`/tfgs/${id}`).then((res) => {
      setTfg(res.data);
      setOriginalTfg(res.data); // guarda una copia para restaurar si se cancela
    });
  }, [id]);

  const handleChange = (field, value) => {
    setTfg((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`/tfgs/${id}`, tfg);
      alert('Cambios guardados');
      setIsEditing(false);
      setOriginalTfg(tfg); // actualiza copia original
    } catch (err) {
      console.error(err);
      alert('Error al guardar');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setTfg(originalTfg); // restaura el original
    setIsEditing(false);
  };

  if (!tfg) return <div>Cargando...</div>;

  return (
    <div className="students-list-page">
      <Navbar />
      <div className="students-header">
        <h2>Detalle del TFG</h2>
      </div>

      <div className="register-form" style={{ maxWidth: '700px', margin: 'auto' }}>
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

        <label>Equipo asesor</label>
        {isEditing ? (
          <textarea
            value={tfg.equipoAsesor || ''}
            onChange={(e) => handleChange('equipoAsesor', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.equipoAsesor}</strong></p>
        )}

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

        <label>Notas de seguimiento</label>
        {isEditing ? (
          <textarea
            value={tfg.notasSeguimiento || ''}
            onChange={(e) => handleChange('notasSeguimiento', e.target.value)}
          />
        ) : (
          <p><strong>{tfg.notasSeguimiento}</strong></p>
        )}

        <div style={{ marginTop: '1rem' }}>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>Editar</button>
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
