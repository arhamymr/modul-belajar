import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  Video,
  HelpCircle,
  Code2,
  Sparkles,
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  FileText,
  Bookmark,
  Layers,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Clock,
  Flame,
  Search,
  ZoomIn,
  Target,
  Play,
  Download,
  Users,
  Check,
  Zap,
  Info,
  ExternalLink,
  Laptop
} from '../icons/phosphor';
import { UserRole } from '../types';
import { SMA_IMAGES } from '../data/smaImages';

interface GuidePageProps {
  onNavigateTab: (tab: string) => void;
  onOpenAITutor: () => void;
  onStartQuiz: () => void;
  currentRole: UserRole;
}

export const GuidePage: React.FC<GuidePageProps> = ({
  onNavigateTab,
  onOpenAITutor,
  onStartQuiz,
  currentRole,
}) => {
  const [activeCategory, setActiveCategory] = useState<'siswa' | 'guru' | 'faq'>('siswa');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);

  const guideSteps = [
    {
      step: '01',
      title: 'Pilih & Pelajari Modul Pembelajaran',
      desc: 'Buka menu Modul untuk memilih salah satu dari 6 Elemen Capaian Pembelajaran Kurikulum Merdeka (BK, AP, SK, JKI, AD, DSI). Di setiap modul, kamu dapat membaca uraian materi terstruktur, poin kunci, analogi dunia nyata, panduan langkah demi langkah, dan contoh penerapan.',
      tabTarget: 'modules',
      icon: BookOpen,
      color: 'blue',
      badge: 'Langkah 1: Konsep & Teori',
      image: SMA_IMAGES.bab1_bk,
      imageLabel: 'Siswa SMA Mengkaji Logika Komputasi'
    },
    {
      step: '02',
      title: 'Eksperimen di Simulasi Visual & Lab Interaktif',
      desc: 'Setiap modul dilengkapi simulator visual interaktif (seperti visualizer tumpukan Stack & antrean Queue, binary search, gerbang logika, topologi LAN, hingga SQL join visualizer). Kamu juga dapat mengunjungi tab Lab Virtual untuk coding Python dan latihan interaktif.',
      tabTarget: 'lab',
      icon: Code2,
      color: 'purple',
      badge: 'Langkah 2: Praktikum Hands-on',
      image: SMA_IMAGES.bab2_ap,
      imageLabel: 'Praktikum Koding Python & Simulator'
    },
    {
      step: '03',
      title: 'Tonton Video Penjelasan & Pembahasan Materi',
      desc: 'Jika kamu lebih menyukai penjelasan audio-visual, buka menu Video. Tonton rekaman penjelasan materi, ikuti rangkuman materi per sub-bab, dan catat poin penting langsung di fitur Catatan Pribadi.',
      tabTarget: 'videos',
      icon: Video,
      color: 'rose',
      badge: 'Langkah 3: Audio-Visual',
      image: SMA_IMAGES.bab4_jki,
      imageLabel: 'Video & Observasi Jaringan Lab'
    },
    {
      step: '04',
      title: 'Kerjakan Latihan Mandiri & Simulasi Ujian',
      desc: 'Uji tingkat pemahamanmu melalui menu Latihan & Ujian. Soal dirancang sesuai standar AKM, Bebras, dan soal penalaran komputasi SMA. Setelah selesai, sistem otomatis menampilkan skor diagnostik, analisis kekuatan, dan rekomendasi remedial.',
      tabTarget: 'quiz',
      icon: HelpCircle,
      color: 'emerald',
      badge: 'Langkah 4: Evaluasi Otomatis',
      image: SMA_IMAGES.bab5_ad,
      imageLabel: 'Analisis Hasil & Kuis Mandiri'
    },
    {
      step: '05',
      title: 'Tanya Jawab dengan Tutor AI Informatika',
      desc: 'Menemukan bagian materi atau soal yang membingungkan? Klik tombol Tutor AI kapan saja. AI ini dilatih khusus kurikulum Informatika SMA untuk memberikan petunjuk konseptual bertahap tanpa langsung membocorkan jawaban.',
      action: onOpenAITutor,
      icon: Sparkles,
      color: 'amber',
      badge: 'Langkah 5: Bimbingan Cerdas',
      image: SMA_IMAGES.bab6_dsi,
      imageLabel: 'Konsultasi Bersama Tutor AI'
    },
    {
      step: '06',
      title: 'Kumpulkan XP & Dapatkan Sertifikat Kelulusan',
      desc: 'Dapatkan poin pengalaman (XP) setiap kali kamu membaca modul, menyelesaikan simulasi, membuat catatan, dan lulus latihan soal. Saat seluruh modul tuntas, kamu berhak mengunduh Sertifikat Kelulusan Digital resmi!',
      tabTarget: 'modules',
      icon: Award,
      color: 'indigo',
      badge: 'Langkah 6: Sertifikasi Resmi',
      image: SMA_IMAGES.hero,
      imageLabel: 'Kelulusan 6 Elemen CP Informatika'
    }
  ];

  const teacherFeatures = [
    {
      title: 'Pemantauan Ketuntasan Belajar Siswa (Real-time)',
      desc: 'Pantau daftar seluruh siswa, status penyelesaian setiap modul, nilai rata-rata kuis, dan tanggal aktivitas terakhir secara otomatis.',
      icon: GraduationCap,
      color: 'purple',
      image: SMA_IMAGES.bab5_ad_alt,
      imageCaption: 'Rekapitulasi Nilai & Kemajuan Siswa'
    },
    {
      title: 'Manajemen Akun Siswa & Data Nilai',
      desc: 'Tambah akun siswa baru, perbarui data NISN/kelas, ekspor dan impor basis data, serta sinkronisasi data kelas ke cloud storage.',
      icon: UserCheck,
      color: 'blue',
      image: SMA_IMAGES.bab3_hardware_students,
      imageCaption: 'Manajemen Kelas & Data Peserta Didik'
    },
    {
      title: 'Alat Analisis Pembelajaran & Pembahasan Soal',
      desc: 'Gunakan Tutor AI guru untuk menyusun rencana pembelajaran, membuat butir soal adaptif baru, serta menganalisis materi yang masih menjadi kendala siswa.',
      icon: Sparkles,
      color: 'amber',
      image: SMA_IMAGES.bab6_ethics_students,
      imageCaption: 'Perumusan Soal & Rencana Pembelajaran'
    },
    {
      title: 'Mode Transisi Cepat Siswa / Guru',
      desc: 'Pendidik dapat berpindah ke tampilan siswa kapan saja untuk memvalidasi bahan tayang, simulator lab, dan butir evaluasi kuis.',
      icon: ShieldCheck,
      color: 'emerald',
      image: SMA_IMAGES.bab1_bk_alt,
      imageCaption: 'Validasi Bahan Ajar Siswa SMA'
    }
  ];

  const faqs = [
    {
      q: 'Apakah e-modul ini gratis dan bisa diakses lewat smartphone?',
      a: 'Ya, seluruh modul, latihan interaktif, video, dan simulator virtual sepenuhnya gratis dan dirancang responsif agar nyaman dibuka melalui laptop, tablet, maupun smartphone.',
      icon: Laptop
    },
    {
      q: 'Bagaimana cara beralih antara akun Siswa dan Guru?',
      a: 'Klik menu profil di sudut kanan atas header, lalu pilih opsi "Ganti / Masuk Akun". Kamu dapat memilih masuk sebagai Siswa atau Guru, atau login tamu secara instan.',
      icon: UserCheck
    },
    {
      q: 'Apakah catatan pribadi saya akan tersimpan jika browser ditutup?',
      a: 'Ya, catatan belajar dan progres ketuntasan modul disimpan secara persisten di penyimpanan browser lokal dan tersinkronisasi dengan database internal.',
      icon: Bookmark
    },
    {
      q: 'Bagaimana syarat mendapatkan Sertifikat Kelulusan E-Modul?',
      a: 'Selesaikan minimal modul materi dan kerjakan simulasi kuis dengan nilai ketuntasan minimal (KKM). Setelah itu, tombol Sertifikat di header akan aktif dan dapat diunduh.',
      icon: Award
    },
    {
      q: 'Apa yang harus dilakukan jika saya kesulitan memahami suatu kode Python atau konsep jaringan?',
      a: 'Gunakan fitur Tutor AI Informatika di pojok kanan atas atau di dalam modul. Kamu juga dapat membuka tab Lab Virtual untuk menguji coba kode secara langsung step-by-step.',
      icon: Sparkles
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* Hero Welcome Panduan dengan Foto & Ilustrasi Siswa SMA */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 lg:p-10 shadow-lg">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Pusat Panduan & Petunjuk Pembelajaran</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Panduan Lengkap Menggunakan E-Modul Informatika SMA
            </h1>

            <p className="text-blue-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Panduan interaktif bergambar ini membantu siswa dan pendidik menguasai 6 Elemen Capaian Pembelajaran Kurikulum Merdeka (BK, AP, SK, JKI, AD, DSI), memanfaatkan laboratorium virtual simulator, video penjelasan, evaluasi otomatis, hingga bimbingan Tutor AI 24/7.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('modules')}
                className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Mulai Belajar Bab 1</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>

              <button
                onClick={onOpenAITutor}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-xs flex items-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Konsultasi Tutor AI</span>
              </button>

              <button
                onClick={onStartQuiz}
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-xs flex items-center space-x-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-emerald-300" />
                <span>Simulasi Ujian</span>
              </button>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5">
            <div 
              onClick={() => setSelectedPreviewImage(SMA_IMAGES.hero)}
              className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-slate-900 group cursor-pointer"
            >
              <img
                src={SMA_IMAGES.hero}
                alt="Foto Siswa-Siswi SMA Belajar di Laboratorium Komputer"
                className="w-full h-56 sm:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>Dokumentasi Siswa SMA</span>
                  </span>
                  <span className="text-[10px] font-semibold text-white/95 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20 flex items-center space-x-1">
                    <ZoomIn className="w-3 h-3" />
                    <span>Klik Perbesar</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Pembelajaran Aktif Siswa-Siswi SMA
                </p>
                <p className="text-[11px] text-slate-300 line-clamp-1">
                  Praktikum Laboratorium Komputer Kurikulum Merdeka
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Category Tab Switcher with Icons */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveCategory('siswa')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeCategory === 'siswa'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Alur Belajar Siswa</span>
          </button>

          <button
            onClick={() => setActiveCategory('guru')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeCategory === 'guru'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Panduan Pendidik / Guru</span>
          </button>

          <button
            onClick={() => setActiveCategory('faq')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
              activeCategory === 'faq'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Tanya Jawab (FAQ)</span>
          </button>
        </div>

        <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>Peran aktif: <strong className="text-slate-800 uppercase">{currentRole}</strong></span>
        </div>
      </div>

      {/* SECTION 1: ALUR BELAJAR SISWA BERGAMBAR & BERIKON */}
      {activeCategory === 'siswa' && (
        <div className="space-y-6">
          <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-5 flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Lightbulb className="w-5 h-5 text-amber-300" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-sky-950 flex items-center space-x-2">
                <span>Alur Belajar Ideal Siswa SMA (Step-by-Step)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  6 Langkah Sukses
                </span>
              </h3>
              <p className="text-xs text-sky-800 leading-relaxed">
                Setiap kartu di bawah dilengkapi foto panduan aktivitas praktikum di lab, ikon fungsi, penjelasan target pemahaman, serta tombol aksi cepat untuk langsung membuka fitur terkait di e-modul.
              </p>
            </div>
          </div>

          {/* Step Cards with Visual Photo + Icon */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideSteps.map((stepItem, idx) => {
              const IconComp = stepItem.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Photo Header Card */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={stepItem.image}
                      alt={stepItem.imageLabel}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-between p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                          Langkah {stepItem.step}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-xs border border-white/20">
                          {stepItem.badge}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-white text-[11px]">
                        <span className="font-semibold drop-shadow-md flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{stepItem.imageLabel}</span>
                        </span>
                        <button
                          onClick={() => setSelectedPreviewImage(stepItem.image)}
                          className="p-1 rounded-md bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                          title="Perbesar Foto"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {stepItem.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {stepItem.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      {stepItem.tabTarget ? (
                        <button
                          onClick={() => onNavigateTab(stepItem.tabTarget!)}
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white border border-slate-200 hover:border-blue-600 text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xs"
                        >
                          <span>Buka Menu {stepItem.title.split(' ')[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={stepItem.action}
                          className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-white border border-amber-200 hover:border-amber-500 text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Buka Tutor AI Sekarang</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Alur Belajar Terstruktur 6 Elemen Informatika Siswa SMA */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  <span>Capaian Pembelajaran (CP) Terpadu</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Peta Alur 6 Elemen Kurikulum Merdeka
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Struktur kompetensi berurutan dari logika fondasi, penerapan pemrograman, arsitektur perangkat keras, jaringan komputer, data, hingga etika digital.
                </p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => onNavigateTab('modules')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Jelajahi Modul</span>
                </button>
              </div>
            </div>

            {/* Natural Classroom Photo Showcase */}
            <div 
              onClick={() => setSelectedPreviewImage(SMA_IMAGES.bab2_coding_students)}
              className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 cursor-pointer group shadow-sm"
            >
              <img
                src={SMA_IMAGES.bab2_coding_students}
                alt="Dokumentasi Siswa-Siswi SMA Belajar Pemrograman di Laboratorium Komputer"
                className="w-full h-auto max-h-[380px] object-cover object-center transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Dokumentasi Praktikum Siswa SMA</span>
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Aktivitas Pembelajaran Kolaboratif di Laboratorium Komputer
                    </h4>
                  </div>

                  <span className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold border border-white/25 flex items-center space-x-1.5 transition-colors">
                    <ZoomIn className="w-4 h-4 text-white" />
                    <span>Perbesar Foto</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 6 Clean Element Navigation Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
              {[
                { tag: 'Bab 1 • BK', label: 'Berpikir Komputasional', id: 'mod-1', bg: 'bg-blue-50 border-blue-200 text-blue-900', badgeBg: 'bg-blue-600 text-white' },
                { tag: 'Bab 2 • AP', label: 'Algoritma & Pemrograman', id: 'mod-2', bg: 'bg-emerald-50 border-emerald-200 text-emerald-900', badgeBg: 'bg-emerald-600 text-white' },
                { tag: 'Bab 3 • SK', label: 'Sistem Komputer', id: 'mod-3', bg: 'bg-amber-50 border-amber-200 text-amber-900', badgeBg: 'bg-amber-600 text-white' },
                { tag: 'Bab 4 • JKI', label: 'Jaringan & Internet', id: 'mod-4', bg: 'bg-sky-50 border-sky-200 text-sky-900', badgeBg: 'bg-sky-600 text-white' },
                { tag: 'Bab 5 • AD', label: 'Analisis Data', id: 'mod-5', bg: 'bg-purple-50 border-purple-200 text-purple-900', badgeBg: 'bg-purple-600 text-white' },
                { tag: 'Bab 6 • DSI', label: 'Dampak Sosial Informatika', id: 'mod-6', bg: 'bg-rose-50 border-rose-200 text-rose-900', badgeBg: 'bg-rose-600 text-white' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigateTab('modules')}
                  className={`p-3.5 rounded-xl border ${item.bg} text-left hover:shadow-xs transition-all cursor-pointer space-y-1.5`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${item.badgeBg}`}>
                    {item.tag}
                  </span>
                  <span className="text-xs font-bold leading-snug block line-clamp-2">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Fitur Utama Siswa Highlights dengan Ikon & Visual Tambahan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Instrumen & Fasilitas Pendukung Belajar Siswa</span>
              </h3>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Tersedia di Seluruh Modul
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2 hover:bg-blue-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Bookmark className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                  Catatan Pribadi Siswa
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Tulis rangkuman langsung saat membaca materi atau menyimak video, tersimpan otomatis per modul belajar.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2 hover:bg-emerald-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ZoomIn className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                  Galeri Diagram HD
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Setiap infografis alur kerja dan foto praktikum dapat diperbesar dengan zoom dan penjelasan akademis.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2 hover:bg-amber-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                  Gamifikasi XP & Level
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Raih poin XP dari membaca materi, interaksi simulasi, dan nilai kuis untuk menaikkan level prestasi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 space-y-2 hover:bg-purple-50 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">
                  Sertifikat Kelulusan
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Sertifikat kelulusan digital resmi dengan kode verifikasi unik setelah menuntaskan seluruh 6 elemen materi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PANDUAN PENDIDIK / GURU BERGAMBAR */}
      {activeCategory === 'guru' && (
        <div className="space-y-6">
          <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-5 flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-purple-950 flex items-center space-x-2">
                <span>Portal Fasilitator & Pendidik Informatika</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-900">
                  Panduan Guru
                </span>
              </h3>
              <p className="text-xs text-purple-800 leading-relaxed">
                Guru dapat memanfaatkan e-modul ini sebagai media pembelajaran utama, suplemen intrakurikuler Kurikulum Merdeka, serta instrumen asesmen diagnostik & sumatif terotomasi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teacherFeatures.map((feat, fIdx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={fIdx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Photo Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={feat.image}
                      alt={feat.imageCaption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-between p-3.5">
                      <span className="self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white shadow-xs">
                        Fitur Guru #{fIdx + 1}
                      </span>
                      <span className="text-xs font-semibold text-white drop-shadow-md flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-300" />
                        <span>{feat.imageCaption}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-13">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1 text-center sm:text-left flex items-center space-x-3">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Kelola Kelas di Dashboard Guru</h4>
                <p className="text-xs text-slate-500">
                  Pantau ketuntasan KKTP, rekapitulasi nilai rapor Excel, dan kelola data akun peserta didik.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('teacher')}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Menuju Dashboard Guru</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: FAQ BERIKON */}
      {activeCategory === 'faq' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari pertanyaan seputar penggunaan e-modul, sertifikat, atau kuis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faqItem, fIdx) => {
              const isOpen = activeFaq === fIdx;
              const IconFaq = faqItem.icon || HelpCircle;
              return (
                <div
                  key={fIdx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 border border-indigo-100">
                        <IconFaq className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {faqItem.q}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-90 text-indigo-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pl-15">
                      {faqItem.a}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6 text-slate-500 text-xs">
                Tidak ada pertanyaan yang sesuai dengan kata kunci pencarian.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Preview Modal for Guide Photos */}
      {selectedPreviewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedPreviewImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPreviewImage}
              alt="Preview Dokumentasi Panduan Siswa SMA"
              className="w-full max-h-[75vh] object-contain mx-auto"
            />
            <div className="p-4 bg-slate-900/95 flex items-center justify-between text-white border-t border-white/10">
              <span className="text-xs font-semibold">
                Dokumentasi Pembelajaran Praktikum Informatika Siswa SMA
              </span>
              <button
                onClick={() => setSelectedPreviewImage(null)}
                className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-bold transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
