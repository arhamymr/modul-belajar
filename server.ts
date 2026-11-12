import express from "express";
import path from "path";
import net from "net";
import { spawn } from "child_process";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  initAppDatabase,
  getUnifiedDatabaseStatus,
  migrateSQLiteToNeon,
  getAllStudents,
  getStudentById,
  upsertStudent,
  deleteStudentById,
  getAllTeachers,
  getTeacherById,
  upsertTeacher,
  deleteTeacherById,
  getAllQuizAttempts,
  saveQuizAttempt,
  getNotes,
  saveNote,
  deleteNote,
  getAnnouncements,
  saveAnnouncement,
  deleteAnnouncement,
  getTeacherStudentSummaries,
  upsertTeacherStudentSummary,
  deleteTeacherStudentSummary,
} from "./server/dbManager";
import { testNeonConnection } from "./server/neonDb";
import { resetDatabase } from "./server/sqliteDb";

dotenv.config();

// Initialize database layer on server boot (Neon if DATABASE_URL is set, otherwise SQLite)
initAppDatabase().catch(err => console.error("[DB] Boot error:", err));

const app = express();

app.use(express.json());

// Lazy Gemini AI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==========================================
// UNIFIED DATABASE PERSISTENCE ENDPOINTS (NEON / SQLITE)
// ==========================================

// Database status & metrics (Reports Neon Cloud & SQLite)
app.get("/api/db/status", async (req, res) => {
  try {
    const status = await getUnifiedDatabaseStatus();
    res.json(status);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Test Neon connection string directly
app.post(["/api/neon/test", "/api/db/test-neon"], async (req, res) => {
  try {
    const { connectionString } = req.body;
    const result = await testNeonConnection(connectionString);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// One-click migrate SQLite records to Neon
app.post(["/api/neon/migrate", "/api/db/migrate-to-neon"], async (req, res) => {
  try {
    const { connectionString } = req.body;
    const result = await migrateSQLiteToNeon(connectionString);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset database to initial seed data
app.post("/api/db/reset", (req, res) => {
  try {
    const result = resetDatabase();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Students Endpoints ---
app.get("/api/students", async (req, res) => {
  try {
    const students = await getAllStudents();
    res.json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: "Siswa tidak ditemukan" });
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/students", async (req, res) => {
  try {
    const student = await upsertStudent(req.body);
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await upsertStudent({ ...req.body, id: req.params.id });
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/students/:id", async (req, res) => {
  try {
    const result = await deleteStudentById(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Teachers Endpoints ---
app.get("/api/teachers", async (req, res) => {
  try {
    const teachers = await getAllTeachers();
    res.json(teachers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/teachers/:id", async (req, res) => {
  try {
    const teacher = await getTeacherById(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Guru tidak ditemukan" });
    res.json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/teachers", async (req, res) => {
  try {
    const teacher = await upsertTeacher(req.body);
    res.json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/teachers/:id", async (req, res) => {
  try {
    const teacher = await upsertTeacher({ ...req.body, id: req.params.id });
    res.json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/teachers/:id", async (req, res) => {
  try {
    const result = await deleteTeacherById(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Quiz & Exam Attempts Endpoints ---
app.get("/api/quiz-attempts", async (req, res) => {
  try {
    const { studentId, moduleId } = req.query;
    const attempts = await getAllQuizAttempts(studentId as string, moduleId as string);
    res.json(attempts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/quiz-attempts", async (req, res) => {
  try {
    const { attempt, studentProfile } = req.body;
    const result = await saveQuizAttempt(attempt, studentProfile);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Notes Endpoints ---
app.get("/api/notes", async (req, res) => {
  try {
    const { studentId, moduleId } = req.query;
    const notes = await getNotes(studentId as string, moduleId as string);
    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const result = await saveNote(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const result = await deleteNote(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Announcements Endpoints ---
app.get("/api/announcements", async (req, res) => {
  try {
    const announcements = await getAnnouncements();
    res.json(announcements);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/announcements", async (req, res) => {
  try {
    const result = await saveAnnouncement(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/announcements/:id", async (req, res) => {
  try {
    const result = await deleteAnnouncement(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- Teacher Student Summaries Endpoints ---
app.get("/api/teacher-summary", async (req, res) => {
  try {
    const summaries = await getTeacherStudentSummaries();
    res.json(summaries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/teacher-summary", async (req, res) => {
  try {
    const result = await upsertTeacherStudentSummary(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/teacher-summary/:id", async (req, res) => {
  try {
    const result = await deleteTeacherStudentSummary(req.params.id);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint Eksekusi Kode Real-Time Laboratorium Virtual (Python 3)
app.post(["/api/run-code", "/api/run-python"], (req, res) => {
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

  // Filter keamanan dasar untuk lingkungan sandbox lab edukasi siswa
  const dangerousPatterns = [
    /\bos\.system\b/,
    /\bsubprocess\b/,
    /\bshutil\.rmtree\b/,
    /\bos\.remove\b/,
    /\bos\.unlink\b/,
    /\bos\.rmdir\b/,
    /\bpty\.spawn\b/,
    /\b__import__\s*\(\s*['"]os['"]\s*\)/,
    /\b__import__\s*\(\s*['"]subprocess['"]\s*\)/,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      return res.json({
        success: false,
        stdout: "",
        stderr: "⚠️ Keamanan Lab Virtual: Pemanggilan modul sistem (os.system / subprocess / manipulasi file kritis) dinonaktifkan di lingkungan Laboratorium Siswa demi keamanan dan integritas server.",
        exitCode: 1,
        executionTimeMs: 0
      });
    }
  }

  const startTime = Date.now();
  const maxExecutionTimeMs = 5000; // Batas timeout 5 detik
  const maxOutputBytes = 256 * 1024; // 256 KB batas output teks

  let stdout = "";
  let stderr = "";
  let timedOut = false;
  let finished = false;

  // Jalankan Python 3 dengan opsi unbuffered (-u) dan -c
  const child = spawn("python3", ["-u", "-c", code], {
    timeout: maxExecutionTimeMs,
  });

  const timer = setTimeout(() => {
    if (!finished) {
      timedOut = true;
      try {
        child.kill("SIGKILL");
      } catch (e) {}
    }
  }, maxExecutionTimeMs);

  // Kirim data standard input (stdin) jika siswa mengisi input program
  if (input && typeof input === "string") {
    try {
      child.stdin.write(input);
      if (!input.endsWith("\n")) child.stdin.write("\n");
      child.stdin.end();
    } catch (e) {
      // ignore broken stdin pipe
    }
  } else {
    try {
      child.stdin.end();
    } catch (e) {}
  }

  child.stdout.on("data", (data: Buffer) => {
    if (stdout.length < maxOutputBytes) {
      stdout += data.toString("utf-8");
      if (stdout.length >= maxOutputBytes) {
        stdout += "\n... [Output terpotong: melebihi batas 256KB]";
      }
    }
  });

  child.stderr.on("data", (data: Buffer) => {
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
        stderr: (stderr ? stderr + "\n" : "") + "⏱️ Timeout: Waktu eksekusi melebihi batas maksimal (5 detik).\n💡 Petunjuk: Periksa apakah kode Anda memiliki perulangan tak berujung (infinite loop while True) atau fungsi rekursif tanpa base case.",
        exitCode: 124,
        executionTimeMs
      });
    }

    let finalStderr = stderr;
    if (finalStderr.includes("EOFError")) {
      finalStderr += "\n\n💡 Petunjuk Analisis Siswa:\nProgram Anda menggunakan perintah input(), namun tidak menerima masukan data. Buka panel 'Input Siswa (stdin)' di bawah editor dan ketikkan nilai masukan yang diminta program sebelum menekan tombol 'Jalankan Kode'.";
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

// Helper to generate dynamic pedagogical response if AI model is unreachable
function generateFallbackEducationalAnswer(
  prompt: string,
  context: string,
  userCode?: string,
  codeError?: string
): string {
  const lowerPrompt = (prompt || "").toLowerCase();
  
  if (userCode || codeError) {
    return `Halo! Saya **Guru AI Informatika SMA**. Mari kita telaah kode Python yang kamu buat:

### 🔍 Analisis Kode & Logika
${codeError ? `**Pesan Kesalahan:** \`${codeError.split('\n')[0]}\`\n` : ''}
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

Coba periksa kembali baris instruksimu di editor Lab, lalu jalankan kembali! 🚀`;
  }

  if (lowerPrompt.includes("stack") || lowerPrompt.includes("queue") || lowerPrompt.includes("tumpukan") || lowerPrompt.includes("antrean")) {
    return `Halo sahabat Informatika! Mari kita bahas struktur data **Stack** dan **Queue**:

| Karakteristik | Stack (Tumpukan) | Queue (Antrean) |
|---|---|---|
| **Prinsip Dasar** | **LIFO** (*Last In, First Out*) | **FIFO** (*First In, First Out*) |
| **Analogi Nyata** | Tumpukan piring atau tumpukan buku di meja | Antrean siswa membeli makanan di kantin sekolah |
| **Operasi Utama** | \`push()\` (tambah) & \`pop()\` (ambil dari atas) | \`enqueue()\` (masuk belakang) & \`dequeue()\` (keluar depan) |

💡 **Pertanyaan Refleksi:** Mengapa fitur *Undo* (Ctrl+Z) di komputer paling tepat menggunakan prinsip **Stack**? Coba kamu pikirkan!`;
  }

  if (lowerPrompt.includes("ip") || lowerPrompt.includes("jaringan") || lowerPrompt.includes("subnet") || lowerPrompt.includes("dns")) {
    return `Halo! Mari pelajari konsep **Jaringan Komputer & Internet (JKI)**:

1. **Alamat IP (Internet Protocol):** Merupakan identitas numerik unik setiap perangkat di jaringan, misalnya \`192.168.1.10\`.
2. **Subnet Mask & CIDR (/24):** Menentukan pembagian antara porsi *Network ID* (jaringan) dan *Host ID* (perangkat individu). Prefix \`/24\` berarti terdapat 254 alamat perangkat yang dapat digunakan.
3. **DNS (Domain Name System):** Buku telepon internet yang menerjemahkan nama website yang mudah diingat manusia (seperti \`kemdikbud.go.id\`) menjadi alamat IP server tujuan.

Kamu juga bisa mencoba langsung **Kalkulator Subnetting** di tab *Laboratorium Virtual* untuk melihat perhitungan IP secara real-time!`;
  }

  return `Halo! Senang sekali kamu bersemangat belajar Informatika. 👋

Terkait pertanyaanmu mengenai **${context}**:
*"${prompt}"*

Berikut adalah poin-poin kunci yang perlu kamu pahami:
1. **Berpikir Komputasional:** Gunakan pendekatan dekomposisi (memecah masalah rumit menjadi bagian kecil) dan pengenalan pola untuk mempermudah pemahaman.
2. **Implementasi Konseptual:** Dalam dunia nyata, logika komputasi selalu diterapkan untuk mengotomatisasi pekerjaan manusia dan memecahkan masalah efisiensi.
3. **Uji Coba Mandiri:** Kamu bisa mencoba materi ini secara interaktif melalui E-Modul dan mencoba kode atau simulasinya di Laboratorium Virtual.

Ada bagian spesifik yang ingin kamu tanyakan lebih mendalam? Saya siap mendampingi belajarmu! 💻`;
}

function getSuggestedFollowUps(prompt: string, context: string, hasCode: boolean): string[] {
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

// Gemini AI Tutor Endpoint for Informatics (SMA)
app.post(["/api/ai-tutor", "/api/ai/ask"], async (req, res) => {
  const { prompt, context, message, contextTopic, userCode, codeError, history } = req.body;
  const userPrompt = prompt || message || "Jelaskan konsep dasar materi Informatika ini.";
  const userContext = context || contextTopic || "Mata Pelajaran Informatika SMA (Kurikulum Merdeka)";

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: generateFallbackEducationalAnswer(userPrompt, userContext, userCode, codeError),
        suggestedFollowUps: getSuggestedFollowUps(userPrompt, userContext, !!userCode),
      });
    }

    const systemPrompt = `Anda adalah "Guru AI Informatika SMA", tutor cerdas, komunikatif, solutif, dan membimbing untuk siswa SMA (Kurikulum Merdeka) di Indonesia.
Topik Pembelajaran Saat Ini: ${userContext}.
${userCode ? `Kode Siswa di Laboratorium:\n\`\`\`python\n${userCode}\n\`\`\`` : ''}
${codeError ? `Pesan Error Kompilasi/Eksekusi Siswa:\n\`\`\`\n${codeError}\n\`\`\`` : ''}

Panduan Memberikan Respon untuk Siswa SMA:
1. Bersikaplah seperti guru yang suportif, ramah, dan mendidik ("Halo sahabat informatika!", "Bagus sekali pertanyaanmu!").
2. Jelaskan materi dengan bahasa Indonesia yang jelas, kontekstual, dan mudah dipahami siswa SMA.
3. Hubungkan materi dengan 4 Pilar Berpikir Komputasional (Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma) dan analogi dunia nyata.
4. Jika ada kode/error siswa:
   - Tunjukkan letak kesalahan dan jelaskan alasannya secara ramah.
   - Tunjukkan potongan kode yang benar dan beri komentar penjelas.
5. Format jawaban secara rapi dan estetis dengan Markdown (judul tebal, bullet points, blok kode \`\`\`python, atau tabel ringkas).
6. Akhiri jawaban dengan kalimat motivasi atau pertanyaan reflektif pendek.`;

    // Build chat contents with history for multi-turn conversational memory
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-6)) {
        if (item.sender === 'user' || item.role === 'user') {
          contents.push({ role: 'user', parts: [{ text: item.text || item.content || '' }] });
        } else if (item.sender === 'ai' || item.role === 'model') {
          contents.push({ role: 'model', parts: [{ text: item.text || item.content || '' }] });
        }
      }
    }
    contents.push({ role: 'user', parts: [{ text: userPrompt }] });

    // Try candidate models with fallback
    const candidateModels = ["gemini-3.1-flash-lite", "gemini-3.8-flash"];
    let aiResponseText = "";
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: systemPrompt,
          },
        });
        if (response.text) {
          aiResponseText = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} warning:`, err.status || err.message);
        lastError = err;
      }
    }

    if (!aiResponseText) {
      aiResponseText = generateFallbackEducationalAnswer(userPrompt, userContext, userCode, codeError);
    }

    const suggestedFollowUps = getSuggestedFollowUps(userPrompt, userContext, !!userCode);

    return res.json({
      reply: aiResponseText,
      suggestedFollowUps,
    });
  } catch (error: any) {
    console.error("Error in /api/ai-tutor:", error);
    return res.json({
      reply: generateFallbackEducationalAnswer(userPrompt, userContext, userCode, codeError),
      suggestedFollowUps: getSuggestedFollowUps(userPrompt, userContext, !!userCode),
    });
  }
});

// AI Generate Dynamic Quiz Question for SMA
app.post("/api/ai/generate-question", async (req, res) => {
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

    const prompt = `Buatkan 1 butir soal latihan Informatika tingkat SMA tingkat kesulitan ${difficulty || 'Sedang'} mengenai topik "${topic || 'Berpikir Komputasional'}". Format wajib JSON dengan struktur:
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
            responseMimeType: "application/json",
          }
        });
        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
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
  } catch (error: any) {
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

function getRequestedPort(): number {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-p" || arg === "--port") {
      const val = parseInt(args[i + 1], 10);
      if (!isNaN(val) && val > 0 && val < 65536) return val;
    } else if (arg.startsWith("-p=")) {
      const val = parseInt(arg.slice(3), 10);
      if (!isNaN(val) && val > 0 && val < 65536) return val;
    } else if (arg.startsWith("--port=")) {
      const val = parseInt(arg.slice(7), 10);
      if (!isNaN(val) && val > 0 && val < 65536) return val;
    }
  }
  if (process.env.PORT) {
    const envPort = parseInt(process.env.PORT, 10);
    if (!isNaN(envPort) && envPort > 0 && envPort < 65536) return envPort;
  }
  return 3000;
}

function checkPortAvailable(port: number, host = "0.0.0.0"): Promise<boolean> {
  return new Promise((resolve) => {
    const tester = net.createServer()
      .once("error", () => resolve(false))
      .once("listening", () => {
        tester.once("close", () => resolve(true)).close();
      })
      .listen(port, host);
  });
}

async function resolveAvailablePort(preferredPort: number, maxAttempts = 30): Promise<number> {
  let port = preferredPort;
  for (let i = 0; i < maxAttempts; i++) {
    const available = await checkPortAvailable(port);
    if (available) {
      if (port !== preferredPort) {
        console.warn(`[Server] Port ${preferredPort} is in use. Automatically switched to port ${port}.`);
      }
      return port;
    }
    port++;
  }
  return preferredPort;
}

// Vite middleware & start server
async function start() {
  const requestedPort = getRequestedPort();
  const PORT = await resolveAvailablePort(requestedPort);

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`E-Modul Informatika Server running on http://localhost:${PORT}`);
  });

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(`[Server] Port ${PORT} is already in use.`);
    } else {
      console.error("[Server] Error:", err);
    }
  });
}

start();
