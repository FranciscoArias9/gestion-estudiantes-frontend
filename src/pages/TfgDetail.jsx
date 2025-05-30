// TfgDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import '../styles/StudentsList.css';

const TfgDetail = () => {
  const { id } = useParams();
  const [tfg, setTfg] = useState(null);

  useEffect(() => {
    axios.get(`/tfgs/${id}`).then((res) => setTfg(res.data));
  }, [id]);

  if (!tfg) return <div>Cargando...</div>;

  return (
    <div className="students-list-page">
      <Navbar />
      <div className="students-header">
        <h2>Detalle del TFG</h2>
      </div>

      <div className="register-form" style={{ maxWidth: '700px', margin: 'auto' }}>
        <p><strong>Nombre del estudiante:</strong> {tfg.estudiante?.nombre} {tfg.estudiante?.apellidos}</p>
        <p><strong>Correo:</strong> {tfg.estudiante?.correo}</p>
        <p><strong>Teléfono:</strong> {tfg.estudiante?.telefono}</p>
        <p><strong>Modalidad de la maestría:</strong> {tfg.estudiante?.tipo_maestria}</p>
        <p><strong>Tema del TFG:</strong> {tfg.tema}</p>
        <p><strong>Modalidad del TFG:</strong> {tfg.modalidadTfg}</p> {/* ojo, aquí también camelCase */}
        <p><strong>Fecha de aprobación:</strong> {tfg.fechaAprobacion}</p>
        <p><strong>Fecha de vencimiento:</strong> {tfg.fechaVencimiento}</p>
        <p><strong>Equipo asesor:</strong> {tfg.equipoAsesor}</p>
        <p><strong>Estado:</strong> {tfg.status}</p>
        <p><strong>Notas de seguimiento:</strong> {tfg.notasSeguimiento}</p>
      </div>

    </div>
  );
};

export default TfgDetail;
