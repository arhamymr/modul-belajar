import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  Zap, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Eye, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Cpu, 
  Network, 
  Database, 
  Code2, 
  Binary, 
  RefreshCw,
  Sliders,
  Info,
  Server,
  Laptop,
  Wifi,
  Globe,
  CornerDownRight,
  TrendingUp,
  Key,
  Mail,
  AlertTriangle,
  FileCheck,
  Share2,
  HardDrive,
  Filter,
  Split,
  Scale,
  Bot
} from '../icons/phosphor';
import { InformaticsElement } from '../types';

export type SimulationType = 
  | 'stack-queue-visualizer'
  | 'greedy-coin-visualizer'
  | 'binary-search-visualizer'
  | 'recursion-visualizer'
  | 'logic-gate-simulator'
  | 'cpu-cycle-simulator'
  | 'network-topology-simulator'
  | 'subnet-calc'
  | 'sql-join-visualizer'
  | 'data-chart-visualizer'
  | 'phishing-detector-simulator'
  | 'two-factor-auth-simulator'
  | 'graph-traversal-simulator'
  | 'python-function-debugger-simulator'
  | 'memory-hierarchy-simulator'
  | 'firewall-packet-simulator'
  | 'database-normalization-simulator'
  | 'ai-bias-detector-simulator';

interface ModuleVisualSimulatorProps {
  type: SimulationType;
  element?: InformaticsElement;
  onAddXP?: (amount: number) => void;
  compact?: boolean;
}

export const ModuleVisualSimulator: React.FC<ModuleVisualSimulatorProps> = ({
  type,
  element = 'BK',
  onAddXP,
  compact = false,
}) => {
  // Reward XP on first interaction
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const triggerXP = (amount = 15) => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (onAddXP) onAddXP(amount);
    }
  };

  // -------------------------------------------------------------
  // 1. BK: STACK & QUEUE VISUALIZER
  // -------------------------------------------------------------
  const [sqMode, setSqMode] = useState<'stack' | 'queue'>('stack');
  const [stackItems, setStackItems] = useState<string[]>([
    '📚 Modul 1 (BK)',
    '📘 Modul 2 (AP)',
    '📙 Modul 3 (SK)'
  ]);
  const [queueItems, setQueueItems] = useState<string[]>([
    '👤 Siswa A (Tiket #1)',
    '👤 Siswa B (Tiket #2)',
    '👤 Siswa C (Tiket #3)'
  ]);
  const [sqInput, setSqInput] = useState<string>('');
  const [sqLog, setSqLog] = useState<string>('Sistem siap. Silakan coba operasi Push/Pop atau Enqueue/Dequeue.');
  const [lastAction, setLastAction] = useState<string>('');

  const handlePushStack = () => {
    const item = sqInput.trim() || `📗 Data #${stackItems.length + 1}`;
    if (stackItems.length >= 6) {
      setSqLog('⚠️ Stack Overflow! Kapasitas tumpukan penuh (maksimal 6 elemen).');
      return;
    }
    setStackItems(prev => [...prev, item]);
    setSqInput('');
    setSqLog(`✅ Push("${item}") berhasil ditambahkan ke ATAS tumpukan (TOP).`);
    setLastAction('push');
    triggerXP(10);
  };

  const handlePopStack = () => {
    if (stackItems.length === 0) {
      setSqLog('⚠️ Stack Underflow! Tumpukan kosong, tidak ada elemen untuk di-pop.');
      return;
    }
    const popped = stackItems[stackItems.length - 1];
    setStackItems(prev => prev.slice(0, prev.length - 1));
    setSqLog(`🔻 Pop() mengambil elemen teratas: "${popped}". Prinsip LIFO berlaku!`);
    setLastAction('pop');
    triggerXP(10);
  };

  const handleEnqueue = () => {
    const item = sqInput.trim() || `👤 Pelanggan #${queueItems.length + 1}`;
    if (queueItems.length >= 6) {
      setSqLog('⚠️ Queue Penuh! Maksimal 6 antrean.');
      return;
    }
    setQueueItems(prev => [...prev, item]);
    setSqInput('');
    setSqLog(`✅ Enqueue("${item}") mengantre di posisi BELAKANG (REAR/TAIL).`);
    setLastAction('enqueue');
    triggerXP(10);
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) {
      setSqLog('⚠️ Antrean kosong! Tidak ada pelanggan untuk dilayani.');
      return;
    }
    const dequeued = queueItems[0];
    setQueueItems(prev => prev.slice(1));
    setSqLog(`⏩ Dequeue() melayani elemen paling DEPAN: "${dequeued}". Prinsip FIFO berlaku!`);
    setLastAction('dequeue');
    triggerXP(10);
  };

  const handleResetSQ = () => {
    if (sqMode === 'stack') {
      setStackItems(['📚 Modul 1 (BK)', '📘 Modul 2 (AP)', '📙 Modul 3 (SK)']);
      setSqLog('Tumpukan Stack direset ke kondisi awal.');
    } else {
      setQueueItems(['👤 Siswa A (Tiket #1)', '👤 Siswa B (Tiket #2)', '👤 Siswa C (Tiket #3)']);
      setSqLog('Antrean Queue direset ke kondisi awal.');
    }
  };

  // -------------------------------------------------------------
  // 2. AP: BINARY SEARCH VISUALIZER
  // -------------------------------------------------------------
  const sortedArray = [4, 9, 15, 23, 38, 45, 52, 67, 73, 81, 88, 94];
  const [bsTarget, setBsTarget] = useState<number>(67);
  const [bsLow, setBsLow] = useState<number>(0);
  const [bsHigh, setBsHigh] = useState<number>(sortedArray.length - 1);
  const [bsMid, setBsMid] = useState<number | null>(Math.floor((0 + sortedArray.length - 1) / 2));
  const [bsStep, setBsStep] = useState<number>(0);
  const [bsFound, setBsFound] = useState<boolean | null>(null);
  const [bsLogs, setBsLogs] = useState<string[]>(['Klik "Langkah Berikutnya" untuk menelusuri pencarian biner O(log n).']);

  const handleResetBS = () => {
    setBsLow(0);
    setBsHigh(sortedArray.length - 1);
    setBsMid(Math.floor((0 + sortedArray.length - 1) / 2));
    setBsStep(0);
    setBsFound(null);
    setBsLogs(['Pencarian direset. Target: ' + bsTarget]);
  };

  const handleNextStepBS = () => {
    if (bsFound !== null) return;
    triggerXP(15);
    const newStep = bsStep + 1;
    const currentMid = Math.floor((bsLow + bsHigh) / 2);
    const midVal = sortedArray[currentMid];

    if (midVal === bsTarget) {
      setBsMid(currentMid);
      setBsFound(true);
      setBsStep(newStep);
      setBsLogs(prev => [
        `🎯 DITEMUKAN! Angka ${bsTarget} ada di indeks [${currentMid}] pada langkah ke-${newStep}.`,
        ...prev
      ]);
      return;
    }

    if (bsLow >= bsHigh) {
      setBsFound(false);
      setBsStep(newStep);
      setBsLogs(prev => [`❌ Target ${bsTarget} tidak ditemukan dalam array.`, ...prev]);
      return;
    }

    if (midVal < bsTarget) {
      const nextLow = currentMid + 1;
      const nextMid = Math.floor((nextLow + bsHigh) / 2);
      setBsLow(nextLow);
      setBsMid(nextMid);
      setBsStep(newStep);
      setBsLogs(prev => [
        `Langkah ${newStep}: Nilai tengah [${currentMid}]=${midVal} < ${bsTarget}. Buang paruh kiri, geser Low ke [${nextLow}].`,
        ...prev
      ]);
    } else {
      const nextHigh = currentMid - 1;
      const nextMid = Math.floor((bsLow + nextHigh) / 2);
      setBsHigh(nextHigh);
      setBsMid(nextMid);
      setBsStep(newStep);
      setBsLogs(prev => [
        `Langkah ${newStep}: Nilai tengah [${currentMid}]=${midVal} > ${bsTarget}. Buang paruh kanan, geser High ke [${nextHigh}].`,
        ...prev
      ]);
    }
  };

  // -------------------------------------------------------------
  // 3. SK: LOGIC GATES SCHEMATIC SIMULATOR
  // -------------------------------------------------------------
  const [gateA, setGateA] = useState<number>(1);
  const [gateB, setGateB] = useState<number>(0);
  const [selectedGateType, setSelectedGateType] = useState<'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR'>('AND');

  const computeGate = (a: number, b: number, g: string) => {
    switch (g) {
      case 'AND': return a && b ? 1 : 0;
      case 'OR': return a || b ? 1 : 0;
      case 'NOT': return a === 0 ? 1 : 0;
      case 'XOR': return a !== b ? 1 : 0;
      case 'NAND': return !(a && b) ? 1 : 0;
      case 'NOR': return !(a || b) ? 1 : 0;
      default: return 0;
    }
  };

  const gateResult = computeGate(gateA, gateB, selectedGateType);

  // -------------------------------------------------------------
  // 4. JKI: NETWORK TOPOLOGY & PACKET TRANSMISSION SIMULATOR
  // -------------------------------------------------------------
  const [topology, setTopology] = useState<'star' | 'bus' | 'ring' | 'mesh'>('star');
  const [sourceNode, setSourceNode] = useState<string>('PC-1');
  const [targetNode, setTargetNode] = useState<string>('PC-3');
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]);
  const [packetStatus, setPacketStatus] = useState<string>('Pilih Pengirim & Penerima, lalu klik "Kirim Paket Data".');
  const [isSendingPacket, setIsSendingPacket] = useState<boolean>(false);

  const toggleBrokenLink = (linkId: string) => {
    setBrokenLinks(prev => 
      prev.includes(linkId) ? prev.filter(l => l !== linkId) : [...prev, linkId]
    );
  };

  const handleSendPacket = () => {
    setIsSendingPacket(true);
    triggerXP(20);
    setPacketStatus(`🚀 Mengirim paket dari ${sourceNode} menuju ${targetNode} pada topologi ${topology.toUpperCase()}...`);

    setTimeout(() => {
      // Logic for transmission check
      let isSuccess = true;
      if (topology === 'bus' && brokenLinks.includes('backbone')) {
        isSuccess = false;
      } else if (topology === 'star' && brokenLinks.includes('switch')) {
        isSuccess = false;
      } else if (topology === 'ring' && brokenLinks.length > 1) {
        isSuccess = false;
      }

      if (isSuccess) {
        setPacketStatus(`✅ SUKSES: Paket data berhasil sampai di ${targetNode}! Protokol TCP memberikan ACK 200 OK.`);
      } else {
        setPacketStatus(`❌ GAGAL: Terjadi collision atau kabel terputus! Topologi mengalami kegagalan transmisi.`);
      }
      setIsSendingPacket(false);
    }, 1000);
  };

  // -------------------------------------------------------------
  // 5. AD: SQL JOIN & VENN DIAGRAM VISUALIZER
  // -------------------------------------------------------------
  const [sqlJoinType, setSqlJoinType] = useState<'INNER' | 'LEFT' | 'RIGHT' | 'FULL'>('INNER');
  const tableA = [
    { id: 1, nama: 'Ahmad Fauzi', kelas: 'X-1' },
    { id: 2, nama: 'Siti Rahma', kelas: 'X-1' },
    { id: 3, nama: 'Budi Santoso', kelas: 'X-2' },
    { id: 4, nama: 'Dewi Lestari', kelas: 'X-3' }
  ];
  const tableB = [
    { siswa_id: 1, mata_pelajaran: 'Informatika', nilai: 95 },
    { siswa_id: 2, mata_pelajaran: 'Informatika', nilai: 88 },
    { siswa_id: 3, mata_pelajaran: 'Informatika', nilai: 78 },
    { siswa_id: 5, mata_pelajaran: 'Informatika', nilai: 90 } // Siswa ID 5 tidak ada di Table A
  ];

  const getJoinResults = () => {
    if (sqlJoinType === 'INNER') {
      return tableA
        .filter(a => tableB.some(b => b.siswa_id === a.id))
        .map(a => {
          const b = tableB.find(x => x.siswa_id === a.id);
          return { id: a.id, nama: a.nama, mapel: b?.mata_pelajaran, nilai: b?.nilai, status: 'Match (Inner)' };
        });
    } else if (sqlJoinType === 'LEFT') {
      return tableA.map(a => {
        const b = tableB.find(x => x.siswa_id === a.id);
        return { id: a.id, nama: a.nama, mapel: b?.mata_pelajaran || 'NULL', nilai: b?.nilai ?? 'NULL', status: b ? 'Match' : 'Left Only' };
      });
    } else if (sqlJoinType === 'RIGHT') {
      return tableB.map(b => {
        const a = tableA.find(x => x.id === b.siswa_id);
        return { id: b.siswa_id, nama: a?.nama || 'NULL (Data Hilang)', mapel: b.mata_pelajaran, nilai: b.nilai, status: a ? 'Match' : 'Right Only' };
      });
    } else {
      // FULL OUTER
      const matched = tableA.map(a => {
        const b = tableB.find(x => x.siswa_id === a.id);
        return { id: a.id, nama: a.nama, mapel: b?.mata_pelajaran || 'NULL', nilai: b?.nilai ?? 'NULL', status: b ? 'Match' : 'Left Outer' };
      });
      const rightOnly = tableB.filter(b => !tableA.some(a => a.id === b.siswa_id)).map(b => ({
        id: b.siswa_id,
        nama: 'NULL',
        mapel: b.mata_pelajaran,
        nilai: b.nilai,
        status: 'Right Outer'
      }));
      return [...matched, ...rightOnly];
    }
  };

  // -------------------------------------------------------------
  // 6. DSI: PHISHING & 2FA SECURITY SIMULATOR
  // -------------------------------------------------------------
  // 6. DSI: PHISHING DETECTOR & 2FA SIMULATOR
  // -------------------------------------------------------------
  const [phishingStep, setPhishingStep] = useState<'email' | '2fa'>('email');
  const [inspectedFlags, setInspectedFlags] = useState<string[]>([]);
  const [totpCode, setTotpCode] = useState<string>('482910');
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [authStatus, setAuthStatus] = useState<string | null>(null);

  const toggleFlag = (flagName: string) => {
    setInspectedFlags(prev => 
      prev.includes(flagName) ? prev.filter(f => f !== flagName) : [...prev, flagName]
    );
    triggerXP(10);
  };

  const handleVerify2FA = () => {
    if (enteredOtp === totpCode) {
      setAuthStatus('success');
      triggerXP(25);
    } else {
      setAuthStatus('failed');
    }
  };

  // -------------------------------------------------------------
  // 7. BK: GRAPH TRAVERSAL & SHORTEST PATH VISUALIZER
  // -------------------------------------------------------------
  const [graphStart, setGraphStart] = useState<string>('A');
  const [graphTarget, setGraphTarget] = useState<string>('E');
  const [graphVisited, setGraphVisited] = useState<string[]>(['A']);
  const [graphActivePath, setGraphActivePath] = useState<string[]>(['A']);
  const [graphCost, setGraphCost] = useState<number>(0);
  const [graphLog, setGraphLog] = useState<string>('Pilih Simpul Awal dan Simpul Tujuan, lalu klik "Jalankan Algoritma Dijkstra".');

  const handleRunDijkstra = () => {
    triggerXP(20);
    // Standard shortest paths in sample graph:
    // A -> B (cost 4), A -> C (cost 2)
    // C -> B (cost 1), C -> D (cost 5), B -> D (cost 1), B -> E (cost 3), D -> E (cost 1)
    if (graphStart === 'A' && graphTarget === 'E') {
      setGraphVisited(['A', 'C', 'B', 'D', 'E']);
      setGraphActivePath(['A', 'C', 'B', 'D', 'E']);
      setGraphCost(5); // A->C(2) + C->B(1) + B->D(1) + D->E(1) = 5
      setGraphLog('🎯 Jalur Terpendek Dijkstra Ditemukan: A ➔ C ➔ B ➔ D ➔ E (Total Bobot: 5). Lebih optimal dari jalur langsung!');
    } else if (graphStart === 'A' && graphTarget === 'D') {
      setGraphVisited(['A', 'C', 'B', 'D']);
      setGraphActivePath(['A', 'C', 'B', 'D']);
      setGraphCost(4);
      setGraphLog('🎯 Jalur Terpendek ke D Ditemukan: A ➔ C ➔ B ➔ D (Total Bobot: 4).');
    } else {
      setGraphVisited([graphStart, graphTarget]);
      setGraphActivePath([graphStart, graphTarget]);
      setGraphCost(6);
      setGraphLog(`🎯 Jalur Terpendek: ${graphStart} ➔ ${graphTarget} dievaluasi.`);
    }
  };

  // -------------------------------------------------------------
  // 8. AP: PYTHON MODULAR FUNCTION & SCOPE DEBUGGER
  // -------------------------------------------------------------
  const [pyStep, setPyStep] = useState<number>(0);
  const pyStepsInfo = [
    { line: 1, callStack: ['main()'], locals: {}, globals: { harga_awal: 100000, diskon_pct: 20 }, log: 'Program mulai: Baris 1 mendefinisikan fungsi modular `hitung_diskon(harga, persen)`.' },
    { line: 7, callStack: ['main()', 'hitung_diskon(100000, 20)'], locals: { harga: 100000, persen: 20 }, globals: { harga_awal: 100000, diskon_pct: 20 }, log: 'Fungsi dipanggil! Frame memori baru dialokasikan ke Call Stack. Parameter lokal `harga` dan `persen` terisi.' },
    { line: 3, callStack: ['main()', 'hitung_diskon(...)'], locals: { harga: 100000, persen: 20, potongan: 20000 }, globals: { harga_awal: 100000, diskon_pct: 20 }, log: 'Baris 3: Menghitung variabel lokal `potongan = (20 / 100) * 100000 = 20000`.' },
    { line: 4, callStack: ['main()', 'hitung_diskon(...)'], locals: { harga: 100000, persen: 20, potongan: 20000, total_bayar: 80000 }, globals: { harga_awal: 100000, diskon_pct: 20 }, log: 'Baris 4: Menghitung `total_bayar = 100000 - 20000 = 80000`.' },
    { line: 5, callStack: ['main()'], locals: {}, globals: { harga_awal: 100000, diskon_pct: 20, hasil_akhir: 80000 }, log: 'Return value 80000 dikembalikan ke pemanggil! Frame fungsi di-Pop dari Call Stack. Variabel lokal dihapus dari memori.' }
  ];

  const handleNextPyStep = () => {
    triggerXP(10);
    setPyStep(prev => (prev + 1) % pyStepsInfo.length);
  };

  // -------------------------------------------------------------
  // 9. SK: MEMORY HIERARCHY & CACHE LATENCY SIMULATOR
  // -------------------------------------------------------------
  const [selectedMemLevel, setSelectedMemLevel] = useState<'L1' | 'L2' | 'L3' | 'RAM' | 'SSD'>('L1');
  const memoryLevelsData = {
    L1: { name: 'L1 Cache', capacity: '64 KB - 128 KB', latency: '0.8 - 1.2 ns', cycles: '4 siklus clock', cost: 'Sangat Mahal', hitRate: '95%' },
    L2: { name: 'L2 Cache', capacity: '512 KB - 1 MB', latency: '3 - 5 ns', cycles: '12 siklus clock', cost: 'Mahal', hitRate: '88%' },
    L3: { name: 'L3 Cache', capacity: '16 MB - 64 MB', latency: '10 - 20 ns', cycles: '40 siklus clock', cost: 'Menengah', hitRate: '75%' },
    RAM: { name: 'RAM (DDR5 Main Memory)', capacity: '16 GB - 64 GB', latency: '60 - 100 ns', cycles: '200 siklus clock', cost: 'Terjangkau', hitRate: '50%' },
    SSD: { name: 'NVMe SSD / Secondary Storage', capacity: '512 GB - 2 TB', latency: '10,000 - 50,000 ns', cycles: '100,000+ siklus clock', cost: 'Sangat Murah per GB', hitRate: 'N/A' }
  };

  // -------------------------------------------------------------
  // 10. JKI: FIREWALL PACKET FILTERING SIMULATOR
  // -------------------------------------------------------------
  const [blockedPorts, setBlockedPorts] = useState<number[]>([22, 4444]);
  const [testPacket, setTestPacket] = useState<{ port: number; ip: string; proto: string; desc: string }>({
    port: 443,
    ip: '103.28.12.9',
    proto: 'TCP',
    desc: 'Traffic Web Port 443 (HTTPS Aman)'
  });
  const [fwDecision, setFwDecision] = useState<{ status: 'ALLOW' | 'DROP'; reason: string } | null>(null);

  const handleTestFirewall = () => {
    triggerXP(15);
    if (blockedPorts.includes(testPacket.port)) {
      setFwDecision({
        status: 'DROP',
        reason: `🚨 PAKET DIBLOKIR (DROP)! Port ${testPacket.port} terdaftar dalam Access Control List (ACL) yang dilarang firewall.`
      });
    } else {
      setFwDecision({
        status: 'ALLOW',
        reason: `✅ PAKET DIIZINKAN (ALLOW)! Port ${testPacket.port} terverifikasi aman untuk komunikasi data pengguna.`
      });
    }
  };

  const toggleFirewallPort = (port: number) => {
    triggerXP(5);
    setBlockedPorts(prev => prev.includes(port) ? prev.filter(p => p !== port) : [...prev, port]);
  };

  // -------------------------------------------------------------
  // 11. AD: DATABASE NORMALIZATION SIMULATOR (1NF, 2NF, 3NF)
  // -------------------------------------------------------------
  const [normLevel, setNormLevel] = useState<'UNF' | '1NF' | '2NF' | '3NF'>('UNF');

  // -------------------------------------------------------------
  // 12. DSI: AI BIAS & DEEPFAKE SCANNER SIMULATOR
  // -------------------------------------------------------------
  const [demographicBalance, setDemographicBalance] = useState<number>(20); // % data latih kelompok minoritas
  const [deepfakeInspected, setDeepfakeInspected] = useState<string[]>([]);

  const toggleDeepfakeArtifact = (artifact: string) => {
    triggerXP(10);
    setDeepfakeInspected(prev => prev.includes(artifact) ? prev.filter(a => a !== artifact) : [...prev, artifact]);
  };

  // =============================================================
  // RENDER SIMULATOR VIEW BASED ON TYPE
  // =============================================================

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden transition-all">
      {/* Simulator Header Bar */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase">
                Simulasi Visual Interaktif
              </span>
              <span className="text-xs text-slate-300">Kurikulum Merdeka</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
              {type === 'stack-queue-visualizer' && 'Simulasi Visual Struktur Data: Stack (LIFO) vs Queue (FIFO)'}
              {type === 'greedy-coin-visualizer' && 'Simulasi Visual Algoritma Greedy: Penukaran Koin'}
              {type === 'binary-search-visualizer' && 'Visualizer Interaktif Algoritma Pencarian: Binary Search O(log n)'}
              {type === 'recursion-visualizer' && 'Visualizer Rekursi & Call Stack Memori'}
              {type === 'logic-gate-simulator' && 'Simulasi Sirkuit Gerbang Logika Digital (Truth Table & Electrical Wire)'}
              {type === 'cpu-cycle-simulator' && 'Visualizer Siklus Mesin CPU (Fetch - Decode - Execute)'}
              {type === 'network-topology-simulator' && 'Simulator Topologi Jaringan Komputer & Uji Transmisi Paket'}
              {type === 'subnet-calc' && 'Kalkulator Visual Subnetting CIDR IPv4'}
              {type === 'sql-join-visualizer' && 'Visualizer Diagram Venn SQL JOIN (INNER, LEFT, RIGHT, FULL)'}
              {type === 'data-chart-visualizer' && 'Visualizer Agregasi & Visualisasi Data Statistik'}
              {type === 'phishing-detector-simulator' && 'Simulator Forensik Deteksi Serangan Phishing & Social Engineering'}
              {type === 'two-factor-auth-simulator' && 'Simulasi Alur Autentikasi Dua Faktor (2FA TOTP)'}
              {type === 'graph-traversal-simulator' && 'Visualizer Struktur Graf & Algoritma Jalur Terpendek (Dijkstra)'}
              {type === 'python-function-debugger-simulator' && 'Simulator Eksekusi Fungsi Modular Python & Call Stack Scope'}
              {type === 'memory-hierarchy-simulator' && 'Simulator Piramida Hierarki Memori & Latensi Cache CPU'}
              {type === 'firewall-packet-simulator' && 'Simulator Firewall Inspeksi Paket Data (Access Control List)'}
              {type === 'database-normalization-simulator' && 'Simulator Dekomposisi Normalisasi Basis Data (1NF, 2NF, 3NF)'}
              {type === 'ai-bias-detector-simulator' && 'Simulator Audit Etika AI: Bias Algoritma & Deteksi Deepfake'}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {hasInteracted && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>+XP Diperoleh!</span>
            </span>
          )}
        </div>
      </div>

      {/* Simulator Content Area */}
      <div className="p-5 sm:p-6 space-y-6">

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 1: STACK VS QUEUE (BK) */}
        {/* ------------------------------------------------------------- */}
        {(type === 'stack-queue-visualizer' || type === 'greedy-coin-visualizer') && (
          <div className="space-y-5">
            {/* Mode Switcher */}
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
              <button
                onClick={() => { setSqMode('stack'); setSqLog('Beralih ke mode Stack (LIFO: Last-In First-Out).'); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  sqMode === 'stack'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Stack (Tumpukan LIFO)</span>
              </button>

              <button
                onClick={() => { setSqMode('queue'); setSqLog('Beralih ke mode Queue (FIFO: First-In First-Out).'); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  sqMode === 'queue'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
                <span>Queue (Antrean FIFO)</span>
              </button>
            </div>

            {/* Visual Canvas Stage */}
            <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 relative overflow-hidden min-h-[260px] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>Visualisasi Memori: <strong className="text-white">{sqMode === 'stack' ? 'Tumpukan Vertikal (LIFO)' : 'Antrean Horizontal (FIFO)'}</strong></span>
                <span>Kapasitas: {sqMode === 'stack' ? `${stackItems.length}/6 Slot` : `${queueItems.length}/6 Slot`}</span>
              </div>

              {/* Graphical Animation Stage */}
              {sqMode === 'stack' ? (
                <div className="my-4 flex flex-col-reverse items-center justify-center gap-2 min-h-[160px] border-b-4 border-slate-700 pb-2 px-4">
                  {stackItems.length === 0 ? (
                    <div className="text-xs text-slate-500 py-8 flex flex-col items-center">
                      <Layers className="w-8 h-8 opacity-40 mb-1" />
                      <span>Tumpukan Kosong (Stack is Empty). Klik `Push()` di bawah untuk mengisi.</span>
                    </div>
                  ) : (
                    stackItems.map((item, idx) => {
                      const isTop = idx === stackItems.length - 1;
                      return (
                        <div
                          key={idx}
                          className={`w-full max-w-sm p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold shadow-md transition-all duration-300 animate-in slide-in-from-top-4 ${
                            isTop
                              ? 'bg-blue-600/90 border-blue-400 text-white ring-2 ring-blue-400/40 shadow-blue-500/20'
                              : 'bg-slate-800/90 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="truncate">{item}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${isTop ? 'bg-blue-800 text-blue-200' : 'bg-slate-900 text-slate-400'}`}>
                            {isTop ? '🔝 TOP (Index ' + idx + ')' : `Slot [${idx}]`}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              ) : (
                <div className="my-4 flex items-center justify-center gap-2 min-h-[160px] overflow-x-auto py-4 px-2">
                  {queueItems.length === 0 ? (
                    <div className="text-xs text-slate-500 py-8 flex flex-col items-center">
                      <ArrowRight className="w-8 h-8 opacity-40 mb-1" />
                      <span>Antrean Kosong (Queue is Empty). Klik `Enqueue()` di bawah.</span>
                    </div>
                  ) : (
                    queueItems.map((item, idx) => {
                      const isFront = idx === 0;
                      const isRear = idx === queueItems.length - 1;
                      return (
                        <div
                          key={idx}
                          className={`min-w-[130px] p-3 rounded-xl border flex flex-col justify-between text-xs font-bold shadow-md transition-all duration-300 animate-in slide-in-from-right-4 ${
                            isFront
                              ? 'bg-emerald-600/90 border-emerald-400 text-white ring-2 ring-emerald-400/40 shadow-emerald-500/20'
                              : isRear
                              ? 'bg-sky-700/80 border-sky-400 text-sky-100'
                              : 'bg-slate-800/90 border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="truncate">{item}</span>
                          <span className="text-[10px] mt-2 font-mono text-emerald-200">
                            {isFront ? '🏁 FRONT (Keluar)' : isRear ? '🚪 REAR (Ekor)' : `Posisi [${idx + 1}]`}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Status / Output Log Bar */}
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <span>Terminal Log: {sqLog}</span>
                <span className="text-[10px] text-slate-400 font-sans">Prinsip: {sqMode === 'stack' ? 'LIFO' : 'FIFO'}</span>
              </div>
            </div>

            {/* Interactive Control Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={sqMode === 'stack' ? "Nama data piringan..." : "Nama pelanggan baru..."}
                  value={sqInput}
                  onChange={(e) => setSqInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-6 flex flex-wrap items-center gap-2">
                {sqMode === 'stack' ? (
                  <>
                    <button
                      onClick={handlePushStack}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-xs flex items-center space-x-1.5"
                    >
                      <span>Push(Data) ⬆️</span>
                    </button>
                    <button
                      onClick={handlePopStack}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs flex items-center space-x-1.5"
                    >
                      <span>Pop() ⬇️</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEnqueue}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs flex items-center space-x-1.5"
                    >
                      <span>Enqueue(Data) ➡️</span>
                    </button>
                    <button
                      onClick={handleDequeue}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-xs flex items-center space-x-1.5"
                    >
                      <span>Dequeue() 🚪</span>
                    </button>
                  </>
                )}

                <button
                  onClick={handleResetSQ}
                  className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center space-x-1"
                  title="Reset Tumpukan"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 2: BINARY SEARCH VISUALIZER (AP) */}
        {/* ------------------------------------------------------------- */}
        {(type === 'binary-search-visualizer' || type === 'recursion-visualizer') && (
          <div className="space-y-5">
            {/* Target Selector & Step Info */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pilih Angka Target:</span>
                <select
                  value={bsTarget}
                  onChange={(e) => { setBsTarget(Number(e.target.value)); handleResetBS(); }}
                  className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-bold text-blue-600 dark:text-blue-400"
                >
                  {sortedArray.map((val) => (
                    <option key={val} value={val}>Target: {val}</option>
                  ))}
                  <option value={999}>Target: 999 (Tidak Ada)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 font-bold">
                  Langkah: {bsStep}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold">
                  Kompleksitas: O(log {sortedArray.length}) ≈ 4 langkah max
                </span>
              </div>
            </div>

            {/* Array Box Stage Visualizer */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-6">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
                {sortedArray.map((val, idx) => {
                  const isLow = idx === bsLow;
                  const isHigh = idx === bsHigh;
                  const isMid = idx === bsMid;
                  const isEliminated = idx < bsLow || idx > bsHigh;
                  const isTargetMatch = val === bsTarget && bsFound === true && isMid;

                  return (
                    <div key={idx} className="flex flex-col items-center space-y-1.5">
                      {/* Top Pointers */}
                      <div className="h-5 flex items-center justify-center text-[10px] font-bold">
                        {isMid && <span className="px-1.5 py-0.2 rounded bg-amber-500 text-black font-mono">MID</span>}
                        {!isMid && isLow && <span className="px-1 py-0.2 rounded bg-blue-500 text-white font-mono">LOW</span>}
                        {!isMid && isHigh && <span className="px-1 py-0.2 rounded bg-purple-500 text-white font-mono">HIGH</span>}
                      </div>

                      {/* Number Card */}
                      <div
                        className={`w-full aspect-square rounded-xl flex items-center justify-center font-bold text-sm border transition-all duration-300 ${
                          isTargetMatch
                            ? 'bg-emerald-600 border-emerald-300 text-white scale-110 shadow-lg shadow-emerald-500/50 ring-2 ring-emerald-300'
                            : isMid
                            ? 'bg-amber-600/90 border-amber-300 text-white scale-105 ring-2 ring-amber-400'
                            : isEliminated
                            ? 'bg-slate-900 border-slate-800 text-slate-600 opacity-30 line-through'
                            : 'bg-slate-800 border-slate-700 text-white hover:border-blue-400'
                        }`}
                      >
                        {val}
                      </div>

                      {/* Index Label */}
                      <span className="text-[10px] text-slate-500 font-mono">[{idx}]</span>
                    </div>
                  );
                })}
              </div>

              {/* Legend and Log */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3 text-[11px] text-slate-400">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-blue-500"></span> <span>Low</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-amber-500"></span> <span>Mid (Diperiksa)</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-purple-500"></span> <span>High</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded bg-slate-800 opacity-40"></span> <span>Dibuang</span></span>
                </div>
              </div>

              {/* Log History */}
              <div className="bg-slate-900 p-3 rounded-xl text-xs font-mono space-y-1 text-slate-300 max-h-24 overflow-y-auto">
                {bsLogs.map((log, lIdx) => (
                  <div key={lIdx} className="text-emerald-400">{log}</div>
                ))}
              </div>
            </div>

            {/* Interactive Step Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleNextStepBS}
                disabled={bsFound !== null}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 ${
                  bsFound !== null
                    ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>Langkah Berikutnya (Next Step)</span>
              </button>

              <button
                onClick={handleResetBS}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center space-x-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Simulasi</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 3: LOGIC GATES & ELECTRIC CIRCUIT (SK) */}
        {/* ------------------------------------------------------------- */}
        {(type === 'logic-gate-simulator' || type === 'cpu-cycle-simulator') && (
          <div className="space-y-5">
            {/* Gate Type Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {(['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR'] as const).map((gType) => (
                <button
                  key={gType}
                  onClick={() => { setSelectedGateType(gType); triggerXP(10); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedGateType === gType
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Gerbang {gType}
                </button>
              ))}
            </div>

            {/* Electrical Circuit Visual Diagram */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white relative overflow-hidden space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Input Switches (A & B) */}
                <div className="space-y-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saklar Input (Biner)</div>
                  
                  {/* Switch A */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-300">Input A:</span>
                    <button
                      onClick={() => { setGateA(gateA === 1 ? 0 : 1); triggerXP(5); }}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        gateA === 1
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400'
                          : 'bg-rose-950 border border-rose-800 text-rose-300'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{gateA === 1 ? '1 (HIGH / ON)' : '0 (LOW / OFF)'}</span>
                    </button>
                  </div>

                  {/* Switch B (if not NOT gate) */}
                  {selectedGateType !== 'NOT' && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-xs font-mono font-bold text-slate-300">Input B:</span>
                      <button
                        onClick={() => { setGateB(gateB === 1 ? 0 : 1); triggerXP(5); }}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                          gateB === 1
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400'
                            : 'bg-rose-950 border border-rose-800 text-rose-300'
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{gateB === 1 ? '1 (HIGH / ON)' : '0 (LOW / OFF)'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Center: Logic Gate Schematic Icon */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-900/40 rounded-xl border border-slate-800 relative">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-700 flex flex-col items-center justify-center text-white shadow-xl shadow-blue-500/20 border border-blue-400">
                    <Cpu className="w-8 h-8 mb-0.5" />
                    <span className="text-xs font-extrabold tracking-wider">{selectedGateType}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 font-mono">Gerbang Logika IEEE</span>
                </div>

                {/* Output Lamp */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Output Lampu (Q)</div>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      gateResult === 1
                        ? 'bg-emerald-500 text-white shadow-2xl shadow-emerald-400/80 scale-110 ring-4 ring-emerald-300 animate-pulse'
                        : 'bg-slate-800 text-slate-600 border border-slate-700'
                    }`}
                  >
                    <Zap className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-mono font-bold">
                    Q = <span className={gateResult === 1 ? 'text-emerald-400' : 'text-rose-400'}>{gateResult}</span> ({gateResult === 1 ? 'Menyala' : 'Padam'})
                  </div>
                </div>
              </div>

              {/* Truth Table */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-slate-300 mb-2">Tabel Kebenaran (Truth Table) Gerbang {selectedGateType}:</div>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono text-center">
                  <div className="bg-slate-800 p-1.5 rounded font-bold text-slate-300">Input A</div>
                  {selectedGateType !== 'NOT' && <div className="bg-slate-800 p-1.5 rounded font-bold text-slate-300">Input B</div>}
                  <div className="bg-slate-800 p-1.5 rounded font-bold text-emerald-400">Output Q</div>
                  <div className="bg-slate-800 p-1.5 rounded font-bold text-slate-400">Status</div>

                  {/* Active Row Highlight */}
                  <div className="bg-slate-950 p-1.5 rounded text-white">{gateA}</div>
                  {selectedGateType !== 'NOT' && <div className="bg-slate-950 p-1.5 rounded text-white">{gateB}</div>}
                  <div className="bg-slate-950 p-1.5 rounded font-bold text-emerald-400">{gateResult}</div>
                  <div className="bg-emerald-950/80 border border-emerald-500/40 p-1.5 rounded text-[10px] text-emerald-300">
                    Aktif Sekarang ⚡
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 4: NETWORK TOPOLOGY (JKI) */}
        {/* ------------------------------------------------------------- */}
        {(type === 'network-topology-simulator' || type === 'subnet-calc') && (
          <div className="space-y-5">
            {/* Topology Mode Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {(['star', 'bus', 'ring', 'mesh'] as const).map((tMode) => (
                <button
                  key={tMode}
                  onClick={() => { setTopology(tMode); setBrokenLinks([]); triggerXP(10); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    topology === tMode
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Topologi {tMode}
                </button>
              ))}
            </div>

            {/* Visual Canvas Network Topology Stage */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span>Diagram Visual: <strong className="text-white capitalize">Topologi {topology}</strong></span>
                <span className="text-[11px] text-sky-400">💡 Klik kabel untuk mensimulasikan link putus!</span>
              </div>

              {/* Topology Nodes Diagram */}
              <div className="relative min-h-[220px] flex items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                {topology === 'star' && (
                  <div className="flex flex-col items-center space-y-6 w-full max-w-lg">
                    {/* Top Row: PC 1 & PC 2 */}
                    <div className="flex items-center justify-between w-full px-8">
                      <div className={`p-3 rounded-xl border text-center text-xs font-bold ${sourceNode === 'PC-1' ? 'bg-blue-600 border-blue-400' : targetNode === 'PC-1' ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-700'}`}>
                        <Laptop className="w-5 h-5 mx-auto mb-1" />
                        <span>PC-1</span>
                      </div>
                      <div className={`p-3 rounded-xl border text-center text-xs font-bold ${sourceNode === 'PC-2' ? 'bg-blue-600 border-blue-400' : targetNode === 'PC-2' ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-700'}`}>
                        <Laptop className="w-5 h-5 mx-auto mb-1" />
                        <span>PC-2</span>
                      </div>
                    </div>

                    {/* Center: Switch */}
                    <div 
                      onClick={() => toggleBrokenLink('switch')}
                      className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${brokenLinks.includes('switch') ? 'bg-rose-900/80 border-rose-500 text-rose-300' : 'bg-indigo-600 border-indigo-400 text-white shadow-lg'}`}
                      title="Klik untuk simulasi Switch mati"
                    >
                      <Server className="w-7 h-7 mx-auto mb-1" />
                      <span className="text-xs font-bold">Central Switch {brokenLinks.includes('switch') ? '(MATI ❌)' : '(NORMAL ⚡)'}</span>
                    </div>

                    {/* Bottom Row: PC 3 & PC 4 */}
                    <div className="flex items-center justify-between w-full px-8">
                      <div className={`p-3 rounded-xl border text-center text-xs font-bold ${sourceNode === 'PC-3' ? 'bg-blue-600 border-blue-400' : targetNode === 'PC-3' ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-700'}`}>
                        <Laptop className="w-5 h-5 mx-auto mb-1" />
                        <span>PC-3</span>
                      </div>
                      <div className={`p-3 rounded-xl border text-center text-xs font-bold ${sourceNode === 'PC-4' ? 'bg-blue-600 border-blue-400' : targetNode === 'PC-4' ? 'bg-emerald-600 border-emerald-400' : 'bg-slate-800 border-slate-700'}`}>
                        <Laptop className="w-5 h-5 mx-auto mb-1" />
                        <span>PC-4</span>
                      </div>
                    </div>
                  </div>
                )}

                {topology === 'mesh' && (
                  <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
                    {['PC-1', 'PC-2', 'PC-3', 'PC-4'].map((pc) => (
                      <div key={pc} className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-center text-xs font-bold">
                        <Laptop className="w-5 h-5 mx-auto mb-1 text-sky-400" />
                        <span>{pc}</span>
                        <div className="text-[10px] text-emerald-400 mt-1">Full Duplex Links</div>
                      </div>
                    ))}
                  </div>
                )}

                {topology === 'bus' && (
                  <div className="flex items-center justify-between w-full max-w-lg relative py-8">
                    <div 
                      onClick={() => toggleBrokenLink('backbone')}
                      className={`absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 cursor-pointer transition-all ${brokenLinks.includes('backbone') ? 'bg-rose-600 animate-pulse' : 'bg-sky-500'}`}
                      title="Klik untuk putuskan kabel backbone utama"
                    ></div>
                    {['PC-1', 'PC-2', 'PC-3', 'PC-4'].map((pc) => (
                      <div key={pc} className="relative z-10 p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center text-xs font-bold">
                        <Laptop className="w-5 h-5 mx-auto mb-1 text-sky-300" />
                        <span>{pc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {topology === 'ring' && (
                  <div className="w-44 h-44 rounded-full border-4 border-dashed border-sky-400/80 flex items-center justify-center relative">
                    <div className="absolute -top-3 p-1.5 rounded-lg bg-slate-800 text-[10px] font-bold">PC-1</div>
                    <div className="absolute -right-3 p-1.5 rounded-lg bg-slate-800 text-[10px] font-bold">PC-2</div>
                    <div className="absolute -bottom-3 p-1.5 rounded-lg bg-slate-800 text-[10px] font-bold">PC-3</div>
                    <div className="absolute -left-3 p-1.5 rounded-lg bg-slate-800 text-[10px] font-bold">PC-4</div>
                    <span className="text-[11px] text-sky-300 font-mono">Token Ring Loop</span>
                  </div>
                )}
              </div>

              {/* Packet Sender Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-4 flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-bold">Pengirim:</span>
                  <select
                    value={sourceNode}
                    onChange={(e) => setSourceNode(e.target.value)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="PC-1">PC-1 (192.168.1.2)</option>
                    <option value="PC-2">PC-2 (192.168.1.3)</option>
                    <option value="PC-3">PC-3 (192.168.1.4)</option>
                  </select>
                </div>

                <div className="sm:col-span-4 flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-bold">Tujuan:</span>
                  <select
                    value={targetNode}
                    onChange={(e) => setTargetNode(e.target.value)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  >
                    <option value="PC-3">PC-3 (192.168.1.4)</option>
                    <option value="PC-4">PC-4 (192.168.1.5)</option>
                    <option value="PC-1">PC-1 (192.168.1.2)</option>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <button
                    onClick={handleSendPacket}
                    disabled={isSendingPacket}
                    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-md"
                  >
                    <SendPacketIcon className="w-3.5 h-3.5" />
                    <span>{isSendingPacket ? 'Mengirim...' : 'Uji Kirim Paket'}</span>
                  </button>
                </div>
              </div>

              {/* Status Output */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
                {packetStatus}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 5: SQL JOIN & VENN DIAGRAM (AD) */}
        {/* ------------------------------------------------------------- */}
        {(type === 'sql-join-visualizer' || type === 'data-chart-visualizer') && (
          <div className="space-y-5">
            {/* Join Type Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as const).map((jType) => (
                <button
                  key={jType}
                  onClick={() => { setSqlJoinType(jType); triggerXP(10); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    sqlJoinType === jType
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {jType} JOIN
                </button>
              ))}
            </div>

            {/* Visual Venn Diagram & SQL Query Preview */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Venn Diagram Visual Canvas */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800 min-h-[160px]">
                  <div className="relative w-48 h-28 flex items-center justify-center">
                    {/* Circle A (Table A) */}
                    <div className={`absolute left-2 w-24 h-24 rounded-full border-2 border-blue-400 flex items-center justify-center text-xs font-bold transition-all ${
                      sqlJoinType === 'LEFT' || sqlJoinType === 'FULL' || sqlJoinType === 'INNER'
                        ? 'bg-blue-500/40 text-white'
                        : 'bg-transparent text-slate-400'
                    }`}>
                      <span className="-translate-x-3">Siswa</span>
                    </div>

                    {/* Circle B (Table B) */}
                    <div className={`absolute right-2 w-24 h-24 rounded-full border-2 border-emerald-400 flex items-center justify-center text-xs font-bold transition-all ${
                      sqlJoinType === 'RIGHT' || sqlJoinType === 'FULL' || sqlJoinType === 'INNER'
                        ? 'bg-emerald-500/40 text-white'
                        : 'bg-transparent text-slate-400'
                    }`}>
                      <span className="translate-x-3">Nilai</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-2 font-mono">Himpunan Relasi: {sqlJoinType} JOIN</span>
                </div>

                {/* SQL Code Query */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 space-y-1">
                  <div className="text-slate-500">-- Kueri SQL yang dieksekusi:</div>
                  <div><span className="text-rose-400 font-bold">SELECT</span> A.nama, B.nilai</div>
                  <div><span className="text-rose-400 font-bold">FROM</span> tb_siswa A</div>
                  <div><span className="text-amber-400 font-bold">{sqlJoinType} JOIN</span> tb_evaluasi B</div>
                  <div><span className="text-rose-400 font-bold">ON</span> A.id = B.siswa_id;</div>
                </div>
              </div>

              {/* Dynamic Query Result Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-slate-300 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">ID</th>
                      <th className="p-2.5">Nama Siswa (Tabel A)</th>
                      <th className="p-2.5">Mata Pelajaran</th>
                      <th className="p-2.5">Nilai (Tabel B)</th>
                      <th className="p-2.5">Status Kecocokan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {getJoinResults().map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/60 font-mono">
                        <td className="p-2.5 text-slate-400">{row.id}</td>
                        <td className={`p-2.5 font-sans font-semibold ${row.nama === 'NULL' ? 'text-rose-400 italic' : 'text-white'}`}>
                          {row.nama}
                        </td>
                        <td className="p-2.5 text-slate-300">{row.mapel}</td>
                        <td className={`p-2.5 font-bold ${typeof row.nilai === 'number' && row.nilai >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {row.nilai}
                        </td>
                        <td className="p-2.5 text-[11px] text-sky-400">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 6: PHISHING & 2FA SECURITY (DSI) */}
        {/* ------------------------------------------------------------- */}
        {(type === 'phishing-detector-simulator' || type === 'two-factor-auth-simulator') && (
          <div className="space-y-5">
            {/* Step Switcher */}
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
              <button
                onClick={() => setPhishingStep('email')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  phishingStep === 'email' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                1. Deteksi Email Phishing
              </button>
              <button
                onClick={() => setPhishingStep('2fa')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  phishingStep === '2fa' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                2. Simulasi 2FA TOTP
              </button>
            </div>

            {phishingStep === 'email' ? (
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                  <span className="flex items-center space-x-1.5">
                    <Mail className="w-4 h-4 text-rose-400" />
                    <strong>Kotak Masuk Email Mencurigakan (Klik Ciri-Ciri Phishing)</strong>
                  </span>
                  <span className="text-amber-400 font-bold">Terdeteksi: {inspectedFlags.length}/3 Indikator</span>
                </div>

                {/* Simulated Phishing Email Client */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  {/* Sender Header */}
                  <div
                    onClick={() => toggleFlag('sender')}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      inspectedFlags.includes('sender')
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-800 border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Pengirim: <strong>Bank_Pusat_Official &lt;security-update@bank-bca-pusat-keamanan.xyz&gt;</strong></span>
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    {inspectedFlags.includes('sender') && (
                      <p className="text-[11px] text-rose-300 mt-1">
                        🚩 <strong>Red Flag #1 Domain Palsu</strong>: Menggunakan domain mencurigakan (.xyz) dan nama menyerupai bank resmi (Typosquatting).
                      </p>
                    )}
                  </div>

                  {/* Body Urgency */}
                  <div
                    onClick={() => toggleFlag('urgency')}
                    className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                      inspectedFlags.includes('urgency')
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-800 border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <p className="leading-relaxed">
                      "PERINGATAN DARURAT: Rekening Anda akan diblokir permanen dalam 2 jam jika tidak segera melakukan konfirmasi data akun dan PIN!"
                    </p>
                    {inspectedFlags.includes('urgency') && (
                      <p className="text-[11px] text-rose-300 mt-1">
                        🚩 <strong>Red Flag #2 Rasa Panik Palsu (Sense of Urgency)</strong>: Memaksa korban bertindak tergesa-gesa tanpa berpikir rasional.
                      </p>
                    )}
                  </div>

                  {/* Fake Link Button */}
                  <div
                    onClick={() => toggleFlag('fakeLink')}
                    className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                      inspectedFlags.includes('fakeLink')
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-blue-600/30 border-blue-500/50 hover:border-blue-400'
                    }`}
                  >
                    <span className="font-bold text-sky-300 underline">[KLIK DI SINI UNTUK VERIFIKASI REKENING]</span>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Arah URL Sebenarnya: http://192.168.4.12/login-phish-steal-otp.php (Bukan HTTPS Resmi)
                    </div>
                    {inspectedFlags.includes('fakeLink') && (
                      <p className="text-[11px] text-rose-300 mt-1">
                        🚩 <strong>Red Flag #3 Tautan Jebakan Phishing</strong>: URL tidak bersertifikat gembok SSL resmi dan mengarah ke IP server hacker.
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  {inspectedFlags.length === 3
                    ? '🎉 Sempurna! Anda berhasil mengenali seluruh ciri-ciri serangan social engineering dan phishing!'
                    : 'Klik 3 bagian email di atas untuk menemukan bukti phishing.'}
                </div>
              </div>
            ) : (
              /* 2FA TOTP Simulator */
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-4 max-w-md mx-auto">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 border-b border-slate-800 pb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Simulator Google Authenticator / TOTP 2FA</span>
                </div>

                <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400">Kode Token 6-Digit Sementara:</span>
                  <div className="text-3xl font-mono font-extrabold tracking-widest text-emerald-400 animate-pulse">
                    {totpCode}
                  </div>
                  <span className="text-[10px] text-slate-500">Berlaku selama 30 detik (Time-based OTP)</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Masukkan Kode Verifikasi 2FA:</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Masukkan 6 angka..."
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-center font-mono text-lg font-bold text-white focus:ring-1 focus:ring-emerald-400"
                  />
                  <button
                    onClick={handleVerify2FA}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md transition-all"
                  >
                    Verifikasi Login 2FA
                  </button>
                </div>

                {authStatus === 'success' && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold text-center">
                    ✅ Autentikasi Berhasil! Akun terlindungi oleh lapisan keamanan ganda.
                  </div>
                )}
                {authStatus === 'failed' && (
                  <div className="p-3 rounded-xl bg-rose-950 border border-rose-500 text-rose-300 text-xs font-bold text-center">
                    ❌ Kode OTP Salah! Akses ditolak oleh server autentikasi.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 7: GRAPH TRAVERSAL & SHORTEST PATH (BK BAB 3) */}
        {/* ------------------------------------------------------------- */}
        {type === 'graph-traversal-simulator' && (
          <div className="space-y-5">
            {/* Control bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Titik Awal:</span>
                  <select
                    value={graphStart}
                    onChange={(e) => { setGraphStart(e.target.value); setGraphCost(0); setGraphActivePath([e.target.value]); }}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-blue-600"
                  >
                    {['A', 'B', 'C'].map(n => <option key={n} value={n}>Simpul {n}</option>)}
                  </select>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Titik Tujuan:</span>
                  <select
                    value={graphTarget}
                    onChange={(e) => { setGraphTarget(e.target.value); setGraphCost(0); }}
                    className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold text-emerald-600"
                  >
                    {['D', 'E'].map(n => <option key={n} value={n}>Simpul {n}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleRunDijkstra}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Jalankan Dijkstra (Cari Rute Optimal)</span>
                </button>
              </div>
            </div>

            {/* Interactive Graph Canvas */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>Diagram Visual Graf Berbobot (Weighted Graph):</span>
                <span className="font-mono text-emerald-400 font-bold">
                  Total Jarak/Bobot: {graphCost > 0 ? `${graphCost} km / satuan` : 'Belum Dihitung'}
                </span>
              </div>

              {/* Graphical Nodes & Edges Stage */}
              <div className="relative h-64 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 240">
                  {/* Edges */}
                  <line x1="100" y1="120" x2="250" y2="60" stroke={graphActivePath.includes('A') && graphActivePath.includes('B') && !graphActivePath.includes('C') ? '#3b82f6' : '#475569'} strokeWidth={graphActivePath.includes('A') && graphActivePath.includes('B') && !graphActivePath.includes('C') ? '4' : '2'} strokeDasharray="4 4" />
                  <line x1="100" y1="120" x2="250" y2="180" stroke={graphActivePath.includes('A') && graphActivePath.includes('C') ? '#10b981' : '#475569'} strokeWidth={graphActivePath.includes('A') && graphActivePath.includes('C') ? '4' : '2'} />
                  <line x1="250" y1="180" x2="250" y2="60" stroke={graphActivePath.includes('C') && graphActivePath.includes('B') ? '#10b981' : '#475569'} strokeWidth={graphActivePath.includes('C') && graphActivePath.includes('B') ? '4' : '2'} />
                  <line x1="250" y1="60" x2="400" y2="60" stroke={graphActivePath.includes('B') && graphActivePath.includes('D') ? '#10b981' : '#475569'} strokeWidth={graphActivePath.includes('B') && graphActivePath.includes('D') ? '4' : '2'} />
                  <line x1="250" y1="180" x2="400" y2="60" stroke="#475569" strokeWidth="2" />
                  <line x1="400" y1="60" x2="520" y2="120" stroke={graphActivePath.includes('D') && graphActivePath.includes('E') ? '#10b981' : '#475569'} strokeWidth={graphActivePath.includes('D') && graphActivePath.includes('E') ? '4' : '2'} />
                  <line x1="250" y1="60" x2="520" y2="120" stroke="#475569" strokeWidth="2" strokeDasharray="2 2" />

                  {/* Edge Labels / Weights */}
                  <text x="160" y="80" fill="#94a3b8" fontSize="11" fontWeight="bold">w: 4</text>
                  <text x="160" y="165" fill="#34d399" fontSize="11" fontWeight="bold">w: 2</text>
                  <text x="260" y="125" fill="#34d399" fontSize="11" fontWeight="bold">w: 1</text>
                  <text x="325" y="50" fill="#34d399" fontSize="11" fontWeight="bold">w: 1</text>
                  <text x="465" y="85" fill="#34d399" fontSize="11" fontWeight="bold">w: 1</text>
                  <text x="390" y="140" fill="#94a3b8" fontSize="11">w: 3</text>
                </svg>

                {/* Interactive Node Badges */}
                <div className="absolute left-[80px] top-[95px] flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-lg transition-all ${
                    graphActivePath.includes('A') ? 'bg-blue-600 border-blue-300 text-white scale-110 ring-4 ring-blue-500/30' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    A
                  </div>
                  <span className="text-[10px] text-blue-300 font-bold mt-1">Start</span>
                </div>

                <div className="absolute left-[230px] top-[35px] flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-lg transition-all ${
                    graphActivePath.includes('B') ? 'bg-emerald-600 border-emerald-300 text-white scale-110 ring-4 ring-emerald-500/30' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    B
                  </div>
                </div>

                <div className="absolute left-[230px] top-[155px] flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-lg transition-all ${
                    graphActivePath.includes('C') ? 'bg-emerald-600 border-emerald-300 text-white scale-110 ring-4 ring-emerald-500/30' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    C
                  </div>
                </div>

                <div className="absolute left-[380px] top-[35px] flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-lg transition-all ${
                    graphActivePath.includes('D') ? 'bg-emerald-600 border-emerald-300 text-white scale-110 ring-4 ring-emerald-500/30' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    D
                  </div>
                </div>

                <div className="absolute left-[500px] top-[95px] flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shadow-lg transition-all ${
                    graphActivePath.includes('E') ? 'bg-purple-600 border-purple-300 text-white scale-110 ring-4 ring-purple-500/30' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    E
                  </div>
                  <span className="text-[10px] text-purple-300 font-bold mt-1">Goal</span>
                </div>
              </div>

              {/* Status and Explanation Log */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <span>{graphLog}</span>
                <span className="text-[11px] text-slate-400">Algoritma: Dijkstra Priority Queue</span>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 8: PYTHON FUNCTION & CALL STACK (AP BAB 3) */}
        {/* ------------------------------------------------------------- */}
        {type === 'python-function-debugger-simulator' && (
          <div className="space-y-5">
            {/* Header controls */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold">
                  Step {pyStep + 1} dari {pyStepsInfo.length}
                </span>
                <span className="text-slate-600 dark:text-slate-300 font-mono">
                  Line aktif: #{pyStepsInfo[pyStep].line}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleNextPyStep}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Eksekusi Baris Berikutnya (Step Over)</span>
                </button>
                <button
                  onClick={() => setPyStep(0)}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                  title="Reset Debugger"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Code Trace & Memory Stack Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Python Code Editor Preview */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="text-slate-500 pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>program_diskon.py</span>
                  <span className="text-[10px] text-amber-400">Debugger Mode</span>
                </div>
                {[
                  { num: 1, text: 'def hitung_diskon(harga, persen):' },
                  { num: 2, text: '    # Menghitung potongan diskon' },
                  { num: 3, text: '    potongan = (persen / 100) * harga' },
                  { num: 4, text: '    total_bayar = harga - potongan' },
                  { num: 5, text: '    return total_bayar' },
                  { num: 6, text: '' },
                  { num: 7, text: 'harga_awal = 100000' },
                  { num: 8, text: 'diskon_pct = 20' },
                  { num: 9, text: 'hasil_akhir = hitung_diskon(harga_awal, diskon_pct)' },
                  { num: 10, text: 'print("Total:", hasil_akhir)' },
                ].map((row) => (
                  <div
                    key={row.num}
                    className={`px-2 py-0.5 rounded flex items-center space-x-3 transition-colors ${
                      pyStepsInfo[pyStep].line === row.num
                        ? 'bg-blue-600/40 border-l-4 border-blue-400 text-white font-bold'
                        : 'hover:bg-slate-900/60'
                    }`}
                  >
                    <span className="text-slate-600 w-5 select-none">{row.num}</span>
                    <span className={row.text.startsWith('def') ? 'text-purple-400 font-bold' : row.text.includes('return') ? 'text-rose-400' : ''}>
                      {row.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Call Stack & Variable Scope Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-4">
                <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span className="font-bold text-white flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-blue-400" />
                    <span>Call Stack Memori (LIFO)</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Frame Tumpukan</span>
                </div>

                {/* Stack Frames */}
                <div className="space-y-1.5">
                  {pyStepsInfo[pyStep].callStack.map((frame, fIdx) => (
                    <div
                      key={fIdx}
                      className={`p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-between ${
                        fIdx === pyStepsInfo[pyStep].callStack.length - 1
                          ? 'bg-blue-600/80 border-blue-400 text-white ring-2 ring-blue-400/30'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{frame}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-blue-200">
                        {fIdx === pyStepsInfo[pyStep].callStack.length - 1 ? 'Active Frame' : 'Parent Frame'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Variable Scopes */}
                <div className="border-t border-slate-800 pt-3 space-y-2">
                  <div className="font-bold text-slate-300">Variabel Scope:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-amber-400 font-bold block">Local Scope (Fungsi):</span>
                      {Object.keys(pyStepsInfo[pyStep].locals).length === 0 ? (
                        <span className="text-slate-600 italic">Tidak aktif</span>
                      ) : (
                        Object.entries(pyStepsInfo[pyStep].locals).map(([k, v]) => (
                          <div key={k} className="text-slate-300">{k}: <strong className="text-white">{v}</strong></div>
                        ))
                      )}
                    </div>

                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-sky-400 font-bold block">Global Scope:</span>
                      {Object.entries(pyStepsInfo[pyStep].globals).map(([k, v]) => (
                        <div key={k} className="text-slate-300">{k}: <strong className="text-white">{v}</strong></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono text-[11px]">
                  {pyStepsInfo[pyStep].log}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 9: MEMORY HIERARCHY PYRAMID (SK BAB 3) */}
        {/* ------------------------------------------------------------- */}
        {type === 'memory-hierarchy-simulator' && (
          <div className="space-y-5">
            {/* Pyramid Level Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {(['L1', 'L2', 'L3', 'RAM', 'SSD'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => { setSelectedMemLevel(lvl); triggerXP(10); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedMemLevel === lvl
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Level {lvl}: {memoryLevelsData[lvl].name}
                </button>
              ))}
            </div>

            {/* Pyramid Visual Canvas */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Pyramid Visualization */}
                <div className="md:col-span-6 flex flex-col items-center justify-center space-y-2 py-4">
                  <div className="text-xs text-slate-400 mb-2">Piramida Hierarki Kecepatan vs Kapasitas:</div>

                  {/* Level 1: Registers / L1 */}
                  <div
                    onClick={() => setSelectedMemLevel('L1')}
                    className={`w-32 py-2 text-center rounded-lg cursor-pointer transition-all border text-xs font-bold ${
                      selectedMemLevel === 'L1' ? 'bg-amber-500 border-amber-300 text-black scale-105 shadow-lg shadow-amber-500/40' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    L1 Cache (Tercepat)
                  </div>

                  {/* Level 2: L2 */}
                  <div
                    onClick={() => setSelectedMemLevel('L2')}
                    className={`w-44 py-2 text-center rounded-lg cursor-pointer transition-all border text-xs font-bold ${
                      selectedMemLevel === 'L2' ? 'bg-amber-600 border-amber-300 text-white scale-105 shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    L2 Cache (Sangat Cepat)
                  </div>

                  {/* Level 3: L3 */}
                  <div
                    onClick={() => setSelectedMemLevel('L3')}
                    className={`w-56 py-2 text-center rounded-lg cursor-pointer transition-all border text-xs font-bold ${
                      selectedMemLevel === 'L3' ? 'bg-blue-600 border-blue-300 text-white scale-105 shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    L3 Cache (Shared Die)
                  </div>

                  {/* Level 4: RAM */}
                  <div
                    onClick={() => setSelectedMemLevel('RAM')}
                    className={`w-72 py-2.5 text-center rounded-lg cursor-pointer transition-all border text-xs font-bold ${
                      selectedMemLevel === 'RAM' ? 'bg-emerald-600 border-emerald-300 text-white scale-105 shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    RAM DDR5 (Main Memory)
                  </div>

                  {/* Level 5: SSD */}
                  <div
                    onClick={() => setSelectedMemLevel('SSD')}
                    className={`w-88 py-3 text-center rounded-lg cursor-pointer transition-all border text-xs font-bold ${
                      selectedMemLevel === 'SSD' ? 'bg-purple-600 border-purple-300 text-white scale-105 shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    NVMe SSD (Kapasitas Terbesar)
                  </div>
                </div>

                {/* Level Details Card */}
                <div className="md:col-span-6 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <h4 className="text-base font-bold text-white flex items-center space-x-2">
                      <Cpu className="w-5 h-5 text-blue-400" />
                      <span>{memoryLevelsData[selectedMemLevel].name}</span>
                    </h4>
                    <span className="text-xs text-slate-400">Tingkat Hirarki: {selectedMemLevel}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Waktu Akses (Latency):</span>
                      <strong className="text-emerald-400 font-mono text-sm">{memoryLevelsData[selectedMemLevel].latency}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Kapasitas Tipikal:</span>
                      <strong className="text-white font-mono text-sm">{memoryLevelsData[selectedMemLevel].capacity}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Siklus Clock CPU:</span>
                      <strong className="text-amber-400 font-mono">{memoryLevelsData[selectedMemLevel].cycles}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Probabilitas Hit Rate:</span>
                      <strong className="text-purple-400 font-mono">{memoryLevelsData[selectedMemLevel].hitRate}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Prinsip Desain:</strong> Semakin tinggi posisi memori di piramida (mendekati core CPU), semakin kecil latensi dan kapasitasnya karena mahalnya sirkuit Static RAM (SRAM) berkecepatan gigaherz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 10: FIREWALL PACKET FILTERING (JKI BAB 3) */}
        {/* ------------------------------------------------------------- */}
        {type === 'firewall-packet-simulator' && (
          <div className="space-y-5">
            {/* Packet Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Pilih Sampel Paket Masuk:</span>
                {[
                  { port: 443, ip: '103.28.12.9', proto: 'TCP', desc: 'Port 443 (HTTPS Web Sekolah)' },
                  { port: 80, ip: '114.4.20.1', proto: 'TCP', desc: 'Port 80 (HTTP Biasa)' },
                  { port: 22, ip: '185.220.101.5', proto: 'TCP', desc: 'Port 22 (SSH Remote Shell Luar)' },
                  { port: 4444, ip: '194.26.29.11', proto: 'TCP', desc: 'Port 4444 (Trojan/Backdoor)' },
                ].map((pkt) => (
                  <button
                    key={pkt.port}
                    onClick={() => { setTestPacket(pkt); setFwDecision(null); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      testPacket.port === pkt.port
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {pkt.desc}
                  </button>
                ))}
              </div>

              <button
                onClick={handleTestFirewall}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
              >
                <Filter className="w-4 h-4" />
                <span>Uji Filter Paket Firewall</span>
              </button>
            </div>

            {/* Firewall Rule & Inspection Stage */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Access Control List (ACL) Rules */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white flex items-center space-x-1.5">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>Aturan Akses Firewall (Klik untuk Blokir / Izinkan)</span>
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { port: 443, name: 'HTTPS (Web Aman)', defaultBlocked: false },
                      { port: 80, name: 'HTTP (Web Biasa)', defaultBlocked: false },
                      { port: 22, name: 'SSH (Remote Administration)', defaultBlocked: true },
                      { port: 4444, name: 'Metasploit / Malware Port', defaultBlocked: true },
                    ].map((rule) => {
                      const isBlocked = blockedPorts.includes(rule.port);
                      return (
                        <div
                          key={rule.port}
                          onClick={() => toggleFirewallPort(rule.port)}
                          className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                            isBlocked
                              ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                              : 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          }`}
                        >
                          <div>
                            <span className="font-bold">Port {rule.port}: {rule.name}</span>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                            isBlocked ? 'bg-rose-800 text-white' : 'bg-emerald-800 text-white'
                          }`}>
                            {isBlocked ? 'DROP (DIBLOKIR)' : 'ALLOW (DIIZINKAN)'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Packet Header Inspector */}
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-400 border-b border-slate-800 pb-2 font-sans font-bold flex items-center justify-between">
                    <span>Header Paket Masuk:</span>
                    <span className="text-blue-400">Protokol: {testPacket.proto}</span>
                  </div>
                  <div>IP Pengirim  : <strong className="text-amber-400">{testPacket.ip}</strong></div>
                  <div>Port Tujuan  : <strong className="text-sky-400">{testPacket.port}</strong></div>
                  <div>Keterangan   : <span className="text-slate-300">{testPacket.desc}</span></div>

                  {fwDecision && (
                    <div className={`mt-4 p-3 rounded-xl border text-xs font-sans font-bold transition-all ${
                      fwDecision.status === 'ALLOW'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-rose-950 border-rose-500 text-rose-300'
                    }`}>
                      {fwDecision.reason}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 11: DATABASE NORMALIZATION (AD BAB 3) */}
        {/* ------------------------------------------------------------- */}
        {type === 'database-normalization-simulator' && (
          <div className="space-y-5">
            {/* Stage Selector */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'UNF', label: 'Tabel Belum Ternormalisasi (UNF / Flat Table)' },
                { id: '1NF', label: 'Bentuk Normal 1 (1NF: Data Atomik)' },
                { id: '2NF', label: 'Bentuk Normal 2 (2NF: Pisahkan Ketergantungan Parsial)' },
                { id: '3NF', label: 'Bentuk Normal 3 (3NF: Hapus Ketergantungan Transitif)' },
              ].map((stg) => (
                <button
                  key={stg.id}
                  onClick={() => { setNormLevel(stg.id as any); triggerXP(10); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    normLevel === stg.id
                      ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/40'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {stg.label}
                </button>
              ))}
            </div>

            {/* Visual Table Schema Presentation */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>Struktur Skema Basis Data Relasional: <strong className="text-white">{normLevel}</strong></span>
                <span className="text-emerald-400 font-mono">
                  {normLevel === 'UNF' && '⚠️ Bahaya Anomali Redundansi Data'}
                  {normLevel === '1NF' && '✅ Nilai Setiap Kolom Bersifat Atomik'}
                  {normLevel === '2NF' && '✅ Tidak Ada Ketergantungan Parsial'}
                  {normLevel === '3NF' && '🎯 Struktur Optimal Tanpa Ketergantungan Transitif'}
                </span>
              </div>

              {normLevel === 'UNF' && (
                <div className="space-y-2 overflow-x-auto">
                  <div className="text-xs text-rose-400">Satu baris menyimpan banyak mata pelajaran (Repeating Group):</div>
                  <table className="w-full text-xs text-left border border-slate-800 font-mono">
                    <thead className="bg-slate-900 text-slate-400">
                      <tr>
                        <th className="p-2 border border-slate-800">NISN</th>
                        <th className="p-2 border border-slate-800">Nama Siswa</th>
                        <th className="p-2 border border-slate-800">Kelas</th>
                        <th className="p-2 border border-slate-800">Mata Pelajaran (List Ganda)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 border border-slate-800">101</td>
                        <td className="p-2 border border-slate-800">Ahmad</td>
                        <td className="p-2 border border-slate-800">X-1</td>
                        <td className="p-2 border border-slate-800 text-rose-300">Informatika, Matematika, Fisika</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-800">102</td>
                        <td className="p-2 border border-slate-800">Budi</td>
                        <td className="p-2 border border-slate-800">X-2</td>
                        <td className="p-2 border border-slate-800 text-rose-300">Informatika, Kimia</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {normLevel === '1NF' && (
                <div className="space-y-2 overflow-x-auto">
                  <div className="text-xs text-emerald-400">Dipecah sehingga 1 baris hanya memiliki 1 nilai tunggal (Atomik):</div>
                  <table className="w-full text-xs text-left border border-slate-800 font-mono">
                    <thead className="bg-slate-900 text-slate-400">
                      <tr>
                        <th className="p-2 border border-slate-800">NISN (PK)</th>
                        <th className="p-2 border border-slate-800">Nama Siswa</th>
                        <th className="p-2 border border-slate-800">Kode Mapel (PK)</th>
                        <th className="p-2 border border-slate-800">Nama Mapel</th>
                        <th className="p-2 border border-slate-800">Guru</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-2 border border-slate-800">101</td><td className="p-2 border border-slate-800">Ahmad</td><td className="p-2 border border-slate-800">INF</td><td className="p-2 border border-slate-800">Informatika</td><td className="p-2 border border-slate-800">Pak Rian</td></tr>
                      <tr><td className="p-2 border border-slate-800">101</td><td className="p-2 border border-slate-800">Ahmad</td><td className="p-2 border border-slate-800">MAT</td><td className="p-2 border border-slate-800">Matematika</td><td className="p-2 border border-slate-800">Bu Dian</td></tr>
                      <tr><td className="p-2 border border-slate-800">102</td><td className="p-2 border border-slate-800">Budi</td><td className="p-2 border border-slate-800">INF</td><td className="p-2 border border-slate-800">Informatika</td><td className="p-2 border border-slate-800">Pak Rian</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              {normLevel === '2NF' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-blue-400 font-sans">Tabel Siswa (PK: NISN)</strong>
                    <div>101 | Ahmad | X-1</div>
                    <div>102 | Budi  | X-2</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 font-sans">Tabel Ambil_Kursus (FK: NISN, Kode_Mapel)</strong>
                    <div>101 | INF</div>
                    <div>101 | MAT</div>
                    <div>102 | INF</div>
                  </div>
                </div>
              )}

              {normLevel === '3NF' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-blue-400 font-sans block">tb_siswa</strong>
                    <div>NISN (PK)</div>
                    <div>nama_siswa</div>
                    <div>kelas_id (FK)</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 font-sans block">tb_mapel</strong>
                    <div>kode_mapel (PK)</div>
                    <div>nama_mapel</div>
                    <div>guru_id (FK)</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <strong className="text-purple-400 font-sans block">tb_guru</strong>
                    <div>guru_id (PK)</div>
                    <div>nama_guru</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SIMULATOR 12: AI BIAS & DEEPFAKE SCANNER (DSI BAB 3) */}
        {/* ------------------------------------------------------------- */}
        {type === 'ai-bias-detector-simulator' && (
          <div className="space-y-5">
            {/* Slider Control for Training Balance */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Proporsi Representasi Demografis Data Latih:
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                  {demographicBalance}% Kelompok A vs {100 - demographicBalance}% Kelompok B
                </span>
              </div>

              <input
                type="range"
                min={5}
                max={50}
                value={demographicBalance}
                onChange={(e) => {
                  setDemographicBalance(Number(e.target.value));
                  triggerXP(5);
                }}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5% (Sangat Bias / Tidak Seimbang)</span>
                <span>50% (Proporsional & Adil)</span>
              </div>
            </div>

            {/* AI Predictions & Bias Disparity Result */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-slate-300 flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-blue-400" />
                    <span>Akurasi Model Prediksi Kelompok A</span>
                  </span>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    {Math.min(96, Math.floor(60 + demographicBalance * 0.72))}%
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Akurasi tinggi dicapai jika data latih memiliki sampel representatif yang cukup.
                  </span>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-slate-300 flex items-center space-x-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    <span>Tingkat Kesenjangan Disparitas (Disparity Gap)</span>
                  </span>
                  <div className="text-2xl font-bold text-rose-400 font-mono">
                    {Math.max(2, Math.floor((50 - demographicBalance) * 0.9))}% Gap
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Kesenjangan keputusan algoritma akibat data histori yang timpang.
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Deteksi Deepfake Visual Artefak (Klik Indikator yang Dicurigai):</span>
                  <span className="text-amber-400 text-[11px] font-mono">{deepfakeInspected.length}/3 Terpilih</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'blink', label: 'Pola Kedipan Mata Asimetris' },
                    { id: 'teeth', label: 'Tekstur Gigi Kabur / Glitch' },
                    { id: 'shadow', label: 'Arah Bayangan Wajah Tidak Konsisten' }
                  ].map((art) => (
                    <button
                      key={art.id}
                      onClick={() => toggleDeepfakeArtifact(art.id)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                        deepfakeInspected.includes(art.id)
                          ? 'bg-rose-950 border-rose-500 text-rose-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {art.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

function SendPacketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
