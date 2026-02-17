import { Briefcase, Calendar } from 'lucide-react';
import { experience } from '../data/staticData'; // Asegúrate de tener esto en tu staticData

export default function Experience() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <Briefcase className="text-blue-500" />
          Trayectoria Profesional
        </h2>

        <div className="space-y-12 relative border-l-2 border-slate-700 ml-3 md:ml-6 pl-8 md:pl-12">
          {experience.map((item, index) => (
            <div key={index} className="relative">
              {/* Bolita del timeline */}
              <div className="absolute -left-[41px] md:-left-[59px] top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-slate-900 box-content" />
              
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{item.role}</h3>
                <span className="hidden md:block text-slate-600">•</span>
                <span className="text-blue-400 font-medium">{item.company}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <Calendar size={14} />
                {item.period}
              </div>

              <p className="text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-slate-800 text-blue-300 rounded border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}