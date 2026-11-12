var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// server/app.ts
import express from "express";
import { spawn } from "child_process";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// server/sqliteDb.ts
import path from "node:path";
import fs from "node:fs";
import { createRequire } from "node:module";
var requireFunc = typeof __require !== "undefined" ? __require : createRequire(path.join(process.cwd(), "package.json"));
var _dbInstance = null;
var _sqliteAvailable = null;
function getDbInstance() {
  if (_sqliteAvailable === false) return null;
  if (_dbInstance) return _dbInstance;
  try {
    const { DatabaseSync } = requireFunc("node:sqlite");
    if (!DatabaseSync) {
      _sqliteAvailable = false;
      return null;
    }
    let dataDir = path.join(process.cwd(), "data");
    if (process.env.VERCEL) {
      dataDir = path.join("/tmp", "data");
    }
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
    } catch {
      dataDir = path.join("/tmp", "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
    }
    const dbPath = path.join(dataDir, "emodul.sqlite");
    _dbInstance = new DatabaseSync(dbPath);
    _dbInstance.exec("PRAGMA journal_mode = WAL;");
    _dbInstance.exec("PRAGMA foreign_keys = ON;");
    _sqliteAvailable = true;
    return _dbInstance;
  } catch (err) {
    console.warn("[SQLite] SQLite storage unavailable in this environment:", err?.message);
    _sqliteAvailable = false;
    return null;
  }
}
var db = new Proxy({}, {
  get(target, prop) {
    const instance = getDbInstance();
    if (!instance) {
      if (prop === "exec") return () => {
      };
      if (prop === "prepare") return () => ({
        get: () => null,
        all: () => [],
        run: () => ({ changes: 0, lastInsertRowid: 0 })
      });
      return () => {
      };
    }
    const val = instance[prop];
    return typeof val === "function" ? val.bind(instance) : val;
  }
});
function initSQLiteDatabase() {
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
function seedInitialData(force = false) {
  try {
    const isSeeded = db.prepare("SELECT value FROM app_meta WHERE key = 'starter_seeded'").get()?.value;
    if (isSeeded && !force) {
      return;
    }
  } catch (e) {
  }
  const teacherCount = db.prepare("SELECT count(*) as count FROM teachers").get()?.count || 0;
  if (teacherCount === 0) {
    const insertTeacher = db.prepare(`
      INSERT INTO teachers (
        id, name, nip, email, password, school, title, subject, teaching_classes, avatar, phone, last_login, registered_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertTeacher.run(
      "guru-1789732655854",
      "ULFA NAHDA, S.Pd.",
      "199604132019032006",
      "ulfanahda34@guru.sma.belajar.id",
      "13April96",
      "UPTD SMAN 2 BUDONG BUDONG",
      "Guru Pengampu Informatika (SMA)",
      "Informatika SMA",
      JSON.stringify(["Kelas X-1", "Kelas X-2", "Kelas X-3", "Kelas X-4"]),
      "",
      "",
      "Baru saja",
      "2026-09-27T02:01:56.577Z",
      (/* @__PURE__ */ new Date()).toISOString()
    );
  }
  const studentCount = db.prepare("SELECT count(*) as count FROM students").get()?.count || 0;
  if (studentCount === 0) {
    const insertStudent = db.prepare(`
      INSERT INTO students (
        id, name, nisn, email, password, school, class_grade, avatar, xp, level,
        completed_modules, badges, saved_notes, quiz_history, history_attempts, bookmarked_questions,
        registered_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertStudent.run(
      "student-demo-1",
      "Muhammad Rizki Pratama",
      "0081234567",
      "rizki.pratama@siswa.belajar.id",
      "password123",
      "SMA Negeri 1 Edukasi",
      "Kelas X-1",
      "",
      650,
      2,
      JSON.stringify(["mod-1"]),
      JSON.stringify([
        {
          id: "badge-1",
          title: "Penjelajah Algoritma",
          description: "Tuntas menyelesaikan modul Berpikir Komputasional",
          icon: "Sparkles",
          earnedDate: "12 Jan 2026"
        }
      ]),
      JSON.stringify([]),
      JSON.stringify([]),
      JSON.stringify([]),
      JSON.stringify([]),
      "2026-01-15T09:30:00.000Z",
      (/* @__PURE__ */ new Date()).toISOString()
    );
    const insertSummary = db.prepare(`
      INSERT OR REPLACE INTO teacher_students_summary (
        id, name, nisn, class_grade, completed_modules_count, average_score, attempts_count, kktp_status, last_active, element_performance, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertSummary.run(
      "student-demo-1",
      "Muhammad Rizki Pratama",
      "0081234567",
      "Kelas X-1",
      1,
      88,
      2,
      "Sangat Mahir",
      "Kemarin, 14:20 WIB",
      JSON.stringify({
        "BK": 92,
        "AP": 85,
        "SK": 88,
        "JKI": 84,
        "AD": 90,
        "DSI": 89
      }),
      (/* @__PURE__ */ new Date()).toISOString()
    );
  }
  const annCount = db.prepare("SELECT count(*) as count FROM announcements").get()?.count || 0;
  if (annCount === 0) {
    const insertAnn = db.prepare(`
      INSERT INTO announcements (id, teacher_id, author, text, date, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertAnn.run(
      "ann-demo-1",
      "guru-demo-1",
      "Drs. Hendra Kusuma, M.Kom.",
      "Selamat datang di E-Modul Informatika SMA. Silakan pelajari Modul 1 (Berpikir Komputasional) dan selesaikan kuis evaluasi untuk mengklaim sertifikat.",
      "15 Januari 2026",
      (/* @__PURE__ */ new Date()).toISOString()
    );
  }
  try {
    db.prepare("INSERT OR REPLACE INTO app_meta (key, value, updated_at) VALUES ('starter_seeded', 'true', ?)").run((/* @__PURE__ */ new Date()).toISOString());
  } catch (e) {
  }
}
function formatStudentRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    role: "siswa",
    name: row.name,
    nisn: row.nisn || "",
    email: row.email || "",
    password: row.password || "",
    school: row.school || "",
    classGrade: row.class_grade || "Kelas X",
    avatar: row.avatar || "",
    xp: Number(row.xp) || 0,
    level: Number(row.level) || 1,
    completedModules: JSON.parse(row.completed_modules || "[]"),
    badges: JSON.parse(row.badges || "[]"),
    savedNotes: JSON.parse(row.saved_notes || "[]"),
    quizHistory: JSON.parse(row.quiz_history || "[]"),
    historyAttempts: JSON.parse(row.history_attempts || "[]"),
    bookmarkedQuestions: JSON.parse(row.bookmarked_questions || "[]"),
    registeredAt: row.registered_at || "",
    savedLocally: true
  };
}
function formatTeacherRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    role: "guru",
    name: row.name,
    nip: row.nip || "",
    email: row.email || "",
    password: row.password || "",
    school: row.school || "",
    title: row.title || "Guru Pengampu Informatika (SMA)",
    subject: row.subject || "Informatika (SMA)",
    teachingClasses: JSON.parse(row.teaching_classes || "[]"),
    avatar: row.avatar || "",
    phone: row.phone || "",
    lastLogin: row.last_login || "",
    registeredAt: row.registered_at || "",
    savedLocally: true
  };
}
function getAllStudents() {
  const rows = db.prepare("SELECT * FROM students ORDER BY name ASC").all();
  return rows.map(formatStudentRow);
}
function getStudentById(id) {
  const row = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
  return formatStudentRow(row);
}
function upsertStudent(student) {
  const existing = db.prepare("SELECT id FROM students WHERE id = ?").get(student.id);
  const now = (/* @__PURE__ */ new Date()).toISOString();
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
      student.nisn || "",
      student.email || "",
      student.password || "",
      student.school || "",
      student.classGrade || "Kelas X",
      student.avatar || "",
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
      student.nisn || "",
      student.email || "",
      student.password || "password123",
      student.school || "",
      student.classGrade || "Kelas X",
      student.avatar || "",
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
function deleteStudentById(id) {
  const student = db.prepare("SELECT nisn FROM students WHERE id = ?").get(id);
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
function getAllTeachers() {
  const rows = db.prepare("SELECT * FROM teachers ORDER BY name ASC").all();
  return rows.map(formatTeacherRow);
}
function getTeacherById(id) {
  const row = db.prepare("SELECT * FROM teachers WHERE id = ?").get(id);
  return formatTeacherRow(row);
}
function upsertTeacher(teacher) {
  const existing = db.prepare("SELECT id FROM teachers WHERE id = ?").get(teacher.id);
  const now = (/* @__PURE__ */ new Date()).toISOString();
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
      teacher.nip || "",
      teacher.email || "",
      teacher.password || "",
      teacher.school || "",
      teacher.title || "",
      teacher.subject || "",
      JSON.stringify(teacher.teachingClasses || []),
      teacher.avatar || "",
      teacher.phone || "",
      teacher.lastLogin || "Baru saja",
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
      teacher.nip || "",
      teacher.email || "",
      teacher.password || "password123",
      teacher.school || "",
      teacher.title || "",
      teacher.subject || "",
      JSON.stringify(teacher.teachingClasses || []),
      teacher.avatar || "",
      teacher.phone || "",
      teacher.lastLogin || "Baru saja",
      teacher.registeredAt || now,
      now
    );
  }
  return getTeacherById(teacher.id);
}
function deleteTeacherById(id) {
  const teacher = db.prepare("SELECT nip FROM teachers WHERE id = ?").get(id);
  if (teacher?.nip) {
    db.prepare("DELETE FROM teachers WHERE id = ? OR nip = ?").run(id, teacher.nip);
  } else {
    db.prepare("DELETE FROM teachers WHERE id = ?").run(id);
  }
  db.prepare("DELETE FROM announcements WHERE teacher_id = ?").run(id);
  return { success: true };
}
function getAllQuizAttempts(studentId, moduleId) {
  let sql = "SELECT * FROM quiz_attempts WHERE 1=1";
  const params = [];
  if (studentId) {
    sql += " AND student_id = ?";
    params.push(studentId);
  }
  if (moduleId) {
    sql += " AND module_id = ?";
    params.push(moduleId);
  }
  sql += " ORDER BY created_at DESC";
  const rows = db.prepare(sql).all(...params);
  return rows.map((r) => ({
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
    answers: JSON.parse(r.answers || "{}"),
    elementScores: JSON.parse(r.element_scores || "{}"),
    createdAt: r.created_at
  }));
}
function saveQuizAttempt(attempt, studentProfile) {
  const id = attempt.id || attempt.attemptId || `attempt-${Date.now()}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const insert = db.prepare(`
    INSERT OR REPLACE INTO quiz_attempts (
      id, student_id, student_name, student_class, module_id,
      timestamp, score, correct_count, wrong_count, grade_letter,
      kktp_status, time_spent_seconds, answers, element_scores, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const studentId = attempt.studentId || studentProfile?.id || "guest";
  const studentName = attempt.studentName || studentProfile?.name || "Siswa";
  const studentClass = attempt.studentClass || studentProfile?.classGrade || "Kelas X";
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
    attempt.gradeLetter || "B",
    attempt.kktpStatus || "Mahir",
    Number(attempt.timeSpentSeconds) || 0,
    JSON.stringify(attempt.answers || {}),
    JSON.stringify(attempt.elementScores || {}),
    now
  );
  if (studentProfile && studentProfile.id) {
    const student = getStudentById(studentProfile.id);
    if (student) {
      const history = student.historyAttempts || [];
      const updatedHistory = [attempt, ...history.filter((a) => a.attemptId !== id)];
      student.historyAttempts = updatedHistory;
      student.quizHistory = updatedHistory;
      const avgScore = Math.round(updatedHistory.reduce((acc, a) => acc + (a.score || 0), 0) / updatedHistory.length);
      const kktp = avgScore >= 85 ? "Sangat Mahir" : avgScore >= 75 ? "Mahir" : avgScore >= 60 ? "Cukup" : "Perlu Bimbingan";
      upsertStudent(student);
      upsertTeacherStudentSummary({
        id: student.id,
        name: student.name,
        nisn: student.nisn,
        classGrade: student.classGrade,
        completedModulesCount: student.completedModules?.length || 0,
        averageScore: avgScore,
        attemptsCount: updatedHistory.length,
        kktpStatus: kktp,
        lastActive: "Baru saja",
        elementPerformance: attempt.elementScores || {}
      });
    }
  }
  return { success: true, attemptId: id };
}
function getNotes(studentId, moduleId) {
  let sql = "SELECT * FROM notes WHERE 1=1";
  const params = [];
  if (studentId) {
    sql += " AND student_id = ?";
    params.push(studentId);
  }
  if (moduleId) {
    sql += " AND module_id = ?";
    params.push(moduleId);
  }
  sql += " ORDER BY created_at DESC";
  const rows = db.prepare(sql).all(...params);
  return rows.map((r) => ({
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
function saveNote(note) {
  const id = note.id || `note-${Date.now()}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const insert = db.prepare(`
    INSERT OR REPLACE INTO notes (
      id, student_id, module_id, title, text, date, timestamp, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insert.run(
    id,
    note.studentId || note.student_id || "guest",
    note.moduleId || note.module_id || "mod-1",
    note.title || "Catatan Baru",
    note.text || "",
    note.date || "Hari ini",
    Number(note.timestamp) || 0,
    now
  );
  return { success: true, noteId: id };
}
function deleteNote(id) {
  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
  return { success: true };
}
function getAnnouncements() {
  const rows = db.prepare("SELECT * FROM announcements ORDER BY created_at DESC").all();
  return rows.map((r) => ({
    id: r.id,
    teacherId: r.teacher_id,
    author: r.author,
    text: r.text,
    date: r.date,
    createdAt: r.created_at
  }));
}
function saveAnnouncement(ann) {
  const id = ann.id || `ann-${Date.now()}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const insert = db.prepare(`
    INSERT OR REPLACE INTO announcements (
      id, teacher_id, author, text, date, created_at
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);
  insert.run(
    id,
    ann.teacherId || "guru-1",
    ann.author || "Guru Pengampu",
    ann.text,
    ann.date || "Hari ini",
    now
  );
  return { success: true, id };
}
function deleteAnnouncement(id) {
  db.prepare("DELETE FROM announcements WHERE id = ?").run(id);
  return { success: true };
}
function getTeacherStudentSummaries() {
  const rows = db.prepare("SELECT * FROM teacher_students_summary ORDER BY name ASC").all();
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    nisn: r.nisn || "-",
    classGrade: r.class_grade || "Kelas X",
    completedModulesCount: Number(r.completed_modules_count) || 0,
    averageScore: Number(r.average_score) || 0,
    attemptsCount: Number(r.attempts_count) || 0,
    kktpStatus: r.kktp_status || "Belum Asesmen",
    lastActive: r.last_active || "Baru saja",
    elementPerformance: JSON.parse(r.element_performance || "{}"),
    updatedAt: r.updated_at
  }));
}
function upsertTeacherStudentSummary(summary) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
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
    summary.nisn || "-",
    summary.classGrade || "Kelas X",
    Number(summary.completedModulesCount) || 0,
    Number(summary.averageScore) || 0,
    Number(summary.attemptsCount) || 0,
    summary.kktpStatus || "Belum Asesmen",
    summary.lastActive || "Baru saja",
    JSON.stringify(summary.elementPerformance || {}),
    now
  );
  return { success: true, id: summary.id };
}
function deleteTeacherStudentSummary(id) {
  db.prepare("DELETE FROM teacher_students_summary WHERE id = ?").run(id);
  return { success: true };
}
function getDatabaseStatus() {
  const instance = getDbInstance();
  let fileSize = 0;
  try {
    const dataDir = process.env.VERCEL ? path.join("/tmp", "data") : path.join(process.cwd(), "data");
    const dbPath = path.join(dataDir, "emodul.sqlite");
    if (fs.existsSync(dbPath)) {
      fileSize = fs.statSync(dbPath).size;
    }
  } catch {
  }
  const studentsCount = db.prepare("SELECT count(*) as count FROM students").get()?.count || 0;
  const teachersCount = db.prepare("SELECT count(*) as count FROM teachers").get()?.count || 0;
  const attemptsCount = db.prepare("SELECT count(*) as count FROM quiz_attempts").get()?.count || 0;
  const notesCount = db.prepare("SELECT count(*) as count FROM notes").get()?.count || 0;
  const annCount = db.prepare("SELECT count(*) as count FROM announcements").get()?.count || 0;
  const summaryCount = db.prepare("SELECT count(*) as count FROM teacher_students_summary").get()?.count || 0;
  return {
    engine: "SQLite 3 (Node.js Native DatabaseSync)",
    file: "data/emodul.sqlite",
    connected: instance !== null,
    fileSizeBytes: fileSize,
    fileSizeKB: Math.round(fileSize / 1024),
    journalMode: "WAL (Write-Ahead Logging)",
    tables: {
      students: studentsCount,
      teachers: teachersCount,
      quiz_attempts: attemptsCount,
      notes: notesCount,
      announcements: annCount,
      teacher_students_summary: summaryCount
    },
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function resetDatabase() {
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

// server/neonDb.ts
import { neon } from "@neondatabase/serverless";
function getNeonConnectionString() {
  let url = (process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || "").trim();
  if (url.startsWith('"') && url.endsWith('"') || url.startsWith("'") && url.endsWith("'")) {
    url = url.slice(1, -1).trim();
  }
  if (url && (url.startsWith("postgres://") || url.startsWith("postgresql://"))) {
    return url;
  }
  return null;
}
function isNeonConfigured() {
  return getNeonConnectionString() !== null;
}
function getMaskedNeonUrl(url) {
  const target = url || getNeonConnectionString() || "";
  if (!target) return "";
  try {
    const parsed = new URL(target);
    return `${parsed.protocol}//***:***@${parsed.host}${parsed.pathname}`;
  } catch {
    return "postgresql://***:***@neon.tech/***";
  }
}
function getNeonClient(customUrl) {
  const connectionString = customUrl || getNeonConnectionString();
  if (!connectionString) {
    throw new Error("Neon DATABASE_URL is not configured yet.");
  }
  return neon(connectionString);
}
async function initNeonDatabase(customUrl) {
  const sql = getNeonClient(customUrl);
  await sql`
    CREATE TABLE IF NOT EXISTS students (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      nisn VARCHAR(32),
      email VARCHAR(255),
      password TEXT,
      school VARCHAR(255),
      class_grade VARCHAR(64),
      avatar TEXT,
      xp INTEGER DEFAULT 0,
      level INTEGER DEFAULT 1,
      completed_modules JSONB DEFAULT '[]'::jsonb,
      badges JSONB DEFAULT '[]'::jsonb,
      saved_notes JSONB DEFAULT '[]'::jsonb,
      quiz_history JSONB DEFAULT '[]'::jsonb,
      history_attempts JSONB DEFAULT '[]'::jsonb,
      bookmarked_questions JSONB DEFAULT '[]'::jsonb,
      registered_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS teachers (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      nip VARCHAR(32),
      email VARCHAR(255),
      password TEXT,
      school VARCHAR(255),
      title VARCHAR(255),
      subject VARCHAR(255),
      teaching_classes JSONB DEFAULT '[]'::jsonb,
      avatar TEXT,
      phone VARCHAR(32),
      last_login VARCHAR(64),
      registered_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id VARCHAR(64) PRIMARY KEY,
      student_id VARCHAR(64) NOT NULL,
      student_name VARCHAR(255),
      student_class VARCHAR(64),
      module_id VARCHAR(64) NOT NULL,
      timestamp VARCHAR(64) NOT NULL,
      score NUMERIC(5,2) NOT NULL,
      correct_count INTEGER NOT NULL,
      wrong_count INTEGER NOT NULL,
      grade_letter VARCHAR(8) NOT NULL,
      kktp_status VARCHAR(64) NOT NULL,
      time_spent_seconds INTEGER NOT NULL,
      answers JSONB DEFAULT '{}'::jsonb,
      element_scores JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS notes (
      id VARCHAR(64) PRIMARY KEY,
      student_id VARCHAR(64) NOT NULL,
      module_id VARCHAR(64) NOT NULL,
      title TEXT NOT NULL,
      text TEXT NOT NULL,
      date VARCHAR(64) NOT NULL,
      timestamp BIGINT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS announcements (
      id VARCHAR(64) PRIMARY KEY,
      teacher_id VARCHAR(64),
      author VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      date VARCHAR(64) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS teacher_students_summary (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      nisn VARCHAR(32),
      class_grade VARCHAR(64),
      completed_modules_count INTEGER DEFAULT 0,
      average_score NUMERIC(5,2) DEFAULT 0,
      attempts_count INTEGER DEFAULT 0,
      kktp_status VARCHAR(64),
      last_active VARCHAR(64),
      element_performance JSONB DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS app_meta (
      key VARCHAR(128) PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  let alreadySeeded = false;
  try {
    const seedRows = await sql`SELECT value FROM app_meta WHERE key = 'starter_seeded'`;
    alreadySeeded = seedRows.length > 0 && seedRows[0]?.value === "true";
  } catch (e) {
    alreadySeeded = false;
  }
  if (!alreadySeeded) {
    const teacherRows = await sql`SELECT count(*)::int as count FROM teachers`;
    if ((teacherRows[0]?.count || 0) === 0) {
      await sql`
        INSERT INTO teachers (
          id, name, nip, email, password, school, title, subject, teaching_classes, avatar, phone, last_login, registered_at
        ) VALUES (
          'guru-1789732655854',
          'ULFA NAHDA, S.Pd.',
          '199604132019032006',
          'ulfanahda34@guru.sma.belajar.id',
          '13April96',
          'UPTD SMAN 2 BUDONG BUDONG',
          'Guru Pengampu Informatika (SMA)',
          'Informatika SMA',
          '["Kelas X-1", "Kelas X-2", "Kelas X-3", "Kelas X-4"]'::jsonb,
          '',
          '',
          'Baru saja',
          NOW()
        ) ON CONFLICT (id) DO NOTHING;
      `;
    }
    const studentRows = await sql`SELECT count(*)::int as count FROM students`;
    if ((studentRows[0]?.count || 0) === 0) {
      await sql`
        INSERT INTO students (
          id, name, nisn, email, password, school, class_grade, avatar, xp, level,
          completed_modules, badges, saved_notes, quiz_history, history_attempts, bookmarked_questions, registered_at
        ) VALUES (
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
          '["mod-1"]'::jsonb,
          '[{"id":"badge-1","title":"Penjelajah Algoritma","description":"Tuntas menyelesaikan modul Berpikir Komputasional","icon":"Sparkles","earnedDate":"12 Jan 2026"}]'::jsonb,
          '[]'::jsonb,
          '[]'::jsonb,
          '[]'::jsonb,
          '[]'::jsonb,
          NOW()
        ) ON CONFLICT (id) DO NOTHING;
      `;
      await sql`
        INSERT INTO teacher_students_summary (
          id, name, nisn, class_grade, completed_modules_count, average_score, attempts_count, kktp_status, last_active, element_performance
        ) VALUES (
          'student-demo-1',
          'Muhammad Rizki Pratama',
          '0081234567',
          'Kelas X-1',
          1,
          88,
          2,
          'Sangat Mahir',
          'Kemarin, 14:20 WIB',
          '{"BK":92,"AP":85,"SK":88,"JKI":84,"AD":90,"DSI":89}'::jsonb
        ) ON CONFLICT (id) DO NOTHING;
      `;
    }
    const annRows = await sql`SELECT count(*)::int as count FROM announcements`;
    if ((annRows[0]?.count || 0) === 0) {
      await sql`
        INSERT INTO announcements (id, teacher_id, author, text, date)
        VALUES (
          'ann-demo-1',
          'guru-demo-1',
          'Drs. Hendra Kusuma, M.Kom.',
          'Selamat datang di E-Modul Informatika SMA. Silakan pelajari Modul 1 (Berpikir Komputasional) dan selesaikan kuis evaluasi untuk mengklaim sertifikat.',
          '15 Januari 2026'
        ) ON CONFLICT (id) DO NOTHING;
      `;
    }
    try {
      await sql`
        INSERT INTO app_meta (key, value, updated_at)
        VALUES ('starter_seeded', 'true', NOW())
        ON CONFLICT (key) DO UPDATE SET value = 'true', updated_at = NOW();
      `;
    } catch (e) {
    }
  }
}
async function testNeonConnection(customUrl) {
  const startTime = Date.now();
  try {
    const sql = getNeonClient(customUrl);
    const res = await sql`SELECT NOW() as current_time, version() as pg_version`;
    const latencyMs = Date.now() - startTime;
    return {
      success: true,
      latencyMs,
      serverTime: res[0]?.current_time,
      pgVersion: res[0]?.pg_version,
      maskedUrl: getMaskedNeonUrl(customUrl),
      message: `Terhubung sukses ke Neon PostgreSQL (${latencyMs} ms)`
    };
  } catch (error) {
    return {
      success: false,
      latencyMs: Date.now() - startTime,
      error: error.message || "Gagal menghubungi Neon Database",
      maskedUrl: getMaskedNeonUrl(customUrl),
      message: "Koneksi ke Neon gagal. Periksa kembali connection string."
    };
  }
}
async function getNeonStatus() {
  if (!isNeonConfigured()) {
    return {
      configured: false,
      engine: "Neon Serverless PostgreSQL",
      status: "Waiting for DATABASE_URL",
      maskedUrl: "",
      connected: false
    };
  }
  try {
    const startTime = Date.now();
    const sql = getNeonClient();
    const [stats, studentsCount, teachersCount, attemptsCount, notesCount, annCount, summaryCount] = await Promise.all([
      sql`SELECT NOW() as now, current_database() as db_name, version() as version`,
      sql`SELECT count(*)::int as count FROM students`,
      sql`SELECT count(*)::int as count FROM teachers`,
      sql`SELECT count(*)::int as count FROM quiz_attempts`,
      sql`SELECT count(*)::int as count FROM notes`,
      sql`SELECT count(*)::int as count FROM announcements`,
      sql`SELECT count(*)::int as count FROM teacher_students_summary`
    ]);
    const latencyMs = Date.now() - startTime;
    return {
      configured: true,
      engine: "Neon Serverless PostgreSQL (Cloud)",
      connected: true,
      maskedUrl: getMaskedNeonUrl(),
      database: stats[0]?.db_name,
      latencyMs,
      tables: {
        students: studentsCount[0]?.count || 0,
        teachers: teachersCount[0]?.count || 0,
        quiz_attempts: attemptsCount[0]?.count || 0,
        notes: notesCount[0]?.count || 0,
        announcements: annCount[0]?.count || 0,
        teacher_students_summary: summaryCount[0]?.count || 0
      },
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    return {
      configured: true,
      engine: "Neon Serverless PostgreSQL (Cloud)",
      connected: false,
      maskedUrl: getMaskedNeonUrl(),
      error: error.message,
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
}
function formatStudentRow2(row) {
  if (!row) return null;
  return {
    id: row.id,
    role: "siswa",
    name: row.name,
    nisn: row.nisn || "",
    email: row.email || "",
    password: row.password || "",
    school: row.school || "",
    classGrade: row.class_grade || "Kelas X",
    avatar: row.avatar || "",
    xp: Number(row.xp) || 0,
    level: Number(row.level) || 1,
    completedModules: typeof row.completed_modules === "string" ? JSON.parse(row.completed_modules) : row.completed_modules || [],
    badges: typeof row.badges === "string" ? JSON.parse(row.badges) : row.badges || [],
    savedNotes: typeof row.saved_notes === "string" ? JSON.parse(row.saved_notes) : row.saved_notes || [],
    quizHistory: typeof row.quiz_history === "string" ? JSON.parse(row.quiz_history) : row.quiz_history || [],
    historyAttempts: typeof row.history_attempts === "string" ? JSON.parse(row.history_attempts) : row.history_attempts || [],
    bookmarkedQuestions: typeof row.bookmarked_questions === "string" ? JSON.parse(row.bookmarked_questions) : row.bookmarked_questions || [],
    registeredAt: row.registered_at ? new Date(row.registered_at).toISOString() : "",
    savedLocally: false,
    storageEngine: "neon"
  };
}
function formatTeacherRow2(row) {
  if (!row) return null;
  return {
    id: row.id,
    role: "guru",
    name: row.name,
    nip: row.nip || "",
    email: row.email || "",
    password: row.password || "",
    school: row.school || "",
    title: row.title || "Guru Pengampu Informatika (SMA)",
    subject: row.subject || "Informatika (SMA)",
    teachingClasses: typeof row.teaching_classes === "string" ? JSON.parse(row.teaching_classes) : row.teaching_classes || [],
    avatar: row.avatar || "",
    phone: row.phone || "",
    lastLogin: row.last_login || "",
    registeredAt: row.registered_at ? new Date(row.registered_at).toISOString() : "",
    savedLocally: false,
    storageEngine: "neon"
  };
}
async function getAllStudents2() {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM students ORDER BY name ASC`;
  return rows.map(formatStudentRow2);
}
async function getStudentById2(id) {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM students WHERE id = ${id} LIMIT 1`;
  return formatStudentRow2(rows[0]);
}
async function upsertStudent2(student) {
  const sql = getNeonClient();
  const id = student.id;
  const name = student.name;
  const nisn = student.nisn || "";
  const email = student.email || "";
  const password = student.password || "password123";
  const school = student.school || "";
  const classGrade = student.classGrade || student.class_grade || "Kelas X";
  const avatar = student.avatar || "";
  const xp = Number(student.xp) || 0;
  const level = Number(student.level) || 1;
  const completedModules = JSON.stringify(student.completedModules || []);
  const badges = JSON.stringify(student.badges || []);
  const savedNotes = JSON.stringify(student.savedNotes || []);
  const quizHistory = JSON.stringify(student.quizHistory || []);
  const historyAttempts = JSON.stringify(student.historyAttempts || []);
  const bookmarkedQuestions = JSON.stringify(student.bookmarkedQuestions || []);
  const registeredAt = student.registeredAt ? new Date(student.registeredAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
  await sql`
    INSERT INTO students (
      id, name, nisn, email, password, school, class_grade, avatar,
      xp, level, completed_modules, badges, saved_notes, quiz_history,
      history_attempts, bookmarked_questions, registered_at, updated_at
    ) VALUES (
      ${id}, ${name}, ${nisn}, ${email}, ${password}, ${school}, ${classGrade}, ${avatar},
      ${xp}, ${level}, ${completedModules}::jsonb, ${badges}::jsonb, ${savedNotes}::jsonb, ${quizHistory}::jsonb,
      ${historyAttempts}::jsonb, ${bookmarkedQuestions}::jsonb, ${registeredAt}::timestamptz, NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      nisn = EXCLUDED.nisn,
      email = EXCLUDED.email,
      password = COALESCE(NULLIF(EXCLUDED.password, ''), students.password),
      school = EXCLUDED.school,
      class_grade = EXCLUDED.class_grade,
      avatar = EXCLUDED.avatar,
      xp = EXCLUDED.xp,
      level = EXCLUDED.level,
      completed_modules = EXCLUDED.completed_modules,
      badges = EXCLUDED.badges,
      saved_notes = EXCLUDED.saved_notes,
      quiz_history = EXCLUDED.quiz_history,
      history_attempts = EXCLUDED.history_attempts,
      bookmarked_questions = EXCLUDED.bookmarked_questions,
      updated_at = NOW()
  `;
  return await getStudentById2(id);
}
async function deleteStudentById2(id) {
  const sql = getNeonClient();
  const rows = await sql`SELECT nisn FROM students WHERE id = ${id} LIMIT 1`;
  const nisn = rows[0]?.nisn;
  if (nisn) {
    await sql`DELETE FROM students WHERE id = ${id} OR nisn = ${nisn}`;
    await sql`DELETE FROM teacher_students_summary WHERE id = ${id} OR nisn = ${nisn}`;
  } else {
    await sql`DELETE FROM students WHERE id = ${id}`;
    await sql`DELETE FROM teacher_students_summary WHERE id = ${id}`;
  }
  await sql`DELETE FROM quiz_attempts WHERE student_id = ${id}`;
  await sql`DELETE FROM notes WHERE student_id = ${id}`;
  return { success: true };
}
async function getAllTeachers2() {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM teachers ORDER BY name ASC`;
  return rows.map(formatTeacherRow2);
}
async function getTeacherById2(id) {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM teachers WHERE id = ${id} LIMIT 1`;
  return formatTeacherRow2(rows[0]);
}
async function upsertTeacher2(teacher) {
  const sql = getNeonClient();
  const id = teacher.id;
  const name = teacher.name;
  const nip = teacher.nip || "";
  const email = teacher.email || "";
  const password = teacher.password || "password123";
  const school = teacher.school || "";
  const title = teacher.title || "Guru Pengampu Informatika (SMA)";
  const subject = teacher.subject || "Informatika (SMA)";
  const teachingClasses = JSON.stringify(teacher.teachingClasses || []);
  const avatar = teacher.avatar || "";
  const phone = teacher.phone || "";
  const lastLogin = teacher.lastLogin || "Baru saja";
  const registeredAt = teacher.registeredAt ? new Date(teacher.registeredAt).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
  await sql`
    INSERT INTO teachers (
      id, name, nip, email, password, school, title, subject,
      teaching_classes, avatar, phone, last_login, registered_at, updated_at
    ) VALUES (
      ${id}, ${name}, ${nip}, ${email}, ${password}, ${school}, ${title}, ${subject},
      ${teachingClasses}::jsonb, ${avatar}, ${phone}, ${lastLogin}, ${registeredAt}::timestamptz, NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      nip = EXCLUDED.nip,
      email = EXCLUDED.email,
      password = COALESCE(NULLIF(EXCLUDED.password, ''), teachers.password),
      school = EXCLUDED.school,
      title = EXCLUDED.title,
      subject = EXCLUDED.subject,
      teaching_classes = EXCLUDED.teaching_classes,
      avatar = EXCLUDED.avatar,
      phone = EXCLUDED.phone,
      last_login = EXCLUDED.last_login,
      updated_at = NOW()
  `;
  return await getTeacherById2(id);
}
async function deleteTeacherById2(id) {
  const sql = getNeonClient();
  const rows = await sql`SELECT nip FROM teachers WHERE id = ${id} LIMIT 1`;
  const nip = rows[0]?.nip;
  if (nip) {
    await sql`DELETE FROM teachers WHERE id = ${id} OR nip = ${nip}`;
  } else {
    await sql`DELETE FROM teachers WHERE id = ${id}`;
  }
  await sql`DELETE FROM announcements WHERE teacher_id = ${id}`;
  return { success: true };
}
async function getAllQuizAttempts2(studentId, moduleId) {
  const sql = getNeonClient();
  let rows = [];
  if (studentId && moduleId) {
    rows = await sql`SELECT * FROM quiz_attempts WHERE student_id = ${studentId} AND module_id = ${moduleId} ORDER BY created_at DESC`;
  } else if (studentId) {
    rows = await sql`SELECT * FROM quiz_attempts WHERE student_id = ${studentId} ORDER BY created_at DESC`;
  } else if (moduleId) {
    rows = await sql`SELECT * FROM quiz_attempts WHERE module_id = ${moduleId} ORDER BY created_at DESC`;
  } else {
    rows = await sql`SELECT * FROM quiz_attempts ORDER BY created_at DESC`;
  }
  return rows.map((r) => ({
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
    answers: typeof r.answers === "string" ? JSON.parse(r.answers) : r.answers || {},
    elementScores: typeof r.element_scores === "string" ? JSON.parse(r.element_scores) : r.element_scores || {},
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : ""
  }));
}
async function saveQuizAttempt2(attempt, studentProfile) {
  const sql = getNeonClient();
  const id = attempt.id || attempt.attemptId || `attempt-${Date.now()}`;
  const studentId = attempt.studentId || studentProfile?.id || "guest";
  const studentName = attempt.studentName || studentProfile?.name || "Siswa";
  const studentClass = attempt.studentClass || studentProfile?.classGrade || "Kelas X";
  const moduleId = attempt.moduleId;
  const timestamp = attempt.timestamp || (/* @__PURE__ */ new Date()).toISOString();
  const score = Number(attempt.score) || 0;
  const correctCount = Number(attempt.correctCount) || 0;
  const wrongCount = Number(attempt.wrongCount) || 0;
  const gradeLetter = attempt.gradeLetter || "B";
  const kktpStatus = attempt.kktpStatus || "Mahir";
  const timeSpentSeconds = Number(attempt.timeSpentSeconds) || 0;
  const answers = JSON.stringify(attempt.answers || {});
  const elementScores = JSON.stringify(attempt.elementScores || {});
  await sql`
    INSERT INTO quiz_attempts (
      id, student_id, student_name, student_class, module_id,
      timestamp, score, correct_count, wrong_count, grade_letter,
      kktp_status, time_spent_seconds, answers, element_scores, created_at
    ) VALUES (
      ${id}, ${studentId}, ${studentName}, ${studentClass}, ${moduleId},
      ${timestamp}, ${score}, ${correctCount}, ${wrongCount}, ${gradeLetter},
      ${kktpStatus}, ${timeSpentSeconds}, ${answers}::jsonb, ${elementScores}::jsonb, NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      score = EXCLUDED.score,
      correct_count = EXCLUDED.correct_count,
      wrong_count = EXCLUDED.wrong_count,
      grade_letter = EXCLUDED.grade_letter,
      kktp_status = EXCLUDED.kktp_status,
      time_spent_seconds = EXCLUDED.time_spent_seconds,
      answers = EXCLUDED.answers,
      element_scores = EXCLUDED.element_scores
  `;
  if (studentProfile && studentProfile.id) {
    const student = await getStudentById2(studentProfile.id);
    if (student) {
      const history = student.historyAttempts || [];
      const updatedHistory = [attempt, ...history.filter((a) => a.attemptId !== id)];
      student.historyAttempts = updatedHistory;
      student.quizHistory = updatedHistory;
      const avgScore = Math.round(updatedHistory.reduce((acc, a) => acc + (a.score || 0), 0) / updatedHistory.length);
      const kktp = avgScore >= 85 ? "Sangat Mahir" : avgScore >= 75 ? "Mahir" : avgScore >= 60 ? "Cukup" : "Perlu Bimbingan";
      await upsertStudent2(student);
      await upsertTeacherStudentSummary2({
        id: student.id,
        name: student.name,
        nisn: student.nisn,
        classGrade: student.classGrade,
        completedModulesCount: student.completedModules?.length || 0,
        averageScore: avgScore,
        attemptsCount: updatedHistory.length,
        kktpStatus: kktp,
        lastActive: "Baru saja",
        elementPerformance: attempt.elementScores || {}
      });
    }
  }
  return { success: true, attemptId: id };
}
async function getNotes2(studentId, moduleId) {
  const sql = getNeonClient();
  let rows = [];
  if (studentId && moduleId) {
    rows = await sql`SELECT * FROM notes WHERE student_id = ${studentId} AND module_id = ${moduleId} ORDER BY created_at DESC`;
  } else if (studentId) {
    rows = await sql`SELECT * FROM notes WHERE student_id = ${studentId} ORDER BY created_at DESC`;
  } else if (moduleId) {
    rows = await sql`SELECT * FROM notes WHERE module_id = ${moduleId} ORDER BY created_at DESC`;
  } else {
    rows = await sql`SELECT * FROM notes ORDER BY created_at DESC`;
  }
  return rows.map((r) => ({
    id: r.id,
    studentId: r.student_id,
    moduleId: r.module_id,
    title: r.title,
    text: r.text,
    date: r.date,
    timestamp: Number(r.timestamp),
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : ""
  }));
}
async function saveNote2(note) {
  const sql = getNeonClient();
  const id = note.id || `note-${Date.now()}`;
  const studentId = note.studentId || note.student_id || "guest";
  const moduleId = note.moduleId || note.module_id || "mod-1";
  const title = note.title || "Catatan Baru";
  const text = note.text || "";
  const date = note.date || "Hari ini";
  const timestamp = Number(note.timestamp) || 0;
  await sql`
    INSERT INTO notes (
      id, student_id, module_id, title, text, date, timestamp, created_at
    ) VALUES (
      ${id}, ${studentId}, ${moduleId}, ${title}, ${text}, ${date}, ${timestamp}, NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      text = EXCLUDED.text,
      date = EXCLUDED.date,
      timestamp = EXCLUDED.timestamp
  `;
  return { success: true, noteId: id };
}
async function deleteNote2(id) {
  const sql = getNeonClient();
  await sql`DELETE FROM notes WHERE id = ${id}`;
  return { success: true };
}
async function getAnnouncements2() {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM announcements ORDER BY created_at DESC`;
  return rows.map((r) => ({
    id: r.id,
    teacherId: r.teacher_id,
    author: r.author,
    text: r.text,
    date: r.date,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : ""
  }));
}
async function saveAnnouncement2(ann) {
  const sql = getNeonClient();
  const id = ann.id || `ann-${Date.now()}`;
  const teacherId = ann.teacherId || ann.teacher_id || "guru-demo-1";
  const author = ann.author || "Guru Informatika";
  const text = ann.text || "";
  const date = ann.date || "Hari ini";
  await sql`
    INSERT INTO announcements (
      id, teacher_id, author, text, date, created_at
    ) VALUES (
      ${id}, ${teacherId}, ${author}, ${text}, ${date}, NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      text = EXCLUDED.text,
      date = EXCLUDED.date,
      author = EXCLUDED.author
  `;
  return { success: true, announcementId: id };
}
async function deleteAnnouncement2(id) {
  const sql = getNeonClient();
  await sql`DELETE FROM announcements WHERE id = ${id}`;
  return { success: true };
}
async function getTeacherStudentSummaries2() {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM teacher_students_summary ORDER BY name ASC`;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    nisn: r.nisn || "",
    classGrade: r.class_grade || "Kelas X",
    completedModulesCount: Number(r.completed_modules_count) || 0,
    averageScore: Number(r.average_score) || 0,
    attemptsCount: Number(r.attempts_count) || 0,
    kktpStatus: r.kktp_status || "Belum Mengikuti",
    lastActive: r.last_active || "Belum ada aktivitas",
    elementPerformance: typeof r.element_performance === "string" ? JSON.parse(r.element_performance) : r.element_performance || {},
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : ""
  }));
}
async function upsertTeacherStudentSummary2(summary) {
  const sql = getNeonClient();
  const id = summary.id;
  const name = summary.name;
  const nisn = summary.nisn || "";
  const classGrade = summary.classGrade || summary.class_grade || "Kelas X";
  const completedModulesCount = Number(summary.completedModulesCount) || 0;
  const averageScore = Number(summary.averageScore) || 0;
  const attemptsCount = Number(summary.attemptsCount) || 0;
  const kktpStatus = summary.kktpStatus || "Belum Mengikuti";
  const lastActive = summary.lastActive || "Baru saja";
  const elementPerformance = JSON.stringify(summary.elementPerformance || {});
  await sql`
    INSERT INTO teacher_students_summary (
      id, name, nisn, class_grade, completed_modules_count, average_score,
      attempts_count, kktp_status, last_active, element_performance, updated_at
    ) VALUES (
      ${id}, ${name}, ${nisn}, ${classGrade}, ${completedModulesCount}, ${averageScore},
      ${attemptsCount}, ${kktpStatus}, ${lastActive}, ${elementPerformance}::jsonb, NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      nisn = EXCLUDED.nisn,
      class_grade = EXCLUDED.class_grade,
      completed_modules_count = EXCLUDED.completed_modules_count,
      average_score = EXCLUDED.average_score,
      attempts_count = EXCLUDED.attempts_count,
      kktp_status = EXCLUDED.kktp_status,
      last_active = EXCLUDED.last_active,
      element_performance = EXCLUDED.element_performance,
      updated_at = NOW()
  `;
  return { success: true, summaryId: id };
}
async function deleteTeacherStudentSummary2(id) {
  const sql = getNeonClient();
  await sql`DELETE FROM teacher_students_summary WHERE id = ${id}`;
  return { success: true };
}

// server/dbManager.ts
var neonInitialized = false;
var initPromise = null;
async function initAppDatabase() {
  try {
    initSQLiteDatabase();
  } catch (err) {
    console.warn("[DB] SQLite init note:", err);
  }
  if (isNeonConfigured()) {
    try {
      console.log("[DB] Neon DATABASE_URL detected. Initializing Neon PostgreSQL schemas...");
      await initNeonDatabase();
      neonInitialized = true;
      console.log("[DB] Neon Serverless PostgreSQL successfully initialized.");
    } catch (err) {
      console.error("[DB] Failed to connect to Neon PostgreSQL, falling back to SQLite:", err.message);
      neonInitialized = false;
    }
  } else {
    console.log("[DB] SQLite persistent database active. Ready for Neon DATABASE_URL.");
  }
}
function ensureDatabaseReady() {
  if (!initPromise) {
    initPromise = initAppDatabase().catch((err) => {
      console.error("[DB] Database initialization error:", err);
    });
  }
  return initPromise;
}
function isUsingNeon() {
  return isNeonConfigured() && neonInitialized;
}
async function getUnifiedDatabaseStatus() {
  const sqliteStatus = getDatabaseStatus();
  const neonStatus = await getNeonStatus();
  return {
    activeEngine: isUsingNeon() ? "neon" : "sqlite",
    isNeonReady: isNeonConfigured(),
    neon: neonStatus,
    sqlite: sqliteStatus,
    statusText: isNeonConfigured() ? "Neon Cloud Connected" : "SQLite Local Ready",
    message: isUsingNeon() ? "Database utama aktif menggunakan Neon Serverless PostgreSQL Cloud" : "Database saat ini aktif menggunakan SQLite lokal. Menunggu Connection String Neon."
  };
}
async function migrateSQLiteToNeon(customUrl) {
  try {
    await initNeonDatabase(customUrl);
    const students = getAllStudents();
    const teachers = getAllTeachers();
    const attempts = getAllQuizAttempts();
    const notes = getNotes();
    const announcements = getAnnouncements();
    const summaries = getTeacherStudentSummaries();
    for (const s of students) {
      if (s) await upsertStudent2(s);
    }
    for (const t of teachers) {
      if (t) await upsertTeacher2(t);
    }
    for (const a of attempts) {
      await saveQuizAttempt2(a);
    }
    for (const n of notes) {
      await saveNote2(n);
    }
    for (const ann of announcements) {
      await saveAnnouncement2(ann);
    }
    for (const sum of summaries) {
      await upsertTeacherStudentSummary2(sum);
    }
    return {
      success: true,
      migrated: {
        students: students.length,
        teachers: teachers.length,
        quiz_attempts: attempts.length,
        notes: notes.length,
        announcements: announcements.length,
        summaries: summaries.length
      },
      message: "Seluruh data berhasil dimigrasikan dari SQLite ke Neon PostgreSQL!"
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      message: "Gagal memigrasikan data ke Neon."
    };
  }
}
async function getAllStudents3() {
  if (isUsingNeon()) {
    try {
      return await getAllStudents2();
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return getAllStudents();
}
async function getStudentById3(id) {
  if (isUsingNeon()) {
    try {
      return await getStudentById2(id);
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return getStudentById(id);
}
async function upsertStudent3(student) {
  if (isUsingNeon()) {
    try {
      const neonRes = await upsertStudent2(student);
      try {
        upsertStudent(student);
      } catch {
      }
      return neonRes;
    } catch (e) {
      console.warn("[DB] Neon error writing student:", e);
    }
  }
  return upsertStudent(student);
}
async function deleteStudentById3(id) {
  if (isUsingNeon()) {
    try {
      await deleteStudentById2(id);
      try {
        deleteStudentById(id);
      } catch {
      }
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting student:", e);
    }
  }
  return deleteStudentById(id);
}
async function getAllTeachers3() {
  if (isUsingNeon()) {
    try {
      return await getAllTeachers2();
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return getAllTeachers();
}
async function getTeacherById3(id) {
  if (isUsingNeon()) {
    try {
      return await getTeacherById2(id);
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return getTeacherById(id);
}
async function upsertTeacher3(teacher) {
  if (isUsingNeon()) {
    try {
      const neonRes = await upsertTeacher2(teacher);
      try {
        upsertTeacher(teacher);
      } catch {
      }
      return neonRes;
    } catch (e) {
      console.warn("[DB] Neon error writing teacher:", e);
    }
  }
  return upsertTeacher(teacher);
}
async function deleteTeacherById3(id) {
  if (isUsingNeon()) {
    try {
      await deleteTeacherById2(id);
      try {
        deleteTeacherById(id);
      } catch {
      }
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting teacher:", e);
    }
  }
  return deleteTeacherById(id);
}
async function getAllQuizAttempts3(studentId, moduleId) {
  if (isUsingNeon()) {
    try {
      return await getAllQuizAttempts2(studentId, moduleId);
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return getAllQuizAttempts(studentId, moduleId);
}
async function saveQuizAttempt3(attempt, studentProfile) {
  if (isUsingNeon()) {
    try {
      const res = await saveQuizAttempt2(attempt, studentProfile);
      try {
        saveQuizAttempt(attempt, studentProfile);
      } catch {
      }
      return res;
    } catch (e) {
      console.warn("[DB] Neon error writing quiz attempt:", e);
    }
  }
  return saveQuizAttempt(attempt, studentProfile);
}
async function getNotes3(studentId, moduleId) {
  if (isUsingNeon()) {
    try {
      return await getNotes2(studentId, moduleId);
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return getNotes(studentId, moduleId);
}
async function saveNote3(note) {
  if (isUsingNeon()) {
    try {
      const res = await saveNote2(note);
      try {
        saveNote(note);
      } catch {
      }
      return res;
    } catch (e) {
      console.warn("[DB] Neon error writing note:", e);
    }
  }
  return saveNote(note);
}
async function deleteNote3(id) {
  if (isUsingNeon()) {
    try {
      await deleteNote2(id);
      try {
        deleteNote(id);
      } catch {
      }
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting note:", e);
    }
  }
  return deleteNote(id);
}
async function getAnnouncements3() {
  if (isUsingNeon()) {
    try {
      return await getAnnouncements2();
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return getAnnouncements();
}
async function saveAnnouncement3(ann) {
  if (isUsingNeon()) {
    try {
      const res = await saveAnnouncement2(ann);
      try {
        saveAnnouncement(ann);
      } catch {
      }
      return res;
    } catch (e) {
      console.warn("[DB] Neon error writing announcement:", e);
    }
  }
  return saveAnnouncement(ann);
}
async function deleteAnnouncement3(id) {
  if (isUsingNeon()) {
    try {
      await deleteAnnouncement2(id);
      try {
        deleteAnnouncement(id);
      } catch {
      }
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting announcement:", e);
    }
  }
  return deleteAnnouncement(id);
}
async function getTeacherStudentSummaries3() {
  if (isUsingNeon()) {
    try {
      return await getTeacherStudentSummaries2();
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return getTeacherStudentSummaries();
}
async function upsertTeacherStudentSummary3(summary) {
  if (isUsingNeon()) {
    try {
      const res = await upsertTeacherStudentSummary2(summary);
      try {
        upsertTeacherStudentSummary(summary);
      } catch {
      }
      return res;
    } catch (e) {
      console.warn("[DB] Neon error writing summary:", e);
    }
  }
  return upsertTeacherStudentSummary(summary);
}
async function deleteTeacherStudentSummary3(id) {
  if (isUsingNeon()) {
    try {
      await deleteTeacherStudentSummary2(id);
      try {
        deleteTeacherStudentSummary(id);
      } catch {
      }
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting summary:", e);
    }
  }
  return deleteTeacherStudentSummary(id);
}

// server/app.ts
dotenv.config();
ensureDatabaseReady().catch((err) => console.error("[DB] Boot error:", err));
var app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(async (req, res, next) => {
  try {
    await ensureDatabaseReady();
  } catch (err) {
    console.error("[DB] Middleware init error:", err);
  }
  next();
});
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
var apiRouter = express.Router();
apiRouter.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
apiRouter.get("/db/status", async (req, res) => {
  try {
    const status = await getUnifiedDatabaseStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.post(["/neon/test", "/db/test-neon"], async (req, res) => {
  try {
    const { connectionString } = req.body;
    const result = await testNeonConnection(connectionString);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
apiRouter.post(["/neon/migrate", "/db/migrate-to-neon"], async (req, res) => {
  try {
    const { connectionString } = req.body;
    const result = await migrateSQLiteToNeon(connectionString);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
apiRouter.post("/db/reset", (req, res) => {
  try {
    const result = resetDatabase();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.get("/students", async (req, res) => {
  try {
    const students = await getAllStudents3();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.get("/students/:id", async (req, res) => {
  try {
    const student = await getStudentById3(req.params.id);
    if (!student) return res.status(404).json({ error: "Siswa tidak ditemukan" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.post("/students", async (req, res) => {
  try {
    const student = await upsertStudent3(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.put("/students/:id", async (req, res) => {
  try {
    const student = await upsertStudent3({ ...req.body, id: req.params.id });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.delete("/students/:id", async (req, res) => {
  try {
    const result = await deleteStudentById3(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.get("/teachers", async (req, res) => {
  try {
    const teachers = await getAllTeachers3();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.get("/teachers/:id", async (req, res) => {
  try {
    const teacher = await getTeacherById3(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Guru tidak ditemukan" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.post("/teachers", async (req, res) => {
  try {
    const teacher = await upsertTeacher3(req.body);
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.put("/teachers/:id", async (req, res) => {
  try {
    const teacher = await upsertTeacher3({ ...req.body, id: req.params.id });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.delete("/teachers/:id", async (req, res) => {
  try {
    const result = await deleteTeacherById3(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.get("/quiz-attempts", async (req, res) => {
  try {
    const { studentId, moduleId } = req.query;
    const attempts = await getAllQuizAttempts3(studentId, moduleId);
    res.json(attempts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.post("/quiz-attempts", async (req, res) => {
  try {
    const { attempt, studentProfile } = req.body;
    const result = await saveQuizAttempt3(attempt, studentProfile);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.get("/notes", async (req, res) => {
  try {
    const { studentId, moduleId } = req.query;
    const notes = await getNotes3(studentId, moduleId);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.post("/notes", async (req, res) => {
  try {
    const result = await saveNote3(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.delete("/notes/:id", async (req, res) => {
  try {
    const result = await deleteNote3(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.get("/announcements", async (req, res) => {
  try {
    const announcements = await getAnnouncements3();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.post("/announcements", async (req, res) => {
  try {
    const result = await saveAnnouncement3(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.delete("/announcements/:id", async (req, res) => {
  try {
    const result = await deleteAnnouncement3(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.get("/teacher-summary", async (req, res) => {
  try {
    const summaries = await getTeacherStudentSummaries3();
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.post("/teacher-summary", async (req, res) => {
  try {
    const result = await upsertTeacherStudentSummary3(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.delete("/teacher-summary/:id", async (req, res) => {
  try {
    const result = await deleteTeacherStudentSummary3(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
apiRouter.post(["/run-code", "/run-python"], (req, res) => {
  const { code, input = "" } = req.body;
  if (typeof code !== "string" || !code.trim()) {
    return res.status(400).json({
      success: false,
      stdout: "",
      stderr: "Error: Kode program tidak boleh kosong. Silakan ketikkan kode Python di editor.",
      exitCode: 1,
      executionTimeMs: 0
    });
  }
  const dangerousPatterns = [
    /\bos\.system\b/,
    /\bsubprocess\b/,
    /\bshutil\.rmtree\b/,
    /\bos\.remove\b/,
    /\bos\.unlink\b/,
    /\bos\.rmdir\b/,
    /\bpty\.spawn\b/,
    /\b__import__\s*\(\s*['"]os['"]\s*\)/,
    /\b__import__\s*\(\s*['"]subprocess['"]\s*\)/
  ];
  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      return res.json({
        success: false,
        stdout: "",
        stderr: "\u26A0\uFE0F Keamanan Lab Virtual: Pemanggilan modul sistem (os.system / subprocess / manipulasi file kritis) dinonaktifkan di lingkungan Laboratorium Siswa demi keamanan dan integritas server.",
        exitCode: 1,
        executionTimeMs: 0
      });
    }
  }
  const startTime = Date.now();
  const maxExecutionTimeMs = 5e3;
  const maxOutputBytes = 256 * 1024;
  let stdout = "";
  let stderr = "";
  let timedOut = false;
  let finished = false;
  const child = spawn("python3", ["-u", "-c", code], {
    timeout: maxExecutionTimeMs
  });
  const timer = setTimeout(() => {
    if (!finished) {
      timedOut = true;
      try {
        child.kill("SIGKILL");
      } catch (e) {
      }
    }
  }, maxExecutionTimeMs);
  if (input && typeof input === "string") {
    try {
      child.stdin.write(input);
      if (!input.endsWith("\n")) child.stdin.write("\n");
      child.stdin.end();
    } catch (e) {
    }
  } else {
    try {
      child.stdin.end();
    } catch (e) {
    }
  }
  child.stdout.on("data", (data) => {
    if (stdout.length < maxOutputBytes) {
      stdout += data.toString("utf-8");
      if (stdout.length >= maxOutputBytes) {
        stdout += "\n... [Output terpotong: melebihi batas 256KB]";
      }
    }
  });
  child.stderr.on("data", (data) => {
    if (stderr.length < maxOutputBytes) {
      stderr += data.toString("utf-8");
    }
  });
  child.on("error", (err) => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    const executionTimeMs = Date.now() - startTime;
    return res.json({
      success: false,
      stdout,
      stderr: stderr || `Gagal menjalankan interpreter Python: ${err.message}`,
      exitCode: 1,
      executionTimeMs
    });
  });
  child.on("close", (exitCode) => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    const executionTimeMs = Date.now() - startTime;
    if (timedOut) {
      return res.json({
        success: false,
        stdout,
        stderr: (stderr ? stderr + "\n" : "") + "\u23F1\uFE0F Timeout: Waktu eksekusi melebihi batas maksimal (5 detik).\n\u{1F4A1} Petunjuk: Periksa apakah kode Anda memiliki perulangan tak berujung (infinite loop while True) atau fungsi rekursif tanpa base case.",
        exitCode: 124,
        executionTimeMs
      });
    }
    let finalStderr = stderr;
    if (finalStderr.includes("EOFError")) {
      finalStderr += "\n\n\u{1F4A1} Petunjuk Analisis Siswa:\nProgram Anda menggunakan perintah input(), namun tidak menerima masukan data. Buka panel 'Input Siswa (stdin)' di bawah editor dan ketikkan nilai masukan yang diminta program sebelum menekan tombol 'Jalankan Kode'.";
    }
    return res.json({
      success: exitCode === 0,
      stdout,
      stderr: finalStderr,
      exitCode: exitCode ?? 0,
      executionTimeMs
    });
  });
});
function generateFallbackEducationalAnswer(prompt, context, userCode, codeError) {
  const lowerPrompt = (prompt || "").toLowerCase();
  if (userCode || codeError) {
    return `Halo! Saya **Guru AI Informatika SMA**. Mari kita telaah kode Python yang kamu buat:

### \u{1F50D} Analisis Kode & Logika
${codeError ? `**Pesan Kesalahan:** \`${codeError.split("\n")[0]}\`
` : ""}
1. **Periksa Indentasi:** Bahasa Python sangat mengandalkan kerapian spasi (biasanya 4 spasi untuk blok \`if\`, \`for\`, \`while\`, atau \`def\`).
2. **Kesesuaian Tipe Data:** Jika kamu menerima masukan dari \`input()\`, nilainya bertipe teks (*String*). Untuk operasi perhitungan matematika, konversikan menggunakan \`int()\` atau \`float()\`.
3. **Struktur Percabangan / Perulangan:** Pastikan setiap deklarasi diakhiri dengan titik dua (\`:\`).

Contoh perbaikan umum:
\`\`\`python
# Contoh penanganan input angka yang aman
nilai_str = input("Masukkan nilai: ")
if nilai_str.isdigit():
    nilai = int(nilai_str)
    if nilai >= 75:
        print("Tuntas!")
    else:
        print("Remedial")
\`\`\`

Coba periksa kembali baris instruksimu di editor Lab, lalu jalankan kembali! \u{1F680}`;
  }
  if (lowerPrompt.includes("stack") || lowerPrompt.includes("queue") || lowerPrompt.includes("tumpukan") || lowerPrompt.includes("antrean")) {
    return `Halo sahabat Informatika! Mari kita bahas struktur data **Stack** dan **Queue**:

| Karakteristik | Stack (Tumpukan) | Queue (Antrean) |
|---|---|---|
| **Prinsip Dasar** | **LIFO** (*Last In, First Out*) | **FIFO** (*First In, First Out*) |
| **Analogi Nyata** | Tumpukan piring atau tumpukan buku di meja | Antrean siswa membeli makanan di kantin sekolah |
| **Operasi Utama** | \`push()\` (tambah) & \`pop()\` (ambil dari atas) | \`enqueue()\` (masuk belakang) & \`dequeue()\` (keluar depan) |

\u{1F4A1} **Pertanyaan Refleksi:** Mengapa fitur *Undo* (Ctrl+Z) di komputer paling tepat menggunakan prinsip **Stack**? Coba kamu pikirkan!`;
  }
  if (lowerPrompt.includes("ip") || lowerPrompt.includes("jaringan") || lowerPrompt.includes("subnet") || lowerPrompt.includes("dns")) {
    return `Halo! Mari pelajari konsep **Jaringan Komputer & Internet (JKI)**:

1. **Alamat IP (Internet Protocol):** Merupakan identitas numerik unik setiap perangkat di jaringan, misalnya \`192.168.1.10\`.
2. **Subnet Mask & CIDR (/24):** Menentukan pembagian antara porsi *Network ID* (jaringan) dan *Host ID* (perangkat individu). Prefix \`/24\` berarti terdapat 254 alamat perangkat yang dapat digunakan.
3. **DNS (Domain Name System):** Buku telepon internet yang menerjemahkan nama website yang mudah diingat manusia (seperti \`kemdikbud.go.id\`) menjadi alamat IP server tujuan.

Kamu juga bisa mencoba langsung **Kalkulator Subnetting** di tab *Laboratorium Virtual* untuk melihat perhitungan IP secara real-time!`;
  }
  return `Halo! Senang sekali kamu bersemangat belajar Informatika. \u{1F44B}

Terkait pertanyaanmu mengenai **${context}**:
*"${prompt}"*

Berikut adalah poin-poin kunci yang perlu kamu pahami:
1. **Berpikir Komputasional:** Gunakan pendekatan dekomposisi (memecah masalah rumit menjadi bagian kecil) dan pengenalan pola untuk mempermudah pemahaman.
2. **Implementasi Konseptual:** Dalam dunia nyata, logika komputasi selalu diterapkan untuk mengotomatisasi pekerjaan manusia dan memecahkan masalah efisiensi.
3. **Uji Coba Mandiri:** Kamu bisa mencoba materi ini secara interaktif melalui E-Modul dan mencoba kode atau simulasinya di Laboratorium Virtual.

Ada bagian spesifik yang ingin kamu tanyakan lebih mendalam? Saya siap mendampingi belajarmu! \u{1F4BB}`;
}
function getSuggestedFollowUps(prompt, context, hasCode) {
  if (hasCode) {
    return [
      "Bagaimana cara mengoptimalkan kode ini?",
      "Jelaskan alur eksekusi baris demi baris",
      "Apa kemungkinan bug jika inputnya negatif atau kosong?"
    ];
  }
  const p = (prompt + " " + context).toLowerCase();
  if (p.includes("algoritma") || p.includes("python") || p.includes("program")) {
    return [
      "Tunjukkan contoh kode Python sederhananya",
      "Apa bedanya perulangan For dan While?",
      "Bagaimana cara menguji algoritma ini?"
    ];
  }
  if (p.includes("jaringan") || p.includes("ip") || p.includes("subnet")) {
    return [
      "Bagaimana cara menghitung Host pada subnet /26?",
      "Apa beda IPv4 dan IPv6?",
      "Bagaimana cara kerja router mengarahkan paket data?"
    ];
  }
  if (p.includes("soal") || p.includes("kuis") || p.includes("latihan")) {
    return [
      "Beri petunjuk tanpa langsung memberi tahu kuncinya",
      "Mengapa opsi pilihan lainnya salah?",
      "Buatkan 1 variasi soal latihan serupa"
    ];
  }
  return [
    "Beri contoh nyata dalam kehidupan sehari-hari",
    "Jelaskan konsep ini dengan bahasa lebih sederhana",
    "Uji pemahaman saya dengan 1 pertanyaan kuis"
  ];
}
apiRouter.post(["/ai-tutor", "/ai/ask"], async (req, res) => {
  const { prompt, context, message, contextTopic, userCode, codeError, history } = req.body;
  const userPrompt = prompt || message || "Jelaskan konsep dasar materi Informatika ini.";
  const userContext = context || contextTopic || "Mata Pelajaran Informatika SMA (Kurikulum Merdeka)";
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: generateFallbackEducationalAnswer(userPrompt, userContext, userCode, codeError),
        suggestedFollowUps: getSuggestedFollowUps(userPrompt, userContext, !!userCode)
      });
    }
    const systemPrompt = `Anda adalah "Guru AI Informatika SMA", tutor cerdas, komunikatif, solutif, dan membimbing untuk siswa SMA (Kurikulum Merdeka) di Indonesia.
Topik Pembelajaran Saat Ini: ${userContext}.
${userCode ? `Kode Siswa di Laboratorium:
\`\`\`python
${userCode}
\`\`\`` : ""}
${codeError ? `Pesan Error Kompilasi/Eksekusi Siswa:
\`\`\`
${codeError}
\`\`\`` : ""}

Panduan Memberikan Respon untuk Siswa SMA:
1. Bersikaplah seperti guru yang suportif, ramah, dan mendidik ("Halo sahabat informatika!", "Bagus sekali pertanyaanmu!").
2. Jelaskan materi dengan bahasa Indonesia yang jelas, kontekstual, dan mudah dipahami siswa SMA.
3. Hubungkan materi dengan 4 Pilar Berpikir Komputasional (Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma) dan analogi dunia nyata.
4. Jika ada kode/error siswa:
   - Tunjukkan letak kesalahan dan jelaskan alasannya secara ramah.
   - Tunjukkan potongan kode yang benar dan beri komentar penjelas.
5. Format jawaban secara rapi dan estetis dengan Markdown (judul tebal, bullet points, blok kode \`\`\`python, atau tabel ringkas).
6. Akhiri jawaban dengan kalimat motivasi atau pertanyaan reflektif pendek.`;
    const contents = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item.sender === "user" || item.role === "user") {
          contents.push({ role: "user", parts: [{ text: item.text || item.content || "" }] });
        } else if (item.sender === "ai" || item.role === "model") {
          contents.push({ role: "model", parts: [{ text: item.text || item.content || "" }] });
        }
      }
    }
    contents.push({ role: "user", parts: [{ text: userPrompt }] });
    const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
    let aiResponseText = "";
    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: systemPrompt
          }
        });
        if (response.text) {
          aiResponseText = response.text;
          break;
        }
      } catch (err) {
        console.warn(`Model ${modelName} warning:`, err.status || err.message);
      }
    }
    if (!aiResponseText) {
      aiResponseText = generateFallbackEducationalAnswer(userPrompt, userContext, userCode, codeError);
    }
    const suggestedFollowUps = getSuggestedFollowUps(userPrompt, userContext, !!userCode);
    return res.json({
      reply: aiResponseText,
      suggestedFollowUps
    });
  } catch (error) {
    console.error("Error in /api/ai-tutor:", error);
    return res.json({
      reply: generateFallbackEducationalAnswer(userPrompt, userContext, userCode, codeError),
      suggestedFollowUps: getSuggestedFollowUps(userPrompt, userContext, !!userCode)
    });
  }
});
apiRouter.post("/ai/generate-question", async (req, res) => {
  try {
    const { topic, difficulty } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        fallback: true,
        question: {
          id: `gen-${Date.now()}`,
          topic: topic || "Berpikir Komputasional",
          difficulty: difficulty || "Sedang",
          question: "Dalam struktur data antrean (Queue) di kantin sekolah, prinsip apakah yang digunakan saat melayani siswa yang datang membeli makanan?",
          options: [
            "FIFO (First In, First Out) - Siapa yang pertama datang, dialah yang pertama dilayani",
            "LIFO (Last In, First Out) - Siapa yang terakhir datang, dialah yang pertama dilayani",
            "Random - Dilayani secara acak tanpa urutan",
            "Priority - Hanya melayani siswa yang membawa uang pas"
          ],
          correctIndex: 0,
          explanation: "Prinsip Queue adalah FIFO (First In, First Out), yaitu siapa pun yang pertama mengantre maka dialah yang pertama kali dilayani dan selesai."
        }
      });
    }
    const prompt = `Buatkan 1 butir soal latihan Informatika tingkat SMA tingkat kesulitan ${difficulty || "Sedang"} mengenai topik "${topic || "Berpikir Komputasional"}". Format wajib JSON dengan struktur:
{
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "question": "teks soal yang jelas, kontekstual kehidupan sehari-hari siswa SMA",
  "codeSnippet": "opsional kode jika relevan, jika tidak kosongkan",
  "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
  "correctIndex": 0,
  "explanation": "Penjelasan detail mengapa jawaban tersebut benar dan konsep teorinya bagi siswa SMA"
}`;
    const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
    let responseText = "";
    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err) {
        console.warn(`Generate question model ${modelName} error:`, err.status || err.message);
      }
    }
    if (!responseText) {
      throw new Error("No model response");
    }
    const parsed = JSON.parse(responseText || "{}");
    res.json({
      question: {
        id: `gen-${Date.now()}`,
        ...parsed
      }
    });
  } catch (error) {
    console.error("Error generating question:", error);
    res.json({
      fallback: true,
      question: {
        id: `gen-${Date.now()}`,
        topic: req.body?.topic || "Berpikir Komputasional",
        difficulty: req.body?.difficulty || "Sedang",
        question: "Mengapa pemecahan masalah dengan dekomposisi sangat penting dalam merancang program komputer yang kompleks?",
        options: [
          "Memecah masalah rumit menjadi sub-masalah kecil yang lebih mudah dikelola dan diselesaikan secara bertahap",
          "Menghapus seluruh baris instruksi agar kode lebih pendek",
          "Mengganti seluruh variabel menjadi tipe data numerik",
          "Menjalankan program berulang kali tanpa batas hingga komputer berhenti"
        ],
        correctIndex: 0,
        explanation: "Dekomposisi adalah pilar Berpikir Komputasional untuk memecah masalah besar dan rumit menjadi komponen-komponen yang lebih kecil dan terkelola."
      }
    });
  }
});
app.use("/api", apiRouter);
app.use(apiRouter);
var app_default = app;

// server/apiHandler.ts
var apiHandler_default = app_default;
export {
  apiHandler_default as default
};
