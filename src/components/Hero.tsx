import { motion } from 'framer-motion';
import { personalInfo, skills } from '../data/staticData';

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h2 className="text-blue-500 font-mono mb-2">{'<Hola, mi nombre es />'}</h2>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                    {personalInfo.name}
                </h1>
                <h3 className="text-3xl md:text-5xl font-bold text-slate-400 mb-6">
                    {personalInfo.title}
                </h3>
                <p className="max-w-2xl text-slate-400 text-lg mb-10">
                    {personalInfo.bio}
                </p>
            </motion.div>

            {/* Grid de Habilidades */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10"
            >
                {skills.map((skill, index) => (
                    <div key={index} className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700 backdrop-blur-sm">
                        <skill.icon className={`${skill.color} mb-2`} size={32} />
                        <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                ))}
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10"
            >
                <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-blue-500 rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
}