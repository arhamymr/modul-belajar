import { InformaticsElementInfo, InteractiveModule, VideoTutorial, TeacherStudentSummary, StudentProfile, TeacherProfile } from '../types';
import { module1_bk } from './modules/module1_bk';
import { module2_ap } from './modules/module2_ap';
import { module3_sk } from './modules/module3_sk';
import { module4_jki } from './modules/module4_jki';
import { module5_ad } from './modules/module5_ad';
import { module6_dsi } from './modules/module6_dsi';
import { VIDEO_TUTORIALS_DATA } from './videoTutorialsData';

export { VIDEO_TUTORIALS_DATA };

export const INFORMATICS_ELEMENTS: Record<string, InformaticsElementInfo> = {
  BK: {
    code: 'BK',
    name: 'Berpikir Komputasional',
    fullName: 'Berpikir Komputasional (Computational Thinking SMA)',
    description: 'Pemecahan masalah kompleks melalui 4 pilar: Dekomposisi, Pengenalan Pola, Abstraksi, dan Algoritma, serta struktur data tumpukan (Stack) dan antrean (Queue).',
    color: '#3B82F6', // blue
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  AP: {
    code: 'AP',
    name: 'Algoritma & Pemrograman',
    fullName: 'Algoritma dan Pemrograman (SMA)',
    description: 'Belajar logika pemrograman terstruktur, diagram alir (flowchart), variabel, percabangan (if-else), perulangan (loop), dan fungsi modular.',
    color: '#10B981', // emerald
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  SK: {
    code: 'SK',
    name: 'Sistem Komputer',
    fullName: 'Sistem Komputer & Perangkat Keras (SMA)',
    description: 'Mengenal arsitektur komputer (Input, CPU, Output, Penyimpanan), sistem operasi, siklus fetch-decode-execute, dan logika digital biner.',
    color: '#8B5CF6', // purple
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  JKI: {
    code: 'JKI',
    name: 'Jaringan Komputer & Internet',
    fullName: 'Jaringan Komputer dan Internet (SMA)',
    description: 'Mekanisme transmisi data, topologi jaringan (LAN/WAN), protokol TCP/IP, DNS, serta keamanan siber dan enkripsi data.',
    color: '#F59E0B', // amber
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  AD: {
    code: 'AD',
    name: 'Analisis Data',
    fullName: 'Analisis Data & Lembar Kerja (SMA)',
    description: 'Pengolahan dan visualisasi data, formula spreadsheet lanjutan, pemodelan data, dan analisis statistik deskriptif.',
    color: '#EC4899', // pink
    badgeBg: 'bg-pink-100 text-pink-800 border-pink-200',
  },
  DSI: {
    code: 'DSI',
    name: 'Dampak Sosial Informatika',
    fullName: 'Dampak Sosial Informatika & Etika Digital (SMA)',
    description: 'Aspek hukum dan etika dunia siber, hak kekayaan intelektual (UU ITE/HAKI), transformasi digital masyarakat, dan literasi media.',
    color: '#0D9488', // teal
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
  },
};

export interface ChapterTheme {
  number: number;
  element: string;
  name: string;
  colorName: string;
  accentColor: string;
  cardTopBorder: string;
  cardHoverBorder: string;
  badgeBg: string;
  buttonBg: string;
  buttonHover: string;
  pillBg: string;
  textColor: string;
  darkTextColor: string;
  lightBg: string;
  darkLightBg: string;
  sidebarActiveBg: string;
  iconBg: string;
}

export const CHAPTER_THEMES: Record<string, ChapterTheme> = {
  'mod-1': {
    number: 1,
    element: 'BK',
    name: 'Berpikir Komputasional',
    colorName: 'Biru (Blue)',
    accentColor: '#2563EB',
    cardTopBorder: 'border-t-4 border-t-blue-600',
    cardHoverBorder: 'hover:border-blue-500',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    buttonBg: 'bg-blue-600',
    buttonHover: 'hover:bg-blue-700',
    pillBg: 'bg-blue-600 text-white',
    textColor: 'text-blue-600',
    darkTextColor: 'text-blue-600',
    lightBg: 'bg-blue-50',
    darkLightBg: 'bg-blue-50',
    sidebarActiveBg: 'bg-blue-50 text-blue-700 border-blue-300',
    iconBg: 'bg-blue-100 text-blue-700',
  },
  'mod-2': {
    number: 2,
    element: 'AP',
    name: 'Algoritma & Pemrograman',
    colorName: 'Hijau (Emerald)',
    accentColor: '#059669',
    cardTopBorder: 'border-t-4 border-t-emerald-600',
    cardHoverBorder: 'hover:border-emerald-500',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    buttonBg: 'bg-emerald-600',
    buttonHover: 'hover:bg-emerald-700',
    pillBg: 'bg-emerald-600 text-white',
    textColor: 'text-emerald-600',
    darkTextColor: 'text-emerald-600',
    lightBg: 'bg-emerald-50',
    darkLightBg: 'bg-emerald-50',
    sidebarActiveBg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
    iconBg: 'bg-emerald-100 text-emerald-700',
  },
  'mod-3': {
    number: 3,
    element: 'SK',
    name: 'Sistem Komputer',
    colorName: 'Ungu (Purple)',
    accentColor: '#7C3AED',
    cardTopBorder: 'border-t-4 border-t-purple-600',
    cardHoverBorder: 'hover:border-purple-500',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    buttonBg: 'bg-purple-600',
    buttonHover: 'hover:bg-purple-700',
    pillBg: 'bg-purple-600 text-white',
    textColor: 'text-purple-600',
    darkTextColor: 'text-purple-600',
    lightBg: 'bg-purple-50',
    darkLightBg: 'bg-purple-50',
    sidebarActiveBg: 'bg-purple-50 text-purple-700 border-purple-300',
    iconBg: 'bg-purple-100 text-purple-700',
  },
  'mod-4': {
    number: 4,
    element: 'JKI',
    name: 'Jaringan Komputer & Internet',
    colorName: 'Jingga (Amber)',
    accentColor: '#D97706',
    cardTopBorder: 'border-t-4 border-t-amber-600',
    cardHoverBorder: 'hover:border-amber-500',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    buttonBg: 'bg-amber-600',
    buttonHover: 'hover:bg-amber-700',
    pillBg: 'bg-amber-600 text-white',
    textColor: 'text-amber-600',
    darkTextColor: 'text-amber-600',
    lightBg: 'bg-amber-50',
    darkLightBg: 'bg-amber-50',
    sidebarActiveBg: 'bg-amber-50 text-amber-700 border-amber-300',
    iconBg: 'bg-amber-100 text-amber-700',
  },
  'mod-5': {
    number: 5,
    element: 'AD',
    name: 'Analisis Data',
    colorName: 'Mawar (Rose)',
    accentColor: '#E11D48',
    cardTopBorder: 'border-t-4 border-t-rose-600',
    cardHoverBorder: 'hover:border-rose-500',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    buttonBg: 'bg-rose-600',
    buttonHover: 'hover:bg-rose-700',
    pillBg: 'bg-rose-600 text-white',
    textColor: 'text-rose-600',
    darkTextColor: 'text-rose-600',
    lightBg: 'bg-rose-50',
    darkLightBg: 'bg-rose-50',
    sidebarActiveBg: 'bg-rose-50 text-rose-700 border-rose-300',
    iconBg: 'bg-rose-100 text-rose-700',
  },
  'mod-6': {
    number: 6,
    element: 'DSI',
    name: 'Dampak Sosial Informatika',
    colorName: 'Toska (Teal)',
    accentColor: '#0D9488',
    cardTopBorder: 'border-t-4 border-t-teal-600',
    cardHoverBorder: 'hover:border-teal-500',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
    buttonBg: 'bg-teal-600',
    buttonHover: 'hover:bg-teal-700',
    pillBg: 'bg-teal-600 text-white',
    textColor: 'text-teal-600',
    darkTextColor: 'text-teal-600',
    lightBg: 'bg-teal-50',
    darkLightBg: 'bg-teal-50',
    sidebarActiveBg: 'bg-teal-50 text-teal-700 border-teal-300',
    iconBg: 'bg-teal-100 text-teal-700',
  },
};

export const getChapterTheme = (idOrElement: string): ChapterTheme => {
  if (CHAPTER_THEMES[idOrElement]) return CHAPTER_THEMES[idOrElement];
  const byElement = Object.values(CHAPTER_THEMES).find(t => t.element.toLowerCase() === idOrElement.toLowerCase());
  if (byElement) return byElement;
  const byNumber = Object.values(CHAPTER_THEMES).find(t => `mod-${t.number}` === idOrElement);
  if (byNumber) return byNumber;
  return CHAPTER_THEMES['mod-1'];
};

export const MODULES_DATA: InteractiveModule[] = [
  module1_bk,
  module2_ap,
  module3_sk,
  module4_jki,
  module5_ad,
  module6_dsi,
];

// Initial mock teacher student summaries for analytics (empty by default)
export const INITIAL_STUDENTS_DATA: TeacherStudentSummary[] = [];

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: '',
  name: '',
  nisn: '',
  school: '',
  classGrade: 'SMA',
  avatar: '',
  xp: 0,
  level: 1,
  completedModules: [],
  badges: [],
  savedNotes: [],
  quizHistory: [],
  historyAttempts: [],
  bookmarkedQuestions: []
};

export const INITIAL_TEACHER_PROFILES: TeacherProfile[] = [
  {
    id: 'guru-1789732655854',
    role: 'guru',
    name: 'ULFA NAHDA, S.Pd.',
    nip: '199604132019032006',
    email: 'ulfanahda34@guru.sma.belajar.id',
    password: 'password123',
    school: 'UPTD SMAN 2 BUDONG BUDONG',
    title: 'Guru Pengampu Informatika (SMA)',
    subject: 'Informatika SMA',
    teachingClasses: ['Kelas X-1', 'Kelas X-2', 'Kelas X-3', 'Kelas X-4'],
    avatar: '',
    phone: '',
    lastLogin: 'Baru saja',
    registeredAt: '2026-09-27T02:01:56.577Z',
    savedLocally: true,
  }
];

export const DEMO_STUDENT_PROFILES: StudentProfile[] = [
  {
    ...INITIAL_STUDENT_PROFILE,
    id: 'student-demo-1',
    role: 'siswa',
    name: 'Muhammad Rizki Pratama',
    nisn: '0081234567',
    email: 'rizki.pratama@siswa.belajar.id',
    password: 'password123',
    school: 'SMA Negeri 1 Edukasi',
    classGrade: 'Kelas X-1',
    xp: 650,
    level: 2,
    completedModules: ['mod-1'],
    badges: [
      {
        id: 'badge-1',
        title: 'Penjelajah Algoritma',
        description: 'Tuntas menyelesaikan modul Berpikir Komputasional',
        icon: 'Sparkles',
        earnedDate: '12 Jan 2026'
      }
    ],
    savedNotes: [],
    quizHistory: [],
    historyAttempts: [],
    bookmarkedQuestions: [],
    registeredAt: '2026-01-15T09:30:00.000Z',
    savedLocally: true,
  }
];

