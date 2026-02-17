import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export default function Login() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Usamos Magic Link para no batallar con contraseñas por ahora
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('¡Revisa tu correo para el link de acceso!');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
        <h2 className="text-white text-2xl font-bold mb-6">Acceso Admin 🔐</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-slate-800 text-white border border-slate-700"
          />
          <button disabled={loading} className="bg-blue-600 text-white p-3 rounded hover:bg-blue-500">
            {loading ? 'Enviando...' : 'Enviar Link Mágico'}
          </button>
        </form>
      </div>
    </div>
  );
}