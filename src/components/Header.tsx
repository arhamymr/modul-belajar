import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  GraduationCap, 
  User, 
  Flame, 
  Code2, 
  Video, 
  HelpCircle,
  Laptop,
  Layers,
  BarChart3,
  Bookmark,
  LogIn,
  LogOut,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  SwitchCamera,
  CheckCircle2,
  Compass
} from '../icons/phosphor';
import { StudentProfile, TeacherProfile, UserRole } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
  student: StudentProfile;
  teacher: TeacherProfile | null;
  onOpenStudentProfile: () => void;
  onOpenTeacherProfile: () => void;
  onOpenAuthModal: (initialRole?: UserRole) => void;
  onLogout: () => void;
  onOpenAITutor: () => void;
  onOpenCertificate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentRole,
  student,
  teacher,
  onOpenStudentProfile,
  onOpenTeacherProfile,
  onOpenAuthModal,
  onLogout,
  onOpenAITutor,
  onOpenCertificate,
}) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const completedCount = student?.completedModules?.length || 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeUser = currentRole === 'guru' && teacher ? teacher : student;
  const isTeacherRole = currentRole === 'guru';

  const handleTabClick = (tabKey: string) => {
    if (tabKey === 'teacher' && currentRole !== 'guru') {
      // If student clicks teacher dashboard, give them option to open teacher view or login as teacher
      setActiveTab('teacher');
    } else {
      setActiveTab(tabKey);
    }
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors">
      {/* Top Notification / Kurikulum Banner */}
      <div className="bg-white border-b border-slate-200 text-slate-700 text-xs font-medium py-1.5 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border ${
              isTeacherRole
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              Kurikulum Merdeka
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-600">
              {isTeacherRole 
                ? 'Portal Pendidik Informatika SMA' 
                : 'E-Modul Informatika SMA'}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="header-open-ai-tutor-banner"
              onClick={onOpenAITutor}
              className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-colors text-[11px] font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tutor AI Informatika</span>
            </button>
            <span className="text-slate-300">|</span>

            {isTeacherRole ? (
              <div className="flex items-center space-x-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                <span>NIP: {teacher?.nip || '19850314...'}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-[11px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{student.xp || 0} XP (Lv. {student.level || 1})</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name - Clean & Compact */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer select-none" 
            onClick={() => setActiveTab(isTeacherRole ? 'teacher' : 'modules')}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs ${
              isTeacherRole 
                ? 'bg-purple-600' 
                : 'bg-blue-600'
            }`}>
              {isTeacherRole ? <GraduationCap className="w-5 h-5" /> : <Laptop className="w-5 h-5" />}
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                Informatika<span className={isTeacherRole ? 'text-purple-600' : 'text-blue-600'}>Edu</span>
              </span>
            </div>
          </div>

          {/* Center Navigation Links - Clean Minimal Pills */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              id="nav-btn-modules"
              onClick={() => handleTabClick('modules')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'modules' || activeTab === 'reader'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Modul</span>
            </button>

            <button
              id="nav-btn-videos"
              onClick={() => handleTabClick('videos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'videos'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video</span>
            </button>

            <button
              id="nav-btn-quiz"
              onClick={() => handleTabClick('quiz')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'quiz' || activeTab === 'grading'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Latihan & Ujian</span>
            </button>

            <button
              id="nav-btn-lab"
              onClick={() => handleTabClick('lab')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'lab'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Lab Virtual</span>
            </button>

            <button
              id="nav-btn-teacher"
              onClick={() => handleTabClick('teacher')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'teacher'
                  ? 'bg-purple-50 text-purple-700 font-bold'
                  : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Dashboard Guru</span>
            </button>

            <button
              id="nav-btn-guide"
              onClick={() => handleTabClick('guide')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'guide'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === 'guide' ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Panduan</span>
            </button>
          </nav>

          {/* Right Action Icons & Profile / Login Menu */}
          <div className="flex items-center space-x-2">
            {/* Certificate Button (Available for students with completed modules) */}
            {!isTeacherRole && completedCount >= 1 && (
              <button
                id="header-certificate-btn"
                onClick={onOpenCertificate}
                aria-label="Lihat Sertifikat Kelulusan"
                className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
                title="Lihat Sertifikat Kelulusan"
              >
                <Award className="w-4 h-4 text-amber-600" />
              </button>
            )}

            {/* Quick Switch / Login CTA Button with explicit aria-label and keyboard listener */}
            <button
              id="header-switch-login-btn"
              type="button"
              aria-label="Ganti atau masuk akun pengguna (Siswa atau Guru)"
              onClick={() => onOpenAuthModal(isTeacherRole ? 'siswa' : 'guru')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenAuthModal(isTeacherRole ? 'siswa' : 'guru');
                }
              }}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                isTeacherRole
                  ? 'bg-purple-50/70 border-purple-200 text-purple-700 hover:bg-purple-100 focus:ring-2 focus:ring-purple-500'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-2 focus:ring-blue-500'
              } focus:outline-hidden focus:ring-offset-1 cursor-pointer`}
              title="Ganti Akun Siswa / Guru (Tekan Enter atau Spasi untuk membuka)"
            >
              <LogIn className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Ganti Akun</span>
            </button>

            {/* Account Profile Dropdown Trigger */}
            <div className="relative" ref={menuRef}>
              <button
                id="header-student-profile-btn"
                type="button"
                aria-label={`Menu profil ${activeUser?.name || 'pengguna'}`}
                aria-expanded={isAccountMenuOpen}
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className={`flex items-center space-x-2 p-1.5 pl-2 rounded-xl border transition-all ${
                  isTeacherRole
                    ? 'border-purple-200 hover:bg-purple-50/70'
                    : 'border-slate-200 hover:bg-slate-50'
                } focus:outline-hidden focus:ring-2 focus:ring-blue-500`}
              >
                <div className={`w-7 h-7 rounded-lg text-white flex items-center justify-center font-bold text-xs shadow-2xs ${
                  isTeacherRole ? 'bg-purple-600' : 'bg-blue-600'
                }`}>
                  {activeUser && activeUser.name ? activeUser.name[0].toUpperCase() : (isTeacherRole ? 'G' : 'S')}
                </div>
                <div className="hidden md:block text-left pr-1 max-w-[110px]">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {activeUser && activeUser.name ? activeUser.name.split(' ')[0] : (isTeacherRole ? 'Pendidik' : 'Siswa')}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {isTeacherRole ? 'Pendidik' : (student?.classGrade?.split(' - ')[0] || 'Siswa')}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {isAccountMenuOpen && (
                <div 
                  id="account-dropdown-menu" 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95"
                >
                  {/* User Profile Header in Menu */}
                  <div className="px-4 py-3 border-b border-slate-100 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isTeacherRole
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {isTeacherRole ? '👨‍🏫 Akun Guru / Pendidik' : '🧑‍🎓 Akun Siswa'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {activeUser?.name || (isTeacherRole ? 'Pendidik' : 'Siswa')}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {isTeacherRole ? (teacher?.nip ? `NIP: ${teacher.nip}` : 'NIP belum diisi') : (student?.nisn ? `NISN: ${student.nisn}` : (student?.classGrade || 'Siswa'))}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {activeUser?.school || 'Sekolah Anda'}
                    </div>
                  </div>

                  {/* Menu Action Items */}
                  <div className="py-1">
                    {/* View Profile */}
                    <button
                      id="menu-open-profile-btn"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        if (isTeacherRole) {
                          onOpenTeacherProfile();
                        } else {
                          onOpenStudentProfile();
                        }
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{isTeacherRole ? 'Profil & Biodata Pendidik' : 'Biodata & Riwayat Nilai'}</span>
                    </button>

                    {/* Switch Role or Switch Account */}
                    <button
                      id="menu-switch-role-btn"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        onOpenAuthModal(isTeacherRole ? 'siswa' : 'guru');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5 transition-colors"
                    >
                      <SwitchCamera className="w-4 h-4 text-slate-400" />
                      <span>{isTeacherRole ? 'Ganti ke Akun Siswa' : 'Ganti ke Akun Guru'}</span>
                    </button>

                    {/* Open Full Auth Modal */}
                    <button
                      id="menu-open-auth-modal-btn"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        onOpenAuthModal();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center space-x-2.5 transition-colors"
                    >
                      <LogIn className="w-4 h-4 text-slate-400" />
                      <span>Portal Login / Daftar Akun</span>
                    </button>

                    {/* Panduan Penggunaan Shortcut */}
                    <button
                      id="menu-open-guide-btn"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        setActiveTab('guide');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-indigo-700 hover:bg-indigo-50 flex items-center space-x-2.5 transition-colors font-medium"
                    >
                      <Compass className="w-4 h-4 text-indigo-600" />
                      <span>Panduan Penggunaan E-Modul</span>
                    </button>
                  </div>

                  {/* Logout Item */}
                  <div className="pt-1 border-t border-slate-100">
                    <button
                      id="menu-logout-btn"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2.5 transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-100 text-xs no-scrollbar">
          <button
            onClick={() => handleTabClick('modules')}
            className={`px-3 py-1.5 rounded-lg shrink-0 font-bold ${
              activeTab === 'modules' || activeTab === 'reader' ? 'bg-blue-600 text-white' : 'text-slate-600'
            }`}
          >
            Modul
          </button>
          <button
            onClick={() => handleTabClick('videos')}
            className={`px-3 py-1.5 rounded-lg shrink-0 font-bold ${
              activeTab === 'videos' ? 'bg-blue-600 text-white' : 'text-slate-600'
            }`}
          >
            Video
          </button>
          <button
            onClick={() => handleTabClick('quiz')}
            className={`px-3 py-1.5 rounded-lg shrink-0 font-bold ${
              activeTab === 'quiz' || activeTab === 'grading' ? 'bg-blue-600 text-white' : 'text-slate-600'
            }`}
          >
            Latihan & Ujian
          </button>
          <button
            onClick={() => handleTabClick('lab')}
            className={`px-3 py-1.5 rounded-lg shrink-0 font-bold ${
              activeTab === 'lab' ? 'bg-blue-600 text-white' : 'text-slate-600'
            }`}
          >
            Lab Virtual
          </button>
          <button
            onClick={() => handleTabClick('teacher')}
            className={`px-3 py-1.5 rounded-lg shrink-0 font-bold ${
              activeTab === 'teacher' ? 'bg-purple-600 text-white' : 'text-slate-600'
            }`}
          >
            Guru
          </button>
          <button
            onClick={() => handleTabClick('guide')}
            className={`px-3 py-1.5 rounded-lg shrink-0 font-bold ${
              activeTab === 'guide' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            Panduan
          </button>
        </div>
      </div>
    </header>
  );
};
