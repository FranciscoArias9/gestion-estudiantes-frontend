import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // ✅ verificamos si el usuario está logueado

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logos">
        <img src="/logo-una.png" alt="UNA" className="logo logo-una" />
        <img src="/logo-eri.jpg" alt="ERI" className="logo logo-eri" />
      </div>

      {user && ( // ✅ solo mostramos los enlaces si hay usuario
        <ul className="navbar-links">
          <li onClick={() => navigate('/home')}>Página principal</li>
          <li onClick={() => navigate('/estudiantes')}>Lista de alumnos</li>
          <li onClick={() => navigate('/perfil')}>Ver mi perfil</li>
          <li onClick={handleLogout}>Hacer logout</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
