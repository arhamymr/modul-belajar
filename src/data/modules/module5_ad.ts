import { InteractiveModule } from '../../types';
import { SMA_IMAGES } from '../smaImages';

export const module5_ad: InteractiveModule = {
  id: 'mod-5',
  number: 5,
  title: 'Analisis Data & Pengolahan Lembar Kerja (Spreadsheet)',
  element: 'AD',
  classLevel: 'SMA',
  curriculum: 'Kurikulum Merdeka (SMA)',
  estimatedMinutes: 40,
  iconName: 'Database',
  coverImage: SMA_IMAGES.bab5_ad,
  summary: 'Mengenal konsep data dan informasi, mengolah data menggunakan aplikasi lembar kerja (Spreadsheet/Excel/Google Sheets) dengan rumus dasar (SUM, AVERAGE, MAX, MIN, COUNT), serta membuat visualisasi grafik yang tepat.',
  learningObjectives: [
    'Membedakan antara data mentah dan informasi yang memiliki makna bagi siswa SMA.',
    'Mengenal struktur lembar kerja: Baris (Row), Kolom (Column), dan alamat Sel (Cell).',
    'Menggunakan rumus formula dasar pengolahan data: =SUM, =AVERAGE, =MAX, =MIN, dan =COUNT.',
    'Membuat dan membaca grafik visual (Diagram Batang, Garis, dan Lingkaran) untuk menarik kesimpulan yang tepat.'
  ],
  galleryImages: [
    {
      id: 'img-ad-sma-1',
      url: SMA_IMAGES.bab5_ad,
      caption: 'Praktikum Siswa SMA: Analisis data survei sekolah, pengolahan tabel spreadsheet, dan visualisasi grafik perbandingan kategori di lab.',
      alt: 'Foto Praktikum Siswa-Siswi SMA Analisis Data & Visualisasi',
      source: 'Dokumentasi Laboratorium Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Analisis Data', 'Excel', 'Spreadsheet', 'Grafik'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-ad-sma-2',
      url: SMA_IMAGES.bab5_ad_alt,
      caption: 'Praktikum Pengolahan Angka Siswa SMA: Penerapan fungsi rumus statistik (=SUM, =AVERAGE, =MAX, =MIN, =COUNT) dan format tabel kondisional.',
      alt: 'Foto Siswa SMA Praktikum Spreadsheet & Rumus',
      source: 'Laboratorium Komputer SMA Kurikulum Merdeka',
      tags: ['Siswa SMA', 'Praktikum', 'Formula Statistik', 'Pengolahan Data'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-ad-sma-3',
      url: SMA_IMAGES.bab5_data_students,
      caption: 'Praktikum Kolaboratif Siswa SMA: Presentasi temuan tren data menggunakan diagram batang dan pie chart interaktif di depan kelas.',
      alt: 'Foto Siswa-Siswi SMA Analisis Grafik & Data',
      source: 'Dokumentasi Praktik Analisis Data Siswa SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Visualisasi Grafik', 'Presentasi Data'],
      aspectRatio: '16:9'
    }
  ],
  sections: [
    {
      id: 'sec-5-1',
      title: '1. Mengenal Data dan Informasi di Sekitar Kita',
      estimatedMinutes: 10,
      keyPoints: [
        'Data adalah fakta mentah berupa angka, kata-kata, atau simbol yang belum diolah dan belum memiliki arti yang jelas.',
        'Informasi adalah data yang sudah diolah dan dianalisis sehingga memiliki makna dan berguna untuk pengambilan keputusan.',
        'Data Angka (Kuantitatif): Data yang berupa bilangan dan dapat dihitung (contoh: tinggi badan 155 cm, nilai ujian 88, uang jajan Rp 10.000).',
        'Data Teks/Kategori (Kualitatif): Data yang berupa kata-kata sifat atau kelompok (contoh: pilihan ekstrakurikuler, warna seragam, hobi membaca).',
        'Cara mengumpulkan data sederhana: menyebarkan angket kuesioner ke teman sekelas, mencatat presensi harian, atau mengukur berat badan di UKS.'
      ],
      content: `## Apa Perbedaan Data dan Informasi?

Pernahkah kamu melihat catatan angka acak seperti ini di secarik kertas:  
**\`80, 75, 90, 85, 95, 70\`**?

Jika hanya melihat deretan angka itu, kita mungkin bingung: *"Ini nomor sepatu siapa? Atau harga gorengan? Atau ukuran celana?"*  
Itulah yang disebut **DATA MENTAH** — fakta yang belum diberi penjelasan.

Tetapi jika kita menambahkan judul dan mengolahnya:  
*"Rata-rata Nilai Ulangan Harian Informatika Kelas 8-1 adalah 82,5 (Kategori: Sangat Baik)"*  
Sekarang deretan angka tadi berubah menjadi **INFORMASI** yang sangat jelas dan berguna bagi ibu guru dan siswa!

---

### Perbandingan: Data vs Informasi

\`\`\`
   [ DATA MENTAH ]                      [ PENGOLAHAN ]                  [ INFORMASI BERMAKNA ]
   +-----------------------+            +-----------------+             +-----------------------------+
   | Angka nilai:          | ---------> | Dihitung rata-  | ----------> | "Seluruh siswa kelas 8-1    |
   | 80, 85, 90, 95, 88    |            | rata dan nilai  |             | tuntas KKM dengan rata-rata |
   |                       |            | tertingginya    |             | nilai 87,6!"                |
   +-----------------------+            +-----------------+             +-----------------------------+
\`\`\`

---

### Dua Jenis Data yang Sering Kita Temui di Sekolah:

1. **Data Angka (*Kuantitatif*)**:
   Data yang berupa angka numerik dan bisa kita hitung dengan matematika.
   - Contoh: Tinggi badan siswa (155 cm, 160 cm), nilai ulangan matematika (90), jumlah halaman buku (120 lembar).

2. **Data Kategori / Sifat (*Kualitatif*)**:
   Data yang berupa penjelasan tulisan atau pilihan kategori.
   - Contoh: Pilihan ekstrakurikuler (Pramuka, Futsal, Musik), golongan darah (A, B, AB, O), jenis kelamin (Laki-laki / Perempuan).`,
      realWorldAnalogy: {
        title: 'Bahan Kue Mentah vs Kue Ulang Tahun',
        story: 'Data mentah itu seperti tepung terigu, telur, dan gula pasir yang masih terpisah di atas meja: kita belum bisa langsung memakannya. Tetapi setelah ibu mencampur adonan dan memanggangnya di oven (proses pengolahan data), jadilah kue bolu cokelat yang lezat dan siap dinikmati bersama (informasi bermakna).',
        takeaway: 'Data membutuhkan pengolahan yang tepat agar dapat dipahami dan bermanfaat bagi orang lain.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Tentukan Tujuan', detail: 'Ketahui apa yang ingin kamu cari tahu (misal: ekstrakurikuler apa yang paling disukai siswa kelas 8).' },
        { step: 2, title: 'Kumpulkan Data', detail: 'Tanyakan ke teman-teman sekelas dan catat jawabannya di lembar kertas atau formulir online.' },
        { step: 3, title: 'Kelompokkan Data', detail: 'Hitung berapa banyak teman yang memilih Futsal, Tari, atau PMR.' },
        { step: 4, title: 'Tuliskan Kesimpulan', detail: 'Sampaikan hasilnya dalam bentuk kalimat informasi yang ringkas dan jelas.' }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap data dan informasi adalah dua kata yang artinya sama persis.',
          correction: 'Data adalah bahan mentahnya, sedangkan informasi adalah hasil olahan yang sudah memiliki arti bagi pembaca.',
          why: 'Data tanpa pengolahan belum bisa dijadikan dasar untuk mengambil keputusan.'
        }
      ],
      examTips: 'Jika soal memberikan deretan angka tanpa keterangan -> itu DATA. Jika sudah ada kesimpulan hasil analisis -> itu INFORMASI.',
      interactiveDemo: 'data-chart-visualizer',
      glossaryTerms: [
        { term: 'Data', definition: 'Fakta mentah berupa angka atau karakter yang belum diproses dan belum bermakna.' },
        { term: 'Informasi', definition: 'Hasil olahan data yang sudah memiliki arti dan berguna bagi penerimanya.' },
        { term: 'Kuantitatif', definition: 'Jenis data yang berbentuk angka atau bilangan yang dapat dihitung.' },
        { term: 'Kualitatif', definition: 'Jenis data yang berbentuk kata-kata deskriptif atau kategori bukan angka.' }
      ]
    },
    {
      id: 'sec-5-2',
      title: '2. Mengolah Data dengan Lembar Kerja (Spreadsheet)',
      estimatedMinutes: 15,
      keyPoints: [
        'Aplikasi Lembar Kerja (Spreadsheet) seperti Microsoft Excel atau Google Sheets digunakan untuk menata dan menghitung angka secara otomatis.',
        'Lembar kerja tersusun dari Kolom (tegak/vertikal dengan huruf A, B, C) dan Baris (mendatar/horizontal dengan angka 1, 2, 3).',
        'Pertemuan antara kolom dan baris disebut Sel (Cell), misalnya pertemuan kolom B dan baris 3 dinamakan Sel B3.',
        'Penulisan rumus formula di lembar kerja SELALU diawali dengan tanda sama dengan (=).',
        '5 Rumus Dasar Wajib: =SUM() (menjumlahkan), =AVERAGE() (rata-rata), =MAX() (nilai tertinggi), =MIN() (nilai terendah), dan =COUNT() (menghitung jumlah data).'
      ],
      content: `## Cara Menggunakan Aplikasi Lembar Kerja (Spreadsheet)

Pernahkah kamu melihat tabel rapi dengan ratusan kotak-kotak kecil di komputer? Itulah aplikasi **Lembar Kerja (*Spreadsheet*)**, seperti **Microsoft Excel** atau **Google Sheets**.

Spreadsheet adalah alat ajaib! Jika kamu mengubah satu angka nilai siswa, semua total dan nilai rata-ratanya akan langsung berubah secara otomatis dalam sekejap tanpa perlu dihitung ulang pakai kalkulator.

---

### Mengenal Struktur Lembar Kerja: Kolom, Baris, dan Sel

\`\`\`
          KOLOM A          KOLOM B          KOLOM C
       +----------------+----------------+----------------+
BARIS 1| Nama Siswa     | Nilai Tugas    | Nilai Ujian    |
       +----------------+----------------+----------------+
BARIS 2| Alifia         | 85             | 90             |
       +----------------+----------------+----------------+
BARIS 3| Budi           | [ 78 ]         | 82             |  <-- Kotak [ 78 ] ini adalah SEL B3!
       +----------------+----------------+----------------+
BARIS 4| Cantika        | 92             | 88             |
       +----------------+----------------+----------------+
\`\`\`

- **Kolom (*Column*)**: Bagian yang membujur **tegak lurus (vertikal)**, ditandai dengan huruf: **A, B, C, D, ...**
- **Baris (*Row*)**: Bagian yang membujur **mendatar (horizontal)**, ditandai dengan angka: **1, 2, 3, 4, ...**
- **Sel (*Cell*)**: Kotak pertemuan antara kolom dan baris. Ditulis dengan huruf kolom dulu lalu nomor baris. Contoh: **B3** artinya kolom B baris 3.
- **Rentang (*Range*)**: Kumpulan beberapa sel berurutan, ditulis dengan tanda titik dua (:). Contoh: **B2:B4** artinya dari sel B2 sampai sel B4.

---

### 5 Rumus Sakti Spreadsheet untuk Siswa SMA

> ⚠️ **ATURAN EMAS:** Setiap kali menulis rumus di lembar kerja, kamu **WAJIB mengawalinya dengan tanda sama dengan (\`=\`)**! Jika tidak ada tanda \`=\`, komputer hanya menganggapnya tulisan biasa.

| Nama Rumus | Bentuk Penulisan | Fungsi Utama | Contoh Kasus di Sekolah |
| :--- | :--- | :--- | :--- |
| **SUM** | \`=SUM(B2:B10)\` | Menjumlahkan total semua angka | Menghitung total uang kas kelas yang terkumpul |
| **AVERAGE** | \`=AVERAGE(B2:B10)\` | Menghitung nilai rata-rata | Mengetahui nilai rata-rata ulangan harian kelas 8 |
| **MAX** | \`=MAX(B2:B10)\` | Mencari angka paling tinggi (*Maksimum*) | Mengetahui nilai tertinggi yang diraih siswa |
| **MIN** | \`=MIN(B2:B10)\` | Mencari angka paling rendah (*Minimum*) | Mengetahui nilai terendah untuk bahan evaluasi guru |
| **COUNT** | \`=COUNT(B2:B10)\` | Menghitung banyaknya data angka | Menghitung jumlah siswa yang sudah mengumpulkan tugas |`,
      realWorldAnalogy: {
        title: 'Kotak Loker Siswa di Sekolah',
        story: 'Setiap loker di lorong sekolah memiliki kode unik: Gedung B Loker Nomor 3 (B3). Jika kamu ingin menitipkan buku ke temanmu, kamu tinggal bilang "Bukunya sudah aku taruh di loker B3 ya!". Di spreadsheet, sel B3 bekerja persis seperti loker tersebut: tempat menyimpan data pada alamat yang pasti.',
        takeaway: 'Alamat sel memudahkan komputer mengambil dan menghitung data dengan akurat tanpa tertukar.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Pilih Sel Tujuan', detail: 'Klik sel tempat hasil hitungan ingin ditampilkan (misal di sel B5).' },
        { step: 2, title: 'Ketik Tanda Sama Dengan (=)', detail: 'Awali penulisan dengan tanda = (contoh: =AVERAGE).' },
        { step: 3, title: 'Buka Kurung dan Blok Sel', detail: 'Ketik tanda buka kurung (, lalu sorot sel yang ingin dihitung (misal B2:B4).' },
        { step: 4, title: 'Tutup Kurung dan Tekan Enter', detail: 'Ketik tanda tutup kurung ) lalu tekan tombol Enter di keyboard. Hasil langsung muncul!' }
      ],
      commonMistakes: [
        {
          mistake: 'Lupa menulis tanda sama dengan (=) di depan rumus.',
          correction: 'Selalu awali dengan tanda =. Menulis SUM(B2:B5) tanpa tanda sama dengan hanya akan memunculkan tulisan teks biasa di dalam sel.',
          why: 'Tanda sama dengan adalah sinyal bagi komputer untuk mulai melakukan perhitungan matematika.'
        },
        {
          mistake: 'Menulis rumus rata-rata dengan kata "RATA" atau "MEAN".',
          correction: 'Di Microsoft Excel dan Google Sheets, rumus bahasa Inggris resmi untuk rata-rata adalah =AVERAGE().',
          why: 'Aplikasi spreadsheet menggunakan standar istilah fungsi internasional.'
        }
      ],
      examTips: 'Ingat fungsi dasar: SUM = Jumlah total. AVERAGE = Nilai rata-rata. MAX = Nilai tertinggi. MIN = Nilai terendah.',
      interactiveDemo: 'data-chart-visualizer',
      codeExamples: [
        {
          title: 'Simulasi Perhitungan Nilai Rata-rata Siswa (Python)',
          language: 'python',
          code: `# Menghitung nilai ujian siswa seperti rumus spreadsheet
nilai_siswa = [80, 85, 90, 75, 95]

# 1. Menghitung Total Nilai (Mirip =SUM)
total_nilai = sum(nilai_siswa)
print("Total Nilai Siswa (SUM)     :", total_nilai)

# 2. Menghitung Jumlah Siswa (Mirip =COUNT)
jumlah_siswa = len(nilai_siswa)
print("Jumlah Siswa (COUNT)        :", jumlah_siswa, "orang")

# 3. Menghitung Rata-rata Nilai (Mirip =AVERAGE)
rata_rata = total_nilai / jumlah_siswa
print("Nilai Rata-rata (AVERAGE)   :", rata_rata)

# 4. Mencari Nilai Tertinggi dan Terendah (MAX & MIN)
print("Nilai Tertinggi (MAX)       :", max(nilai_siswa))
print("Nilai Terendah (MIN)        :", min(nilai_siswa))`,
          output: `Total Nilai Siswa (SUM)     : 425
Jumlah Siswa (COUNT)        : 5 orang
Nilai Rata-rata (AVERAGE)   : 85.0
Nilai Tertinggi (MAX)       : 95
Nilai Terendah (MIN)        : 75`,
          explanation: 'Program ini menunjukkan cara komputer menghitung total, rata-rata, nilai tertinggi, dan terendah persis seperti rumus spreadsheet.'
        }
      ],
      glossaryTerms: [
        { term: 'Spreadsheet', definition: 'Aplikasi perangkat lunak untuk mengolah data dalam bentuk baris dan kolom tabel.' },
        { term: 'Sel (Cell)', definition: 'Kotak persegi tempat perpotongan antara baris dan kolom di lembar kerja.' },
        { term: 'Formula', definition: 'Persamaan matematika yang diawali tanda sama dengan (=) untuk menghitung nilai di sel.' },
        { term: 'Range', definition: 'Sekelompok sel yang dipilih bersama-sama, contohnya A1:A10.' }
      ]
    },
    {
      id: 'sec-5-3',
      title: '3. Visualisasi Data Menjadi Grafik & Menarik Kesimpulan',
      estimatedMinutes: 15,
      keyPoints: [
        'Visualisasi data adalah cara menyajikan data angka dalam bentuk gambar atau diagram grafik agar mudah dan cepat dipahami orang lain.',
        'Diagram Batang (Bar Chart): Sangat cocok untuk membandingkan jumlah data antar kategori yang berbeda (misal: jumlah peminat ekstrakurikuler).',
        'Diagram Garis (Line Chart): Sangat cocok untuk melihat perkembangan tren naik atau turun dari waktu ke waktu (misal: suhu tubuh atau nilai dari bulan ke bulan).',
        'Diagram Lingkaran (Pie Chart): Sangat cocok untuk melihat persentase porsi pembagian dari total 100% (misal: pembagian uang saku).',
        'Menarik kesimpulan dilakukan dengan melihat puncak tertinggi, titik terendah, atau pola kenaikan pada grafik.'
      ],
      content: `## Mengubah Angka Menjadi Grafik yang Menarik

Ada pepatah mengatakan: *"Satu gambar bernilai seribu kata"*.

Jika kamu menunjukkan tabel berisi 100 baris angka kepada teman-temanmu di depan kelas, mereka mungkin akan merasa bosan atau mengantuk. Tetapi jika kamu mengubah tabel angka tersebut menjadi **Grafik Warna-Warni**, teman-teman dan gurumu bisa langsung memahami hasilnya dalam hitungan detik!

---

### 3 Jenis Grafik Utama dan Kapan Menggunakannya:

\`\`\`
   1. DIAGRAM BATANG (BAR CHART)           2. DIAGRAM GARIS (LINE CHART)           3. DIAGRAM LINGKARAN (PIE)
   (Membandingkan Kategori)                (Melihat Tren Waktu Naik/Turun)         (Porsi dari Total 100%)
   
       Jumlah Siswa                            Nilai Ulangan                           Persentase Uang Jajan
       |                                       |                                                .-'-.
    30 |      [====]                        90 |            *                                 /Tabung\\ Belanja
       |      |    |                           |          /   \\                              |  30%   |  70%  |
    20 | [==] |    | [====]                 80 |    *---*       *                             \\      /
       | |  | |    | |    |                    |   /                                           '-...-'
    10 | |  | |    | |    |                 70 | *
       +-----------------------                +-----------------------
          PMR Futsal Robotik                     Jan Feb Mar Apr Mei
\`\`\`

1. **Diagram Batang (*Bar / Column Chart*)**:
   - **Tujuan**: Membandingkan jumlah antar kategori yang berbeda.
   - **Contoh**: Membandingkan berapa banyak siswa yang memilih ekskul PMR (15 orang), Futsal (30 orang), dan Robotik (22 orang). Batang yang paling tinggi langsung terlihat jelas!

2. **Diagram Garis (*Line Chart*)**:
   - **Tujuan**: Melihat perubahan nilai atau tren naik-turun dari waktu ke waktu secara berurutan.
   - **Contoh**: Memantau nilai ulangan Informatika Doni dari bulan Januari (70), Februari (80), Maret (80), April (92), dan Mei (88). Garis naik menunjukkan prestasi belajar yang meningkat!

3. **Diagram Lingkaran (*Pie Chart*)**:
   - **Tujuan**: Melihat pembagian persentase atau porsi potongan kue dari total keseluruhan 100%.
   - **Contoh**: Penggunaan uang saku harian siswa: 70% untuk makan siang, 20% untuk ongkos transportasi, dan 10% untuk tabungan kelas.

---

### Cara Menarik Kesimpulan dari Grafik:
Saat melihat sebuah grafik, tanyakan 3 hal ini pada dirimu:
1. **Bagian mana yang paling tinggi / paling banyak?** (Contoh: *"Ekskul Futsal memiliki peminat terbanyak"*).
2. **Bagian mana yang paling rendah / paling sedikit?** (Contoh: *"Ekskul PMR memiliki peminat paling sedikit"*).
3. **Apakah ada tren yang naik atau turun?** (Contoh: *"Nilai rata-rata kelas terus meningkat sejak bulan Februari"*).`,
      realWorldAnalogy: {
        title: 'Lampu Indikator Baterai Smartphone',
        story: 'Di sudut layar HP-mu, ada ikon baterai berwarna hijau. Kamu tidak perlu membaca tulisan rumit "Tegangan 3.85 Volt, Arus 2400 mAh". Kamu cukup melihat gambar balok baterai yang tinggal sedikit dan berwarna merah untuk tahu kesimpulannya: "Baterai mau habis, segera colokkan charger!"',
        takeaway: 'Grafik dan visualisasi membuat informasi penting dapat dipahami secara instan.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Siapkan Tabel Data', detail: 'Pastikan tabel memiliki judul kolom kategori dan angka yang rapi.' },
        { step: 2, title: 'Sorot Data yang Ingin Digambar', detail: 'Pilih sel data beserta nama label kategorinya.' },
        { step: 3, title: 'Pilih Jenis Grafik', detail: 'Pilih Insert -> Chart, lalu tentukan Bar Chart, Line Chart, atau Pie Chart sesuai kebutuhan.' },
        { step: 4, title: 'Beri Judul yang Jelas', detail: 'Tuliskan judul di bagian atas grafik agar pembaca tahu maksud diagram tersebut.' }
      ],
      commonMistakes: [
        {
          mistake: 'Menggunakan diagram lingkaran (Pie Chart) untuk membandingkan 20 kategori yang sangat banyak.',
          correction: 'Jika kategorinya terlalu banyak, potongan diagram lingkaran akan menjadi sangat tipis dan sulit dibaca. Gunakan Diagram Batang jika kategorinya lebih dari 5.',
          why: 'Diagram lingkaran paling ideal hanya untuk 2 sampai 5 bagian kategori saja.'
        }
      ],
      examTips: 'Jika soal menanyakan grafik untuk melihat perubahan dari bulan ke bulan atau waktu ke waktu -> pilih DIAGRAM GARIS. Jika untuk membandingkan ekskul atau hobi -> pilih DIAGRAM BATANG.',
      interactiveDemo: 'data-chart-visualizer',
      glossaryTerms: [
        { term: 'Visualisasi Data', definition: 'Teknik menyajikan data numerik ke dalam bentuk grafik atau diagram agar mudah dipahami.' },
        { term: 'Diagram Batang (Bar Chart)', definition: 'Grafik dengan persegi panjang tegak atau mendatar untuk membandingkan jumlah data antar kategori.' },
        { term: 'Diagram Garis (Line Chart)', definition: 'Grafik berupa titik-titik yang dihubungkan garis untuk memperlihatkan perubahan data dari waktu ke waktu.' },
        { term: 'Diagram Lingkaran (Pie Chart)', definition: 'Grafik berbentuk lingkaran yang dibagi menjadi juring-juring untuk menunjukkan persentase bagian dari keseluruhan.' }
      ]
    }
  ],
  videoTutorialId: 'vid-5',
  questions: [
    {
      id: 'q-5-1',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Pada aplikasi lembar kerja (Spreadsheet), kotak perpotongan antara Kolom C dan Baris 4 dinamakan alamat sel...',
      options: ['Sel 4C', 'Sel C4', 'Sel C-4', 'Sel Baris C'],
      correctAnswer: 1,
      hint: 'Penulisan alamat sel selalu diawali huruf kolom terlebih dahulu baru diikuti nomor baris.',
      explanation: 'Alamat sel pada spreadsheet ditulis dengan menyebutkan huruf kolom terlebih dahulu lalu nomor barisnya, sehingga perpotongan kolom C dan baris 4 disebut Sel C4.',
      learningObjective: 'Memahami cara membaca alamat sel pada aplikasi spreadsheet.'
    },
    {
      id: 'q-5-2',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Rumus fungsi apakah yang digunakan di aplikasi spreadsheet untuk menghitung nilai RATA-RATA dari sekumpulan data siswa pada sel B2 sampai B10?',
      options: [
        '=SUM(B2:B10)',
        '=AVERAGE(B2:B10)',
        '=MAX(B2:B10)',
        '=COUNT(B2:B10)'
      ],
      correctAnswer: 1,
      hint: 'Rumus ini menggunakan kata dalam bahasa Inggris yang artinya rata-rata.',
      explanation: '=AVERAGE(B2:B10) adalah rumus fungsi standar untuk menghitung nilai rata-rata. =SUM untuk jumlah total, =MAX untuk nilai tertinggi, dan =COUNT untuk menghitung banyaknya data.',
      learningObjective: 'Menerapkan rumus formula pengolah angka dasar.'
    },
    {
      id: 'q-5-3',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Jika kamu diminta oleh wali kelas untuk membuat grafik yang memperlihatkan kenaikan dan penurunan nilai ulangan harianmu dari bulan Januari sampai bulan Mei, jenis grafik manakah yang PALING TEPAT untuk digunakan?',
      options: [
        'Diagram Lingkaran (Pie Chart)',
        'Diagram Garis (Line Chart)',
        'Diagram Batang (Bar Chart)',
        'Diagram Gambar (Piktogram)'
      ],
      correctAnswer: 1,
      hint: 'Grafik ini menghubungkan titik-titik nilai dari waktu ke waktu sehingga memperlihatkan tren naik atau turun.',
      explanation: 'Diagram Garis (Line Chart) adalah pilihan terbaik untuk menampilkan data yang berubah secara berkelanjutan dari waktu ke waktu (seperti data bulanan dari Januari hingga Mei).',
      learningObjective: 'Memilih jenis grafik visualisasi data yang sesuai dengan karakteristik data.'
    },
    {
      id: 'q-5-4',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Pada aplikasi spreadsheet, sel C2 berisi formula logika: =IF(B2>=75, "Kompeten", "Remedial"). Jika nilai pada sel B2 adalah angka 80, apakah teks yang akan muncul di sel C2?',
      options: [
        '"Kompeten"',
        '"Remedial"',
        '80',
        'Error #VALUE!'
      ],
      correctAnswer: 0,
      hint: 'Evaluasi kondisi logika: apakah 80 >= 75? Jika Benar (True), rumus mengambil argumen kedua ("Kompeten").',
      explanation: 'Fungsi IF mengevaluasi ekspresi B2>=75. Karena 80 >= 75 bernilai True, fungsi akan menghasilkan nilai jika benar, yaitu "Kompeten".',
      learningObjective: 'Menerapkan formula fungsi logika IF pada lembar kerja spreadsheet.'
    },
    {
      id: 'q-5-5',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Guru informatika ingin menghitung berapa banyak siswa yang mendapatkan predikat nilai "A" pada rentang sel D2 sampai D35. Rumus fungsi spreadsheet yang tepat adalah...',
      options: [
        '=COUNTIF(D2:D35, "A")',
        '=SUMIF(D2:D35, "A")',
        '=COUNT(D2:D35)',
        '=AVERAGEIF(D2:D35, "A")'
      ],
      correctAnswer: 0,
      hint: 'Rumus ini menghitung frekuensi sel (COUNT) berdasarkan kriteria tertentu (IF).',
      explanation: '=COUNTIF(range, criteria) digunakan untuk mencacah jumlah sel yang memenuhi kondisi spesifik, seperti mencari sel bernilai teks "A" pada rentang D2:D35.',
      learningObjective: 'Menggunakan rumus COUNTIF untuk analisis frekuensi data kategorik.'
    },
    {
      id: 'q-5-6',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Sebelum data survei minat belajar siswa diolah, ditemukan beberapa baris sel yang kosong (missing value) dan format tulisan yang tidak konsisten (misalnya "Jkt", "Jakarta", dan "JAKARTA"). Proses merapikan dan menstandarkan data mentah tersebut disebut...',
      options: [
        'Pembersihan Data (Data Cleaning)',
        'Pengumpulan Data (Data Collection)',
        'Visualisasi Data (Data Visualization)',
        'Pemodelan Artificial Intelligence'
      ],
      correctAnswer: 0,
      hint: 'Proses ini "membersihkan" anomali, duplikasi, dan inkonsistensi agar data siap dianalisis dengan akurat.',
      explanation: 'Pembersihan Data (Data Cleaning/Scrubbing) adalah tahap krusial dalam siklus analisis data untuk menangani nilai kosong, menghapus duplikasi, dan menstandarkan format data sebelum pemodelan.',
      learningObjective: 'Memahami pentingnya tahap Pembersihan Data (Data Cleaning) dalam analisis data.'
    },
    {
      id: 'q-5-7',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Jika kamu ingin menyajikan proporsi persentase pilihan ekstrakurikuler seluruh siswa kelas 10 (Pramuka 40%, Futsal 35%, PMR 15%, Robotik 10%) dari total 100%, jenis diagram manakah yang PALING SESUAI?',
      options: [
        'Diagram Lingkaran (Pie Chart)',
        'Diagram Garis (Line Chart)',
        'Diagram Pencar (Scatter Plot)',
        'Diagram Kontur 3D'
      ],
      correctAnswer: 0,
      hint: 'Diagram ini membagi satu lingkaran utuh menjadi juring-juring persentase dari total 100%.',
      explanation: 'Diagram Lingkaran (Pie Chart) sangat cocok untuk memperlihatkan proporsi dan kontribusi bagian-bagian terhadap satu kesatuan total (100%).',
      learningObjective: 'Memilih visualisasi yang tepat untuk data proporsi persentase.'
    },
    {
      id: 'q-5-8',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Diberikan sekumpulan data nilai kuis terurut dari 7 siswa: [70, 75, 80, 80, 85, 90, 100]. Berapakah nilai Median (nilai tengah) dan Modus (nilai yang paling sering muncul) dari data tersebut?',
      options: [
        'Median = 80 dan Modus = 80',
        'Median = 85 dan Modus = 80',
        'Median = 80 dan Modus = 90',
        'Median = 82.8 dan Modus = 70'
      ],
      correctAnswer: 0,
      hint: 'Data ganjil n=7 memiliki nilai tengah pada urutan ke-4. Angka yang muncul 2 kali adalah 80.',
      explanation: 'Untuk 7 data terurut, Median adalah data ke-(7+1)/2 = data ke-4, yaitu 80. Modus adalah angka yang paling sering muncul, yaitu 80 (muncul 2 kali).',
      learningObjective: 'Menghitung ukuran pemusatan data (Mean, Median, Modus) dalam statistik deskriptif.'
    },
    {
      id: 'q-5-9',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Pada spreadsheet, formula =VLOOKUP(A2, DaftarBarang, 2, FALSE) memiliki argumen terakhir "FALSE". Apakah tujuan dari parameter FALSE tersebut?',
      options: [
        'Memastikan pencarian data mencocokkan kata kunci secara persis (Exact Match)',
        'Membuat rumus menghasilkan nilai acak',
        'Menonaktifkan rumus jika terjadi kesalahan',
        'Mengurutkan tabel secara otomatis dari Z ke A'
      ],
      correctAnswer: 0,
      hint: 'FALSE (atau angka 0) pada VLOOKUP memberitahu komputer agar tidak mencari nilai perkiraan, melainkan harus cocok 100%.',
      explanation: 'Parameter range_lookup bernilai FALSE mewajibkan VLOOKUP menemukan kecocokan persis (Exact Match). Jika kata kunci tidak ada, fungsi akan mengembalikan error #N/A.',
      learningObjective: 'Memahami sintaks dan parameter fungsi pencarian vertikal VLOOKUP.'
    },
    {
      id: 'q-5-10',
      moduleId: 'mod-5',
      element: 'AD',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Pada catatan data berat badan siswa kelas 10 (dalam kg): [50, 52, 55, 58, 54, 520, 60]. Nilai "520" sangat tidak wajar dan diduga terjadi karena salah ketik saat input. Dalam analisis data, data yang nilainya menyimpang ekstrem jauh dari sebaran data lainnya dinamakan...',
      options: [
        'Pencilan (Outlier)',
        'Modus Normal',
        'Korelasi Positif',
        'Parameter Standar'
      ],
      correctAnswer: 0,
      hint: 'Istilah statistika untuk data pencilan yang "berbaring di luar" rentang wajar kelompok data.',
      explanation: 'Pencilan (Outlier) adalah titik data yang berjarak sangat jauh dari nilai-nilai pengamatan lainnya. Outlier bisa terjadi karena kesalahan pengukuran/input atau fenomena langka.',
      learningObjective: 'Mengidentifikasi keberadaan pencilan (outlier) dan dampaknya terhadap analisis data.'
    }
  ]
};
