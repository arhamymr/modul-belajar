import { VideoTutorial } from '../types';

export const VIDEO_TUTORIALS_DATA: VideoTutorial[] = [
  // ==========================================
  // MODUL 1: BERPIKIR KOMPUTASIONAL (BK)
  // ==========================================
  {
    id: 'vid-1',
    moduleId: 'mod-1',
    title: 'Berpikir Komputasional: 4 Fondasi Pemecahan Masalah Informatika',
    duration: '10:15',
    durationSeconds: 615,
    youtubeId: '6UFH9roXFGQ',
    thumbnail: 'https://i.ytimg.com/vi/6UFH9roXFGQ/hqdefault.jpg',
    speaker: 'Adfan ID (Pendidik Informatika SMA)',
    description: 'Panduan video pembelajaran Bahasa Indonesia mengenai konsep Berpikir Komputasional (Computational Thinking), mengupas 4 pilar utama: Dekomposisi, Pengenalan Pola, Abstraksi, dan Perancangan Algoritma untuk menyelesaikan masalah nyata.',
    chapters: [
      { title: '00:00 - Pengantar Berpikir Komputasional SMA', timeInSeconds: 0 },
      { title: '02:40 - Memahami Dekomposisi & Pengenalan Pola', timeInSeconds: 160 },
      { title: '05:15 - Pilar Abstraksi dalam Menyederhanakan Masalah', timeInSeconds: 315 },
      { title: '07:30 - Perancangan Algoritma Terstruktur & Evaluasi', timeInSeconds: 450 },
    ],
    checkpoints: [
      {
        timeInSeconds: 160,
        label: 'Checkpoint 1: Pilar Computational Thinking',
        questionPrompt: 'Ketika Anda menyederhanakan peta jalan dengan hanya menampilkan rute utama dan mengabaikan pepohonan, pilar apakah yang sedang diterapkan?',
        options: ['Dekomposisi', 'Abstraksi', 'Pengenalan Pola', 'Desain Algoritma'],
        correctIndex: 1,
        explanation: 'Abstraksi adalah proses menyaring detail yang tidak esensial untuk memfokuskan perhatian pada inti persoalan.'
      },
      {
        timeInSeconds: 315,
        label: 'Checkpoint 2: Karakteristik Dekomposisi',
        questionPrompt: 'Apakah langkah pertama dalam menyelesaikan proyek besar dengan metode Berpikir Komputasional?',
        options: ['Langsung menulis kode', 'Memecah masalah besar menjadi sub-masalah kecil (Dekomposisi)', 'Menghapus data yang tidak penting', 'Membuat flowchart acak'],
        correctIndex: 1,
        explanation: 'Dekomposisi memecah masalah kompleks menjadi beberapa bagian kecil yang mandiri dan lebih mudah dipecahkan.'
      }
    ],
    transcriptSummary: [
      'Berpikir Komputasional adalah metode penyelesaian masalah sistematis menggunakan kaidah ilmu komputer.',
      'Dekomposisi membagi masalah besar menjadi bagian-bagian lebih kecil yang mudah diselesaikan.',
      'Pengenalan pola mencari keteraturan atau kesamaan dari data masa lalu.',
      'Abstraksi menyaring elemen detail yang tidak relevan agar fokus pada esensi inti masalah.',
      'Algoritma menyusun urutan langkah logis demi mendapatkan solusi yang dapat diulang dan diotomatisasi.'
    ],
    keyTakeaways: [
      'Computational thinking adalah kerangka berpikir problem-solving lintas bidang dalam kehidupan sehari-hari.',
      'Empat pilar saling melengkapi untuk menghasilkan algoritma yang optimal dan efisien.'
    ]
  },
  {
    id: 'vid-1b',
    moduleId: 'mod-1',
    title: 'Struktur Data Fundamental: Stack, Queue, Tree & Graph dalam Informatika',
    duration: '11:45',
    durationSeconds: 705,
    youtubeId: 'RR8E7MWdy-Y',
    thumbnail: 'https://i.ytimg.com/vi/RR8E7MWdy-Y/hqdefault.jpg',
    speaker: 'Om Belajar (Informatika SMA)',
    description: 'Membahas tuntas organisasi data dalam memori komputer. Pelajari prinsip LIFO pada Tumpukan (Stack), FIFO pada Antrean (Queue), struktur hierarkis Pohon (Tree), serta keterhubungan jaringan Graf (Graph) beserta contoh kasus sehari-hari.',
    chapters: [
      { title: '00:00 - Mengapa Membutuhkan Struktur Data Terorganisir', timeInSeconds: 0 },
      { title: '02:30 - Tumpukan (Stack) dengan Prinsip LIFO', timeInSeconds: 150 },
      { title: '05:20 - Antrean (Queue) dengan Prinsip FIFO', timeInSeconds: 320 },
      { title: '08:10 - Struktur Hierarki Pohon (Tree) & Hubungan Graf (Graph)', timeInSeconds: 490 },
    ],
    checkpoints: [
      {
        timeInSeconds: 150,
        label: 'Checkpoint 1: Mekanisme Stack',
        questionPrompt: 'Fitur "Undo" (Batal Ketik) pada program pengolah kata mengimplementasikan struktur data apa?',
        options: ['Queue (FIFO)', 'Stack (LIFO)', 'Binary Tree', 'Adjacency Matrix'],
        correctIndex: 1,
        explanation: 'Operasi Undo membatalkan aksi paling terakhir dilakukan, sehingga menerapkan prinsip Last-In First-Out (LIFO) pada struktur data Stack.'
      },
      {
        timeInSeconds: 490,
        label: 'Checkpoint 2: Perbedaan Tree dan Graph',
        questionPrompt: 'Apakah perbedaan mendasar antara struktur Tree dan Graph umum?',
        options: ['Tree memiliki satu simpul akar (root) dan tidak memuat siklus (acyclic)', 'Graph tidak boleh memiliki simpul', 'Tree hanya bisa menampung 2 data', 'Graph tidak memiliki garis penghubung'],
        correctIndex: 0,
        explanation: 'Tree adalah bentuk khusus dari graf yang berakar dan tidak memiliki siklus (siklus tertutup), sedangkan Graph bebas memiliki simpul dan siklus.'
      }
    ],
    transcriptSummary: [
      'Struktur data menentukan cara komputer menyimpan, mengelola, dan mengakses data secara mangkus (efisien).',
      'Stack memakai kaidah LIFO (Last In First Out), contoh: tumpukan piring atau tombol Back pada web browser.',
      'Queue memakai kaidah FIFO (First In First Out), contoh: antrean loket kasir atau antrean cetak printer (print spooler).',
      'Tree mengorganisasikan data secara berjenjang hirarkis (seperti direktori folder komputer), sedangkan Graph memodelkan jaringan koneksi (seperti pertemanan media sosial atau peta rute navigasi).'
    ],
    keyTakeaways: [
      'Memilih struktur data yang tepat adalah kunci kecepatan dan efisiensi algoritma komputasi.',
      'Kenali karakteristik LIFO (Stack) vs FIFO (Queue) saat menyelesaikan persoalan antrean dan riwayat.'
    ]
  },
  {
    id: 'vid-1c',
    moduleId: 'mod-1',
    title: 'Algoritma Pencarian (Searching): Linear Search vs Binary Search | Informatika SMA',
    duration: '12:20',
    durationSeconds: 740,
    youtubeId: 'EFHPW1IuhZ8',
    thumbnail: 'https://i.ytimg.com/vi/EFHPW1IuhZ8/hqdefault.jpg',
    speaker: 'Ruang Belajar Gratis (Informatika SMA)',
    description: 'Visualisasi interaktif cara kerja algoritma pencarian (Linear vs Binary Search) dan algoritma pengurutan data (Bubble Sort & Insertion Sort). Pahami syarat mutlak data terurut pada Binary Search dan analisis efisiensi langkah eksekusi.',
    chapters: [
      { title: '00:00 - Pengantar Masalah Pencarian & Pengurutan Data', timeInSeconds: 0 },
      { title: '02:45 - Linear Search: Pencarian Berurutan dari Awal', timeInSeconds: 165 },
      { title: '06:10 - Binary Search: Teknik Bagi Dua yang Sangat Cepat', timeInSeconds: 370 },
      { title: '09:30 - Konsep Pengurutan Bubble Sort & Insertion Sort', timeInSeconds: 570 },
    ],
    checkpoints: [
      {
        timeInSeconds: 370,
        label: 'Checkpoint 1: Prasyarat Binary Search',
        questionPrompt: 'Syarat apakah yang WAJIB dipenuhi sebelum menjalankan algoritma Binary Search pada kumpulan data?',
        options: ['Data harus sudah diurutkan terlebih dahulu (sorted)', 'Data harus bertipe teks', 'Jumlah data harus genap', 'Data tidak boleh ada angka nol'],
        correctIndex: 0,
        explanation: 'Binary Search membandingkan nilai target dengan nilai tengah dan membuang separuh data, sehingga data WAJIB terurut naik atau turun terlebih dahulu.'
      },
      {
        timeInSeconds: 570,
        label: 'Checkpoint 2: Efisiensi Pencarian',
        questionPrompt: 'Jika terdapat 1.000 data terurut, berapa perkiraan perbandingan maksimal pada Binary Search?',
        options: ['Sekitar 10 kali perbandingan (log2 1000 ≈ 10)', '1.000 kali perbandingan', '500 kali perbandingan', '1 kali perbandingan'],
        correctIndex: 0,
        explanation: 'Dengan Binary Search berkisar log2(1000) ≈ 10 langkah, jauh lebih efisien dibanding Linear Search yang bisa memerlukan hingga 1.000 langkah.'
      }
    ],
    transcriptSummary: [
      'Linear search memeriksa elemen satu per satu dari indeks 0 hingga akhir; mudah dibuat namun lambat untuk data masif.',
      'Binary search membagi rentang pencarian menjadi dua di setiap langkah dengan kompleksitas O(log n).',
      'Bubble sort menukarkan pasangan elemen bertetangga yang posisinya salah secara berulang-ulang sampai semua terurut rapi.'
    ],
    keyTakeaways: [
      'Gunakan Linear Search untuk data sedikit atau acak, gunakan Binary Search jika data sudah terurut.',
      'Pengurutan data (sorting) sering menjadi langkah awal krusial sebelum data dianalisis atau dicari.'
    ]
  },

  // ==========================================
  // MODUL 2: ALGORITMA DAN PEMROGRAMAN (AP)
  // ==========================================
  {
    id: 'vid-2',
    moduleId: 'mod-2',
    title: 'Belajar Python Dasar: Pengenalan Sintaks & Eksekusi Program',
    duration: '11:40',
    durationSeconds: 700,
    youtubeId: 'iA8lLwmtKQM',
    thumbnail: 'https://i.ytimg.com/vi/iA8lLwmtKQM/hqdefault.jpg',
    speaker: 'Kelas Terbuka (Faqihza Mukhlish)',
    description: 'Tutorial fundamental bahasa pemrograman Python berbahasa Indonesia untuk pemula. Membahas arsitektur Python, peran interpreter, cara kerja baris instruksi, dan fondasi logika algoritma pemrograman.',
    chapters: [
      { title: '00:00 - Pengenalan Bahasa Pemrograman Python', timeInSeconds: 0 },
      { title: '02:30 - Mengapa Belajar Python untuk Pemula & Pelajar', timeInSeconds: 150 },
      { title: '05:10 - Cara Komputer Mengeksekusi Python (Interpreter)', timeInSeconds: 310 },
      { title: '08:20 - Menjalankan Perintah Pertama & Struktur Logika', timeInSeconds: 500 },
    ],
    checkpoints: [
      {
        timeInSeconds: 150,
        label: 'Checkpoint 1: Karakteristik Python',
        questionPrompt: 'Mengapa Python sangat disukai dan cocok dipelajari oleh pemula di sekolah?',
        options: ['Sintaksnya mirip bahasa Inggris alami dan sangat mudah dibaca', 'Hanya bisa berjalan di satu sistem operasi', 'Tidak memiliki tipe data', 'Memerlukan kartu grafis khusus'],
        correctIndex: 0,
        explanation: 'Python dirancang dengan filosofi readability (keterbacaan kode), sehingga sintaksnya ringkas, ekspresif, dan mudah dipahami oleh pemula.'
      },
      {
        timeInSeconds: 310,
        label: 'Checkpoint 2: Cara Kerja Interpreter',
        questionPrompt: 'Bagaimanakah cara Python mengeksekusi instruksi program?',
        options: ['Diterjemahkan baris demi baris oleh interpreter saat program berjalan', 'Mengubah seluruh file menjadi mesin biner tanpa tes', 'Hanya dapat dijalankan secara manual', 'Memerlukan compiler C++ eksternal'],
        correctIndex: 0,
        explanation: 'Python adalah bahasa interpretatif, di mana program interpreter membaca dan mengeksekusi baris kode secara sekuensial (baris per baris).'
      }
    ],
    transcriptSummary: [
      'Python adalah bahasa pemrograman tingkat tinggi yang serbaguna (multipurpose) dan open-source.',
      'Interpreter membaca kode baris per baris dari atas ke bawah, memudahkan proses debugging bagi siswa.',
      'Indentasi (spasi/tab) pada Python bukan sekadar estetika, melainkan penentu blok kode (scope) logika program.'
    ],
    keyTakeaways: [
      'Kuasai dasar sintaksis dan alur eksekusi logika sebelum masuk ke struktur data kompleks.',
      'Konsistensi indentasi sangat penting untuk menghindari IndentationError.'
    ]
  },
  {
    id: 'vid-2b',
    moduleId: 'mod-2',
    title: 'Belajar Python Dasar: Percabangan Logika IF dan ELSE Statement',
    duration: '10:45',
    durationSeconds: 645,
    youtubeId: 'rF8rh40z_X0',
    thumbnail: 'https://i.ytimg.com/vi/rF8rh40z_X0/hqdefault.jpg',
    speaker: 'Kelas Terbuka (Faqihza Mukhlish)',
    description: 'Kupas tuntas logika pengambilan keputusan dalam pemrograman Python. Pelajari operator relasional (==, !=, >, <), operator logika (and, or, not), serta struktur percabangan bertingkat if-elif-else dengan studi kasus kelulusan nilai siswa.',
    chapters: [
      { title: '00:00 - Pengantar Pengambilan Keputusan Program', timeInSeconds: 0 },
      { title: '02:50 - Sintaks Dasar if dan else di Python', timeInSeconds: 170 },
      { title: '06:15 - Percabangan Majemuk dengan elif', timeInSeconds: 375 },
      { title: '09:40 - Operator Logika: and, or, not & Kondisi Bersarang', timeInSeconds: 580 },
    ],
    checkpoints: [
      {
        timeInSeconds: 170,
        label: 'Checkpoint 1: Tanda Baca Percabangan',
        questionPrompt: 'Tanda baca apakah yang wajib ditulis di ujung akhir baris pernyataan "if kondisi" pada Python?',
        options: ['Titik dua (:)', 'Titik koma (;)', 'Tanda kurung kurawal ({})', 'Tanda panah (->)'],
        correctIndex: 0,
        explanation: 'Di Python, setiap header blok seperti if, elif, else, for, while, dan def WAJIB diakhiri dengan tanda titik dua (:).'
      },
      {
        timeInSeconds: 580,
        label: 'Checkpoint 2: Operator Logika and',
        questionPrompt: 'Jika nilai nilai_ujian = 85 dan kehadiran = 60, berapakah hasil dari (nilai_ujian >= 75 and kehadiran >= 75)?',
        options: ['False', 'True', 'Error', 'None'],
        correctIndex: 0,
        explanation: 'Operator "and" mewajibkan kedua kondisi bernilai True. Karena kehadiran = 60 (< 75 bernilai False), maka hasil akhirnya adalah False.'
      }
    ],
    transcriptSummary: [
      'Percabangan memungkinkan komputer memilih jalur instruksi yang berbeda berdasarkan terpenuhinya suatu kondisi.',
      'Sintaks if-elif-else dievaluasi dari atas ke bawah; begitu satu kondisi bernilai True, blok kode tersebut dieksekusi dan blok lain dilewati.',
      'Indentasi konsisten 4 spasi menandai isi blok yang dieksekusi saat kondisi terpenuhi.'
    ],
    keyTakeaways: [
      'Gunakan tanda titik dua (:) dan indentasi rapi pada setiap cabang kondisi.',
      'Uji logika dengan tabel kebenaran untuk kondisi majemuk yang memakai and/or.'
    ]
  },
  {
    id: 'vid-2c',
    moduleId: 'mod-2',
    title: 'Perulangan Python (Loops): For Loop, While Loop & Fungsi Range()',
    duration: '14:00',
    durationSeconds: 840,
    youtubeId: 'zykhQQIHYV0',
    thumbnail: 'https://i.ytimg.com/vi/zykhQQIHYV0/hqdefault.jpg',
    speaker: 'Fahruul C & Kelas Terbuka',
    description: 'Mengotomatisasi tugas berulang dengan perulangan For dan While di Python. Pelajari cara menggunakan fungsi range(start, stop, step), perulangan berbasis kondisi, pencegahan infinite loop, serta perintah kontrol break dan continue.',
    chapters: [
      { title: '00:00 - Mengapa Butuh Perulangan (Looping) di Komputer', timeInSeconds: 0 },
      { title: '03:10 - For Loop dan Cara Kerja Fungsi range()', timeInSeconds: 190 },
      { title: '07:20 - While Loop Berbasis Kondisi Terminasi', timeInSeconds: 440 },
      { title: '10:50 - Perintah break, continue, dan Menghindari Infinite Loop', timeInSeconds: 650 },
    ],
    checkpoints: [
      {
        timeInSeconds: 190,
        label: 'Checkpoint 1: Output Fungsi range()',
        questionPrompt: 'Berapakah angka yang dihasilkan oleh perintah list(range(2, 6)) di Python?',
        options: ['[2, 3, 4, 5]', '[2, 3, 4, 5, 6]', '[1, 2, 3, 4, 5]', '[2, 4, 6]'],
        correctIndex: 0,
        explanation: 'Fungsi range(start, stop) berhenti sebelum mencapai nilai stop (eksklusif), sehingga range(2, 6) menghasilkan 2, 3, 4, 5.'
      },
      {
        timeInSeconds: 440,
        label: 'Checkpoint 2: Bahaya Infinite Loop',
        questionPrompt: 'Kapan perulangan while akan terus berputar tanpa henti (infinite loop)?',
        options: ['Jika kondisi while selalu bernilai True dan tidak pernah berubah menjadi False', 'Jika program memiliki banyak variabel', 'Jika menggunakan tipe data string', 'Jika komputer kehabisan baterai'],
        correctIndex: 0,
        explanation: 'While loop membutuhkan variabel pengubah (seperti i += 1) agar pada titik tertentu kondisinya menjadi False dan perulangan dapat berhenti.'
      }
    ],
    transcriptSummary: [
      'For loop ideal digunakan ketika jumlah perulangan sudah diketahui pasti (definite loop).',
      'While loop digunakan ketika jumlah perulangan bergantung pada kondisi dinamis saat program berjalan (indefinite loop).',
      'Keyword break menghentikan paksa putaran loop, sedangkan continue melompati sisa instruksi di putaran saat ini dan lanjut ke putaran berikutnya.'
    ],
    keyTakeaways: [
      'Selalu pastikan ada kondisi keluar pada while loop untuk menghindari program macet.',
      'Gunakan for loop bersama range() untuk iterasi urutan angka secara efisien.'
    ]
  },
  {
    id: 'vid-2d',
    moduleId: 'mod-2',
    title: 'Belajar Python Dasar: Pengenalan Fungsi & Pemrograman Modular (def)',
    duration: '12:35',
    durationSeconds: 755,
    youtubeId: 'ywE2eqG3-kc',
    thumbnail: 'https://i.ytimg.com/vi/ywE2eqG3-kc/hqdefault.jpg',
    speaker: 'Kelas Terbuka (Faqihza Mukhlish)',
    description: 'Tingkatkan kualitas kode program dengan membagi kode ke dalam fungsi modular (def) serta menyimpan kumpulan nilai terstruktur dalam List. Pelajari parameter, argumen, nilai kembalian (return), metode append, pop, dan slicing list.',
    chapters: [
      { title: '00:00 - Pengenalan Tipe Data Terstruktur List []', timeInSeconds: 0 },
      { title: '04:10 - Operasi List: Indexing, Slicing, append() & len()', timeInSeconds: 250 },
      { title: '08:30 - Konsep Pemrograman Modular: Mendefinisikan Fungsi (def)', timeInSeconds: 510 },
      { title: '12:00 - Parameter, Return Value & Scope Variabel', timeInSeconds: 720 },
    ],
    checkpoints: [
      {
        timeInSeconds: 250,
        label: 'Checkpoint 1: Indeks Awal List',
        questionPrompt: 'Diberikan buah = ["apel", "jeruk", "mangga"]. Berapakah nilai dari buah[0]?',
        options: ['"apel"', '"jeruk"', '"mangga"', 'Error out of range'],
        correctIndex: 0,
        explanation: 'Indeks elemen dalam list Python berbasis nol (zero-indexed), sehingga buah[0] adalah elemen pertama yaitu "apel".'
      },
      {
        timeInSeconds: 720,
        label: 'Checkpoint 2: Kata Kunci Nilai Kembalian',
        questionPrompt: 'Kata kunci apakah yang digunakan di dalam fungsi untuk mengirimkan kembali hasil perhitungan ke pemanggilnya?',
        options: ['return', 'send', 'output', 'print'],
        correctIndex: 0,
        explanation: 'Pernyataan return mengakhiri eksekusi fungsi dan mengembalikan nilai hasil kepada bagian kode yang memanggil fungsi tersebut.'
      }
    ],
    transcriptSummary: [
      'List adalah koleksi data terurut yang bersifat mutable (elemennya dapat diubah, ditambah, atau dihapus).',
      'Fungsi modular didefinisikan dengan kata kunci def nama_fungsi(parameter):.',
      'Modularitas kode membuat program lebih bersih, mudah dibaca, serta menghindari pengulangan kode yang sama (prinsip DRY - Don\'t Repeat Yourself).'
    ],
    keyTakeaways: [
      'Pecah kode kompleks menjadi fungsi-fungsi kecil dengan tanggung jawab spesifik.',
      'Gunakan return value agar output fungsi dapat disimpan ke variabel dan diproses lebih lanjut.'
    ]
  },

  // ==========================================
  // MODUL 3: SISTEM KOMPUTER (SK)
  // ==========================================
  {
    id: 'vid-3',
    moduleId: 'mod-3',
    title: 'Sistem Komputer: Perangkat Keras, Alur Pemrosesan & Interaksi Komponen',
    duration: '12:30',
    durationSeconds: 750,
    youtubeId: 'jZGZJeWWGo8',
    thumbnail: 'https://i.ytimg.com/vi/jZGZJeWWGo8/hqdefault.jpg',
    speaker: 'PakRT Kece Berbagi (Pendidik Informatika SMA)',
    description: 'Membahas tuntas elemen sistem komputer untuk SMA: klasifikasi perangkat keras (Input, Processing CPU, Output, Storage), mekanisme siklus pemrosesan data, serta interaksi harmonis antara hardware, software, dan brainware.',
    chapters: [
      { title: '00:00 - Pengantar Bab Sistem Komputer', timeInSeconds: 0 },
      { title: '03:10 - Komponen Perangkat Keras Input & Output', timeInSeconds: 190 },
      { title: '06:40 - Unit Pemrosesan Pusat (CPU ALU & CU) & RAM', timeInSeconds: 400 },
      { title: '09:30 - Media Penyimpanan & Interaksi Hardware-Software', timeInSeconds: 570 },
    ],
    checkpoints: [
      {
        timeInSeconds: 190,
        label: 'Checkpoint 1: Klasifikasi Hardware',
        questionPrompt: 'Manakah dari komponen berikut yang tergolong sebagai perangkat masukan (Input Device)?',
        options: ['Keyboard dan Mouse', 'Monitor dan Proyektor', 'Harddisk dan Flashdisk', 'Processor dan RAM'],
        correctIndex: 0,
        explanation: 'Keyboard dan Mouse berfungsi mengirimkan sinyal data atau perintah dari pengguna ke dalam sistem komputer.'
      },
      {
        timeInSeconds: 400,
        label: 'Checkpoint 2: Karakteristik RAM',
        questionPrompt: 'Mengapa memori utama (RAM) disebut bersifat volatile?',
        options: ['Karena data di dalamnya akan hilang ketika aliran listrik terputus', 'Karena ukurannya sangat besar', 'Karena terbuat dari piringan magnetik', 'Karena tidak dapat diisi data baru'],
        correctIndex: 0,
        explanation: 'Memori volatile (seperti RAM) memerlukan daya listrik untuk mempertahankan data; jika komputer mati, data di dalamnya terhapus.'
      }
    ],
    transcriptSummary: [
      'Sistem komputer terdiri dari tiga pilar utama: Hardware (fisik), Software (program), dan Brainware (pengguna).',
      'CPU (Central Processing Unit) berperan sebagai otak komputasi dengan sub-unit ALU (aritmatika/logika) dan CU (kontrol aliran instruksi).',
      'RAM bertindak sebagai area kerja cepat bagi CPU saat menjalankan aplikasi aktif.'
    ],
    keyTakeaways: [
      'Hardware tanpa software adalah benda mati; kolaborasi ketiganya membentuk sistem komputasi yang fungsional.',
      'Pahami perbedaan memori primer (kecepatan tinggi, volatile) dan sekunder (permanen, non-volatile).'
    ]
  },
  {
    id: 'vid-3b',
    moduleId: 'mod-3',
    title: 'Siklus Mesin CPU (Fetch-Decode-Execute) & Arsitektur Sistem Komputer',
    duration: '11:15',
    durationSeconds: 675,
    youtubeId: 'mbW4afuxvtw',
    thumbnail: 'https://i.ytimg.com/vi/mbW4afuxvtw/hqdefault.jpg',
    speaker: 'SMKN 1 Randudongkal (Informatika)',
    description: 'Animasi visual cara kerja mikroprosesor menjalankan instruksi program biner. Pelajari arsitektur Von Neumann, fungsi Program Counter (PC), Register Instruksi, siklus Fetch-Decode-Execute, dan transmisi sinyal pada Bus Sistem.',
    chapters: [
      { title: '00:00 - Konsep Dasar Arsitektur Von Neumann', timeInSeconds: 0 },
      { title: '02:40 - Tahap Fetch: Mengambil Instruksi dari RAM', timeInSeconds: 160 },
      { title: '05:30 - Tahap Decode: Menerjemahkan Kode Operasi (Opcode)', timeInSeconds: 330 },
      { title: '08:15 - Tahap Execute: Eksekusi Perhitungan di ALU & Simpan Hasil', timeInSeconds: 495 },
    ],
    checkpoints: [
      {
        timeInSeconds: 160,
        label: 'Checkpoint 1: Peran Program Counter',
        questionPrompt: 'Register CPU apakah yang menyimpan alamat memori dari instruksi berikutnya yang akan diambil?',
        options: ['Program Counter (PC)', 'Accumulator (AC)', 'Memory Data Register (MDR)', 'Stack Pointer (SP)'],
        correctIndex: 0,
        explanation: 'Program Counter (PC) melacak alamat memori instruksi selanjutnya; nilainya bertambah otomatis setiap kali sebuah instruksi berhasil diambil (Fetch).'
      },
      {
        timeInSeconds: 330,
        label: 'Checkpoint 2: Tugas Unit Kendali (CU)',
        questionPrompt: 'Bagian CPU manakah yang bertugas mendekode (menerjemahkan) kode biner instruksi menjadi sinyal kontrol elektronik?',
        options: ['Control Unit (CU)', 'Arithmetic Logic Unit (ALU)', 'Cache L1', 'Harddisk'],
        correctIndex: 0,
        explanation: 'Control Unit (CU) mengarahkan seluruh lalu lintas data dan menginterpretasikan instruksi agar bagian lain tahu operasi apa yang harus dijalankan.'
      }
    ],
    transcriptSummary: [
      'Arsitektur Von Neumann menempatkan program instruksi dan data pada memori bersama yang terpadu.',
      'Siklus mesin berulang miliaran kali per detik (GHz): Fetch (ambil), Decode (terjemahkan), dan Execute (jalankan).',
      'Bus data, bus alamat, dan bus kendali menghubungkan CPU dengan memori utama dan periferal I/O.'
    ],
    keyTakeaways: [
      'Kecepatan jam prosesor (Clock Speed dalam GHz) mengukur berapa miliar siklus mesin yang dapat diselesaikan per detik.',
      'Register adalah memori tercepat di dalam komputer karena terletak langsung pada inti silikon prosesor.'
    ]
  },
  {
    id: 'vid-3c',
    moduleId: 'mod-3',
    title: 'Sistem Bilangan Digital & Sirkuit Gerbang Logika (Biner, Heksa & Logika)',
    duration: '13:40',
    durationSeconds: 820,
    youtubeId: '4_NyY8u_zVw',
    thumbnail: 'https://i.ytimg.com/vi/4_NyY8u_zVw/hqdefault.jpg',
    speaker: 'Agus Mulyana (Dasar Sistem Digital & Informatika)',
    description: 'Panduan lengkap representasi data dalam sistem komputer digital. Belajar konversi sistem bilangan Desimal, Biner (basis 2), dan Heksadesimal (basis 16), serta analisis tabel kebenaran gerbang logika dasar AND, OR, NOT, dan XOR.',
    chapters: [
      { title: '00:00 - Mengapa Komputer Berbahasa Biner (0 dan 1)', timeInSeconds: 0 },
      { title: '03:15 - Konversi Bilangan Biner ke Desimal & Sebaliknya', timeInSeconds: 195 },
      { title: '06:50 - Sistem Heksadesimal untuk Kode Warna & Alamat Memori', timeInSeconds: 410 },
      { title: '09:50 - Gerbang Logika: AND, OR, NOT, dan XOR', timeInSeconds: 590 },
    ],
    checkpoints: [
      {
        timeInSeconds: 195,
        label: 'Checkpoint 1: Nilai Desimal Biner',
        questionPrompt: 'Berapakah nilai desimal dari bilangan biner 1010₂?',
        options: ['10', '12', '8', '14'],
        correctIndex: 0,
        explanation: '(1×8) + (0×4) + (1×2) + (0×1) = 8 + 0 + 2 + 0 = 10 dalam sistem desimal.'
      },
      {
        timeInSeconds: 590,
        label: 'Checkpoint 2: Gerbang Logika XOR',
        questionPrompt: 'Sebuah gerbang logika menghasilkan keluaran 1 HANYA JIKA kedua masukannya bernilai berbeda. Gerbang apakah ini?',
        options: ['XOR (Exclusive OR)', 'AND', 'OR', 'NOT'],
        correctIndex: 0,
        explanation: 'Gerbang XOR (Exclusive OR) menghasilkan 1 jika salah satu input bernilai 1 dan yang lain 0 (masukan berbeda).'
      }
    ],
    transcriptSummary: [
      'Sinyal elektronik komputer hanya mengenal dua kondisi voltase: ON (1) dan OFF (0).',
      'Satu byte terdiri dari 8 bit yang mampu menampung 256 kombinasi nilai (0 sampai 255).',
      'Heksadesimal mempersingkat 8-bit biner menjadi 2 digit hex (misalnya 11111111₂ = FF₁₆).',
      'Gerbang logika dasar adalah blok pembangun sirkuit terpadu (Integrated Circuit) pada processor modern.'
    ],
    keyTakeaways: [
      'Pahami bobot pangkat dua (1, 2, 4, 8, 16, 32, 64, 128) untuk konversi biner secara cepat.',
      'Heksadesimal banyak digunakan pada representasi kode warna web HTML (#FFFFFF = putih).'
    ]
  },

  // ==========================================
  // MODUL 4: JARINGAN KOMPUTER & INTERNET (JKI)
  // ==========================================
  {
    id: 'vid-4',
    moduleId: 'mod-4',
    title: 'Jaringan Komputer dan Internet: Topologi, LAN & Konsep IP Address',
    duration: '13:20',
    durationSeconds: 800,
    youtubeId: 'GHPMTljp3ZY',
    thumbnail: 'https://i.ytimg.com/vi/GHPMTljp3ZY/hqdefault.jpg',
    speaker: 'El Samah Channel (Informatika SMA)',
    description: 'Panduan visual materi Jaringan Komputer dan Internet (JKI) berbahasa Indonesia. Membedakan jaringan kabel (UTP) vs nirkabel (Wi-Fi), jangkauan LAN/MAN/WAN, ragam topologi (Bintang, Bus, Cincin), dan dasar pengalamatan IP Address.',
    chapters: [
      { title: '00:00 - Pengantar Jaringan Komputer & Internet', timeInSeconds: 0 },
      { title: '03:15 - Klasifikasi Jangkauan Jaringan: LAN, MAN, WAN', timeInSeconds: 195 },
      { title: '06:40 - Topologi Jaringan & Media Transmisi Data', timeInSeconds: 400 },
      { title: '10:10 - Konsep Dasar IP Address & Pengujian Jaringan', timeInSeconds: 610 },
    ],
    checkpoints: [
      {
        timeInSeconds: 195,
        label: 'Checkpoint 1: Jangkauan Jaringan LAN',
        questionPrompt: 'Jaringan komputer yang menghubungkan komputer-komputer di dalam satu laboratorium sekolah disebut:',
        options: ['LAN (Local Area Network)', 'WAN (Wide Area Network)', 'MAN (Metropolitan Area Network)', 'PAN Global'],
        correctIndex: 0,
        explanation: 'LAN (Local Area Network) adalah jaringan yang mencakup area geografis terbatas seperti gedung, ruang kelas, atau laboratorium sekolah.'
      },
      {
        timeInSeconds: 400,
        label: 'Checkpoint 2: Keunggulan Topologi Star',
        questionPrompt: 'Apa keuntungan utama topologi Star (Bintang) yang terhubung melalui Switch/Hub?',
        options: ['Jika satu kabel klien putus, komputer lain tetap dapat berkomunikasi secara normal', 'Tidak membutuhkan perangkat konsentrator', 'Kabel yang digunakan jauh lebih sedikit dari Bus', 'Tidak ada sinyal tabrakan sama sekali'],
        correctIndex: 0,
        explanation: 'Pada topologi Star, setiap perangkat terhubung langsung ke switch pusat secara independen, sehingga kerusakan satu kabel tidak melumpuhkan seluruh jaringan.'
      }
    ],
    transcriptSummary: [
      'Jaringan komputer memungkinkan pertukaran data (sharing file) dan pemakaian bersama perangkat keras (seperti printer jaringan).',
      'Media transmisi dibagi menjadi berkabel (Guided, misal kabel UTP/fiber optik) dan nirkabel (Unguided, misal gelombang radio Wi-Fi).',
      'IP Address adalah alamat identitas numerik unik bagi setiap perangkat yang terhubung dalam jaringan protokol TCP/IP.'
    ],
    keyTakeaways: [
      'Pilihlah topologi dan media transmisi yang sesuai dengan kebutuhan ruangan, anggaran, dan kemudahan pemeliharaan.',
      'Alamat IP bersifat logis dan dapat diatur sesuai segmentasi jaringan.'
    ]
  },
  {
    id: 'vid-4b',
    moduleId: 'mod-4',
    title: 'Teknik Menghitung Subnetting IPv4 Kelas C Cepat & Mudah',
    duration: '11:20',
    durationSeconds: 680,
    youtubeId: 'ZhbVeqQgNGE',
    thumbnail: 'https://i.ytimg.com/vi/ZhbVeqQgNGE/hqdefault.jpg',
    speaker: 'Hasrul Tips-Channel (Jaringan Komputer)',
    description: 'Pelajari struktur pengalamatan IP versi 4 (IPv4) secara terperinci. Pahami 4 oktet desimal titik, pembagian porsi Network ID dan Host ID dengan Subnet Mask (seperti /24 atau 255.255.255.0), alamat broadcast, dan perintah pengujian ping terminal.',
    chapters: [
      { title: '00:00 - Struktur 32-Bit Alamat IPv4', timeInSeconds: 0 },
      { title: '03:10 - Konsep Subnet Mask dan Notasi Prefix (/24)', timeInSeconds: 190 },
      { title: '06:30 - Menentukan Network ID, Host Range, dan Broadcast ID', timeInSeconds: 390 },
      { title: '09:50 - Praktik Menguji Konektivitas dengan Perintah Ping', timeInSeconds: 590 },
    ],
    checkpoints: [
      {
        timeInSeconds: 190,
        label: 'Checkpoint 1: Jumlah Bit IPv4',
        questionPrompt: 'Berapakah total panjang bit dari alamat protokol Internet versi 4 (IPv4)?',
        options: ['32 bit (terbagi menjadi 4 oktet)', '64 bit', '128 bit', '16 bit'],
        correctIndex: 0,
        explanation: 'IPv4 terdiri dari 32 bit biner yang ditulis dalam notasi desimal bertitik menjadi 4 oktet (masing-masing 8 bit bernilai 0-255).'
      },
      {
        timeInSeconds: 390,
        label: 'Checkpoint 2: Alamat Jaringan (Network ID)',
        questionPrompt: 'Pada alamat 192.168.1.50 dengan subnet mask 255.255.255.0 (/24), apakah Network ID-nya?',
        options: ['192.168.1.0', '192.168.1.255', '192.168.0.0', '192.168.1.1'],
        correctIndex: 0,
        explanation: 'Pada subnet mask /24, porsi host diisi bit 0 untuk menandai alamat jaringan utama (Network ID), yaitu 192.168.1.0.'
      }
    ],
    transcriptSummary: [
      'Alamat IP mengidentifikasi perangkat di jaringan secara unik agar paket data sampai tepat sasaran.',
      'Subnet mask memisahkan alamat menjadi dua bagian: identitas jaringan (Network ID) dan identitas komputer (Host ID).',
      'Alamat dengan host bit bernilai 0 adalah Network ID, sedangkan bernilai 255 (semua 1) adalah Broadcast ID untuk mengirim data serentak ke semua node.'
    ],
    keyTakeaways: [
      'Dua komputer hanya bisa saling terhubung langsung tanpa router jika berada dalam Network ID yang sama.',
      'Gunakan perintah ping pada command prompt untuk mengecek latensi dan kehilangan paket jaringan.'
    ]
  },
  {
    id: 'vid-4c',
    moduleId: 'mod-4',
    title: 'Apa itu DNS (Domain Name System) dan Bagaimana Cara Kerjanya?',
    duration: '09:15',
    durationSeconds: 555,
    youtubeId: '2tBYH2yX9tI',
    thumbnail: 'https://i.ytimg.com/vi/2tBYH2yX9tI/hqdefault.jpg',
    speaker: 'Guru Digital',
    description: 'Menelusuri perjalanan paket data saat kita membuka sebuah website. Memahami 4 lapisan model TCP/IP, peran DNS (Domain Name System) sebagai buku telepon internet, serta pentingnya enkripsi SSL/TLS pada protokol HTTPS untuk mengamankan data pengguna.',
    chapters: [
      { title: '00:00 - Apa yang Terjadi Saat Kita Mengetik Alamat Website', timeInSeconds: 0 },
      { title: '03:20 - Model 4 Lapisan TCP/IP (Aplikasi, Transport, Internet, Network)', timeInSeconds: 200 },
      { title: '07:15 - Domain Name System (DNS): Menerjemahkan Nama ke IP', timeInSeconds: 435 },
      { title: '10:40 - Perbedaan HTTP vs HTTPS & Enkripsi Data SSL/TLS', timeInSeconds: 640 },
    ],
    checkpoints: [
      {
        timeInSeconds: 435,
        label: 'Checkpoint 1: Fungsi Server DNS',
        questionPrompt: 'Apakah fungsi utama dari Domain Name System (DNS) di jaringan internet?',
        options: ['Menerjemahkan nama domain (seperti kemdikbud.go.id) menjadi alamat IP numerik server', 'Membuat koneksi Wi-Fi gratis', 'Menyimpan riwayat browser selamanya', 'Menghubungkan kabel LAN ke komputer'],
        correctIndex: 0,
        explanation: 'DNS berfungsi layaknya buku telepon internet yang memetakan nama domain ramah manusia ke alamat IP yang digunakan router untuk mengirim paket.'
      },
      {
        timeInSeconds: 640,
        label: 'Checkpoint 2: Keamanan Protokol HTTPS',
        questionPrompt: 'Huruf "S" pada protokol "HTTPS" merupakan singkatan dari apa dan menggunakan teknologi apa?',
        options: ['Secure, menggunakan enkripsi sertifikat SSL/TLS', 'Speed, meningkatkan kecepatan download', 'Simple, menggunakan teks polos', 'System, terpasang otomatis di Windows'],
        correctIndex: 0,
        explanation: 'HTTPS berarti Hypertext Transfer Protocol Secure, mengenkripsi seluruh pertukaran data agar tidak dapat disadap oleh peretas di jaringan publik.'
      }
    ],
    transcriptSummary: [
      'Protokol adalah aturan standar yang memungkinkan perangkat berbeda merk dan sistem operasi dapat saling berkomunikasi di internet.',
      'TCP menjamin paket data sampai utuh tanpa eror, sedangkan IP menangani pengalamatan dan rute pengiriman.',
      'Ikon gembok pada peramban web menandakan situs menggunakan HTTPS dengan koneksi terenkripsi aman.'
    ],
    keyTakeaways: [
      'Jangan pernah memasukkan data rahasia atau kata sandi di situs yang masih menggunakan protokol HTTP tanpa enkripsi.',
      'Pahami lapisan protokol aplikasi seperti HTTP, DNS, FTP, dan SMTP.'
    ]
  },

  // ==========================================
  // MODUL 5: ANALISIS DATA (AD)
  // ==========================================
  {
    id: 'vid-5',
    moduleId: 'mod-5',
    title: 'Analisis Data: Pengolahan Lembar Kerja & Rumus Dasar Spreadsheet / Excel',
    duration: '14:10',
    durationSeconds: 850,
    youtubeId: '6WgvzCU3TI8',
    thumbnail: 'https://i.ytimg.com/vi/6WgvzCU3TI8/hqdefault.jpg',
    speaker: 'Ignasius Ryan (Data & Spreadsheet Specialist)',
    description: 'Video tutorial praktis analisis data bagi pemula dan pelajar. Belajar mengoperasikan aplikasi lembar kerja (Microsoft Excel / Google Sheets), memahami anatomi sel, input formula matematika, fungsi statistik dasar (SUM, AVERAGE, MAX, MIN), dan visualisasi tabel.',
    chapters: [
      { title: '00:00 - Pengenalan Antarmuka Lembar Kerja Spreadsheet', timeInSeconds: 0 },
      { title: '03:10 - Mengenal Kolom, Baris, Sel, dan Range Data', timeInSeconds: 190 },
      { title: '06:30 - Rumus Operasi Matematika & Rumus Statistik Dasar', timeInSeconds: 390 },
      { title: '10:20 - Merapikan Format Tabel & Persiapan Analisis Data', timeInSeconds: 620 },
    ],
    checkpoints: [
      {
        timeInSeconds: 190,
        label: 'Checkpoint 1: Tanda Penulisan Rumus',
        questionPrompt: 'Simbol apakah yang wajib diketikkan pertama kali di awal sel sebelum menulis formula perhitungan di Excel?',
        options: ['Tanda sama dengan (=)', 'Tanda pagar (#)', 'Tanda titik dua (:)', 'Tanda seru (!)'],
        correctIndex: 0,
        explanation: 'Setiap formula atau fungsi perhitungan di aplikasi spreadsheet wajib diawali tanda sama dengan (=).'
      },
      {
        timeInSeconds: 390,
        label: 'Checkpoint 2: Fungsi Rata-Rata',
        questionPrompt: 'Fungsi Excel manakah yang digunakan untuk mencari nilai rata-rata dari sekelompok angka pada rentang sel tertentu?',
        options: ['=AVERAGE()', '=SUM()', '=MEDIAN()', '=COUNT()'],
        correctIndex: 0,
        explanation: '=AVERAGE() menghitung rata-rata aritmatika dari rentang data yang dipilih.'
      }
    ],
    transcriptSummary: [
      'Aplikasi lembar kerja adalah perkakas utama untuk menyusun, mengolah, dan menganalisis data terstruktur.',
      'Sel adalah perpotongan antara Kolom (huruf) dan Baris (angka), contohnya sel B5.',
      'Fungsi bawaan seperti SUM, AVERAGE, MIN, dan MAX mempercepat perhitungan statistik data dalam jumlah masif.'
    ],
    keyTakeaways: [
      'Analisis data bermula dari data mentah yang rapi dan konsisten.',
      'Kuasai fungsi agregasi dasar sebelum melangkah ke teknik visualisasi grafik data.'
    ]
  },
  {
    id: 'vid-5b',
    moduleId: 'mod-5',
    title: 'Formula Lanjutan Spreadsheet: Fungsi Logika =IF(), =COUNTIF(), & =SUMIF()',
    duration: '13:30',
    durationSeconds: 810,
    youtubeId: 'OnuCLZXMVyQ',
    thumbnail: 'https://i.ytimg.com/vi/OnuCLZXMVyQ/hqdefault.jpg',
    speaker: 'Ignasius Ryan (Data & Spreadsheet Specialist)',
    description: 'Kuasai otomatisasi evaluasi data dengan rumus logika tingkat lanjut di spreadsheet. Pelajari fungsi kondisi =IF(kondisi, jika_benar, jika_salah), menghitung frekuensi kategori dengan =COUNTIF(), dan menjumlahkan nilai berkondisi dengan =SUMIF().',
    chapters: [
      { title: '00:00 - Pengantar Logika Berkondisi di Spreadsheet', timeInSeconds: 0 },
      { title: '02:40 - Sintaks Fungsi =IF() & Studi Kasus Kelulusan Siswa', timeInSeconds: 160 },
      { title: '06:20 - Menghitung Jumlah Data Tertentu dengan =COUNTIF()', timeInSeconds: 380 },
      { title: '09:50 - Menjumlahkan Nilai Berdasarkan Kriteria dengan =SUMIF()', timeInSeconds: 590 },
    ],
    checkpoints: [
      {
        timeInSeconds: 160,
        label: 'Checkpoint 1: Evaluasi Fungsi IF',
        questionPrompt: 'Jika sel B2 berisi angka 85, rumus =IF(B2>=75, "Lulus", "Remedial") akan menghasilkan teks apa?',
        options: ['"Lulus"', '"Remedial"', '85', 'Error'],
        correctIndex: 0,
        explanation: 'Kondisi 85 >= 75 bernilai Benar (True), sehingga rumus menghasilkan nilai parameter kedua yaitu "Lulus".'
      },
      {
        timeInSeconds: 380,
        label: 'Checkpoint 2: Peran COUNTIF',
        questionPrompt: 'Rumus manakah yang benar untuk menghitung berapa banyak siswa yang mendapatkan nilai predikat "A" di rentang sel C2:C40?',
        options: ['=COUNTIF(C2:C40, "A")', '=SUMIF(C2:C40, "A")', '=COUNT(C2:C40)', '=AVERAGEIF(C2:C40, "A")'],
        correctIndex: 0,
        explanation: 'Fungsi =COUNTIF(range, criteria) digunakan untuk menghitung banyaknya sel yang sesuai dengan kriteria yang ditentukan.'
      }
    ],
    transcriptSummary: [
      'Fungsi IF mengevaluasi pengujian logika dan mengembalikan nilai berbeda untuk kondisi benar atau salah.',
      'COUNTIF memudahkan pencatatan frekuensi data nominal atau kategorik (seperti menghitung jumlah laki-laki/perempuan).',
      'SUMIF menggabungkan kemampuan filtering dan penjumlahan numerik untuk rekapitulasi data keuangan atau nilai.'
    ],
    keyTakeaways: [
      'Gunakan tanda petik dua ("") untuk kriteria teks pada argumen fungsi COUNTIF dan SUMIF.',
      'Fungsi logika bersarang (Nested IF) dapat digunakan untuk menentukan predikat bertingkat (A, B, C, D).'
    ]
  },
  {
    id: 'vid-5c',
    moduleId: 'mod-5',
    title: 'Cara Membuat Grafik dan Visualisasi Data di Microsoft Excel',
    duration: '12:50',
    durationSeconds: 770,
    youtubeId: '1-BhbQm2dCA',
    thumbnail: 'https://i.ytimg.com/vi/1-BhbQm2dCA/hqdefault.jpg',
    speaker: 'Ignasius Ryan (Data & Spreadsheet Specialist)',
    description: 'Ubah tabel angka kering menjadi wawasan visual yang memikat dan komunikatif. Pelajari cara memilih diagram yang tepat (Bar Chart, Line Chart, Pie Chart) dan teknik menghubungkan dua tabel data referensi menggunakan rumus =VLOOKUP().',
    chapters: [
      { title: '00:00 - Seni Mengkomunikasikan Data Melalui Visualisasi', timeInSeconds: 0 },
      { title: '03:15 - Memilih Jenis Grafik yang Tepat (Batang, Garis, Lingkaran)', timeInSeconds: 195 },
      { title: '07:30 - Pembersihan Data (Data Cleaning) & Penanganan Outlier', timeInSeconds: 450 },
      { title: '11:10 - Menghubungkan Data Tabel Referensi dengan =VLOOKUP()', timeInSeconds: 670 },
    ],
    checkpoints: [
      {
        timeInSeconds: 195,
        label: 'Checkpoint 1: Grafik Perkembangan Waktu',
        questionPrompt: 'Jenis diagram manakah yang paling ideal untuk menyajikan tren kenaikan suhu rata-rata bumi dari tahun ke tahun?',
        options: ['Diagram Garis (Line Chart)', 'Diagram Lingkaran (Pie Chart)', 'Diagram Donat', 'Scatter 3D'],
        correctIndex: 0,
        explanation: 'Diagram Garis (Line Chart) paling tepat untuk memperlihatkan perubahan berkelanjutan atau tren data runtun waktu (time-series).'
      },
      {
        timeInSeconds: 670,
        label: 'Checkpoint 2: Parameter FALSE pada VLOOKUP',
        questionPrompt: 'Mengapa kita umumnya menyetel argumen terakhir rumus =VLOOKUP(..., FALSE) bernilai FALSE?',
        options: ['Agar mencari kecocokan persis 100% (Exact Match)', 'Agar rumus berjalan lebih lambat', 'Agar menghasilkan angka acak', 'Agar tabel otomatis terhapus'],
        correctIndex: 0,
        explanation: 'Parameter FALSE (atau 0) mewajibkan VLOOKUP menemukan data yang benar-benar sama persis (Exact Match), bukan nilai taksiran.'
      }
    ],
    transcriptSummary: [
      'Visualisasi data mempermudah pengambilan keputusan cepat dengan menyajikan pola dan anomali secara grafis.',
      'Diagram batang membandingkan antar-kategori, diagram garis melacak tren berkala, diagram lingkaran menampilkan proporsi persentase.',
      'Pembersihan data (Data Cleaning) membuang sel kosong dan anomali sebelum visualisasi dibuat.',
      'VLOOKUP mencari nilai pada kolom paling kiri tabel referensi lalu mengambil data pada kolom yang ditunjuk.'
    ],
    keyTakeaways: [
      'Hindari menyajikan terlalu banyak kategori pada pie chart agar tetap mudah dibaca.',
      'Pastikan tabel referensi VLOOKUP terkunci dengan alamat absolut ($A$1:$D$50) agar tidak bergeser saat disalin.'
    ]
  },

  // ==========================================
  // MODUL 6: DAMPAK SOSIAL INFORMATIKA (DSI)
  // ==========================================
  {
    id: 'vid-6',
    moduleId: 'mod-6',
    title: 'Dampak Sosial Informatika: Etika Digital, Keamanan Siber & Privasi Data',
    duration: '12:00',
    durationSeconds: 720,
    youtubeId: 'mPW2xZvnMk4',
    thumbnail: 'https://i.ytimg.com/vi/mPW2xZvnMk4/hqdefault.jpg',
    speaker: 'Aldian Hudaya (Ngode with Kang Aldi)',
    description: 'Kajian komprehensif Dampak Sosial Informatika (DSI) untuk pelajar SMA berbahasa Indonesia. Mengulas etika komunikasi digital, jejak digital, regulasi UU ITE di Indonesia, ancaman rekayasa sosial / phishing, serta cara melindungi data pribadi di internet.',
    chapters: [
      { title: '00:00 - Pengantar Dampak Sosial Informatika SMA', timeInSeconds: 0 },
      { title: '03:10 - Etika Bermedia Digital & Jejak Digital Permanen', timeInSeconds: 190 },
      { title: '06:20 - Keamanan Siber: Password Kuat & Modus Phishing', timeInSeconds: 380 },
      { title: '09:40 - Perlindungan Data Pribadi & Payung Hukum UU ITE', timeInSeconds: 580 },
    ],
    checkpoints: [
      {
        timeInSeconds: 190,
        label: 'Checkpoint 1: Jejak Digital',
        questionPrompt: 'Mengapa jejak digital (digital footprint) kita di internet perlu dijaga dengan sangat bijak?',
        options: ['Karena jejak digital bersifat abadi, sulit dihapus sepenuhnya, dan dapat mempengaruhi reputasi masa depan', 'Karena jejak digital otomatis terhapus dalam 24 jam', 'Karena jejak digital hanya bisa dilihat oleh keluarga', 'Karena jejak digital memperlambat koneksi internet'],
        correctIndex: 0,
        explanation: 'Aktivitas, komentar, dan unggahan di internet terekam dalam jejak digital yang sering kali permanen dan dapat ditelusuri kembali di masa depan.'
      },
      {
        timeInSeconds: 380,
        label: 'Checkpoint 2: Menghadapi Tautan Phishing',
        questionPrompt: 'Tindakan paling tepat ketika menerima pesan mencurigakan berisi tautan login bank atau media sosial yang tidak biasa adalah:',
        options: ['Jangan mengklik tautan tersebut, dan periksa keabsahan situs melalui kanal resmi', 'Langsung klik untuk mengecek hadiah', 'Meneruskan pesan ke semua grup', 'Mengisi formulir dengan data teman'],
        correctIndex: 0,
        explanation: 'Tautan phishing dirancang untuk mengelabui pengguna agar menyerahkan data sensitif; jangan pernah klik tautan dari sumber yang tidak diverifikasi.'
      }
    ],
    transcriptSummary: [
      'Perkembangan teknologi informasi membawa manfaat besar sekaligus tantangan etika dan hukum.',
      'Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) serta UU Pelindungan Data Pribadi (UU PDP) memayungi ruang digital Indonesia.',
      'Keamanan akun diperkuat dengan kata sandi kombinasi unik dan pengaktifan Otentikasi Dua Faktor (2FA).'
    ],
    keyTakeaways: [
      'Menjadi warga digital yang cerdas dan kritis adalah kunci berselancar secara aman di dunia maya.',
      'Data pribadi adalah aset berharga yang harus dijaga kerahasiaannya dari pihak ketiga tanpa izin.'
    ]
  },
  {
    id: 'vid-6b',
    moduleId: 'mod-6',
    title: 'Keamanan Siber Terapan: Otentikasi 2FA, Deteksi Phishing & Ancaman Ransomware',
    duration: '13:15',
    durationSeconds: 795,
    youtubeId: 'Xr2nlYOnqIU',
    thumbnail: 'https://i.ytimg.com/vi/Xr2nlYOnqIU/hqdefault.jpg',
    speaker: 'El Samah Channel (Informatika SMA)',
    description: 'Strategi praktis melindungi identitas digital di era modern. Pelajari cara kerja serangan Social Engineering, taktik mengidentifikasi email phishing palsu, pentingnya mengaktifkan Two-Factor Authentication (2FA), dan langkah antisipasi serangan malware Ransomware.',
    chapters: [
      { title: '00:00 - Lanskap Ancaman Kejahatan Siber Modern', timeInSeconds: 0 },
      { title: '02:50 - Anatomi Serangan Rekayasa Sosial (Social Engineering)', timeInSeconds: 170 },
      { title: '06:15 - Dua Faktor Otentikasi (2FA): Lapisan Pertahanan Tambahan', timeInSeconds: 375 },
      { title: '09:40 - Bahaya Ransomware & Kebiasaan Cadangan Data Rutin', timeInSeconds: 580 },
    ],
    checkpoints: [
      {
        timeInSeconds: 375,
        label: 'Checkpoint 1: Prinsip Dua Faktor Otentikasi',
        questionPrompt: 'Mengapa Two-Factor Authentication (2FA) jauh lebih aman daripada hanya mengandalkan kata sandi?',
        options: ['Karena mewajibkan dua bukti identitas (sesuatu yang Anda tahu + sesuatu yang Anda miliki seperti HP)', 'Karena membuat koneksi internet lebih murah', 'Karena membuat kata sandi tidak perlu diingat lagi', 'Karena 2FA menghapus virus secara otomatis'],
        correctIndex: 0,
        explanation: 'Sekalipun kata sandi dicuri, penyerang tetap tidak bisa login tanpa faktor kedua (seperti kode OTP yang dikirim ke ponsel sah pengguna).'
      },
      {
        timeInSeconds: 580,
        label: 'Checkpoint 2: Karakteristik Ransomware',
        questionPrompt: 'Malware berbahaya yang menyandera file pengguna dengan cara mengenkripsinya dan meminta uang tebusan adalah:',
        options: ['Ransomware', 'Adware', 'Spyware biasa', 'Cookie browser'],
        correctIndex: 0,
        explanation: 'Ransomware mengenkripsi berkas korban sehingga tidak dapat dibuka, lalu pelaku memeras korban untuk membayar uang tebusan (ransom).'
      }
    ],
    transcriptSummary: [
      'Rekayasa sosial mengeksploitasi kelengahan dan psikologi manusia daripada membobol sistem enkripsi secara teknis.',
      'Aktifkan verifikasi 2 langkah (2FA/MFA) di semua akun penting: email, akun belajar, dan perbankan digital.',
      'Terapkan strategi backup 3-2-1 untuk melindungi data dari serangan ransomware atau kegagalan perangkat keras.'
    ],
    keyTakeaways: [
      'Jangan pernah membagikan kode OTP (One-Time Password) kepada siapa pun, termasuk pihak yang mengaku petugas resmi.',
      'Simpan salinan data penting di media penyimpanan eksternal yang tidak selalu terhubung ke jaringan.'
    ]
  },
  {
    id: 'vid-6c',
    moduleId: 'mod-6',
    title: 'Literasi Digital: Gerakan Siberkreasi, Hukum dan Etika Digital di Indonesia',
    duration: '14:20',
    durationSeconds: 860,
    youtubeId: 'qxDI25UKQgk',
    thumbnail: 'https://i.ytimg.com/vi/qxDI25UKQgk/hqdefault.jpg',
    speaker: 'Center for Digital Society UGM / Siberkreasi',
    description: 'Menjadi warga digital berkarakter dan bertanggung jawab. Memahami pilar hukum UU ITE dan UU Perlindungan Data Pribadi (UU PDP) di Indonesia, Hak Kekayaan Intelektual (HAKI), lisensi perangkat lunak sumber terbuka (Open Source vs Proprietary), serta isu etika kecerdasan buatan (AI Bias & Deepfake).',
    chapters: [
      { title: '00:00 - Tanggung Jawab Hukum di Ruang Siber', timeInSeconds: 0 },
      { title: '03:20 - Pasal-Pasal Kunci UU ITE & UU Pelindungan Data Pribadi', timeInSeconds: 200 },
      { title: '07:10 - Hak Kekayaan Intelektual & Budaya Lisensi Open Source', timeInSeconds: 430 },
      { title: '10:45 - Etika Kecerdasan Buatan (AI), Bias Data, & Tantangan Deepfake', timeInSeconds: 645 },
    ],
    checkpoints: [
      {
        timeInSeconds: 430,
        label: 'Checkpoint 1: Karakteristik Perangkat Lunak Open Source',
        questionPrompt: 'Apa hak yang dimiliki pengguna terhadap perangkat lunak berlisensi Open Source (seperti Linux atau Python)?',
        options: ['Bebas membaca kode sumber, memodifikasi, dan membagikannya kembali secara legal', 'Wajib membayar royalti setiap kali menjalankan program', 'Dilarang melihat kode pembuat aslinya', 'Hanya bisa digunakan selama 14 hari percobaan'],
        correctIndex: 0,
        explanation: 'Open Source Software memberikan hak kebebasan bagi publik untuk mempelajari, memodifikasi, dan mendistribusikan kode program sesuai ketentuan lisensi.'
      },
      {
        timeInSeconds: 645,
        label: 'Checkpoint 2: Bias Algoritma AI',
        questionPrompt: 'Mengapa sebuah model AI dapat menghasilkan keputusan yang diskriminatif atau bias?',
        options: ['Karena data pelatihan (training dataset) yang digunakan tidak seimbang dan memuat prasangka masa lalu', 'Karena kabel prosesor AI longgar', 'Karena AI memiliki perasaan dendam', 'Karena komputer menggunakan sistem heksadesimal'],
        correctIndex: 0,
        explanation: 'Kecerdasan buatan belajar dari data manusia; jika data pelatihannya timpang atau bias, output keputusan model AI akan merefleksikan ketidakadilan tersebut.'
      }
    ],
    transcriptSummary: [
      'UU ITE melarang akses tanpa hak, intersepsi ilegal, pencemaran nama baik, penyebaran hoaks, dan ujaran kebencian di media digital.',
      'UU Perlindungan Data Pribadi (UU PDP) mewajibkan pengendali data menghormati privasi dan mengamankan data pengguna.',
      'Lisensi Creative Commons dan Open Source mendorong kolaborasi sains terbuka secara beretika.',
      'Generative AI dan Deepfake menuntut literasi verifikasi informasi tingkat tinggi untuk menyaring keaslian konten digital.'
    ],
    keyTakeaways: [
      'Hargai karya intelektual pencipta lain dengan menyertakan atribusi sumber secara jujur.',
      'Gunakan kecerdasan buatan secara etis sebagai alat bantu belajar, bukan untuk plagiarisme atau manipulasi informasi.'
    ]
  }
];
