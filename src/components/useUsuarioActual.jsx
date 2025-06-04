// src/hooks/useUsuarioActual.js
import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

const useUsuarioActual = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    axios.get('/encargado/actual', { withCredentials: true })
      .then(res => {
        setUsuario(res.data);
        setCargando(false);
      })
      .catch(() => {
        setUsuario(null);
        setCargando(false);
      });
  }, []);

  return { usuario, cargando };
};

export default useUsuarioActual;
