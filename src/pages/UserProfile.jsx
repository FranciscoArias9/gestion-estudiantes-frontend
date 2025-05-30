import { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from '../api/axiosConfig';

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState(user);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/encargado/${form.id}`, form);
    localStorage.setItem('user', JSON.stringify(form));
    alert('Perfil actualizado');
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
        
        {!editMode ? (
          <div className="space-y-4">
            <div><strong>Nombre:</strong> {form.nombre}</div>
            <div><strong>Correo:</strong> {form.correo}</div>
            <div><strong>Contraseña:</strong> ********</div>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setEditMode(true)}
            >
              Editar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full p-2 border rounded"
            />
            <input
              name="correo"
              value={form.correo}
              onChange={handleChange}
              placeholder="Correo"
              className="w-full p-2 border rounded"
            />
            <input
              name="contrasena"
              type="password"
              value={form.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-between">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Guardar
              </button>
              <button
                type="button"
                onClick={() => { setForm(user); setEditMode(false); }}
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
