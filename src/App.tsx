import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Video, 
  HelpCircle, 
  Award, 
  Cpu, 
  GraduationCap, 
  Sparkles, 
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Lock,
  UserCheck,
  LogIn,
  IconContext
} from './icons/phosphor';
import { 
  StudentProfile, 
  TeacherProfile,
  UserRole,
  QuizAttempt, 
  QuestionItem, 
  InteractiveModule,
  LabContext
} from './types';
import { 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_TEACHER_PROFILES,
  DEMO_STUDENT_PROFILES,
  MODULES_DATA,
  VIDEO_TUTORIALS_DATA
} from './data/curriculumData';

import { Header } from './components/Header';
import { ModuleList } from './components/ModuleList';
import { ModuleReader } from './components/ModuleReader';
import { VideoTutorialPlayer } from './components/VideoTutorialPlayer';
import { QuizArena } from './components/QuizArena';
import { GradingReport } from './components/GradingReport';
import { InteractiveLab } from './components/InteractiveLab';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AITutorModal } from './components/AITutorModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { TeacherProfileModal } from './components/TeacherProfileModal';
import { CertificateModal } from './components/CertificateModal';
import { AuthModal } from './components/AuthModal';
import { LoginPage } from './components/LoginPage';
import { GuidePage } from './components/GuidePage';
import { sqliteService } from './services/sqliteService';

export default function App() {
  // Navigation tabs: 'modules' | 'reader' | 'videos' | 'quiz' | 'grading' | 'lab' | 'teacher'
  const [activeTab, setActiveTab] = useState<string>('modules');
  
  // First page authentication session state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('emodul_is_logged_in');
    return saved === 'true';
  });

  // Selalu gunakan tampilan standar terang (mode malam/siang ditiadakan)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Persistent Teachers & Students List
  const [teachersList, setTeachersList] = useState<TeacherProfile[]>(() => {
    const saved = localStorage.getItem('emodul_teachers_list');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TEACHER_PROFILES;
  });

  const [studentsList, setStudentsList] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem('emodul_students_list');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return DEMO_STUDENT_PROFILES;
  });

  // Role & Session State
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('emodul_current_role');
    return (savedRole === 'guru' || savedRole === 'siswa') ? savedRole : 'siswa';
  });

  // Active Teacher Profile
  const [teacher, setTeacher] = useState<TeacherProfile | null>(() => {
    const saved = localStorage.getItem('emodul_active_teacher');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) return parsed;
        return null;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TEACHER_PROFILES[0] || null;
  });

  // Active Student Profile
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('emodul_student_profile');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          return {
            ...INITIAL_STUDENT_PROFILE,
            ...parsed,
            completedModules: Array.isArray(parsed?.completedModules) ? parsed.completedModules : INITIAL_STUDENT_PROFILE.completedModules,
            badges: Array.isArray(parsed?.badges) ? parsed.badges : INITIAL_STUDENT_PROFILE.badges,
            savedNotes: Array.isArray(parsed?.savedNotes) ? parsed.savedNotes : INITIAL_STUDENT_PROFILE.savedNotes,
            quizHistory: Array.isArray(parsed?.quizHistory) ? parsed.quizHistory : (Array.isArray(parsed?.historyAttempts) ? parsed.historyAttempts : INITIAL_STUDENT_PROFILE.quizHistory),
            historyAttempts: Array.isArray(parsed?.historyAttempts) ? parsed.historyAttempts : (Array.isArray(parsed?.quizHistory) ? parsed.quizHistory : INITIAL_STUDENT_PROFILE.historyAttempts),
            bookmarkedQuestions: Array.isArray(parsed?.bookmarkedQuestions) ? parsed.bookmarkedQuestions : INITIAL_STUDENT_PROFILE.bookmarkedQuestions,
            level: typeof parsed?.level === 'number' ? parsed.level : Math.floor((parsed?.xp || INITIAL_STUDENT_PROFILE.xp) / 500) + 1,
          };
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_STUDENT_PROFILE;
  });

  // Initial Database Synchronization
  useEffect(() => {
    let isMounted = true;
    async function syncFromDatabase() {
      try {
        const [teachersFromDb, studentsFromDb] = await Promise.all([
          sqliteService.getTeachers(),
          sqliteService.getStudents(),
        ]);

        if (!isMounted) return;

        if (Array.isArray(teachersFromDb) && teachersFromDb.length > 0) {
          const cleaned = teachersFromDb.filter(t => t.id !== 'guru-demo-1' && !t.name.toLowerCase().includes('hendra kusuma'));
          const seen = new Set<string>();
          const unique = cleaned.filter(t => {
            const key = (t.nip || t.name).toLowerCase().trim();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          if (unique.length > 0) {
            setTeachersList(unique);
            try {
              localStorage.setItem('emodul_teachers_list', JSON.stringify(unique));
            } catch (e) {
              console.error(e);
            }
            setTeacher(prev => (prev && unique.find(t => t.id === prev.id)) || unique[0]);
            try {
              localStorage.setItem('emodul_active_teacher', JSON.stringify((teacher && unique.find(t => t.id === teacher.id)) || unique[0]));
            } catch (e) {
              console.error(e);
            }
          }
        }

        if (Array.isArray(studentsFromDb) && studentsFromDb.length > 0) {
          const seen = new Set<string>();
          const unique = studentsFromDb.filter(s => {
            const key = (s.nisn || s.name).toLowerCase().trim();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          if (unique.length > 0) {
            setStudentsList(unique);
            try {
              localStorage.setItem('emodul_students_list', JSON.stringify(unique));
            } catch (e) {
              console.error(e);
            }
            if (student?.id) {
              const freshStudent = unique.find(s => s.id === student.id);
              if (freshStudent) {
                setStudent(freshStudent);
              }
            }
          }
        }
      } catch (err) {
        console.warn('Initial Database sync note:', err);
      }
    }

    syncFromDatabase();
    return () => {
      isMounted = false;
    };
  }, []);

  // Save changes to localStorage and SQLite Database
  useEffect(() => {
    localStorage.setItem('emodul_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    if (student && student.id && student.name) {
      localStorage.setItem('emodul_student_profile', JSON.stringify(student));
      setStudentsList(prev => {
        const exists = prev.some(s => s.id === student.id);
        if (!exists) return prev;
        return prev.map(s => s.id === student.id ? student : s);
      });
      sqliteService.saveStudent(student);
    }
  }, [student]);

  useEffect(() => {
    if (teacher && teacher.id && teacher.name) {
      localStorage.setItem('emodul_active_teacher', JSON.stringify(teacher));
      setTeachersList(prev => {
        const exists = prev.some(t => t.id === teacher.id);
        if (!exists) return prev;
        return prev.map(t => t.id === teacher.id ? teacher : t);
      });
      sqliteService.saveTeacher(teacher);
    }
  }, [teacher]);

  useEffect(() => {
    localStorage.setItem('emodul_teachers_list', JSON.stringify(teachersList));
  }, [teachersList]);

  useEffect(() => {
    localStorage.setItem('emodul_students_list', JSON.stringify(studentsList));
  }, [studentsList]);

  // Contextual Selection State
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-1');
  const [selectedVideoId, setSelectedVideoId] = useState<string>('vid-1');
  const [activeQuizModuleId, setActiveQuizModuleId] = useState<string | undefined>(undefined);
  const [currentGradingAttempt, setCurrentGradingAttempt] = useState<QuizAttempt | null>(() => {
    const attempts = student?.historyAttempts || student?.quizHistory || [];
    return attempts.length > 0 ? attempts[0] : null;
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<UserRole>('siswa');
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [aiTutorQuestionContext, setAiTutorQuestionContext] = useState<QuestionItem | null>(null);
  const [aiTutorModuleContext, setAiTutorModuleContext] = useState<InteractiveModule | null>(null);
  const [aiTutorLabContext, setAiTutorLabContext] = useState<LabContext | null>(null);
  
  const [isStudentProfileModalOpen, setIsStudentProfileModalOpen] = useState<boolean>(false);
  const [isTeacherProfileModalOpen, setIsTeacherProfileModalOpen] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);

  // Gamification helper: add XP and calculate level
  const handleAddXP = (amount: number) => {
    setStudent(prev => {
      const newXP = (prev.xp || 0) + amount;
      const newLevel = Math.floor(newXP / 500) + 1;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  // Auth Handlers
  const handleOpenAuthModal = (initialRole: UserRole = 'siswa') => {
    setAuthModalInitialRole(initialRole);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (role: UserRole, user: StudentProfile | TeacherProfile) => {
    setIsLoggedIn(true);
    localStorage.setItem('emodul_is_logged_in', 'true');
    if (role === 'guru') {
      setTeacher(user as TeacherProfile);
      setCurrentRole('guru');
      setActiveTab('teacher');
    } else {
      setStudent(user as StudentProfile);
      setCurrentRole('siswa');
      if (activeTab === 'teacher') {
        setActiveTab('modules');
      }
    }
    setIsAuthModalOpen(false);
  };

  const handleRegisterStudent = (newProfile: StudentProfile) => {
    const profileWithMeta: StudentProfile = {
      ...newProfile,
      registeredAt: newProfile.registeredAt || new Date().toISOString(),
      savedLocally: true,
    };
    setStudentsList(prev => {
      const filtered = prev.filter(s => s.id !== profileWithMeta.id && s.name.toLowerCase() !== profileWithMeta.name.toLowerCase() && (s.nisn && profileWithMeta.nisn ? s.nisn !== profileWithMeta.nisn : true));
      const updated = [profileWithMeta, ...filtered];
      try {
        localStorage.setItem('emodul_students_list', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save students to localStorage', e);
      }
      return updated;
    });
    setStudent(profileWithMeta);
    try {
      localStorage.setItem('emodul_student_profile', JSON.stringify(profileWithMeta));
      localStorage.setItem('emodul_is_logged_in', 'true');
    } catch (e) {
      console.error(e);
    }
    sqliteService.saveStudent(profileWithMeta);
    setCurrentRole('siswa');
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleRegisterTeacher = (newProfile: TeacherProfile) => {
    const profileWithMeta: TeacherProfile = {
      ...newProfile,
      registeredAt: newProfile.registeredAt || new Date().toISOString(),
      savedLocally: true,
    };
    setTeachersList(prev => {
      const filtered = prev.filter(t => t.id !== profileWithMeta.id && t.nip !== profileWithMeta.nip);
      const updated = [profileWithMeta, ...filtered];
      try {
        localStorage.setItem('emodul_teachers_list', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save teachers to localStorage', e);
      }
      return updated;
    });
    setTeacher(profileWithMeta);
    try {
      localStorage.setItem('emodul_active_teacher', JSON.stringify(profileWithMeta));
      localStorage.setItem('emodul_is_logged_in', 'true');
    } catch (e) {
      console.error(e);
    }
    sqliteService.saveTeacher(profileWithMeta);
    setCurrentRole('guru');
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    setActiveTab('teacher');
  };

  // Export backup of all registered accounts as JSON
  const handleExportAccounts = () => {
    const backupData = {
      appName: 'E-Modul Informatika SMA',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      totalTeachers: teachersList.length,
      totalStudents: studentsList.length,
      teachers: teachersList,
      students: studentsList,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cadangan_akun_siswa_guru_informatika_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import / restore accounts from backup JSON
  const handleImportAccounts = (importedJson: string): boolean => {
    try {
      const parsed = JSON.parse(importedJson);
      const importedTeachers: TeacherProfile[] = Array.isArray(parsed.teachers) ? parsed.teachers : [];
      const importedStudents: StudentProfile[] = Array.isArray(parsed.students) ? parsed.students : [];

      if (importedTeachers.length === 0 && importedStudents.length === 0) {
        return false;
      }

      if (importedTeachers.length > 0) {
        setTeachersList(prev => {
          const map = new Map(prev.map(t => [t.id, t]));
          importedTeachers.forEach(t => {
            if (t && t.id && t.name) {
              map.set(t.id, { ...t, savedLocally: true });
            }
          });
          const updated = Array.from(map.values());
          try {
            localStorage.setItem('emodul_teachers_list', JSON.stringify(updated));
          } catch (e) {
            console.error(e);
          }
          return updated;
        });
      }

      if (importedStudents.length > 0) {
        setStudentsList(prev => {
          const map = new Map(prev.map(s => [s.id, s]));
          importedStudents.forEach(s => {
            if (s && s.id && s.name) {
              map.set(s.id, { ...s, savedLocally: true });
            }
          });
          const updated = Array.from(map.values());
          try {
            localStorage.setItem('emodul_students_list', JSON.stringify(updated));
          } catch (e) {
            console.error(e);
          }
          return updated;
        });
      }

      return true;
    } catch (err) {
      console.error('Failed to import accounts:', err);
      return false;
    }
  };

  // Reset to verified starter accounts
  const handleResetDemoAccounts = () => {
    setTeachersList(INITIAL_TEACHER_PROFILES);
    setStudentsList(DEMO_STUDENT_PROFILES);
    try {
      localStorage.setItem('emodul_teachers_list', JSON.stringify(INITIAL_TEACHER_PROFILES));
      localStorage.setItem('emodul_students_list', JSON.stringify(DEMO_STUDENT_PROFILES));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await Promise.all([
        sqliteService.deleteStudent(id),
        sqliteService.deleteTeacherStudentSummary(id),
      ]);
    } catch (e) {
      console.error('Error deleting student from DB:', e);
    }

    setStudentsList(prev => {
      const targetStudent = prev.find(s => s.id === id);
      const updated = prev.filter(s => s.id !== id && (!targetStudent?.nisn || s.nisn !== targetStudent.nisn));
      try {
        localStorage.setItem('emodul_students_list', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    // Clean up from teacher summary if stored locally
    try {
      const savedSummary = localStorage.getItem('emodul_teacher_students_summary');
      if (savedSummary) {
        const parsed = JSON.parse(savedSummary);
        if (Array.isArray(parsed)) {
          const updatedSummary = parsed.filter((s: any) => s.id !== id);
          localStorage.setItem('emodul_teacher_students_summary', JSON.stringify(updatedSummary));
        }
      }
    } catch (e) {
      console.error(e);
    }

    // If the active student was deleted, reset active student profile to default
    setStudent(prev => {
      if (prev.id === id) {
        try {
          localStorage.setItem('emodul_student_profile', JSON.stringify(INITIAL_STUDENT_PROFILE));
        } catch (e) {
          console.error(e);
        }
        return INITIAL_STUDENT_PROFILE;
      }
      return prev;
    });
  };

  const handleDeleteTeacher = async (id: string) => {
    try {
      await sqliteService.deleteTeacher(id);
    } catch (e) {
      console.error('Error deleting teacher from DB:', e);
    }

    setTeachersList(prev => {
      const targetTeacher = prev.find(t => t.id === id);
      const updated = prev.filter(t => t.id !== id && (!targetTeacher?.nip || t.nip !== targetTeacher.nip));
      try {
        localStorage.setItem('emodul_teachers_list', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    // If the active teacher was deleted, set to remaining teacher or null
    setTeacher(prev => {
      const targetTeacher = teachersList.find(t => t.id === id);
      if (prev && (prev.id === id || (prev.nip && targetTeacher?.nip === prev.nip))) {
        const remaining = teachersList.filter(t => t.id !== id && (!targetTeacher?.nip || t.nip !== targetTeacher.nip));
        const nextTeacher = remaining.length > 0 ? remaining[0] : null;
        try {
          if (nextTeacher) {
            localStorage.setItem('emodul_active_teacher', JSON.stringify(nextTeacher));
          } else {
            localStorage.removeItem('emodul_active_teacher');
          }
        } catch (e) {
          console.error(e);
        }
        return nextTeacher;
      }
      return prev;
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('emodul_is_logged_in');
    setActiveTab('modules');
  };

  const handleGuestLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('emodul_is_logged_in', 'true');
    setCurrentRole('siswa');
    setActiveTab('modules');
  };

  // Update profile handlers
  const handleUpdateStudentProfile = (updated: Partial<StudentProfile>) => {
    setStudent(prev => ({
      ...prev,
      ...updated,
    }));
  };

  const handleUpdateTeacherProfile = (updated: Partial<TeacherProfile>) => {
    if (teacher) {
      setTeacher(prev => prev ? ({ ...prev, ...updated }) : null);
    }
  };

  // Select module to read
  const handleSelectModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete module action
  const handleCompleteModule = (moduleId: string) => {
    setStudent(prev => {
      const prevMods = prev.completedModules || [];
      if (!prevMods.includes(moduleId)) {
        handleAddXP(100);
        return {
          ...prev,
          completedModules: [...prevMods, moduleId],
        };
      }
      return prev;
    });
  };

  // Start quiz for a specific module
  const handleStartQuizForModule = (moduleId?: string) => {
    setActiveQuizModuleId(moduleId);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Watch video for a specific module
  const handleWatchVideoForModule = (moduleId: string) => {
    const foundModule = MODULES_DATA.find(m => m.id === moduleId);
    let targetVidId = 'vid-1';
    if (foundModule?.videoTutorialId) {
      targetVidId = foundModule.videoTutorialId;
    } else {
      const foundByMod = VIDEO_TUTORIALS_DATA.find(v => v.moduleId === moduleId);
      if (foundByMod) {
        targetVidId = foundByMod.id;
      } else if (foundModule) {
        targetVidId = `vid-${foundModule.number}`;
      }
    }
    setSelectedVideoId(targetVidId);
    setActiveTab('videos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle saving personal note
  const handleSaveNote = (note: { id: string; moduleId: string; title: string; text: string; date: string; timestamp?: number }) => {
    setStudent(prev => ({
      ...prev,
      savedNotes: [note, ...(prev.savedNotes || [])],
    }));
    handleAddXP(30);
    if (student.id) {
      sqliteService.saveNote({ ...note, studentId: student.id });
    }
  };

  // Handle deleting note
  const handleDeleteNote = (noteId: string) => {
    setStudent(prev => ({
      ...prev,
      savedNotes: (prev.savedNotes || []).filter(n => n.id !== noteId),
    }));
    sqliteService.deleteNote(noteId);
  };

  // Finish quiz & generate grading
  const handleFinishQuiz = (attempt: QuizAttempt) => {
    setCurrentGradingAttempt(attempt);
    
    // Add attempt to student history & reward XP
    const updatedHistory = [attempt, ...(student.historyAttempts || [])];
    const newXP = (student.xp || 0) + (attempt.score * 2);
    const newLevel = Math.floor(newXP / 500) + 1;

    const updatedStudent: StudentProfile = {
      ...student,
      xp: newXP,
      level: newLevel,
      historyAttempts: updatedHistory,
      quizHistory: updatedHistory,
    };

    setStudent(updatedStudent);
    sqliteService.saveQuizAttempt(attempt, updatedStudent);

    setActiveTab('grading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open AI Tutor with specific question context
  const handleOpenAITutorWithQuestion = (question: QuestionItem) => {
    setAiTutorQuestionContext(question);
    setAiTutorModuleContext(null);
    setAiTutorLabContext(null);
    setIsAITutorOpen(true);
  };

  // Open AI Tutor with specific module context
  const handleOpenAITutorWithModule = (moduleItem: InteractiveModule) => {
    setAiTutorModuleContext(moduleItem);
    setAiTutorQuestionContext(null);
    setAiTutorLabContext(null);
    setIsAITutorOpen(true);
  };

  // Open AI Tutor with specific lab context
  const handleOpenAITutorWithLab = (labContext: LabContext) => {
    setAiTutorLabContext(labContext);
    setAiTutorQuestionContext(null);
    setAiTutorModuleContext(null);
    setIsAITutorOpen(true);
  };

  // Sync all accounts from cloud database on demand
  const handleSyncCloudAccounts = async () => {
    try {
      const [teachersFromDb, studentsFromDb] = await Promise.all([
        sqliteService.getTeachers(),
        sqliteService.getStudents(),
      ]);

      if (Array.isArray(teachersFromDb) && teachersFromDb.length > 0) {
        const cleaned = teachersFromDb.filter(t => t.id !== 'guru-demo-1' && !t.name.toLowerCase().includes('hendra kusuma'));
        const seen = new Set<string>();
        const unique = cleaned.filter(t => {
          const key = (t.nip || t.name).toLowerCase().trim();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        if (unique.length > 0) {
          setTeachersList(unique);
          localStorage.setItem('emodul_teachers_list', JSON.stringify(unique));
          setTeacher(prev => (prev && unique.find(t => t.id === prev.id)) || unique[0]);
          localStorage.setItem('emodul_active_teacher', JSON.stringify(unique[0]));
        }
      }

      if (Array.isArray(studentsFromDb) && studentsFromDb.length > 0) {
        const seen = new Set<string>();
        const unique = studentsFromDb.filter(s => {
          const key = (s.nisn || s.name).toLowerCase().trim();
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        if (unique.length > 0) {
          setStudentsList(unique);
          localStorage.setItem('emodul_students_list', JSON.stringify(unique));
          if (student?.id) {
            const freshStudent = unique.find(s => s.id === student.id);
            if (freshStudent) {
              setStudent(freshStudent);
            }
          }
        }
      }
    } catch (e) {
      console.warn('Sync cloud accounts error:', e);
    }
  };

  const activeModuleItem = MODULES_DATA.find(m => m.id === selectedModuleId) || MODULES_DATA[0];

  // If user is not yet logged in, show the Login Page as the first screen
  if (!isLoggedIn) {
    return (
    <IconContext.Provider value={{ size: 20, weight: 'duotone' }}>
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onRegisterStudent={handleRegisterStudent}
        onRegisterTeacher={handleRegisterTeacher}
        onGuestLogin={handleGuestLogin}
        teachersList={teachersList}
        studentsList={studentsList}
        onDeleteStudent={handleDeleteStudent}
        onDeleteTeacher={handleDeleteTeacher}
        onExportAccounts={handleExportAccounts}
        onImportAccounts={handleImportAccounts}
        onResetDemoAccounts={handleResetDemoAccounts}
        onSyncCloudAccounts={handleSyncCloudAccounts}
      />
    </IconContext.Provider>
    );
  }

  return (
    <IconContext.Provider value={{ size: 20, weight: 'duotone' }}>
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        student={student}
        teacher={teacher}
        onOpenStudentProfile={() => setIsStudentProfileModalOpen(true)}
        onOpenTeacherProfile={() => setIsTeacherProfileModalOpen(true)}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
        onOpenAITutor={() => {
          setAiTutorQuestionContext(null);
          setAiTutorModuleContext(null);
          setAiTutorLabContext(null);
          setIsAITutorOpen(true);
        }}
        onOpenCertificate={() => setIsCertificateModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: MODULE CATALOG */}
        {activeTab === 'modules' && (
          <ModuleList
            student={student}
            onSelectModule={handleSelectModule}
            onStartQuiz={handleStartQuizForModule}
            onWatchVideo={handleWatchVideoForModule}
            onOpenAITutor={() => {
              setAiTutorQuestionContext(null);
              setAiTutorModuleContext(null);
              setAiTutorLabContext(null);
              setIsAITutorOpen(true);
            }}
            onOpenGuide={() => {
              setActiveTab('guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* TAB 2: INTERACTIVE MODULE READER */}
        {activeTab === 'reader' && (
          <ModuleReader
            moduleItem={activeModuleItem}
            student={student}
            onBackToCatalog={() => setActiveTab('modules')}
            onCompleteModule={handleCompleteModule}
            onStartQuiz={(modId) => handleStartQuizForModule(modId)}
            onWatchVideo={(modId) => handleWatchVideoForModule(modId)}
            onOpenAITutorWithModule={handleOpenAITutorWithModule}
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
            onAddXP={handleAddXP}
          />
        )}

        {/* TAB 3: VIDEO TUTORIAL & CONCEPT LAB */}
        {activeTab === 'videos' && (
          <VideoTutorialPlayer
            initialVideoId={selectedVideoId}
            student={student}
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
            onAddXP={handleAddXP}
            onStartQuizForModule={handleStartQuizForModule}
          />
        )}

        {/* TAB 4: QUIZ & FORMATIVE EVALUATION ARENA */}
        {activeTab === 'quiz' && (
          <QuizArena
            student={student}
            initialModuleId={activeQuizModuleId}
            onFinishQuiz={handleFinishQuiz}
            onOpenAITutorWithQuestion={handleOpenAITutorWithQuestion}
          />
        )}

        {/* TAB 5: AUTOMATIC GRADING REPORT & DIAGNOSTICS */}
        {activeTab === 'grading' && currentGradingAttempt && (
          <GradingReport
            attempt={currentGradingAttempt}
            student={student}
            onRetakeQuiz={() => {
              setActiveTab('quiz');
            }}
            onOpenCertificate={() => setIsCertificateModalOpen(true)}
            onBackToModules={() => setActiveTab('modules')}
            onOpenAITutorWithQuestion={handleOpenAITutorWithQuestion}
          />
        )}

        {/* TAB 6: VIRTUAL CODING & INFORMATICS LAB */}
        {activeTab === 'lab' && (
          <InteractiveLab
            onAddXP={handleAddXP}
            onOpenAITutorWithLab={handleOpenAITutorWithLab}
          />
        )}

        {/* TAB 7: TEACHER PORTAL & DASHBOARD */}
        {activeTab === 'teacher' && (
          <div>
            {currentRole === 'guru' ? (
              <TeacherDashboard
                teacher={teacher}
                onOpenTeacherProfile={() => setIsTeacherProfileModalOpen(true)}
                onOpenAuthModal={() => handleOpenAuthModal('guru')}
                onBackToStudentMode={() => {
                  setCurrentRole('siswa');
                  setActiveTab('modules');
                }}
                onOpenAITutor={() => {
                  setAiTutorQuestionContext(null);
                  setAiTutorModuleContext(null);
                  setAiTutorLabContext(null);
                  setIsAITutorOpen(true);
                }}
                onPreviewModule={handleSelectModule}
                registeredStudents={studentsList}
                onAddRegisteredStudent={handleRegisterStudent}
                onDeleteRegisteredStudent={handleDeleteStudent}
              />
            ) : (
              /* If student accesses Teacher tab, display an informative access gate with instant teacher login */
              <div className="max-w-2xl mx-auto my-8 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6 animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mx-auto flex items-center justify-center shadow-inner">
                  <GraduationCap className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                    Autentikasi Peran Pendidik Diperlukan
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Masuk ke Dashboard Guru Informatika
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Portal ini khusus untuk Guru & Pendidik guna memantau ketercapaian KKTP, rekapitulasi nilai 6 elemen CP Informatika, dan mengelola asesmen sumatif siswa.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-left space-y-2 text-xs">
                  <div className="font-bold text-purple-900 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>Fitur Khusus Pendidik:</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    <li>Rekapitulasi otomatis nilai formatif dan sumatif siswa per kelas.</li>
                    <li>Analisis diagnostik 6 elemen (BK, AP, SK, JKI, AD, DSI).</li>
                    <li>Ekspor buku nilai rapor ke format Excel (.xls) resmi dalam 1-klik.</li>
                    <li>Siaran pengumuman dan instruksi modul langsung ke layar siswa.</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    id="teacher-gate-login-btn"
                    onClick={() => handleOpenAuthModal('guru')}
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Masuk sebagai Guru (NIP / Akun Guru)</span>
                  </button>

                  <button
                    id="teacher-gate-back-btn"
                    onClick={() => setActiveTab('modules')}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Kembali ke Modul Siswa
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: PANDUAN PENGGUNAAN E-MODUL */}
        {activeTab === 'guide' && (
          <GuidePage
            onNavigateTab={(targetTab) => {
              setActiveTab(targetTab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAITutor={() => {
              setAiTutorQuestionContext(null);
              setAiTutorModuleContext(null);
              setAiTutorLabContext(null);
              setIsAITutorOpen(true);
            }}
            onStartQuiz={() => {
              handleStartQuizForModule();
            }}
            currentRole={currentRole}
          />
        )}
      </main>

      {/* Footer info */}
      <footer className="border-t border-slate-200 py-6 bg-white text-center text-xs text-slate-600 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900">InformatikaEdu SMA</span>
            <span>• E-Modul Pembelajaran Interaktif Kurikulum Merdeka</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>6 Elemen CP Informatika</span>
            <span>• Penilaian Otomatis</span>
            <span>• AI Tutor Terintegrasi</span>
            <button
              onClick={() => {
                setActiveTab('guide');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-bold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
            >
              Panduan E-Modul
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Auth Modal (Login / Register Guru & Siswa) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialRole={authModalInitialRole}
        onLoginSuccess={handleLoginSuccess}
        onRegisterStudent={handleRegisterStudent}
        onRegisterTeacher={handleRegisterTeacher}
        teachersList={teachersList}
        studentsList={studentsList}
        onDeleteStudent={handleDeleteStudent}
        onDeleteTeacher={handleDeleteTeacher}
        onExportAccounts={handleExportAccounts}
      />

      {/* 2. AI Tutor Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        contextQuestion={aiTutorQuestionContext}
        contextModule={aiTutorModuleContext}
        contextLab={aiTutorLabContext}
      />

      {/* 3. Student Profile Modal */}
      <StudentProfileModal
        isOpen={isStudentProfileModalOpen}
        onClose={() => setIsStudentProfileModalOpen(false)}
        student={student}
        onUpdateProfile={handleUpdateStudentProfile}
        onViewAttemptReport={(attempt) => {
          setIsStudentProfileModalOpen(false);
          setCurrentGradingAttempt(attempt);
          setActiveTab('grading');
        }}
        onDeleteNote={handleDeleteNote}
      />

      {/* 4. Teacher Profile Modal */}
      {teacher && (
        <TeacherProfileModal
          isOpen={isTeacherProfileModalOpen}
          onClose={() => setIsTeacherProfileModalOpen(false)}
          teacher={teacher}
          onUpdateTeacher={handleUpdateTeacherProfile}
        />
      )}

      {/* 5. Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        student={student}
      />
    </div>
    </IconContext.Provider>
  );
}
