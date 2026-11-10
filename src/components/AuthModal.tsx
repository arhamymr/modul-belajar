import React, { useState, useMemo } from 'react';
import { 
  User, 
  GraduationCap, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  BookOpen, 
  ShieldCheck, 
  School, 
  Hash, 
  Mail, 
  UserCheck, 
  ChevronRight,
  LogIn,
  Users,
  Trash2,
  HardDrives
} from '../icons/phosphor';
import { UserRole, StudentProfile, TeacherProfile } from '../types';
import { INITIAL_STUDENT_PROFILE } from '../data/curriculumData';
import { ConfirmModal, ConfirmModalState } from './ConfirmModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: UserRole;
  onLoginSuccess: (role: UserRole, user: StudentProfile | TeacherProfile) => void;
  teachersList: TeacherProfile[];
  studentsList: StudentProfile[];
  onRegisterStudent: (newStudent: StudentProfile) => void;
  onRegisterTeacher: (newTeacher: TeacherProfile) => void;
  onDeleteStudent?: (id: string) => void;
  onDeleteTeacher?: (id: string) => void;
  onExportAccounts?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'siswa',
  onLoginSuccess,
  teachersList,
  studentsList,
  onRegisterStudent,
  onRegisterTeacher,
  onDeleteStudent,
  onDeleteTeacher,
  onExportAccounts,
}) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(null);

  // Deduplicate and filter out Hendra Kusuma
  const filteredTeachers = useMemo(() => {
    const seen = new Set<string>();
    return teachersList.filter(t => {
      if (t.id === 'guru-demo-1' || t.name.toLowerCase().includes('hendra kusuma')) {
        return false;
      }
      const key = (t.nip || t.name).toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [teachersList]);

  // Deduplicate students
  const filteredStudents = useMemo(() => {
    const seen = new Set<string>();
    return studentsList.filter(s => {
      const key = (s.nisn || s.name).toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [studentsList]);

  // Student Login State
  const [studentNisn, setStudentNisn] = useState<string>('');
  const [studentPassword, setStudentPassword] = useState<string>('');

  // Teacher Login State
  const [teacherNip, setTeacherNip] = useState<string>('');
  const [teacherPassword, setTeacherPassword] = useState<string>('');

  // Common UI State
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Register Form State
  const [regRole, setRegRole] = useState<UserRole>('siswa');
  const [regName, setRegName] = useState<string>('');
  const [regIdentifier, setRegIdentifier] = useState<string>(''); // NISN or NIP
  const [regSchool, setRegSchool] = useState<string>('');
  const [regExtra, setRegExtra] = useState<string>('Kelas X-1'); // ClassGrade or Teaching Subject
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');

  // Handle Student Login
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const identifier = studentNisn.trim().toLowerCase();
    const foundStudent = filteredStudents.find(
      s => (s.name.toLowerCase() === identifier || (s.nisn && s.nisn.toLowerCase() === identifier) || (s.email && s.email.toLowerCase() === identifier))
    );

    if (!foundStudent) {
      setErrorMessage(`Akun Siswa "${studentNisn}" tidak ditemukan. Silakan periksa kembali nama atau NISN Anda, atau buat akun baru di tab pendaftaran.`);
      return;
    }

    if (foundStudent.password && studentPassword && foundStudent.password !== studentPassword) {
      setErrorMessage('Kata sandi yang Anda masukkan salah. Silakan coba lagi.');
      return;
    }

    setSuccessMessage(`Selamat datang kembali, ${foundStudent.name}!`);
    setTimeout(() => {
      onLoginSuccess('siswa', foundStudent);
      onClose();
    }, 600);
  };

  // Handle Teacher Login
  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const identifier = teacherNip.trim().toLowerCase();
    const foundTeacher = filteredTeachers.find(
      t => (t.nip.toLowerCase() === identifier || (t.email && t.email.toLowerCase() === identifier) || t.name.toLowerCase().includes(identifier))
    );

    if (!foundTeacher) {
      setErrorMessage(`Akun Guru dengan NIP/Email "${teacherNip}" tidak ditemukan. Silakan periksa kembali atau buat akun pendidik baru.`);
      return;
    }

    if (foundTeacher.password && teacherPassword && foundTeacher.password !== teacherPassword) {
      setErrorMessage('Kata sandi yang Anda masukkan salah. Silakan coba lagi.');
      return;
    }

    setSuccessMessage(`Selamat datang di Portal Pendidik, ${foundTeacher.name}!`);
    setTimeout(() => {
      onLoginSuccess('guru', foundTeacher);
      onClose();
    }, 600);
  };

  // Handle Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regName.trim()) {
      setErrorMessage(regRole === 'siswa' ? 'Nama Lengkap Siswa wajib diisi.' : 'Nama Lengkap Guru wajib diisi.');
      return;
    }

    if (regRole === 'guru' && !regIdentifier.trim()) {
      setErrorMessage('NIP / NUPTK wajib diisi.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Kata sandi minimal harus 6 karakter.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    if (regRole === 'siswa') {
      const newStudent: StudentProfile = {
        ...INITIAL_STUDENT_PROFILE,
        id: `student-${Date.now()}`,
        role: 'siswa',
        name: regName.trim(),
        nisn: regIdentifier.trim() || `NISN-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        email: regEmail.trim() || `${regName.trim().toLowerCase().replace(/\s+/g, '')}@siswa.belajar.id`,
        password: regPassword,
        school: regSchool.trim() || 'SMA / Sekolah Anda',
        classGrade: regExtra.trim() ? `${regExtra.trim()} - Kurikulum Merdeka` : 'Kelas X-1 - Kurikulum Merdeka',
        xp: 0,
        level: 1,
        completedModules: [],
        badges: [],
        savedNotes: [],
        quizHistory: [],
        historyAttempts: [],
        bookmarkedQuestions: [],
        registeredAt: new Date().toISOString(),
        savedLocally: true,
      };

      onRegisterStudent(newStudent);
      setSuccessMessage(`✅ Pendaftaran Berhasil! Akun Siswa ${newStudent.name} tersimpan di perangkat.`);
      setTimeout(() => {
        onLoginSuccess('siswa', newStudent);
        onClose();
      }, 600);
    } else {
      const newTeacher: TeacherProfile = {
        id: `guru-${Date.now()}`,
        role: 'guru',
        name: regName.trim(),
        nip: regIdentifier.trim(),
        email: regEmail.trim() || `${regIdentifier.trim()}@guru.belajar.id`,
        password: regPassword,
        school: regSchool.trim() || 'SMA / Sekolah Anda',
        title: 'Guru Pengampu Informatika (SMA)',
        subject: regExtra.trim() || 'Informatika (SMA)',
        teachingClasses: ['X-1', 'X-2', 'X-3'],
        avatar: '',
        phone: '',
        lastLogin: 'Baru saja',
        registeredAt: new Date().toISOString(),
        savedLocally: true,
      };

      onRegisterTeacher(newTeacher);
      setSuccessMessage(`✅ Pendaftaran Pendidik Berhasil! Akun Guru ${newTeacher.name} tersimpan di perangkat.`);
      setTimeout(() => {
        onLoginSuccess('guru', newTeacher);
        onClose();
      }, 700);
    }
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-6">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-blue-700 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shadow-inner">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Portal Akun Informatika SMA
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/25 text-white uppercase tracking-wider">
                  Kurikulum Merdeka
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Sistem E-Modul Interaktif, Video Tutorial, & Penilaian Otomatis
              </p>
            </div>
          </div>

          <button
            id="auth-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            title="Tutup Jendela Login"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode & Role Navigation Tabs */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-100 space-y-3">
          {/* Toggle Login vs Register */}
          <div className="flex bg-slate-200 p-1 rounded-2xl">
            <button
              id="tab-mode-login"
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                authMode === 'login'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk (Login)</span>
            </button>

            <button
              id="tab-mode-register"
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                authMode === 'register'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Daftar Akun Baru</span>
            </button>
          </div>

          {/* Role Tabs for Login Mode */}
          {authMode === 'login' && (
            <div className="grid grid-cols-2 gap-2">
              <button
                id="role-tab-siswa"
                type="button"
                onClick={() => {
                  setSelectedRole('siswa');
                  setErrorMessage(null);
                }}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center space-x-3 ${
                  selectedRole === 'siswa'
                    ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                    : 'border-slate-200 bg-white opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  selectedRole === 'siswa' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 flex items-center space-x-1.5">
                    <span>Masuk Siswa</span>
                    {selectedRole === 'siswa' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                  </div>
                  <p className="text-[10px] text-slate-600">Modul, Video, Kuis & Lab</p>
                </div>
              </button>

              <button
                id="role-tab-guru"
                type="button"
                onClick={() => {
                  setSelectedRole('guru');
                  setErrorMessage(null);
                }}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center space-x-3 ${
                  selectedRole === 'guru'
                    ? 'border-purple-600 bg-purple-50/80 shadow-xs'
                    : 'border-slate-200 bg-white opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  selectedRole === 'guru' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 flex items-center space-x-1.5">
                    <span>Masuk Guru</span>
                    {selectedRole === 'guru' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
                  </div>
                  <p className="text-[10px] text-slate-600">Dashboard & Rapor Siswa</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {/* Notification Banners */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start space-x-2.5 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-2.5 text-xs text-emerald-700 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span className="font-semibold">{successMessage}</span>
            </div>
          )}

          {/* ========================================= */}
          {/* 1. LOGIN SISWA FORM */}
          {/* ========================================= */}
          {authMode === 'login' && selectedRole === 'siswa' && (
            <div className="space-y-5">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Nama Lengkap atau NISN Siswa</span>
                  </label>
                  <input
                    id="student-login-nisn-input"
                    type="text"
                    value={studentNisn}
                    onChange={(e) => setStudentNisn(e.target.value)}
                    placeholder="Contoh: Nama Lengkap Siswa atau NISN"
                    className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 font-sans focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Kata Sandi Siswa</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] font-medium text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPassword ? 'Sembunyikan' : 'Tampilkan'}</span>
                    </button>
                  </label>
                  <input
                    id="student-login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    placeholder="Masukkan kata sandi (default: password123)"
                    className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <button
                  id="student-login-submit-btn"
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk Sebagai Siswa</span>
                </button>
              </form>

              {/* Registered Student Accounts or Empty Prompt */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                {filteredStudents.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        <span>Akun Siswa Tersimpan ({filteredStudents.length})</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Tersimpan di Cloud</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                      {filteredStudents.map((std) => (
                        <div
                          key={std.id}
                          className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between gap-2 group"
                        >
                          <div
                            onClick={() => {
                              setStudentNisn(std.nisn);
                              setStudentPassword(std.password || '');
                            }}
                            className="flex items-center space-x-2.5 min-w-0 flex-1 cursor-pointer"
                            title="Klik untuk isi formulir otomatis"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                              {std.name ? std.name[0].toUpperCase() : 'S'}
                            </div>
                            <div className="overflow-hidden flex-1">
                              <div className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">
                                {std.name}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">
                                NISN: {std.nisn} • {std.classGrade?.split(' - ')[0] || 'Siswa'}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setSuccessMessage(`Memuat sesi siswa ${std.name}...`);
                                setTimeout(() => {
                                  onLoginSuccess('siswa', std);
                                  onClose();
                                }, 300);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shadow-2xs"
                            >
                              Masuk
                            </button>
                            {onDeleteStudent && (
                              <button
                                type="button"
                                title="Hapus akun tersimpan"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmModal({
                                    isOpen: true,
                                    title: 'Hapus Akun Siswa',
                                    message: `Hapus akun siswa "${std.name}" (${std.nisn ? `NISN: ${std.nisn}` : std.classGrade}) dari perangkat ini?\n\nData akun akan dibersihkan dari penyimpanan peramban.`,
                                    confirmLabel: 'Ya, Hapus Akun',
                                    cancelLabel: 'Batal',
                                    confirmVariant: 'danger',
                                    onConfirm: () => {
                                      onDeleteStudent(std.id);
                                      setSuccessMessage(`Akun siswa "${std.name}" berhasil dihapus.`);
                                    }
                                  });
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                    <p className="text-xs font-semibold text-slate-700">Belum Ada Akun Siswa Terdaftar</p>
                    <p className="text-[11px] text-slate-500">
                      Silakan daftar akun siswa baru untuk mulai belajar mandiri dan mengerjakan kuis.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setRegRole('siswa');
                        setAuthMode('register');
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline pt-1 inline-block"
                    >
                      Daftar Akun Siswa Baru &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* 2. LOGIN GURU FORM */}
          {/* ========================================= */}
          {authMode === 'login' && selectedRole === 'guru' && (
            <div className="space-y-5">
              <form onSubmit={handleTeacherLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Nomor Induk Pegawai (NIP) / NUPTK / Email Guru</span>
                  </label>
                  <input
                    id="teacher-login-nip-input"
                    type="text"
                    value={teacherNip}
                    onChange={(e) => setTeacherNip(e.target.value)}
                    placeholder="Contoh: 198503142010011008"
                    className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <Lock className="w-3.5 h-3.5 text-purple-600" />
                      <span>Kata Sandi Pendidik</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] font-medium text-purple-600 hover:underline flex items-center space-x-1"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPassword ? 'Sembunyikan' : 'Tampilkan'}</span>
                    </button>
                  </label>
                  <input
                    id="teacher-login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    placeholder="Masukkan kata sandi pendidik"
                    className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>

                <button
                  id="teacher-login-submit-btn"
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Masuk Portal Guru Informatika</span>
                </button>
              </form>

              {/* Registered Teacher Accounts or Empty Prompt */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                {filteredTeachers.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-purple-500" />
                        <span>Akun Guru Tersimpan ({filteredTeachers.length})</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">Tersimpan di Cloud</span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                      {filteredTeachers.map((tea) => (
                        <div
                          key={tea.id}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition-all flex items-center justify-between gap-2 group"
                        >
                          <div
                            onClick={() => {
                              setTeacherNip(tea.nip);
                              setTeacherPassword(tea.password || '');
                            }}
                            className="flex items-center space-x-3 min-w-0 flex-1 cursor-pointer"
                            title="Klik untuk isi formulir otomatis"
                          >
                            <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                              {tea.name ? tea.name[0].toUpperCase() : 'G'}
                            </div>
                            <div className="overflow-hidden flex-1">
                              <div className="text-xs font-bold text-slate-900 truncate group-hover:text-purple-600">
                                {tea.name}
                              </div>
                              <div className="text-[10px] text-slate-600">
                                NIP: {tea.nip} • {tea.subject}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setSuccessMessage(`Memuat sesi guru ${tea.name}...`);
                                setTimeout(() => {
                                  onLoginSuccess('guru', tea);
                                  onClose();
                                }, 300);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold shadow-2xs"
                            >
                              Masuk
                            </button>
                            {onDeleteTeacher && (
                              <button
                                type="button"
                                title="Hapus akun guru tersimpan"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmModal({
                                    isOpen: true,
                                    title: 'Hapus Akun Guru',
                                    message: `Hapus akun guru "${tea.name}" (${tea.nip ? `NIP: ${tea.nip}` : tea.email}) dari perangkat ini?\n\nData akun akan dibersihkan dari penyimpanan peramban.`,
                                    confirmLabel: 'Ya, Hapus Akun',
                                    cancelLabel: 'Batal',
                                    confirmVariant: 'danger',
                                    onConfirm: () => {
                                      onDeleteTeacher(tea.id);
                                      setSuccessMessage(`Akun guru "${tea.name}" berhasil dihapus.`);
                                    }
                                  });
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1.5">
                    <p className="text-xs font-semibold text-slate-700">Belum Ada Akun Guru Terdaftar</p>
                    <p className="text-[11px] text-slate-500">
                      Silakan daftar akun pendidik baru untuk mengakses portal guru dan analitik kelas.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setRegRole('guru');
                        setAuthMode('register');
                      }}
                      className="text-xs font-bold text-purple-600 hover:underline pt-1 inline-block"
                    >
                      Daftar Akun Guru Baru &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================= */}
          {/* 3. REGISTER AKUN BARU (SISWA / GURU) */}
          {/* ========================================= */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Storage Notice */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start space-x-2 text-[11px] text-blue-900">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Penyimpanan Akun Otomatis:</strong>
                  <span className="text-slate-600 ml-1">
                    Akun yang didaftarkan akan tersimpan permanen di perangkat browser Anda (Local Storage) dan dapat digunakan untuk masuk kapan saja.
                  </span>
                </div>
              </div>

              {/* Role Selection for Registration */}
              <div>
                <label className="text-xs font-bold text-slate-800">Daftar Sebagai:</label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setRegRole('siswa')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                      regRole === 'siswa'
                        ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Siswa SMA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('guru')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                      regRole === 'guru'
                        ? 'bg-purple-50 border-purple-600 text-purple-700 shadow-xs'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Guru / Pendidik</span>
                  </button>
                </div>
              </div>

              {/* Nama Lengkap */}
              <div>
                <label className="text-xs font-bold text-slate-800">
                  {regRole === 'siswa' ? 'Nama Lengkap Siswa' : 'Nama Lengkap Guru (Beserta Gelar)'}
                </label>
                <input
                  id="reg-name-input"
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder={regRole === 'siswa' ? 'Contoh: Ahmad Rizky Ramadhan' : 'Contoh: Drs. Bambang Suryono, M.T.'}
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Conditional based on role */}
              {regRole === 'siswa' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-800">
                        NISN (Nomor Induk Siswa)
                      </label>
                      <input
                        id="reg-identifier-input"
                        type="text"
                        value={regIdentifier}
                        onChange={(e) => setRegIdentifier(e.target.value)}
                        placeholder="Contoh: 0081234567"
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800">
                        Kelas
                      </label>
                      <input
                        id="reg-extra-input"
                        type="text"
                        value={regExtra}
                        onChange={(e) => setRegExtra(e.target.value)}
                        placeholder="Contoh: Kelas X-1"
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800">
                      Asal Sekolah
                    </label>
                    <input
                      id="reg-school-input"
                      type="text"
                      value={regSchool}
                      onChange={(e) => setRegSchool(e.target.value)}
                      placeholder="Contoh: SMA Negeri 1 ..."
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-800">
                        NIP / NUPTK
                      </label>
                      <input
                        id="reg-identifier-input"
                        type="text"
                        value={regIdentifier}
                        onChange={(e) => setRegIdentifier(e.target.value)}
                        placeholder="Contoh: 198901012015011002"
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800">
                        Mata Pelajaran Ampuan
                      </label>
                      <input
                        id="reg-extra-input"
                        type="text"
                        value={regExtra}
                        onChange={(e) => setRegExtra(e.target.value)}
                        placeholder="Contoh: Informatika (SMA)"
                        className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800">Asal Satuan Pendidikan (Sekolah)</label>
                    <input
                      id="reg-school-input"
                      type="text"
                      value={regSchool}
                      onChange={(e) => setRegSchool(e.target.value)}
                      placeholder="Contoh: SMA Negeri 1 Prestasi Bangsa"
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </>
              )}

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800">Kata Sandi</label>
                  <input
                    id="reg-password-input"
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800">Konfirmasi Sandi</label>
                  <input
                    id="reg-confirm-password-input"
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Ulangi kata sandi"
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                id="register-submit-btn"
                type="submit"
                className={`w-full py-2.5 px-4 rounded-xl text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center space-x-2 ${
                  regRole === 'siswa'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-purple-700 hover:bg-purple-800'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Daftar & Masuk Sekarang</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sistem Otentikasi Peran Terintegrasi (RBAC)</span>
          </div>
          <span>v2.4 Kurikulum Merdeka</span>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal 
        state={confirmModal} 
        onClose={() => setConfirmModal(null)} 
      />
    </div>
  );
};
