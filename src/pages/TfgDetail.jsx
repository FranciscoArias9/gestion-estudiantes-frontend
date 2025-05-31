import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Navbar from '../components/Navbar';

const TfgDetail = () => {
  const { id } = useParams();
  const [tfg, setTfg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/tfgs/${id}`).then((res) => setTfg(res.data));
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
    } catch (err) {
      console.error(err);
      alert('Error al guardar');
    }
    setLoading(false);
  };

  if (!tfg) return <div>Cargando...</div>;

  return (
    <div className="students-list-page">
      <Navbar />
      <div className="students-header">
        <h2>Editar TFG</h2>
      </div>

      <div className="register-form" style={{ maxWidth: '700px', margin: 'auto' }}>
        <label>Tema del TFG</label>
        <input
          type="text"
          value={tfg.tema || ''}
          onChange={(e) => handleChange('tema', e.target.value)}
        />

        <label>Modalidad del TFG</label>
        <input
          type="text"
          value={tfg.modalidadTfg || ''}
          onChange={(e) => handleChange('modalidadTfg', e.target.value)}
        />

        <label>Fecha de aprobación</label>
        <input
          type="date"
          value={tfg.fechaAprobacion || ''}
          onChange={(e) => handleChange('fechaAprobacion', e.target.value)}
        />

        <label>Fecha de vencimiento</label>
        <input
          type="date"
          value={tfg.fechaVencimiento || ''}
          onChange={(e) => handleChange('fechaVencimiento', e.target.value)}
        />

        <label>Equipo asesor</label>
        <textarea
          value={tfg.equipoAsesor || ''}
          onChange={(e) => handleChange('equipoAsesor', e.target.value)}
        />

        <label>Estado</label>
        <input
          type="text"
          value={tfg.status || ''}
          onChange={(e) => handleChange('status', e.target.value)}
        />

        <label>Notas de seguimiento</label>
        <textarea
          value={tfg.notasSeguimiento || ''}
          onChange={(e) => handleChange('notasSeguimiento', e.target.value)}
        />

        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
};

export default TfgDetail;
