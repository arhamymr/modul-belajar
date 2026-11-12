import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "emodul.sqlite");
export const db = new DatabaseSync(dbPath);

// Enable WAL mode for high performance concurrency & enforce foreign keys
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

// Initialize Database Schemas
export function initSQLiteDatabase() {
  db.exec(`
    -- Tabel Akun Siswa
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      nisn TEXT,
      email TEXT,
      password TEXT,
      school TEXT,
      class_grade TEXT,
      avatar TEXT,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      completed_modules TEXT DEFAULT '[]',
      badges TEXT DEFAULT '[]',
      saved_notes TEXT DEFAULT '[]',
      quiz_history TEXT DEFAULT '[]',
      history_attempts TEXT DEFAULT '[]',
      bookmarked_questions TEXT DEFAULT '[]',
      registered_at TEXT,
      updated_at TEXT
    );

    -- Tabel Akun Guru
    CREATE TABLE IF NOT EXISTS teachers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      nip TEXT,
      email TEXT,
      password TEXT,
      school TEXT,
      title TEXT,
      subject TEXT,
      teaching_classes TEXT DEFAULT '[]',
      avatar TEXT,
      phone TEXT,
      last_login TEXT,
      registered_at TEXT,
      updated_at TEXT
    );

    -- Tabel Hasil Evaluasi & Kuis (Asesmen)
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      student_name TEXT,
      student_class TEXT,
      module_id TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      score REAL NOT NULL,
      correct_count INTEGER NOT NULL,
      wrong_count INTEGER NOT NULL,
      grade_letter TEXT NOT NULL,
      kktp_status TEXT NOT NULL,
      time_spent_seconds INTEGER NOT NULL,
      answers TEXT DEFAULT '{}',
      element_scores TEXT DEFAULT '{}',
      created_at TEXT NOT NULL
    );

    -- Tabel Catatan Rangkuman Belajar Siswa
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      module_id TEXT NOT NULL,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      date TEXT NOT NULL,
      timestamp REAL,
      created_at TEXT NOT NULL
    );

    -- Tabel Pengumuman Kelas dari Guru
    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      teacher_id TEXT,
      author TEXT NOT NULL,
      text TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    -- Tabel Ringkasan Analitik Guru
    CREATE TABLE IF NOT EXISTS teacher_students_summary (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      nisn TEXT,
      class_grade TEXT,
      completed_modules_count INTEGER DEFAULT 0,
      average_score REAL DEFAULT 0,
      attempts_count INTEGER DEFAULT 0,
      kktp_status TEXT,
      last_active TEXT,
      element_performance TEXT DEFAULT '{}',
      updated_at TEXT NOT NULL
    );

    -- Tabel Metadata Aplikasi
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_at TEXT
    );
  `);

  seedInitialData();
}

// Seed initial default demo data if empty and not previously seeded
function seedInitialData(force = false) {
  try {
    const isSeeded = (db.prepare("SELECT value FROM app_meta WHERE key = 'starter_seeded'").get() as any)?.value;
    if (isSeeded && !force) {
      return;
    }
  } catch (e) {
    // If app_meta is not queryable yet, continue
  }
  const teacherCount = (db.prepare("SELECT count(*) as count FROM teachers").get() as any)?.count || 0;
  if (teacherCount === 0) {
    const insertTeacher = db.prepare(`
      INSERT INTO teachers (
        id, name, nip, email, password, school, title, subject, teaching_classes, avatar, phone, last_login, registered_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertTeacher.run(
      'guru-1789732655854',
      'ULFA NAHDA, S.Pd.',
      '199604132019032006',
      'ulfanahda34@guru.sma.belajar.id',
      '13April96',
      'UPTD SMAN 2 BUDONG BUDONG',
      'Guru Pengampu Informatika (SMA)',
      'Informatika SMA',
      JSON.stringify(['Kelas X-1', 'Kelas X-2', 'Kelas X-3', 'Kelas X-4']),
      '',
      '',
      'Baru saja',
      '2026-09-27T02:01:56.577Z',
      new Date().toISOString()
    );
  }

  const studentCount = (db.prepare("SELECT count(*) as count FROM students").get() as any)?.count || 0;
  if (studentCount === 0) {
    const insertStudent = db.prepare(`
      INSERT INTO students (
        id, name, nisn, email, password, school, class_grade, avatar, xp, level,
        completed_modules, badges, saved_notes, quiz_history, history_attempts, bookmarked_questions,
        registered_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStudent.run(
      'student-demo-1',
      'Muhammad Rizki Pratama',
      '0081234567',
      'rizki.pratama@siswa.belajar.id',
      'password123',
      'SMA Negeri 1 Edukasi',
      'Kelas X-1',
      '',
      650,
      2,
      JSON.stringify(['mod-1']),
      JSON.stringify([
        {
          id: 'badge-1',
          title: 'Penjelajah Algoritma',
          description: 'Tuntas menyelesaikan modul Berpikir Komputasional',
          icon: 'Sparkles',
          earnedDate: '12 Jan 2026'
        }
      ]),
      JSON.stringify([]),
      JSON.stringify([]),
      JSON.stringify([]),
      JSON.stringify([]),
      '2026-01-15T09:30:00.000Z',
      new Date().toISOString()
    );

    // Initial student summary
    const insertSummary = db.prepare(`
      INSERT OR REPLACE INTO teacher_students_summary (
        id, name, nisn, class_grade, completed_modules_count, average_score, attempts_count, kktp_status, last_active, element_performance, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertSummary.run(
      'student-demo-1',
      'Muhammad Rizki Pratama',
      '0081234567',
      'Kelas X-1',
      1,
      88,
      2,
      'Sangat Mahir',
      'Kemarin, 14:20 WIB',
      JSON.stringify({
        'BK': 92,
        'AP': 85,
        'SK': 88,
        'JKI': 84,
        'AD': 90,
        'DSI': 89
      }),
      new Date().toISOString()
    );
  }

  // Seed default announcement if empty
  const annCount = (db.prepare("SELECT count(*) as count FROM announcements").get() as any)?.count || 0;
  if (annCount === 0) {
    const insertAnn = db.prepare(`
      INSERT INTO announcements (id, teacher_id, author, text, date, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertAnn.run(
      'ann-demo-1',
      'guru-demo-1',
      'Drs. Hendra Kusuma, M.Kom.',
      'Selamat datang di E-Modul Informatika SMA. Silakan pelajari Modul 1 (Berpikir Komputasional) dan selesaikan kuis evaluasi untuk mengklaim sertifikat.',
      '15 Januari 2026',
      new Date().toISOString()
    );
  }

  try {
    db.prepare("INSERT OR REPLACE INTO app_meta (key, value, updated_at) VALUES ('starter_seeded', 'true', ?)").run(new Date().toISOString());
  } catch (e) {
    // ignore
  }
}

// ==========================================
// SQLITE DATA ACCESS HELPERS
// ==========================================

export function formatStudentRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    role: 'siswa',
    name: row.name,
    nisn: row.nisn || '',
    email: row.email || '',
    password: row.password || '',
    school: row.school || '',
    classGrade: row.class_grade || 'Kelas X',
    avatar: row.avatar || '',
    xp: Number(row.xp) || 0,
    level: Number(row.level) || 1,
    completedModules: JSON.parse(row.completed_modules || '[]'),
    badges: JSON.parse(row.badges || '[]'),
    savedNotes: JSON.parse(row.saved_notes || '[]'),
    quizHistory: JSON.parse(row.quiz_history || '[]'),
    historyAttempts: JSON.parse(row.history_attempts || '[]'),
    bookmarkedQuestions: JSON.parse(row.bookmarked_questions || '[]'),
    registeredAt: row.registered_at || '',
    savedLocally: true,
  };
}

export function formatTeacherRow(row: any) {
  if (!row) return null;
  return {
    id: row.id,
    role: 'guru',
    name: row.name,
    nip: row.nip || '',
    email: row.email || '',
    password: row.password || '',
    school: row.school || '',
    title: row.title || 'Guru Pengampu Informatika (SMA)',
    subject: row.subject || 'Informatika (SMA)',
    teachingClasses: JSON.parse(row.teaching_classes || '[]'),
    avatar: row.avatar || '',
    phone: row.phone || '',
    lastLogin: row.last_login || '',
    registeredAt: row.registered_at || '',
    savedLocally: true,
  };
}

// Student Queries
export function getAllStudents() {
  const rows = db.prepare("SELECT * FROM students ORDER BY name ASC").all();
  return rows.map(formatStudentRow);
}

export function getStudentById(id: string) {
  const row = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
  return formatStudentRow(row);
}

export function upsertStudent(student: any) {
  const existing = db.prepare("SELECT id FROM students WHERE id = ?").get(student.id);
  const now = new Date().toISOString();

  if (existing) {
    const update = db.prepare(`
      UPDATE students SET
        name = ?,
        nisn = ?,
        email = ?,
        password = COALESCE(NULLIF(?, ''), password),
        school = ?,
        class_grade = ?,
        avatar = ?,
        xp = ?,
        level = ?,
        completed_modules = ?,
        badges = ?,
        saved_notes = ?,
        quiz_history = ?,
        history_attempts = ?,
        bookmarked_questions = ?,
        updated_at = ?
      WHERE id = ?
    `);

    update.run(
      student.name,
      student.nisn || '',
      student.email || '',
      student.password || '',
      student.school || '',
      student.classGrade || 'Kelas X',
      student.avatar || '',
      Number(student.xp) || 0,
      Number(student.level) || 1,
      JSON.stringify(student.completedModules || []),
      JSON.stringify(student.badges || []),
      JSON.stringify(student.savedNotes || []),
      JSON.stringify(student.quizHistory || []),
      JSON.stringify(student.historyAttempts || []),
      JSON.stringify(student.bookmarkedQuestions || []),
      now,
      student.id
    );
  } else {
    const insert = db.prepare(`
      INSERT INTO students (
        id, name, nisn, email, password, school, class_grade, avatar,
        xp, level, completed_modules, badges, saved_notes, quiz_history,
        history_attempts, bookmarked_questions, registered_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      student.id,
      student.name,
      student.nisn || '',
      student.email || '',
      student.password || 'password123',
      student.school || '',
      student.classGrade || 'Kelas X',
      student.avatar || '',
      Number(student.xp) || 0,
      Number(student.level) || 1,
      JSON.stringify(student.completedModules || []),
      JSON.stringify(student.badges || []),
      JSON.stringify(student.savedNotes || []),
      JSON.stringify(student.quizHistory || []),
      JSON.stringify(student.historyAttempts || []),
      JSON.stringify(student.bookmarkedQuestions || []),
      student.registeredAt || now,
      now
    );
  }

  return getStudentById(student.id);
}

export function deleteStudentById(id: string) {
  const student = db.prepare("SELECT nisn FROM students WHERE id = ?").get(id) as any;
  if (student?.nisn) {
    db.prepare("DELETE FROM students WHERE id = ? OR nisn = ?").run(id, student.nisn);
    db.prepare("DELETE FROM teacher_students_summary WHERE id = ? OR nisn = ?").run(id, student.nisn);
  } else {
    db.prepare("DELETE FROM students WHERE id = ?").run(id);
    db.prepare("DELETE FROM teacher_students_summary WHERE id = ?").run(id);
  }
  db.prepare("DELETE FROM quiz_attempts WHERE student_id = ?").run(id);
  db.prepare("DELETE FROM notes WHERE student_id = ?").run(id);
  return { success: true };
}

// Teacher Queries
export function getAllTeachers() {
  const rows = db.prepare("SELECT * FROM teachers ORDER BY name ASC").all();
  return rows.map(formatTeacherRow);
}

export function getTeacherById(id: string) {
  const row = db.prepare("SELECT * FROM teachers WHERE id = ?").get(id);
  return formatTeacherRow(row);
}

export function upsertTeacher(teacher: any) {
  const existing = db.prepare("SELECT id FROM teachers WHERE id = ?").get(teacher.id);
  const now = new Date().toISOString();

  if (existing) {
    const update = db.prepare(`
      UPDATE teachers SET
        name = ?,
        nip = ?,
        email = ?,
        password = COALESCE(NULLIF(?, ''), password),
        school = ?,
        title = ?,
        subject = ?,
        teaching_classes = ?,
        avatar = ?,
        phone = ?,
        last_login = ?,
        updated_at = ?
      WHERE id = ?
    `);

    update.run(
      teacher.name,
      teacher.nip || '',
      teacher.email || '',
      teacher.password || '',
      teacher.school || '',
      teacher.title || '',
      teacher.subject || '',
      JSON.stringify(teacher.teachingClasses || []),
      teacher.avatar || '',
      teacher.phone || '',
      teacher.lastLogin || 'Baru saja',
      now,
      teacher.id
    );
  } else {
    const insert = db.prepare(`
      INSERT INTO teachers (
        id, name, nip, email, password, school, title, subject,
        teaching_classes, avatar, phone, last_login, registered_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      teacher.id,
      teacher.name,
      teacher.nip || '',
      teacher.email || '',
      teacher.password || 'password123',
      teacher.school || '',
      teacher.title || '',
      teacher.subject || '',
      JSON.stringify(teacher.teachingClasses || []),
      teacher.avatar || '',
      teacher.phone || '',
      teacher.lastLogin || 'Baru saja',
      teacher.registeredAt || now,
      now
    );
  }

  return getTeacherById(teacher.id);
}

export function deleteTeacherById(id: string) {
  const teacher = db.prepare("SELECT nip FROM teachers WHERE id = ?").get(id) as any;
  if (teacher?.nip) {
    db.prepare("DELETE FROM teachers WHERE id = ? OR nip = ?").run(id, teacher.nip);
  } else {
    db.prepare("DELETE FROM teachers WHERE id = ?").run(id);
  }
  db.prepare("DELETE FROM announcements WHERE teacher_id = ?").run(id);
  return { success: true };
}

// Quiz Attempts Queries
export function getAllQuizAttempts(studentId?: string, moduleId?: string) {
  let sql = "SELECT * FROM quiz_attempts WHERE 1=1";
  const params: any[] = [];

  if (studentId) {
    sql += " AND student_id = ?";
    params.push(studentId);
  }
  if (moduleId) {
    sql += " AND module_id = ?";
    params.push(moduleId);
  }

  sql += " ORDER BY created_at DESC";
  const rows = db.prepare(sql).all(...params) as any[];

  return rows.map(r => ({
    id: r.id,
    attemptId: r.id,
    studentId: r.student_id,
    studentName: r.student_name,
    studentClass: r.student_class,
    moduleId: r.module_id,
    timestamp: r.timestamp,
    score: Number(r.score),
    correctCount: Number(r.correct_count),
    wrongCount: Number(r.wrong_count),
    gradeLetter: r.grade_letter,
    kktpStatus: r.kktp_status,
    timeSpentSeconds: Number(r.time_spent_seconds),
    answers: JSON.parse(r.answers || '{}'),
    elementScores: JSON.parse(r.element_scores || '{}'),
    createdAt: r.created_at
  }));
}

export function saveQuizAttempt(attempt: any, studentProfile?: any) {
  const id = attempt.id || attempt.attemptId || `attempt-${Date.now()}`;
  const now = new Date().toISOString();

  const insert = db.prepare(`
    INSERT OR REPLACE INTO quiz_attempts (
      id, student_id, student_name, student_class, module_id,
      timestamp, score, correct_count, wrong_count, grade_letter,
      kktp_status, time_spent_seconds, answers, element_scores, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const studentId = attempt.studentId || studentProfile?.id || 'guest';
  const studentName = attempt.studentName || studentProfile?.name || 'Siswa';
  const studentClass = attempt.studentClass || studentProfile?.classGrade || 'Kelas X';

  insert.run(
    id,
    studentId,
    studentName,
    studentClass,
    attempt.moduleId,
    attempt.timestamp || now,
    Number(attempt.score) || 0,
    Number(attempt.correctCount) || 0,
    Number(attempt.wrongCount) || 0,
    attempt.gradeLetter || 'B',
    attempt.kktpStatus || 'Mahir',
    Number(attempt.timeSpentSeconds) || 0,
    JSON.stringify(attempt.answers || {}),
    JSON.stringify(attempt.elementScores || {}),
    now
  );

  // If student profile provided, also update student's attempts and summary
  if (studentProfile && studentProfile.id) {
    const student = getStudentById(studentProfile.id);
    if (student) {
      const history = student.historyAttempts || [];
      const updatedHistory = [attempt, ...history.filter((a: any) => a.attemptId !== id)];
      student.historyAttempts = updatedHistory;
      student.quizHistory = updatedHistory;
      
      // Calculate average score
      const avgScore = Math.round(updatedHistory.reduce((acc: number, a: any) => acc + (a.score || 0), 0) / updatedHistory.length);
      const kktp = avgScore >= 85 ? 'Sangat Mahir' : avgScore >= 75 ? 'Mahir' : avgScore >= 60 ? 'Cukup' : 'Perlu Bimbingan';

      upsertStudent(student);

      // Update teacher student summary
      upsertTeacherStudentSummary({
        id: student.id,
        name: student.name,
        nisn: student.nisn,
        classGrade: student.classGrade,
        completedModulesCount: student.completedModules?.length || 0,
        averageScore: avgScore,
        attemptsCount: updatedHistory.length,
        kktpStatus: kktp,
        lastActive: 'Baru saja',
        elementPerformance: attempt.elementScores || {}
      });
    }
  }

  return { success: true, attemptId: id };
}

// Notes Queries
export function getNotes(studentId?: string, moduleId?: string) {
  let sql = "SELECT * FROM notes WHERE 1=1";
  const params: any[] = [];

  if (studentId) {
    sql += " AND student_id = ?";
    params.push(studentId);
  }
  if (moduleId) {
    sql += " AND module_id = ?";
    params.push(moduleId);
  }

  sql += " ORDER BY created_at DESC";
  const rows = db.prepare(sql).all(...params) as any[];

  return rows.map(r => ({
    id: r.id,
    studentId: r.student_id,
    moduleId: r.module_id,
    title: r.title,
    text: r.text,
    date: r.date,
    timestamp: r.timestamp,
    createdAt: r.created_at
  }));
}

export function saveNote(note: any) {
  const id = note.id || `note-${Date.now()}`;
  const now = new Date().toISOString();

  const insert = db.prepare(`
    INSERT OR REPLACE INTO notes (
      id, student_id, module_id, title, text, date, timestamp, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    id,
    note.studentId || note.student_id || 'guest',
    note.moduleId || note.module_id || 'mod-1',
    note.title || 'Catatan Baru',
    note.text || '',
    note.date || 'Hari ini',
    Number(note.timestamp) || 0,
    now
  );

  return { success: true, noteId: id };
}

export function deleteNote(id: string) {
  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
  return { success: true };
}

// Announcements Queries
export function getAnnouncements() {
  const rows = db.prepare("SELECT * FROM announcements ORDER BY created_at DESC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    teacherId: r.teacher_id,
    author: r.author,
    text: r.text,
    date: r.date,
    createdAt: r.created_at
  }));
}

export function saveAnnouncement(ann: any) {
  const id = ann.id || `ann-${Date.now()}`;
  const now = new Date().toISOString();

  const insert = db.prepare(`
    INSERT OR REPLACE INTO announcements (
      id, teacher_id, author, text, date, created_at
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    id,
    ann.teacherId || 'guru-1',
    ann.author || 'Guru Pengampu',
    ann.text,
    ann.date || 'Hari ini',
    now
  );

  return { success: true, id };
}

export function deleteAnnouncement(id: string) {
  db.prepare("DELETE FROM announcements WHERE id = ?").run(id);
  return { success: true };
}

// Teacher Student Summary Queries
export function getTeacherStudentSummaries() {
  const rows = db.prepare("SELECT * FROM teacher_students_summary ORDER BY name ASC").all() as any[];
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    nisn: r.nisn || '-',
    classGrade: r.class_grade || 'Kelas X',
    completedModulesCount: Number(r.completed_modules_count) || 0,
    averageScore: Number(r.average_score) || 0,
    attemptsCount: Number(r.attempts_count) || 0,
    kktpStatus: r.kktp_status || 'Belum Asesmen',
    lastActive: r.last_active || 'Baru saja',
    elementPerformance: JSON.parse(r.element_performance || '{}'),
    updatedAt: r.updated_at
  }));
}

export function upsertTeacherStudentSummary(summary: any) {
  const now = new Date().toISOString();
  const insert = db.prepare(`
    INSERT OR REPLACE INTO teacher_students_summary (
      id, name, nisn, class_grade, completed_modules_count,
      average_score, attempts_count, kktp_status, last_active,
      element_performance, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    summary.id,
    summary.name,
    summary.nisn || '-',
    summary.classGrade || 'Kelas X',
    Number(summary.completedModulesCount) || 0,
    Number(summary.averageScore) || 0,
    Number(summary.attemptsCount) || 0,
    summary.kktpStatus || 'Belum Asesmen',
    summary.lastActive || 'Baru saja',
    JSON.stringify(summary.elementPerformance || {}),
    now
  );

  return { success: true, id: summary.id };
}

export function deleteTeacherStudentSummary(id: string) {
  db.prepare("DELETE FROM teacher_students_summary WHERE id = ?").run(id);
  return { success: true };
}

// Database Diagnostics & Status
export function getDatabaseStatus() {
  const stat = fs.statSync(dbPath);
  const studentsCount = (db.prepare("SELECT count(*) as count FROM students").get() as any)?.count || 0;
  const teachersCount = (db.prepare("SELECT count(*) as count FROM teachers").get() as any)?.count || 0;
  const attemptsCount = (db.prepare("SELECT count(*) as count FROM quiz_attempts").get() as any)?.count || 0;
  const notesCount = (db.prepare("SELECT count(*) as count FROM notes").get() as any)?.count || 0;
  const annCount = (db.prepare("SELECT count(*) as count FROM announcements").get() as any)?.count || 0;
  const summaryCount = (db.prepare("SELECT count(*) as count FROM teacher_students_summary").get() as any)?.count || 0;

  return {
    engine: "SQLite 3 (Node.js 22 Native DatabaseSync)",
    file: "data/emodul.sqlite",
    connected: true,
    fileSizeBytes: stat.size,
    fileSizeKB: Math.round(stat.size / 1024),
    journalMode: "WAL (Write-Ahead Logging)",
    tables: {
      students: studentsCount,
      teachers: teachersCount,
      quiz_attempts: attemptsCount,
      notes: notesCount,
      announcements: annCount,
      teacher_students_summary: summaryCount
    },
    lastUpdated: new Date().toISOString()
  };
}

// Reset Database to Seed Data
export function resetDatabase() {
  db.exec(`
    DELETE FROM students;
    DELETE FROM teachers;
    DELETE FROM quiz_attempts;
    DELETE FROM notes;
    DELETE FROM announcements;
    DELETE FROM teacher_students_summary;
    DELETE FROM app_meta;
  `);
  seedInitialData(true);
  return { success: true, message: "Database SQLite berhasil di-reset ke data awal" };
}
