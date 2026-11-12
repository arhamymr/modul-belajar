import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  Plus,
  Sparkles,
  BookOpen,
  ArrowUpDown,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Eye,
  RefreshCw,
  X,
  FileSpreadsheet,
  Trash2,
  UserPlus,
  Database,
  Server,
  Check
} from '../icons/phosphor';
import { TeacherProfile, TeacherStudentSummary, StudentProfile, InformaticsElement } from '../types';
import { INITIAL_STUDENTS_DATA, INITIAL_STUDENT_PROFILE, INFORMATICS_ELEMENTS, MODULES_DATA } from '../data/curriculumData';
import { ConfirmModal, ConfirmModalState } from './ConfirmModal';
import { sqliteService, SQLiteDatabaseStatus, UnifiedDatabaseStatus } from '../services/sqliteService';

interface TeacherDashboardProps {
  teacher: TeacherProfile | null;
  onOpenTeacherProfile?: () => void;
  onOpenAuthModal?: () => void;
  onBackToStudentMode: () => void;
  onOpenAITutor: () => void;
  onPreviewModule?: (moduleId: string) => void;
  registeredStudents?: StudentProfile[];
  onAddRegisteredStudent?: (student: StudentProfile) => void;
  onDeleteRegisteredStudent?: (studentId: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  onOpenTeacherProfile,
  onOpenAuthModal,
  onBackToStudentMode,
  onOpenAITutor,
  onPreviewModule,
  registeredStudents = [],
  onAddRegisteredStudent,
  onDeleteRegisteredStudent,
}) => {
  const [students, setStudents] = useState<TeacherStudentSummary[]>(() => {
    const saved = localStorage.getItem('emodul_teacher_students_summary');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(s => !s.id?.startsWith('std-'));
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_STUDENTS_DATA;
  });

  // Automatically sync registered students into teacher's student roster
  useEffect(() => {
    if (!registeredStudents || registeredStudents.length === 0) return;

    setStudents(prevSummaries => {
      const updated = [...prevSummaries];
      let hasChanges = false;

      registeredStudents.forEach(regStudent => {
        const existingIdx = updated.findIndex(
          s => s.id === regStudent.id || (regStudent.nisn && s.nisn === regStudent.nisn) || s.name.toLowerCase() === regStudent.name.toLowerCase()
        );

        const attempts = regStudent.historyAttempts || regStudent.quizHistory || [];
        const avgScore = attempts.length > 0
          ? Math.round(attempts.reduce((acc, a) => acc + (a.score || 0), 0) / attempts.length)
          : (existingIdx >= 0 ? updated[existingIdx].averageScore : 0);

        const kktpStatus = avgScore >= 85 ? 'Sangat Mahir' : avgScore >= 75 ? 'Mahir' : avgScore >= 60 ? 'Cukup' : attempts.length > 0 ? 'Perlu Bimbingan' : 'Belum Asesmen';

        const summaryItem: TeacherStudentSummary = {
          id: regStudent.id || (existingIdx >= 0 ? updated[existingIdx].id : `student-${Date.now()}`),
          name: regStudent.name,
          nisn: regStudent.nisn || (existingIdx >= 0 ? updated[existingIdx].nisn : '-'),
          classGrade: regStudent.classGrade || (existingIdx >= 0 ? updated[existingIdx].classGrade : 'Kelas X-1'),
          completedModulesCount: (regStudent.completedModules || []).length,
          averageScore: avgScore,
          attemptsCount: attempts.length,
          kktpStatus: kktpStatus,
          lastActive: 'Akun Terdaftar',
          elementPerformance: existingIdx >= 0 ? updated[existingIdx].elementPerformance : {
            'BK': avgScore,
            'AP': avgScore,
            'SK': avgScore,
            'JKI': avgScore,
            'AD': avgScore,
            'DSI': avgScore
          }
        };

        if (existingIdx >= 0) {
          if (
            updated[existingIdx].averageScore !== summaryItem.averageScore ||
            updated[existingIdx].completedModulesCount !== summaryItem.completedModulesCount ||
            updated[existingIdx].attemptsCount !== summaryItem.attemptsCount
          ) {
            updated[existingIdx] = { ...updated[existingIdx], ...summaryItem };
            hasChanges = true;
          }
        } else {
          updated.push(summaryItem);
          hasChanges = true;
        }
      });

      return hasChanges ? updated : prevSummaries;
    });
  }, [registeredStudents]);

  // State for Add Student Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newStudentNisn, setNewStudentNisn] = useState<string>('');
  const [newStudentClass, setNewStudentClass] = useState<string>('Kelas X-1');
  const [newStudentScore, setNewStudentScore] = useState<number>(0);

  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudentDetail, setSelectedStudentDetail] = useState<TeacherStudentSummary | null>(null);

  // Class Announcement State
  const [announcementText, setAnnouncementText] = useState<string>('');
  const [announcements, setAnnouncements] = useState<Array<{ id: string; text: string; date: string; author: string }>>(() => {
    const saved = localStorage.getItem('emodul_teacher_announcements');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });
  const [announcementSuccess, setAnnouncementSuccess] = useState(false);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Database State (Unified Neon + SQLite)
  const [sqliteStatus, setSqliteStatus] = useState<SQLiteDatabaseStatus | null>(null);
  const [dbStatus, setDbStatus] = useState<UnifiedDatabaseStatus | null>(null);
  const [isRefreshingDb, setIsRefreshingDb] = useState<boolean>(false);
  const [isNeonModalOpen, setIsNeonModalOpen] = useState<boolean>(false);
  const [testConnectionString, setTestConnectionString] = useState<string>('');
  const [testResult, setTestResult] = useState<{ loading: boolean; data: any | null; error?: string }>({ loading: false, data: null });
  const [migrationResult, setMigrationResult] = useState<{ loading: boolean; data: any | null; error?: string }>({ loading: false, data: null });

  // Load from database on mount
  useEffect(() => {
    let isMounted = true;
    async function loadDataFromDB() {
      try {
        const [status, unified, summaries, anns] = await Promise.all([
          sqliteService.getStatus(),
          sqliteService.getUnifiedStatus(),
          sqliteService.getTeacherStudentSummaries(),
          sqliteService.getAnnouncements(),
        ]);
        if (!isMounted) return;
        if (status) setSqliteStatus(status);
        if (unified) setDbStatus(unified);
        if (Array.isArray(summaries)) {
          setStudents(summaries);
        }
        if (Array.isArray(anns)) {
          setAnnouncements(anns);
        }
      } catch (e) {
        console.warn('DB fetch in TeacherDashboard:', e);
      }
    }
    loadDataFromDB();
    return () => { isMounted = false; };
  }, []);

  const handleRefreshSqliteStatus = async () => {
    setIsRefreshingDb(true);
    try {
      const [status, unified] = await Promise.all([
        sqliteService.getStatus(),
        sqliteService.getUnifiedStatus(),
      ]);
      if (status) setSqliteStatus(status);
      if (unified) setDbStatus(unified);
      const summaries = await sqliteService.getTeacherStudentSummaries();
      if (Array.isArray(summaries)) setStudents(summaries);
      const anns = await sqliteService.getAnnouncements();
      if (Array.isArray(anns)) setAnnouncements(anns);

      const engineName = unified?.activeEngine === 'neon' ? 'Neon PostgreSQL (Cloud)' : 'SQLite Server (data/emodul.sqlite)';
      setToastMessage(`Data berhasil disinkronkan langsung dari basis data aktif: ${engineName}`);
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsRefreshingDb(false);
    }
  };

  const handleTestNeonConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestResult({ loading: true, data: null });
    try {
      const res = await sqliteService.testNeon(testConnectionString || undefined);
      if (res.success) {
        setTestResult({ loading: false, data: res });
      } else {
        setTestResult({ loading: false, data: null, error: res.message || res.error || 'Gagal terhubung' });
      }
    } catch (err: any) {
      setTestResult({ loading: false, data: null, error: err.message });
    }
  };

  const handleMigrateToNeon = async () => {
    setMigrationResult({ loading: true, data: null });
    try {
      const res = await sqliteService.migrateToNeon(testConnectionString || undefined);
      if (res.success) {
        setMigrationResult({ loading: false, data: res });
        const updated = await sqliteService.getUnifiedStatus();
        if (updated) setDbStatus(updated);
      } else {
        setMigrationResult({ loading: false, data: null, error: res.message || res.error || 'Gagal migrasi' });
      }
    } catch (err: any) {
      setMigrationResult({ loading: false, data: null, error: err.message });
    }
  };

  // Sync students and announcements to localStorage
  useEffect(() => {
    localStorage.setItem('emodul_teacher_students_summary', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('emodul_teacher_announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentNisn.trim()) return;

    const score = Number(newStudentScore) || 0;
    const kktpStatus = score >= 85 ? 'Sangat Mahir' : score >= 75 ? 'Mahir' : score >= 60 ? 'Cukup' : 'Perlu Bimbingan';

    const newStudentId = `student-${Date.now()}`;
    const newStudent: TeacherStudentSummary = {
      id: newStudentId,
      name: newStudentName.trim(),
      nisn: newStudentNisn.trim(),
      classGrade: newStudentClass,
      completedModulesCount: score >= 75 ? 1 : 0,
      averageScore: score,
      attemptsCount: score > 0 ? 1 : 0,
      kktpStatus,
      lastActive: 'Baru saja',
      elementPerformance: {
        'BK': score,
        'AP': score,
        'SK': score,
        'JKI': score,
        'AD': score,
        'DSI': score
      }
    };

    setStudents([newStudent, ...students]);
    sqliteService.saveTeacherStudentSummary(newStudent);

    // Also register this student into persistent accounts
    if (onAddRegisteredStudent) {
      const newStudentProfile: StudentProfile = {
        ...INITIAL_STUDENT_PROFILE,
        id: newStudentId,
        role: 'siswa',
        name: newStudentName.trim(),
        nisn: newStudentNisn.trim(),
        school: teacher?.school || 'SMA Negeri 1 Edukasi',
        classGrade: newStudentClass,
        password: 'password123',
        xp: score * 5,
        level: Math.floor((score * 5) / 500) + 1,
        registeredAt: new Date().toISOString(),
        savedLocally: true,
      };
      onAddRegisteredStudent(newStudentProfile);
    }

    setNewStudentName('');
    setNewStudentNisn('');
    setNewStudentScore(0);
    setIsAddModalOpen(false);
  };

  const requestDeleteStudent = (student: TeacherStudentSummary) => {
    setConfirmModal({
      isOpen: true,
      title: 'Hapus Data Siswa',
      message: `Apakah Anda yakin ingin menghapus data siswa "${student.name}" (${student.nisn ? `NISN: ${student.nisn}` : student.classGrade}) dari rekapitulasi kelas?\n\nData asesmen dan capaian belajar siswa ini akan dihapus dari dashboard guru.`,
      confirmLabel: 'Hapus Data Siswa',
      cancelLabel: 'Batal',
      confirmVariant: 'danger',
      onConfirm: () => {
        sqliteService.deleteTeacherStudentSummary(student.id);
        setStudents(prev => {
          const updated = prev.filter(s => s.id !== student.id);
          try {
            localStorage.setItem('emodul_teacher_students_summary', JSON.stringify(updated));
          } catch (e) {
            console.error(e);
          }
          return updated;
        });
        if (selectedStudentDetail?.id === student.id) {
          setSelectedStudentDetail(null);
        }
        if (onDeleteRegisteredStudent) {
          onDeleteRegisteredStudent(student.id);
        }
        setToastMessage(`Data siswa "${student.name}" berhasil dihapus.`);
        setTimeout(() => setToastMessage(null), 3000);
      }
    });
  };

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;

    const newAnn = {
      id: `ann-${Date.now()}`,
      text: announcementText.trim(),
      date: 'Baru saja',
      author: teacher?.name || 'Guru Informatika'
    };

    setAnnouncements([newAnn, ...announcements]);
    sqliteService.saveAnnouncement(newAnn);
    setAnnouncementText('');
    setAnnouncementSuccess(true);
    setTimeout(() => setAnnouncementSuccess(false), 2500);
  };

  // Kumpulan kelas yang ada dari daftar siswa terdaftar
  const distinctClasses = Array.from(
    new Set(
      students.map(s => s.classGrade.split(' - ')[0].trim()).filter(Boolean)
    )
  ).sort();

  const filteredStudents = students.filter(s => {
    const matchClass = selectedClass === 'ALL' || 
                        s.classGrade.toLowerCase().includes(selectedClass.toLowerCase()) || 
                        (selectedClass === 'Kelas X-1' && s.classGrade.includes('Rombel 1')) ||
                        (selectedClass === 'Kelas X-2' && s.classGrade.includes('Rombel 2')) ||
                        (selectedClass === 'Kelas X-3' && s.classGrade.includes('Rombel 3')) ||
                        (selectedClass === 'Kelas X-4' && s.classGrade.includes('Rombel 4'));
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        s.nisn.includes(searchQuery);
    return matchClass && matchSearch;
  });

  const totalEvaluations = students.reduce((acc, s) => acc + s.attemptsCount, 0);
  const averageClassScore = students.length > 0 
    ? Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)
    : 0;
  const tuntasCount = students.filter(s => s.averageScore >= 75).length;
  const tuntasPercentage = students.length > 0 
    ? Math.round((tuntasCount / students.length) * 100)
    : 0;

  // Ekspor Nilai ke format Microsoft Excel (.xls) berstandar rapi & profesional
  const handleExportExcel = () => {
    const classLabel = selectedClass === 'ALL' ? 'Semua Kelas (X-1 s.d X-4)' : selectedClass;
    const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const teacherName = teacher?.name || 'Guru Pengampu Informatika';
    const teacherNip = teacher?.nip || '-';
    const schoolName = teacher?.school || 'SMA Negeri 1 Prestasi Bangsa';

    // HTML Spreadsheet Template yang kompatibel dengan Microsoft Excel & Google Sheets
    const excelTemplate = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Rekap Nilai Siswa</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          body { font-family: 'Segoe UI', Calibri, Arial, sans-serif; }
          .title-school { font-size: 14pt; font-weight: bold; color: #1E3A8A; text-align: left; }
          .title-report { font-size: 15pt; font-weight: bold; color: #0F172A; text-align: left; }
          .meta-label { font-weight: bold; color: #475569; width: 140px; font-size: 10pt; }
          .meta-value { color: #0F172A; font-size: 10pt; }
          table.data-table { border-collapse: collapse; width: 100%; margin-top: 15px; }
          th { background-color: #2563EB; color: #FFFFFF; font-weight: bold; text-align: center; border: 1px solid #1D4ED8; padding: 8px 6px; font-size: 10pt; }
          th.sub-th { background-color: #3B82F6; font-size: 9pt; }
          td { border: 1px solid #CBD5E1; padding: 6px 8px; font-size: 10pt; vertical-align: middle; }
          td.center { text-align: center; }
          td.bold { font-weight: bold; }
          td.text-format { mso-number-format:"\\@"; }
          .tuntas { background-color: #DCFCE7; color: #15803D; font-weight: bold; text-align: center; }
          .remedial { background-color: #FEF3C7; color: #B45309; font-weight: bold; text-align: center; }
          .summary-row { background-color: #F8FAFC; font-weight: bold; }
        </style>
      </head>
      <body>
        <table style="border:none; margin-bottom: 12px;">
          <tr>
            <td colspan="15" class="title-school" style="border:none;">${schoolName.toUpperCase()}</td>
          </tr>
          <tr>
            <td colspan="15" class="title-report" style="border:none;">REKAPITULASI BUKU NILAI HASIL BELAJAR INFORMATIKA (KURIKULUM MERDEKA)</td>
          </tr>
          <tr>
            <td colspan="15" style="border:none; font-size: 10pt; color: #64748B;">INFORMATIKA SMA - KELAS X | SEMESTER GANJIL / GENAP</td>
          </tr>
          <tr style="height: 10px;"><td colspan="15" style="border:none;"></td></tr>
          <tr>
            <td colspan="2" class="meta-label" style="border:none;">Mata Pelajaran:</td>
            <td colspan="4" class="meta-value" style="border:none;">Informatika SMA</td>
            <td colspan="2" class="meta-label" style="border:none;">Guru Pengampu:</td>
            <td colspan="7" class="meta-value" style="border:none;">${teacherName} (NIP: ${teacherNip})</td>
          </tr>
          <tr>
            <td colspan="2" class="meta-label" style="border:none;">Kelas:</td>
            <td colspan="4" class="meta-value" style="border:none;">${classLabel}</td>
            <td colspan="2" class="meta-label" style="border:none;">Tanggal Unduh:</td>
            <td colspan="7" class="meta-value" style="border:none;">${dateStr}</td>
          </tr>
          <tr>
            <td colspan="2" class="meta-label" style="border:none;">Kriteria KKTP:</td>
            <td colspan="4" class="meta-value" style="border:none;">Minimal 75 (Tuntas)</td>
            <td colspan="2" class="meta-label" style="border:none;">Jumlah Siswa:</td>
            <td colspan="7" class="meta-value" style="border:none;">${filteredStudents.length} Peserta Didik</td>
          </tr>
        </table>

        <table class="data-table">
          <thead>
            <tr>
              <th rowspan="2" style="width: 40px;">No</th>
              <th rowspan="2" style="width: 130px;">NISN</th>
              <th rowspan="2" style="width: 220px;">Nama Lengkap Siswa</th>
              <th rowspan="2" style="width: 90px;">Kelas</th>
              <th rowspan="2" style="width: 80px;">Modul Selesai</th>
              <th colspan="6" class="sub-th">Nilai Elemen Capaian Pembelajaran (0-100)</th>
              <th rowspan="2" style="width: 90px;">Rata-rata Nilai</th>
              <th rowspan="2" style="width: 120px;">Predikat KKTP</th>
              <th rowspan="2" style="width: 110px;">Status Kelulusan</th>
            </tr>
            <tr>
              <th class="sub-th" style="width: 55px;">BK</th>
              <th class="sub-th" style="width: 55px;">AP</th>
              <th class="sub-th" style="width: 55px;">SK</th>
              <th class="sub-th" style="width: 55px;">JKI</th>
              <th class="sub-th" style="width: 55px;">AD</th>
              <th class="sub-th" style="width: 55px;">DSI</th>
            </tr>
          </thead>
          <tbody>
            ${filteredStudents.map((s, index) => {
              const ep = s.elementPerformance || {};
              const bk = ep['BK'] ?? s.averageScore;
              const ap = ep['AP'] ?? s.averageScore;
              const sk = ep['SK'] ?? s.averageScore;
              const jki = ep['JKI'] ?? s.averageScore;
              const ad = ep['AD'] ?? s.averageScore;
              const dsi = ep['DSI'] ?? s.averageScore;
              const isTuntas = s.averageScore >= 75;

              return `
                <tr>
                  <td class="center">${index + 1}</td>
                  <td class="center text-format">'${s.nisn}</td>
                  <td class="bold">${s.name}</td>
                  <td class="center">${s.classGrade.split(' - ')[0] || s.classGrade}</td>
                  <td class="center">${s.completedModulesCount} / 6</td>
                  <td class="center">${bk}</td>
                  <td class="center">${ap}</td>
                  <td class="center">${sk}</td>
                  <td class="center">${jki}</td>
                  <td class="center">${ad}</td>
                  <td class="center">${dsi}</td>
                  <td class="center bold" style="background-color: ${isTuntas ? '#F0FDF4' : '#FFFBEB'};">${s.averageScore}</td>
                  <td class="center">${s.kktpStatus}</td>
                  <td class="${isTuntas ? 'tuntas' : 'remedial'}">${isTuntas ? 'TUNTAS' : 'PERLU BIMBINGAN'}</td>
                </tr>
              `;
            }).join('')}
            <tr class="summary-row">
              <td colspan="4" class="bold center" style="background-color: #E2E8F0;">RATA-RATA KELAS</td>
              <td class="center bold" style="background-color: #E2E8F0;">${(filteredStudents.reduce((acc, s) => acc + s.completedModulesCount, 0) / (filteredStudents.length || 1)).toFixed(1)}</td>
              <td class="center bold" style="background-color: #E2E8F0;">${(filteredStudents.reduce((acc, s) => acc + ((s.elementPerformance && s.elementPerformance['BK']) ?? s.averageScore), 0) / (filteredStudents.length || 1)).toFixed(0)}</td>
              <td class="center bold" style="background-color: #E2E8F0;">${(filteredStudents.reduce((acc, s) => acc + ((s.elementPerformance && s.elementPerformance['AP']) ?? s.averageScore), 0) / (filteredStudents.length || 1)).toFixed(0)}</td>
              <td class="center bold" style="background-color: #E2E8F0;">${(filteredStudents.reduce((acc, s) => acc + ((s.elementPerformance && s.elementPerformance['SK']) ?? s.averageScore), 0) / (filteredStudents.length || 1)).toFixed(0)}</td>
              <td class="center bold" style="background-color: #E2E8F0;">${(filteredStudents.reduce((acc, s) => acc + ((s.elementPerformance && s.elementPerformance['JKI']) ?? s.averageScore), 0) / (filteredStudents.length || 1)).toFixed(0)}</td>
              <td class="center bold" style="background-color: #E2E8F0;">${(filteredStudents.reduce((acc, s) => acc + ((s.elementPerformance && s.elementPerformance['AD']) ?? s.averageScore), 0) / (filteredStudents.length || 1)).toFixed(0)}</td>
              <td class="center bold" style="background-color: #E2E8F0;">${(filteredStudents.reduce((acc, s) => acc + ((s.elementPerformance && s.elementPerformance['DSI']) ?? s.averageScore), 0) / (filteredStudents.length || 1)).toFixed(0)}</td>
              <td class="center bold" style="background-color: #DBEAFE; font-size: 11pt;">${averageClassScore}</td>
              <td colspan="2" class="center bold" style="background-color: #DBEAFE;">Ketuntasan KKTP: ${tuntasPercentage}% (${tuntasCount}/${filteredStudents.length} Siswa)</td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelTemplate], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rekap_Nilai_Informatika_${selectedClass.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Header with Teacher Context */}
      <div className="bg-purple-950 rounded-3xl text-white p-6 sm:p-8 shadow-xl border border-purple-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Portal Pendidik Terautentikasi</span>
            </div>
            {teacher && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>NIP: {teacher.nip}</span>
              </span>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dashboard Guru: {teacher ? teacher.name : 'Informatika SMA'}
            </h1>
            <p className="text-purple-200 text-xs sm:text-sm max-w-2xl leading-relaxed mt-1">
              {teacher?.school || 'SMA Negeri 1 Prestasi Bangsa'} • Mata Pelajaran: {teacher?.subject || 'Informatika Kurikulum Merdeka (SMA)'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onOpenTeacherProfile && (
            <button
              id="dashboard-teacher-profile-btn"
              onClick={onOpenTeacherProfile}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all flex items-center space-x-2 backdrop-blur-xs"
            >
              <User className="w-4 h-4" />
              <span>Profil Guru</span>
            </button>
          )}

          <button
            id="export-excel-btn"
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center space-x-2 shadow-md"
            title="Unduh format tabel Excel rapi (.xls) lengkap dengan kop dan capaian elemen"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Ekspor Excel (.xls)</span>
          </button>

          <button
            id="teacher-back-student-mode-btn"
            onClick={onBackToStudentMode}
            className="px-4 py-2.5 rounded-xl bg-white text-purple-950 hover:bg-purple-50 text-xs font-extrabold transition-all shadow-md flex items-center space-x-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lihat Modul Materi</span>
          </button>
        </div>
      </div>

      {/* Database Engine Status Banner (Neon Cloud / SQLite) */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-5 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
            dbStatus?.activeEngine === 'neon'
              ? 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400'
              : 'bg-blue-500/10 border-blue-400/20 text-blue-400'
          }`}>
            {dbStatus?.activeEngine === 'neon' ? <Server className="w-5 h-5" /> : <Database className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  dbStatus?.activeEngine === 'neon' ? 'bg-emerald-400' : 'bg-cyan-400'
                }`} />
                {dbStatus?.activeEngine === 'neon'
                  ? 'Neon Serverless PostgreSQL (Cloud Aktif)'
                  : 'Database SQLite Lokal Terhubung'}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                dbStatus?.activeEngine === 'neon'
                  ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300'
                  : 'bg-blue-500/20 border-blue-400/30 text-blue-300'
              }`}>
                {dbStatus?.activeEngine === 'neon'
                  ? `${dbStatus.neon?.database || 'neondb'} • ${dbStatus.neon?.latencyMs || 0} ms Latensi`
                  : 'WAL Mode • data/emodul.sqlite'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {dbStatus?.activeEngine === 'neon'
                ? 'Seluruh data tersimpan abadi di cloud Neon Serverless PostgreSQL dan tersinkronisasi antar-komputer secara real-time.'
                : 'Arsitektur database cloud siap menyimpan data pembelajaran secara permanen dan real-time.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            id="btn-neon-settings"
            onClick={() => setIsNeonModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 border border-purple-500/40 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            title="Buka pengaturan dan pengujian koneksi database Neon"
          >
            <Server className="w-3.5 h-3.5 text-purple-200" />
            <span>Integrasi Database Neon</span>
          </button>
          <button
            type="button"
            onClick={handleRefreshSqliteStatus}
            disabled={isRefreshingDb}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            title="Muat ulang & sinkronkan data langsung dari basis data aktif"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingDb ? 'animate-spin' : ''}`} />
            <span>Sinkronkan</span>
          </button>
        </div>
      </div>

      {/* Top Class Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Rata-rata Nilai Kelas</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {averageClassScore} <span className="text-xs font-normal text-slate-700">/ 100</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Mencapai Kriteria KKTP Minimal (&ge;75)</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Tingkat Ketuntasan (KKTP)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {tuntasPercentage}%
          </div>
          <p className="text-[11px] text-slate-700">
            {tuntasCount} dari {students.length} Siswa tuntas belajar
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Total Evaluasi Masuk</span>
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {totalEvaluations} Sesi
          </div>
          <p className="text-[11px] text-slate-700">
            Latihan mandiri & try out asesmen sumatif
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Siswa Perlu Remidial</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-600">
            {students.length - tuntasCount} Siswa
          </div>
          <p className="text-[11px] text-slate-700">
            Membutuhkan pendampingan & bimbingan
          </p>
        </div>
      </div>

      {/* Class Roster Table & Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-0">
        {/* Table Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Rekapitulasi Nilai & Capaian Belajar Siswa
              </h2>
              <p className="text-xs text-slate-500">Klik nama siswa untuk melihat analisis diagnostik 6 elemen informatika</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Add Student Button */}
            <button
              type="button"
              id="btn-add-student-teacher"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Tambah Siswa</span>
            </button>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama atau NISN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-purple-500 w-44 sm:w-56"
              />
            </div>

            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">Semua Kelas</option>
              {distinctClasses.length > 0 ? (
                distinctClasses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))
              ) : (
                <>
                  <option value="Kelas X-1">Kelas X-1</option>
                  <option value="Kelas X-2">Kelas X-2</option>
                  <option value="Kelas X-3">Kelas X-3</option>
                  <option value="Kelas X-4">Kelas X-4</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Nama Lengkap Siswa</th>
                <th className="p-4">NISN</th>
                <th className="p-4">Kelas</th>
                <th className="p-4 text-center">Modul Tuntas</th>
                <th className="p-4 text-center">Rata-rata Nilai</th>
                <th className="p-4">Status KKTP</th>
                <th className="p-4">Aktivitas Terakhir</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Users className="w-8 h-8 text-slate-400" />
                      <p className="font-bold text-sm text-slate-700">Belum Ada Data Siswa</p>
                      <p className="text-xs text-slate-500 max-w-sm">
                        Belum ada siswa yang terdaftar di kelas ini. Anda dapat menginput data siswa sendiri menggunakan tombol di bawah.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="mt-2 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-xs"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Input Siswa Sekarang</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )}
              {filteredStudents.map((s) => (
                <tr 
                  key={s.id} 
                  onClick={() => setSelectedStudentDetail(s)}
                  className="hover:bg-purple-50/50 transition-colors cursor-pointer"
                >
                  <td className="p-4 font-bold text-slate-900 flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      {s.name ? s.name[0].toUpperCase() : 'S'}
                    </div>
                    <div>
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-slate-700">{s.nisn}</td>
                  <td className="p-4 text-slate-700 font-medium">{s.classGrade}</td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      {s.completedModulesCount} / 6
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-sm">
                    <span className={s.averageScore >= 85 ? 'text-emerald-700' : s.averageScore >= 75 ? 'text-blue-700' : 'text-amber-700'}>
                      {s.averageScore}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      s.kktpStatus === 'Sangat Mahir'
                        ? 'bg-emerald-100 text-emerald-800'
                        : s.kktpStatus === 'Mahir'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {s.kktpStatus}
                    </span>
                  </td>
                  <td className="p-4 text-slate-700">{s.lastActive}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStudentDetail(s);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors font-bold text-[10px]"
                      >
                        Detail Rapor
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          requestDeleteStudent(s);
                        }}
                        title={`Hapus data siswa ${s.name}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Communication & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Post Announcement */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Send className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Kirim Instruksi / Pengumuman Kelas
            </h3>
          </div>

          <form onSubmit={handlePublishAnnouncement} className="space-y-3">
            <textarea
              rows={4}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Tuliskan instruksi belajar, jadwal tugas kuis, atau materi tambahan untuk siswa..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-purple-500 resize-none"
              required
            />

            {announcementSuccess && (
              <div className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pengumuman berhasil disiarkan ke kelas!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publikasikan ke Siswa</span>
            </button>
          </form>
        </div>

        {/* Live Broadcast Stream */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">
                Siaran Informasi & Catatan Pembelajaran Aktif
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">{announcements.length} Siaran</span>
          </div>

          <div className="space-y-3">
            {announcements.length === 0 ? (
              <div className="p-6 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-1">
                <p className="text-xs font-semibold text-slate-700">Belum Ada Pengumuman</p>
                <p className="text-[11px] text-slate-500">Tulis instruksi atau pengumuman melalui formulir di samping untuk dikirimkan ke siswa.</p>
              </div>
            ) : (
              announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="p-4 rounded-xl bg-purple-50/40 border border-purple-100 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-purple-900">{ann.author}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-500">{ann.date}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmModal({
                            isOpen: true,
                            title: 'Hapus Siaran Pengumuman',
                            message: 'Apakah Anda yakin ingin menghapus siaran instruksi pengumuman ini?',
                            confirmLabel: 'Hapus Pengumuman',
                            cancelLabel: 'Batal',
                            confirmVariant: 'danger',
                            onConfirm: () => {
                              sqliteService.deleteAnnouncement(ann.id);
                              setAnnouncements(prev => prev.filter(a => a.id !== ann.id));
                              setToastMessage('Pengumuman berhasil dihapus.');
                              setTimeout(() => setToastMessage(null), 3000);
                            }
                          });
                        }}
                        title="Hapus pengumuman"
                        className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {ann.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-6">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Tambah Siswa Baru
                  </h3>
                  <p className="text-[11px] text-slate-500">Input data siswa ke rekapitulasi nilai</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Siswa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Rizky Pratama"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NISN *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 0071234567"
                    value={newStudentNisn}
                    onChange={(e) => setNewStudentNisn(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kelas *
                  </label>
                  <select
                    value={newStudentClass}
                    onChange={(e) => setNewStudentClass(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-hidden font-semibold"
                  >
                    <option value="Kelas X-1">Kelas X-1</option>
                    <option value="Kelas X-2">Kelas X-2</option>
                    <option value="Kelas X-3">Kelas X-3</option>
                    <option value="Kelas X-4">Kelas X-4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nilai Rata-rata Awal (Opsional, 0 - 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newStudentScore || ''}
                  placeholder="0"
                  onChange={(e) => setNewStudentScore(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-xs"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 my-6">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                  {selectedStudentDetail.name ? selectedStudentDetail.name[0].toUpperCase() : 'S'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedStudentDetail.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    NISN: {selectedStudentDetail.nisn} • {selectedStudentDetail.classGrade}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudentDetail(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
              {/* Overall Metric */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Rata-rata Nilai</div>
                  <div className="text-xl font-black text-slate-900 mt-1">
                    {selectedStudentDetail.averageScore}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Modul Tuntas</div>
                  <div className="text-xl font-black text-purple-600 mt-1">
                    {selectedStudentDetail.completedModulesCount} / 6
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Status KKTP</div>
                  <div className="text-xs font-bold text-emerald-600 mt-2">
                    {selectedStudentDetail.kktpStatus}
                  </div>
                </div>
              </div>

              {/* Element Radar Performance */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Penguasaan 6 Elemen Capaian Pembelajaran (CP)
                </h4>
                <div className="space-y-2">
                  {Object.entries(selectedStudentDetail.elementPerformance).map(([elemKey, score]) => {
                    const info = INFORMATICS_ELEMENTS[elemKey];
                    return (
                      <div key={elemKey} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800">
                            {info?.name || elemKey} ({elemKey})
                          </span>
                          <span className="font-bold text-slate-900">{score}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${score}%`,
                              backgroundColor: info?.color || '#3B82F6',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Neon Serverless PostgreSQL Modal */}
      {isNeonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-400 flex items-center justify-center">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Integrasi Neon PostgreSQL</h3>
                  <p className="text-xs text-slate-400">Database Cloud Serverless Skala Produksi</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNeonModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600">
              {/* Status Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    Status Database Saat Ini
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    dbStatus?.activeEngine === 'neon'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}>
                    {dbStatus?.activeEngine === 'neon' ? 'Neon Cloud Aktif' : 'SQLite Lokal Siap Migrasi'}
                  </span>
                </div>
                <p className="text-slate-600">
                  {dbStatus?.message || 'Database SQLite lokal sedang aktif melayani semua modul, nilai, dan akun siswa.'}
                </p>
                {dbStatus?.neon?.maskedUrl && (
                  <div className="text-[11px] font-mono text-purple-700 bg-purple-50 p-2 rounded-lg break-all">
                    URL: {dbStatus.neon.maskedUrl}
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
                <h4 className="font-bold text-purple-950 flex items-center space-x-1.5 text-xs">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Petunjuk Aktivasi Database Cloud:</span>
                </h4>
                <ol className="list-decimal pl-4 space-y-1 text-slate-700 leading-relaxed">
                  <li>Buat project baru di <strong>console.neon.tech</strong> (bebas biaya/Free Tier).</li>
                  <li>Salin <strong>Connection String</strong> berformat: <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-900 font-mono text-[10px]">postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require</code>.</li>
                  <li>Masukkan ke environment variable <code className="bg-purple-100 px-1 py-0.5 rounded text-purple-900 font-mono text-[10px]">DATABASE_URL</code> di server.</li>
                  <li>Atau lakukan pengujian langsung melalui formulir di bawah ini:</li>
                </ol>
              </div>

              {/* Test Connection Form */}
              <form onSubmit={handleTestNeonConnection} className="space-y-3">
                <label className="block font-bold text-slate-900 text-xs">
                  Uji Connection String Neon:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testConnectionString}
                    onChange={(e) => setTestConnectionString(e.target.value)}
                    placeholder="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={testResult.loading}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shrink-0"
                  >
                    {testResult.loading ? 'Menguji...' : 'Uji Koneksi'}
                  </button>
                </div>
              </form>

              {/* Test Result Message */}
              {testResult.data && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{testResult.data.message}</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-mono">
                    Latensi: {testResult.data.latencyMs} ms • Server Time: {testResult.data.serverTime}
                  </div>
                </div>
              )}
              {testResult.error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{testResult.error}</span>
                </div>
              )}

              {/* Migration Action */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">Sinkronisasi Data SQLite ke Neon</span>
                  <span className="text-[10px] text-slate-400">1-Klik Eksekusi</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Salin seluruh akun siswa, guru, catatan modul, riwayat kuis, dan analisis nilai yang ada di SQLite lokal ke database Neon PostgreSQL.
                </p>
                <button
                  type="button"
                  onClick={handleMigrateToNeon}
                  disabled={migrationResult.loading}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${migrationResult.loading ? 'animate-spin' : ''}`} />
                  <span>{migrationResult.loading ? 'Memigrasikan Data...' : 'Migrasikan Data ke Neon Sekarang'}</span>
                </button>
              </div>

              {migrationResult.data && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px]">
                  <strong>Sukses:</strong> {migrationResult.data.message}
                </div>
              )}
              {migrationResult.error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px]">
                  <strong>Gagal:</strong> {migrationResult.error}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsNeonModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        state={confirmModal}
        onClose={() => setConfirmModal(null)}
      />
    </div>
  );
};
