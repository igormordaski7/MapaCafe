import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/Layout';
import Home from './pages/Home';
import MinhasCafeterias from './pages/MinhasCafeterias';
import NovaCafeteria from './pages/NovaCafeteria';
import EditarCafeteria from './pages/EditarCafeteria';
import Dashboard from './pages/Dashboard';
import MeuPerfil from './pages/MeuPerfil';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      <Route path="/MinhasCafeterias" element={<AppLayout><MinhasCafeterias /></AppLayout>} />
      <Route path="/NovaCafeteria" element={<AppLayout><NovaCafeteria /></AppLayout>} />
      <Route path="/EditarCafeteria/:id" element={<AppLayout><EditarCafeteria /></AppLayout>} />
      <Route path="/Dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
      <Route path="/MeuPerfil" element={<AppLayout><MeuPerfil /></AppLayout>} />
    </Routes>
  );
}

export default App;