// Importa el hook useNavigate de React Router para navegación programática
import { useNavigate } from 'react-router-dom';
// Importa el componente Navbar (barra superior de navegación)
import Navbar from '../components/Navbar';
// Importa los estilos CSS específicos de esta página
import '../styles/HomePage.css';

// Componente funcional que representa la página principal del sistema
const HomePage = () => {
  // Hook para redireccionar a otras rutas dentro de la aplicación
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Barra de navegación superior */}
      <Navbar />
      
      <main className="home-main">
        {/* Título principal de bienvenida */}
        <h1>
          ¡Bienvenido al Sistema de Seguimiento Estudiantil de Posgrado!
        </h1>

        {/* Sección de tarjetas de navegación rápida */}
        <div className="home-options">

          {/* Tarjeta para ir a la página de registro de estudiantes */}
          <div className="home-card" onClick={() => navigate('/estudiantes/registrar')}>
            💡 Registrar un alumno / postulante
          </div>

          {/* Tarjeta para ver la lista de estudiantes */}
          <div className="home-card" onClick={() => navigate('/estudiantes')}>
            📋 Ver la lista de todos los alumnos / postulantes
          </div>

          {/* Tarjeta para registrar un nuevo TFG */}
          <div className="home-card" onClick={() => navigate('/tfgs/registrar')}>
            📝 Registrar un TFG
          </div>

          {/* Tarjeta para ver la lista de TFGs */}
          <div className="home-card" onClick={() => navigate('/tfgs')}>
            📚 Ver lista de TFGs registrados
          </div>

          {/* Tarjeta para acceder o editar el perfil del usuario actual */}
          <div className="home-card" onClick={() => navigate('/perfil')}>
            👤 Revisar / editar mi perfil
          </div>

          {/* Tarjeta para registrar un nuevo usuario encargado */}
          <div className="home-card" onClick={() => navigate('/encargados/registrar')}>
             🧑‍💼 Registrar usuario encargado
          </div>

        </div>
      </main>

      {/* Pie de página con información de contacto */}
      <footer className="home-footer">
        <span>Email</span>
        <span>Teléfono</span>
        <span>
          <a href="https://www.una.ac.cr" target="_blank" rel="noreferrer">
            Página web de la Escuela
          </a>
        </span>
      </footer>
    </div>
  );
};

// Exporta el componente para que pueda ser utilizado en otras partes de la app
export default HomePage;
