import React, { useState } from 'react';
import { 
  User, 
  X, 
  Award, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Trash2, 
  GraduationCap, 
  Calendar,
  ChevronRight,
  TrendingUp,
  FileText
} from '../icons/phosphor';
import { StudentProfile, QuizAttempt } from '../types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onViewAttemptReport: (attempt: QuizAttempt) => void;
  onDeleteNote: (noteId: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onUpdateProfile,
  onViewAttemptReport,
  onDeleteNote,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'notes'>('profile');
  const [editName, setEditName] = useState(student.name);
  const [editNisn, setEditNisn] = useState(student.nisn);
  const [editSchool, setEditSchool] = useState(student.school);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      nisn: editNisn,
      school: editSchool,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const historyAttempts = student.historyAttempts ?? student.quizHistory ?? [];
  const savedNotes = student.savedNotes ?? [];
  const badges = student.badges ?? [];
  const studentLevel = student.level ?? Math.floor((student.xp ?? 0) / 500) + 1;
  const currentLevelProgress = Math.min(100, Math.round(((student.xp ?? 0) % 500) / 5));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-6">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-md">
              {student.name ? student.name[0].toUpperCase() : 'S'}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <span>{student.name || 'Profil Siswa'}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300">
                  Level {studentLevel}
                </span>
              </h2>
              <p className="text-xs text-slate-700">
                NISN: {student.nisn || '-'} • {student.classGrade || '-'} • {student.school || '-'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-100 px-6 bg-white">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-700 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Biodata & Level</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'history'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-700 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Riwayat Evaluasi ({historyAttempts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'notes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-700 hover:text-slate-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Catatan Modul ({savedNotes.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* TAB 1: PROFILE & STATS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* XP & Progress Card */}
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Progress Belajar & Gamifikasi</span>
                  </div>
                  <span>{student.xp || 0} XP Terkumpul</span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${currentLevelProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-700">
                  <span>Level {studentLevel}</span>
                  <span>Menuju Level {studentLevel + 1} ({500 - ((student.xp || 0) % 500)} XP lagi)</span>
                </div>
              </div>

              {/* Badges Earned */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Lencana Prestasi (Badges)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {badges.map((b) => (
                    <div 
                      key={b.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1"
                    >
                      <div className="text-2xl">{b.icon}</div>
                      <div className="text-[11px] font-bold text-slate-900">{b.title}</div>
                      <div className="text-[10px] text-slate-700 line-clamp-1">{b.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Bio Form */}
              <form onSubmit={handleSaveProfile} className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Ubah Informasi Siswa
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700">Nama Lengkap</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-700">Nomor Induk Siswa Nasional (NISN)</label>
                    <input
                      type="text"
                      value={editNisn}
                      onChange={(e) => setEditNisn(e.target.value)}
                      className="w-full mt-1 p-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700">Asal Satuan Pendidikan (Sekolah)</label>
                  <input
                    type="text"
                    value={editSchool}
                    onChange={(e) => setEditSchool(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  {isSaved ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Data berhasil disimpan!</span>
                    </span>
                  ) : <span />}

                  <button
                    type="submit"
                    id="save-profile-btn"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: QUIZ HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {historyAttempts.length === 0 ? (
                <div className="text-center py-8 text-slate-600 text-xs italic">
                  Belum ada sesi latihan atau ujian yang diselesaikan.
                </div>
              ) : (
                historyAttempts.map((att) => (
                  <div
                    key={att.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-900">{att.quizTitle}</div>
                      <div className="text-[11px] text-slate-700 flex items-center space-x-3">
                        <span>{att.date}</span>
                        <span>•</span>
                        <span>{att.correctCount} / {att.totalQuestions} Benar</span>
                        <span>•</span>
                        <span className="font-bold text-blue-700">Kategori: {att.kktpStatus}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-xl font-black text-slate-900">{att.score}</div>
                        <div className="text-[10px] text-slate-700">Predikat: {att.gradeLetter}</div>
                      </div>

                      <button
                        onClick={() => {
                          onViewAttemptReport(att);
                          onClose();
                        }}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Buka Rapor Detail"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: SAVED NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-3">
              {savedNotes.length === 0 ? (
                <div className="text-center py-8 text-slate-600 text-xs italic">
                  Belum ada catatan pribadi yang disimpan. Anda dapat membuat catatan saat membaca modul atau menonton video.
                </div>
              ) : (
                savedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-amber-900">
                      <span>{note.title}</span>
                      <button
                        onClick={() => onDeleteNote(note.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Hapus Catatan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{note.text}</p>
                    {note.imageUrl && (
                      <div className="rounded-lg overflow-hidden border border-amber-300 max-h-32">
                        <img
                          src={note.imageUrl}
                          alt={note.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-28 object-cover"
                        />
                      </div>
                    )}
                    <div className="text-[10px] text-slate-600">{note.date}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
