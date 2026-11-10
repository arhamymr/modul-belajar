import React, { useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  Share2, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  BarChart3, 
  BookOpen, 
  FileCheck2,
  TrendingUp,
  BrainCircuit,
  ArrowRight
} from '../icons/phosphor';
import confetti from 'canvas-confetti';
import { QuizAttempt, QuestionItem, StudentProfile } from '../types';
import { MODULES_DATA, INFORMATICS_ELEMENTS } from '../data/curriculumData';

interface GradingReportProps {
  attempt: QuizAttempt;
  student: StudentProfile;
  onRetakeQuiz: () => void;
  onOpenCertificate: () => void;
  onBackToModules: () => void;
  onOpenAITutorWithQuestion: (question: QuestionItem) => void;
}

export const GradingReport: React.FC<GradingReportProps> = ({
  attempt,
  student,
  onRetakeQuiz,
  onOpenCertificate,
  onBackToModules,
  onOpenAITutorWithQuestion,
}) => {
  // Trigger confetti if score is high
  useEffect(() => {
    if (attempt.score >= 75) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [attempt.score]);

  // Collect questions for detailed review
  const allQuestionsMap = new Map<string, QuestionItem>();
  MODULES_DATA.forEach(m => {
    m.questions.forEach(q => allQuestionsMap.set(q.id, q));
  });

  const getStatusColor = (kktp: QuizAttempt['kktpStatus']) => {
    switch (kktp) {
      case 'Sangat Mahir': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Mahir': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cukup / Berkembang': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:space-y-4 print:p-0">
      {/* Top Banner Result Card */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Sistem Penilaian Otomatis E-Modul Informatika</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Hasil Evaluasi Capaian Pembelajaran
            </h1>

            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Nama Siswa: <strong>{student.name}</strong>{student.nisn ? <> • NISN: <strong>{student.nisn}</strong></> : null} • {student.school}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${getStatusColor(attempt.kktpStatus)}`}>
                Kategori: {attempt.kktpStatus}
              </span>
              <span className="text-xs text-slate-300 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Waktu Pengerjaan: {Math.floor(attempt.timeSpentSeconds / 60)} menit {attempt.timeSpentSeconds % 60} detik</span>
              </span>
            </div>
          </div>

          {/* Big Score Badge */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center space-y-2">
            <p className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Nilai Akhir (Skala 100)</p>
            <div className="text-5xl sm:text-6xl font-black text-sky-400">
              {attempt.score}
            </div>
            <div className="text-sm font-bold text-white">
              Predikat Huruf: <span className="text-amber-300 text-lg">{attempt.gradeLetter}</span>
            </div>
            <div className="text-xs text-slate-300 pt-1">
              Benar: <strong className="text-emerald-400">{attempt.correctCount}</strong> • Salah: <strong className="text-rose-400">{attempt.wrongCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons (Print, Certificate, Retake) */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="print-report-btn"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center space-x-2 shadow-xs"
          >
            <Printer className="w-4 h-4 text-blue-600" />
            <span>Cetak / Unduh Rapor</span>
          </button>

          {attempt.score >= 75 && (
            <button
              id="claim-certificate-btn"
              onClick={onOpenCertificate}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>Klaim Sertifikat Kelulusan</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="retake-quiz-btn"
            onClick={onRetakeQuiz}
            className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center space-x-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Latihan</span>
          </button>
          <button
            id="back-to-modules-btn"
            onClick={onBackToModules}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
          >
            <span>Kembali ke Modul</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Capaian Kompetensi per Elemen Informatika (Bar & Percentage Breakdown) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Analisis Diagnostik Capaian Elemen Informatika
            </h2>
          </div>
          <span className="text-xs text-slate-600 font-medium">Standar Kurikulum Merdeka</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(attempt.elementScores).map(([key, data]) => {
            const el = INFORMATICS_ELEMENTS[key];
            if (!el || data.total === 0) return null;

            return (
              <div 
                key={key} 
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${el.badgeBg}`}>
                      {el.code}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                      {el.name}
                    </h3>
                  </div>
                  <span className="text-sm font-black text-blue-600">
                    {data.percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>

                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>Skor: {data.correct} dari {data.total} Soal</span>
                  <span className={data.percentage >= 75 ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
                    {data.percentage >= 75 ? 'Tercapai' : 'Perlu Penguatan'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item-by-Item Comprehensive Review & Pembahasan */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Pembahasan Butir Soal & Penjelasan Lengkap
            </h2>
          </div>
          <span className="text-xs text-slate-600">
            {Object.keys(attempt.answers).length} Soal Dinilai
          </span>
        </div>

        <div className="space-y-4">
          {Object.entries(attempt.answers).map(([qId, userAnsIdx], index) => {
            const question = allQuestionsMap.get(qId);
            if (!question) return null;

            const isCorrect = userAnsIdx === question.correctAnswer;
            const isUnanswered = userAnsIdx === undefined;

            return (
              <div
                key={qId}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      Elemen: {question.element} • {question.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isCorrect ? (
                      <span className="flex items-center space-x-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Jawaban Benar</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{isUnanswered ? 'Tidak Dijawab' : 'Jawaban Salah'}</span>
                      </span>
                    )}

                    <button
                      onClick={() => onOpenAITutorWithQuestion(question)}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center space-x-1"
                      title="Tanya penjelasan ke AI Tutor"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Tanya AI</span>
                    </button>
                  </div>
                </div>

                <div className="mt-3 space-y-3 text-xs sm:text-sm">
                  <p className="font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                    {question.question}
                  </p>

                  {question.codeSnippet && (
                    <pre className="p-3 bg-slate-950 text-emerald-300 rounded-xl font-mono text-xs overflow-x-auto">
                      <code>{question.codeSnippet}</code>
                    </pre>
                  )}

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className={`p-2.5 rounded-xl border ${
                      isCorrect 
                        ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950' 
                        : 'bg-rose-100/80 border-rose-300 text-rose-950'
                    }`}>
                      <strong>Jawaban Anda: </strong>
                      {userAnsIdx !== undefined ? question.options[Number(userAnsIdx)] : 'Tidak dijawab'}
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-950">
                      <strong>Jawaban yang Tepat: </strong>
                      {question.options[Number(question.correctAnswer)]}
                    </div>
                  </div>

                  {/* Step-by-step scientific explanation */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-1">
                    <div className="font-bold text-blue-700">💡 Pembahasan Lengkap:</div>
                    <p className="whitespace-pre-line">{question.explanation}</p>
                    <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                      🎯 <strong>Tujuan Pembelajaran:</strong> {question.learningObjective}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
