import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterStudent from './pages/RegisterStudent';
import StudentsList from './pages/StudentsList';
import StudentProfile from './pages/StudentProfile';
import UserProfile from './pages/UserProfile';
import RegisterTFG from './pages/RegisterTFG';
import TFGList from './pages/ListaTFGs';
import TFGDetail from './pages/TfgDetail';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/estudiantes/registrar" element={<RegisterStudent />} />
        <Route path="/estudiantes" element={<StudentsList />} />
        <Route path="/estudiantes/:id" element={<StudentProfile />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/tfgs/registrar" element={<RegisterTFG />} />
        <Route path="/tfgs" element={<TFGList />} />
        <Route path="/tfgs/:id" element={<TFGDetail />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
