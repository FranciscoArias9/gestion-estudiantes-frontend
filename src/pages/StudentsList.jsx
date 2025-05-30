import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEstudiantes } from '../api/estudianteService';
import StudentCard from '../components/StudentCard';
import Navbar from '../components/NavBar';
import '../styles/StudentsList.css';

const StudentsList = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('nombre');
  const navigate = useNavigate();

  useEffect(() => {
    getEstudiantes().then(res => setEstudiantes(res.data));
  }, []);

  const filteredEstudiantes = estudiantes.filter(est =>
    est[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportPDF = () => {
    window.print();
  };

  const handleExportExcel = () => {
    alert("Funcionalidad de exportar a Excel por implementar (puedes usar xlsx o SheetJS)");
  };

  return (
    <div className="students-list-page">
      <Navbar />

      <div className="students-header">
        <h2>Lista de alumnos y postulantes</h2>
        <div className="students-actions">
          <button className="export-btn" onClick={handleExportPDF}>📄 Exportar como PDF</button>
          <button className="export-btn" onClick={handleExportExcel}>📊 Exportar como Excel</button>

          <select
            className="search-bar"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="nombre">Buscar por Nombre</option>
            <option value="numeroIdentificacion">Buscar por Cédula</option>
            <option value="correo">Buscar por Correo</option>
            <option value="apellidos">Buscar por Apellidos</option>
          </select>

          <input
            type="text"
            placeholder="🔍 Buscar"
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="add-btn" onClick={() => navigate('/estudiantes/registrar')}>
            + Añadir nuevo alumno
          </button>
        </div>
      </div>

      <div className="students-table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>FOTO</th>
              <th>APELLIDO</th>
              <th>SEGUNDO APELLIDO</th>
              <th>CÉDULA</th>
              <th>N° PROMOCIÓN</th>
              <th>TIPO DE MAESTRÍA</th>
              <th>PROGRAMA DE MAESTRÍA</th>
              <th>MODALIDAD</th>
              <th>NACIONALIDAD</th>
              <th>GÉNERO</th>
              <th>TELÉFONO</th>
              <th>CORREO</th>
              <th>ESTADO</th>
              <th>OBSERVACIONES</th>
              <th>GRADO ACADÉMICO</th>
              <th>ÚLTIMO CAMPO MODIFICADO</th>
              <th>FECHA DE ÚLTIMA MODIFICACIÓN</th>
            </tr>
          </thead>
          <tbody>
            {filteredEstudiantes.map((est) => (
              <StudentCard key={est.id} estudiante={est} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
