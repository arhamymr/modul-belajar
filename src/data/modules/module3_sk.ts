import { InteractiveModule } from '../../types';
import { SMA_IMAGES } from '../smaImages';

export const module3_sk: InteractiveModule = {
  id: 'mod-3',
  number: 3,
  title: 'Sistem Komputer & Perangkat Keras',
  element: 'SK',
  classLevel: 'SMA',
  curriculum: 'Kurikulum Merdeka (SMA)',
  estimatedMinutes: 40,
  iconName: 'Cpu',
  coverImage: SMA_IMAGES.bab3_sk,
  summary: 'Mengenal 4 kelompok perangkat keras komputer (Input, Proses, Output, Penyimpanan), sistem operasi dan perangkat lunak, siklus kerja komputer (Input-Proses-Output), serta pengenalan saklar biner dan logika sederhana.',
  learningObjectives: [
    'Mengelompokkan perangkat keras komputer: perangkat masukan (Input), pemroses (CPU), keluaran (Output), dan penyimpan (Storage).',
    'Membedakan peran Sistem Operasi (Windows, Android, Linux) dan Perangkat Lunak Aplikasi (Pengolah Kata, Browser).',
    'Menjelaskan siklus alur kerja komputer dari data dimasukkan hingga menjadi informasi (Input -> Proses -> Output).',
    'Memahami mengapa komputer menggunakan bilangan biner (angka 0 dan 1) dan cara kerja gerbang logika saklar sederhana.'
  ],
  galleryImages: [
    {
      id: 'img-sk-sma-1',
      url: SMA_IMAGES.bab3_sk,
      caption: 'Praktikum Siswa SMA: Mengamati langsung komponen internal PC, motherboard, keping RAM, dan pendingin CPU di lab sekolah.',
      alt: 'Foto Praktikum Siswa-Siswi SMA Perakitan Perangkat Keras Komputer',
      source: 'Dokumentasi Laboratorium Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Hardware', 'Perangkat Keras', 'CPU', 'Lab Komputer'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-sk-sma-2',
      url: SMA_IMAGES.bab3_sk_alt,
      caption: 'Praktikum Perakitan Hardware Siswa SMA: Pemasangan kabel daya power supply, pengujian port I/O, dan diagnosa siklus input-proses-output.',
      alt: 'Foto Siswa SMA Praktikum Perakitan Komputer',
      source: 'Laboratorium Komputer SMA Kurikulum Merdeka',
      tags: ['Siswa SMA', 'Praktikum', 'Perakitan PC', 'Sistem Komputer'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-sk-sma-3',
      url: SMA_IMAGES.bab3_hardware_students,
      caption: 'Praktikum Kolaborasi Arsitektur Komputer Siswa SMA: Memeriksa socket prosesor, slot ekspansi PCIe, dan media penyimpanan SSD/Harddisk.',
      alt: 'Foto Siswa-Siswi SMA Memeriksa Komponen Motherboard',
      source: 'Dokumentasi Praktik Sistem Komputer Siswa SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Motherboard', 'Storage'],
      aspectRatio: '16:9'
    }
  ],
  sections: [
    {
      id: 'sec-3-1',
      title: '1. Mengenal Perangkat Keras Komputer (Hardware)',
      estimatedMinutes: 15,
      keyPoints: [
        'Perangkat Keras (Hardware) adalah semua bagian fisik dari komputer yang dapat dilihat dan disentuh dengan tangan kita.',
        'Perangkat Masukan (Input Device): Alat untuk memasukkan data dan perintah ke komputer (contoh: Keyboard, Mouse, Mikrofon, Kamera).',
        'Perangkat Pemroses (Processing Device): Otak komputer yang mengolah data (contoh: CPU/Processor dan Motherboard).',
        'Perangkat Keluaran (Output Device): Alat untuk menampilkan hasil pengolahan kepada pengguna (contoh: Monitor, Speaker, Printer).',
        'Perangkat Penyimpanan (Storage Device): Tempat menyimpan data, dibedakan menjadi RAM (sementara) dan Harddisk/SSD/Flashdisk (permanen).'
      ],
      content: `## 4 Kelompok Utama Perangkat Keras Komputer

Sebuah komputer dapat bekerja dengan baik karena tersusun dari berbagai macam komponen fisik yang saling bekerja sama. Komponen-komponen yang bisa kita lihat dan sentuh ini disebut **Perangkat Keras (*Hardware*)**.

Secara garis besar, perangkat keras komputer dibagi menjadi **4 kelompok**:

\`\`\`
   [ 1. INPUT DEVICE ]       [ 2. PROCESSING DEVICE ]       [ 3. OUTPUT DEVICE ]
   (Perangkat Masukan)       (Perangkat Pemroses)          (Perangkat Keluaran)
   +-----------------+       +--------------------+        +------------------+
   | - Keyboard      | ----> | - CPU / Processor  | -----> | - Layar Monitor  |
   | - Mouse         |       |   (Otak Komputer)  |        | - Speaker Suara  |
   | - Mikrofon      |       | - Motherboard      |        | - Mesin Printer  |
   +-----------------+       +--------------------+        +------------------+
                                      ^
                                      | (Simpan & Ambil Data)
                                      v
                             [ 4. STORAGE DEVICE ]
                             (Perangkat Penyimpanan)
                             +-------------------+
                             | - RAM (Sementara) |
                             | - SSD / Flashdisk |
                             |   (Permanen)      |
                             +-------------------+
\`\`\`

---

### Penjelasan Lengkap 4 Kelompok Hardware:

1. **Perangkat Masukan (*Input Device*)**:
   Alat yang bertugas menerima perintah atau masukan dari kita untuk dikirimkan ke dalam komputer.
   - **Keyboard**: Untuk mengetik huruf, angka, dan simbol.
   - **Mouse**: Untuk menggerakkan penunjuk (kursor) dan mengklik tombol di layar.
   - **Mikrofon**: Untuk merekam suara saat belajar online atau bermain game.
   - **Kamera Web (*Webcam*)**: Untuk menangkap gambar video wajah kita.

2. **Perangkat Pemroses (*Processing Device*)**:
   - **CPU (*Central Processing Unit* / Processor)**: Sering disebut sebagai **"Otak Komputer"**. CPU-lah yang menghitung semua rumus matematika, menjalankan game, dan mengatur semua kegiatan di komputer.
   - **Motherboard (Papan Induk)**: Papan sirkuit utama tempat menancapnya CPU, RAM, dan kartu grafis.

3. **Perangkat Keluaran (*Output Device*)**:
   Alat yang bertugas memperlihatkan hasil kerja komputer kepada kita.
   - **Monitor**: Menampilkan gambar, tulisan, dan video.
   - **Speaker & Headset**: Mengeluarkan suara musik atau suara guru saat video call.
   - **Printer**: Mencetak hasil ketikan tugas sekolah ke atas kertas fisik.

4. **Perangkat Penyimpanan (*Storage Device*)**:
   - **RAM (*Random Access Memory*)**: Tempat penyimpanan **sementara**. Saat komputer sedang menyala, aplikasi yang kamu buka ditaruh di RAM agar komputer berjalan cepat. Tapi jika listrik padam tiba-tiba, isi RAM akan hilang!
   - **SSD & Harddisk**: Tempat penyimpanan **permanen**. File foto, game, dan tugas sekolahmu tetap tersimpan aman di sini meskipun komputer dimatikan.
   - **Flashdisk**: Media penyimpan portabel kecil yang mudah dibawa ke sekolah di dalam saku tas.`,
      realWorldAnalogy: {
        title: 'Komputer Mirip Tubuh Manusia',
        story: 'Sistem komputer mirip dengan tubuh kita: Mata dan telinga adalah alat masukan (Input) yang menerima gambar dan suara dari sekitar. Otak adalah alat pemroses (CPU) yang berpikir dan mengingat. Mulut dan tangan adalah alat keluaran (Output) yang berbicara dan menulis tugas. Sedangkan buku catatan harian adalah alat penyimpan permanen (Storage) agar ingatan tidak lupa.',
        takeaway: 'Setiap bagian memiliki peran masing-masing dan harus bekerja sama agar komputer dapat berfungsi.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Ketahui Arah Datanya', detail: 'Apakah data masuk ke komputer (Input) atau data keluar ke manusia (Output)?' },
        { step: 2, title: 'Cari Otak Pemrosesnya', detail: 'Komponen yang berpikir dan menghitung di dalam casing komputer adalah CPU.' },
        { step: 3, title: 'Bedakan RAM dan SSD', detail: 'RAM untuk kecepatan saat aplikasi aktif (sementara), SSD untuk menyimpan file selamanya (permanen).' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira Flashdisk dan RAM fungsinya sama.',
          correction: 'RAM adalah memori kerja sementara berkecepatan tinggi yang akan kosong saat komputer mati. Flashdisk adalah tempat menyimpan file permanen yang bisa dicabut.',
          why: 'Keduanya sama-sama menyimpan data, namun sifat keawetan datanya berbeda.'
        }
      ],
      examTips: 'Ingat contoh klasik: Keyboard & Mouse = INPUT. Monitor & Printer = OUTPUT. CPU = PROSES. SSD & Flashdisk = STORAGE.',
      interactiveDemo: 'logic-gate-simulator',
      glossaryTerms: [
        { term: 'Hardware', definition: 'Perangkat keras fisik komputer yang dapat dilihat dan dipegang.' },
        { term: 'CPU (Processor)', definition: 'Unit pemroses sentral yang bertindak sebagai otak pengatur dan penghitung komputer.' },
        { term: 'RAM', definition: 'Memori kerja komputer yang menyimpan data sementara saat aplikasi sedang dijalankan.' },
        { term: 'SSD / Harddisk', definition: 'Media penyimpanan data permanen berkapasitas besar di dalam komputer.' }
      ]
    },
    {
      id: 'sec-3-2',
      title: '2. Cara Kerja Komputer & Perangkat Lunak (Software)',
      estimatedMinutes: 15,
      keyPoints: [
        'Komputer bekerja mengikuti siklus IPO: Masukan (Input) -> Pengolahan (Process) -> Keluaran (Output).',
        'Perangkat Keras tidak akan bisa menyala atau bekerja tanpa adanya Perangkat Lunak (Software).',
        'Sistem Operasi (Operating System / OS) adalah perangkat lunak utama yang mengontrol seluruh komputer dan menjadi jembatan antara hardware dan pengguna.',
        'Contoh Sistem Operasi: Windows, macOS, Linux (untuk laptop/PC), serta Android dan iOS (untuk smartphone/HP).',
        'Perangkat Lunak Aplikasi adalah program siap pakai untuk membantu tugas tertentu, seperti mengetik tugas, browsing, atau mengedit video.'
      ],
      content: `## Alur Kerja Komputer & Mengenal Software

Bagaimana sebuah komputer bisa menampilkan huruf di layar saat kita mengetik di keyboard? Semuanya terjadi melalui sebuah alur yang disebut **Siklus IPO (*Input - Process - Output*)**.

---

### Siklus IPO: Alur Perjalanan Data

\`\`\`
  1. INPUT (Masukan)       2. PROCESS (Pengolahan)      3. OUTPUT (Keluaran)
  +------------------+     +---------------------+     +--------------------+
  | Siswa menekan    | --> | CPU mengolah kode   | --> | Layar monitor      |
  | huruf "A" di     |     | huruf "A" dalam     |     | langsung memunculkan|
  | keyboard         |     | waktu mikro-detik   |     | huruf "A" yang rapi|
  +------------------+     +---------------------+     +--------------------+
                                      |
                                      v
                               4. STORAGE (Simpan)
                               +------------------+
                               | Siswa klik Simpan|
                               | (Ctrl + S) ke SSD|
                               +------------------+
\`\`\`

---

### Mengenal Perangkat Lunak (*Software*)

Jika Hardware adalah "badan" komputer, maka **Software (*Perangkat Lunak*)** adalah "pikiran dan nyawa" komputer. Software tidak berwujud fisik, melainkan kumpulan baris perintah atau program.

Software dibagi menjadi **2 jenis utama**:

1. **Sistem Operasi (*Operating System / OS*)**:
   Software nomor satu yang paling penting di komputer atau HP. Tanpa sistem operasi, layar monitor hanya akan gelap gulita dan kamu tidak bisa membuka aplikasi apa pun.
   - **Untuk Laptop / Komputer**: Microsoft Windows, Apple macOS, Linux.
   - **Untuk Smartphone / Tablet**: Google Android, Apple iOS.
   - **Tugas OS**: Mengatur memori, mengenali keyboard & mouse, mengatur tampilan layar sentuh, dan menjalankan aplikasi.

2. **Perangkat Lunak Aplikasi (*Application Software*)**:
   Program yang kita gunakan untuk menyelesaikan pekerjaan tertentu:
   - **Pengolah Kata (Mengetik Tugas)**: Microsoft Word, Google Docs.
   - **Pengolah Angka (Tabel & Nilai)**: Microsoft Excel, Google Sheets.
   - **Presentasi (Bikin Slide Kelompok)**: Microsoft PowerPoint, Canva.
   - **Peramban Web (Mencari Informasi)**: Google Chrome, Mozilla Firefox.
   - **Belajar Coding Anak SMA**: Scratch, Thonny Python.`,
      realWorldAnalogy: {
        title: 'Sistem Operasi Seperti Kepala Sekolah',
        story: 'Bayangkan sebuah sekolah (Komputer). Gedung kelas, bangku, dan papan tulis adalah Hardware. Para siswa yang belajar di kelas adalah Aplikasi. Agar seluruh sekolah berjalan tertib, ada Kepala Sekolah (Sistem Operasi) yang mengatur jadwal bel masuk, membagi ruangan kelas, dan memastikan semua peralatan sekolah berfungsi dengan baik.',
        takeaway: 'Sistem Operasi bertugas mengelola seluruh perangkat agar aplikasi dapat berjalan dengan tenang dan tertib.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Nyalakan Komputer', detail: 'Komputer pertama kali menyalakan Sistem Operasi (Booting).' },
        { step: 2, title: 'Buka Aplikasi', detail: 'Pengguna mengklik ikon aplikasi yang diinginkan (misal: browser atau Word).' },
        { step: 3, title: 'Masukkan Perintah', detail: 'Ketik atau klik untuk memberikan input, komputer akan memprosesnya seketika.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira Android dan Windows itu merk HP atau laptop.',
          correction: 'Android dan Windows adalah nama Sistem Operasi (Software), bukan merk benda fisiknya.',
          why: 'Benda fisiknya bisa bermacam-macam merk (seperti Samsung, Lenovo, Asus), tapi sistem operasinya menggunakan Android atau Windows.'
        }
      ],
      examTips: 'Jika ditanya contoh Sistem Operasi: ingat Windows, Linux, Android, iOS. Jika ditanya aplikasi pengetik: Microsoft Word atau Google Docs.',
      interactiveDemo: 'logic-gate-simulator',
      glossaryTerms: [
        { term: 'Software', definition: 'Perangkat lunak berupa program instruksi yang memberitahu komputer apa yang harus dikerjakan.' },
        { term: 'Sistem Operasi (OS)', definition: 'Program utama pengendali komputer yang menjembatani perangkat keras dengan aplikasi pengguna.' },
        { term: 'Siklus IPO', definition: 'Urutan cara kerja komputer: Masukan (Input) -> Pemrosesan (Process) -> Keluaran (Output).' }
      ]
    },
    {
      id: 'sec-3-3',
      title: '3. Bilangan Biner (0 dan 1) & Saklar Logika Sederhana',
      estimatedMinutes: 10,
      keyPoints: [
        'Komputer bekerja menggunakan aliran listrik, sehingga hanya mengenal 2 kondisi: Listrik Mati (0) dan Listrik Nyala (1).',
        'Sistem bilangan ini disebut Biner (Basis 2), dengan angka dasar hanya 0 dan 1.',
        'Satu angka 0 atau 1 disebut 1 Bit. Gabungan 8 bit membentuk 1 Byte (satu huruf huruf karakter).',
        'Ukuran data: Kilobyte (KB) -> Megabyte (MB) -> Gigabyte (GB) yang biasa kita dengar saat membeli paket kuota internet.',
        'Gerbang Logika AND: Lampu hanya menyala jika saklar A DAN saklar B sama-sama ON. Gerbang Logika OR: Lampu menyala jika salah satu saklar ON.'
      ],
      content: `## Mengapa Komputer Memakai Angka 0 dan 1?

Pernahkah kamu berpikir, mengapa komputer di dalamnya hanya menggunakan angka **\`0\`** dan **\`1\`**?

Jawabannya sangat sederhana: **Komputer adalah alat elektronik yang dialiri arus listrik!**  
Sama seperti saklar lampu di dinding kamarmu:
- **Saklar OFF (Mati / Tidak ada arus)** $\\rightarrow$ diberi simbol angka **\`0\`**.
- **Saklar ON (Nyala / Ada arus listrik)** $\\rightarrow$ diberi simbol angka **\`1\`**.

Di dalam satu prosesor (CPU) komputer modern, terdapat miliaran saklar listrik mikroskopis super kecil yang dinamakan **Transistor**. Kumpulan saklar nyala-mati inilah yang membentuk tulisan, lagu, game, dan video yang kita tonton!

---

### Mengenal Satuan Ukuran Data (Bit dan Byte)

Pernahkah kamu mendengar istilah kuota internet habis 2 Gigabyte (GB)? Dari mana asal kata itu?

\`\`\`
   1 Bit  = 1 angka tunggal (bisa 0 atau 1)
   1 Byte = Kumpulan 8 Bit (Cukup untuk menyimpan 1 huruf, misal huruf "A")
   
   1 Kilobyte (KB) = 1.024 Byte     (Sekitar 1 lembar halaman teks tugas)
   1 Megabyte (MB) = 1.024 KB       (Sekitar 1 file foto jernih atau 1 lagu)
   1 Gigabyte (GB) = 1.024 MB       (Sekitar 1 film pendek atau kuota internet)
   1 Terabyte (TB) = 1.024 GB       (Kapasitas harddisk laptop yang sangat besar)
\`\`\`

---

### Mengenal 2 Gerbang Logika Saklar: AND dan OR

1. **Gerbang Logika AND (Dan)**:
   Bayangkan dua saklar yang dipasang berjajar satu baris. Lampu hanya akan menyala jika **Saklar 1 ON DAN Saklar 2 ON**. Jika salah satu saklar mati, listrik terputus dan lampu padam!
   - 0 AND 0 = 0 (Padam)
   - 1 AND 0 = 0 (Padam)
   - 0 AND 1 = 0 (Padam)
   - **1 AND 1 = 1 (Lampu Menyala!)**

2. **Gerbang Logika OR (Atau)**:
   Bayangkan dua saklar yang dipasang bercabang atas dan bawah. Lampu akan menyala jika **Saklar 1 ON ATAU Saklar 2 ON** (cukup salah satu saja yang nyala, arus listrik sudah bisa lewat).
   - 0 OR 0 = 0 (Padam)
   - **1 OR 0 = 1 (Lampu Menyala)**
   - **0 OR 1 = 1 (Lampu Menyala)**
   - **1 OR 1 = 1 (Lampu Menyala)**`,
      realWorldAnalogy: {
        title: 'Dua Syarat Masuk Ruang Ujian (Gerbang AND)',
        story: 'Untuk bisa masuk ke ruang ujian komputer sekolah: Siswa wajib membawa kartu peserta ujian (Syarat 1) DAN memakai seragam sekolah lengkap (Syarat 2). Jika hanya membawa kartu tapi tidak berseragam -> Tidak boleh masuk. Hanya jika KEDUANYA terpenuhi barulah siswa dipersilakan masuk.',
        takeaway: 'Prinsip gerbang AND membutuhkan semua syarat bernilai benar agar menghasilkan lampu menyala (1).'
      },
      stepByStepGuide: [
        { step: 1, title: 'Ingat Angka Biner', detail: 'Angka 0 = kondisi mati (OFF), Angka 1 = kondisi hidup (ON).' },
        { step: 2, title: 'Terapkan Aturan AND', detail: 'Semua masukan harus 1 agar hasilnya 1.' },
        { step: 3, title: 'Terapkan Aturan OR', detail: 'Cukup ada satu angka 1 saja maka hasilnya sudah pasti 1.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira 1 Byte itu sama dengan 1 Bit.',
          correction: '1 Byte terdiri dari 8 Bit. Bit adalah satuan terkecil (0 atau 1), sedangkan Byte adalah kumpulan 8 bit yang mewakili satu huruf.',
          why: 'Huruf A di komputer tersimpan sebagai kode 8 bit: 01000001 (1 Byte).'
        }
      ],
      examTips: 'Kunci mudah tabel kebenaran: Pada gerbang AND, jika ada angka 0 maka hasilnya langsung 0. Pada gerbang OR, jika ada angka 1 maka hasilnya langsung 1.',
      interactiveDemo: 'logic-gate-simulator',
      glossaryTerms: [
        { term: 'Biner (Binary)', definition: 'Sistem bilangan berbasis dua yang hanya menggunakan angka 0 dan 1.' },
        { term: 'Bit', definition: 'Satuan terkecil data digital pada komputer yang bernilai 0 atau 1.' },
        { term: 'Byte', definition: 'Satuan data yang terdiri dari gabungan 8 bit, biasanya digunakan untuk mewakili satu huruf teks.' },
        { term: 'Gerbang Logika AND', definition: 'Rangkaian logika di mana keluaran bernilai 1 (ON) hanya jika semua masukan bernilai 1.' },
        { term: 'Gerbang Logika OR', definition: 'Rangkaian logika di mana keluaran bernilai 1 (ON) jika minimal ada satu masukan bernilai 1.' }
      ]
    }
  ],
  videoTutorialId: 'vid-3',
  questions: [
    {
      id: 'q-3-1',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Manakah dari daftar perangkat berikut ini yang semuanya termasuk ke dalam kelompok Perangkat Masukan (Input Device)?',
      options: [
        'Keyboard, Mouse, dan Mikrofon',
        'Layar Monitor, Speaker, dan Printer',
        'CPU, Motherboard, dan RAM',
        'SSD, Flashdisk, dan Harddisk'
      ],
      correctAnswer: 0,
      hint: 'Perangkat masukan adalah alat yang kamu gunakan untuk mengirim perintah atau tulisan ke dalam komputer.',
      explanation: 'Keyboard (mengetik), Mouse (mengklik), dan Mikrofon (merekam suara) semuanya berfungsi memasukkan data atau instruksi ke komputer, sehingga disebut Perangkat Masukan (Input Device).',
      learningObjective: 'Mengelompokkan perangkat keras komputer sesuai fungsinya.'
    },
    {
      id: 'q-3-2',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Doni sedang mengetik tugas di laptop, tiba-tiba baterai laptop habis dan laptop langsung mati. Saat dinyalakan kembali, sebagian tulisan yang belum sempat ia klik tombol "Simpan" ternyata hilang. Mengapa tulisan tersebut hilang?',
      options: [
        'Karena tulisan yang belum disimpan masih berada di RAM yang bersifat sementara.',
        'Karena harddisk laptop Doni langsung rusak seketika.',
        'Karena monitor tidak bisa menampilkan tulisan lama.',
        'Karena keyboard tidak berfungsi saat mati lampu.'
      ],
      correctAnswer: 0,
      hint: 'Ingat sifat memori RAM: hanya menyimpan data selama ada aliran listrik (sementara).',
      explanation: 'Data yang sedang dikerjakan dan belum disimpan secara permanen masih berada di memori RAM. Karena RAM bersifat sementara (volatile), data di dalamnya akan terhapus saat aliran listrik padam.',
      learningObjective: 'Membedakan karakteristik penyimpanan sementara (RAM) dan penyimpanan permanen (SSD/Storage).'
    },
    {
      id: 'q-3-3',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Pada gerbang logika AND (Dan), kapankah lampu keluaran akan menyala (bernilai 1)?',
      options: [
        'Hanya jika kedua saklar masukan sama-sama ON (bernilai 1)',
        'Jika salah satu saklar masukan ON',
        'Jika kedua saklar masukan OFF (bernilai 0)',
        'Lampu akan menyala otomatis tanpa saklar'
      ],
      correctAnswer: 0,
      hint: 'AND berarti "DAN". Saklar A DAN Saklar B harus sama-sama menyala.',
      explanation: 'Pada gerbang logika AND, keluaran hanya akan menghasilkan nilai 1 (lampu menyala) jika semua masukan bernilai 1 secara bersamaan.',
      learningObjective: 'Memahami prinsip kerja gerbang logika dasar AND.'
    },
    {
      id: 'q-3-4',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Siklus kerja prosesor (CPU) terdiri dari tiga langkah berulang: Fetch, Decode, dan Execute. Apakah yang dilakukan oleh CPU pada tahap "Fetch"?',
      options: [
        'Mengambil kode instruksi program dari alamat memori utama (RAM) ke register CPU',
        'Menerjemahkan kode biner menjadi sinyal pengendali elektronik',
        'Melakukan perhitungan matematika di unit kalkulator aritmatika',
        'Menyimpan file dokumen secara permanen ke dalam SSD'
      ],
      correctAnswer: 0,
      hint: 'Fetch artinya "mengambil" instruksi yang akan diproses berikutnya.',
      explanation: 'Tahap Fetch adalah proses CPU membaca dan mengambil instruksi program berikutnya dari memori utama (RAM) berdasarkan alamat yang ditunjukkan oleh Program Counter (PC).',
      learningObjective: 'Menjelaskan tahapan siklus mesin (Machine Cycle) CPU.'
    },
    {
      id: 'q-3-5',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Berapakah nilai desimal (basis 10) dari bilangan biner 8-bit berikut: 00101101₂ ?',
      options: [
        '45',
        '37',
        '53',
        '29'
      ],
      correctAnswer: 0,
      hint: 'Hitung nilai bobot bit aktif (bernilai 1): 32 + 8 + 4 + 1.',
      explanation: 'Posisi bobot biner: (0×128) + (0×64) + (1×32) + (0×16) + (1×8) + (1×4) + (0×2) + (1×1) = 32 + 8 + 4 + 1 = 45 dalam desimal.',
      learningObjective: 'Melakukan konversi bilangan biner ke sistem bilangan desimal.'
    },
    {
      id: 'q-3-6',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Bagian dari prosesor (CPU) yang bertanggung jawab langsung untuk melakukan perhitungan matematika (penjumlahan, pengurangan) serta operasi logika pembandingan (<, >, ==) adalah...',
      options: [
        'ALU (Arithmetic and Logic Unit)',
        'CU (Control Unit)',
        'Register',
        'System Bus'
      ],
      correctAnswer: 0,
      hint: 'Singkatan ini memuat kata "Arithmetic" (Aritmatika) dan "Logic" (Logika).',
      explanation: 'ALU (Arithmetic Logic Unit) adalah sirkuit digital di dalam CPU yang mengeksekusi operasi aritmatika (seperti tambah, kurang, kali) dan evaluasi logika boolean.',
      learningObjective: 'Memahami fungsi unit logika aritmatika (ALU) pada arsitektur Von Neumann.'
    },
    {
      id: 'q-3-7',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Berdasarkan hierarki memori komputer, manakah media penyimpanan data yang memiliki kecepatan transfer data PALING TINGGI (paling cepat)?',
      options: [
        'Register CPU',
        'Memori RAM (DDR4/DDR5)',
        'Solid State Drive (SSD NVMe)',
        'Harddisk Eksternal USB'
      ],
      correctAnswer: 0,
      hint: 'Memori ini terletak langsung di dalam inti prosesor dan beroperasi pada frekuensi GHz yang sama dengan CPU.',
      explanation: 'Register berada langsung di dalam die silikon CPU dengan waktu akses dalam hitungan sepersekian nanodetik (paling cepat di antara semua jenis memori).',
      learningObjective: 'Mengurutkan hierarki memori komputer berdasarkan kecepatan dan kapasitas.'
    },
    {
      id: 'q-3-8',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Sebuah gerbang logika XOR (Exclusive OR) memiliki 2 masukan sinyal A dan B. Kapankah gerbang XOR ini akan menghasilkan sinyal keluaran bernilai 1 (True / Tinggi)?',
      options: [
        'Hanya jika kedua masukan A dan B memiliki nilai yang berbeda (salah satu 1 dan lainnya 0)',
        'Hanya jika kedua masukan A dan B sama-sama bernilai 1',
        'Hanya jika kedua masukan A dan B sama-sama bernilai 0',
        'Keluaran XOR selalu bernilai 1 tanpa mempedulikan masukan'
      ],
      correctAnswer: 0,
      hint: 'XOR artinya "Exclusive OR", aktif hanya jika nilai masukannya berlawanan/berbeda.',
      explanation: 'Tabel kebenaran XOR: (0,0)->0; (0,1)->1; (1,0)->1; (1,1)->0. Jadi keluaran 1 hanya terjadi saat kedua masukan berbeda.',
      learningObjective: 'Menganalisis tabel kebenaran gerbang logika turunan XOR.'
    },
    {
      id: 'q-3-9',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Apakah fungsi mendasar dari Sistem Operasi (Operating System seperti Windows, Linux, macOS) pada arsitektur sistem komputer?',
      options: [
        'Mengelola sumber daya perangkat keras dan menyediakan antarmuka bagi aplikasi serta pengguna',
        'Menggantikan komponen fisik CPU dan RAM jika rusak',
        'Menyuplai aliran daya listrik tegangan tinggi ke motherboard',
        'Membuat komputer dapat terhubung ke internet tanpa menggunakan kartu jaringan'
      ],
      correctAnswer: 0,
      hint: 'Sistem operasi bertindak sebagai pengelola sumber daya (resource manager) antara hardware dan software.',
      explanation: 'Sistem Operasi berfungsi sebagai jembatan (manajer sumber daya) yang mengendalikan hardware (CPU, memori, disk, I/O) dan menyediakan layanan bagi aplikasi pengguna.',
      learningObjective: 'Menjelaskan peran sistem operasi dalam mengelola komponen sistem komputer.'
    },
    {
      id: 'q-3-10',
      moduleId: 'mod-3',
      element: 'SK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Dalam ilmu komputasi, bilangan desimal 255 sering direpresentasikan dalam heksadesimal (basis 16) pada kode warna web dan alamat MAC. Bentuk heksadesimal dari 255 adalah...',
      options: [
        'FF',
        'AA',
        '100',
        '255'
      ],
      correctAnswer: 0,
      hint: 'Angka 15 dalam heksadesimal dilambangkan dengan huruf F. 255 = (15 × 16) + 15.',
      explanation: 'Dalam sistem heksadesimal, angka 10-15 dilambangkan huruf A-F. Nilai 255 / 16 = 15 sisa 15, sehingga 15 dan 15 ditulis sebagai "FF".',
      learningObjective: 'Mengkonversi sistem bilangan desimal ke sistem heksadesimal.'
    }
  ]
};
