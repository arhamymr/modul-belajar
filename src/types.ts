export type InformaticsElement = 'BK' | 'AP' | 'SK' | 'JKI' | 'AD' | 'DSI';

export type UserRole = 'siswa' | 'guru';

export interface InformaticsElementInfo {
  code: InformaticsElement;
  name: string;
  fullName: string;
  description: string;
  color: string;
  badgeBg: string;
}

export type QuestionType = 'multiple-choice' | 'code-trace' | 'matching' | 'fill-blank';
export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Sulit' | 'HOTS / Sulit';

export interface QuestionItem {
  id: string;
  moduleId: string;
  element: InformaticsElement;
  type: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number | string; // index 0..3 or string value
  matchingPairs?: { left: string; right: string }[];
  hint: string;
  explanation: string;
  learningObjective: string; // Tujuan Pembelajaran (TP)
}

export interface VideoCheckpoint {
  timeInSeconds: number;
  label: string;
  questionPrompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface VideoTutorial {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  durationSeconds: number;
  youtubeId: string;
  thumbnail: string;
  speaker: string;
  description: string;
  chapters: { title: string; timeInSeconds: number }[];
  checkpoints: VideoCheckpoint[];
  transcriptSummary: string[];
  keyTakeaways: string[];
}

export interface ModuleImage {
  id: string;
  url: string;
  caption: string;
  alt: string;
  source?: string;
  tags?: string[];
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'auto';
  diagramTitle?: string;
  diagramDetails?: string[];
}

export interface InteractiveModule {
  id: string;
  number: number;
  title: string;
  element: InformaticsElement;
  classLevel: 'SMA' | string;
  curriculum: 'Kurikulum Merdeka (SMA)' | 'Kurikulum Merdeka' | string;
  estimatedMinutes: number;
  iconName: string;
  coverImage?: string;
  summary: string;
  learningObjectives: string[];
  galleryImages?: ModuleImage[];
  sections: {
    id: string;
    title: string;
    estimatedMinutes?: number;
    content: string;
    images?: ModuleImage[];
    codeExamples?: {
      title: string;
      language: string;
      code: string;
      output: string;
      explanation: string;
    }[];
    interactiveDemo?: 
      | 'logic-gate' 
      | 'python-runner' 
      | 'python-code-runner'
      | 'subnet-calc' 
      | 'network-subnet-calculator'
      | 'cybersecurity-quiz'
      | 'stack-queue-visualizer'
      | 'greedy-coin-visualizer'
      | 'binary-search-visualizer'
      | 'recursion-visualizer'
      | 'logic-gate-simulator'
      | 'cpu-cycle-simulator'
      | 'network-topology-simulator'
      | 'sql-join-visualizer'
      | 'data-chart-visualizer'
      | 'phishing-detector-simulator'
      | 'two-factor-auth-simulator'
      | 'graph-traversal-simulator'
      | 'python-function-debugger-simulator'
      | 'memory-hierarchy-simulator'
      | 'firewall-packet-simulator'
      | 'database-normalization-simulator'
      | 'ai-bias-detector-simulator'
      | (string & {});
    glossaryTerms?: { term: string; definition: string }[];
    keyPoints?: string[];
    realWorldAnalogy?: {
      title: string;
      story: string;
      takeaway: string;
    };
    stepByStepGuide?: {
      step: number;
      title: string;
      detail: string;
    }[];
    commonMistakes?: {
      mistake: string;
      correction: string;
      why: string;
    }[];
    examTips?: string;
  }[];
  videoTutorialId?: string;
  questions: QuestionItem[];
}

export type ModuleItem = InteractiveModule;

export interface QuizAttempt {
  id: string;
  quizTitle: string;
  date: string;
  mode: 'practice' | 'exam';
  score: number; // 0 - 100
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  timeSpentSeconds: number;
  answers: Record<string, any>; // questionId -> answer
  elementScores: Record<InformaticsElement, { correct: number; total: number; percentage: number }>;
  kktpStatus: 'Sangat Mahir' | 'Mahir' | 'Cukup / Berkembang' | 'Perlu Bimbingan';
  gradeLetter: 'A' | 'B' | 'C' | 'D';
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export interface StudentProfile {
  id: string;
  role?: 'siswa';
  name: string;
  nisn: string;
  email?: string;
  password?: string;
  school: string;
  classGrade: string;
  avatar?: string;
  xp: number;
  level: number;
  completedModules: string[];
  badges: BadgeItem[];
  savedNotes: { id: string; moduleId: string; title: string; text: string; date: string; imageUrl?: string; timestamp?: number }[];
  quizHistory: QuizAttempt[];
  historyAttempts: QuizAttempt[];
  bookmarkedQuestions: string[];
  registeredAt?: string;
  savedLocally?: boolean;
}

export interface TeacherProfile {
  id: string;
  role: 'guru';
  name: string;
  nip: string;
  email: string;
  password?: string;
  school: string;
  title: string; // e.g. "Guru Mata Pelajaran Informatika SMA"
  subject: string;
  teachingClasses: string[];
  avatar?: string;
  phone?: string;
  lastLogin?: string;
  registeredAt?: string;
  savedLocally?: boolean;
}

export interface AuthSession {
  role: UserRole;
  userId: string;
  name: string;
  identifier: string; // NISN or NIP
  school: string;
  extraInfo: string; // ClassGrade for student or Subject/NIP for teacher
  avatar?: string;
}

export interface TeacherStudentSummary {
  id: string;
  name: string;
  nisn: string;
  classGrade: string;
  completedModulesCount: number;
  averageScore: number;
  lastActive: string;
  kktpStatus: string;
  attemptsCount: number;
  elementPerformance: Record<InformaticsElement, number>;
}

export interface AIMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  codeSnippet?: string;
}

export interface LabContext {
  code: string;
  error?: string;
  topic?: string;
}

