// Hooks de React y funciones de navegación
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Servicio de autenticación que se comunica con el backend
import { login } from '../api/authService';
// Estilos para la página de login
import '../styles/LoginPage.css';
// Componente de navegación reutilizable
import Navbar from '../components/Navbar';

// Componente funcional que representa la página de inicio de sesión
const LoginPage = () => {
  // Estado para almacenar el correo ingresado por el usuario
  const [correo, setCorreo] = useState('');
  // Estado para almacenar la contraseña ingresada
  const [contrasena, setContrasena] = useState('');
  // Hook para redirigir al usuario a otras páginas
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del form
    try {
      // Intenta iniciar sesión usando el servicio login
      const data = await login(correo, contrasena);
      // Si es exitoso, guarda los datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(data));
      // Redirige al usuario a la página principal
      navigate('/home');
    } catch (err) {
      // Muestra un mensaje si las credenciales son incorrectas
      alert('Credenciales incorrectas');
    }
  };

  // Función para recuperar la contraseña enviando una solicitud al backend
  const handlePasswordRecovery = async () => {
    // Verifica que el campo de correo no esté vacío
    if (!correo) {
      alert('Por favor, ingrese su correo para recuperar la contraseña.');
      return;
    }

    try {
      // Realiza una petición POST al endpoint de recuperación de contraseña
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/recuperar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        // Envía el correo como cuerpo de la solicitud en formato URL-encoded
        body: new URLSearchParams({ correo }),
      });

      // Evalúa si la respuesta fue exitosa
      if (response.ok) {
        alert('La contraseña ha sido enviada a su correo.');
      } else {
        alert('No se encontró un usuario con ese correo.');
      }
    } catch (error) {
      // Manejo de errores de red o servidor
      alert('Hubo un error al intentar recuperar la contraseña.');
      console.error(error);
    }
  };

  // Renderizado del componente
  return (
    <div className="login-container">
      <Navbar /> {/* Barra de navegación superior */}

      <main className="login-main">
        <h1 className="login-titulo">
          Sistema de Seguimiento Estudiantil de Alumnos y Postulantes de Posgrado
        </h1>

        <div className="login-content">
          {/* Lado izquierdo con el logo */}
          <div className="login-left">
            <img src="/logo-eri.jpg" alt="ERI" className="logo-eri" />
          </div>

          {/* Formulario de inicio de sesión */}
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

      {/* Pie de página con información de contacto */}
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

// Exporta el componente para que pueda ser usado en las rutas
export default LoginPage;
