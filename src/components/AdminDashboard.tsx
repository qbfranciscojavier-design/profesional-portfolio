import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Tesseract from 'tesseract.js';
import { createClient } from '@supabase/supabase-js';
import { Loader2, Upload, ScanLine, Save, CheckCircle, FileText } from 'lucide-react'; // Añadimos FileText
import { uploadToCloudinary } from '../lib/cloudinary';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function AdminDashboard() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [scanning, setScanning] = useState(false);

    const [formData, setFormData] = useState({
        titulo: '',
        institucion: '',
        fecha: '',
        categoria: 'Curso'
    });

    // --- CIRUGÍA: Manejo de PDF en la previsualización ---
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);

        if (uploadedFile.type === 'application/pdf') {
            // Si es PDF, usamos un icono de previsualización
            setPreview('pdf-mode');
        } else {
            // Si es imagen, generamos la URL normal
            setPreview(URL.createObjectURL(uploadedFile));
        }
    }, []);

    // --- CIRUGÍA: Aceptar PDF en el Dropzone ---
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'application/pdf': ['.pdf']
        },
        maxFiles: 1
    });

    const handleScan = async () => {
        if (!file) return;

        // --- CIRUGÍA: Validación de tipo para OCR ---
        if (file.type === 'application/pdf') {
            alert("El escáner automático (IA) solo funciona con imágenes. Para archivos PDF, por favor llena los datos manualmente; el archivo se guardará correctamente en la nube.");
            return;
        }

        setScanning(true);
        try {
            const { data: { text } } = await Tesseract.recognize(file, 'spa');
            const lineas = text.split('\n').filter(line => line.trim().length > 3);

            setFormData(prev => ({
                ...prev,
                titulo: lineas[0] || '',
                institucion: lineas[1] || '',
                fecha: lineas.find(l => l.match(/\d{4}/))?.match(/\d{4}/)?.[0] || new Date().toISOString().split('T')[0]
            }));

        } catch (err) {
            console.error(err);
            alert("Error al escanear la imagen.");
        } finally {
            setScanning(false);
        }
    };

    const handleSave = async () => {
        if (!formData.titulo) return alert("El título es obligatorio");

        setScanning(true);

        try {
            let urlEvidencia = null;

            if (file) {
                console.log("Subiendo archivo a Cloudinary...");
                urlEvidencia = await uploadToCloudinary(file);
            }

            const { error } = await supabase.from('portafolio_cursos').insert([{
                titulo: formData.titulo,
                institucion: formData.institucion,
                fecha_emision: formData.fecha,
                categoria: formData.categoria,
                evidencia_url: urlEvidencia
            }]);

            if (error) throw error;

            alert('¡Documento procesado y guardado exitosamente! 🚀');
            setFile(null);
            setPreview(null);
            setFormData({ titulo: '', institucion: '', fecha: '', categoria: 'Curso' });

        } catch (error: any) {
            console.error("Error al guardar:", error);
            alert('Error: ' + error.message);
        } finally {
            setScanning(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-blue-400 flex items-center gap-3">
                <ScanLine /> Panel de Control: Certificados
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all 
              ${file ? 'border-emerald-500 bg-emerald-900/10' : 'border-slate-700 hover:border-blue-500 bg-slate-900'}`}
                    >
                        <input {...getInputProps()} />
                        {preview ? (
                            <div className="relative">
                                {/* --- CIRUGÍA: Vista condicional --- */}
                                {preview === 'pdf-mode' ? (
                                    <div className="flex flex-col items-center py-8">
                                        <FileText size={80} className="text-red-500 mb-4" />
                                        <p className="text-slate-300 font-medium">{file?.name}</p>
                                    </div>
                                ) : (
                                    <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded shadow-lg object-contain" />
                                )}

                                <div className="mt-2 text-emerald-400 text-sm font-medium flex justify-center items-center gap-2">
                                    <CheckCircle size={16} /> Archivo listo para subir
                                </div>
                            </div>
                        ) : (
                            <div className="text-slate-500">
                                <Upload className="mx-auto mb-4 text-slate-400" size={48} />
                                <p className="text-lg font-medium">Arrastra tu diploma o PDF aquí</p>
                                <p className="text-sm">o haz clic para buscar</p>
                            </div>
                        )}
                    </div>

                    {file && (
                        <button
                            onClick={handleScan}
                            disabled={scanning}
                            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all border 
                                ${file.type === 'application/pdf'
                                    ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-blue-400'}`}
                        >
                            {scanning ? <Loader2 className="animate-spin" /> : <ScanLine />}
                            {scanning ? 'Procesando...' : file.type === 'application/pdf' ? 'IA no disponible para PDF' : 'Autocompletar con IA (OCR)'}
                        </button>
                    )}
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-200">
                        ✏️ Detalles del Documento
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Título del Curso</label>
                            <input
                                value={formData.titulo}
                                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                placeholder="Ej. Diplomado en Hematología"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Institución</label>
                            <input
                                value={formData.institucion}
                                onChange={e => setFormData({ ...formData, institucion: e.target.value })}
                                placeholder="Ej. Universidad Nacional"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Fecha / Año</label>
                                <input
                                    value={formData.fecha}
                                    onChange={e => setFormData({ ...formData, fecha: e.target.value })}
                                    placeholder="YYYY-MM-DD"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Categoría</label>
                                <select
                                    value={formData.categoria}
                                    onChange={e => setFormData({ ...formData, categoria: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                                >
                                    <option>Curso</option>
                                    <option>Diplomado</option>
                                    <option>Certificación</option>
                                    <option>Conferencia</option>
                                    <option>Grado Académico</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleSave}
                                disabled={scanning}
                                className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-bold shadow-lg transition-all
                  ${scanning
                                        ? 'bg-slate-700 cursor-wait text-slate-400'
                                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white hover:shadow-blue-500/20'}`}
                            >
                                {scanning ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                {scanning ? 'Guardando en la Nube...' : 'Guardar y Blindar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}