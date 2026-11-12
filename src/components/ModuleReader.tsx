import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { 
  ArrowLeft, 
  BookOpen, 
  Video, 
  HelpCircle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  Play, 
  Share2, 
  Bookmark, 
  FileText, 
  Plus, 
  Trash2,
  Code2,
  Cpu,
  ChevronRight,
  ListOrdered,
  Image as ImageIcon,
  ZoomIn,
  Layers,
  ExternalLink,
  Tag,
  Info,
  Lightbulb,
  AlertTriangle,
  GraduationCap,
  Compass,
  ListChecks,
  Target
} from '../icons/phosphor';
import { InteractiveModule, StudentProfile, ModuleImage } from '../types';
import { INFORMATICS_ELEMENTS, getChapterTheme } from '../data/curriculumData';
import { ImageViewerModal } from './ImageViewerModal';
import { ModuleVisualSimulator, SimulationType } from './ModuleVisualSimulator';
import { DiagramSimulationViewer } from './DiagramSimulationViewer';

interface ModuleReaderProps {
  moduleItem: InteractiveModule;
  student: StudentProfile;
  onCompleteModule: (moduleId: string) => void;
  onStartQuiz: (moduleId: string) => void;
  onWatchVideo: (moduleId: string) => void;
  onSaveNote: (note: { id: string; moduleId: string; title: string; text: string; date: string; imageUrl?: string; timestamp?: number }) => void;
  onDeleteNote: (noteId: string) => void;
  onOpenAITutorWithModule: (moduleItem: InteractiveModule) => void;
  onBackToCatalog: () => void;
  onAddXP?: (amount: number, reason: string) => void;
}

export const ModuleReader: React.FC<ModuleReaderProps> = ({
  moduleItem,
  student,
  onCompleteModule,
  onStartQuiz,
  onWatchVideo,
  onSaveNote,
  onDeleteNote,
  onOpenAITutorWithModule,
  onBackToCatalog,
  onAddXP,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(moduleItem.sections[0]?.id || '');
  const [readerTab, setReaderTab] = useState<'reading' | 'simulation' | 'gallery'>('reading');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Lightbox modal state
  const [lightboxData, setLightboxData] = useState<{ images: ModuleImage[]; initialIndex: number } | null>(null);

  // In-reader personal note form
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteImageUrl, setNoteImageUrl] = useState<string>('');
  const [showImageAttachmentInput, setShowImageAttachmentInput] = useState<boolean>(false);

  const isCompleted = student.completedModules.includes(moduleItem.id);
  const elementInfo = INFORMATICS_ELEMENTS[moduleItem.element] || INFORMATICS_ELEMENTS.BK;
  const chapterTheme = getChapterTheme(moduleItem.id);

  // Aggregate all images in this module for the gallery
  const allModuleImages: ModuleImage[] = React.useMemo(() => {
    const images: ModuleImage[] = [];
    if (moduleItem.galleryImages && moduleItem.galleryImages.length > 0) {
      images.push(...moduleItem.galleryImages);
    }
    moduleItem.sections.forEach(sec => {
      if (sec.images && sec.images.length > 0) {
        sec.images.forEach(img => {
          if (!images.some(existing => existing.id === img.id || existing.url === img.url)) {
            images.push(img);
          }
        });
      }
    });
    return images;
  }, [moduleItem]);

  useEffect(() => {
    if (moduleItem.sections[0]) {
      setActiveSectionId(moduleItem.sections[0].id);
    }
  }, [moduleItem]);

  // Web Speech API for Indonesian audio narration
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const activeSec = moduleItem.sections.find(s => s.id === activeSectionId) || moduleItem.sections[0];
      const textToRead = `${activeSec.title}. ${activeSec.content.replace(/[#*`]/g, '')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    onSaveNote({
      id: `note-${Date.now()}`,
      moduleId: moduleItem.id,
      title: noteTitle.trim() || `Catatan: ${moduleItem.title}`,
      text: noteContent.trim(),
      imageUrl: noteImageUrl.trim() || undefined,
      date: new Date().toLocaleDateString('id-ID'),
    });

    setNoteTitle('');
    setNoteContent('');
    setNoteImageUrl('');
    setShowImageAttachmentInput(false);
  };

  const openLightboxWithImage = (image: ModuleImage, imageList?: ModuleImage[]) => {
    const list = imageList || allModuleImages;
    const index = Math.max(0, list.findIndex(img => img.id === image.id || img.url === image.url));
    setLightboxData({
      images: list.length > 0 ? list : [image],
      initialIndex: index >= 0 ? index : 0
    });
  };

  const moduleNotes = student.savedNotes.filter(n => n.moduleId === moduleItem.id);
  const activeSection = moduleItem.sections.find(s => s.id === activeSectionId) || moduleItem.sections[0];

  return (
    <div className="space-y-6">
      {/* Lightbox Modal for Zooming Images */}
      {lightboxData && (
        <ImageViewerModal
          images={lightboxData.images}
          initialIndex={lightboxData.initialIndex}
          onClose={() => setLightboxData(null)}
        />
      )}

      {/* Top Breadcrumb & Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            id="reader-back-btn"
            onClick={onBackToCatalog}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-semibold hidden sm:inline">Katalog Modul</span>
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${chapterTheme.badgeBg}`}>
                Bab {chapterTheme.number} • {moduleItem.element}
              </span>
              <span className="text-xs text-slate-600 font-medium">Tema: {chapterTheme.colorName}</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
              {moduleItem.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Gallery View Trigger Button */}
          {allModuleImages.length > 0 && (
            <button
              id="reader-open-gallery-btn"
              onClick={() => setLightboxData({ images: allModuleImages, initialIndex: 0 })}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 transition-colors flex items-center space-x-1.5"
              title="Lihat semua ilustrasi dan diagram modul ini"
            >
              <ImageIcon className="w-3.5 h-3.5 text-sky-600" />
              <span>Galeri Diagram ({allModuleImages.length})</span>
            </button>
          )}

          {/* TTS Narration */}
          <button
            id="reader-tts-btn"
            onClick={toggleSpeech}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
              isSpeaking
                ? 'bg-amber-100 border-amber-300 text-amber-800 animate-pulse'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Dengarkan narasi suara bahasa Indonesia"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? 'Hentikan Suara' : 'Narasi Audio'}</span>
          </button>

          {/* AI Tutor Contextual Helper */}
          <button
            id="reader-ai-tutor-btn"
            onClick={() => onOpenAITutorWithModule(moduleItem)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Diskusi AI</span>
          </button>

          {/* Mark Complete Button */}
          <button
            id="reader-mark-complete-btn"
            onClick={() => onCompleteModule(moduleItem.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isCompleted ? 'Sudah Tuntas (+100 XP)' : 'Tandai Tuntas'}</span>
          </button>
        </div>
      </div>

      {/* Module Header Banner with SMA Students Photo & Overview */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-xs grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-xs ${chapterTheme.badgeBg}`}>
                Bab {moduleItem.number} • {moduleItem.element}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                ⏱️ {moduleItem.estimatedMinutes} Menit Pembelajaran
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                🖼️ {allModuleImages.length} Visual & Diagram
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
              {moduleItem.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
              {moduleItem.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-blue-700">{elementInfo.fullName}</span>
            <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-bold text-[11px] border border-blue-200">
              Informatika SMA • Kurikulum Merdeka
            </span>
          </div>
        </div>

        {/* Right Column: Foto Siswa SMA Bab Ini */}
        {moduleItem.coverImage && (
          <div className="lg:col-span-5 relative min-h-[220px] bg-slate-900 overflow-hidden group">
            <img
              src={moduleItem.coverImage}
              alt={`Foto Siswa SMA Belajar Bab ${moduleItem.number}: ${moduleItem.title}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/20 flex flex-col justify-end p-4 sm:p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                  <span>Foto Siswa SMA</span>
                </span>
                <button
                  onClick={() => openLightboxWithImage({
                    id: `cover-img-${moduleItem.id}`,
                    url: moduleItem.coverImage!,
                    caption: `Aktivitas Belajar Siswa SMA: Bab ${moduleItem.number} - ${moduleItem.title} (${moduleItem.element})`,
                    alt: `Foto Siswa SMA Belajar Bab ${moduleItem.number}`
                  }, allModuleImages)}
                  className="px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold backdrop-blur-xs flex items-center space-x-1 cursor-pointer transition-colors"
                >
                  <ZoomIn className="w-3 h-3" />
                  <span>Perbesar</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                Aktivitas Belajar Siswa SMA Bab {moduleItem.number}
              </p>
              <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                Dokumentasi Pembelajaran Informatika SMA
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Left TOC / Sections & Right Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Table of Contents & Learning Objectives */}
        <div className="lg:col-span-4 space-y-6">
          {/* Section Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <ListOrdered className="w-4 h-4 text-blue-600" />
              <span>Daftar Sub-Bab Materi</span>
            </h3>

            <div className="space-y-1.5">
              {moduleItem.sections.map((sec, idx) => {
                const isActive = sec.id === activeSectionId;
                const hasImages = sec.images && sec.images.length > 0;
                return (
                  <button
                    key={sec.id}
                    id={`toc-section-${idx}`}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-blue-50 border border-blue-200 text-blue-700 shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate pr-2">
                      <span className="line-clamp-1">{sec.title}</span>
                      {hasImages && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-100 text-sky-700 shrink-0">
                          {sec.images?.length} 🖼️
                        </span>
                      )}
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Module Diagram & Praktikum Gallery Widget */}
          {allModuleImages.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <ImageIcon className="w-4 h-4 text-sky-600" />
                  <span>Galeri Praktikum & Diagram ({allModuleImages.length})</span>
                </h3>
                <button
                  onClick={() => setLightboxData({ images: allModuleImages, initialIndex: 0 })}
                  className="text-[11px] font-semibold text-blue-600 hover:underline"
                >
                  Buka Semua
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {allModuleImages.slice(0, 4).map((img, iIdx) => (
                  <div
                    key={img.id || iIdx}
                    onClick={() => openLightboxWithImage(img, allModuleImages)}
                    className="group relative h-20 rounded-xl overflow-hidden border border-slate-200 cursor-pointer bg-slate-100"
                    title={img.caption}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || img.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 text-center">
                Foto aktivitas praktikum siswa SMA & diagram materi (Klik untuk perbesar)
              </p>
            </div>
          )}

          {/* Learning Objectives (Tujuan Pembelajaran Kurikulum Merdeka) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Tujuan Pembelajaran (TP)</span>
            </h3>

            <ul className="space-y-2 text-xs text-slate-700">
              {moduleItem.learningObjectives.map((obj, oIdx) => (
                <li key={oIdx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions Card (Quiz jump) */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Uji Pemahaman Modul
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Uji pemahaman Anda terhadap konsep bab ini dengan latihan soal evaluasi berpenilaian otomatis.
            </p>

            <div className="pt-1">
              <button
                id="reader-start-quiz-btn"
                onClick={() => onStartQuiz(moduleItem.id)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-colors shadow-md"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Kerjakan Latihan Soal Modul</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Main Section Reading Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Reader View Mode Tabs (Materi vs Simulasi Visual vs Galeri Diagram) */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center space-x-1">
              <button
                id="reader-tab-reading"
                onClick={() => setReaderTab('reading')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  readerTab === 'reading'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Materi & Diagram</span>
              </button>

              <button
                id="reader-tab-simulation"
                onClick={() => setReaderTab('simulation')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 relative ${
                  readerTab === 'simulation'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Simulasi Visual Interaktif</span>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-400 text-slate-950 uppercase">
                  Lab
                </span>
              </button>

              {allModuleImages.length > 0 && (
                <button
                  id="reader-tab-gallery"
                  onClick={() => setReaderTab('gallery')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                    readerTab === 'gallery'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Galeri Diagram ({allModuleImages.length})</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 px-2">
              <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                Elemen {moduleItem.element} • {elementInfo.name}
              </span>
            </div>
          </div>

          {/* TAB 1: READING & IN-LINE SIMULATION CONTENT */}
          {readerTab === 'reading' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                {/* Section Heading with Element Badge */}
                <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {activeSection?.title}
                  </h2>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    Materi Inti • Kurikulum Merdeka
                  </span>
                </div>

                {/* KEY LEARNING POINTS (Poin Kunci & Target Pemahaman) */}
                {activeSection?.keyPoints && activeSection.keyPoints.length > 0 && (
                  <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2.5">
                    <div className="flex items-center space-x-2 text-sky-800 font-bold text-xs uppercase tracking-wider">
                      <Target className="w-4 h-4 text-sky-600" />
                      <span>Poin Kunci & Target Pemahaman Konsep</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {activeSection.keyPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start space-x-2 bg-white/70 p-2.5 rounded-xl border border-sky-100">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Visual Aktivitas Siswa SMA Bab ini */}
                {moduleItem.coverImage && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs">
                    <div 
                      className="relative h-48 sm:h-60 overflow-hidden group cursor-pointer"
                      onClick={() => openLightboxWithImage({
                        id: `section-sma-${moduleItem.id}`,
                        url: moduleItem.coverImage!,
                        caption: `Dokumentasi Aktivitas Siswa SMA: Bab ${moduleItem.number} - ${moduleItem.title}`,
                        alt: `Foto Siswa SMA Belajar ${moduleItem.title}`
                      }, allModuleImages)}
                    >
                      <img
                        src={moduleItem.coverImage}
                        alt={`Foto Siswa SMA Belajar ${moduleItem.title}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30 flex items-end justify-between p-4">
                        <div className="text-white">
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold shadow-xs mb-1">
                            <span>Dokumentasi Pembelajaran Siswa SMA</span>
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-white/95">
                            Aktivitas Belajar Bab {moduleItem.number}: {moduleItem.title}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-xs text-white text-[11px] font-medium flex items-center space-x-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Klik Zoom</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Markdown-styled Content Body */}
                <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-4">
                  <div className="markdown-body">
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{activeSection?.content}</Markdown>
                  </div>
                </div>

                {/* REAL WORLD ANALOGY (Analogi Dunia Nyata yang Membumi) */}
                {activeSection?.realWorldAnalogy && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                    <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Analogi Dunia Nyata: {activeSection.realWorldAnalogy.title}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white/60 p-3 sm:p-3.5 rounded-xl border border-amber-100/80">
                      "{activeSection.realWorldAnalogy.story}"
                    </p>
                    <div className="p-3 rounded-xl bg-white/80 border border-amber-200 text-xs font-semibold text-amber-900 flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <span><strong>Kesimpulan Komputasi:</strong> {activeSection.realWorldAnalogy.takeaway}</span>
                    </div>
                  </div>
                )}

                {/* STEP-BY-STEP CONCEPTUAL / ALGORITHMIC GUIDE */}
                {activeSection?.stepByStepGuide && activeSection.stepByStepGuide.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <ListChecks className="w-4 h-4 text-emerald-600" />
                      <span>Panduan Prosedur Langkah Demi Langkah</span>
                    </div>
                    <div className="space-y-2">
                      {activeSection.stepByStepGuide.map((st) => (
                        <div key={st.step} className="flex items-start space-x-3 bg-white/80 p-3 rounded-xl border border-emerald-100 text-xs">
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            {st.step}
                          </span>
                          <div>
                            <h4 className="font-bold text-slate-900">{st.title}</h4>
                            <p className="text-slate-600 leading-relaxed mt-0.5">{st.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* COMMON MISCONCEPTIONS & CORRECTIONS */}
                {activeSection?.commonMistakes && activeSection.commonMistakes.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
                    <div className="flex items-center space-x-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Miskonsepsi Siswa yang Sering Terjadi & Koreksinya</span>
                    </div>
                    <div className="space-y-2.5">
                      {activeSection.commonMistakes.map((cm, cmIdx) => (
                        <div key={cmIdx} className="bg-white/80 p-3 rounded-xl border border-rose-100 text-xs space-y-1.5">
                          <div className="flex items-start space-x-2 text-rose-600 font-semibold">
                            <span>❌ Miskonsepsi:</span>
                            <span className="text-slate-700 font-normal">{cm.mistake}</span>
                          </div>
                          <div className="flex items-start space-x-2 text-emerald-600 font-semibold">
                            <span>✅ Fakta Sebenarnya:</span>
                            <span className="text-slate-900 font-bold">{cm.correction}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 pl-5 leading-relaxed">
                            💡 {cm.why}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* EXAM & AKM / SNBT / OSN STRATEGY TIPS */}
                {activeSection?.examTips && (
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                    <div className="flex items-center space-x-2 text-purple-800 font-bold text-xs uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span>Tips Ujian & Strategi Soal AKM / SNBT / OSN Informatika</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pl-1">
                      {activeSection.examTips}
                    </p>
                  </div>
                )}

                {/* SECTION IMAGES & INFOGRAPHICS (Feature: Gambar di Setiap Materi) */}
                {activeSection?.images && activeSection.images.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4 text-sky-600" />
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Diagram & Ilustrasi Penjelas Sub-Bab
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {activeSection.images.map((img, sIdx) => (
                        <div
                          key={img.id || sIdx}
                          className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs hover:border-blue-400 transition-colors"
                        >
                          {/* Optional Diagram Title Header */}
                          {img.diagramTitle && (
                            <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Layers className="w-3.5 h-3.5 text-blue-600" />
                                <span className="text-xs font-bold text-blue-900">
                                  {img.diagramTitle}
                                </span>
                              </div>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                Diagram #{sIdx + 1}
                              </span>
                            </div>
                          )}

                          {/* Interactive Image with Zoom Trigger */}
                          <div
                            onClick={() => openLightboxWithImage(img, activeSection.images)}
                            className="group relative cursor-pointer overflow-hidden bg-slate-900 aspect-video flex items-center justify-center"
                          >
                            <img
                              src={img.url}
                              alt={img.alt || img.caption}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                              <span className="px-3 py-1.5 rounded-xl bg-black/75 text-white text-xs font-semibold backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 shadow-lg">
                                <ZoomIn className="w-3.5 h-3.5" />
                                <span>Perbesar Gambar (Zoom)</span>
                              </span>
                            </div>
                          </div>

                          {/* Image Caption & Educational Metadata */}
                          <div className="p-4 space-y-3">
                            <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                              {img.caption}
                            </p>

                            {/* Bullet breakdown details if present */}
                            {img.diagramDetails && img.diagramDetails.length > 0 && (
                              <div className="pt-2 border-t border-slate-200/70 space-y-1.5">
                                <span className="text-[11px] font-bold text-slate-700 flex items-center space-x-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Analisis & Poin Kunci Diagram:</span>
                                </span>
                                <ul className="space-y-1 pl-4">
                                  {img.diagramDetails.map((detail, dIdx) => (
                                    <li key={dIdx} className="text-[11px] text-slate-600 list-disc leading-relaxed">
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
                              {img.source && (
                                <span className="flex items-center space-x-1">
                                  <Info className="w-3 h-3 text-slate-400" />
                                  <span>Sumber: <strong className="text-slate-700">{img.source}</strong></span>
                                </span>
                              )}

                              {img.tags && img.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {img.tags.map((tag, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-medium text-slate-600"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Diagram Simulation Engine */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Simulasi Diagram Langkah Interaktif
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Jalankan langkah-langkah simulasi grafis materi ini secara visual
                          </p>
                        </div>
                      </div>
                      <DiagramSimulationViewer
                        sectionId={activeSection.id}
                        element={moduleItem.element}
                        title={activeSection.title}
                        onOpenLightbox={(title, desc) => {
                          setLightboxData({
                            images: activeSection.images || [],
                            initialIndex: 0
                          });
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* IN-LINE VISUAL SIMULATOR (Feature: Simulasi Gambar & Konsep di Setiap Materi) */}
                {activeSection?.interactiveDemo && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Simulasi Visual Interaktif Langsung
                          </h3>
                          <p className="text-[11px] text-slate-500">
                            Coba langsung alur algoritma dan prinsip konsep secara visual di bawah ini
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setReaderTab('simulation')}
                        className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold hover:bg-purple-100 transition-colors flex items-center space-x-1"
                      >
                        <span>Buka Mode Lab Penuh</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <ModuleVisualSimulator
                      type={activeSection.interactiveDemo as SimulationType}
                      element={moduleItem.element}
                      onAddXP={(xp) => onAddXP?.(xp, `Menyelesaikan Simulasi Visual: ${activeSection.title}`)}
                      compact={true}
                    />
                  </div>
                )}

                {/* GLOSSARY TERMS FOR THIS SECTION */}
                {activeSection?.glossaryTerms && activeSection.glossaryTerms.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                      <Compass className="w-4 h-4 text-blue-600" />
                      <span>Glosarium Istilah Teknis Sub-Bab Ini</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeSection.glossaryTerms.map((g, gIdx) => (
                        <div key={gIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <span className="font-bold text-blue-600">{g.term}:</span>
                          <p className="text-slate-600 text-[11px] leading-relaxed">{g.definition}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optional Code Examples with Output & Explanations */}
                {activeSection?.codeExamples && activeSection.codeExamples.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                      <Code2 className="w-4 h-4 text-emerald-600" />
                      <span>Contoh Implementasi Kode & Algoritma</span>
                    </h3>

                    {activeSection.codeExamples.map((ex, cIdx) => (
                      <div key={cIdx} className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-lg space-y-0">
                        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-300">{ex.title}</span>
                          <button
                            onClick={() => handleCopyCode(ex.code, cIdx)}
                            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition-colors"
                          >
                            {copiedCodeIndex === cIdx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedCodeIndex === cIdx ? 'Tersalin' : 'Salin'}</span>
                          </button>
                        </div>

                        {/* Code display */}
                        <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto selection:bg-blue-600 selection:text-white">
                          <code>{ex.code}</code>
                        </pre>

                        {/* Output & Explanation bar */}
                        {ex.output && (
                          <div className="p-3.5 bg-slate-900/90 border-t border-slate-800 text-xs space-y-1">
                            <div className="font-mono text-slate-300 font-bold">
                              Terminal Output: <span className="text-sky-300">{ex.output}</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed text-[11px]">
                              💡 {ex.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

          {/* Personal Student Note Taker for this module */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Catatan Rangkuman Mandiri Siswa
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">{moduleNotes.length} Catatan Disimpan</span>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3">
              <input
                type="text"
                placeholder="Judul catatan (contoh: Poin Penting Algoritma & Diagram)..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
              <textarea
                rows={3}
                placeholder="Tuliskan pemahaman, rumus, atau catatan mandiri Anda mengenai materi ini..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
              />

              {/* Toggle Image Attachment in Note */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowImageAttachmentInput(!showImageAttachmentInput)}
                    className="text-[11px] font-semibold text-sky-600 hover:underline flex items-center space-x-1"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{showImageAttachmentInput ? 'Sembunyikan Lampiran Gambar' : '+ Lampirkan URL Gambar / Diagram ke Catatan'}</span>
                  </button>

                  {/* Preset quick image selector from current module */}
                  {showImageAttachmentInput && allModuleImages.length > 0 && (
                    <div className="flex items-center space-x-1 text-[10px] text-slate-500">
                      <span>Pilih dari modul:</span>
                      {allModuleImages.slice(0, 3).map((img, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setNoteImageUrl(img.url)}
                          className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-blue-100 font-medium"
                        >
                          Diagram {pIdx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {showImageAttachmentInput && (
                  <input
                    type="url"
                    placeholder="Masukkan URL Gambar/Diagram (https://...)..."
                    value={noteImageUrl}
                    onChange={(e) => setNoteImageUrl(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                )}
              </div>

              <button
                type="submit"
                id="save-module-note-btn"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simpan Catatan Modul Ini</span>
              </button>
            </form>

            {/* List of saved notes for this module */}
            {moduleNotes.length > 0 && (
              <div className="space-y-2 pt-2">
                {moduleNotes.map((n) => (
                  <div 
                    key={n.id}
                    className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between font-bold text-amber-900">
                      <span>{n.title}</span>
                      <button
                        onClick={() => onDeleteNote(n.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-slate-700 leading-relaxed">{n.text}</p>

                    {n.imageUrl && (
                      <div
                        onClick={() => setLightboxData({
                          images: [{ id: `note-img-${n.id}`, url: n.imageUrl!, caption: n.title, alt: n.title }],
                          initialIndex: 0
                        })}
                        className="relative rounded-lg overflow-hidden border border-amber-300 max-h-36 cursor-pointer group bg-black/10"
                      >
                        <img
                          src={n.imageUrl}
                          alt={n.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                          <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
                        </div>
                      </div>
                    )}

                    <div className="text-[10px] text-slate-500">{n.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DEDICATED FULL-SCREEN VISUAL SIMULATOR LAB */}
      {readerTab === 'simulation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Laboratorium Simulasi Visual: {moduleItem.title}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Bereksperimen dengan model visual interaktif yang mencerminkan materi pembelajaran {elementInfo.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  ⚡ +15 XP Interaksi
                </span>
              </div>
            </div>

            {/* Sub-Bab Simulator Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700 mr-2 flex items-center space-x-1">
                <ListOrdered className="w-3.5 h-3.5 text-blue-600" />
                <span>Pilih Simulasi Sub-Bab:</span>
              </span>

              {moduleItem.sections.map((sec, sIdx) => {
                const isSecActive = sec.id === activeSectionId;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      isSecActive
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>Sub-Bab {sIdx + 1}: {sec.title.split('.')[1] || sec.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Simulator Display */}
            <ModuleVisualSimulator
              type={((activeSection?.interactiveDemo || (moduleItem.element === 'BK' ? 'stack-queue-visualizer' : moduleItem.element === 'AP' ? 'binary-search-visualizer' : moduleItem.element === 'SK' ? 'logic-gate-simulator' : moduleItem.element === 'JKI' ? 'network-topology-simulator' : moduleItem.element === 'AD' ? 'sql-join-visualizer' : 'phishing-detector-simulator'))) as SimulationType}
              element={moduleItem.element}
              onAddXP={(xp) => onAddXP?.(xp, `Menyelesaikan Simulasi: ${activeSection?.title || moduleItem.title}`)}
              compact={false}
            />
          </div>
        </div>
      )}

      {/* TAB 3: FULL HD IMAGE & INFOGRAPHICS GALLERY */}
      {readerTab === 'gallery' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-sky-600" />
                <span>Galeri Foto Praktikum & Diagram Materi ({allModuleImages.length})</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Koleksi foto praktikum siswa SMA, simulasi laboratorium komputer, dan infografis materi {moduleItem.title}
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700">
              Dokumentasi SMA HD
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allModuleImages.map((img, gIdx) => (
              <div
                key={img.id || gIdx}
                className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-xs hover:border-sky-400 transition-colors space-y-3"
              >
                <div
                  onClick={() => openLightboxWithImage(img, allModuleImages)}
                  className="group relative cursor-pointer overflow-hidden bg-slate-900 aspect-video flex items-center justify-center"
                >
                  <img
                    src={img.url}
                    alt={img.alt || img.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  ></img>
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <span className="px-3.5 py-2 rounded-xl bg-black/80 text-white text-xs font-semibold backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 shadow-lg">
                      <ZoomIn className="w-4 h-4" />
                      <span>Klik untuk Zoom HD</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 pt-1 space-y-2">
                  <p className="text-xs font-bold text-slate-900 leading-relaxed">
                    {img.caption}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                    {img.source && (
                      <span>Sumber: <strong className="text-slate-700">{img.source}</strong></span>
                    )}

                    {img.tags && (
                      <div className="flex flex-wrap gap-1">
                        {img.tags.map((t, tidx) => (
                          <span key={tidx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px]">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

