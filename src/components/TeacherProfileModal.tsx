import React, { useState } from 'react';
import { 
  GraduationCap, 
  X, 
  ShieldCheck, 
  School, 
  BookOpen, 
  Users, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Save, 
  UserCheck 
} from '../icons/phosphor';
import { TeacherProfile } from '../types';

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: TeacherProfile;
  onUpdateTeacher: (updated: Partial<TeacherProfile>) => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  onClose,
  teacher,
  onUpdateTeacher,
}) => {
  if (!isOpen) return null;

  const [editName, setEditName] = useState(teacher.name);
  const [editNip, setEditNip] = useState(teacher.nip);
  const [editSchool, setEditSchool] = useState(teacher.school);
  const [editSubject, setEditSubject] = useState(teacher.subject);
  const [editTitle, setEditTitle] = useState(teacher.title);
  const [editEmail, setEditEmail] = useState(teacher.email);
  const [editPhone, setEditPhone] = useState(teacher.phone || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTeacher({
      name: editName,
      nip: editNip,
      school: editSchool,
      subject: editSubject,
      title: editTitle,
      email: editEmail,
      phone: editPhone,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div id="teacher-profile-modal" className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-6">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-purple-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white text-xl font-bold shadow-inner">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  Profil Pendidik / Guru
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-400/30 text-purple-200 border border-purple-300/30">
                  Terverifikasi
                </span>
              </div>
              <p className="text-xs text-purple-200">
                NIP: {teacher.nip} • {teacher.school}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Identity Summary Card */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                Mata Pelajaran yang Diampu
              </div>
              <div className="text-sm font-black text-slate-900">
                {teacher.subject}
              </div>
              <div className="text-xs text-slate-600 flex items-center space-x-2">
                <Users className="w-3.5 h-3.5" />
                <span>Kelas: {teacher.teachingClasses.join(', ')}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-semibold text-slate-500">Status Login</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center justify-end space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Aktif</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800">Nama Lengkap & Gelar</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800">Nomor Induk Pegawai (NIP)</label>
                <input
                  type="text"
                  value={editNip}
                  onChange={(e) => setEditNip(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800">Jabatan Fungsional</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800">Satuan Pendidikan (Sekolah)</label>
              <input
                type="text"
                value={editSchool}
                onChange={(e) => setEditSchool(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800">Email Resmi / Akun Belajar</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800">No. WhatsApp / Kontak</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {isSaved ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Biodata Guru berhasil diperbarui!</span>
                </span>
              ) : (
                <span className="text-[11px] text-slate-500">Perubahan tersimpan otomatis di perangkat.</span>
              )}

              <button
                type="submit"
                id="save-teacher-profile-btn"
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Biodata</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
