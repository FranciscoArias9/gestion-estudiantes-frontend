import { Link } from 'react-router-dom';

const StudentCard = ({ estudiante }) => {
  const apellidosSplit = estudiante.apellidos?.split(' ') || [];
  const apellido1 = apellidosSplit[0] || '';
  const apellido2 = apellidosSplit.slice(1).join(' ') || '';

  console.log(import.meta.env.VITE_API_URL);


  return (
    <tr>
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
          <span>Sin foto</span>
        )}
      </td>
      <td>
  <Link to={`/estudiantes/${estudiante.id}`} className="student-link">
    {apellido1}
  </Link>
</td>
      <td>{apellido2}</td>
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
      <td>{estudiante.ultimoCampoModificado || '—'}</td>
      <td>{estudiante.fechaUltimoCambio ? new Date(estudiante.fechaUltimoCambio).toLocaleString() : '—'}</td>
    </tr>
  );
};

export default StudentCard;
