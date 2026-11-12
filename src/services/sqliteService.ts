import { StudentProfile, TeacherProfile, QuizAttempt, TeacherStudentSummary } from '../types';

export interface SQLiteDatabaseStatus {
  engine: string;
  file?: string;
  connected?: boolean;
  fileSizeBytes?: number;
  fileSizeKB?: number;
  journalMode?: string;
  tables?: {
    students: number;
    teachers: number;
    quiz_attempts: number;
    notes: number;
    announcements: number;
    teacher_students_summary: number;
  };
  lastUpdated?: string;
}

export interface UnifiedDatabaseStatus {
  activeEngine: 'neon' | 'sqlite';
  isNeonReady: boolean;
  statusText?: string;
  phase?: string;
  message: string;
  neon: {
    configured: boolean;
    engine: string;
    connected?: boolean;
    maskedUrl?: string;
    database?: string;
    latencyMs?: number;
    tables?: {
      students: number;
      teachers: number;
      quiz_attempts: number;
      notes: number;
      announcements: number;
      teacher_students_summary: number;
    };
    error?: string;
    status?: string;
  };
  sqlite: SQLiteDatabaseStatus;
}

export const sqliteService = {
  // Database Status
  async getStatus(): Promise<SQLiteDatabaseStatus | null> {
    try {
      const res = await fetch('/api/db/status');
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      console.warn('SQLite status fetch error:', e);
      return null;
    }
  },

  async resetDatabase(): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/db/reset', { method: 'POST' });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Gagal mereset database' };
    }
  },

  // Students
  async getStudents(): Promise<StudentProfile[]> {
    try {
      const res = await fetch('/api/students');
      if (!res.ok) throw new Error('Failed to fetch students');
      return await res.json();
    } catch (e) {
      console.warn('SQLite getStudents fallback:', e);
      return [];
    }
  },

  async getStudent(id: string): Promise<StudentProfile | null> {
    try {
      const res = await fetch(`/api/students/${encodeURIComponent(id)}`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async saveStudent(student: StudentProfile): Promise<StudentProfile | null> {
    try {
      const res = await fetch(`/api/students/${encodeURIComponent(student.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
      if (!res.ok) throw new Error('Failed to save student');
      return await res.json();
    } catch (e) {
      console.warn('SQLite saveStudent fallback:', e);
      return student;
    }
  },

  async deleteStudent(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/students/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  // Teachers
  async getTeachers(): Promise<TeacherProfile[]> {
    try {
      const res = await fetch('/api/teachers');
      if (!res.ok) throw new Error('Failed to fetch teachers');
      return await res.json();
    } catch (e) {
      console.warn('SQLite getTeachers fallback:', e);
      return [];
    }
  },

  async saveTeacher(teacher: TeacherProfile): Promise<TeacherProfile | null> {
    try {
      const res = await fetch(`/api/teachers/${encodeURIComponent(teacher.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher),
      });
      if (!res.ok) throw new Error('Failed to save teacher');
      return await res.json();
    } catch (e) {
      console.warn('SQLite saveTeacher fallback:', e);
      return teacher;
    }
  },

  async deleteTeacher(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/teachers/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  // Quiz Attempts
  async getQuizAttempts(studentId?: string, moduleId?: string): Promise<QuizAttempt[]> {
    try {
      const query = new URLSearchParams();
      if (studentId) query.set('studentId', studentId);
      if (moduleId) query.set('moduleId', moduleId);
      const res = await fetch(`/api/quiz-attempts?${query.toString()}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  },

  async saveQuizAttempt(attempt: QuizAttempt, studentProfile?: StudentProfile): Promise<boolean> {
    try {
      const res = await fetch('/api/quiz-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attempt, studentProfile }),
      });
      return res.ok;
    } catch (e) {
      console.warn('SQLite saveQuizAttempt error:', e);
      return false;
    }
  },

  // Notes
  async getNotes(studentId?: string, moduleId?: string): Promise<any[]> {
    try {
      const query = new URLSearchParams();
      if (studentId) query.set('studentId', studentId);
      if (moduleId) query.set('moduleId', moduleId);
      const res = await fetch(`/api/notes?${query.toString()}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  },

  async saveNote(note: { id: string; studentId: string; moduleId: string; title: string; text: string; date: string; timestamp?: number }): Promise<boolean> {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  async deleteNote(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/notes/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  // Announcements
  async getAnnouncements(): Promise<Array<{ id: string; teacherId?: string; author: string; text: string; date: string; createdAt?: string }>> {
    try {
      const res = await fetch('/api/announcements');
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  },

  async saveAnnouncement(ann: { id: string; teacherId?: string; author: string; text: string; date: string }): Promise<boolean> {
    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ann),
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  async deleteAnnouncement(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/announcements/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  // Teacher Student Summaries
  async getTeacherStudentSummaries(): Promise<TeacherStudentSummary[]> {
    try {
      const res = await fetch('/api/teacher-summary');
      if (!res.ok) return [];
      return await res.json();
    } catch (e) {
      return [];
    }
  },

  async saveTeacherStudentSummary(summary: TeacherStudentSummary): Promise<boolean> {
    try {
      const res = await fetch('/api/teacher-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(summary),
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  async deleteTeacherStudentSummary(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/teacher-summary/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  // Neon Database Testing & Migration Methods
  async getUnifiedStatus(): Promise<UnifiedDatabaseStatus | null> {
    try {
      const res = await fetch('/api/db/status');
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  async testNeon(connectionString?: string): Promise<{ success: boolean; latencyMs?: number; message: string; error?: string }> {
    try {
      const res = await fetch('/api/neon/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionString }),
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message || 'Koneksi ke Neon gagal' };
    }
  },

  async migrateToNeon(connectionString?: string): Promise<{ success: boolean; message: string; migrated?: any; error?: string }> {
    try {
      const res = await fetch('/api/neon/migrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionString }),
      });
      return await res.json();
    } catch (e: any) {
      return { success: false, message: e.message || 'Migrasi ke Neon gagal' };
    }
  },
};
