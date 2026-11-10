import React from 'react';
import { 
  Award, 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  QrCode
} from '../icons/phosphor';
import { StudentProfile } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  student,
}) => {
  if (!isOpen) return null;

  const certificateId = `CERT-INFORMATIKA-${(student.nisn ? student.nisn.slice(-4) : student.id.replace(/\D/g, '').slice(-4) || '2026')}-${new Date().getFullYear()}`;
  const issueDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-8">
        {/* Top Modal Bar (Hidden in Print) */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-900">
              Sertifikat Kelulusan E-Modul Informatika
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="print-certificate-btn"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Unduh PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Area */}
        <div className="p-8 sm:p-12 bg-amber-50/40 border-8 border-double border-amber-300 m-4 rounded-2xl relative text-center space-y-6">
          {/* Header Seal */}
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto shadow-md ring-4 ring-amber-200">
              <Award className="w-9 h-9 fill-slate-950" />
            </div>
            <div className="text-[11px] uppercase tracking-widest font-extrabold text-amber-600">
              Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-wide text-slate-900">
              SERTIFIKAT KELULUSAN KOMPETENSI
            </h2>
            <p className="text-xs text-slate-700 font-medium">
              Nomor Verifikasi: <span className="font-mono font-bold text-blue-600">{certificateId}</span>
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-700 italic">Diberikan secara resmi kepada:</p>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 underline decoration-amber-400 decoration-2 underline-offset-8">
              {student.name}
            </div>
            <p className="text-xs text-slate-700 font-medium pt-2">
              {student.nisn ? (
                <>NISN: <strong>{student.nisn}</strong> • </>
              ) : null}
              {student.school}
            </p>
          </div>

          <div className="max-w-xl mx-auto text-xs text-slate-700 leading-relaxed space-y-2">
            <p>
              Telah menyelesaikan seluruh rangkaian pembelajaran interaktif dan evaluasi otomatis pada <strong>E-Modul Pembelajaran Informatika Sekolah Menengah Atas</strong> dengan penguasaan 6 Elemen Capaian Pembelajaran:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[11px] font-semibold text-slate-700 pt-1">
              <span className="bg-white p-1.5 rounded-lg border border-slate-200">✓ Berpikir Komputasional</span>
              <span className="bg-white p-1.5 rounded-lg border border-slate-200">✓ Algoritma & Pemrograman</span>
              <span className="bg-white p-1.5 rounded-lg border border-slate-200">✓ Sistem Komputer</span>
              <span className="bg-white p-1.5 rounded-lg border border-slate-200">✓ Jaringan & Internet</span>
              <span className="bg-white p-1.5 rounded-lg border border-slate-200">✓ Analisis Data</span>
              <span className="bg-white p-1.5 rounded-lg border border-slate-200">✓ Dampak Sosial Informatika</span>
            </div>
          </div>

          {/* Signatures & Issue Date */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
            <div className="text-left space-y-1">
              <div className="text-[10px] text-slate-700">Diterbitkan pada:</div>
              <div className="font-bold text-slate-800">{issueDate}</div>
              <div className="flex items-center space-x-1 text-[10px] text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Terverifikasi Sistem Asesmen Digital</span>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-[10px] text-slate-700">Instruktur / Guru Pengampu:</div>
              <div className="font-serif font-bold text-sm text-slate-900 pt-2 underline">
                Drs. Budi Santoso, M.Kom
              </div>
              <div className="text-[10px] text-slate-700">NIP. 19820415 200801 1 009</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
