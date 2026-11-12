import { neon } from "@neondatabase/serverless";

// Helper to check if Neon connection string is present
export function getNeonConnectionString(): string | null {
  const url = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL || "";
  if (url.trim() && (url.startsWith("postgres://") || url.startsWith("postgresql://"))) {
    return url.trim();
  }
  return null;
}

export function isNeonConfigured(): boolean {
  return getNeonConnectionString() !== null;
}

export function getMaskedNeonUrl(url?: string): string {
  const target = url || getNeonConnectionString() || "";
  if (!target) return "";
  try {
    const parsed = new URL(target);
    return `${parsed.protocol}//***:***@${parsed.host}${parsed.pathname}`;
  } catch {
    return "postgresql://***:***@neon.tech/***";
  }
}

// Get sql client for current connection string
export function getNeonClient(customUrl?: string) {
  const connectionString = customUrl || getNeonConnectionString();
  if (!connectionString) {
    throw new Error("Neon DATABASE_URL is not configured yet.");
  }
  return neon(connectionString);
}

// ==========================================
// DDL SCHEMA INITIALIZATION
// ==========================================

export async function initNeonDatabase(customUrl?: string) {
  const sql = getNeonClient(customUrl);

  // 1. Students Table
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

  // 2. Teachers Table
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

  // 3. Quiz Attempts Table
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

  // 4. Notes Table
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

  // 5. Announcements Table
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

  // 6. Teacher Students Summary Table
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

  // 7. App Metadata Table
  await sql`
    CREATE TABLE IF NOT EXISTS app_meta (
      key VARCHAR(128) PRIMARY KEY,
      value TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  // Check if starter data has already been seeded before
  let alreadySeeded = false;
  try {
    const seedRows = await sql`SELECT value FROM app_meta WHERE key = 'starter_seeded'`;
    alreadySeeded = seedRows.length > 0 && seedRows[0]?.value === 'true';
  } catch (e) {
    alreadySeeded = false;
  }

  if (!alreadySeeded) {
    // Seed default teacher if table is empty
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

    // Seed default student if empty
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

    // Seed default announcement if empty
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
      // ignore
    }
  }
}

// ==========================================
// TEST CONNECTION & DIAGNOSTICS
// ==========================================

export async function testNeonConnection(customUrl?: string) {
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
  } catch (error: any) {
    return {
      success: false,
      latencyMs: Date.now() - startTime,
      error: error.message || "Gagal menghubungi Neon Database",
      maskedUrl: getMaskedNeonUrl(customUrl),
      message: "Koneksi ke Neon gagal. Periksa kembali connection string."
    };
  }
}

export async function getNeonStatus() {
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
      lastUpdated: new Date().toISOString()
    };
  } catch (error: any) {
    return {
      configured: true,
      engine: "Neon Serverless PostgreSQL (Cloud)",
      connected: false,
      maskedUrl: getMaskedNeonUrl(),
      error: error.message,
      lastUpdated: new Date().toISOString()
    };
  }
}

// ==========================================
// ROW FORMATTERS
// ==========================================

function formatStudentRow(row: any) {
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
    completedModules: typeof row.completed_modules === "string" ? JSON.parse(row.completed_modules) : (row.completed_modules || []),
    badges: typeof row.badges === "string" ? JSON.parse(row.badges) : (row.badges || []),
    savedNotes: typeof row.saved_notes === "string" ? JSON.parse(row.saved_notes) : (row.saved_notes || []),
    quizHistory: typeof row.quiz_history === "string" ? JSON.parse(row.quiz_history) : (row.quiz_history || []),
    historyAttempts: typeof row.history_attempts === "string" ? JSON.parse(row.history_attempts) : (row.history_attempts || []),
    bookmarkedQuestions: typeof row.bookmarked_questions === "string" ? JSON.parse(row.bookmarked_questions) : (row.bookmarked_questions || []),
    registeredAt: row.registered_at ? new Date(row.registered_at).toISOString() : "",
    savedLocally: false,
    storageEngine: "neon"
  };
}

function formatTeacherRow(row: any) {
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
    teachingClasses: typeof row.teaching_classes === "string" ? JSON.parse(row.teaching_classes) : (row.teaching_classes || []),
    avatar: row.avatar || "",
    phone: row.phone || "",
    lastLogin: row.last_login || "",
    registeredAt: row.registered_at ? new Date(row.registered_at).toISOString() : "",
    savedLocally: false,
    storageEngine: "neon"
  };
}

// ==========================================
// CRUD OPERATIONS (NEON POSTGRES)
// ==========================================

export async function getAllStudents() {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM students ORDER BY name ASC`;
  return rows.map(formatStudentRow);
}

export async function getStudentById(id: string) {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM students WHERE id = ${id} LIMIT 1`;
  return formatStudentRow(rows[0]);
}

export async function upsertStudent(student: any) {
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
  const registeredAt = student.registeredAt ? new Date(student.registeredAt).toISOString() : new Date().toISOString();

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

  return await getStudentById(id);
}

export async function deleteStudentById(id: string) {
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

// Teachers
export async function getAllTeachers() {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM teachers ORDER BY name ASC`;
  return rows.map(formatTeacherRow);
}

export async function getTeacherById(id: string) {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM teachers WHERE id = ${id} LIMIT 1`;
  return formatTeacherRow(rows[0]);
}

export async function upsertTeacher(teacher: any) {
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
  const registeredAt = teacher.registeredAt ? new Date(teacher.registeredAt).toISOString() : new Date().toISOString();

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

  return await getTeacherById(id);
}

export async function deleteTeacherById(id: string) {
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

// Quiz Attempts
export async function getAllQuizAttempts(studentId?: string, moduleId?: string) {
  const sql = getNeonClient();
  let rows: any[] = [];

  if (studentId && moduleId) {
    rows = await sql`SELECT * FROM quiz_attempts WHERE student_id = ${studentId} AND module_id = ${moduleId} ORDER BY created_at DESC`;
  } else if (studentId) {
    rows = await sql`SELECT * FROM quiz_attempts WHERE student_id = ${studentId} ORDER BY created_at DESC`;
  } else if (moduleId) {
    rows = await sql`SELECT * FROM quiz_attempts WHERE module_id = ${moduleId} ORDER BY created_at DESC`;
  } else {
    rows = await sql`SELECT * FROM quiz_attempts ORDER BY created_at DESC`;
  }

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
    answers: typeof r.answers === "string" ? JSON.parse(r.answers) : (r.answers || {}),
    elementScores: typeof r.element_scores === "string" ? JSON.parse(r.element_scores) : (r.element_scores || {}),
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : ""
  }));
}

export async function saveQuizAttempt(attempt: any, studentProfile?: any) {
  const sql = getNeonClient();
  const id = attempt.id || attempt.attemptId || `attempt-${Date.now()}`;
  const studentId = attempt.studentId || studentProfile?.id || "guest";
  const studentName = attempt.studentName || studentProfile?.name || "Siswa";
  const studentClass = attempt.studentClass || studentProfile?.classGrade || "Kelas X";
  const moduleId = attempt.moduleId;
  const timestamp = attempt.timestamp || new Date().toISOString();
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

  // Also update student history & summary in Neon
  if (studentProfile && studentProfile.id) {
    const student = await getStudentById(studentProfile.id);
    if (student) {
      const history = student.historyAttempts || [];
      const updatedHistory = [attempt, ...history.filter((a: any) => a.attemptId !== id)];
      student.historyAttempts = updatedHistory;
      student.quizHistory = updatedHistory;

      const avgScore = Math.round(updatedHistory.reduce((acc: number, a: any) => acc + (a.score || 0), 0) / updatedHistory.length);
      const kktp = avgScore >= 85 ? "Sangat Mahir" : avgScore >= 75 ? "Mahir" : avgScore >= 60 ? "Cukup" : "Perlu Bimbingan";

      await upsertStudent(student);

      await upsertTeacherStudentSummary({
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

// Notes
export async function getNotes(studentId?: string, moduleId?: string) {
  const sql = getNeonClient();
  let rows: any[] = [];

  if (studentId && moduleId) {
    rows = await sql`SELECT * FROM notes WHERE student_id = ${studentId} AND module_id = ${moduleId} ORDER BY created_at DESC`;
  } else if (studentId) {
    rows = await sql`SELECT * FROM notes WHERE student_id = ${studentId} ORDER BY created_at DESC`;
  } else if (moduleId) {
    rows = await sql`SELECT * FROM notes WHERE module_id = ${moduleId} ORDER BY created_at DESC`;
  } else {
    rows = await sql`SELECT * FROM notes ORDER BY created_at DESC`;
  }

  return rows.map(r => ({
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

export async function saveNote(note: any) {
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

export async function deleteNote(id: string) {
  const sql = getNeonClient();
  await sql`DELETE FROM notes WHERE id = ${id}`;
  return { success: true };
}

// Announcements
export async function getAnnouncements() {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM announcements ORDER BY created_at DESC`;
  return rows.map(r => ({
    id: r.id,
    teacherId: r.teacher_id,
    author: r.author,
    text: r.text,
    date: r.date,
    createdAt: r.created_at ? new Date(r.created_at).toISOString() : ""
  }));
}

export async function saveAnnouncement(ann: any) {
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

export async function deleteAnnouncement(id: string) {
  const sql = getNeonClient();
  await sql`DELETE FROM announcements WHERE id = ${id}`;
  return { success: true };
}

// Teacher Student Summaries
export async function getTeacherStudentSummaries() {
  const sql = getNeonClient();
  const rows = await sql`SELECT * FROM teacher_students_summary ORDER BY name ASC`;
  return rows.map(r => ({
    id: r.id,
    name: r.name,
    nisn: r.nisn || "",
    classGrade: r.class_grade || "Kelas X",
    completedModulesCount: Number(r.completed_modules_count) || 0,
    averageScore: Number(r.average_score) || 0,
    attemptsCount: Number(r.attempts_count) || 0,
    kktpStatus: r.kktp_status || "Belum Mengikuti",
    lastActive: r.last_active || "Belum ada aktivitas",
    elementPerformance: typeof r.element_performance === "string" ? JSON.parse(r.element_performance) : (r.element_performance || {}),
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : ""
  }));
}

export async function upsertTeacherStudentSummary(summary: any) {
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

export async function deleteTeacherStudentSummary(id: string) {
  const sql = getNeonClient();
  await sql`DELETE FROM teacher_students_summary WHERE id = ${id}`;
  return { success: true };
}
