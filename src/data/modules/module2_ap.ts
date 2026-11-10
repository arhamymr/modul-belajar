import { InteractiveModule } from '../../types';
import { SMA_IMAGES } from '../smaImages';

export const module2_ap: InteractiveModule = {
  id: 'mod-2',
  number: 2,
  title: 'Algoritma dan Pemrograman Dasar (Python)',
  element: 'AP',
  classLevel: 'SMA',
  curriculum: 'Kurikulum Merdeka (SMA)',
  estimatedMinutes: 45,
  iconName: 'Code2',
  coverImage: SMA_IMAGES.bab2_ap,
  summary: 'Mempelajari dasar algoritma dan diagram alir (Flowchart), pengenalan variabel dan tipe data, aturan percabangan keputusan (if-else), perulangan (loop), serta pencarian data sederhana.',
  learningObjectives: [
    'Menjelaskan pengertian algoritma dan membaca simbol-simbol diagram alir (Flowchart) standar.',
    'Mengenal konsep variabel sebagai wadah penyimpan data dan macam-macam tipe data dasar di Python.',
    'Membuat program dengan percabangan logika (if-else) untuk mengambil keputusan otomatis.',
    'Menerapkan perulangan (loop) dan pencarian berurutan sederhana untuk menyelesaikan tugas dengan cepat.'
  ],
  galleryImages: [
    {
      id: 'img-ap-sma-1',
      url: SMA_IMAGES.bab2_ap,
      caption: 'Praktikum Siswa-Siswi SMA: Menulis kode program Python, menguji sintaks variabel, dan menjalankan eksekusi script di terminal lab komputer.',
      alt: 'Foto Praktikum Siswa-Siswi SMA Pemrograman Python',
      source: 'Dokumentasi Laboratorium Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Coding Python', 'Algoritma', 'Lab Komputer'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-ap-sma-2',
      url: SMA_IMAGES.bab2_ap_alt,
      caption: 'Praktikum Kolaborasi Coding Siswa SMA: Melakukan debugging program logika if-else dan pengujian fungsi perulangan bersama teman sekelompok.',
      alt: 'Foto Siswa SMA Praktikum Debugging Kode Program',
      source: 'Laboratorium Komputer SMA Kurikulum Merdeka',
      tags: ['Siswa SMA', 'Praktikum', 'Debugging', 'Pemrograman'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-ap-sma-3',
      url: SMA_IMAGES.bab2_coding_students,
      caption: 'Praktikum Mandiri Siswa SMA: Eksplorasi pembuatan aplikasi kalkulator logika sederhana dan diagram alir (Flowchart) interaktif.',
      alt: 'Foto Siswa-Siswi SMA Praktikum Mandiri Lab Komputer',
      source: 'Dokumentasi Praktik Siswa Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Python', 'Flowchart'],
      aspectRatio: '16:9'
    }
  ],
  sections: [
    {
      id: 'sec-2-1',
      title: '1. Mengenal Algoritma & Diagram Alir (Flowchart)',
      estimatedMinutes: 15,
      keyPoints: [
        'Algoritma adalah urutan langkah-langkah logis dan teratur untuk menyelesaikan suatu masalah atau mencapai suatu tujuan.',
        'Algoritma dapat ditulis dengan teks biasa (bahasa natural), kalimat terstruktur (pseudocode), atau gambar diagram alir (Flowchart).',
        'Simbol Flowchart standar: Oval (Mulai/Selesai), Jajar Genjang (Masukan/Keluaran data), Persegi Panjang (Proses/Perhitungan), dan Belah Ketupat (Keputusan/Pilihan Ya atau Tidak).',
        'Garis alir dengan tanda panah menunjukkan arah jalannya perintah dari atas ke bawah atau dari kiri ke kanan.'
      ],
      content: `## Apa itu Algoritma dan Flowchart?

Pernahkah kamu membuat secangkir teh manis hangat? Ada langkah-langkah yang harus kamu ikuti:
1. Memasukkan kantong teh ke dalam cangkir.
2. Menuangkan air panas mendidih.
3. Menunggu sampai air berubah warna cokelat kemerahan.
4. Menambahkan 2 sendok gula pasir.
5. Mengaduk teh sampai gula larut sempurna.
6. Teh manis siap dinikmati!

Urutan langkah-langkah di atas merupakan contoh nyata dari sebuah **Algoritma**, yaitu rangkaian instruksi logis, teratur, dan terencana untuk menyelesaikan suatu pekerjaan hingga selesai. Urutan langkah tersebut harus dieksekusi secara teratur dan tidak boleh terbalik—kita tentu tidak bisa mengaduk teh sebelum air panas dan gula dituangkan ke dalam cangkir! Agar algoritma dapat dipahami dan diikuti dengan mudah oleh siapa saja di seluruh dunia, kita merepresentasikannya menggunakan gambar bagan alur dengan simbol-simbol standar internasional yang disebut **Flowchart**.

\`\`\`
   +-----------------------+
   |    (  MULAI  )        | ---> SIMBOL OVAL (Terminator: Mulai / Selesai)
   +-----------------------+
               |
               v
   /-----------------------/
  /    Masukkan Nilai     /  ---> SIMBOL JAJAR GENJANG (Input / Masukan Data)
 /-----------------------/
               |
               v
             /\\
            /  \\
           / Apakah \\        ---> SIMBOL BELAH KETUPAT (Decision / Keputusan)
           \\ Nilai  /
            \\ >=75?/
             \\  /
             /  \\
     [ YA ] /    \\ [ TIDAK ]
           v      v
   /-----------/  /-----------/
  / Cetak:    /  / Cetak:    /
 / "TUNTAS!" /  / "REMEDIAL"/
/-----------/  /-----------/
      \\             /
       \\           /
        v         v
   +-----------------------+
   |   (  SELESAI  )       | ---> SIMBOL OVAL (Akhir dari program)
   +-----------------------+
\`\`\`

---

### 4 Simbol Dasar Flowchart yang Wajib Dikuasai Siswa SMA:

| Bentuk Simbol | Nama Simbol | Fungsi / Kapan Digunakan | Contoh Kalimat di Dalam Simbol |
| :--- | :--- | :--- | :--- |
| **Oval (Terminator)** | Mulai / Selesai | Menandai titik awal dimulainya program dan titik akhir selesainya program. | \`( Mulai )\` atau \`( Selesai )\` |
| **Jajar Genjang** | Input / Output | Menerima masukan dari pengguna (keyboard) atau menampilkan hasil ke layar monitor. | \`Masukkan nilai siswa\` atau \`Tampilkan "Selamat!"\` |
| **Persegi Panjang** | Proses | Melakukan perhitungan matematika atau pengolahan data di memori. | \`Luas = panjang * lebar\` atau \`Nilai = Nilai + 1\` |
| **Belah Ketupat** | Keputusan (*Decision*) | Memeriksa kondisi apakah benar (Ya) atau salah (Tidak) untuk memilih jalur selanjutnya. | \`Apakah Nilai >= 75?\` atau \`Apakah Lampu Merah?\` |`,
      realWorldAnalogy: {
        title: 'Menyeberang Jalan di Zebra Cross',
        story: 'Saat hendak menyeberang jalan, otak kita menjalankan algoritma sederhana: (1) Berdiri di tepi trotoar, (2) Melihat ke kanan dan ke kiri untuk mengecek kendaraan, (3) Apakah jalan sudah sepi? Jika YA -> Melangkah menyeberang jalan dengan aman. Jika TIDAK -> Menunggu sejenak di trotoar dan mengecek kembali.',
        takeaway: 'Setiap keputusan dalam hidup kita dapat dimodelkan menjadi diagram alur yang sangat rapi dan logis.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Tentukan Masalah', detail: 'Ketahui apa yang ingin dicapai program (contoh: menghitung luas persegi panjang).' },
        { step: 2, title: 'Tentukan Masukan (Input)', detail: 'Cari tahu data apa yang harus dimasukkan pengguna (contoh: panjang dan lebar).' },
        { step: 3, title: 'Tentukan Rumus (Proses)', detail: 'Tuliskan cara perhitungannya (contoh: luas = panjang dikali lebar).' },
        { step: 4, title: 'Tampilkan Hasil (Output)', detail: 'Keluarkan hasil hitungan ke layar agar pengguna dapat melihatnya.' }
      ],
      commonMistakes: [
        {
          mistake: 'Lupa memberi tanda panah pada garis penghubung.',
          correction: 'Garis alir selalu membutuhkan tanda panah untuk menunjukkan arah jalannya perintah.',
          why: 'Tanpa tanda panah, pembaca tidak tahu apakah alur berjalan dari atas ke bawah atau sebaliknya.'
        }
      ],
      examTips: 'Soal sering menanyakan bentuk simbol belah ketupat. Kuncinya: jika ada tanda tanya (?) atau cabang Ya/Tidak, pasti memakai simbol BELAH KETUPAT (Keputusan).',
      interactiveDemo: 'python-code-runner',
      codeExamples: [
        {
          title: 'Program Menghitung Luas Persegi Panjang (Python)',
          language: 'python',
          code: `# Program menghitung luas persegi panjang sederhana
print("=== PROGRAM HITUNG LUAS PERSEGI PANJANG ===")

# 1. Menentukan panjang dan lebar
panjang = 10
lebar = 5

# 2. Menghitung luas dengan rumus: panjang * lebar
luas = panjang * lebar

# 3. Menampilkan hasil ke layar
print("Panjang :", panjang, "cm")
print("Lebar   :", lebar, "cm")
print("Luas    :", luas, "cm persegi")`,
          output: `=== PROGRAM HITUNG LUAS PERSEGI PANJANG ===
Panjang : 10 cm
Lebar   : 5 cm
Luas    : 50 cm persegi`,
          explanation: 'Program ini melakukan 3 tahap dasar komputasi: Masukan data (panjang & lebar) -> Proses hitung (luas = panjang * lebar) -> Menampilkan keluaran (print).'
        }
      ],
      glossaryTerms: [
        { term: 'Algoritma', definition: 'Langkah-langkah teratur dan logis untuk menyelesaikan suatu pekerjaan atau persoalan.' },
        { term: 'Flowchart', definition: 'Bagan atau diagram bergambar yang memperlihatkan urutan langkah program menggunakan simbol-simbol standar.' },
        { term: 'Input', definition: 'Data atau informasi yang dimasukkan oleh pengguna ke dalam program komputer.' },
        { term: 'Output', definition: 'Hasil akhir yang ditampilkan oleh program ke layar monitor atau dicetak.' }
      ]
    },
    {
      id: 'sec-2-2',
      title: '2. Variabel, Tipe Data & Percabangan Keputusan (If-Else)',
      estimatedMinutes: 15,
      keyPoints: [
        'Variabel adalah tempat di dalam memori komputer yang diberi nama untuk menyimpan suatu nilai atau data.',
        'Tipe data dasar di Python: Teks (String), Bilangan Bulat (Integer), Bilangan Desimal (Float), dan Benar/Salah (Boolean).',
        'Percabangan (If-Else) memungkinkan program mengambil tindakan yang berbeda tergantung pada kondisi yang terjadi.',
        'Operator perbandingan dasar: > (lebih besar), < (lebih kecil), == (sama dengan), >= (lebih besar atau sama dengan), != (tidak sama dengan).'
      ],
      content: `## Variabel & Percabangan Keputusan (If-Else)

Bayangkan sebuah **kotak kardus** yang kamu beri label tulisan di luarnya, misalnya label: **\`"nama_siswa"\`**. Ke dalam kotak itu, kamu memasukkan selembar kertas bertuliskan **\`"Alifia"\`**. 

Di dalam pemrograman komputer, kotak kardus itu disebut **Variabel**! Kita bisa mengubah isi di dalam kotak tersebut kapan saja sesuai kebutuhan program.

---

### Mengenal 4 Tipe Data Utama di Komputer

Setiap data memiliki jenis yang berbeda-beda:
1. **String (Teks / Tulisan)**: Selalu diapit tanda petik. Contoh: \`"Dimas Arya"\`, \`"Kelas 8"\`, \`"SMA Prestasi Bangsa"\`.
2. **Integer (Bilangan Bulat)**: Angka bulat tanpa koma. Contoh: \`15\`, \`90\`, \`-5\`.
3. **Float (Bilangan Desimal / Pecahan)**: Angka yang memakai tanda titik sebagai koma. Contoh: \`3.14\`, \`85.5\`, \`160.2\`.
4. **Boolean (Nilai Logika)**: Hanya ada dua kemungkinan, yaitu **\`True\`** (Benar) atau **\`False\`** (Salah).

\`\`\`python
nama_siswa = "Alifia"     # Tipe data String (Teks)
umur = 14                # Tipe data Integer (Bilangan Bulat)
tinggi_badan = 158.5     # Tipe data Float (Bilangan Desimal)
sudah_mengerjakan_tugas = True  # Tipe data Boolean (Benar/Salah)
\`\`\`

---

### Percabangan Logika: Membuat Komputer Bisa Mengambil Keputusan!

Bagaimana cara komputer tahu kapan harus memberikan ucapan *"Selamat, Kamu Tuntas!"* dan kapan harus menyuruh *"Silakan Ikut Remedial"*? Komputer menggunakan perintah **\`if\`** (jika) dan **\`else\`** (selain itu).

\`\`\`python
nilai_ulangan = 85

if nilai_ulangan >= 75:
    print("Selamat, nilai kamu tuntas! Hebat sekali.")
else:
    print("Jangan berkecil hati, ayo pelajari kembali dan ikuti remedial.")
\`\`\`

Jika nilai ulangan adalah 85, maka kondisi \`nilai_ulangan >= 75\` bernilai **True (Benar)**, sehingga komputer mencetak kalimat pertama. Sangat mudah, bukan?`,
      realWorldAnalogy: {
        title: 'Mengecek Saldo Kartu Bus Sekolah',
        story: 'Saat menempelkan kartu bus sekolah di pintu masuk bus: Sistem mengecek: Apakah saldo kartu >= Rp 2.000? Jika YA, pintu terbuka dan layar berbunyi "Silakan Masuk". Jika TIDAK, pintu tetap tertutup dan lampu merah menyala tanda saldo habis.',
        takeaway: 'Percabangan if-else adalah otak di balik semua sistem otomatis yang kita gunakan sehari-hari.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Buat Variabel', detail: 'Tentukan nama variabel yang jelas, misalnya nilai = 80.' },
        { step: 2, title: 'Tulis Kondisi If', detail: 'Tulis kondisi yang ingin diuji, misalnya if nilai >= 75: (jangan lupa titik dua di akhir).' },
        { step: 3, title: 'Beri Perintah Menjorok (Indentasi)', detail: 'Beri spasi/tab pada baris instruksi di bawah if agar Python tahu instruksi itu milik blok if.' },
        { step: 4, title: 'Tulis Alternatif Else', detail: 'Tulis else: untuk perintah jika kondisi di atas tidak terpenuhi.' }
      ],
      commonMistakes: [
        {
          mistake: 'Lupa menulis tanda titik dua (:) di akhir baris if atau else.',
          correction: 'Di bahasa Python, setiap baris if dan else wajib diakhiri dengan tanda titik dua (:).',
          why: 'Tanda titik dua menandakan bahwa baris berikutnya adalah tindakan yang akan dijalankan.'
        }
      ],
      examTips: 'Ingat operator perbandingan: tanda == (sama dengan ganda) digunakan untuk memeriksa apakah dua nilai bernilai sama. Contoh: if password == "1234":.',
      interactiveDemo: 'python-code-runner',
      codeExamples: [
        {
          title: 'Program Menentukan Tiket Bioskop Berdasarkan Usia (Python)',
          language: 'python',
          code: `# Program menentukan kategori tiket film
nama = "Budi"
usia = 13

print("Nama Penonton :", nama)
print("Usia          :", usia, "tahun")

if usia >= 17:
    print("Kategori : Film Dewasa (17+)")
elif usia >= 13:
    print("Kategori : Film Remaja (13+) - Cocok untuk siswa SMA!")
else:
    print("Kategori : Film Semua Umur (SU)")`,
          output: `Nama Penonton : Budi
Usia          : 13 tahun
Kategori : Film Remaja (13+) - Cocok untuk siswa SMA!`,
          explanation: 'Program menggunakan if dan elif untuk mengelompokkan penonton berdasarkan kategori batas usia.'
        }
      ],
      glossaryTerms: [
        { term: 'Variabel', definition: 'Nama tempat penyimpanan data di dalam memori komputer yang isinya dapat berubah-ubah.' },
        { term: 'String', definition: 'Tipe data untuk menyimpan karakter teks atau tulisan yang diapit tanda petik.' },
        { term: 'Integer', definition: 'Tipe data untuk menyimpan bilangan bulat tanpa koma desimal.' },
        { term: 'Percabangan (If-Else)', definition: 'Struktur kode yang menentukan perintah mana yang akan dijalankan berdasarkan syarat tertentu.' }
      ]
    },
    {
      id: 'sec-2-3',
      title: '3. Perulangan (Looping) & Pencarian Data Sederhana',
      estimatedMinutes: 15,
      keyPoints: [
        'Perulangan (Looping) digunakan untuk mengulang baris instruksi yang sama berkali-kali secara otomatis tanpa perlu menulis ulang berkali-kali.',
        'Perulangan `for` digunakan saat kita sudah tahu pasti berapa kali perintah harus diulang (misalnya mengulang 5 kali).',
        'Pencarian Berurutan (Linear Search) adalah cara mencari data dengan memeriksa satu per satu dari data pertama sampai data terakhir hingga yang dicari ketemu.',
        'Komputer sangat cepat melakukan perulangan jutaan kali dalam waktu kurang dari satu detik.'
      ],
      content: `## Perulangan (Looping) & Mencari Data

Bayangkan jika gurumu menyuruhmu menulis kalimat:  
*"Saya rajin belajar Informatika"* sebanyak **100 kali** di buku tulis. Tanganmu pasti akan sangat pegal!

Tetapi bagi komputer, mengulang pekerjaan sebanyak 100 kali, 1.000 kali, bahkan 1.000.000 kali adalah hal yang sangat mudah dan selesai dalam sekejap mata. Di dalam pemrograman, kemampuan ini disebut **Perulangan (*Looping*)**.

---

### 1. Perulangan dengan Perintah \`for\`

Di bahasa Python, kita menggunakan perintah **\`for\`** dan **\`range()\`** untuk menentukan berapa kali perintah diulang:

\`\`\`python
# Mengulang mencetak angka 1 sampai 5
for i in range(1, 6):
    print("Hitungan ke-", i)
\`\`\`

Hasil keluaran di layar:
\`\`\`
Hitungan ke- 1
Hitungan ke- 2
Hitungan ke- 3
Hitungan ke- 4
Hitungan ke- 5
\`\`\`
Hanya dengan 2 baris kode, komputer langsung mengulanginya dengan sempurna!

---

### 2. Mencari Data: Pencarian Berurutan (*Linear Search*)

Pernahkah kamu mencari namamu di daftar kertas pengumuman lomba yang ditempel di mading sekolah? Kamu membaca satu per satu dari nama paling atas:
- Apakah baris 1 nama saya? Bukan.
- Apakah baris 2 nama saya? Bukan.
- Apakah baris 3 nama saya? **YA, KETEMU!**

Cara mencari dari awal sampai akhir satu demi satu ini di komputer dinamakan **Pencarian Berurutan (*Linear Search*)**.

\`\`\`
Daftar Nama Siswa: ['Alifia', 'Bagus', 'Cantika', 'Dimas', 'Eka']
Target yang dicari : 'Cantika'

Langkah 1: Periksa 'Alifia'  -> Bukan
Langkah 2: Periksa 'Bagus'   -> Bukan
Langkah 3: Periksa 'Cantika' -> KETEMU di urutan ke-3! Pencarian selesai.
\`\`\``,
      realWorldAnalogy: {
        title: 'Mencari Kunci Rumah di Saku Tas',
        story: 'Di dalam saku tas terdapat 5 gantungan kunci yang berbeda. Kamu mengambil kunci pertama dan mencobanya ke lubang pintu: tidak pas. Kamu mencoba kunci kedua: tidak pas juga. Kamu mencoba kunci ketiga: pas dan pintu terbuka! Kamu tidak perlu lagi mencoba kunci ke-4 dan ke-5.',
        takeaway: 'Pencarian berurutan memeriksa objek satu per satu secara berurutan sampai target berhasil ditemukan.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Siapkan Kumpulan Data', detail: 'Tuliskan daftar data dalam bentuk list atau daftar berurutan.' },
        { step: 2, title: 'Mulai dari Data Pertama', detail: 'Periksa data di posisi awal apakah cocok dengan target yang dicari.' },
        { step: 3, title: 'Ulangi ke Data Berikutnya', detail: 'Jika belum cocok, gunakan perulangan untuk pindah ke data berikutnya.' },
        { step: 4, title: 'Hentikan Saat Ketemu', detail: 'Jika data yang dicari sudah ditemukan, berikan pesan berhasil dan hentikan pencarian.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira range(1, 5) di Python akan menghitung sampai angka 5.',
          correction: 'Di Python, range(1, 5) berhenti sebelum angka 5, yaitu hanya menghasilkan angka 1, 2, 3, dan 4.',
          why: 'Angka kedua pada range() adalah batas henti yang tidak ikut dihitung.'
        }
      ],
      examTips: 'Jika soal menanyakan cara mencari data pada daftar yang posisinya acak dari awal sampai akhir, jawabannya adalah Pencarian Berurutan (Linear Search).',
      interactiveDemo: 'python-code-runner',
      codeExamples: [
        {
          title: 'Mencari Nama Siswa di Daftar Kelas (Python)',
          language: 'python',
          code: `# Daftar nama siswa di kelas 8-1
daftar_siswa = ["Alifia", "Bagus", "Cantika", "Dimas", "Eka"]
nama_dicari = "Dimas"

print("Mencari nama:", nama_dicari)
ditemukan = False

# Mencari secara berurutan dengan perulangan for
for i in range(len(daftar_siswa)):
    if daftar_siswa[i] == nama_dicari:
        print("Data ketemu! Ada di urutan absen ke-", i + 1)
        ditemukan = True
        break

if not ditemukan:
    print("Maaf, nama tidak ditemukan di dalam daftar.")`,
          output: `Mencari nama: Dimas
Data ketemu! Ada di urutan absen ke- 4`,
          explanation: 'Program menelusuri satu per satu isi daftar nama hingga menemukan nama "Dimas" pada urutan absen ke-4.'
        }
      ],
      glossaryTerms: [
        { term: 'Perulangan (Loop)', definition: 'Perintah pemrograman untuk mengulang sekelompok instruksi berkali-kali secara otomatis.' },
        { term: 'For Loop', definition: 'Bentuk perulangan yang menjalankan instruksi sebanyak jumlah putaran yang telah ditentukan.' },
        { term: 'Linear Search', definition: 'Metode pencarian data dengan memeriksa setiap elemen satu per satu dari awal sampai akhir daftar.' }
      ]
    }
  ],
  videoTutorialId: 'vid-2',
  questions: [
    {
      id: 'q-2-1',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Pada gambar diagram alir (Flowchart), simbol apakah yang digunakan saat program harus mengambil keputusan atau memilih jalur antara YA dan TIDAK?',
      options: [
        'Simbol Persegi Panjang (Proses)',
        'Simbol Belah Ketupat (Keputusan / Decision)',
        'Simbol Oval (Terminator)',
        'Simbol Jajar Genjang (Input/Output)'
      ],
      correctAnswer: 1,
      hint: 'Simbol ini memiliki bentuk seperti ketupat lebaran dengan dua arah keluar (Ya atau Tidak).',
      explanation: 'Simbol Belah Ketupat (Decision) pada Flowchart digunakan untuk menguji suatu kondisi logika dan menghasilkan dua cabang keputusan (Ya/True atau Tidak/False).',
      learningObjective: 'Mengenal simbol-simbol standar pada diagram alir (Flowchart).'
    },
    {
      id: 'q-2-2',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Perhatikan potongan kode Python berikut:\n\nnilai = 82\nif nilai >= 75:\n    print("Lulus")\nelse:\n    print("Remedial")\n\nApakah yang akan ditampilkan di layar monitor saat kode di atas dijalankan?',
      options: ['Remedial', 'Lulus', 'Nilai 82', 'Error'],
      correctAnswer: 1,
      hint: 'Periksa apakah angka 82 lebih besar atau sama dengan 75? Jawabannya Benar.',
      explanation: 'Karena nilai bernilai 82, maka kondisi (nilai >= 75) bernilai Benar (True). Oleh karena itu, komputer akan menjalankan baris pertama dan mencetak kata "Lulus".',
      learningObjective: 'Memahami cara kerja percabangan logika if-else.'
    },
    {
      id: 'q-2-3',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Berapa kalikah teks "Halo Informatika" akan dicetak oleh perintah perulangan berikut ini?\n\nfor i in range(1, 4):\n    print("Halo Informatika")',
      options: ['1 kali', '2 kali', '3 kali', '4 kali'],
      correctAnswer: 2,
      hint: 'range(1, 4) akan menghitung angka 1, 2, dan 3 (berhenti sebelum angka 4).',
      explanation: 'Fungsi range(1, 4) menghasilkan 3 nilai putaran, yaitu 1, 2, dan 3. Sehingga baris cetak akan diulang sebanyak 3 kali.',
      learningObjective: 'Menganalisis jumlah perulangan pada perintah for loop Python.'
    },
    {
      id: 'q-2-4',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'code-trace',
      difficulty: 'HOTS / Sulit',
      question: 'Perhatikan potongan kode Python berikut ini. Berapakah nilai akhir dari variabel "total" yang dicetak di layar monitor?',
      codeSnippet: 'total = 0\nfor i in [2, 4, 6]:\n    if i > 3:\n        total += i * 2\n    else:\n        total += i\nprint(total)',
      options: ['22', '24', '12', '18'],
      correctAnswer: 0,
      hint: 'Lakukan penelusuran (tracing) nilai i satu per satu: saat i=2 (tambah 2), saat i=4 (tambah 8), saat i=6 (tambah 12).',
      explanation: 'Saat i=2: tidak > 3, maka total = 0 + 2 = 2. Saat i=4: > 3, maka total = 2 + (4*2) = 10. Saat i=6: > 3, maka total = 10 + (6*2) = 22. Nilai akhir total adalah 22.',
      learningObjective: 'Menganalisis penelusuran alur eksekusi (code tracing) perulangan berkondisi.'
    },
    {
      id: 'q-2-5',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Tipe data terstruktur di Python yang digunakan untuk menyimpan sekumpulan nilai terurut di dalam kurung siku [ ... ] dan isinya dapat diubah atau ditambah (bersifat mutable) adalah...',
      options: [
        'List',
        'Tuple',
        'String',
        'Integer'
      ],
      correctAnswer: 0,
      hint: 'Contohnya: buah = ["apel", "jeruk", "mangga"]. Kamu bisa menambah elemen dengan buah.append().',
      explanation: 'List di Python didefinisikan dengan kurung siku [] dan bersifat mutable (elemen-elemennya dapat diganti, ditambah, atau dihapus setelah dibuat).',
      learningObjective: 'Membedakan karakteristik tipe data terstruktur List di Python.'
    },
    {
      id: 'q-2-6',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'code-trace',
      difficulty: 'Sedang',
      question: 'Perhatikan perulangan while berikut:\n\nx = 1\nwhile x < 10:\n    x *= 2\nprint(x)\n\nBerapakah nilai x yang dicetak setelah perulangan selesai?',
      codeSnippet: 'x = 1\nwhile x < 10:\n    x *= 2\nprint(x)',
      options: ['16', '10', '8', '32'],
      correctAnswer: 0,
      hint: 'x berlipat ganda: 1 -> 2 -> 4 -> 8 -> 16. Kapan kondisi (x < 10) menjadi False?',
      explanation: 'Putaran 1: x = 2 (2 < 10 True). Putaran 2: x = 4 (4 < 10 True). Putaran 3: x = 8 (8 < 10 True). Putaran 4: x = 16 (16 < 10 False, perulangan berhenti). Maka print(x) mencetak 16.',
      learningObjective: 'Menganalisis kondisi terminasi perulangan while.'
    },
    {
      id: 'q-2-7',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'code-trace',
      difficulty: 'HOTS / Sulit',
      question: 'Perhatikan pendefinisian dan pemanggilan fungsi Python berikut:\n\ndef hitung_total(harga, diskon_persen):\n    potongan = harga * (diskon_persen / 100)\n    return harga - potongan\n\nbayar = hitung_total(100000, 15)\nprint(bayar)\n\nBerapakah nilai variabel "bayar" yang akan dicetak?',
      codeSnippet: 'def hitung_total(harga, diskon_persen):\n    potongan = harga * (diskon_persen / 100)\n    return harga - potongan\n\nbayar = hitung_total(100000, 15)\nprint(bayar)',
      options: ['85000.0', '15000.0', '100000.0', '85.0'],
      correctAnswer: 0,
      hint: 'Diskon 15% dari 100.000 adalah 15.000. Nilai kembalian adalah harga dikurang potongan.',
      explanation: 'Fungsi menghitung potongan = 100.000 * 0.15 = 15.000. Lalu mengembalikan nilai harga - potongan = 100.000 - 15.000 = 85.000.0.',
      learningObjective: 'Menganalisis fungsi modular dengan parameter dan nilai kembalian (return value).'
    },
    {
      id: 'q-2-8',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Manakah dari nama variabel berikut yang SAH (valid) dan TIDAK menyebabkan syntax error pada program Python?',
      options: [
        'skor_siswa_1',
        '1_skor_siswa',
        'skor siswa',
        'def'
      ],
      correctAnswer: 0,
      hint: 'Nama variabel tidak boleh diawali angka, tidak boleh ada spasi, dan bukan kata kunci bawaan bahasa pemrograman (reserved keyword).',
      explanation: 'Di Python, nama variabel harus diawali huruf atau garis bawah (_), tidak boleh ada spasi (gunakan underscore), dan tidak boleh menggunakan kata kunci sintaks seperti "def", "if", atau "class". Maka skor_siswa_1 adalah nama variabel yang sah.',
      learningObjective: 'Menerapkan kaidah penamaan identifier dan variabel dalam pemrograman.'
    },
    {
      id: 'q-2-9',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'code-trace',
      difficulty: 'Sedang',
      question: 'Diberikan dua nilai boolean: a = True dan b = False. Berapakah hasil evaluasi dari ekspresi logika berikut?\n\nhasil = (a and not b) or (b and a)',
      codeSnippet: 'a = True\nb = False\nhasil = (a and not b) or (b and a)\nprint(hasil)',
      options: ['True', 'False', 'None', 'Error sintaks'],
      correctAnswer: 0,
      hint: 'not b bernilai True. a and not b = True and True = True. True or apapun = True.',
      explanation: 'Evaluasi bagian kiri: not b = True, maka (True and True) = True. Evaluasi bagian kanan: (False and True) = False. Penggabungan operator or: True or False menghasilkan nilai boolean True.',
      learningObjective: 'Mengevaluasi ekspresi logika boolean majemuk (AND, OR, NOT).'
    },
    {
      id: 'q-2-10',
      moduleId: 'mod-2',
      element: 'AP',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Budi memiliki daftar nilai acak: [85, 62, 95, 70, 50]. Mengapa algoritma Pencarian Biner (Binary Search) TIDAK DAPAT langsung digunakan untuk mencari angka 70 pada daftar tersebut?',
      options: [
        'Karena Binary Search mewajibkan elemen daftar harus sudah dalam keadaan terurut (sorted)',
        'Karena Binary Search hanya bisa bekerja untuk data tipe teks/string',
        'Karena daftar tersebut memiliki jumlah elemen ganjil',
        'Karena nilai 70 berada di tengah daftar'
      ],
      correctAnswer: 0,
      hint: 'Syarat mutlak Binary Search adalah data harus terurut naik atau turun terlebih dahulu.',
      explanation: 'Syarat utama bekerjanya algoritma Binary Search adalah data harus terurut (sorted). Jika data belum terurut, asumsi eliminasi paruh kiri atau kanan tidak akan valid sehingga pencarian bisa gagal.',
      learningObjective: 'Memahami prasyarat dan efisiensi algoritma pencarian biner dibanding pencarian linier.'
    }
  ]
};
