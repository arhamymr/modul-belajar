import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Bookmark, 
  FileText, 
  Plus, 
  Trash2, 
  User, 
  Award,
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  ListOrdered,
  Copy,
  Check,
  AlertTriangle
} from '../icons/phosphor';
import { VideoTutorial, StudentProfile } from '../types';
import { VIDEO_TUTORIALS_DATA, getChapterTheme } from '../data/curriculumData';

interface VideoTutorialPlayerProps {
  initialVideoId?: string;
  student: StudentProfile;
  onSaveNote: (note: { id: string; moduleId: string; title: string; text: string; date: string; timestamp?: number }) => void;
  onDeleteNote: (noteId: string) => void;
  onAddXP: (amount: number) => void;
  onStartQuizForModule: (moduleId: string) => void;
}

export const VideoTutorialPlayer: React.FC<VideoTutorialPlayerProps> = ({
  initialVideoId,
  student,
  onSaveNote,
  onDeleteNote,
  onAddXP,
  onStartQuizForModule,
}) => {
  const [activeVideoId, setActiveVideoId] = useState<string>(initialVideoId || VIDEO_TUTORIALS_DATA[0].id);
  const [startSeconds, setStartSeconds] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [activeCheckpointIndex, setActiveCheckpointIndex] = useState<number | null>(null);
  const [selectedCheckpointAnswer, setSelectedCheckpointAnswer] = useState<number | null>(null);
  const [checkpointSubmitted, setCheckpointSubmitted] = useState<boolean>(false);
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Record<string, number[]>>({});

  // Notes state
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  // Playlist filters & search
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeVideo = VIDEO_TUTORIALS_DATA.find(v => v.id === activeVideoId || v.moduleId === activeVideoId) || VIDEO_TUTORIALS_DATA[0];
  const chapterTheme = getChapterTheme(activeVideo.moduleId);

  const activeVideoIndex = VIDEO_TUTORIALS_DATA.findIndex(v => v.id === activeVideo.id);
  const prevVideo = activeVideoIndex > 0 ? VIDEO_TUTORIALS_DATA[activeVideoIndex - 1] : null;
  const nextVideo = activeVideoIndex < VIDEO_TUTORIALS_DATA.length - 1 ? VIDEO_TUTORIALS_DATA[activeVideoIndex + 1] : null;

  const filteredVideos = VIDEO_TUTORIALS_DATA.filter(v => {
    const matchesMod = moduleFilter === 'all' || v.moduleId === moduleFilter;
    const matchesQuery = searchQuery.trim() === '' || 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      v.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMod && matchesQuery;
  });

  useEffect(() => {
    if (initialVideoId) {
      setActiveVideoId(initialVideoId);
      setStartSeconds(0);
    }
  }, [initialVideoId]);

  const handleCopySummary = () => {
    const textToCopy = `${activeVideo.title}\n\nRingkasan Transkrip:\n${activeVideo.transcriptSummary.join('\n')}\n\nPoin Kunci:\n${activeVideo.keyTakeaways.join('\n')}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSeekChapter = (seconds: number) => {
    setStartSeconds(seconds);
  };

  const handleOpenCheckpoint = (index: number) => {
    setActiveCheckpointIndex(index);
    setSelectedCheckpointAnswer(null);
    setCheckpointSubmitted(false);
  };

  const handleSubmitCheckpoint = () => {
    if (selectedCheckpointAnswer === null || activeCheckpointIndex === null) return;
    setCheckpointSubmitted(true);

    const cp = activeVideo.checkpoints[activeCheckpointIndex];
    if (selectedCheckpointAnswer === cp.correctIndex) {
      // Award XP
      const list = completedCheckpoints[activeVideo.id] || [];
      if (!list.includes(activeCheckpointIndex)) {
        setCompletedCheckpoints({
          ...completedCheckpoints,
          [activeVideo.id]: [...list, activeCheckpointIndex]
        });
        onAddXP(50);
      }
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    onSaveNote({
      id: `note-${Date.now()}`,
      moduleId: activeVideo.moduleId,
      title: newNoteTitle.trim() || `Catatan Video (${formatTime(startSeconds)})`,
      text: newNoteText.trim(),
      date: new Date().toLocaleDateString('id-ID'),
      timestamp: startSeconds,
    });

    setNewNoteTitle('');
    setNewNoteText('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const videoNotes = student.savedNotes.filter(n => n.moduleId === activeVideo.moduleId);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className={`bg-white rounded-2xl border ${chapterTheme.cardTopBorder} border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`${chapterTheme.badgeBg} text-[11px] font-bold px-2.5 py-0.5 rounded-full border`}>
              Video Bab {chapterTheme.number} • {chapterTheme.element}
            </span>
            <span className="text-xs text-slate-700 font-medium">Kurikulum Merdeka SMA</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 rounded-full">
              <Video className="w-3.5 h-3.5" />
              Video Pembelajaran YouTube
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {activeVideo.title}
          </h1>
          <div className="flex items-center space-x-2 text-xs text-slate-700 mt-1">
            <User className="w-3.5 h-3.5" />
            <span>Narasumber / Kanal: <strong>{activeVideo.speaker}</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            id="video-copy-summary-btn"
            onClick={handleCopySummary}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 border border-slate-200 shadow-xs"
            title="Salin Rangkuman & Poin Kunci Materi"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            <span>{copiedLink ? 'Rangkuman Tersalin' : 'Salin Rangkuman'}</span>
          </button>

          <button
            id="video-start-quiz-btn"
            onClick={() => onStartQuizForModule(activeVideo.moduleId)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 shadow-xs"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Uji Pemahaman</span>
          </button>
        </div>
      </div>

      {/* Main Video & Navigation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Video Player & Checkpoints */}
        <div className="lg:col-span-8 space-y-4">
          {/* YouTube Video Player Container */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
              <iframe
                key={`${activeVideo.youtubeId}-${startSeconds}`}
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&start=${startSeconds}&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Video Action & Link Bar */}
            <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center space-x-2 text-slate-300 min-w-0">
                <Video className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="truncate text-[11px] sm:text-xs">
                  Video Pembelajaran: <strong>{activeVideo.speaker}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  id="copy-summary-btn-action"
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-medium flex items-center space-x-1.5 transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Tersalin" : "Salin Rangkuman"}</span>
                </button>
                <button
                  onClick={() => onStartQuizForModule(activeVideo.moduleId)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center space-x-1.5 shadow-xs transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Uji Pemahaman (+50 XP)</span>
                </button>
              </div>
            </div>

            {/* Checkpoint Bar below Video */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-bold text-white">Kuis Checkpoint Video:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {activeVideo.checkpoints.map((cp, cIdx) => {
                  const isDone = (completedCheckpoints[activeVideo.id] || []).includes(cIdx);
                  return (
                    <button
                      key={cIdx}
                      id={`checkpoint-btn-${cIdx}`}
                      onClick={() => handleOpenCheckpoint(cIdx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 hover:bg-slate-700 text-yellow-300 border border-yellow-500/30'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
                      <span>{cp.label.split(':')[0]} ({formatTime(cp.timeInSeconds)})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Checkpoint Modal / Card when active */}
          {activeCheckpointIndex !== null && (
            <div className="bg-slate-900 text-white rounded-2xl border border-slate-700 p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-400/20 text-yellow-300 text-xs font-bold px-2.5 py-1 rounded-md border border-yellow-400/30 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activeVideo.checkpoints[activeCheckpointIndex].label}</span>
                  </span>
                  <span className="text-xs text-slate-400">Bonus: +50 XP</span>
                </div>
                <button
                  onClick={() => setActiveCheckpointIndex(null)}
                  className="text-slate-400 hover:text-white text-xs font-medium"
                >
                  Tutup
                </button>
              </div>

              <h3 className="text-base font-bold text-white">
                {activeVideo.checkpoints[activeCheckpointIndex].questionPrompt}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {activeVideo.checkpoints[activeCheckpointIndex].options.map((opt, optIdx) => {
                  let optStyle = 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200';
                  if (selectedCheckpointAnswer === optIdx) {
                    optStyle = 'bg-blue-600 border-blue-400 text-white font-semibold';
                  }
                  if (checkpointSubmitted) {
                    const isCorrect = optIdx === activeVideo.checkpoints[activeCheckpointIndex].correctIndex;
                    if (isCorrect) {
                      optStyle = 'bg-emerald-600 border-emerald-400 text-white font-bold';
                    } else if (selectedCheckpointAnswer === optIdx) {
                      optStyle = 'bg-red-600 border-red-400 text-white';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={checkpointSubmitted}
                      onClick={() => setSelectedCheckpointAnswer(optIdx)}
                      className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm border transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {checkpointSubmitted && optIdx === activeVideo.checkpoints[activeCheckpointIndex].correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Actions & Explanation */}
              {!checkpointSubmitted ? (
                <button
                  id="submit-checkpoint-answer-btn"
                  onClick={handleSubmitCheckpoint}
                  disabled={selectedCheckpointAnswer === null}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                >
                  Kirim Jawaban
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 space-y-2 text-xs">
                  <div className="font-bold flex items-center space-x-1.5">
                    {selectedCheckpointAnswer === activeVideo.checkpoints[activeCheckpointIndex].correctIndex ? (
                      <span className="text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Jawaban Anda Benar! (+50 XP Ditambahkan)</span>
                      </span>
                    ) : (
                      <span className="text-rose-400">Jawaban belum tepat. Simak pembahasan berikut:</span>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {activeVideo.checkpoints[activeCheckpointIndex].explanation}
                  </p>
                  <button
                    onClick={() => setActiveCheckpointIndex(null)}
                    className="mt-2 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs"
                  >
                    Lanjutkan Video
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Next / Prev Video Quick Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prevVideo ? (
              <button
                id="prev-video-nav-btn"
                onClick={() => {
                  setActiveVideoId(prevVideo.id);
                  setActiveCheckpointIndex(null);
                  setStartSeconds(0);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-left flex items-center space-x-3 group shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 flex items-center justify-center shrink-0">
                  <ChevronLeft className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase font-bold text-slate-700 tracking-wider">Video Sebelumnya</div>
                  <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600">{prevVideo.title}</div>
                </div>
              </button>
            ) : (
              <div className="hidden sm:flex p-3.5 rounded-2xl border border-dashed border-slate-200 text-slate-700 text-xs items-center justify-center">
                Video pertama dalam materi
              </div>
            )}

            {nextVideo ? (
              <button
                id="next-video-nav-btn"
                onClick={() => {
                  setActiveVideoId(nextVideo.id);
                  setActiveCheckpointIndex(null);
                  setStartSeconds(0);
                }}
                className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-right flex items-center justify-end space-x-3 group shadow-xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] uppercase font-bold text-slate-700 tracking-wider">Video Selanjutnya</div>
                  <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600">{nextVideo.title}</div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-100 text-slate-600 group-hover:text-blue-600 flex items-center justify-center shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ) : (
              <div className="hidden sm:flex p-3.5 rounded-2xl border border-dashed border-slate-200 text-slate-700 text-xs items-center justify-center">
                Video terakhir dalam seri
              </div>
            )}
          </div>

          {/* Transcript & Key Takeaways Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Ringkasan Transkrip & Poin Kunci</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              {activeVideo.transcriptSummary.map((ts, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{ts}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900 mb-2">Poin Penting untuk Siswa:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeVideo.keyTakeaways.map((kt, kIdx) => (
                  <div key={kIdx} className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-900">
                    💡 {kt}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Playlist & Notes Taker */}
        <div className="lg:col-span-4 space-y-6">
          {/* Video Playlist Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Daftar Video Modul
                </h3>
                <p className="text-[11px] text-slate-700">18 Video Pembelajaran SMA</p>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {filteredVideos.length} / {VIDEO_TUTORIALS_DATA.length}
              </span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-700 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari video atau materi..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'mod-1', label: 'BK' },
                { id: 'mod-2', label: 'AP' },
                { id: 'mod-3', label: 'SK' },
                { id: 'mod-4', label: 'JKI' },
                { id: 'mod-5', label: 'AD' },
                { id: 'mod-6', label: 'DSI' },
              ].map((tab) => {
                const isSelected = moduleFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setModuleFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {filteredVideos.length === 0 ? (
                <div className="text-center py-6 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-700">Tidak ada video yang sesuai kriteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setModuleFilter('all');
                    }}
                    className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredVideos.map((vid) => {
                  const isActive = vid.id === activeVideo.id;
                  const vidTheme = getChapterTheme(vid.moduleId);
                  return (
                    <button
                      key={vid.id}
                      id={`select-video-${vid.id}`}
                      onClick={() => {
                        setActiveVideoId(vid.id);
                        setActiveCheckpointIndex(null);
                        setStartSeconds(0);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start space-x-3 ${
                        isActive
                          ? 'bg-blue-50 border-blue-300 shadow-xs ring-1 ring-blue-400'
                          : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-800 mt-0.5">
                        <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded font-mono">
                          {vid.duration}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${vidTheme.badgeBg}`}>
                            {vidTheme.element}
                          </span>
                          <span className="text-[10px] text-slate-700 truncate">
                            {vid.speaker}
                          </span>
                        </div>
                        <div className="text-[11px] font-bold text-slate-900 line-clamp-2 leading-snug">
                          {vid.title}
                        </div>
                        <div className="text-[10px] text-slate-700 flex items-center space-x-2 mt-1">
                          <span>{vid.checkpoints.length} Checkpoint</span>
                          <span>•</span>
                          <span>{vid.chapters.length} Bab</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chapters of Active Video */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Bab & Timestamp Video
            </h3>
            <div className="space-y-1.5 text-xs">
              {activeVideo.chapters.map((ch, chIdx) => {
                const isSelected = startSeconds === ch.timeInSeconds;
                return (
                  <div 
                    key={chIdx}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold shadow-xs' 
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSeekChapter(ch.timeInSeconds)}
                      className="text-left hover:text-blue-600 flex-1 flex items-center space-x-2"
                      title="Lompat ke bab ini dalam pemutar interaktif"
                    >
                      <Play className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                      <span className="line-clamp-1">{ch.title}</span>
                    </button>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold shrink-0">
                      {formatTime(ch.timeInSeconds)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Integrated Student Notes Taker */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Catatan Pribadi Siswa
                </h3>
              </div>
              <span className="text-[11px] text-slate-700">{videoNotes.length} Catatan</span>
            </div>

            {/* Note form */}
            <form onSubmit={handleAddNote} className="space-y-2">
              <input
                type="text"
                placeholder="Judul catatan (opsional)..."
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
              <textarea
                rows={3}
                placeholder="Tulis rangkuman atau poin penting dari video ini..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-xs border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500 resize-none"
              />
              <button
                type="submit"
                id="add-video-note-btn"
                className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simpan Catatan Modul</span>
              </button>
            </form>

            {/* List of saved notes */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {videoNotes.length === 0 ? (
                <div className="text-[11px] text-slate-600 text-center py-4 italic">
                  Belum ada catatan untuk video ini.
                </div>
              ) : (
                videoNotes.map((note) => (
                  <div 
                    key={note.id}
                    className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1"
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
                    <div className="text-[10px] text-slate-600">{note.date}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
