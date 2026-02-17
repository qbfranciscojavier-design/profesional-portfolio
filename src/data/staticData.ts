import { Microscope, Code2, Database, Globe } from 'lucide-react';

export const personalInfo = {
    name: "Francisco Javier García Santos",
    title: "Químico Clínico | Full-Stack Developer",
    bio: "Especialista en medicina de laboratorio con pasión por la arquitectura de software. Creador de Pacientum LIMS.",
    location: "México",
};

export const skills = [
    { name: "Desarrollo React", icon: Code2, color: "text-blue-400" },
    { name: "Análisis Clínico", icon: Microscope, color: "text-emerald-400" },
    { name: "Bases de Datos", icon: Database, color: "text-purple-400" },
    { name: "Arquitectura Cloud", icon: Globe, color: "text-cyan-400" },
];

// ESTA ES LA PARTE QUE FALTABA 👇
export const experience = [
    {
        role: "Founder & CTO",
        company: "Pacientum LIMS",
        period: "2024 - Presente",
        description: "Desarrollo de arquitectura SaaS Multi-Tenant para laboratorios clínicos. Implementación de ISO 15189, seguridad RLS y CI/CD.",
        tags: ["React", "Supabase", "Leadership"]
    },
    {
        role: "Químico Clínico",
        company: "Hospital General ISSSTE",
        period: "2015 - Presente",
        description: "Gestión de fase preanalítica y validación de resultados críticos. Liderazgo en transición digital.",
        tags: ["Bioquímica", "Gestión de Calidad"]
    }
];

export const softSkills = [
    { title: "Gestión del Cambio Digital", desc: "Migración de personal analógico a herramientas digitales." },
    { title: "Bioética por Diseño", desc: "Implementación técnica de candados éticos en manejo de datos." },
];