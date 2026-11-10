import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Play, 
  RotateCcw, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Eye, 
  Cpu, 
  Network, 
  Database, 
  ShieldCheck, 
  GitBranch, 
  Sliders,
  Split,
  Binary,
  ZoomIn
} from '../icons/phosphor';
import { InformaticsElement } from '../types';

interface DiagramSimulationViewerProps {
  sectionId: string;
  element: InformaticsElement;
  title?: string;
  onOpenLightbox?: (title: string, desc: string) => void;
}

export const DiagramSimulationViewer: React.FC<DiagramSimulationViewerProps> = ({
  sectionId,
  element,
  title,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // MODUL 1: BERPIKIR KOMPUTASIONAL
  // --------------------------------------------------------------------------
  
  // 1.1: 4 Pilar Berpikir Komputasional
  const renderBK1Pillars = () => {
    const pillars = [
      { id: 'dek', name: '1. Dekomposisi', color: '#0284c7', bg: '#e0f2fe', desc: 'Memecah masalah rumit menjadi sub-masalah kecil yang terisolasi.', example: 'Memecah sistem restoran: kasir, dapur, dan gudang.' },
      { id: 'pol', name: '2. Pengenalan Pola', color: '#7c3aed', bg: '#ede9fe', desc: 'Menemukan kesamaan, tren, atau keteraturan dari riwayat data.', example: 'Mengenali kemacetan berulang setiap jam 17.00 di jalan utama.' },
      { id: 'abs', name: '3. Abstraksi', color: '#d97706', bg: '#fef3c7', desc: 'Menyaring informasi esensial dan mengabaikan detail yang tidak relevan.', example: 'Peta rute MRT hanya menampilkan urutan stasiun tanpa lekuk jalan.' },
      { id: 'alg', name: '4. Algoritma', color: '#059669', bg: '#d1fae5', desc: 'Merancang instruksi langkah demi langkah yang logis dan terukur.', example: 'Urutan instruksi pengurutan nilai dari terkecil ke terbesar.' },
    ];
    const current = pillars[activeStep % 4];

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pilih Pilar yang Disimulasikan:</span>
            <div className="flex items-center space-x-1">
              {pillars.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => { setActiveStep(idx); setSelectedNode(p.id); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    activeStep % 4 === idx 
                      ? 'bg-blue-600 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {p.name.split('.')[1]}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center space-x-1"
          >
            <Play className="w-3 h-3" />
            <span>Alur Berikutnya</span>
          </button>
        </div>

        {/* SVG Diagram Canvas */}
        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 overflow-hidden">
          <svg viewBox="0 0 760 260" className="w-full h-auto select-none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
              <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
            </defs>

            {/* Problem Input Block */}
            <rect x="20" y="90" width="100" height="80" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <text x="70" y="125" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">MASALAH</text>
            <text x="70" y="142" fill="#94a3b8" fontSize="10" textAnchor="middle">KOMPLEKS</text>

            {/* Connecting Arrow */}
            <path d="M 120 130 L 155 130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* 4 Pillars Pipeline */}
            {pillars.map((p, idx) => {
              const xPos = 165 + idx * 125;
              const isSelected = (activeStep % 4) === idx;
              return (
                <g key={p.id} onClick={() => { setActiveStep(idx); setSelectedNode(p.id); }} className="cursor-pointer">
                  {/* Arrow between pillars */}
                  {idx > 0 && (
                    <path 
                      d={`M ${xPos - 18} 130 L ${xPos - 5} 130`} 
                      stroke={isSelected ? '#38bdf8' : '#64748b'} 
                      strokeWidth="2" 
                      markerEnd={isSelected ? 'url(#arrow-active)' : 'url(#arrow)'} 
                    />
                  )}
                  {/* Pillar Box */}
                  <rect
                    x={xPos}
                    y="75"
                    width="105"
                    height="110"
                    rx="12"
                    fill={isSelected ? p.color : '#1e293b'}
                    stroke={isSelected ? '#38bdf8' : '#334155'}
                    strokeWidth={isSelected ? '3' : '1.5'}
                    className="transition-all duration-300"
                  />
                  <circle cx={xPos + 52} cy="100" r="14" fill={isSelected ? '#ffffff' : '#334155'} />
                  <text x={xPos + 52} y="105" fill={isSelected ? p.color : '#e2e8f0'} fontSize="11" fontWeight="bold" textAnchor="middle">
                    {idx + 1}
                  </text>
                  <text x={xPos + 52} y="132" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {p.name.split('.')[1]}
                  </text>
                  <text x={xPos + 52} y="150" fill={isSelected ? '#f0fdf4' : '#94a3b8'} fontSize="8.5" textAnchor="middle">
                    {idx === 0 ? 'Pecah Bagian' : idx === 1 ? 'Cari Pola' : idx === 2 ? 'Pilah Esensial' : 'Langkah Pasti'}
                  </text>
                  {isSelected && (
                    <rect x={xPos + 22} y="165" width="60" height="12" rx="6" fill="#38bdf8" />
                  )}
                  {isSelected && (
                    <text x={xPos + 52} y="174" fill="#0f172a" fontSize="7.5" fontWeight="bold" textAnchor="middle">AKTIF</text>
                  )}
                </g>
              );
            })}

            {/* Connecting to Output */}
            <path d="M 665 130 L 685 130" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow)" />

            {/* Optimal Solution Output */}
            <rect x="690" y="90" width="65" height="80" rx="12" fill="#065f46" stroke="#10b981" strokeWidth="2" />
            <text x="722" y="125" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">SOLUSI</text>
            <text x="722" y="142" fill="#a7f3d0" fontSize="9" textAnchor="middle">OPTIMAL</text>
          </svg>
        </div>

        {/* Detailed Explanation for current node */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>{current.name}</span>
              <span className="px-2 py-0.2 rounded-full text-[10px] bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Pilar #{activeStep % 4 + 1}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">{current.desc}</p>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              💡 <strong>Contoh Kasus:</strong> {current.example}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 1.2: Stack (LIFO) vs Queue (FIFO)
  const renderBK2StackQueue = () => {
    const isStack = activeStep % 2 === 0;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveStep(0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isStack ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Simulasi Stack (LIFO)
            </button>
            <button
              onClick={() => setActiveStep(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                !isStack ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Simulasi Queue (FIFO)
            </button>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {isStack ? 'Prinsip: Last In, First Out' : 'Prinsip: First In, First Out'}
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 220" className="w-full h-auto select-none">
            {isStack ? (
              // Stack View
              <g>
                <text x="380" y="25" fill="#93c5fd" fontSize="13" fontWeight="bold" textAnchor="middle">
                  STRUKTUR DATA STACK: HANYA 1 PINTU AKSES (TOP)
                </text>
                {/* Stack Container Glass */}
                <path d="M 280 40 L 280 190 L 480 190 L 480 40" fill="none" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                
                {/* Elements */}
                <rect x="295" y="145" width="170" height="35" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <text x="380" y="167" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Elemen 1: data_dasar</text>

                <rect x="295" y="105" width="170" height="35" rx="8" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                <text x="380" y="127" fill="#e0e7ff" fontSize="11" fontWeight="bold" textAnchor="middle">Elemen 2: data_tengah</text>

                <rect x="295" y="65" width="170" height="35" rx="8" fill="#4338ca" stroke="#818cf8" strokeWidth="2.5" />
                <text x="380" y="87" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Elemen 3: data_terbaru [TOP]</text>

                {/* Top Pointer */}
                <path d="M 510 82 L 475 82" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="520" y="86" fill="#f43f5e" fontSize="12" fontWeight="bold">POINTER TOP</text>

                {/* Push and Pop Annotations */}
                <path d="M 220 50 C 250 50, 290 55, 330 63" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4" markerEnd="url(#arrow)" />
                <text x="180" y="55" fill="#10b981" fontSize="11" fontWeight="bold">push() masuk</text>

                <path d="M 430 63 C 470 55, 500 50, 540 50" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4" markerEnd="url(#arrow)" />
                <text x="550" y="55" fill="#f59e0b" fontSize="11" fontWeight="bold">pop() keluar</text>
              </g>
            ) : (
              // Queue View
              <g>
                <text x="380" y="25" fill="#6ee7b7" fontSize="13" fontWeight="bold" textAnchor="middle">
                  STRUKTUR DATA QUEUE: DUA PINTU BERBEDA (REAR & FRONT)
                </text>
                
                {/* Horizontal Pipe Container */}
                <line x1="140" y1="70" x2="620" y2="70" stroke="#475569" strokeWidth="4" />
                <line x1="140" y1="150" x2="620" y2="150" stroke="#475569" strokeWidth="4" />

                {/* Enqueue on Left (REAR) */}
                <path d="M 60 110 L 130 110" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="85" y="95" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">enqueue()</text>
                <text x="85" y="130" fill="#94a3b8" fontSize="10" textAnchor="middle">Masuk Sini</text>

                {/* Queue Items */}
                <rect x="160" y="80" width="90" height="60" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="205" y="112" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Klien #3</text>
                <text x="205" y="128" fill="#6ee7b7" fontSize="9" textAnchor="middle">[REAR]</text>

                <rect x="270" y="80" width="90" height="60" rx="10" fill="#0f766e" stroke="#14b8a6" strokeWidth="2" />
                <text x="315" y="112" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Klien #2</text>
                <text x="315" y="128" fill="#99f6e4" fontSize="9" textAnchor="middle">Antrean</text>

                <rect x="380" y="80" width="90" height="60" rx="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                <text x="425" y="112" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Klien #1</text>
                <text x="425" y="128" fill="#bae6fd" fontSize="9" textAnchor="middle">Antrean</text>

                <rect x="490" y="80" width="90" height="60" rx="10" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="535" y="112" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Klien #0</text>
                <text x="535" y="128" fill="#fef08a" fontSize="9" fontWeight="bold" textAnchor="middle">[FRONT]</text>

                {/* Dequeue on Right (FRONT) */}
                <path d="M 590 110 L 660 110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
                <text x="640" y="95" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">dequeue()</text>
                <text x="640" y="130" fill="#94a3b8" fontSize="10" textAnchor="middle">Keluar Sini</text>
              </g>
            )}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className={`p-3 rounded-xl border ${isStack ? 'bg-indigo-50/80 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
            <span className="font-bold text-indigo-700 dark:text-indigo-400">Prinsip Stack (Tumpukan):</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1 leading-relaxed">
              Elemen yang terakhir dimasukkan (push) adalah yang pertama dikeluarkan (pop). Digunakan untuk tombol <strong>Undo/Redo</strong> dan Call Stack fungsi rekursif.
            </p>
          </div>
          <div className={`p-3 rounded-xl border ${!isStack ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">Prinsip Queue (Antrean):</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1 leading-relaxed">
              Elemen yang pertama masuk (enqueue) adalah yang pertama dilayani keluar (dequeue). Digunakan untuk antrean cetak <strong>Printer Spooler</strong> dan Round-Robin CPU.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // 1.3: Graf Berbobot & Algoritma Dijkstra
  const renderBK3Graph = () => {
    const steps = [
      { step: 0, title: 'Inisialisasi Graf', desc: 'Simpul A adalah titik awal (jarak = 0). Simpul lainnya bernilai infinity (∞).' },
      { step: 1, title: 'Kunjungi Tetangga A', desc: 'Relaksasi ke B (bobot 4) dan C (bobot 2). Simpul C memiliki jarak terpendek (2).' },
      { step: 2, title: 'Kunjungi C -> Perbarui B', desc: 'Jalur A-C-B menghasilkan jarak 2 + 1 = 3 (lebih hemat daripada 4!). Jarak B diperbarui menjadi 3.' },
      { step: 3, title: 'Kunjungi B & D -> Capai E', desc: 'Dari B menuju D (3+1=4), dari D menuju E (4+1=5). Total jarak terbaik A ke E = 5 km!' },
    ];
    const current = steps[activeStep % steps.length];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  activeStep % steps.length === idx 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Langkah {idx}
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            Rute Terbaik: A → C → B → D → E (5 km)
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 220" className="w-full h-auto select-none">
            {/* Edges */}
            <line x1="120" y1="110" x2="260" y2="60" stroke={activeStep >= 1 ? '#6366f1' : '#475569'} strokeWidth="3" />
            <text x="180" y="75" fill="#f59e0b" fontSize="12" fontWeight="bold">w = 4</text>

            <line x1="120" y1="110" x2="260" y2="160" stroke={activeStep >= 1 ? '#10b981' : '#475569'} strokeWidth="3.5" />
            <text x="180" y="150" fill="#10b981" fontSize="12" fontWeight="bold">w = 2 (pilih C)</text>

            <line x1="260" y1="160" x2="260" y2="60" stroke={activeStep >= 2 ? '#10b981' : '#475569'} strokeWidth="3" />
            <text x="275" y="115" fill="#10b981" fontSize="12" fontWeight="bold">w = 1</text>

            <line x1="260" y1="60" x2="440" y2="110" stroke={activeStep >= 3 ? '#10b981' : '#475569'} strokeWidth="3" />
            <text x="350" y="75" fill="#10b981" fontSize="12" fontWeight="bold">w = 1</text>

            <line x1="440" y1="110" x2="620" y2="110" stroke={activeStep >= 3 ? '#10b981' : '#475569'} strokeWidth="3.5" />
            <text x="530" y="100" fill="#10b981" fontSize="12" fontWeight="bold">w = 1 (Sampai E)</text>

            {/* Nodes */}
            <circle cx="120" cy="110" r="24" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
            <text x="120" y="115" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
            <text x="120" y="150" fill="#38bdf8" fontSize="10" textAnchor="middle">Dist: 0</text>

            <circle cx="260" cy="60" r="24" fill={activeStep >= 2 ? '#4f46e5' : '#1e293b'} stroke="#818cf8" strokeWidth="3" />
            <text x="260" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">B</text>
            <text x="260" y="30" fill="#a5b4fc" fontSize="10" textAnchor="middle">{activeStep >= 2 ? 'Dist: 3 (relaks)' : 'Dist: 4'}</text>

            <circle cx="260" cy="160" r="24" fill={activeStep >= 1 ? '#059669' : '#1e293b'} stroke="#34d399" strokeWidth="3" />
            <text x="260" y="165" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">C</text>
            <text x="260" y="200" fill="#34d399" fontSize="10" textAnchor="middle">Dist: 2</text>

            <circle cx="440" cy="110" r="24" fill={activeStep >= 3 ? '#059669' : '#1e293b'} stroke="#34d399" strokeWidth="3" />
            <text x="440" y="115" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">D</text>
            <text x="440" y="150" fill="#34d399" fontSize="10" textAnchor="middle">Dist: 4</text>

            <circle cx="620" cy="110" r="26" fill={activeStep >= 3 ? '#16a34a' : '#1e293b'} stroke="#4ade80" strokeWidth="3" />
            <text x="620" y="115" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">E</text>
            <text x="620" y="155" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">Goal: 5 km</text>
          </svg>
        </div>

        <div className="p-3 bg-purple-50/80 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 text-xs">
          <strong>{current.title}:</strong> {current.desc}
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // MODUL 2: ALGORITMA DAN PEMROGRAMAN
  // --------------------------------------------------------------------------

  // 2.1: Call Stack Rekursi
  const renderAP1Recursion = () => {
    const frames = [
      { depth: 3, call: 'faktorial(1)', status: 'Base Case Tercapai!', val: 'Return 1', color: '#10b981' },
      { depth: 2, call: 'faktorial(2)', status: 'Hitung: 2 * faktorial(1)', val: 'Return 2 * 1 = 2', color: '#6366f1' },
      { depth: 1, call: 'faktorial(3)', status: 'Hitung: 3 * faktorial(2)', val: 'Return 3 * 2 = 6', color: '#0ea5e9' },
    ];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Simulasi Eksekusi Call Stack: faktorial(3)
          </span>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % 3)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
          >
            Langkah Eksekusi: Tahap {activeStep % 3 === 0 ? 'Push Frame' : activeStep % 3 === 1 ? 'Hit Base Case' : 'Pop & Return'}
          </button>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 210" className="w-full h-auto select-none">
            {/* Left: Call Chain Diagram */}
            <text x="160" y="25" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">ALUR PEMANGGILAN REKURSIF</text>
            <rect x="50" y="45" width="220" height="35" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="160" y="67" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">faktorial(3) → 3 * faktorial(2)</text>

            <path d="M 160 80 L 160 95" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="50" y="100" width="220" height="35" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
            <text x="160" y="122" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">faktorial(2) → 2 * faktorial(1)</text>

            <path d="M 160 135 L 160 150" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow)" />

            <rect x="50" y="155" width="220" height="35" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
            <text x="160" y="177" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">faktorial(1) → BASE CASE = 1</text>

            {/* Right: Actual RAM Call Stack Frame */}
            <text x="540" y="25" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">ALOKASI CALL STACK MEMORI (RAM)</text>
            
            {/* Glass Stack Container */}
            <path d="M 400 40 L 400 195 L 680 195 L 680 40" fill="none" stroke="#475569" strokeWidth="3" />

            {/* Frames inside Stack */}
            <rect x="415" y="150" width="250" height="38" rx="6" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
            <text x="540" y="173" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">Frame 1: n=3 | Menunggu return f(2)</text>

            <rect x="415" y="105" width="250" height="38" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
            <text x="540" y="128" fill="#e0e7ff" fontSize="11" fontWeight="bold" textAnchor="middle">Frame 2: n=2 | Menunggu return f(1)</text>

            <rect x="415" y="60" width="250" height="38" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
            <text x="540" y="83" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle">Frame 3: n=1 [TOP] → Mengembalikan 1</text>
          </svg>
        </div>

        <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs text-slate-700 dark:text-slate-300">
          💡 <strong>Kunci Rekursi:</strong> Setiap panggilan mendorong frame baru ke memori (Push). Setelah Base Case tercapai, nilai dikembalikan secara mundur (Unwinding/Pop) hingga Frame pertama menghasilkan nilai akhir 6.
        </div>
      </div>
    );
  };

  // 2.2: Binary Search vs Linear Search
  const renderAP2Search = () => {
    const array = [12, 24, 35, 47, 59, 68, 77, 85, 94];
    const target = 77;
    const midIdx = 4; // index of 59

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Simulasi Binary Search: Membagi 2 Ruang Pencarian (Target = 77)
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Kompleksitas: O(log N)
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 190" className="w-full h-auto select-none">
            {/* Array Boxes */}
            {array.map((num, idx) => {
              const x = 50 + idx * 75;
              const isTarget = num === target;
              const isMid = idx === midIdx;
              const isLeftEliminated = idx <= midIdx;

              return (
                <g key={idx}>
                  <rect
                    x={x}
                    y="70"
                    width="65"
                    height="50"
                    rx="8"
                    fill={isTarget ? '#059669' : isMid ? '#d97706' : isLeftEliminated ? '#1e293b' : '#334155'}
                    stroke={isTarget ? '#34d399' : isMid ? '#f59e0b' : '#475569'}
                    strokeWidth={isTarget || isMid ? '2.5' : '1'}
                  />
                  <text x={x + 32} y="100" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                    {num}
                  </text>
                  <text x={x + 32} y="60" fill="#94a3b8" fontSize="9" textAnchor="middle">
                    idx[{idx}]
                  </text>
                  {isMid && (
                    <text x={x + 32} y="140" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">MID (59 &lt; 77)</text>
                  )}
                  {isTarget && (
                    <text x={x + 32} y="140" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">TARGET!</text>
                  )}
                </g>
              );
            })}

            {/* Left Interval Elimination Cross */}
            <path d="M 45 95 L 415 95" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6" />
            <text x="230" y="165" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
              ❌ Rentang Kiri Dieliminasi Seketika (Karena 59 &lt; 77)
            </text>

            <text x="590" y="165" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
              ✅ Rentang Kanan Baru: [68, 77, 85, 94]
            </text>
          </svg>
        </div>

        <div className="p-3 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
          <strong>Perbandingan:</strong> Linear Search memeriksa 7 kali (12→24→35→47→59→68→77), sedangkan Binary Search langsung membuang separuh data di langkah pertama dan menemukan target hanya dalam 2 langkah.
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // MODUL 3: SISTEM KOMPUTER
  // --------------------------------------------------------------------------

  // 3.1: Gerbang Logika & Half Adder
  const renderSK1LogicGates = () => {
    const [inA, setInA] = [activeStep % 2, Math.floor(activeStep / 2) % 2];
    const sum = inA ^ inA; // XOR
    const carry = inA & inA; // AND

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Simulasi Gerbang Logika:</span>
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center space-x-1"
            >
              <Binary className="w-3.5 h-3.5" />
              <span>Ganti Input (A: {inA}, B: {inA})</span>
            </button>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Sirkuit Digital Half Adder (Penjumlah Biner)
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 210" className="w-full h-auto select-none">
            {/* Input Lines */}
            <text x="80" y="70" fill={inA ? '#10b981' : '#64748b'} fontSize="14" fontWeight="bold">Input A = {inA}</text>
            <text x="80" y="150" fill={inA ? '#10b981' : '#64748b'} fontSize="14" fontWeight="bold">Input B = {inA}</text>

            {/* Wire to XOR Gate */}
            <line x1="160" y1="65" x2="320" y2="65" stroke={inA ? '#10b981' : '#475569'} strokeWidth="3" />
            <line x1="160" y1="145" x2="240" y2="145" stroke={inA ? '#10b981' : '#475569'} strokeWidth="3" />
            <line x1="240" y1="145" x2="240" y2="85" stroke={inA ? '#10b981' : '#475569'} strokeWidth="3" />
            <line x1="240" y1="85" x2="320" y2="85" stroke={inA ? '#10b981' : '#475569'} strokeWidth="3" />

            {/* XOR Gate Box */}
            <rect x="320" y="50" width="110" height="50" rx="10" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
            <text x="375" y="80" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">XOR Gate</text>

            {/* Wire to AND Gate */}
            <line x1="200" y1="65" x2="200" y2="135" stroke={inA ? '#10b981' : '#475569'} strokeWidth="3" />
            <line x1="200" y1="135" x2="320" y2="135" stroke={inA ? '#10b981' : '#475569'} strokeWidth="3" />
            <line x1="240" y1="145" x2="320" y2="155" stroke={inA ? '#10b981' : '#475569'} strokeWidth="3" />

            {/* AND Gate Box */}
            <rect x="320" y="125" width="110" height="50" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
            <text x="375" y="155" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">AND Gate</text>

            {/* Output Lines */}
            <line x1="430" y1="75" x2="560" y2="75" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
            <line x1="430" y1="150" x2="560" y2="150" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Output Badges */}
            <rect x="560" y="52" width="140" height="45" rx="8" fill="#0284c7" />
            <text x="630" y="79" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              SUM (A ⊕ B) = {sum}
            </text>

            <rect x="560" y="127" width="140" height="45" rx="8" fill="#d97706" />
            <text x="630" y="154" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
              CARRY (A • B) = {carry}
            </text>
          </svg>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <strong>Prinsip Penjumlahan Biner:</strong> Bit Sum dihasilkan dari gerbang <strong>XOR</strong> (1 jika berbeda), sedangkan bit Carry (simpanan ke kolom berikutnya) dihasilkan dari gerbang <strong>AND</strong> (1 jika keduanya 1).
        </div>
      </div>
    );
  };

  // 3.2: Arsitektur Von Neumann & Siklus CPU
  const renderSK2CpuCycle = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Arsitektur CPU Von Neumann & Siklus Fetch-Decode-Execute
          </span>
          <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
            Bus Sistem: Data Bus • Address Bus • Control Bus
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 210" className="w-full h-auto select-none">
            {/* CPU Boundary */}
            <rect x="50" y="30" width="380" height="155" rx="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
            <text x="240" y="52" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
              CENTRAL PROCESSING UNIT (CPU)
            </text>

            {/* CU Box */}
            <rect x="70" y="65" width="150" height="50" rx="10" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
            <text x="145" y="90" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Control Unit (CU)</text>
            <text x="145" y="104" fill="#c7d2fe" fontSize="9" textAnchor="middle">Pengatur Dekode & Clock</text>

            {/* ALU Box */}
            <rect x="70" y="125" width="150" height="50" rx="10" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
            <text x="145" y="150" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">ALU</text>
            <text x="145" y="164" fill="#a7f3d0" fontSize="9" textAnchor="middle">Aritmatika & Logika</text>

            {/* Registers Box */}
            <rect x="250" y="65" width="160" height="110" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="330" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">REGISTERS</text>
            <text x="330" y="105" fill="#94a3b8" fontSize="9" textAnchor="middle">PC (Program Counter)</text>
            <text x="330" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">MAR (Memory Address Reg)</text>
            <text x="330" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">MDR (Memory Data Reg)</text>
            <text x="330" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">IR (Instruction Reg)</text>

            {/* System Bus */}
            <rect x="460" y="95" width="80" height="30" rx="6" fill="#f59e0b" />
            <text x="500" y="114" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">BUS DATA</text>

            <path d="M 430 110 L 460 110" stroke="#f59e0b" strokeWidth="3" />
            <path d="M 540 110 L 570 110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* RAM Box */}
            <rect x="570" y="45" width="140" height="130" rx="14" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
            <text x="640" y="75" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">RAM (Memori Utama)</text>
            <text x="640" y="105" fill="#94a3b8" fontSize="9" textAnchor="middle">Alamat 0x01: LOAD R1, [10]</text>
            <text x="640" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">Alamat 0x02: ADD R1, R2</text>
            <text x="640" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">Alamat 0x03: STORE [12], R1</text>
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <span className="font-bold text-blue-700 dark:text-blue-300">1. FETCH:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Mengambil instruksi biner dari alamat RAM yang ditunjuk Program Counter (PC).</p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
            <span className="font-bold text-purple-700 dark:text-purple-300">2. DECODE:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">Control Unit menerjemahkan kode operasi (Opcode) menjadi sinyal kontrol listrik.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="font-bold text-emerald-700 dark:text-emerald-300">3. EXECUTE:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">ALU melakukan perhitungan matematika dan menyimpan hasilnya ke Register.</p>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // MODUL 4: JARINGAN KOMPUTER DAN INTERNET
  // --------------------------------------------------------------------------

  // 4.1: Subnetting & Notasi CIDR
  const renderJKI1Subnet = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Simulasi Struktur Bit Alamat IP: 192.168.1.0/26
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
            Prefiks: /26 (26 Bit Network, 6 Bit Host)
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 190" className="w-full h-auto select-none">
            {/* Octet 1 */}
            <rect x="50" y="50" width="140" height="65" rx="8" fill="#0284c7" />
            <text x="120" y="75" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Oktet 1: 192</text>
            <text x="120" y="95" fill="#bae6fd" fontSize="10" fontFamily="monospace" textAnchor="middle">11000000 (8 bit)</text>

            {/* Octet 2 */}
            <rect x="210" y="50" width="140" height="65" rx="8" fill="#0284c7" />
            <text x="280" y="75" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Oktet 2: 168</text>
            <text x="280" y="95" fill="#bae6fd" fontSize="10" fontFamily="monospace" textAnchor="middle">10101000 (8 bit)</text>

            {/* Octet 3 */}
            <rect x="370" y="50" width="140" height="65" rx="8" fill="#0284c7" />
            <text x="440" y="75" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Oktet 3: 1</text>
            <text x="440" y="95" fill="#bae6fd" fontSize="10" fontFamily="monospace" textAnchor="middle">00000001 (8 bit)</text>

            {/* Octet 4 (Split Network & Host) */}
            <rect x="530" y="50" width="60" height="65" rx="6" fill="#0284c7" />
            <text x="560" y="75" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Net (2b)</text>
            <text x="560" y="95" fill="#bae6fd" fontSize="9" fontFamily="monospace" textAnchor="middle">11</text>

            <rect x="600" y="50" width="110" height="65" rx="6" fill="#059669" />
            <text x="655" y="75" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Host (6b)</text>
            <text x="655" y="95" fill="#a7f3d0" fontSize="9" fontFamily="monospace" textAnchor="middle">000000</text>

            {/* Brackets */}
            <text x="320" y="145" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              ▲ 26 Bit Network ID (Subnet Mask: 255.255.255.192)
            </text>
            <text x="655" y="145" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
              ▲ 6 Bit Host ID (2^6 - 2 = 62 IP)
            </text>
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-blue-600">Network Address:</span>
            <p className="font-mono text-slate-800 dark:text-slate-200">192.168.1.0</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-emerald-600">Rentang Host Valid:</span>
            <p className="font-mono text-slate-800 dark:text-slate-200">192.168.1.1 s/d .62</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-rose-600">Broadcast Address:</span>
            <p className="font-mono text-slate-800 dark:text-slate-200">192.168.1.63</p>
          </div>
        </div>
      </div>
    );
  };

  // 4.2: Model OSI 7-Layer vs TCP/IP
  const renderJKI2Osi = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Model Referensi Protokol: 7-Layer OSI berdampingan dengan 4-Layer TCP/IP
          </span>
          <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
            Alur Enkapsulasi: Atas (Data) → Bawah (Bit Sinyal)
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 210" className="w-full h-auto select-none">
            {/* OSI 7 Layers */}
            <text x="200" y="25" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">MODEL 7 LAYER OSI</text>
            
            <rect x="50" y="40" width="300" height="22" rx="5" fill="#6366f1" />
            <text x="200" y="55" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">7. Application Layer (HTTP, DNS, SMTP)</text>

            <rect x="50" y="65" width="300" height="22" rx="5" fill="#4f46e5" />
            <text x="200" y="80" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">6. Presentation Layer (SSL/TLS, JPEG, ASCII)</text>

            <rect x="50" y="90" width="300" height="22" rx="5" fill="#4338ca" />
            <text x="200" y="105" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">5. Session Layer (NetBIOS, RPC, Sockets)</text>

            <rect x="50" y="115" width="300" height="22" rx="5" fill="#0284c7" />
            <text x="200" y="130" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">4. Transport Layer [Segment] (TCP, UDP)</text>

            <rect x="50" y="140" width="300" height="22" rx="5" fill="#0d9488" />
            <text x="200" y="155" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">3. Network Layer [Packet] (IP, ICMP, Router)</text>

            <rect x="50" y="165" width="300" height="22" rx="5" fill="#16a34a" />
            <text x="200" y="180" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">2. Data Link Layer [Frame] (MAC, Switch)</text>

            <rect x="50" y="190" width="300" height="18" rx="4" fill="#334155" />
            <text x="200" y="203" fill="#cbd5e1" fontSize="9" textAnchor="middle">1. Physical Layer [Bits] (Kabel UTP, Fiber, Hub)</text>

            {/* TCP/IP Mapping */}
            <text x="560" y="25" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">MODEL 4 LAYER TCP/IP</text>

            <rect x="420" y="40" width="280" height="72" rx="8" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
            <text x="560" y="75" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1. Application Layer</text>
            <text x="560" y="95" fill="#c7d2fe" fontSize="10" textAnchor="middle">Mencakup OSI 7, 6, dan 5</text>

            <rect x="420" y="115" width="280" height="22" rx="5" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="560" y="130" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2. Transport Layer (TCP / UDP)</text>

            <rect x="420" y="140" width="280" height="22" rx="5" fill="#0d9488" stroke="#2dd4bf" strokeWidth="2" />
            <text x="560" y="155" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3. Internet Layer (IP, ICMP)</text>

            <rect x="420" y="165" width="280" height="43" rx="6" fill="#16a34a" stroke="#4ade80" strokeWidth="2" />
            <text x="560" y="183" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4. Network Access Layer</text>
            <text x="560" y="198" fill="#bbf7d0" fontSize="9" textAnchor="middle">Mencakup Data Link + Physical</text>
          </svg>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // MODUL 5: ANALISIS DATA
  // --------------------------------------------------------------------------

  // 5.2: SQL JOIN Venn Diagram
  const renderAD2SqlJoin = () => {
    const modes = [
      { id: 'inner', name: 'INNER JOIN', desc: 'Hanya baris data yang cocok di kedua tabel (Irisan A ∩ B).' },
      { id: 'left', name: 'LEFT JOIN', desc: 'Semua baris dari Tabel A + baris yang cocok dari Tabel B (B kosong bernilai NULL).' },
      { id: 'full', name: 'FULL OUTER JOIN', desc: 'Semua baris dari Tabel A dan Tabel B digabungkan sekaligus.' },
    ];
    const current = modes[activeStep % 3];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {modes.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeStep % 3 === idx ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
            {current.name}
          </span>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 190" className="w-full h-auto select-none">
            {/* Table A Circle */}
            <circle
              cx="310"
              cy="95"
              r="75"
              fill={activeStep % 3 === 1 || activeStep % 3 === 2 ? '#0284c7' : '#1e293b'}
              stroke="#38bdf8"
              strokeWidth="3"
              fillOpacity={activeStep % 3 === 1 || activeStep % 3 === 2 ? '0.7' : '0.4'}
            />
            <text x="270" y="95" fill="#ffffff" fontSize="13" fontWeight="bold">Tabel A</text>
            <text x="270" y="115" fill="#bae6fd" fontSize="10">(Siswa)</text>

            {/* Table B Circle */}
            <circle
              cx="450"
              cy="95"
              r="75"
              fill={activeStep % 3 === 2 ? '#0d9488' : '#1e293b'}
              stroke="#2dd4bf"
              strokeWidth="3"
              fillOpacity={activeStep % 3 === 2 ? '0.7' : '0.4'}
            />
            <text x="490" y="95" fill="#ffffff" fontSize="13" fontWeight="bold">Tabel B</text>
            <text x="490" y="115" fill="#99f6e4" fontSize="10">(Ekskul)</text>

            {/* Intersection Highlight */}
            <path
              d="M 380 40 A 75 75 0 0 1 380 150 A 75 75 0 0 1 380 40"
              fill="#10b981"
              fillOpacity="0.85"
            />
            <text x="380" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">KUNCI COCOK</text>
            <text x="380" y="110" fill="#fef08a" fontSize="9" textAnchor="middle">(id_ekskul)</text>
          </svg>
        </div>

        <div className="p-3 bg-sky-50/80 dark:bg-sky-950/30 rounded-xl border border-sky-200 dark:border-sky-800 text-xs">
          <strong>Logika {current.name}:</strong> {current.desc}
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // MODUL 6: DAMPAK SOSIAL INFORMATIKA
  // --------------------------------------------------------------------------

  // 6.1: CIA Triad
  const renderDSI1Cia = () => {
    const pillars = [
      { id: 'c', name: 'Confidentiality (Kerahasiaan)', safeguard: 'Enkripsi AES-256, HTTPS, 2FA', threat: 'Pencurian database, packet sniffing' },
      { id: 'i', name: 'Integrity (Keutuhan Data)', safeguard: 'Hash SHA-256, Digital Signature', threat: 'Perubahan saldo rekening ilegal, malware' },
      { id: 'a', name: 'Availability (Ketersediaan Akses)', safeguard: 'Load Balancer, Mitigasi DDoS, Backup', threat: 'Serangan DDoS, ransomware, server down' },
    ];
    const current = pillars[activeStep % 3];

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Segitiga Keamanan Informasi: The CIA Triad
          </span>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % 3)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
          >
            Pilar Aktif: {current.name.split(' ')[0]}
          </button>
        </div>

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
          <svg viewBox="0 0 760 210" className="w-full h-auto select-none">
            {/* Triangle Lines */}
            <polygon points="380,35 180,180 580,180" fill="none" stroke="#475569" strokeWidth="3" />
            <circle cx="380" cy="115" r="45" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
            <text x="380" y="112" fill="#e0e7ff" fontSize="12" fontWeight="bold" textAnchor="middle">CIA</text>
            <text x="380" y="128" fill="#a5b4fc" fontSize="10" textAnchor="middle">TRIAD</text>

            {/* Top Node: Confidentiality */}
            <circle cx="380" cy="35" r="28" fill={activeStep % 3 === 0 ? '#0284c7' : '#1e293b'} stroke="#38bdf8" strokeWidth="3" />
            <text x="380" y="40" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">C</text>
            <text x="380" y="15" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">CONFIDENTIALITY</text>

            {/* Bottom Left: Integrity */}
            <circle cx="180" cy="180" r="28" fill={activeStep % 3 === 1 ? '#059669' : '#1e293b'} stroke="#34d399" strokeWidth="3" />
            <text x="180" y="185" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">I</text>
            <text x="180" y="205" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">INTEGRITY</text>

            {/* Bottom Right: Availability */}
            <circle cx="580" cy="180" r="28" fill={activeStep % 3 === 2 ? '#e11d48' : '#1e293b'} stroke="#fb7185" strokeWidth="3" />
            <text x="580" y="185" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
            <text x="580" y="205" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">AVAILABILITY</text>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <span className="font-bold text-emerald-700 dark:text-emerald-400">🛡️ Proteksi Teknis:</span>
            <p className="text-slate-600 dark:text-slate-300 mt-1">{current.safeguard}</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
            <span className="font-bold text-rose-700 dark:text-rose-400">⚠️ Ancaman yang Merusak:</span>
            <p className="text-slate-600 dark:text-slate-300 mt-1">{current.threat}</p>
          </div>
        </div>
      </div>
    );
  };

  // Selector Dispatcher
  const renderDiagram = () => {
    switch (sectionId) {
      case 'sec-1-1': return renderBK1Pillars();
      case 'sec-1-2': return renderBK2StackQueue();
      case 'sec-1-3': return renderBK3Graph();
      case 'sec-2-1': return renderAP1Recursion();
      case 'sec-2-2': return renderAP2Search();
      case 'sec-2-3': return renderAP2Search();
      case 'sec-3-1': return renderSK1LogicGates();
      case 'sec-3-2': return renderSK2CpuCycle();
      case 'sec-3-3': return renderSK2CpuCycle();
      case 'sec-4-1': return renderJKI1Subnet();
      case 'sec-4-2': return renderJKI2Osi();
      case 'sec-4-3': return renderJKI2Osi();
      case 'sec-5-1': return renderAD2SqlJoin();
      case 'sec-5-2': return renderAD2SqlJoin();
      case 'sec-5-3': return renderAD2SqlJoin();
      case 'sec-6-1': return renderDSI1Cia();
      case 'sec-6-2': return renderDSI1Cia();
      case 'sec-6-3': return renderDSI1Cia();
      default: return renderBK1Pillars();
    }
  };

  return (
    <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Simulasi Diagram Visual Konseptual
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ilustrasi skema interaktif & alur data untuk memperjelas materi {title || ''}
            </p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
          HD Vektor
        </span>
      </div>

      {/* Main Diagram Content */}
      {renderDiagram()}
    </div>
  );
};
