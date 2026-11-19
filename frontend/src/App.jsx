import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import MisionVision from "./pages/MisionVision.jsx";
import Productos from "./pages/Productos.jsx";
import Clientes from "./pages/Clientes.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/mision-vision" element={<MisionVision />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
