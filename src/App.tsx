import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Importa tus componentes
import Hero from './components/Hero';
import Pacientum from './components/Pacientum';
import Experience from './components/Experience';
import Courses from './components/Courses';
import AdminDashboard from './components/AdminDashboard'; // Crearemos esto abajo
import Login from './components/Login'; // Crearemos esto abajo

// Cliente Supabase (puedes importarlo desde lib/supabase.ts si ya lo tienes ahí)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Componente para proteger la ruta Admin
function ProtectedRoute({ children }: { children: any }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!session) return <Navigate to="/login" />;
  return children;
}

// Tu CV Público (Lo que ya tenías)
function PublicCV() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      {/* Tu Navbar aquí... */}
      <Hero />
      <Pacientum />
      <Experience />
      <Courses />
      {/* Tu Footer aquí... */}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicCV />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}