import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Componentes
import Hero from './components/Hero';
import Pacientum from './components/Pacientum';
import Experience from './components/Experience';
import Courses from './components/Courses';
import Login from './components/Login';

// Cliente Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Tu CV Público
function PublicCV() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200">
      <Hero />
      <Pacientum />
      <Experience />
      <Courses />
    </div>
  );
}

// App Principal
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicCV />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}