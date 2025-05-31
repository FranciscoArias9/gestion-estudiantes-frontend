import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';
import '../styles/LoginPage.css';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(correo, contrasena);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/home');
    } catch (err) {
      alert('Credenciales incorrectas');
    }
  };

  const handlePasswordRecovery = async () => {
    if (!correo) {
      alert('Por favor, ingrese su correo para recuperar la contraseña.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/recuperar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ correo }),
      });

      if (response.ok) {
        alert('La contraseña ha sido enviada a su correo.');
      } else {
        alert('No se encontró un usuario con ese correo.');
      }
    } catch (error) {
      alert('Hubo un error al intentar recuperar la contraseña.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <Navbar />

      <main className="login-main">
        <h1 className="login-titulo">
          Sistema de Seguimiento Estudiantil de Alumnos y Postulantes de Posgrado
        </h1>

        <div className="login-content">
          <div className="login-left">
            <img src="/logo-eri.jpg" alt="ERI" className="logo-eri" />
          </div>

          <div className="login-form-box">
            <h2>Sea bienvenido</h2>
            <p>Inicie sesión en su cuenta</p>
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Correo electrónico"
              />
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Digite su contraseña"
              />
              <button type="submit">Iniciar sesión</button>

              {/* Botón para recuperar contraseña */}
              <button
                type="button"
                className="recuperar-contra-btn"
                onClick={handlePasswordRecovery}
              >
                ¿Olvidó su contraseña?
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="login-footer">
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

export default LoginPage;
