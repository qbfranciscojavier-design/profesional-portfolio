import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Award, Loader2, ShieldCheck, Eye } from 'lucide-react'; // Cambiamos ExternalLink por Eye
import { motion } from 'framer-motion';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Courses() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            const { data } = await supabase
                .from('portafolio_cursos')
                .select('*')
                .order('fecha_emision', { ascending: false });

            if (data) setCourses(data);
            setLoading(false);
        }
        fetchCourses();
    }, []);

    // --- CIRUGÍA: Función con Watermark Dinámico ---
    const getSafePreview = (url: string) => {
        if (!url) return '';

        // Configuración de Marca de Agua (Texto: TU NOMBRE - SOLO VISTA)
        // o_15 = 15% opacidad | p_center = centrado
        const watermark = "l_text:Arial_60_bold:FRANCISCO%20JAVIER%20GARCIA%20-%20VISTA%20PROTEGIDA,o_15,p_center";

        let processedUrl = url;
        if (url.endsWith('.pdf')) {
            processedUrl = url.replace('.pdf', '.jpg');
        }

        // Insertamos la marca de agua y forzamos calidad automática
        return processedUrl.replace('/upload/', `/upload/${watermark}/f_auto,q_auto/`);
    };

    return (
        <section className="py-24 bg-slate-950">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Award className="text-yellow-500" size={32} />
                        Educación Continua & Certificaciones
                    </h2>
                    <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        Bóveda Digital Protegida
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-blue-500" size={40} />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course, i) => (
                            <motion.div
                                key={course.id || i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 flex flex-col relative"
                            >
                                {/* --- CIRUGÍA: Contenedor Anti-Descarga --- */}
                                <div
                                    className="relative aspect-[16/10] overflow-hidden bg-black select-none"
                                    onContextMenu={(e) => e.preventDefault()} // BLOQUEA CLIC DERECHO
                                >
                                    {course.evidencia_url ? (
                                        <>
                                            <img
                                                src={getSafePreview(course.evidencia_url)}
                                                alt={course.titulo}
                                                className="w-full h-full object-cover opacity-80 pointer-events-none transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"
                                            />
                                            {/* Capa invisible para evitar arrastrar imagen */}
                                            <div className="absolute inset-0 z-10" />

                                            <div className="absolute bottom-3 left-3 z-20 bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[9px] text-slate-400 font-mono tracking-tighter uppercase">
                                                En-Pantalla Only
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-800">
                                            <Award size={48} />
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 bg-slate-800 text-slate-400 rounded-md border border-slate-700">
                                            {course.categoria || 'Curso'}
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">
                                            {course.fecha_emision}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-slate-100 mb-2 leading-snug">
                                        {course.titulo}
                                    </h3>

                                    <p className="text-sm text-slate-400 mb-6 italic">
                                        {course.institucion}
                                    </p>

                                    {/* --- CIRUGÍA: Botón sin enlace directo --- */}
                                    <div className="mt-auto pt-4 border-t border-slate-800/50">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            <Eye size={12} className="text-emerald-500" />
                                            Certificado Verificado Online
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}