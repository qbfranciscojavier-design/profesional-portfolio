import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, Zap, Database, Globe } from 'lucide-react';

export default function Pacientum() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Efecto de fondo (Glow azul) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="grid lg:grid-cols-2 gap-16 items-center"
                >
                    {/* Lado Izquierdo: Texto y Badges */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            PROYECTO ACTIVO
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Pacientum <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">LIMS</span>
                        </h2>

                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Sistema de Gestión de Laboratorio Clínico de última generación.
                            Arquitectura <strong>Multi-Tenant</strong> diseñada para cumplir con la norma
                            <span className="text-white"> ISO 15189</span>, garantizando trazabilidad total desde la recepción hasta el resultado.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            <FeatureItem icon={ShieldCheck} text="Seguridad RLS (Row Level Security)" color="text-emerald-400" />
                            <FeatureItem icon={Database} text="Supabase & PostgreSQL" color="text-blue-400" />
                            <FeatureItem icon={Zap} text="Resultados en Tiempo Real" color="text-yellow-400" />
                            <FeatureItem icon={Globe} text="Infraestructura Cloudflare" color="text-purple-400" />
                        </div>

                        <div className="flex gap-4">
                            <a
                                href="https://pacientum.com"
                                target="_blank"
                                rel="noreferrer"
                                className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
                            >
                                Ver Demo
                                <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <button className="px-8 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all">
                                Ver Arquitectura
                            </button>
                        </div>
                    </div>

                    {/* Lado Derecho: Representación Visual de la App */}
                    <motion.div
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                        <div className="relative bg-slate-900 border border-slate-700 rounded-2xl p-2 shadow-2xl">
                            {/* Aquí simulamos la interfaz del LIMS */}
                            <div className="bg-slate-800 rounded-xl overflow-hidden aspect-video flex flex-col">
                                {/* Header falso de la app */}
                                <div className="h-8 bg-slate-900 border-b border-slate-700 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                {/* Cuerpo falso */}
                                <div className="p-6 flex-1 flex flex-col justify-center items-center text-slate-500 space-y-4">
                                    <Database size={48} className="text-blue-500/50 mb-2" />
                                    <div className="w-3/4 h-2 bg-slate-700 rounded animate-pulse"></div>
                                    <div className="w-1/2 h-2 bg-slate-700 rounded animate-pulse"></div>
                                    <div className="w-2/3 h-2 bg-slate-700 rounded animate-pulse delay-75"></div>
                                    <p className="text-sm font-mono mt-4">Conectando a app.pacientum.com...</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

// Subcomponente para los items de la lista (para no repetir código)
function FeatureItem({ icon: Icon, text, color }: { icon: any, text: string, color: string }) {
    return (
        <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
            <Icon className={color} size={20} />
            <span className="text-slate-300 text-sm font-medium">{text}</span>
        </div>
    );
}