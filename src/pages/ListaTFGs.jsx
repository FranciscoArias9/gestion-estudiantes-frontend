// ListaTFGs.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import '../styles/StudentsList.css';

const ListaTFGs = () => {
  const [tfgs, setTFGs] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/tfgs').then((res) => setTFGs(res.data));
  }, []);

  const filtered = tfgs.filter((tfg) =>
    tfg.tema?.toLowerCase().includes(search.toLowerCase()) ||
    tfg.nombreEstudiante?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="students-list-page">
      <Navbar />
      <div className="students-header">
        <h2>Lista de TFGs</h2>
        <div className="students-actions">
          <input
            type="text"
            placeholder="🔍 Buscar por tema o estudiante"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Nombre estudiante</th>
            <th>Tema del TFG</th>
            <th>Modalidad del TFG</th>
            <th>Fecha aprobación</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((tfg) => (
            <tr key={tfg.id} onClick={() => navigate(`/tfgs/${tfg.id}`)} style={{ cursor: 'pointer' }}>
              <td>{tfg.estudiante?.nombre} {tfg.estudiante?.apellidos}</td>
              <td>{tfg.tema}</td>
              <td>{tfg.modalidadTfg}</td> {/* <-- AQUÍ corregido */}
              <td>{tfg.fechaAprobacion}</td>
              <td>{tfg.status}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ListaTFGs;
