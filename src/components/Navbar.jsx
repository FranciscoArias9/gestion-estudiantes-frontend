// Importa el hook de navegación de React Router y el archivo CSS correspondiente
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

// Componente de barra de navegación superior
const Navbar = () => {
  // Hook para redireccionar a otras rutas
  const navigate = useNavigate();

  // Obtiene la información del usuario desde el almacenamiento local
  const user = JSON.parse(localStorage.getItem('user')); 

  // Función para cerrar sesión: elimina el usuario del localStorage y redirige a login
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Sección de logos institucionales */}
      <div className="navbar-logos">
        <img src="/logo-una.png" alt="UNA" className="logo logo-una" />
        <img src="/logo-eri.jpg" alt="ERI" className="logo logo-eri" />
      </div>

      {/* Muestra las opciones de navegación solo si el usuario está logueado */}
      {user && (
        <ul className="navbar-links">
          <li onClick={() => navigate('/home')}>Página principal</li>
          <li onClick={() => navigate('/estudiantes')}>Lista de alumnos</li>
          <li onClick={() => navigate('/perfil')}>Ver mi perfil</li>
          <li onClick={handleLogout}>Hacer logout</li>
        </ul>
      )}

      {/* Muestra la clasificación del usuario (usuario_jefe o usuario_auxiliar) si está definida */}
      {user?.clasificacion && (
        <div className="navbar-user-info">
          <small className="user-clasificacion">
            Clasificación: <strong>{user.clasificacion}</strong>
          </small>
        </div>
      )}
    </nav>
  );
};

// Exporta el componente Navbar para ser usado en otras partes de la app
export default Navbar;
