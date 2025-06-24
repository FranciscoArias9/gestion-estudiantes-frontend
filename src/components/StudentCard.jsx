// Importa el componente Link de react-router-dom para permitir navegación interna
import { Link } from 'react-router-dom';

// Componente funcional que representa una fila de estudiante en la tabla
const StudentCard = ({ estudiante }) => {
  // Divide los apellidos en dos partes: primer apellido y segundo apellido (o el resto)
  const apellidosSplit = estudiante.apellidos?.split(' ') || [];
  const apellido1 = apellidosSplit[0] || '';
  const apellido2 = apellidosSplit.slice(1).join(' ') || '';

  // Muestra la URL base del backend en consola (posiblemente para depuración)
  console.log(import.meta.env.VITE_API_URL);

  return (
    <tr>
      {/* Celda de la foto del estudiante (enlace al perfil) */}
      <td>
        {estudiante.fotoUrl ? (
          <Link to={`/estudiantes/${estudiante.id}`}>
            <img
              src={`https://gestion-estudiantes-backend-production.up.railway.app/estudiantes/fotos/${estudiante.fotoUrl}`}
              alt="Foto del estudiante"
              className="student-photo"
            />
          </Link>
        ) : (
          <span>Sin foto</span> // Si no hay foto, muestra texto alternativo
        )}
      </td>

      {/* Primer apellido con enlace al perfil del estudiante */}
      <td>
        <Link to={`/estudiantes/${estudiante.id}`} className="student-link">
          {apellido1}
        </Link>
      </td>

      {/* Segundo apellido (o parte restante) */}
      <td>{apellido2}</td>

      {/* Celdas restantes con datos del estudiante */}
      <td>{estudiante.numero_identificacion}</td>
      <td>{estudiante.numero_promocion}</td>
      <td>{estudiante.tipo_maestria}</td>
      <td>{estudiante.programa_maestria}</td>
      <td>{estudiante.modalidad}</td>
      <td>{estudiante.nacionalidad}</td>
      <td>{estudiante.genero}</td>
      <td>{estudiante.telefono}</td>
      <td>{estudiante.correo}</td>
      <td>{estudiante.estado_estudiante}</td>
      <td>{estudiante.otras_observaciones}</td>
      <td>{estudiante.grado_academico}</td>
      <td>{estudiante.ultimoCampoModificado || '—'}</td> {/* Campo con valor por defecto si está vacío */}
      <td>
        {
          estudiante.fechaUltimoCambio
            ? new Date(estudiante.fechaUltimoCambio).toLocaleString() // Formatea la fecha si existe
            : '—' // Muestra guion si no hay fecha
        }
      </td>
    </tr>
  );
};

// Exporta el componente para uso externo
export default StudentCard;
