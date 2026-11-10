import React, { useState, useEffect, useRef } from 'react';
import { 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Sparkles, 
  Lightbulb, 
  RotateCcw, 
  Send, 
  BookOpen,
  Shuffle,
  ShieldCheck,
  Check,
  Filter,
  Layers,
  GraduationCap
} from '../icons/phosphor';
import { QuestionItem, QuizAttempt, StudentProfile, InformaticsElement } from '../types';
import { MODULES_DATA, INFORMATICS_ELEMENTS } from '../data/curriculumData';

interface QuizArenaProps {
  initialModuleId?: string;
  student: StudentProfile;
  onFinishQuiz: (attempt: QuizAttempt) => void;
  onOpenAITutorWithQuestion: (question: QuestionItem) => void;
}

export const QuizArena: React.FC<QuizArenaProps> = ({
  initialModuleId,
  student,
  onFinishQuiz,
  onOpenAITutorWithQuestion,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(initialModuleId || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showExamConfigModal, setShowExamConfigModal] = useState<boolean>(false);

  // Helper to filter question pool
  const getFilteredQuestions = (modId: string, diff: string): QuestionItem[] => {
    let pool = modId === 'all'
      ? MODULES_DATA.flatMap(m => m.questions)
      : (MODULES_DATA.find(m => m.id === modId)?.questions || []);
    if (diff !== 'all') {
      pool = pool.filter(q => q.difficulty === diff);
    }
    return pool;
  };

  const initialQuestions = getFilteredQuestions(initialModuleId || 'all', 'all');

  const [questionsList, setQuestionsList] = useState<QuestionItem[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  
  // Modes: 'practice' (instant feedback) or 'exam' (timed, submit at end)
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('practice');
  const [examTitle, setExamTitle] = useState<string>('Simulasi Ujian Evaluasi Informatika');
  
  // Timer for exam mode (e.g. 20 minutes)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(20 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [cheatWarningCount, setCheatWarningCount] = useState<number>(0);
  const [showConfirmSubmitModal, setShowConfirmSubmitModal] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());

  const currentQ = questionsList[currentIndex] || questionsList[0];

  const handleFilterChange = (newModId: string, newDiff: string) => {
    setSelectedModuleId(newModId);
    setSelectedDifficulty(newDiff);
    const newPool = getFilteredQuestions(newModId, newDiff);
    setQuestionsList(newPool.length > 0 ? newPool : getFilteredQuestions(newModId, 'all'));
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setShowHint({});
  };

  // Anti-cheat detection when in exam mode (detect tab visibility changes)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (quizMode === 'exam' && document.hidden) {
        setCheatWarningCount(prev => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [quizMode]);

  // Exam Countdown Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizMode === 'exam' && isTimerRunning && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizMode, isTimerRunning, timeLeftSeconds]);

  const handleSelectAnswer = (qId: string, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: answerIndex
    }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleShuffleQuestions = () => {
    const shuffled = [...questionsList].sort(() => Math.random() - 0.5);
    setQuestionsList(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
  };

  const handleStartCustomExam = (examType: 'all60' | 'mid30' | 'quick15' | 'current') => {
    let examPool: QuestionItem[] = [];
    let minutes = 45;
    let title = 'Simulasi Ujian Semester Informatika';

    if (examType === 'all60') {
      examPool = MODULES_DATA.flatMap(m => m.questions).sort(() => Math.random() - 0.5);
      minutes = 90;
      title = 'Tryout Ujian Komprehensif (Semua 60 Soal)';
    } else if (examType === 'mid30') {
      // 5 questions from each of 6 modules
      examPool = MODULES_DATA.flatMap(m => {
        const modQ = [...m.questions].sort(() => Math.random() - 0.5);
        return modQ.slice(0, 5);
      }).sort(() => Math.random() - 0.5);
      minutes = 45;
      title = 'Simulasi Asesmen Sumatif Semester (30 Soal Acak)';
    } else if (examType === 'quick15') {
      const allQ = MODULES_DATA.flatMap(m => m.questions).sort(() => Math.random() - 0.5);
      examPool = allQ.slice(0, 15);
      minutes = 25;
      title = 'Tryout Kilat Evaluasi Cepat (15 Soal Acak)';
    } else {
      examPool = [...questionsList].sort(() => Math.random() - 0.5);
      minutes = Math.max(Math.ceil((examPool.length * 90) / 60), 15);
      title = selectedModuleId !== 'all' 
        ? `Ujian Sumatif: ${MODULES_DATA.find(m => m.id === selectedModuleId)?.title || 'Modul'}`
        : `Simulasi Ujian Khusus (${examPool.length} Butir Soal)`;
    }

    setExamTitle(title);
    setQuestionsList(examPool);
    setQuizMode('exam');
    setTimeLeftSeconds(minutes * 60);
    setIsTimerRunning(true);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setShowHint({});
    setShowExamConfigModal(false);
  };

  const handleFinalSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const elementScores: Record<InformaticsElement, { correct: number; total: number; percentage: number }> = {
      BK: { correct: 0, total: 0, percentage: 0 },
      AP: { correct: 0, total: 0, percentage: 0 },
      SK: { correct: 0, total: 0, percentage: 0 },
      JKI: { correct: 0, total: 0, percentage: 0 },
      AD: { correct: 0, total: 0, percentage: 0 },
      DSI: { correct: 0, total: 0, percentage: 0 },
    };

    questionsList.forEach(q => {
      const el = q.element;
      elementScores[el].total += 1;

      const userAns = userAnswers[q.id];
      if (userAns === undefined) {
        unansweredCount += 1;
      } else if (userAns === q.correctAnswer) {
        correctCount += 1;
        elementScores[el].correct += 1;
      } else {
        wrongCount += 1;
      }
    });

    // Calculate percentage per element
    Object.keys(elementScores).forEach(key => {
      const el = key as InformaticsElement;
      if (elementScores[el].total > 0) {
        elementScores[el].percentage = Math.round((elementScores[el].correct / elementScores[el].total) * 100);
      }
    });

    const scorePercentage = Math.round((correctCount / questionsList.length) * 100);

    let kktpStatus: QuizAttempt['kktpStatus'] = 'Perlu Bimbingan';
    let gradeLetter: QuizAttempt['gradeLetter'] = 'D';

    if (scorePercentage >= 90) {
      kktpStatus = 'Sangat Mahir';
      gradeLetter = 'A';
    } else if (scorePercentage >= 75) {
      kktpStatus = 'Mahir';
      gradeLetter = 'B';
    } else if (scorePercentage >= 60) {
      kktpStatus = 'Cukup / Berkembang';
      gradeLetter = 'C';
    }

    const title = quizMode === 'exam' 
      ? examTitle 
      : (selectedModuleId === 'all' 
          ? 'Latihan Komprehensif Seluruh Elemen (Bank 60 Soal)' 
          : `Latihan Soal: ${MODULES_DATA.find(m => m.id === selectedModuleId)?.title || 'Modul'}`);

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizTitle: title,
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      mode: quizMode,
      score: scorePercentage,
      totalQuestions: questionsList.length,
      correctCount,
      wrongCount,
      unansweredCount,
      timeSpentSeconds: timeSpent,
      answers: userAnswers,
      elementScores,
      kktpStatus,
      gradeLetter,
    };

    onFinishQuiz(attempt);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const isCurrentAnswered = userAnswers[currentQ?.id] !== undefined;

  return (
    <div className="space-y-6">
      {/* Top Banner Mode Selector & Exam Control */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              {quizMode === 'practice' ? 'Mode Latihan Mandiri' : 'Mode Simulasi Ujian Resmi'}
            </span>
            <span className="text-xs text-slate-500">
              {quizMode === 'exam' ? examTitle : (selectedModuleId === 'all' ? 'Bank Soal Lengkap: 60 Butir' : `Fokus: ${MODULES_DATA.find(m => m.id === selectedModuleId)?.title}`)}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Arena Latihan & Evaluasi Otomatis
          </h1>
        </div>

        {/* Mode Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {quizMode === 'practice' ? (
            <>
              <button
                id="shuffle-quiz-btn"
                onClick={handleShuffleQuestions}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center space-x-1.5"
                title="Acak urutan butir soal"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Acak Soal</span>
              </button>
              <button
                id="switch-to-exam-mode-btn"
                onClick={() => setShowExamConfigModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-all flex items-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Mulai Simulasi Ujian</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-mono font-bold text-sm">
                <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
              {cheatWarningCount > 0 && (
                <div className="flex items-center space-x-1 text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Peringatan Tab Keluar: {cheatWarningCount}x</span>
                </div>
              )}
              <button
                onClick={() => setShowConfirmSubmitModal(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kumpulkan Jawaban</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Practice Mode Filter Bar */}
      {quizMode === 'practice' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 mr-2">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Pilih Modul:</span>
            </div>
            <select
              id="module-quiz-filter-select"
              value={selectedModuleId}
              onChange={(e) => handleFilterChange(e.target.value, selectedDifficulty)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Semua 6 Modul (Total 60 Soal Lengkap)</option>
              {MODULES_DATA.map(m => (
                <option key={m.id} value={m.id}>
                  Modul {m.number}: {m.title} ({m.questions.length} Soal)
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-700 mr-1">Tingkat Kesulitan:</span>
            {(['all', 'Mudah', 'Sedang', 'HOTS / Sulit'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => handleFilterChange(selectedModuleId, diff)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {diff === 'all' ? 'Semua' : diff}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Question Arena Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Question Display */}
        <div className="lg:col-span-8 space-y-6">
          {currentQ && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Question Header Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {currentIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    dari {questionsList.length} Butir Soal
                  </span>
                  <span className="text-xs text-slate-300">|</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Elemen: {currentQ.element}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {currentQ.difficulty}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Flag Question for review */}
                  <button
                    id="flag-question-btn"
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center space-x-1 ${
                      flaggedQuestions[currentQ.id]
                        ? 'bg-amber-100 border-amber-300 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-amber-600'
                    }`}
                    title="Tandai ragu-ragu"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Ragu-ragu</span>
                  </button>

                  {/* AI Hint Generator */}
                  <button
                    id="ask-ai-tutor-question-btn"
                    onClick={() => onOpenAITutorWithQuestion(currentQ)}
                    className="p-2 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center space-x-1"
                    title="Minta penjelasan konsep atau petunjuk dari AI Tutor"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="hidden sm:inline">Bantuan AI</span>
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed whitespace-pre-line">
                  {currentQ.question}
                </p>

                {/* Optional Code Snippet in Question */}
                {currentQ.codeSnippet && (
                  <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner">
                    <pre>
                      <code>{currentQ.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((option, oIdx) => {
                  const isSelected = userAnswers[currentQ.id] === oIdx;

                  let optClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                  
                  if (isSelected) {
                    optClass = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold shadow-xs ring-1 ring-blue-500';
                  }

                  return (
                    <button
                      key={oIdx}
                      id={`option-btn-${oIdx}`}
                      onClick={() => handleSelectAnswer(currentQ.id, oIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start space-x-3 ${optClass}`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Hint in Practice Mode (Without revealing answer key) */}
              {quizMode === 'practice' && currentQ.hint && (
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      id="toggle-hint-btn"
                      onClick={() => setShowHint(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                      className="text-xs font-semibold text-amber-700 hover:underline flex items-center space-x-1"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{showHint[currentQ.id] ? 'Sembunyikan Petunjuk' : 'Lihat Petunjuk (Hint)'}</span>
                    </button>
                  </div>

                  {/* Hint Card */}
                  {showHint[currentQ.id] && (
                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                      💡 <strong>Petunjuk Guru:</strong> {currentQ.hint}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Arrows */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  id="quiz-prev-btn"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                {currentIndex < questionsList.length - 1 ? (
                  <button
                    id="quiz-next-btn"
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center space-x-1 shadow-xs"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    id="quiz-finish-btn"
                    onClick={() => setShowConfirmSubmitModal(true)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Selesai & Nilai Otomatis</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Question Navigator Grid */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Lembar Jawaban Digital
              </h3>
              <span className="text-[11px] font-semibold text-slate-500">
                Terjawab {answeredCount} / {questionsList.length}
              </span>
            </div>

            {/* Question Matrix Numbers */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
              {questionsList.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAns = userAnswers[q.id] !== undefined;
                const isFlag = flaggedQuestions[q.id];

                let btnStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                
                if (isAns) {
                  btnStyle = 'bg-blue-600 text-white border-blue-600 font-bold';
                }
                if (isFlag) {
                  btnStyle = 'bg-amber-400 text-slate-900 border-amber-500 font-bold';
                }
                if (isCurrent) {
                  btnStyle += ' ring-2 ring-blue-500 ring-offset-2 ring-offset-white';
                }

                return (
                  <button
                    key={q.id}
                    id={`nav-q-${idx}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl border text-xs font-bold transition-all flex items-center justify-center relative ${btnStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlag && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[10px] text-slate-600">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-blue-600 inline-block" />
                <span>Terjawab</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-amber-400 inline-block" />
                <span>Ragu-ragu</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-200 inline-block" />
                <span>Belum</span>
              </div>
            </div>

            {/* Submit Button in Sidebar */}
            <button
              id="sidebar-finish-quiz-btn"
              onClick={() => setShowConfirmSubmitModal(true)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Selesai & Kumpulkan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Exam Mode Package Selector Modal */}
      {showExamConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Pilih Format Simulasi Ujian
                </h3>
                <p className="text-xs text-slate-500">
                  Mode Ujian dilengkapi batas waktu, pengawasan tab, dan tanpa pembahasan instan.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Option 1: 30 Questions Mixed */}
              <button
                id="exam-pkg-30-btn"
                onClick={() => handleStartCustomExam('mid30')}
                className="w-full text-left p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-all flex items-start justify-between group"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-blue-900">Simulasi Asesmen Sumatif Semester</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">Rekomendasi</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    30 Soal Acak Seimbang (5 soal dari masing-masing 6 modul elemen informatika).
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-700 whitespace-nowrap ml-2">45 Menit</span>
              </button>

              {/* Option 2: 60 Questions Full */}
              <button
                id="exam-pkg-60-btn"
                onClick={() => handleStartCustomExam('all60')}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all flex items-start justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900">Tryout Komprehensif Seluruh Bank Soal</span>
                  <p className="text-[11px] text-slate-500">
                    Semua 60 Butir Soal lengkap (BK, AP, SK, JKI, AD, DSI) untuk evaluasi mendalam.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-700 whitespace-nowrap ml-2">90 Menit</span>
              </button>

              {/* Option 3: 15 Questions Quick */}
              <button
                id="exam-pkg-15-btn"
                onClick={() => handleStartCustomExam('quick15')}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all flex items-start justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900">Tryout Kilat / Latihan Cepat</span>
                  <p className="text-[11px] text-slate-500">
                    15 Soal Acak Campuran untuk pemanasan cepat sebelum ulangan.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-700 whitespace-nowrap ml-2">25 Menit</span>
              </button>

              {/* Option 4: Current Selection */}
              {selectedModuleId !== 'all' && (
                <button
                  id="exam-pkg-current-btn"
                  onClick={() => handleStartCustomExam('current')}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all flex items-start justify-between group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900">
                      Ulangan Harian Modul {MODULES_DATA.find(m => m.id === selectedModuleId)?.number}
                    </span>
                    <p className="text-[11px] text-slate-500">
                      {questionsList.length} Soal dari materi {MODULES_DATA.find(m => m.id === selectedModuleId)?.title}.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 whitespace-nowrap ml-2">15 Menit</span>
                </button>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowExamConfigModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {showConfirmSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md w-full shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Kumpulkan Jawaban Latihan?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Anda telah menjawab <strong>{answeredCount}</strong> dari <strong>{questionsList.length}</strong> butir soal. Sistem akan melakukan penilaian otomatis dan menyusun laporan diagnostik capaian kompetensi.
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Periksa Kembali
              </button>
              <button
                id="confirm-submit-evaluation-btn"
                onClick={() => {
                  setShowConfirmSubmitModal(false);
                  handleFinalSubmit();
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md"
              >
                Ya, Nilai Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
