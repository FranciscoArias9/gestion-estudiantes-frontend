import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <main className="home-main">
        <h1>
          ¡Bienvenido al Sistema de Seguimiento Estudiantil de Posgrado!
        </h1>

        <div className="home-options">
          <div className="home-card" onClick={() => navigate('/estudiantes/registrar')}>
            💡 Registrar un alumno / postulante
          </div>
          <div className="home-card" onClick={() => navigate('/estudiantes')}>
            📋 Ver la lista de todos los alumnos / postulantes
          </div>
          <div className="home-card" onClick={() => navigate('/tfgs/registrar')}>
            📝 Registrar un TFG
          </div>
          <div className="home-card" onClick={() => navigate('/tfgs')}>
            📚 Ver lista de TFGs registrados
          </div>
          <div className="home-card" onClick={() => navigate('/perfil')}>
            👤 Revisar / editar mi perfil
          </div>

          <div className="home-card" onClick={() => navigate('/encargados/registrar')}>
             🧑‍💼 Registrar usuario encargado
          </div>

        </div>
      </main>

      <footer className="home-footer">
        <span>Email</span>
        <span>Teléfono</span>
        <span><a href="https://www.una.ac.cr" target="_blank" rel="noreferrer">Página web de la Escuela</a></span>
      </footer>
    </div>
  );
};

export default HomePage;
