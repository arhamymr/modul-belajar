import { InteractiveModule } from '../../types';
import { SMA_IMAGES } from '../smaImages';

export const module1_bk: InteractiveModule = {
  id: 'mod-1',
  number: 1,
  title: 'Berpikir Komputasional & Struktur Data Sederhana',
  element: 'BK',
  classLevel: 'SMA',
  curriculum: 'Kurikulum Merdeka (SMA)',
  estimatedMinutes: 40,
  iconName: 'BrainCircuit',
  coverImage: SMA_IMAGES.bab1_bk,
  summary: 'Mempelajari 4 pilar Computational Thinking (Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma), cara kerja tumpukan (Stack - LIFO) dan antrean (Queue - FIFO), serta cara mencari rute jalan terpendek dengan konsep graf sederhana.',
  learningObjectives: [
    'Memahami dan menerapkan 4 pilar Berpikir Komputasional untuk menyelesaikan masalah nyata sehari-hari siswa SMA.',
    'Membedakan prinsip kerja tumpukan (Stack - LIFO) dan antrean (Queue - FIFO) menggunakan contoh di sekolah.',
    'Mengenal bentuk graf dan pohon sederhana untuk mencari rute tercepat dari rumah ke sekolah dan susunan folder di komputer.',
    'Menyelesaikan tantangan logika komputasi dan soal berpikir kritis standar Tantangan Bebras / AKM SMA.'
  ],
  galleryImages: [
    {
      id: 'img-bk-sma-1',
      url: SMA_IMAGES.bab1_bk,
      caption: 'Praktikum Siswa-Siswi SMA: Eksperimen langsung logika komputasi, simulasi tumpukan (Stack) dan antrean (Queue) di laboratorium komputer sekolah.',
      alt: 'Foto Praktikum Siswa-Siswi SMA Berpikir Komputasional',
      source: 'Dokumentasi Laboratorium Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Berpikir Komputasional', 'Lab Komputer'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-bk-sma-2',
      url: SMA_IMAGES.bab1_bk_alt,
      caption: 'Praktikum Kolaboratif Siswa SMA: Diskusi 4 pilar computational thinking dan penyusunan bagan dekomposisi masalah terstruktur.',
      alt: 'Foto Siswa-Siswi SMA Praktikum Logika Komputasi',
      source: 'Laboratorium Komputer SMA Kurikulum Merdeka',
      tags: ['Siswa SMA', 'Praktikum', 'Kolaborasi', 'Dekomposisi'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-bk-sma-3',
      url: SMA_IMAGES.hero,
      caption: 'Aktivitas Belajar Terbimbing Siswa SMA: Mengimplementasikan abstraksi dan algoritma pencarian solusi tercepat di depan layar komputer.',
      alt: 'Foto Siswa SMA Belajar Terbimbing di Lab Komputer',
      source: 'Dokumentasi Pembelajaran Aktif Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Algoritma', 'Studi Kasus'],
      aspectRatio: '16:9'
    }
  ],
  sections: [
    {
      id: 'sec-1-1',
      title: '1. Empat Pilar Berpikir Komputasional (Computational Thinking)',
      estimatedMinutes: 15,
      keyPoints: [
        'Berpikir Komputasional adalah cara berpikir teratur untuk memecahkan masalah sehari-hari agar dapat diselesaikan dengan mudah, baik oleh manusia maupun bantuan komputer.',
        'Dekomposisi: Memecah tugas besar yang rumit menjadi bagian-bagian kecil yang lebih mudah dikerjakan.',
        'Pengenalan Pola: Melihat kesamaan atau kebiasaan yang berulang dari masalah yang pernah dihadapi sebelumnya.',
        'Abstraksi: Memilih informasi yang penting saja dan mengabaikan hal-hal yang tidak penting.',
        'Algoritma: Menyusun langkah-langkah kerja yang teratur, urut, dan jelas dari awal sampai selesai.'
      ],
      content: `## Belajar 4 Pilar Berpikir Komputasional

Pernahkah kamu merasa bingung saat menghadapi tugas sekolah yang menumpuk atau ingin merapikan kamar yang sangat berantakan? Jangan khawatir! Dengan **Berpikir Komputasional (*Computational Thinking*)**, kita belajar menyelesaikan masalah secara cerdas, tenang, dan teratur seperti cara kerja seorang ilmuwan komputer.

> 💡 **Ingat ya:** Berpikir Komputasional **bukan** berarti kamu harus bisa membuat program komputer (*coding*). Ini adalah **kemampuan berpikir logis** yang bisa kita gunakan di mana saja—mulai dari mengatur jadwal belajar, merapikan tas sekolah, hingga memenangkan game strategi!

---

### Bagan Alur 4 Pilar Berpikir Komputasional

\`\`\`
   +-------------------------------------------------------------+
   |            MASALAH / TUGAS BESAR YANG HARUS DISELESAIKAN    |
   +-------------------------------------------------------------+
                                  |
                                  v
   [ 1. DEKOMPOSISI ]       ---> Pecah jadi tugas-tugas kecil
                                  |
                                  v
   [ 2. PENGENALAN POLA ]   ---> Cari hal yang mirip atau sering berulang
                                  |
                                  v
   [ 3. ABSTRAKSI ]         ---> Ambil yang penting saja, abaikan yang tidak perlu
                                  |
                                  v
   [ 4. ALGORITMA ]         ---> Buat urutan langkah 1, 2, 3 sampai tuntas
                                  |
                                  v
   +-------------------------------------------------------------+
   |            HASIL: MASALAH SELESAI DENGAN CEPAT DAN TEPAT!   |
   +-------------------------------------------------------------+
\`\`\`

---

### Contoh Nyata 4 Pilar dalam Kehidupan Siswa SMA

| Pilar | Pertanyaan Mudah | Contoh Sehari-hari (Merapikan Kamar) | Contoh di Komputer / Sekolah |
| :--- | :--- | :--- | :--- |
| **1. Dekomposisi** | *"Bagaimana cara memecah masalah besar ini jadi kecil?"* | Membagi kamar jadi 4 bagian: merapikan kasur, menata meja belajar, menyapu lantai, dan melipat pakaian. | Membuat tugas presentasi kelompok: membagi tugas mencari gambar, menulis materi, dan mengetik slide. |
| **2. Pengenalan Pola** | *"Pernahkah saya melihat pola yang mirip sebelumnya?"* | Tahu bahwa buku pelajaran selalu diletakkan di rak buku, sedangkan pakaian kotor selalu dimasukkan ke keranjang cucian. | Mengenali pola jadwal pelajaran tiap hari Senin selalu ada upacara bendera dan pelajaran Matematika. |
| **3. Abstraksi** | *"Informasi mana yang paling penting untuk diperhatikan?"* | Saat membuat denah sekolah, kita hanya menggambar letak ruang kelas dan gerbang, tanpa perlu menggambar setiap daun di pohon. | Menulis biodata siswa: mencatat nama dan kelas, tanpa perlu mencatat warna sepatu atau merk pensil. |
| **4. Algoritma** | *"Bagaimana urutan langkah demi langkah yang benar?"* | Resep membuat mie instan: merebus air -> memasukkan mie 3 menit -> menuang bumbu di piring -> mengaduk rata. | Langkah menyalakan komputer: menekan tombol power CPU -> menekan tombol layar monitor -> menunggu sampai desktop muncul. |

---

### 3 Syarat Langkah Algoritma yang Baik:

| No | Syarat Algoritma | Penjelasan & Karakteristik | Contoh Penerapan Nyata |
| :---: | :--- | :--- | :--- |
| **1** | **Pasti dan Jelas (*Definiteness*)** | Setiap instruksi tidak menimbulkan makna ganda (*ambigu*) dan dapat dieksekusi dengan tepat. | *"Tambahkan 1 sendok teh garam"*, bukan *"Tambahkan sedikit garam seikhlasnya"*. |
| **2** | **Urut dan Teratur (*Ordered Steps*)** | Langkah instruksi tersusun logis dan berurutan dari awal sampai akhir. | Kita tidak bisa memakai sepatu sebelum memakai kaus kaki terlebih dahulu! |
| **3** | **Pasti Selesai (*Finiteness*)** | Rangkaian langkah harus berhenti dan mencapai hasil akhir, tidak mengalami perulangan tanpa henti (*infinite loop*). | Merebus mie instan selama 3 menit lalu kompor dimatikan, bukan direbus selamanya tanpa akhir. |`,
      realWorldAnalogy: {
        title: 'Mempersiapkan Ransel Sekolah di Malam Hari',
        story: 'Setiap malam sebelum tidur, Rian mempersiapkan tas sekolahnya dengan cerdas. Pertama (Dekomposisi), ia membagi perlengkapan menjadi tiga kelompok: buku pelajaran, alat tulis, dan kotak bekal. Kedua (Pengenalan Pola), ia mengingat bahwa jadwal hari Selasa selalu ada pelajaran PJOK, sehingga baju olahraga wajib dibawa. Ketiga (Abstraksi), ia memeriksa jadwal dan hanya memasukkan buku pelajaran hari Selasa, membiarkan buku hari lain di rumah agar beban tas tidak berlebih. Keempat (Algoritma), ia menata barang secara terstruktur: buku di kompartemen utama, tempat pensil di saku depan, dan botol minum di saku samping.',
        takeaway: 'Dengan menerapkan 4 pilar ini, tas sekolah Rian jadi rapi, ringan, dan tidak ada barang yang tertinggal!'
      },
      stepByStepGuide: [
        { step: 1, title: 'Bagi Masalah (Dekomposisi)', detail: 'Tuliskan hal apa saja yang harus diselesaikan, lalu pecah menjadi 3 atau 4 bagian kecil.' },
        { step: 2, title: 'Lihat Pengalaman Lalu (Pola)', detail: 'Ingat kembali apakah masalah serupa pernah kamu selesaikan sebelumnya.' },
        { step: 3, title: 'Pilih yang Penting (Abstraksi)', detail: 'Fokus pada hal yang paling utama, abaikan detail kecil yang tidak berpengaruh.' },
        { step: 4, title: 'Susun Langkah (Algoritma)', detail: 'Tuliskan urutan langkah nomor 1, 2, 3 secara rapi dan lakukan satu per satu.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira Berpikir Komputasional itu harus memakai komputer.',
          correction: 'Berpikir Komputasional adalah cara berpikir di otak kita. Kita bisa mempraktikkannya dengan kertas dan pensil tanpa komputer sama sekali!',
          why: 'Komputer hanyalah alat bantu, manusialah yang merancang cara berpikirnya.'
        },
        {
          mistake: 'Bingung membedakan Dekomposisi dan Abstraksi.',
          correction: 'Dekomposisi itu membagi satu hal besar menjadi potongan-potongan kecil. Sedangkan Abstraksi itu memilih hal penting dan membuang hal yang tidak perlu.',
          why: 'Dekomposisi berkaitan dengan pembagian tugas, sedangkan Abstraksi berkaitan dengan pemilihan informasi.'
        }
      ],
      examTips: 'Tips menjawab soal: Jika soal menceritakan tentang membagi tugas kelompok -> Dekomposisi. Jika soal menyuruh mengabaikan warna atau detail hiasan -> Abstraksi. Jika ada urutan langkah 1-2-3 -> Algoritma.',
      interactiveDemo: 'greedy-coin-visualizer',
      glossaryTerms: [
        { term: 'Dekomposisi', definition: 'Cara memecah masalah besar menjadi beberapa bagian kecil agar lebih mudah dikerjakan.' },
        { term: 'Abstraksi', definition: 'Mengambil informasi yang penting saja dan mengabaikan hal-hal kecil yang tidak diperlukan.' },
        { term: 'Pola', definition: 'Bentuk keteraturan atau kesamaan yang sering berulang.' },
        { term: 'Algoritma', definition: 'Urutan langkah-langkah logis dan teratur untuk menyelesaikan suatu pekerjaan.' }
      ]
    },
    {
      id: 'sec-1-2',
      title: '2. Mengenal Tumpukan (Stack) dan Antrean (Queue)',
      estimatedMinutes: 15,
      keyPoints: [
        'Komputer menyimpan dan menata data menggunakan aturan tertentu agar mudah dicari dan digunakan.',
        'Tumpukan (Stack) menganut prinsip LIFO (Last In, First Out): Data yang terakhir dimasukkan akan menjadi yang pertama keluar.',
        'Antrean (Queue) menganut prinsip FIFO (First In, First Out): Data yang pertama kali masuk akan menjadi yang pertama kali dilayani dan keluar.',
        'Contoh Tumpukan: Tumpukan piring kotor, tumpukan buku di meja, dan tombol Undo (batal ketik) di komputer.',
        'Contoh Antrean: Antre jajan di kantin sekolah, antrean print tugas di printer, dan antrean tiket bioskop.'
      ],
      content: `## Memahami Tumpukan (Stack) dan Antrean (Queue)

Di dalam komputer, jutaan data disimpan dengan susunan yang sangat rapi. Ada dua cara menyusun data yang paling sering digunakan, yaitu **Tumpukan (Stack)** dan **Antrean (Queue)**.

Keduanya sangat mudah dipahami karena sering sekali kita temui di sekolah dan di rumah!

---

### 1. Tumpukan (*Stack*) — Prinsip Terakhir Masuk, Pertama Keluar (LIFO)

Bayangkan sebuah tumpukan piring bersih di atas meja makan:
- Saat kamu meletakkan piring baru, kamu menaruhnya di **bagian paling atas**. (Operasi ini disebut **Push** / Masuk).
- Saat kamu mau mengambil piring untuk makan, piring manakah yang kamu ambil? Tentu piring yang berada di **paling atas**! (Operasi ini disebut **Pop** / Keluar).

Piring yang terakhir kamu taruh di atas justru menjadi piring yang pertama kali kamu ambil. Aturan ini disebut **LIFO (*Last In, First Out*)**.

\`\`\`
   Operasi PUSH (Menumpuk)             Operasi POP (Mengambil)
   -----------------------             -----------------------
        |  [ Piring C ]                     ^  [ Piring C diambil duluan! ]
        v                                   |
   +--------------+                    +--------------+
   |   Piring C   | <-- Paling Atas    |              |
   +--------------+                    +--------------+
   |   Piring B   |                    |   Piring B   | <-- Jadi Paling Atas
   +--------------+                    +--------------+
   |   Piring A   |                    |   Piring A   |
   +--------------+                    +--------------+
     DASAR TUMPUKAN                      DASAR TUMPUKAN
\`\`\`

> 💡 **Contoh Nyata Tombol Undo:** Saat kamu mengetik di HP atau laptop lalu salah ketik, kamu menekan tombol **Undo (Ctrl + Z)**. Komputer akan membatalkan huruf terakhir yang baru saja kamu ketik. Komputer menggunakan cara kerja Tumpukan (*Stack*)!

---

### 2. Antrean (*Queue*) — Prinsip Pertama Datang, Pertama Dilayani (FIFO)

Sekarang bayangkan saat jam istirahat sekolah dan kamu mengantre membeli bakso di kantin:
- Siswa yang datang lebih dulu berdiri di depan (**FRONT / Kepala Antrean**).
- Siswa yang baru datang harus berdiri di barisan paling belakang (**REAR / Ekor Antrean**).
- Penjual bakso akan melayani siswa yang datang paling awal terlebih dahulu!

Aturan ini disebut **FIFO (*First In, First Out*)** — siapa yang datang pertama, dia yang dilayani pertama. Sangat adil, bukan?

\`\`\`
                          Barisan Bergerak Maju ke Depan
   Siswa Baru Masuk (Belakang)                                   Dilayani & Keluar (Depan)
   ---------------------------                                   -------------------------
   Siswa D ---> [ Belakang / Ekor ] -> [ Siswa C ] -> [ Siswa B ] -> [ Siswa A ] ---> Selesai jajan!
\`\`\`

---

### Tabel Perbedaan: Tumpukan (Stack) vs Antrean (Queue)

| Hal yang Dibandingkan | Tumpukan (Stack) | Antrean (Queue) |
| :--- | :--- | :--- |
| **Prinsip Kerja** | **LIFO** (*Terakhir Masuk, Pertama Keluar*) | **FIFO** (*Pertama Masuk, Pertama Keluar*) |
| **Pintu Akses Data** | Hanya 1 pintu (hanya dari bagian atas) | 2 pintu (masuk dari belakang, keluar dari depan) |
| **Istilah Masuk Data** | **Push** (menumpuk) | **Enqueue** (masuk barisan) |
| **Istilah Ambil Data** | **Pop** (mengambil dari atas) | **Dequeue** (keluar setelah dilayani) |
| **Contoh di Sekolah** | - Tumpukan buku catatan di meja guru<br>- Tumpukan piring di kantin | - Barisan antrean di kasir kantin<br>- Barisan siswa saat salaman di pagi hari |
| **Contoh di Komputer/HP** | - Tombol Undo / Redo saat mengetik<br>- Tombol Kembali (Back) di browser internet | - Urutan pencetakan kertas di printer<br>- Daftar putar lagu (playlist) berikutnya |`,
      realWorldAnalogy: {
        title: 'Tumpukan Buku Catatan vs Antrean Masuk Lab Komputer',
        story: 'Saat mengumpulkan buku tugas PR ke meja guru, buku Doni diletakkan paling bawah, lalu di atasnya buku Budi, dan terakhir buku Siti ditaruh paling atas (Stack). Saat guru mulai memeriksa, guru mengambil buku Siti yang paling atas terlebih dahulu (LIFO). Sebaliknya, saat siswa masuk ke lab komputer (Queue), siswa yang berbaris paling depan dipersilakan masuk lebih dulu ke dalam lab (FIFO).',
        takeaway: 'Tumpukan mengambil dari yang paling akhir ditaruh, sedangkan Antrean melayani dari yang paling pertama datang.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Lihat Cara Pengambilannya', detail: 'Tanyakan: apakah yang terakhir datang harus dilayani duluan (Stack) atau yang pertama datang harus dilayani duluan (Queue)?' },
        { step: 2, title: 'Cek Pintu Masuk dan Keluar', detail: 'Jika hanya bisa keluar-masuk dari satu ujung -> Stack. Jika masuk dari belakang dan keluar dari depan -> Queue.' },
        { step: 3, title: 'Terapkan Operasi Sederhana', detail: 'Gunakan Push/Pop untuk tumpukan, dan Enqueue/Dequeue untuk antrean.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira dokumen di printer dicetak dengan sistem tumpukan.',
          correction: 'Printer mencetak dengan sistem antrean (Queue / FIFO). Dokumen yang kamu kirim duluan akan dicetak duluan agar tidak tertukar dengan temanmu.',
          why: 'Sistem cetak harus adil berdasarkan waktu pengiriman dokumen.'
        }
      ],
      examTips: 'Ingat kuncinya: STACK = Piring Tumpuk (LIFO). QUEUE = Antre Kantin (FIFO).',
      interactiveDemo: 'stack-queue-visualizer',
      codeExamples: [
        {
          title: 'Contoh Sederhana Antrean Cetak Tugas Sekolah (Python)',
          language: 'python',
          code: `# Membuat antrean cetak tugas sekolah kosong
antrean_cetak = []

# 1. Siswa mengirim tugas untuk diprint (Masuk antrean dari belakang)
print("--- TUGAS SISWA MASUK KE PRINTER ---")
antrean_cetak.append("Tugas_Informatika_Rian.docx")
antrean_cetak.append("Tugas_IPA_Siti.pdf")
antrean_cetak.append("Gambar_Seni_Budi.png")
print("Daftar antrean sekarang:", antrean_cetak)

# 2. Printer mencetak satu per satu dari yang paling depan (FIFO)
print("\n--- PRINTER SEDANG MENCETAK (FIFO) ---")
while len(antrean_cetak) > 0:
    tugas_diprint = antrean_cetak.pop(0) # Mengambil yang paling depan
    print("Selesai mencetak:", tugas_diprint)
    print("Sisa antrean:", len(antrean_cetak), "tugas")`,
          output: `--- TUGAS SISWA MASUK KE PRINTER ---
Daftar antrean sekarang: ['Tugas_Informatika_Rian.docx', 'Tugas_IPA_Siti.pdf', 'Gambar_Seni_Budi.png']

--- PRINTER SEDANG MENCETAK (FIFO) ---
Selesai mencetak: Tugas_Informatika_Rian.docx
Sisa antrean: 2 tugas
Selesai mencetak: Tugas_IPA_Siti.pdf
Sisa antrean: 1 tugas
Selesai mencetak: Gambar_Seni_Budi.png
Sisa antrean: 0 tugas`,
          explanation: 'Program ini mensimulasikan antrean print sederhana: data masuk dari belakang dan diambil dari urutan paling depan (indeks 0).'
        }
      ],
      glossaryTerms: [
        { term: 'Stack (Tumpukan)', definition: 'Susunan data yang memakai aturan LIFO: data terakhir masuk akan keluar pertama.' },
        { term: 'Queue (Antrean)', definition: 'Susunan data yang memakai aturan FIFO: data pertama masuk akan keluar pertama.' },
        { term: 'Push', definition: 'Perintah untuk menaruh data baru di bagian paling atas tumpukan.' },
        { term: 'Pop', definition: 'Perintah untuk mengambil data dari bagian paling atas tumpukan.' },
        { term: 'Undo', definition: 'Fitur membatalkan tindakan terakhir di komputer atau smartphone.' }
      ]
    },
    {
      id: 'sec-1-3',
      title: '3. Mengenal Graf, Pohon & Mencari Jalur Tercepat',
      estimatedMinutes: 10,
      keyPoints: [
        'Graf adalah gambar hubungan antar tempat atau objek, yang terdiri dari Simpul (Titik/Lokasi) dan Garis (Jalan penghubung).',
        'Pohon (Tree) adalah bentuk graf khusus yang bertingkat seperti susunan silsilah keluarga atau folder file di dalam komputer.',
        'Kita bisa menggunakan graf untuk mencari rute jalan terpendek atau tercepat dari rumah menuju ke sekolah.',
        'Mencari rute tercepat dilakukan dengan menjumlahkan jarak atau waktu di setiap jalan, lalu memilih jalan dengan total paling kecil.'
      ],
      content: `## Mengenal Graf, Pohon & Cara Mencari Rute Tercepat

Pernahkah kamu melihat aplikasi peta di smartphone saat orang tuamu mengemudi mobil atau motor? Aplikasi tersebut bisa secara otomatis memilihkan **jalan tercepat** untuk menghindari macet. Tahukah kamu bagaimana cara kerjanya? Jawabannya adalah menggunakan konsep **Graf (*Graph*)**!

---

### 1. Apa itu Graf?

Graf adalah cara menggambarkan hubungan antar tempat atau benda:
- **Simpul (*Titik/Node*)**: Menggambarkan tempat (contoh: Rumah, Toko Buku, Lapangan, Sekolah).
- **Garis (*Sisi/Jalan*)**: Garis penghubung antar tempat yang memiliki angka jarak (misal: 2 km, 3 menit).

\`\`\`
       [ Titik A: Rumah ]
          /           \\
    (2 km)             (4 km)
        /               \\
       v                 v
   [ Titik B: Toko ]   [ Titik C: Taman ]
       \\                 /
     (3 km)            (1 km)
         \\             /
          v           v
       [ Titik D: Sekolah ]
\`\`\`

#### Bagaimana Menemukan Jalur Terpendek dari Rumah (A) ke Sekolah (D)?
Kita bandingkan 2 rute jalan yang ada:
- **Rute 1 (Lewat Toko)**: Rumah -> Toko (2 km) -> Sekolah (3 km) = **Total 5 km**.
- **Rute 2 (Lewat Taman)**: Rumah -> Taman (4 km) -> Sekolah (1 km) = **Total 5 km**.
Kedua rute memiliki jarak yang sama! Jika tiba-tiba jalan di Toko B sedang macet, kita bisa memilih Rute 2 melewati Taman.

---

### 2. Apa itu Struktur Pohon (*Tree*)?

**Pohon (*Tree*)** adalah susunan data yang bertingkat dari atas ke bawah. Dinamakan pohon karena bentuknya bercabang-cabang seperti pohon terbalik!

Contoh paling nyata yang sering kamu lihat:
1. **Silsilah Keluarga**: Kakek & Nenek (di atas) -> Ayah & Ibu -> Kamu dan Adikmu (di bawah).
2. **Folder di Laptop/Komputer**:
   - Folder Utama: **\`Dokumen Saya\`**
     - Folder: **\`Tugas Sekolah\`**
       - File: **\`PR_Informatika.docx\`**
       - File: **\`Tugas_Matematika.pdf\`**
     - Folder: **\`Koleksi Foto\`**
       - File: **\`Foto_Piknik.jpg\`**

\`\`\`
          [ FOLDER UTAMA: DOKUMEN SAYA ]
                     /       \\
                    /         \\
     [ Folder: Tugas Sekolah ]  [ Folder: Koleksi Foto ]
          /            \\                    \\
   [ PR_Info.docx ]  [ PR_Mat.pdf ]    [ Foto_Piknik.jpg ]
\`\`\`

Dengan susunan pohon ini, semua file di laptop kita tersimpan rapi dan tidak bercampur aduk!`,
      realWorldAnalogy: {
        title: 'Mencari Rute Tercepat Sepeda ke Sekolah',
        story: 'Setiap pagi, Dimas berangkat ke SMA Prestasi Bangsa naik sepeda. Ada jalan utama yang ramai kendaraan (jarak 3 km tapi memakan waktu 15 menit karena lampu merah), dan ada jalan gang pemukiman yang tenang (jarak 3.5 km tapi memakan waktu hanya 10 menit tanpa macet). Dimas memilih jalan kedua karena waktu tempuhnya lebih cepat.',
        takeaway: 'Dalam konsep graf, jalur terbaik adalah jalur yang paling efisien, baik dari segi jarak maupun waktu tempuh.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Tandai Titik Awal dan Tujuan', detail: 'Tentukan lokasi awal (misal: Rumah) dan lokasi akhir yang ingin dicapai (misal: Sekolah).' },
        { step: 2, title: 'Lihat Semua Jalur Penghubung', detail: 'Tuliskan rute-rute jalan alternatif yang menghubungkan titik-titik tersebut beserta jaraknya.' },
        { step: 3, title: 'Hitung dan Bandingkan Totalnya', detail: 'Jumlahkan angka di setiap jalur dan pilih rute dengan total terkecil.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira struktur pohon (Tree) itu sama seperti pohon tanaman asli yang akarnya di bawah.',
          correction: 'Dalam ilmu komputer, struktur Tree digambarkan terbalik: akarnya (folder utama) berada di paling atas, dan cabang-cabangnya menuju ke bawah.',
          why: 'Ini mempermudah kita membaca urutan dari tingkatan paling umum ke tingkatan paling khusus.'
        }
      ],
      examTips: 'Pada soal silsilah keluarga atau folder komputer, ingat bahwa itu adalah contoh struktur data POHON (Tree). Jika berupa peta jalan antar kota, itu adalah GRAF (Graph).',
      interactiveDemo: 'graph-traversal-simulator',
      codeExamples: [
        {
          title: 'Menghitung Total Jarak Rute Jalan Sederhana (Python)',
          language: 'python',
          code: `# Menghitung jarak rute jalan dari Rumah ke Sekolah
jarak_rumah_ke_toko = 2 # km
jarak_toko_ke_sekolah = 3 # km

total_rute_1 = jarak_rumah_ke_toko + jarak_toko_ke_sekolah
print("Rute 1 (Lewat Toko):", total_rute_1, "km")

jarak_rumah_ke_taman = 4 # km
jarak_taman_ke_sekolah = 1 # km

total_rute_2 = jarak_rumah_ke_taman + jarak_taman_ke_sekolah
print("Rute 2 (Lewat Taman):", total_rute_2, "km")

if total_rute_1 < total_rute_2:
    print("Rute terbaik adalah Rute 1")
elif total_rute_2 < total_rute_1:
    print("Rute terbaik adalah Rute 2")
else:
    print("Kedua rute memiliki panjang yang sama!")`,
          output: `Rute 1 (Lewat Toko): 5 km
Rute 2 (Lewat Taman): 5 km
Kedua rute memiliki panjang yang sama!`,
          explanation: 'Program sederhana ini membandingkan panjang dua rute jalan untuk menentukan rute mana yang paling dekat.'
        }
      ],
      glossaryTerms: [
        { term: 'Graf (Graph)', definition: 'Kumpulan titik (simpul) dan garis penghubung yang menggambarkan hubungan antar lokasi atau benda.' },
        { term: 'Simpul (Node)', definition: 'Titik yang menggambarkan suatu objek atau tempat dalam graf.' },
        { term: 'Pohon (Tree)', definition: 'Bentuk graf bertingkat yang bercabang ke bawah seperti silsilah keluarga atau folder laptop.' }
      ]
    }
  ],
  videoTutorialId: 'vid-1',
  questions: [
    {
      id: 'q-1-1',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Saat membuat denah sekolah, Ahmad hanya menggambar letak ruang kelas, gerbang, dan lapangan, lalu mengabaikan warna cat dinding serta bentuk pohon. Pilar Berpikir Komputasional apakah yang sedang diterapkan Ahmad?',
      options: ['Dekomposisi', 'Abstraksi', 'Pengenalan Pola', 'Perancangan Algoritma'],
      correctAnswer: 1,
      hint: 'Pilar ini memfokuskan perhatian pada hal yang penting dan mengabaikan detail kecil yang tidak dibutuhkan.',
      explanation: 'Abstraksi adalah pilar Berpikir Komputasional untuk menyaring dan mengambil informasi penting saja, serta membuang detail yang tidak penting agar masalah lebih mudah dipahami.',
      learningObjective: 'Memahami 4 pilar Berpikir Komputasional pada kasus nyata.'
    },
    {
      id: 'q-1-2',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Ibu guru menaruh buku tugas Alifia di atas meja, lalu menaruh buku Bagus di atasnya, dan terakhir menaruh buku Cantika di posisi paling atas. Saat ibu guru hendak mulai memeriksa tugas, buku siapakah yang diambil terlebih dahulu jika menggunakan aturan Tumpukan (Stack - LIFO)?',
      options: ['Buku Alifia', 'Buku Bagus', 'Buku Cantika', 'Buku diambil acak'],
      correctAnswer: 2,
      hint: 'Ingat prinsip Stack (Tumpukan): benda yang terakhir ditaruh di paling atas akan menjadi yang pertama kali diambil (LIFO).',
      explanation: 'Pada struktur Tumpukan (Stack / LIFO - Last In First Out), benda yang diletakkan paling akhir (buku Cantika di posisi teratas) akan diambil pertama kali.',
      learningObjective: 'Menganalisis prinsip kerja struktur data Tumpukan (Stack).'
    },
    {
      id: 'q-1-3',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Di kantin sekolah, siswa mengantre dengan tertib untuk membeli makan siang. Siswa yang datang pertama kali akan dilayani terlebih dahulu, sedangkan siswa yang baru datang berdiri di barisan paling belakang. Konsep antrean ini menerapkan aturan apa?',
      options: [
        'Queue (FIFO - First In, First Out)',
        'Stack (LIFO - Last In, First Out)',
        'Tree (Struktur Pohon Bertingkat)',
        'Graf Acak'
      ],
      correctAnswer: 0,
      hint: 'Siapa yang datang pertama, dia yang dilayani pertama kali.',
      explanation: 'Antrean di loket kantin menganut prinsip Queue (FIFO - First In, First Out), yaitu data atau orang yang masuk pertama kali akan dilayani dan keluar pertama kali.',
      learningObjective: 'Memahami konsep struktur data Antrean (Queue) dalam kehidupan sehari-hari.'
    },
    {
      id: 'q-1-4',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Perhatikan struktur direktori penyimpanan berkas di komputer: C:\\Sekolah\\Informatika\\Modul_BK.docx. Struktur data hirarkis bertingkat yang paling tepat merepresentasikan susunan folder dan file di atas adalah...',
      options: [
        'Tree (Struktur Pohon dengan C: sebagai Root)',
        'Queue (Antrean FIFO)',
        'Stack (Tumpukan LIFO)',
        'Tabel Relasional Database'
      ],
      correctAnswer: 0,
      hint: 'Struktur ini memiliki simpul akar (Root) di bagian paling atas dan bercabang ke sub-folder (anak) hingga ke berkas (daun/leaf).',
      explanation: 'Sistem berkas (file system) komputer diorganisir menggunakan struktur data Pohon (Tree), di mana direktori induk bertindak sebagai simpul atas/akar dan sub-direktori atau file bertindak sebagai simpul anak atau daun (leaf).',
      learningObjective: 'Menganalisis penerapan struktur data Pohon (Tree) pada hierarki sistem komputer.'
    },
    {
      id: 'q-1-5',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Sebuah tumpukan buku (Stack) kosong awalnya diisi buku Matematika, lalu di atasnya ditumpuk buku Fisika, lalu buku Kimia. Kemudian dilakukan operasi POP sebanyak 1 kali, lalu dilakukan PUSH buku Biologi. Buku apakah yang sekarang berada pada posisi paling atas tumpukan (Top of Stack)?',
      options: [
        'Buku Biologi',
        'Buku Kimia',
        'Buku Fisika',
        'Buku Matematika'
      ],
      correctAnswer: 0,
      hint: 'POP akan mengeluarkan buku paling atas saat itu (Kimia). Lalu PUSH akan menambahkan buku baru di posisi teratas.',
      explanation: 'Tumpukan awal: [Matematika, Fisika, Kimia]. Setelah POP 1x, Kimia dikeluarkan sehingga tumpukan menjadi [Matematika, Fisika]. Kemudian PUSH Biologi membuat buku Biologi ditaruh di puncak tumpukan (Top).',
      learningObjective: 'Menerapkan operasi dasar PUSH dan POP pada struktur data Stack.'
    },
    {
      id: 'q-1-6',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Sebuah tim siswa OSIS ingin membuat sistem absensi digital berbasis QR Code di gerbang sekolah. Langkah Dekomposisi yang paling tepat dan sistematis dalam memecah persoalan besar tersebut adalah...',
      options: [
        'Memecah masalah menjadi modul scan kamera QR, modul database data siswa, logika pencatatan jam hadir, dan tampilan rekapitulasi kehadiran',
        'Langsung membeli perangkat keras komputer termahal tanpa membuat rencana modul',
        'Mengabaikan data keterlambatan siswa dan hanya fokus mencatat siswa yang hadir tepat waktu',
        'Menyuruh seluruh siswa membuat kartu identitas baru secara manual'
      ],
      correctAnswer: 0,
      hint: 'Dekomposisi adalah teknik memecah masalah besar dan rumit menjadi bagian-bagian sub-masalah yang lebih kecil dan mandiri.',
      explanation: 'Dekomposisi membagi proyek sistem absensi menjadi bagian fungsional: modul pemindai kamera QR, modul basis data siswa, kalkulasi status hadir/terlambat, dan antarmuka laporan wali kelas.',
      learningObjective: 'Menerapkan pilar Dekomposisi dalam perancangan solusi teknologi sederhana.'
    },
    {
      id: 'q-1-7',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Pada graf peta jalan: Kota A terhubung ke Kota B (jarak 5 km) dan Kota C (jarak 2 km). Dari Kota C ada jalan ke Kota B (jarak 1 km) dan ke Kota D (jarak 4 km). Dari Kota B ada jalan ke Kota D (jarak 2 km). Berapakah jarak terpendek dari Kota A menuju Kota D?',
      options: [
        '5 km (melalui rute A -> C -> B -> D)',
        '6 km (melalui rute A -> C -> D)',
        '7 km (melalui rute A -> B -> D)',
        '8 km (melalui rute memutar)'
      ],
      correctAnswer: 0,
      hint: 'Hitung setiap kemungkinan jalur: A-B-D = 5+2=7 km; A-C-D = 2+4=6 km; A-C-B-D = 2+1+2=5 km.',
      explanation: 'Dengan algoritma pencarian rute terpendek (seperti Dijkstra): Jalur A -> C -> B -> D memiliki total bobot 2 + 1 + 2 = 5 km, yang merupakan jarak paling minimum dibandingkan rute lainnya.',
      learningObjective: 'Menganalisis pencarian lintasan terpendek (Shortest Path) pada struktur data Graf berbobot.'
    },
    {
      id: 'q-1-8',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Rani mengamati riwayat waktu penyelesaian kuis online teman sekelasnya. Pola yang terlihat: siswa yang membaca modul materi terlebih dahulu selalu menyelesaikan kuis dalam waktu 15 menit dengan akurasi 90%, sedangkan siswa yang langsung mengerjakan kuis membutuhkan waktu 30 menit dengan akurasi 50%. Pilar Berpikir Komputasional yang digunakan Rani adalah...',
      options: [
        'Pengenalan Pola (Pattern Recognition)',
        'Abstraksi',
        'Kompilasi Biner',
        'Format Data'
      ],
      correctAnswer: 0,
      hint: 'Rani melihat keteraturan dan tren hubungan antara persiapan belajar dan hasil tes.',
      explanation: 'Pengenalan Pola (Pattern Recognition) adalah kemampuan mengenali kesamaan, tren, atau keteraturan dalam data atau fenomena untuk menarik kesimpulan dan membuat prediksi.',
      learningObjective: 'Mengidentifikasi pilar Pengenalan Pola pada analisis fenomena belajar.'
    },
    {
      id: 'q-1-9',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Diberikan daftar nomor induk siswa yang sudah terurut rapi: [101, 105, 110, 115, 120, 125, 130]. Jika guru mencari nomor "125" menggunakan algoritma Pencarian Biner (Binary Search), elemen berapakah yang pertama kali diperiksa oleh algoritma tersebut?',
      options: [
        '115 (elemen indeks tengah awal)',
        '101 (elemen pertama)',
        '130 (elemen terakhir)',
        '125 (karena langsung ditebak)'
      ],
      correctAnswer: 0,
      hint: 'Pencarian biner selalu membagi dua daftar dan memeriksa nilai di posisi tengah (median).',
      explanation: 'Binary Search bekerja dengan memeriksa elemen di posisi tengah terlebih dahulu. Pada daftar 7 elemen, indeks tengah adalah indeks ke-3 (nilai 115). Karena 125 > 115, pencarian dilanjutkan ke paruh kanan.',
      learningObjective: 'Memahami prinsip kerja langkah demi langkah algoritma Binary Search.'
    },
    {
      id: 'q-1-10',
      moduleId: 'mod-1',
      element: 'BK',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Manakah di bawah ini yang BUKAN merupakan ciri-ciri algoritma yang baik dalam ilmu informatika?',
      options: [
        'Memiliki langkah-langkah yang ambigu dan bermakna ganda bagi komputer',
        'Memiliki batasan langkah dan pasti berhenti (Finiteness)',
        'Memiliki masukan (Input) dan menghasilkan keluaran (Output) yang jelas',
        'Setiap instruksi terdefinisi secara tepat dan logis (Definiteness)'
      ],
      correctAnswer: 0,
      hint: 'Komputer tidak bisa menjalankan perintah yang maknanya ambigu atau tidak pasti.',
      explanation: 'Ciri utama algoritma komputasi adalah Definiteness (jelas, tidak ambigu), Finiteness (pasti berakhir), Input, Output, dan Effectiveness. Langkah yang ambigu justru merusak algoritma.',
      learningObjective: 'Menjelaskan syarat dan kriteria dasar efektivitas algoritma komputasi.'
    }
  ]
};
