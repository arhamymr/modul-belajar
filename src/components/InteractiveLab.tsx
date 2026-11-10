import React, { useState, useRef, useEffect } from 'react';
import { 
  Code2, 
  Cpu, 
  Network, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Lightbulb, 
  Copy, 
  Check, 
  Terminal, 
  Zap, 
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  CornerDownLeft,
  FileCode,
  Trash2,
  HelpCircle,
  Keyboard,
  Info
} from '../icons/phosphor';

interface InteractiveLabProps {
  initialTab?: 'python' | 'logic-gate' | 'subnet';
  onAddXP: (amount: number) => void;
  onOpenAITutorWithLab?: (labContext: { code: string; error?: string; topic?: string }) => void;
}

interface RunResult {
  success: boolean;
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({
  initialTab = 'python',
  onAddXP,
  onOpenAITutorWithLab,
}) => {
  const [activeTab, setActiveTab] = useState<'python' | 'logic-gate' | 'subnet'>(initialTab);

  // --- 1. Python Code Sandbox State ---
  const PRESET_CODES = {
    binarySearch: {
      name: 'Binary Search (Pencarian Biner)',
      description: 'Algoritma pencarian logaritmik O(log n) pada dataset terurut.',
      code: `# Algoritma Binary Search O(log n)
def binary_search(data, target):
    kiri = 0
    kanan = len(data) - 1
    langkah = 0
    
    while kiri <= kanan:
        langkah += 1
        tengah = (kiri + kanan) // 2
        print(f"Langkah {langkah}: Periksa indeks {tengah} (nilai={data[tengah]})")
        
        if data[tengah] == target:
            return tengah, langkah
        elif data[tengah] < target:
            kiri = tengah + 1
        else:
            kanan = tengah - 1
            
    return -1, langkah

# Dataset angka harus sudah terurut
angka_list = [10, 15, 23, 38, 45, 56, 72, 89, 94, 99]
cari = 72

print("=== PROGRAM PENCARIAN BINER ===")
print("Dataset:", angka_list)
print("Target pencarian:", cari)
print("-" * 35)

hasil, total_langkah = binary_search(angka_list, cari)

if hasil != -1:
    print("-" * 35)
    print(f"SUKSES: Angka {cari} ditemukan pada indeks ke-{hasil}")
    print(f"Total langkah pencarian: {total_langkah} langkah (Efisiensi O(log n))")
else:
    print(f"Angka {cari} tidak ditemukan dalam list.")`,
    },
    fibonacci: {
      name: 'Fungsi Rekursif: Deret Fibonacci',
      description: 'Penerapan fungsi rekursif dengan Base Case dan Recursive Step.',
      code: `# Implementasi Rekursi Fibonacci
def fibonacci(n):
    # Base Case (Kondisi Berhenti)
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    # Recursive Step (Pemanggilan Diri)
    return fibonacci(n - 1) + fibonacci(n - 2)

suku_maksimal = 8
print("=== DERET FIBONACCI REKURSIF ===")
print(f"Menghitung deret bilangan Fibonacci hingga suku ke-{suku_maksimal}:\\n")

for i in range(suku_maksimal + 1):
    nilai = fibonacci(i)
    print(f"F({i}) = {nilai}")

print("\\nKalkulasi selesai!")`,
    },
    bubbleSort: {
      name: 'Bubble Sort (Pengurutan Data)',
      description: 'Algoritma pengurutan dengan menukar elemen bersebelahan secara bertahap.',
      code: `# Algoritma Bubble Sort Sederhana
def bubble_sort(arr):
    data = arr.copy()
    n = len(data)
    print(f"Data awal: {data}\\n")
    
    for i in range(n):
        swapped = False
        print(f"--- Putaran ke-{i + 1} ---")
        for j in range(0, n - i - 1):
            if data[j] > data[j + 1]:
                # Tukar elemen
                data[j], data[j + 1] = data[j + 1], data[j]
                swapped = True
                print(f"Tukar: {data}")
        
        if not swapped:
            print("Data sudah terurut sempurna, iterasi dihentikan.")
            break
            
    return data

nilai_siswa = [64, 34, 25, 12, 22, 11, 90]
hasil_urut = bubble_sort(nilai_siswa)
print(f"\\nHasil Akhir Terurut: {hasil_urut}")`,
    },
    stackQueue: {
      name: 'Struktur Data Stack & Queue',
      description: 'Simulasi LIFO (Stack) dan FIFO (Queue) dalam memori program.',
      code: `# 1. Simulasi Stack (LIFO: Last In First Out)
print("=== 1. SIMULASI STACK (LIFO) ===")
stack = []

def push(item):
    stack.append(item)
    print(f"Push({item}) -> Stack saat ini: {stack}")

def pop():
    if len(stack) > 0:
        item = stack.pop()
        print(f"Pop() -> Mengambil: '{item}' | Sisa: {stack}")
        return item
    print("Stack Kosong!")

push("Halaman Beranda")
push("Modul Informatika")
push("Laboratorium Virtual")
pop() # Kembali dari Lab
push("Kuis Interaktif")
pop()

# 2. Simulasi Queue (FIFO: First In First Out)
print("\\n=== 2. SIMULASI QUEUE (FIFO) ===")
from collections import deque
antrean_kantin = deque()

antrean_kantin.append("Siswa 1 (Budi)")
antrean_kantin.append("Siswa 2 (Siti)")
antrean_kantin.append("Siswa 3 (Ahmad)")
print("Antrean masuk:", list(antrean_kantin))

dilayani = antrean_kantin.popleft()
print(f"Melayani: {dilayani} | Sisa antrean: {list(antrean_kantin)}")`,
    },
    inputInteraktif: {
      name: 'Program Input Interaktif Siswa',
      description: 'Menggunakan perintah input() untuk menerima masukan dinamis.',
      code: `# Program Interaktif Menghitung Kelulusan Siswa
print("=== SISTEM EVALUASI NILAI SISWA ===")
nama = input("Masukkan nama lengkap: ")
kelas = input("Masukkan kelas (misal X-1): ")
nilai_str = input("Masukkan nilai ujian Informatika (0-100): ")

nilai = float(nilai_str)
kkm = 75.0

print("-" * 35)
print(f"Nama Siswa : {nama}")
print(f"Kelas      : {kelas}")
print(f"Nilai Ujian: {nilai}")

if nilai >= kkm:
    predikat = "SANGAT BAIK" if nilai >= 90 else "BAIK"
    print(f"Status     : LULUS ({predikat})")
    print("Selamat atas pencapaian belajarmu!")
else:
    print("Status     : PERLU REMEDIAL")
    print("Tetap semangat! Pelajari kembali materi modul.")`,
      defaultInput: "Budi Pratama\nX-2\n88.5"
    },
    deretPrima: {
      name: 'Deret Bilangan Prima (Loops & If)',
      description: 'Menemukan bilangan prima dalam rentang angka tertentu.',
      code: `# Program Mencari Bilangan Prima
def cek_prima(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

rentang_maks = 30
prima_ditemukan = []

for angka in range(1, rentang_maks + 1):
    if cek_prima(angka):
        prima_ditemukan.append(angka)

print(f"Bilangan prima antara 1 s.d {rentang_maks}:")
print(prima_ditemukan)
print(f"Total bilangan prima: {len(prima_ditemukan)} buah.")`,
    },
    custom: {
      name: 'Template Kosong (Ketik Sendiri)',
      description: 'Editor bersih untuk bebas mengetik dan bereksplorasi dengan sintaks Python.',
      code: `# Laboratorium Virtual Informatika SMA
# Silakan ketikkan kode Python Anda di sini dan klik "Jalankan Kode"

def sambutan():
    pesan = "Halo, selamat bereksplorasi di Lab Virtual Informatika!"
    print(pesan)
    
sambutan()
`,
    }
  };

  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('binarySearch');
  const [currentCode, setCurrentCode] = useState<string>(PRESET_CODES.binarySearch.code);
  const [standardInput, setStandardInput] = useState<string>('');
  const [showInputPanel, setShowInputPanel] = useState<boolean>(false);
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [codeError, setCodeError] = useState<string>('');
  const [lastRunMeta, setLastRunMeta] = useState<{ exitCode: number; executionTimeMs: number; success: boolean } | null>(null);
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false);
  const [executionCount, setExecutionCount] = useState<number>(0);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Auto-detect input() in user code to suggest or expand input panel
  useEffect(() => {
    if (currentCode.includes('input(') && !showInputPanel) {
      // If code requires input, remind student by providing access
    }
  }, [currentCode, showInputPanel]);

  // Handle Tab key inside textarea for real coding ergonomics
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Run shortcut: Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = editorRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      // Insert 4 spaces
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      setCurrentCode(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  // Sync scroll between textarea and line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Execute real code via server endpoint
  const handleRunCode = async () => {
    if (!currentCode.trim()) {
      setCodeError('Kode tidak boleh kosong. Silakan tuliskan baris instruksi terlebih dahulu.');
      return;
    }

    setIsRunningCode(true);
    setCodeError('');
    setCodeOutput('');
    setLastRunMeta(null);

    const startTime = Date.now();

    try {
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: currentCode,
          input: standardInput,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.stderr || `Gagal mengeksekusi kode (Status ${response.status})`);
      }

      const data: RunResult = await response.json();

      setCodeOutput(data.stdout || '');
      setCodeError(data.stderr || '');
      setLastRunMeta({
        exitCode: data.exitCode,
        executionTimeMs: data.executionTimeMs,
        success: data.success,
      });

      setExecutionCount(prev => prev + 1);

      if (data.success) {
        onAddXP(15);
      }
    } catch (err: any) {
      console.error('Code execution failed:', err);
      setCodeError(err.message || 'Terjadi kesalahan sistem saat menjalankan interpreter kode.');
      setLastRunMeta({
        exitCode: 1,
        executionTimeMs: Date.now() - startTime,
        success: false,
      });
    } finally {
      setIsRunningCode(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyOutput = () => {
    const textToCopy = [
      codeOutput ? `[STDOUT]\n${codeOutput}` : '',
      codeError ? `[STDERR]\n${codeError}` : ''
    ].filter(Boolean).join('\n\n');

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  const handleSelectPreset = (key: keyof typeof PRESET_CODES) => {
    setSelectedPresetKey(key);
    const selected = PRESET_CODES[key];
    if (selected) {
      setCurrentCode(selected.code);
      if ('defaultInput' in selected && selected.defaultInput) {
        setStandardInput(selected.defaultInput);
        setShowInputPanel(true);
      } else {
        setStandardInput('');
      }
      setCodeOutput('');
      setCodeError('');
      setLastRunMeta(null);
    }
  };

  const insertSnippet = (snippet: string) => {
    const textarea = editorRef.current;
    if (!textarea) {
      setCurrentCode(prev => prev + '\n' + snippet);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const prefix = value.substring(0, start);
    const suffix = value.substring(end);
    const separator = prefix.length > 0 && !prefix.endsWith('\n') ? '\n' : '';

    const newCode = prefix + separator + snippet + suffix;
    setCurrentCode(newCode);

    setTimeout(() => {
      textarea.focus();
      const newPos = start + separator.length + snippet.length;
      textarea.selectionStart = textarea.selectionEnd = newPos;
    }, 0);
  };

  // Helper diagnosis message for common Python student errors
  const getErrorDiagnosis = (errorText: string) => {
    if (errorText.includes('IndentationError')) {
      return {
        title: 'Kesalahan Indentasi (IndentationError)',
        desc: 'Python menggunakan spasi di awal baris untuk menentukan blok kode fungsi atau perulangan. Pastikan setiap blok menggunakan 4 spasi secara seragam.',
      };
    }
    if (errorText.includes('SyntaxError')) {
      return {
        title: 'Kesalahan Sintaks (SyntaxError)',
        desc: 'Terdapat simbol atau format penulisan yang belum lengkap, seperti tanda titik dua (:) di akhir if/def/for, tanda kurung (), atau tanda petik string yang belum tertutup.',
      };
    }
    if (errorText.includes('NameError')) {
      return {
        title: 'Variabel / Fungsi Belum Didefinisikan (NameError)',
        desc: 'Nama variabel atau fungsi yang Anda panggil belum dibuat sebelumnya atau salah ketik (typo). Perhatikan huruf besar dan kecil (case-sensitive).',
      };
    }
    if (errorText.includes('ZeroDivisionError')) {
      return {
        title: 'Pembagian dengan Nol (ZeroDivisionError)',
        desc: 'Program mencoba membagi angka dengan 0. Dalam matematika dan komputasi, pembagian dengan nol tidak terdefinisi.',
      };
    }
    if (errorText.includes('TypeError')) {
      return {
        title: 'Tipe Data Tidak Cocok (TypeError)',
        desc: 'Operasi dilakukan pada tipe data yang tidak bersesuaian, contohnya menjumlahkan angka integer dengan teks string tanpa mengubahnya dengan int() atau str().',
      };
    }
    if (errorText.includes('IndexError')) {
      return {
        title: 'Indeks di Luar Jangkauan (IndexError)',
        desc: 'Program mencoba mengakses elemen list pada nomor indeks yang tidak ada. Ingat bahwa indeks Python dimulai dari angka 0.',
      };
    }
    if (errorText.includes('EOFError')) {
      return {
        title: 'Memerlukan Masukan Data (EOFError)',
        desc: 'Kode menggunakan perintah input(), namun tidak ada data yang masuk. Buka panel "Input Siswa (stdin)" di bawah editor dan ketikkan nilai masukan.',
      };
    }
    if (errorText.includes('Timeout')) {
      return {
        title: 'Waktu Eksekusi Habis (Timeout > 5 Detik)',
        desc: 'Program memakan waktu terlalu lama. Periksa kemungkinan perulangan tak terbatas (infinite loop while True) atau fungsi rekursi tanpa kondisi berhenti.',
      };
    }
    return null;
  };

  const lineCount = currentCode.split('\n').length;
  const errorDiagnosis = codeError ? getErrorDiagnosis(codeError) : null;

  // --- 2. Logic Gate Simulator State ---
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);
  const [selectedGate, setSelectedGate] = useState<'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR'>('AND');

  const calculateGateOutput = (a: number, b: number, gate: string) => {
    switch (gate) {
      case 'AND': return a && b ? 1 : 0;
      case 'OR': return a || b ? 1 : 0;
      case 'NOT': return a === 0 ? 1 : 0;
      case 'XOR': return a !== b ? 1 : 0;
      case 'NAND': return !(a && b) ? 1 : 0;
      case 'NOR': return !(a || b) ? 1 : 0;
      default: return 0;
    }
  };

  const gateOutput = calculateGateOutput(inputA, inputB, selectedGate);

  // --- 3. Subnetting & CIDR Calculator State ---
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.0');
  const [cidrPrefix, setCidrPrefix] = useState<number>(26);

  const calculateSubnet = (ip: string, prefix: number) => {
    const totalHosts = Math.pow(2, 32 - prefix);
    const usableHosts = Math.max(0, totalHosts - 2);

    const maskBits = ''.padStart(prefix, '1').padEnd(32, '0');
    const octets = [];
    for (let i = 0; i < 4; i++) {
      octets.push(parseInt(maskBits.substring(i * 8, (i + 1) * 8), 2));
    }
    const subnetMask = octets.join('.');

    return {
      totalHosts,
      usableHosts,
      subnetMask,
      networkId: ip.split('.').slice(0, 3).join('.') + '.0',
      broadcastId: ip.split('.').slice(0, 3).join('.') + '.' + (totalHosts - 1),
      usableRange: `${ip.split('.').slice(0, 3).join('.')}.1 - ${ip.split('.').slice(0, 3).join('.')}.${totalHosts - 2}`,
    };
  };

  const subnetResult = calculateSubnet(ipAddress, cidrPrefix);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Laboratorium Virtual Aktif
            </span>
            <span className="text-xs text-slate-600 font-medium">
              Eksekusi Sintaks Python 3 • CPython Interpreter
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Laboratorium Informatika Digital
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ketik sintaks pemrograman bebas, jalankan baris instruksi secara langsung, dan amati keluaran terminal standar.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
          <button
            id="tab-btn-python"
            onClick={() => setActiveTab('python')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'python'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Python IDE & Sandbox</span>
          </button>
          <button
            id="tab-btn-logic"
            onClick={() => setActiveTab('logic-gate')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'logic-gate'
                ? 'bg-white text-purple-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Gerbang Logika</span>
          </button>
          <button
            id="tab-btn-subnet"
            onClick={() => setActiveTab('subnet')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'subnet'
                ? 'bg-white text-amber-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>Subnetting CIDR</span>
          </button>
        </div>
      </div>

      {/* --- TAB 1: PYTHON SANDBOX (REAL EXECUTABLE SYNTAX) --- */}
      {activeTab === 'python' && (
        <div className="space-y-4">
          {/* Quick Snippets & Presets Toolbar */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-blue-500" />
                Pilih Preset Kurikulum:
              </span>
              <select
                id="preset-code-selector"
                value={selectedPresetKey}
                onChange={(e) => handleSelectPreset(e.target.value as keyof typeof PRESET_CODES)}
                className="bg-slate-50 text-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-200 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(PRESET_CODES).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Insertion Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-500">Sisipkan Sintaks:</span>
              <button
                type="button"
                onClick={() => insertSnippet('print("Halo Dunia!")')}
                className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                title="Sisipkan perintah print()"
              >
                + print()
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('for i in range(5):\n    print(f"Iterasi ke-{i}")')}
                className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                title="Sisipkan perulangan for-loop"
              >
                + for loop
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('if nilai >= 75:\n    print("Lulus")\nelse:\n    print("Remedial")')}
                className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                title="Sisipkan percabangan if-else"
              >
                + if-else
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('nama = input("Masukkan nama: ")\nprint("Halo,", nama)')}
                className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                title="Sisipkan perintah input() interaktif"
              >
                + input()
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('def hitung_luas(p, l):\n    return p * l\n\nprint("Luas:", hitung_luas(10, 5))')}
                className="px-2 py-1 rounded-md text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                title="Sisipkan definisi fungsi def"
              >
                + def fungsi()
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Code Editor Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
                {/* Editor Header Bar */}
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2.5 text-xs font-bold text-slate-200">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>Editor Python 3.10</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                      {lineCount} baris
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowInputPanel(!showInputPanel)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center space-x-1.5 ${
                        showInputPanel || currentCode.includes('input(')
                          ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                      title="Buka panel input data untuk perintah input()"
                    >
                      <Keyboard className="w-3.5 h-3.5" />
                      <span>Input Siswa (stdin)</span>
                      {currentCode.includes('input(') && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700 flex items-center space-x-1"
                      title="Salin seluruh kode ke clipboard"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Tersalin' : 'Salin'}</span>
                    </button>

                    {onOpenAITutorWithLab && (
                      <button
                        type="button"
                        id="lab-tanya-ai-btn"
                        onClick={() => onOpenAITutorWithLab({
                          code: currentCode,
                          error: codeError || undefined,
                          topic: PRESET_CODES[selectedPresetKey as keyof typeof PRESET_CODES]?.name || 'Praktikum Python SMA'
                        })}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white text-xs font-semibold transition-all border border-indigo-500/40 flex items-center space-x-1.5 shadow-xs"
                        title="Tanya Guru AI untuk review kode atau bantuan"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span className="hidden sm:inline">Tanya AI</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setCurrentCode('')}
                      className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-all border border-slate-700"
                      title="Bersihkan editor kode"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id="run-python-code-btn"
                      onClick={handleRunCode}
                      disabled={isRunningCode}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2"
                    >
                      <Play className={`w-3.5 h-3.5 fill-white ${isRunningCode ? 'animate-spin' : ''}`} />
                      <span>{isRunningCode ? 'Mengeksekusi...' : 'Jalankan Kode'}</span>
                    </button>
                  </div>
                </div>

                {/* Editor Body with Line Numbers */}
                <div className="relative flex bg-slate-950 min-h-[380px] max-h-[500px]">
                  {/* Line Number Gutter */}
                  <div
                    ref={lineNumbersRef}
                    className="select-none py-3.5 px-3 bg-slate-900/50 border-r border-slate-800/80 text-right font-mono text-xs text-slate-500 overflow-hidden shrink-0"
                    style={{ minWidth: '44px' }}
                  >
                    {Array.from({ length: lineCount }).map((_, idx) => (
                      <div key={idx} className="leading-6">
                        {idx + 1}
                      </div>
                    ))}
                  </div>

                  {/* Textarea Code Editor */}
                  <textarea
                    ref={editorRef}
                    value={currentCode}
                    onChange={(e) => setCurrentCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    rows={18}
                    className="w-full py-3.5 px-4 bg-slate-950 text-emerald-300 font-mono text-xs leading-6 focus:outline-hidden resize-none selection:bg-blue-600 selection:text-white"
                    placeholder="# Ketikkan sintaks Python Anda di sini..."
                    spellCheck={false}
                  />
                </div>

                {/* Optional Standard Input (stdin) Panel */}
                {showInputPanel && (
                  <div className="bg-slate-900/90 border-t border-slate-800 p-3 sm:p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
                        <Keyboard className="w-3.5 h-3.5 text-amber-400" />
                        <span>Masukan Standar Siswa (Standard Input / stdin)</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Dipakai saat program menjalankan perintah <code>input()</code>
                      </span>
                    </div>
                    <textarea
                      value={standardInput}
                      onChange={(e) => setStandardInput(e.target.value)}
                      rows={3}
                      className="w-full p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-200 focus:outline-hidden focus:border-amber-500/60 leading-relaxed"
                      placeholder="Ketik data masukan di sini (jika ada beberapa input(), pisahkan per baris baru)..."
                    />
                  </div>
                )}

                {/* Editor Footer Status Bar */}
                <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-mono">● Python 3 (Real CPython Engine)</span>
                    <span>Karakter: {currentCode.length}</span>
                    <span>Baris: {lineCount}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-500">
                    <span>Pintasan: <strong>Ctrl + Enter</strong> untuk Menjalankan</span>
                    <span>•</span>
                    <span><strong>Tab</strong> untuk Indentasi (4 spasi)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Console Output Column */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden h-full flex flex-col min-h-[480px]">
                {/* Console Header */}
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
                    <Terminal className="w-4 h-4 text-sky-400" />
                    <span>Terminal Keluaran (Console Output)</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {(codeOutput || codeError) && (
                      <button
                        type="button"
                        onClick={handleCopyOutput}
                        className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center space-x-1"
                        title="Salin hasil eksekusi terminal"
                      >
                        {copiedOutput ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedOutput ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setCodeOutput('');
                        setCodeError('');
                        setLastRunMeta(null);
                      }}
                      className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      Bersihkan
                    </button>
                  </div>
                </div>

                {/* Execution Status Badge */}
                {lastRunMeta && (
                  <div className={`px-4 py-2 text-xs font-medium border-b flex items-center justify-between ${
                    lastRunMeta.success
                      ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-900/60 text-rose-300'
                  }`}>
                    <div className="flex items-center space-x-1.5">
                      {lastRunMeta.success ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )}
                      <span>
                        {lastRunMeta.success
                          ? 'Selesai: Program Sukses Dieksekusi'
                          : `Kesalahan Program (Exit Code ${lastRunMeta.exitCode})`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[11px] font-mono opacity-80">
                      <Clock className="w-3 h-3 inline mr-0.5" />
                      <span>{lastRunMeta.executionTimeMs} ms</span>
                    </div>
                  </div>
                )}

                {/* Console Output Area */}
                <div className="p-4 flex-1 font-mono text-xs overflow-y-auto whitespace-pre-wrap leading-relaxed space-y-3">
                  {/* Standard Output */}
                  {codeOutput && (
                    <div className="text-slate-100 selection:bg-emerald-600 selection:text-white">
                      {codeOutput}
                    </div>
                  )}

                  {/* Standard Error */}
                  {codeError && (
                    <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-900/80 text-rose-200 font-mono text-xs leading-relaxed">
                      <div className="font-bold text-rose-400 mb-1 flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Pesan Kesalahan Sistem (stderr):</span>
                      </div>
                      <div className="whitespace-pre-wrap">{codeError}</div>
                    </div>
                  )}

                  {/* Intelligent Student Diagnosis Card */}
                  {errorDiagnosis && (
                    <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-200 text-xs space-y-2.5 font-sans">
                      <div className="font-bold flex items-center space-x-1.5 text-amber-300">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{errorDiagnosis.title}</span>
                      </div>
                      <p className="text-[11px] text-amber-200/90 leading-relaxed font-sans">
                        {errorDiagnosis.desc}
                      </p>

                      {onOpenAITutorWithLab && (
                        <button
                          type="button"
                          id="ask-ai-error-fix-btn"
                          onClick={() => onOpenAITutorWithLab({
                            code: currentCode,
                            error: codeError,
                            topic: PRESET_CODES[selectedPresetKey as keyof typeof PRESET_CODES]?.name || 'Praktikum Python SMA'
                          })}
                          className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Konsultasikan Solusi Error Ini ke Guru AI</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Empty State */}
                  {!codeOutput && !codeError && !isRunningCode && (
                    <div className="text-slate-500 italic flex flex-col items-center justify-center h-48 text-center space-y-2">
                      <Terminal className="w-8 h-8 opacity-40" />
                      <p className="text-xs">
                        Ketik sintaks di editor sebelah kiri, lalu klik tombol <strong>"Jalankan Kode"</strong>.
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Hasil instruksi print() dan keluaran program akan langsung tampil di sini.
                      </p>
                    </div>
                  )}

                  {/* Running Loader */}
                  {isRunningCode && (
                    <div className="flex items-center space-x-2 text-emerald-400 italic">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Sedang mengompilasi dan mengeksekusi sintaks Python...</span>
                    </div>
                  )}
                </div>

                {/* Footer Notes */}
                <div className="p-3 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Setiap eksekusi sukses memberikan <strong>+15 XP</strong>
                  </span>
                  <span>Total Uji Coba: <strong>{executionCount}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: LOGIC GATE SIMULATOR --- */}
      {activeTab === 'logic-gate' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              Simulator Sirkuit Gerbang Logika Digital
            </h2>
            <p className="text-xs text-slate-600">
              Ubah status switch input (0 = Low / Off, 1 = High / On) dan amati status lampu indikator keluaran (Output) serta tabel kebenarannya.
            </p>
          </div>

          {/* Interactive Circuit Canvas Display */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-around gap-8">
            {/* Inputs A and B */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                <span className="text-sm font-bold text-white font-mono">Input A:</span>
                <button
                  id="toggle-input-a-btn"
                  onClick={() => setInputA(inputA === 1 ? 0 : 1)}
                  className={`w-12 h-10 rounded-xl font-bold font-mono text-sm shadow-md transition-all ${
                    inputA === 1 ? 'bg-emerald-500 text-white ring-2 ring-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {inputA}
                </button>
                <span className="text-xs text-slate-400">({inputA === 1 ? 'HIGH / 5V' : 'LOW / 0V'})</span>
              </div>

              {selectedGate !== 'NOT' && (
                <div className="flex items-center space-x-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <span className="text-sm font-bold text-white font-mono">Input B:</span>
                  <button
                    id="toggle-input-b-btn"
                    onClick={() => setInputB(inputB === 1 ? 0 : 1)}
                    className={`w-12 h-10 rounded-xl font-bold font-mono text-sm shadow-md transition-all ${
                      inputB === 1 ? 'bg-emerald-500 text-white ring-2 ring-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {inputB}
                  </button>
                  <span className="text-xs text-slate-400">({inputB === 1 ? 'HIGH / 5V' : 'LOW / 0V'})</span>
                </div>
              )}
            </div>

            {/* Central Logic Gate Box */}
            <div className="text-center space-y-3">
              <div className="px-6 py-4 rounded-2xl bg-indigo-600/20 border-2 border-indigo-500/50 backdrop-blur-md text-white shadow-xl">
                <div className="text-xs uppercase tracking-widest text-indigo-300 font-bold">Gerbang Logika</div>
                <div className="text-2xl font-black text-indigo-400 mt-1">{selectedGate}</div>
              </div>
              <div className="flex flex-wrap justify-center gap-1.5 max-w-xs">
                {(['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR'] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGate(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedGate === g
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Output Indicator Bulb */}
            <div className="flex flex-col items-center space-y-3 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 min-w-[160px]">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                gateOutput === 1
                  ? 'bg-amber-400 text-slate-950 shadow-[0_0_40px_rgba(251,191,36,0.8)] scale-110'
                  : 'bg-slate-800 text-slate-600 border border-slate-700'
              }`}>
                <Zap className={`w-8 h-8 ${gateOutput === 1 ? 'fill-amber-400 text-slate-950' : 'text-slate-600'}`} />
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-400 font-semibold uppercase">Output Y:</div>
                <div className="text-xl font-black font-mono text-white mt-0.5">
                  {gateOutput} ({gateOutput === 1 ? 'MENYALA' : 'MATI'})
                </div>
              </div>
            </div>
          </div>

          {/* Truth Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Tabel Kebenaran (Truth Table) Gerbang {selectedGate}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3">Input A</th>
                    {selectedGate !== 'NOT' && <th className="p-3">Input B</th>}
                    <th className="p-3 text-blue-600">Output Y ({selectedGate})</th>
                    <th className="p-3">Status Rangkaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    { a: 0, b: 0 },
                    { a: 0, b: 1 },
                    { a: 1, b: 0 },
                    { a: 1, b: 1 }
                  ].map((row, idx) => {
                    if (selectedGate === 'NOT' && row.b === 1) return null;
                    const res = calculateGateOutput(row.a, row.b, selectedGate);
                    const isCurrentActive = row.a === inputA && (selectedGate === 'NOT' || row.b === inputB);

                    return (
                      <tr 
                        key={idx}
                        className={`transition-colors ${
                          isCurrentActive ? 'bg-blue-50 font-bold text-blue-900' : 'bg-white text-slate-700'
                        }`}
                      >
                        <td className="p-3 font-mono">{row.a}</td>
                        {selectedGate !== 'NOT' && <td className="p-3 font-mono">{row.b}</td>}
                        <td className="p-3 font-mono text-base font-bold text-blue-600">{res}</td>
                        <td className="p-3">
                          {isCurrentActive && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px]">
                              Kondisi Aktif Sekarang
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: SUBNETTING CALCULATOR --- */}
      {activeTab === 'subnet' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              Kalkulator Subnetting IPv4 & Notasi CIDR
            </h2>
            <p className="text-xs text-slate-600">
              Alat bantu perhitungan jaringan untuk menentukan Network ID, Broadcast ID, Subnet Mask, dan Usable Host Range.
            </p>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Alamat IP (IPv4 Address):</label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                placeholder="192.168.1.0"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Prefix CIDR (/24 - /30):</label>
              <select
                value={cidrPrefix}
                onChange={(e) => setCidrPrefix(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value={24}>/24 (255.255.255.0 - 254 Host)</option>
                <option value={25}>/25 (255.255.255.128 - 126 Host)</option>
                <option value={26}>/26 (255.255.255.192 - 62 Host)</option>
                <option value={27}>/27 (255.255.255.224 - 30 Host)</option>
                <option value={28}>/28 (255.255.255.240 - 14 Host)</option>
                <option value={29}>/29 (255.255.255.248 - 6 Host)</option>
                <option value={30}>/30 (255.255.255.252 - 2 Host Point-to-Point)</option>
              </select>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
              <div className="text-[11px] font-bold text-blue-900 uppercase">Subnet Mask</div>
              <div className="text-base font-black font-mono text-blue-600">{subnetResult.subnetMask}</div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="text-[11px] font-bold text-emerald-900 uppercase">Jumlah Usable Host</div>
              <div className="text-base font-black font-mono text-emerald-600">{subnetResult.usableHosts} Host Komputer</div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
              <div className="text-[11px] font-bold text-purple-900 uppercase">Network ID</div>
              <div className="text-base font-black font-mono text-purple-600">{subnetResult.networkId}</div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="text-[11px] font-bold text-amber-900 uppercase">Broadcast ID</div>
              <div className="text-base font-black font-mono text-amber-600">{subnetResult.broadcastId}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="font-bold text-slate-900">
              Rentang IP Komputer yang Valid (Usable IP Range):
            </div>
            <div className="font-mono text-sm font-bold text-emerald-600">
              {subnetResult.usableRange}
            </div>
            <p className="text-[11px] text-slate-600">
              *Catatan: Rumus Usable Host = 2^(32 - prefix) - 2 (karena Network ID dan Broadcast ID tidak boleh dipasang pada komputer host).
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
