import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  RotateCcw, 
  HelpCircle, 
  Copy, 
  Check, 
  Lightbulb, 
  BookOpen,
  Code2,
  Volume2,
  VolumeX,
  ArrowRight,
  Terminal,
  MessageSquare
} from '../icons/phosphor';
import { AIMessage, QuestionItem, InteractiveModule, LabContext } from '../types';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextQuestion?: QuestionItem | null;
  contextModule?: InteractiveModule | null;
  contextLab?: LabContext | null;
  onApplyCodeToLab?: (code: string) => void;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  contextQuestion,
  contextModule,
  contextLab,
  onApplyCodeToLab,
}) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<AIMessage[]>(() => {
    // Context-sensitive welcome message
    if (contextLab) {
      return [
        {
          id: 'welcome-lab',
          sender: 'ai',
          text: `Halo sahabat Informatika! 👋 Saya melihat kamu sedang bereksperimen di **Laboratorium Virtual**.\n\n${
            contextLab.error 
              ? `Ada pesan error eksekusi yang terdeteksi: \`${contextLab.error.split('\n')[0]}\`. Mau saya bantu analisis letak kesalahannya dan cara memperbaikinya?` 
              : 'Ada sintaks Python atau algoritma yang ingin kamu diskusikan atau optimalkan?'
          }`,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          suggestedFollowUps: contextLab.error 
            ? ['Analisis dan perbaiki error ini', 'Jelaskan arti pesan error tersebut', 'Bagaimana cara mencegah error ini?']
            : ['Jelaskan alur kerja kode saya', 'Bagaimana cara membuat kode ini lebih efisien?', 'Beri contoh variasi algoritma ini']
        }
      ];
    }

    if (contextQuestion) {
      return [
        {
          id: 'welcome-q',
          sender: 'ai',
          text: `Halo! Kamu sedang mempelajari soal mengenai topik **${contextQuestion.element}**:\n\n> *"${contextQuestion.question}"*\n\nSebagai guru AI, saya siap membimbingmu dengan petunjuk bertahap (metode Sokratik) agar kamu memahami konsep dasarnya. Mau saya beri petunjuk awal?`,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          suggestedFollowUps: [
            'Beri petunjuk konsep tanpa membocorkan jawaban',
            'Jelaskan materi terkait soal ini',
            'Beri analogi dunia nyata untuk soal ini'
          ]
        }
      ];
    }

    if (contextModule) {
      return [
        {
          id: 'welcome-mod',
          sender: 'ai',
          text: `Halo! Selamat belajar modul **"${contextModule.title}"** (Elemen ${contextModule.element}). Ada istilah, alur logika, atau konsep yang ingin kita diskusikan bersama?`,
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          suggestedFollowUps: [
            'Jelaskan ringkasan materi modul ini',
            'Apa manfaat mempelajari topik ini dalam kehidupan nyata?',
            'Uji pemahaman saya dengan 1 pertanyaan kuis'
          ]
        }
      ];
    }

    return [
      {
        id: 'welcome-default',
        sender: 'ai',
        text: 'Halo sahabat Informatika! 👋 Saya adalah **Guru AI Informatika SMA** (Kurikulum Merdeka). Saya siap mendampingi kamu memahami konsep **Berpikir Komputasional, Algoritma Pemrograman, Jaringan Komputer, Sistem Komputer, Analisis Data, dan Dampak Sosial Informatika**.\n\nAda materi yang ingin kita diskusikan hari ini?',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'Jelaskan perbedaan Stack dan Queue',
          'Bagaimana cara kerja Alamat IP dan Subnetting?',
          'Bantu saya memahami fungsi percabangan If-Else di Python'
        ]
      }
    ];
  });

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputPrompt('');
    setIsLoading(true);

    try {
      // Determine context topic
      let contextTopic = 'Mata Pelajaran Informatika SMA (Kurikulum Merdeka)';
      if (contextQuestion) {
        contextTopic = `Soal Kuis ${contextQuestion.element}: "${contextQuestion.question}". Opsi: ${contextQuestion.options.join(', ')}. Pembahasan: ${contextQuestion.explanation}`;
      } else if (contextModule) {
        contextTopic = `Modul Pembelajaran: ${contextModule.title} (Elemen: ${contextModule.element})`;
      } else if (contextLab) {
        contextTopic = `Laboratorium Virtual Praktikum Python SMA. Topik: ${contextLab.topic || 'Pemrograman Python'}`;
      }

      // Prepare conversation history
      const historyPayload = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          context: contextTopic,
          userCode: contextLab?.code,
          codeError: contextLab?.error,
          history: historyPayload
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || 'Maaf, terjadi kendala saat memproses jawaban. Silakan coba kembali.';
      const suggestedFollowUps = data.suggestedFollowUps || [];

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps,
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Error fetching AI Tutor reply:', error);
      const errorMsg: AIMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'Koneksi ke asisten AI sedang dialihkan ke mode offline. Anda tetap dapat melanjutkan eksplorasi modul dan menjalankan kode di Laboratorium Virtual.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'Jelaskan konsep dasar topik ini',
          'Beri analogi sederhana dalam kehidupan sehari-hari',
          'Tampilkan tips penulisan kode yang rapi'
        ]
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown symbols for natural speech
    const cleanText = text
      .replace(/```[\s\S]*?```/g, ' Berikut adalah contoh blok kode. ')
      .replace(/[#*_`>|]/g, '')
      .replace(/\n+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Dynamic quick prompts adapted to current active context
  const getContextualQuickPrompts = () => {
    if (contextLab) {
      return [
        '🔍 Analisis potensi bug atau kesalahan kode ini',
        '💡 Bagaimana cara mengoptimalkan kode ini?',
        '📖 Jelaskan alur eksekusi baris demi baris',
        '🧪 Buatkan test case untuk menguji kode ini'
      ];
    }
    if (contextQuestion) {
      return [
        '💡 Berikan petunjuk terarah tanpa membocorkan kunci',
        '❓ Mengapa konsep ini penting dalam Informatika?',
        '🌟 Berikan analogi sederhana untuk memahami soal ini',
        '📝 Jelaskan istilah kunci yang ada dalam pertanyaan ini'
      ];
    }
    if (contextModule) {
      return [
        `📘 Jelaskan poin penting dari materi ${contextModule.title}`,
        '🌍 Berikan contoh implementasi di industri teknologi',
        '❓ Uji pemahaman saya dengan 1 pertanyaan reflektif',
        '🧩 Hubungkan materi ini dengan 4 Pilar Berpikir Komputasional'
      ];
    }
    return [
      'Jelaskan perbedaan Stack dan Queue dengan contoh nyata',
      'Bagaimana cara kerja Alamat IP dan Subnetting?',
      'Apa bedanya perulangan For dan While di Python?',
      'Bagaimana rumus =SUM dan =AVERAGE di Spreadsheet dihitung?'
    ];
  };

  const quickPrompts = getContextualQuickPrompts();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 max-w-3xl w-full h-[92vh] sm:h-[85vh] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 sm:zoom-in-95">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm sm:text-base font-bold text-white">Guru AI Informatika SMA</h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Aktif
                </span>
              </div>
              <p className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-0.5">
                <span>Tutor Pembelajaran Interaktif Kurikulum Merdeka</span>
                <span>•</span>
                <span className="text-blue-300 font-mono text-[10px]">Gemini AI</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setSpeakingMsgId(null);
                setMessages([
                  {
                    id: `welcome-${Date.now()}`,
                    sender: 'ai',
                    text: 'Percakapan telah disegarkan. Ada konsep Informatika atau kode yang ingin kita diskusikan bersama?',
                    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                    suggestedFollowUps: [
                      'Jelaskan perbedaan Stack dan Queue',
                      'Bagaimana cara kerja IP Address?',
                      'Bantu analisis kode Python'
                    ]
                  }
                ]);
              }}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Segarkan / Bersihkan Percakapan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Tutup Panel AI"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Context Banner (if triggered from Quiz, Module, or Lab) */}
        {(contextQuestion || contextModule || contextLab) && (
          <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900 shrink-0">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="p-1 rounded-md bg-blue-100 text-blue-700 shrink-0">
                {contextLab ? <Terminal className="w-3.5 h-3.5" /> : contextQuestion ? <HelpCircle className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
              </span>
              <div className="truncate">
                <span className="font-semibold text-blue-800">
                  {contextLab ? 'Konteks Lab Python: ' : contextQuestion ? `Soal Kuis (${contextQuestion.element}): ` : 'Modul Pembelajaran: '}
                </span>
                <span className="opacity-90">
                  {contextLab 
                    ? (contextLab.error ? 'Pesan Error Terdeteksi' : 'Editor Kode Aktif') 
                    : contextQuestion 
                    ? contextQuestion.question 
                    : contextModule?.title}
                </span>
              </div>
            </div>

            {contextLab?.code && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono shrink-0 ml-2">
                {contextLab.code.split('\n').length} baris kode
              </span>
            )}
          </div>
        )}

        {/* Context Quick Prompt Chips */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center space-x-2 overflow-x-auto text-xs no-scrollbar shrink-0">
          <span className="text-slate-500 shrink-0 font-medium flex items-center space-x-1 text-[11px]">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>Pilihan Cepat:</span>
          </span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              disabled={isLoading}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 shrink-0 transition-all text-[11px] disabled:opacity-50"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSpeaking = speakingMsgId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 sm:space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-linear-to-br from-indigo-500 to-blue-600 text-white'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble Container */}
                <div className="max-w-[85%] sm:max-w-[80%] space-y-2">
                  <div className={`rounded-2xl p-4 text-xs sm:text-sm shadow-xs ${
                    isUser 
                       ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}>
                    {/* Rendered Text with Markdown */}
                    {isUser ? (
                      <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                    ) : (
                      <div className="markdown-body space-y-2 [&_h1]:text-base [&_h1]:font-bold [&_h1]:mb-1.5 [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mb-1.5 [&_h3]:text-xs [&_h3]:font-bold [&_h3]:mb-1 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_li]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_strong]:font-semibold [&_strong]:text-blue-900 [&_code]:bg-slate-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:font-mono [&_code]:text-[11px] [&_pre]:bg-slate-950 [&_pre]:text-slate-100 [&_pre]:p-3.5 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-2.5 [&_pre]:border [&_pre]:border-slate-800 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_th]:border [&_th]:border-slate-300 [&_th]:p-2 [&_th]:bg-slate-100 [&_th]:font-semibold [&_td]:border [&_td]:border-slate-300 [&_td]:p-2">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    )}

                    {/* Footer Controls of Bubble */}
                    <div className={`flex items-center justify-between text-[11px] pt-2 mt-2 border-t ${
                      isUser 
                        ? 'border-blue-500/50 text-blue-200' 
                        : 'border-slate-200 text-slate-500'
                    }`}>
                      <span>{msg.timestamp}</span>

                      {!isUser && (
                        <div className="flex items-center space-x-2">
                          {/* Audio Read-aloud button */}
                          <button
                            onClick={() => handleSpeak(msg.id, msg.text)}
                            className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-md hover:bg-slate-200 transition-colors ${
                              isSpeaking ? 'text-amber-500 font-semibold' : ''
                            }`}
                            title={isSpeaking ? 'Hentikan Audio' : 'Dengarkan Penjelasan AI (Suara Guru)'}
                          >
                            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span className="text-[10px] hidden sm:inline">{isSpeaking ? 'Berhenti' : 'Dengarkan'}</span>
                          </button>

                          {/* Copy button */}
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="flex items-center space-x-1 px-1.5 py-0.5 rounded-md hover:bg-slate-200 transition-colors"
                            title="Salin Teks Jawaban"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            <span className="text-[10px] hidden sm:inline">{copiedId === msg.id ? 'Tersalin' : 'Salin'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Suggested Follow-Up Question Chips */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-blue-500" />
                        <span>Langkah Diskusi Selanjutnya:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((su, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(su)}
                            disabled={isLoading}
                            className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors flex items-center space-x-1.5 disabled:opacity-50"
                          >
                            <span>{su}</span>
                            <ArrowRight className="w-3 h-3 shrink-0 opacity-60" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="font-semibold text-slate-800">
                    Guru AI sedang menganalisis materi & menyusun penjelasan...
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Menghubungkan konsep dengan Berpikir Komputasional dan analogi nyata untukmu.
                </p>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Tanyakan konsep informatika, cara kerja algoritma, atau minta petunjuk..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              disabled={isLoading}
              className="flex-1 p-3 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all shadow-inner"
            />
            <button
              type="submit"
              id="send-ai-chat-btn"
              disabled={!inputPrompt.trim() || isLoading}
              className="px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition-all shadow-md flex items-center justify-center space-x-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-bold">Kirim</span>
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
            <span>💡 Didukung Gemini AI untuk pembelajaran Informatika SMA Kurikulum Merdeka.</span>
            <span>Tekan Enter untuk mengirim</span>
          </div>
        </div>
      </div>
    </div>
  );
};
