// Importa hooks de React para estado y efectos
import { useEffect, useState } from 'react';
// Hook para navegar programáticamente entre rutas
import { useNavigate } from 'react-router-dom';
// Cliente Axios personalizado con configuración base
import axios from '../api/axiosConfig';
// Barra de navegación común para toda la aplicación
import Navbar from '../components/Navbar';
// Estilos específicos para la vista de lista de estudiantes
import '../styles/StudentsList.css';

// Componente funcional que muestra una lista de TFGs registrados
const ListaTFGs = () => {
  // Estado que contiene todos los TFGs obtenidos del backend
  const [tfgs, setTFGs] = useState([]);
  // Estado para almacenar la búsqueda del usuario
  const [search, setSearch] = useState('');
  // Hook para navegación
  const navigate = useNavigate();

  // Al cargar el componente, se hace la petición al backend para obtener la lista de TFGs
  useEffect(() => {
    axios.get('/tfgs').then((res) => setTFGs(res.data));
  }, []);

  // Filtro de los TFGs basado en el tema o nombre del estudiante ingresado en la barra de búsqueda
  const filtered = tfgs.filter((tfg) =>
    tfg.tema?.toLowerCase().includes(search.toLowerCase()) ||
    tfg.nombreEstudiante?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="students-list-page">
      {/* Barra de navegación superior */}
      <Navbar />

      {/* Encabezado de la página con título y barra de búsqueda */}
      <div className="students-header">
        <h2>Lista de TFGs</h2>
        <div className="students-actions">
          <input
            type="text"
            placeholder="🔍 Buscar por tema o estudiante"
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Actualiza el término de búsqueda
          />
        </div>
      </div>

      {/* Tabla que muestra los TFGs filtrados */}
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
          {/* Itera sobre los TFGs filtrados y crea una fila para cada uno */}
          {filtered.map((tfg) => (
            <tr 
              key={tfg.id} 
              onClick={() => navigate(`/tfgs/${tfg.id}`)} // Redirige a la vista de detalle del TFG
              style={{ cursor: 'pointer' }}
            >
              <td>{tfg.estudiante?.nombre} {tfg.estudiante?.apellidos}</td>
              <td>{tfg.tema}</td>
              <td>{tfg.modalidadTfg}</td> {/* Campo corregido para usar nombre correcto */}
              <td>{tfg.fechaAprobacion}</td>
              <td>{tfg.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Exporta el componente para su uso en el enrutamiento u otros módulos
export default ListaTFGs;
