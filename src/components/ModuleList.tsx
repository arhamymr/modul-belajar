import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BrainCircuit, 
  Code2, 
  Cpu, 
  Network, 
  Database, 
  ShieldAlert, 
  Search,
  Filter,
  Flame,
  Layers,
  Compass
} from '../icons/phosphor';
import { InteractiveModule, StudentProfile, InformaticsElement } from '../types';
import { MODULES_DATA, INFORMATICS_ELEMENTS, getChapterTheme } from '../data/curriculumData';
import { SMA_IMAGES } from '../data/smaImages';

interface ModuleListProps {
  modules?: InteractiveModule[];
  student: StudentProfile;
  onSelectModule: (moduleId: string) => void;
  onStartQuiz: (moduleId?: string) => void;
  onWatchVideo: (moduleId: string) => void;
  onOpenAITutor: () => void;
  onOpenGuide?: () => void;
}

export const ModuleList: React.FC<ModuleListProps> = ({
  modules = MODULES_DATA,
  student,
  onSelectModule,
  onStartQuiz,
  onWatchVideo,
  onOpenAITutor,
  onOpenGuide,
}) => {
  const [selectedElement, setSelectedElement] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
      case 'BrainCircuit': 
        return <BrainCircuit className="w-6 h-6 text-blue-600" weight="duotone" />;
      case 'Code':
      case 'Code2': 
        return <Code2 className="w-6 h-6 text-emerald-600" weight="duotone" />;
      case 'Cpu': 
        return <Cpu className="w-6 h-6 text-purple-600" weight="duotone" />;
      case 'Network':
      case 'ShareNetwork': 
        return <Network className="w-6 h-6 text-amber-600" weight="duotone" />;
      case 'Database': 
        return <Database className="w-6 h-6 text-pink-600" weight="duotone" />;
      case 'ShieldAlert':
      case 'ShieldCheck': 
        return <ShieldAlert className="w-6 h-6 text-teal-600" weight="duotone" />;
      default: 
        return <BookOpen className="w-6 h-6 text-blue-600" weight="duotone" />;
    }
  };

  const filteredModules = modules.filter(m => {
    const matchElement = selectedElement === 'ALL' || m.element === selectedElement;
    const matchSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchElement && matchSearch;
  });

  const completedCount = student.completedModules.length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner with SMA Students Photo */}
      <div className="relative overflow-hidden rounded-3xl bg-white text-slate-900 p-6 sm:p-8 shadow-xs border border-slate-200">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Media Pembelajaran Interaktif Siswa SMA</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              E-Modul Informatika SMA
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Kuasai 6 Elemen Capaian Pembelajaran Informatika Kurikulum Merdeka (BK, AP, SK, JKI, AD, DSI) lengkap dengan bahan bacaan terstruktur, simulasi visual interaktif, latihan soal Bebras & AKM, serta evaluasi otomatis untuk siswa SMA.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="hero-start-learning-btn"
                onClick={() => onSelectModule('mod-1')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Mulai Belajar Bab 1</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-open-exam-btn"
                onClick={() => onStartQuiz()}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs flex items-center space-x-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>Simulasi Ujian Akhir</span>
              </button>

              <button
                id="hero-ai-tutor-btn"
                onClick={onOpenAITutor}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs flex items-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Konsultasi AI Tutor</span>
              </button>

              {onOpenGuide && (
                <button
                  id="hero-guide-btn"
                  onClick={onOpenGuide}
                  className="px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold transition-all shadow-2xs flex items-center space-x-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <span>Panduan Penggunaan</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2.5">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium mb-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>XP Siswa</span>
                </div>
                <div className="text-base font-extrabold text-amber-600">{student.xp} XP</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ketuntasan</span>
                </div>
                <div className="text-base font-extrabold text-emerald-600">{progressPercent}% ({completedCount}/{modules.length} Bab)</div>
              </div>
            </div>
          </div>

          {/* Right: Foto Anak SMA di Beranda */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 group">
              <img
                src={SMA_IMAGES.hero}
                alt="Foto Siswa-Siswi SMA Belajar Informatika di Laboratorium Komputer"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                    <span>Siswa-Siswi SMA</span>
                  </span>
                  <span className="text-[10px] font-semibold text-white/90 bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/20">
                    Lab Informatika Sekolah
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Pembelajaran Aktif Siswa-Siswi SMA
                </p>
                <p className="text-[11px] text-slate-300 line-clamp-1">
                  Laboratorium Komputer Informatika Kurikulum Merdeka
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Element Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              id="filter-all"
              onClick={() => setSelectedElement('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedElement === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Semua Elemen ({modules.length})
            </button>

            {Object.entries(INFORMATICS_ELEMENTS).map(([key, info]) => {
              const theme = getChapterTheme(key);
              const isActive = selectedElement === key;
              return (
                <button
                  key={key}
                  id={`filter-${key}`}
                  onClick={() => setSelectedElement(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
                    isActive
                      ? `${theme.buttonBg} text-white shadow-xs`
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>Bab {theme.number}: {info.code}</span>
                  <span className="hidden sm:inline font-normal text-[11px] opacity-90">({theme.colorName.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari topik modul, materi, kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Module Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => {
          const isCompleted = student.completedModules.includes(module.id);
          const elementInfo = INFORMATICS_ELEMENTS[module.element];
          const chapterTheme = getChapterTheme(module.id);

          return (
            <div
              key={module.id}
              id={`module-card-${module.id}`}
              className={`group bg-white rounded-2xl border ${chapterTheme.cardTopBorder} border-slate-200 ${chapterTheme.cardHoverBorder} transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden`}
            >
              {/* Card Media Preview Header */}
              {module.coverImage && (
                <div 
                  onClick={() => onSelectModule(module.id)}
                  className="relative h-36 w-full overflow-hidden bg-slate-100 cursor-pointer group-hover:opacity-95 transition-opacity"
                >
                  <img
                    src={module.coverImage}
                    alt={module.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/40 flex flex-col justify-between p-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs ${chapterTheme.badgeBg}`}>
                        Bab {module.number} • {module.element}
                      </span>
                      {isCompleted ? (
                        <span className="flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Tuntas</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-800 bg-white/95 px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                          Praktikum Siswa SMA
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-white">
                      <span className="font-semibold text-white text-[11px] drop-shadow-md flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>Foto Siswa SMA Bab {module.number}</span>
                      </span>
                      {module.galleryImages && module.galleryImages.length > 0 && (
                        <span className="text-[10px] font-bold bg-white/95 px-2 py-0.5 rounded-md text-slate-800 border border-slate-200 shadow-2xs">
                          {module.galleryImages.length} Visual & Diagram
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3">
                {!module.coverImage && (
                  /* Header Card Meta fallback when no image */
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${chapterTheme.lightBg} border border-slate-200`}>
                        {getModuleIcon(module.iconName)}
                      </div>
                      <div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${chapterTheme.badgeBg}`}>
                          Bab {module.number} • {module.element}
                        </span>
                        <div className="text-xs font-semibold text-slate-700 mt-0.5">
                          {elementInfo.name}
                        </div>
                      </div>
                    </div>

                    {isCompleted ? (
                      <span className="flex items-center space-x-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tuntas</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-600 font-medium">Belum Tuntas</span>
                    )}
                  </div>
                )}

                <div>
                  <h3 
                    onClick={() => onSelectModule(module.id)}
                    className={`text-base font-bold text-slate-900 group-hover:${chapterTheme.textColor} transition-colors cursor-pointer line-clamp-2`}
                  >
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {module.summary}
                  </p>
                </div>

                {/* Metadata Pills */}
                <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{module.estimatedMinutes} Menit</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{module.questions.length} Soal</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  id={`card-quiz-btn-${module.id}`}
                  onClick={() => onStartQuiz(module.id)}
                  className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-xs font-medium transition-colors flex items-center space-x-1.5"
                  title="Kerjakan Latihan Soal Mandiri"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Latihan Soal</span>
                </button>

                <button
                  id={`card-read-btn-${module.id}`}
                  onClick={() => onSelectModule(module.id)}
                  className={`px-3.5 py-1.5 rounded-lg ${chapterTheme.buttonBg} ${chapterTheme.buttonHover} text-white text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-xs`}
                >
                  <span>Buka Bab {module.number}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
