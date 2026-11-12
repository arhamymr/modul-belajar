import * as sqlite from "./sqliteDb";
import * as neon from "./neonDb";

let neonInitialized = false;
let initPromise: Promise<void> | null = null;

// Initialize appropriate database on boot
export async function initAppDatabase() {
  if (neon.isNeonConfigured()) {
    try {
      console.log("[DB] Neon DATABASE_URL detected. Initializing Neon PostgreSQL schemas...");
      await neon.initNeonDatabase();
      neonInitialized = true;
      console.log("[DB] Neon Serverless PostgreSQL successfully initialized.");
    } catch (err: any) {
      console.error("[DB] Neon PostgreSQL init warning:", err.message);
      // Even if DDL check had a hiccup, neon is configured so keep using it
      neonInitialized = true;
    }
  } else {
    try {
      sqlite.initSQLiteDatabase();
    } catch (err) {
      console.warn("[DB] SQLite init note:", err);
    }
    console.log("[DB] SQLite persistent database active. Ready for Neon DATABASE_URL.");
  }
}

export function ensureDatabaseReady(): Promise<void> {
  if (!initPromise) {
    initPromise = initAppDatabase().catch(err => {
      console.error("[DB] Database initialization error:", err);
    });
  }
  return initPromise;
}

export function isUsingNeon(): boolean {
  return neon.isNeonConfigured();
}

// Unified Status
export async function getUnifiedDatabaseStatus() {
  const sqliteStatus = sqlite.getDatabaseStatus();
  const neonStatus = await neon.getNeonStatus();

  return {
    activeEngine: isUsingNeon() ? "neon" : "sqlite",
    isNeonReady: neon.isNeonConfigured(),
    neon: neonStatus,
    sqlite: sqliteStatus,
    statusText: neon.isNeonConfigured() ? "Neon Cloud Connected" : "SQLite Local Ready",
    message: isUsingNeon()
      ? "Database utama aktif menggunakan Neon Serverless PostgreSQL Cloud"
      : "Database saat ini aktif menggunakan SQLite lokal. Menunggu Connection String Neon."
  };
}

// Data Migration helper: SQLite -> Neon
export async function migrateSQLiteToNeon(customUrl?: string) {
  try {
    // 1. Ensure schemas in Neon exist
    await neon.initNeonDatabase(customUrl);

    // 2. Read from SQLite
    const students = sqlite.getAllStudents();
    const teachers = sqlite.getAllTeachers();
    const attempts = sqlite.getAllQuizAttempts();
    const notes = sqlite.getNotes();
    const announcements = sqlite.getAnnouncements();
    const summaries = sqlite.getTeacherStudentSummaries();

    // 3. Insert into Neon
    for (const s of students) {
      if (s) await neon.upsertStudent(s);
    }
    for (const t of teachers) {
      if (t) await neon.upsertTeacher(t);
    }
    for (const a of attempts) {
      await neon.saveQuizAttempt(a);
    }
    for (const n of notes) {
      await neon.saveNote(n);
    }
    for (const ann of announcements) {
      await neon.saveAnnouncement(ann);
    }
    for (const sum of summaries) {
      await neon.upsertTeacherStudentSummary(sum);
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
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      message: "Gagal memigrasikan data ke Neon."
    };
  }
}

// --- Unified Data Access Proxies ---

// Students
export async function getAllStudents() {
  if (isUsingNeon()) {
    try {
      return await neon.getAllStudents();
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return sqlite.getAllStudents();
}

export async function getStudentById(id: string) {
  if (isUsingNeon()) {
    try {
      return await neon.getStudentById(id);
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return sqlite.getStudentById(id);
}

export async function upsertStudent(student: any) {
  if (isUsingNeon()) {
    try {
      return await neon.upsertStudent(student);
    } catch (e) {
      console.warn("[DB] Neon error writing student:", e);
    }
  }
  return sqlite.upsertStudent(student);
}

export async function deleteStudentById(id: string) {
  if (isUsingNeon()) {
    try {
      await neon.deleteStudentById(id);
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting student:", e);
    }
  }
  return sqlite.deleteStudentById(id);
}

// Teachers
export async function getAllTeachers() {
  if (isUsingNeon()) {
    try {
      return await neon.getAllTeachers();
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return sqlite.getAllTeachers();
}

export async function getTeacherById(id: string) {
  if (isUsingNeon()) {
    try {
      return await neon.getTeacherById(id);
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return sqlite.getTeacherById(id);
}

export async function upsertTeacher(teacher: any) {
  if (isUsingNeon()) {
    try {
      return await neon.upsertTeacher(teacher);
    } catch (e) {
      console.warn("[DB] Neon error writing teacher:", e);
    }
  }
  return sqlite.upsertTeacher(teacher);
}

export async function deleteTeacherById(id: string) {
  if (isUsingNeon()) {
    try {
      await neon.deleteTeacherById(id);
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting teacher:", e);
    }
  }
  return sqlite.deleteTeacherById(id);
}

// Quiz Attempts
export async function getAllQuizAttempts(studentId?: string, moduleId?: string) {
  if (isUsingNeon()) {
    try {
      return await neon.getAllQuizAttempts(studentId, moduleId);
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return sqlite.getAllQuizAttempts(studentId, moduleId);
}

export async function saveQuizAttempt(attempt: any, studentProfile?: any) {
  if (isUsingNeon()) {
    try {
      return await neon.saveQuizAttempt(attempt, studentProfile);
    } catch (e) {
      console.warn("[DB] Neon error writing quiz attempt:", e);
    }
  }
  return sqlite.saveQuizAttempt(attempt, studentProfile);
}

// Notes
export async function getNotes(studentId?: string, moduleId?: string) {
  if (isUsingNeon()) {
    try {
      return await neon.getNotes(studentId, moduleId);
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return sqlite.getNotes(studentId, moduleId);
}

export async function saveNote(note: any) {
  if (isUsingNeon()) {
    try {
      return await neon.saveNote(note);
    } catch (e) {
      console.warn("[DB] Neon error writing note:", e);
    }
  }
  return sqlite.saveNote(note);
}

export async function deleteNote(id: string) {
  if (isUsingNeon()) {
    try {
      await neon.deleteNote(id);
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting note:", e);
    }
  }
  return sqlite.deleteNote(id);
}

// Announcements
export async function getAnnouncements() {
  if (isUsingNeon()) {
    try {
      return await neon.getAnnouncements();
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return sqlite.getAnnouncements();
}

export async function saveAnnouncement(ann: any) {
  if (isUsingNeon()) {
    try {
      return await neon.saveAnnouncement(ann);
    } catch (e) {
      console.warn("[DB] Neon error writing announcement:", e);
    }
  }
  return sqlite.saveAnnouncement(ann);
}

export async function deleteAnnouncement(id: string) {
  if (isUsingNeon()) {
    try {
      await neon.deleteAnnouncement(id);
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting announcement:", e);
    }
  }
  return sqlite.deleteAnnouncement(id);
}

// Teacher Student Summaries
export async function getTeacherStudentSummaries() {
  if (isUsingNeon()) {
    try {
      return await neon.getTeacherStudentSummaries();
    } catch (e) {
      console.warn("[DB] Neon error, falling back to SQLite:", e);
    }
  }
  return sqlite.getTeacherStudentSummaries();
}

export async function upsertTeacherStudentSummary(summary: any) {
  if (isUsingNeon()) {
    try {
      return await neon.upsertTeacherStudentSummary(summary);
    } catch (e) {
      console.warn("[DB] Neon error writing summary:", e);
    }
  }
  return sqlite.upsertTeacherStudentSummary(summary);
}

export async function deleteTeacherStudentSummary(id: string) {
  if (isUsingNeon()) {
    try {
      await neon.deleteTeacherStudentSummary(id);
      return { success: true };
    } catch (e) {
      console.warn("[DB] Neon error deleting summary:", e);
    }
  }
  return sqlite.deleteTeacherStudentSummary(id);
}
