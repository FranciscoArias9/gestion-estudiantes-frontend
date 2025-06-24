// Importa los hooks necesarios y componentes
import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axiosConfig';

// Componente que muestra y permite editar el perfil del usuario encargado
const UserProfile = () => {
  // Obtiene la información del usuario desde el localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Estado local para manejar los datos del formulario
  const [form, setForm] = useState(user);
  const [editMode, setEditMode] = useState(false); // Modo de edición

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Maneja el envío del formulario (actualiza el perfil)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/encargado/${form.id}`, form); // PUT al backend
    localStorage.setItem('user', JSON.stringify(form)); // Actualiza localStorage
    alert('Perfil actualizado');
    setEditMode(false); // Sale del modo edición
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar /> {/* Barra de navegación */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
        
        {/* Modo visual o de edición según el estado */}
        {!editMode ? (
          <div className="space-y-4">
            <div><strong>Nombre:</strong> {form.nombre}</div>
            <div><strong>Correo:</strong> {form.correo}</div>
            <div><strong>Contraseña:</strong> ********</div> {/* Se oculta la contraseña */}
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setEditMode(true)}
            >
              Editar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo editable: nombre */}
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full p-2 border rounded"
            />

            {/* Campo editable: correo */}
            <input
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="Correo"
              className="w-full p-2 border rounded"
            />

            {/* Campo editable: contraseña */}
            <input
              name="contrasena"
              type="password"
              value={form.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full p-2 border rounded"
            />

            {/* Botones para guardar o cancelar edición */}
            <div className="flex justify-between">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Guardar
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm(user); // Restaura los valores originales
                  setEditMode(false); // Sale del modo edición
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
