import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  School, 
  Mail, 
  UserCheck, 
  LogIn, 
  UserPlus, 
  Compass, 
  Cpu, 
  Code2, 
  Network, 
  Database, 
  Info,
  ChevronRight,
  HelpCircle,
  Award,
  Users,
  Trash2,
  Download,
  Upload,
  Search,
  RefreshCw,
  HardDrives
} from '../icons/phosphor';
import { UserRole, StudentProfile, TeacherProfile } from '../types';
import { INFORMATICS_ELEMENTS, INITIAL_STUDENT_PROFILE } from '../data/curriculumData';
import { ConfirmModal, ConfirmModalState } from './ConfirmModal';
import { sqliteService } from '../services/sqliteService';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole, user: StudentProfile | TeacherProfile) => void;
  onRegisterStudent: (newStudent: StudentProfile) => void;
  onRegisterTeacher: (newTeacher: TeacherProfile) => void;
  onGuestLogin: () => void;
  teachersList: TeacherProfile[];
  studentsList: StudentProfile[];
  onDeleteStudent?: (id: string) => void;
  onDeleteTeacher?: (id: string) => void;
  onExportAccounts?: () => void;
  onImportAccounts?: (importedJson: string) => boolean | Promise<boolean>;
  onResetDemoAccounts?: () => void;
  onSyncCloudAccounts?: () => Promise<void>;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onRegisterStudent,
  onRegisterTeacher,
  onGuestLogin,
  teachersList,
  studentsList,
  onDeleteStudent,
  onDeleteTeacher,
  onExportAccounts,
  onImportAccounts,
  onResetDemoAccounts,
  onSyncCloudAccounts,
}) => {
  // Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  // Selected Role: 'siswa' | 'guru'
  const [selectedRole, setSelectedRole] = useState<UserRole>('siswa');
  // Filter for saved accounts list
  const [savedFilter, setSavedFilter] = useState<'all' | 'siswa' | 'guru'>('all');
  const [accountsSearchQuery, setAccountsSearchQuery] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Deduplicate and filter out deleted/demo teacher Hendra Kusuma
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
  const [showDemoHelp, setShowDemoHelp] = useState<boolean>(false);

  // Register Form State
  const [regRole, setRegRole] = useState<UserRole>('siswa');
  const [regName, setRegName] = useState<string>('');
  const [regIdentifier, setRegIdentifier] = useState<string>(''); // NISN or NIP
  const [regSchool, setRegSchool] = useState<string>('');
  const [regClassGrade, setRegClassGrade] = useState<string>('');
  const [regSubject, setRegSubject] = useState<string>('Informatika SMA');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');

  // Handle Student Login
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const identifier = studentNisn.trim().toLowerCase();
    let foundStudent = filteredStudents.find(
      s => (s.name.toLowerCase() === identifier || (s.nisn && s.nisn.toLowerCase() === identifier) || (s.email && s.email.toLowerCase() === identifier))
    );

    // Fallback: check directly from cloud database if not found locally
    if (!foundStudent) {
      try {
        const freshStudents = await sqliteService.getStudents();
        foundStudent = freshStudents.find(
          s => (s.name.toLowerCase() === identifier || (s.nisn && s.nisn.toLowerCase() === identifier) || (s.email && s.email.toLowerCase() === identifier))
        );
        if (foundStudent && onSyncCloudAccounts) {
          onSyncCloudAccounts();
        }
      } catch (err) {
        console.warn('Direct student check note:', err);
      }
    }

    if (!foundStudent) {
      setErrorMessage(`Akun Siswa "${studentNisn}" tidak ditemukan. Silakan periksa kembali nama atau NISN Anda, atau buat akun baru di tab "Daftar Akun".`);
      return;
    }

    if (foundStudent.password && studentPassword && foundStudent.password !== studentPassword) {
      setErrorMessage('Kata sandi yang Anda masukkan tidak cocok. Silakan coba lagi.');
      return;
    }

    setSuccessMessage(`Selamat datang kembali, ${foundStudent.name}! Menyiapkan modul pembelajaran...`);
    setTimeout(() => {
      onLoginSuccess('siswa', foundStudent);
    }, 500);
  };

  // Handle Teacher Login
  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const identifier = teacherNip.trim().toLowerCase();
    let foundTeacher = filteredTeachers.find(
      t => (t.nip.toLowerCase() === identifier || (t.email && t.email.toLowerCase() === identifier) || t.name.toLowerCase().includes(identifier))
    );

    // Fallback: check directly from cloud database if not found locally
    if (!foundTeacher) {
      try {
        const freshTeachers = await sqliteService.getTeachers();
        foundTeacher = freshTeachers.find(
          t => (t.nip.toLowerCase() === identifier || (t.email && t.email.toLowerCase() === identifier) || t.name.toLowerCase().includes(identifier))
        );
        if (foundTeacher && onSyncCloudAccounts) {
          onSyncCloudAccounts();
        }
      } catch (err) {
        console.warn('Direct teacher check note:', err);
      }
    }

    if (!foundTeacher) {
      setErrorMessage(`Akun Guru dengan NIP/Email "${teacherNip}" tidak ditemukan. Silakan periksa kembali atau buat akun pendidik baru di tab "Daftar Akun".`);
      return;
    }

    if (foundTeacher.password && teacherPassword && foundTeacher.password !== teacherPassword) {
      setErrorMessage('Kata sandi yang Anda masukkan salah. Silakan periksa kembali.');
      return;
    }

    setSuccessMessage(`Selamat datang di Dashboard Guru, ${foundTeacher.name}! Memuat data kelas...`);
    setTimeout(() => {
      onLoginSuccess('guru', foundTeacher);
    }, 500);
  };

  // Handle Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
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
        nisn: regIdentifier.trim() || `008${Math.floor(1000000 + Math.random() * 9000000)}`,
        email: regEmail.trim() || `${regName.trim().toLowerCase().replace(/\s+/g, '')}@siswa.belajar.id`,
        password: regPassword,
        school: regSchool.trim() || 'SMA / Sekolah Anda',
        classGrade: regClassGrade.trim() ? regClassGrade.trim() : 'Kelas X-1',
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
      setSuccessMessage(`✅ Pendaftaran Berhasil! Akun ${newStudent.name} (Siswa) tersimpan permanen di perangkat.`);
      setTimeout(() => {
        onLoginSuccess('siswa', newStudent);
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
        subject: regSubject.trim() || 'Informatika (SMA)',
        teachingClasses: ['Kelas X-1', 'Kelas X-2', 'Kelas X-3', 'Kelas X-4'],
        avatar: '',
        phone: '',
        lastLogin: 'Baru saja',
        registeredAt: new Date().toISOString(),
        savedLocally: true,
      };

      onRegisterTeacher(newTeacher);
      setSuccessMessage(`✅ Pendaftaran Pendidik Berhasil! Akun ${newTeacher.name} (Guru) tersimpan permanen di perangkat.`);
      setTimeout(() => {
        onLoginSuccess('guru', newTeacher);
      }, 600);
    }
  };

  const handleFileRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && onImportAccounts) {
        const ok = onImportAccounts(content);
        if (ok) {
          setSuccessMessage('✅ Berhasil memulihkan akun siswa & guru dari berkas cadangan!');
          setErrorMessage(null);
        } else {
          setErrorMessage('Format berkas cadangan akun tidak valid.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      {/* Top Bar with Branding */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                  InformatikaEdu SMA
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  SMA
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                E-Modul Pembelajaran Interaktif Kurikulum Merdeka
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="quick-guest-btn-top"
              onClick={onGuestLogin}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Eksplorasi Tamu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Login Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Educational Banner & 6 Elements Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Portal Masuk Siswa & Guru Informatika</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Selamat Datang di <br />
                <span className="text-blue-600">
                  E-Modul Informatika
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Platform pembelajaran digital interaktif berstandar Capaian Pembelajaran <strong>Informatika SMA</strong>. Lengkap dengan materi terstruktur, visualisasi konsep, asesmen formatif, simulator visual, dan buku nilai otomatis.
              </p>
            </div>

            {/* 6 CP Elements Pill Showcase */}
            <div className="space-y-2.5 pt-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>6 Elemen Capaian Pembelajaran Informatika:</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {Object.values(INFORMATICS_ELEMENTS).map((elem) => (
                  <div
                    key={elem.code}
                    className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center space-x-2"
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: elem.color }} 
                    />
                    <span className="font-semibold text-slate-800 truncate">
                      {elem.code} - {elem.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-blue-950">
                    Lab Virtual & Simulator
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Simulasi gerbang logika CPU, kalkulator subnetting IP, & scratchpad Python.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-950">
                    Rapor Otomatis & KKTP
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Evaluasi mandiri instan dengan analisis ketuntasan tiap elemen CP.
                  </p>
                </div>
              </div>
            </div>

            {/* Guest Action Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800">
                  Ingin meninjau modul terlebih dahulu?
                </span>
                <p className="text-[11px] text-slate-500">
                  Akses langsung materi dan simulator tanpa login akun.
                </p>
              </div>
              <button
                id="login-guest-btn-bottom"
                onClick={onGuestLogin}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center space-x-1.5 shrink-0"
              >
                <span>Masuk Tamu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Clean Interactive Login & Register Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
              
              {/* Header Mode Switcher: Masuk vs Daftar */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {authMode === 'login' ? 'Masuk ke Akun Anda' : 'Pendaftaran Akun Baru'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {authMode === 'login'
                      ? 'Pilih peran Anda dan masukkan kredensial untuk melanjutkan.'
                      : 'Lengkapi biodata Anda untuk membuat akun di E-Modul Informatika.'}
                  </p>
                </div>

                {/* Switch between Login and Register */}
                <div className="flex bg-slate-100 p-1 rounded-2xl shrink-0">
                  <button
                    id="switch-mode-login-btn"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      authMode === 'login'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Masuk
                  </button>
                  <button
                    id="switch-mode-register-btn"
                    onClick={() => {
                      setAuthMode('register');
                      setErrorMessage(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      authMode === 'register'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Daftar
                  </button>
                </div>
              </div>

              {/* Status Alerts */}
              {errorMessage && (
                <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start space-x-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                  <span className="leading-relaxed font-semibold">{successMessage}</span>
                </div>
              )}

              {/* LOGIN MODE */}
              {authMode === 'login' && (
                <div className="mt-6 space-y-6">
                  
                  {/* Role Selector: Siswa vs Guru */}
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/60">
                    <button
                      id="role-tab-siswa"
                      type="button"
                      onClick={() => {
                        setSelectedRole('siswa');
                        setErrorMessage(null);
                      }}
                      className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        selectedRole === 'siswa'
                          ? 'bg-white text-blue-600 shadow-xs border border-slate-200/80'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Siswa (Peserta Didik)</span>
                    </button>

                    <button
                      id="role-tab-guru"
                      type="button"
                      onClick={() => {
                        setSelectedRole('guru');
                        setErrorMessage(null);
                      }}
                      className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                        selectedRole === 'guru'
                          ? 'bg-white text-purple-600 shadow-xs border border-slate-200/80'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Guru (Pendidik)</span>
                    </button>
                  </div>

                  {/* SAVED REGISTERED ACCOUNTS SECTION */}
                  {(filteredStudents.length > 0 || filteredTeachers.length > 0) && (
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 border border-slate-200 space-y-3 shadow-xs">
                      {/* Hidden File Input for Restore */}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileRestore} 
                        accept=".json,application/json" 
                        className="hidden" 
                      />

                      {/* Header & Action Toolbar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/70 pb-2.5">
                        <div>
                          <div className="flex items-center space-x-2">
                            <HardDrives className="w-4 h-4 text-blue-600" />
                            <span className="text-xs font-bold text-slate-800">
                              Akun Terdaftar (Tersinkron Cloud Database)
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                              {filteredStudents.length + filteredTeachers.length} Akun
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            Tersimpan permanen di Cloud Database & tersinkronisasi lintas perangkat
                          </p>
                        </div>

                        {/* Backup, Restore & Cloud Sync Buttons */}
                        <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                          {onSyncCloudAccounts && (
                            <button
                              type="button"
                              onClick={async () => {
                                setIsSyncing(true);
                                try {
                                  await onSyncCloudAccounts();
                                  setSuccessMessage('✅ Seluruh akun berhasil disinkronkan langsung dari Cloud Database!');
                                  setTimeout(() => setSuccessMessage(null), 3500);
                                } catch {
                                  setErrorMessage('Gagal menyinkronkan akun dari cloud.');
                                } finally {
                                  setIsSyncing(false);
                                }
                              }}
                              disabled={isSyncing}
                              title="Tarik & perbarui akun terbaru dari database cloud (perangkat lain)"
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold transition-all flex items-center space-x-1 shadow-2xs disabled:opacity-50"
                            >
                              <RefreshCw className={`w-3 h-3 text-emerald-600 ${isSyncing ? 'animate-spin' : ''}`} />
                              <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Cloud'}</span>
                            </button>
                          )}

                          {onExportAccounts && (
                            <button
                              type="button"
                              onClick={onExportAccounts}
                              title="Cadangkan semua akun terdaftar ke file JSON"
                              className="px-2 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold transition-all flex items-center space-x-1 shadow-2xs"
                            >
                              <Download className="w-3 h-3 text-blue-600" />
                              <span>Cadangkan</span>
                            </button>
                          )}

                          {onImportAccounts && (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              title="Pulihkan akun dari file JSON cadangan"
                              className="px-2 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold transition-all flex items-center space-x-1 shadow-2xs"
                            >
                              <Upload className="w-3 h-3 text-purple-600" />
                              <span>Pulihkan</span>
                            </button>
                          )}

                          {onResetDemoAccounts && (
                            <button
                              type="button"
                              onClick={() => {
                                setConfirmModal({
                                  isOpen: true,
                                  title: 'Muat Ulang Akun Resmi Starter',
                                  message: 'Muat ulang profil resmi starter Kurikulum Merdeka (Guru & Siswa)? Akun mandiri yang telah Anda buat tetap dapat dipulihkan jika sebelumnya telah dicadangkan.',
                                  confirmLabel: 'Muat Ulang Sekarang',
                                  cancelLabel: 'Batal',
                                  confirmVariant: 'primary',
                                  onConfirm: () => {
                                    onResetDemoAccounts();
                                    setSuccessMessage('Akun starter resmi berhasil dimuat ulang!');
                                  }
                                });
                              }}
                              title="Muat ulang akun starter resmi"
                              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                            >
                              <RefreshCw className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Search & Filter Bar */}
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        {/* Search Input */}
                        <div className="relative w-full sm:flex-1">
                          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                            <Search className="w-3 h-3" />
                          </div>
                          <input
                            type="text"
                            value={accountsSearchQuery}
                            onChange={(e) => setAccountsSearchQuery(e.target.value)}
                            placeholder="Cari nama, NISN, NIP, atau kelas..."
                            className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                          />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center space-x-1 self-start sm:self-auto shrink-0">
                          <button
                            type="button"
                            onClick={() => setSavedFilter('all')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${savedFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            Semua ({filteredStudents.length + filteredTeachers.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setSavedFilter('siswa')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${savedFilter === 'siswa' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            Siswa ({filteredStudents.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setSavedFilter('guru')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${savedFilter === 'guru' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                          >
                            Guru ({filteredTeachers.length})
                          </button>
                        </div>
                      </div>

                      {/* Accounts Cards List */}
                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {/* Students List */}
                        {(savedFilter === 'all' || savedFilter === 'siswa') && 
                          filteredStudents
                            .filter(s => {
                              if (!accountsSearchQuery.trim()) return true;
                              const q = accountsSearchQuery.toLowerCase();
                              return s.name.toLowerCase().includes(q) || (s.nisn && s.nisn.toLowerCase().includes(q)) || (s.school && s.school.toLowerCase().includes(q)) || (s.classGrade && s.classGrade.toLowerCase().includes(q));
                            })
                            .map((s) => {
                              const regDateStr = s.registeredAt ? new Date(s.registeredAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
                              return (
                                <div
                                  key={s.id}
                                  className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between gap-2 shadow-2xs group"
                                >
                                  <div 
                                    className="flex items-center space-x-2.5 min-w-0 cursor-pointer flex-1"
                                    onClick={() => {
                                      setSelectedRole('siswa');
                                      setStudentNisn(s.nisn || s.name);
                                      if (s.password) setStudentPassword(s.password);
                                    }}
                                    title="Klik untuk memilih akun ini"
                                  >
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black shrink-0 group-hover:scale-105 transition-transform">
                                      {s.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center space-x-1.5">
                                        <span className="font-bold text-xs text-slate-900 truncate">
                                          {s.name}
                                        </span>
                                        <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200 shrink-0">
                                          🧑‍🎓 {s.classGrade.split(' - ')[0] || 'Kelas X-1'}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2 text-[10px] text-slate-500 truncate">
                                        <span>NISN: {s.nisn || '-'}</span>
                                        <span>•</span>
                                        <span className="truncate">{s.school}</span>
                                        {regDateStr && (
                                          <>
                                            <span>•</span>
                                            <span className="text-emerald-600 font-medium">Tersimpan ({regDateStr})</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedRole('siswa');
                                        setSuccessMessage(`Memuat sesi siswa ${s.name}...`);
                                        setTimeout(() => onLoginSuccess('siswa', s), 300);
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors shadow-2xs"
                                    >
                                      Masuk
                                    </button>
                                    {onDeleteStudent && (
                                      <button
                                        type="button"
                                        title="Hapus akun dari perangkat ini"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setConfirmModal({
                                            isOpen: true,
                                            title: 'Hapus Akun Siswa',
                                            message: `Apakah Anda yakin ingin menghapus akun siswa "${s.name}" (${s.nisn ? `NISN: ${s.nisn}` : s.classGrade}) dari perangkat ini?\n\nData akun dan rekapitulasi lokal siswa ini akan dibersihkan dari penyimpanan peramban.`,
                                            confirmLabel: 'Ya, Hapus Akun',
                                            cancelLabel: 'Batal',
                                            confirmVariant: 'danger',
                                            onConfirm: () => {
                                              onDeleteStudent(s.id);
                                              setSuccessMessage(`Akun siswa "${s.name}" berhasil dihapus.`);
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
                              );
                            })}

                        {/* Teachers List */}
                        {(savedFilter === 'all' || savedFilter === 'guru') && 
                          filteredTeachers
                            .filter(t => {
                              if (!accountsSearchQuery.trim()) return true;
                              const q = accountsSearchQuery.toLowerCase();
                              return t.name.toLowerCase().includes(q) || (t.nip && t.nip.toLowerCase().includes(q)) || (t.school && t.school.toLowerCase().includes(q)) || (t.subject && t.subject.toLowerCase().includes(q));
                            })
                            .map((t) => {
                              const regDateStr = t.registeredAt ? new Date(t.registeredAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
                              return (
                                <div
                                  key={t.id}
                                  className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-purple-300 transition-all flex items-center justify-between gap-2 shadow-2xs group"
                                >
                                  <div 
                                    className="flex items-center space-x-2.5 min-w-0 cursor-pointer flex-1"
                                    onClick={() => {
                                      setSelectedRole('guru');
                                      setTeacherNip(t.nip || t.email);
                                      if (t.password) setTeacherPassword(t.password);
                                    }}
                                    title="Klik untuk memilih akun ini"
                                  >
                                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-black shrink-0 group-hover:scale-105 transition-transform">
                                      {t.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center space-x-1.5">
                                        <span className="font-bold text-xs text-slate-900 truncate">
                                          {t.name}
                                        </span>
                                        <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-purple-50 text-purple-700 font-semibold border border-purple-200 shrink-0">
                                          👨‍🏫 Pendidik
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2 text-[10px] text-slate-500 truncate">
                                        <span>NIP: {t.nip}</span>
                                        <span>•</span>
                                        <span className="truncate">{t.subject}</span>
                                        {regDateStr && (
                                          <>
                                            <span>•</span>
                                            <span className="text-emerald-600 font-medium">Tersimpan ({regDateStr})</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedRole('guru');
                                        setSuccessMessage(`Memuat sesi guru ${t.name}...`);
                                        setTimeout(() => onLoginSuccess('guru', t), 300);
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold transition-colors shadow-2xs"
                                    >
                                      Masuk
                                    </button>
                                    {onDeleteTeacher && (
                                      <button
                                        type="button"
                                        title="Hapus akun dari perangkat ini"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setConfirmModal({
                                            isOpen: true,
                                            title: 'Hapus Akun Guru',
                                            message: `Apakah Anda yakin ingin menghapus akun guru "${t.name}" (${t.nip ? `NIP: ${t.nip}` : t.email}) dari perangkat ini?\n\nData profil guru ini akan dibersihkan dari penyimpanan lokal.`,
                                            confirmLabel: 'Ya, Hapus Akun',
                                            cancelLabel: 'Batal',
                                            confirmVariant: 'danger',
                                            onConfirm: () => {
                                              onDeleteTeacher(t.id);
                                              setSuccessMessage(`Akun guru "${t.name}" berhasil dihapus.`);
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
                              );
                            })}

                        {((savedFilter === 'siswa' && filteredStudents.length === 0) ||
                          (savedFilter === 'guru' && filteredTeachers.length === 0) ||
                          (filteredStudents.length === 0 && filteredTeachers.length === 0)) && (
                          <div className="py-3 text-center text-xs text-slate-400">
                            Tidak ada akun yang sesuai kriteria pencarian.
                          </div>
                        )}
                      </div>

                      <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
                        <span>
                          💡 Klik <strong>Masuk</strong> untuk akses langsung tanpa memasukkan sandi.
                        </span>
                        <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Tersimpan Aman</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Manual Form Header / Divider */}
                  {(studentsList.length > 0 || teachersList.length > 0) && (
                    <div className="relative flex items-center justify-center">
                      <div className="w-full border-t border-slate-200"></div>
                      <span className="absolute bg-white px-3 text-[11px] font-medium text-slate-400">
                        Atau Masukkan Kredensial Manual
                      </span>
                    </div>
                  )}

                  {/* SISWA LOGIN FORM */}
                  {selectedRole === 'siswa' && (
                    <form onSubmit={handleStudentLogin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Nama Siswa / NISN
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <input
                            id="login-student-nisn-input"
                            type="text"
                            required
                            value={studentNisn}
                            onChange={(e) => setStudentNisn(e.target.value)}
                            placeholder="Contoh: Nama Lengkap Siswa atau NISN"
                            className="w-full pl-9.5 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Kata Sandi
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            id="login-student-password-input"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={studentPassword}
                            onChange={(e) => setStudentPassword(e.target.value)}
                            placeholder="Masukkan kata sandi akun"
                            className="w-full pl-9.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        id="submit-student-login-btn"
                        type="submit"
                        className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Masuk ke E-Modul Siswa</span>
                      </button>

                      {/* Empty state notice if no students yet */}
                      {studentsList.length === 0 && (
                        <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/70 text-xs text-blue-900 space-y-2">
                          <div className="flex items-center space-x-2 font-bold text-blue-700">
                            <Info className="w-4 h-4 shrink-0" />
                            <span>Belum ada akun siswa terdaftar</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Belum ada akun siswa. Silakan klik tombol di bawah untuk membuat akun baru dan mengisi data Anda.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthMode('register');
                              setRegRole('siswa');
                              setErrorMessage(null);
                            }}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Daftar Akun Siswa Baru</span>
                          </button>
                        </div>
                      )}
                    </form>
                  )}

                  {/* GURU LOGIN FORM */}
                  {selectedRole === 'guru' && (
                    <form onSubmit={handleTeacherLogin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          NIP / NUPTK / Email Pendidik
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <input
                            id="login-teacher-nip-input"
                            type="text"
                            required
                            value={teacherNip}
                            onChange={(e) => setTeacherNip(e.target.value)}
                            placeholder="Contoh: 198503142010011008 atau email guru"
                            className="w-full pl-9.5 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition-all font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Kata Sandi
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                          </div>
                          <input
                            id="login-teacher-password-input"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={teacherPassword}
                            onChange={(e) => setTeacherPassword(e.target.value)}
                            placeholder="Masukkan kata sandi pendidik"
                            className="w-full pl-9.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <button
                        id="submit-teacher-login-btn"
                        type="submit"
                        className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Masuk ke Dashboard Pendidik</span>
                      </button>

                      {/* Empty state notice if no teachers yet */}
                      {teachersList.length === 0 && (
                        <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/70 text-xs text-purple-900 space-y-2">
                          <div className="flex items-center space-x-2 font-bold text-purple-700">
                            <Info className="w-4 h-4 shrink-0" />
                            <span>Belum ada akun guru terdaftar</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Belum ada akun guru. Silakan klik tombol di bawah untuk membuat akun baru dan mengisi profil pendidik Anda.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setAuthMode('register');
                              setRegRole('guru');
                              setErrorMessage(null);
                            }}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-xs"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Daftar Akun Guru Baru</span>
                          </button>
                        </div>
                      )}
                    </form>
                  )}
                </div>
              )}

              {/* REGISTER MODE */}
              {authMode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="mt-6 space-y-4">
                  {/* Storage Guarantee Notice */}
                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start space-x-2 text-[11px] text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Penyimpanan Akun Otomatis:</strong>
                      <span className="text-slate-600 ml-1">
                        Akun yang didaftarkan akan tersimpan permanen di perangkat browser Anda (Local Storage) dan dapat digunakan untuk masuk kapan saja.
                      </span>
                    </div>
                  </div>
                  
                  {/* Select Role for Registration */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Daftar Sebagai
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegRole('siswa')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          regRole === 'siswa'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        🧑‍🎓 Siswa
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegRole('guru')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                          regRole === 'guru'
                            ? 'bg-purple-50 border-purple-500 text-purple-700'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        👨‍🏫 Guru / Pendidik
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {regRole === 'siswa' ? 'Nama Lengkap Siswa' : 'Nama Lengkap Beserta Gelar'}
                    </label>
                    <input
                      id="reg-name-input"
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder={regRole === 'siswa' ? 'Contoh: Muhammad Rizki Pratama' : 'Contoh: Drs. Hendra Kusuma, M.Kom.'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {regRole === 'siswa' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            NISN (Nomor Induk Siswa Nasional)
                          </label>
                          <input
                            id="reg-nisn-input"
                            type="text"
                            value={regIdentifier}
                            onChange={(e) => setRegIdentifier(e.target.value)}
                            placeholder="Contoh: 0081234567"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Kelas *
                          </label>
                          <input
                            id="reg-class-select"
                            type="text"
                            required
                            value={regClassGrade}
                            onChange={(e) => setRegClassGrade(e.target.value)}
                            placeholder="Ketik kelas Anda (Contoh: X-1, X MIPA 1, dsb.)"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Asal Sekolah *
                          </label>
                          <input
                            id="reg-school-input"
                            type="text"
                            required
                            value={regSchool}
                            onChange={(e) => setRegSchool(e.target.value)}
                            placeholder="Contoh: SMA Negeri 1 ..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Email Siswa (Opsional)
                          </label>
                          <input
                            id="reg-student-email-input"
                            type="email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="nama@siswa.belajar.id"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Asal Sekolah
                        </label>
                        <input
                          id="reg-school-input"
                          type="text"
                          required
                          value={regSchool}
                          onChange={(e) => setRegSchool(e.target.value)}
                          placeholder="Contoh: SMA Negeri 1 ..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            NIP / NUPTK
                          </label>
                          <input
                            id="reg-identifier-input"
                            type="text"
                            required
                            value={regIdentifier}
                            onChange={(e) => setRegIdentifier(e.target.value)}
                            placeholder="198701012015011002"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 font-mono focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Mata Pelajaran
                          </label>
                          <input
                            id="reg-subject-input"
                            type="text"
                            value={regSubject}
                            onChange={(e) => setRegSubject(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Email Akun Belajar Guru
                        </label>
                        <input
                          id="reg-email-input"
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="nama@guru.belajar.id"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Kata Sandi (Min 6 Karakter)
                      </label>
                      <input
                        id="reg-password-input"
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Konfirmasi Kata Sandi
                      </label>
                      <input
                        id="reg-confirm-password-input"
                        type="password"
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-register-btn"
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Daftarkan Akun & Masuk</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Informatika SMA Negeri 1 Prestasi Bangsa • Kurikulum Merdeka (SMA)
          </span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>6 Elemen CP</span>
            <span>•</span>
            <span>Rapor Diagnostik Otomatis</span>
            <span>•</span>
            <span>AI Tutor Terintegrasi</span>
          </div>
        </div>
      </footer>

      {/* Confirmation Modal */}
      <ConfirmModal 
        state={confirmModal} 
        onClose={() => setConfirmModal(null)} 
      />
    </div>
  );
};
