import { InteractiveModule } from '../../types';
import { SMA_IMAGES } from '../smaImages';

export const module4_jki: InteractiveModule = {
  id: 'mod-4',
  number: 4,
  title: 'Jaringan Komputer & Internet Aman',
  element: 'JKI',
  classLevel: 'SMA',
  curriculum: 'Kurikulum Merdeka (SMA)',
  estimatedMinutes: 40,
  iconName: 'Network',
  coverImage: SMA_IMAGES.bab4_jki,
  summary: 'Mengenal konsep jaringan komputer (LAN dan Internet), media transmisi kabel vs nirkabel (Wi-Fi, Bluetooth), cara kerja alamat IP dan nama domain web, serta tips keamanan berinternet bagi siswa SMA.',
  learningObjectives: [
    'Menjelaskan pengertian jaringan komputer serta membedakan Jaringan Lokal (LAN) dan Jaringan Global (Internet).',
    'Membedakan media transmisi berkabel (kabel LAN/UTP) dan nirkabel (Wi-Fi, Bluetooth, kuota seluler).',
    'Mengenal fungsi Alamat IP (IP Address) dan cara kerja nama alamat website (URL/Domain seperti .sch.id).',
    'Menerapkan langkah-langkah keamanan berinternet: membuat password kuat, mengenali link penipuan, dan browsing aman.'
  ],
  galleryImages: [
    {
      id: 'img-jki-sma-1',
      url: SMA_IMAGES.bab4_jki,
      caption: 'Praktikum Siswa SMA: Melakukan praktikum crimping kabel LAN UTP RJ-45, pengetesan kabel tester, dan konfigurasi port router di lab.',
      alt: 'Foto Praktikum Siswa-Siswi SMA Jaringan Komputer & LAN',
      source: 'Dokumentasi Laboratorium Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Jaringan Komputer', 'LAN', 'Router', 'Internet'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-jki-sma-2',
      url: SMA_IMAGES.bab4_jki_alt,
      caption: 'Praktikum Pengujian Jaringan Lokal Siswa SMA: Menghubungkan kabel LAN ke switch hub dan melakukan uji ping koneksi antar-komputer kelas.',
      alt: 'Foto Siswa SMA Praktikum Pengujian Switch Hub & LAN',
      source: 'Laboratorium Komputer SMA Kurikulum Merdeka',
      tags: ['Siswa SMA', 'Praktikum', 'Switch Hub', 'Ping Test'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-jki-sma-3',
      url: SMA_IMAGES.bab4_network_students,
      caption: 'Praktikum Kolaborasi Router & Wi-Fi Siswa SMA: Eksplorasi pengaturan IP Address (IPv4), subnet mask, dan simulasi topologi jaringan komputer.',
      alt: 'Foto Siswa-Siswi SMA Praktikum Topologi Jaringan & Router',
      source: 'Dokumentasi Praktik Jaringan Komputer Siswa SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Router', 'IP Address'],
      aspectRatio: '16:9'
    }
  ],
  sections: [
    {
      id: 'sec-4-1',
      title: '1. Mengenal Jaringan Komputer, LAN & Internet',
      estimatedMinutes: 15,
      keyPoints: [
        'Jaringan Komputer adalah gabungan dari dua atau lebih perangkat komputer yang saling terhubung untuk berbagi data dan sumber daya.',
        'Manfaat jaringan: Dapat berbagi printer bersama, mengirim tugas ke komputer guru tanpa flashdisk, dan mengakses materi belajar.',
        'Jaringan Lokal (LAN - Local Area Network): Jaringan yang mencakup area kecil terbatas, seperti ruang laboratorium komputer sekolah atau rumah.',
        'Internet (Interconnected Network): Jaringan komputer raksasa di seluruh penjuru dunia yang saling terhubung tanpa batas negara.',
        'Media transmisi: Menggunakan Kabel (Kabel UTP/LAN dengan colokan RJ-45) atau Nirkabel/Tanpa Kabel (Wi-Fi, Bluetooth, Sinyal 4G/5G).'
      ],
      content: `## Apa itu Jaringan Komputer?

Bayangkan jika di ruang laboratorium komputer sekolahmu ada 30 komputer, tetapi sekolah hanya memiliki **1 mesin printer**. Apakah setiap kali siswa mau mencetak tugas harus mencabut kabel printer dan memindahkannya ke 30 meja siswa? Tentu sangat repot!

Solusinya adalah menghubungkan semua komputer tersebut ke dalam sebuah **Jaringan Komputer (*Computer Network*)**. Dengan jaringan, ke-30 komputer siswa bisa mencetak tugas ke printer yang sama secara bergantian tanpa perlu berpindah tempat!

---

### Perbedaan Jaringan Lokal (LAN) vs Internet

\`\`\`
   [ JARINGAN LOKAL - LAN ]                  [ JARINGAN GLOBAL - INTERNET ]
   (Skala Kecil: Lab Komputer Sekolah)       (Skala Raksasa: Seluruh Dunia)
   +---------------------------------+       +------------------------------------+
   | - Komputer Siswa 1              |       | - Server Google di Amerika Serikat |
   | - Komputer Siswa 2              | ----> | - Server Video YouTube             |
   | - Komputer Guru                 |       | - Website Perpustakaan Nasional    |
   | - Mesin Printer Lab             |       | - Jutaan komputer di berbagai benua|
   +---------------------------------+       +------------------------------------+
\`\`\`

| Ciri-Ciri | Jaringan Lokal (LAN) | Internet |
| :--- | :--- | :--- |
| **Kepanjangan** | *Local Area Network* | *Interconnected Network* |
| **Jangkauan Area** | Terbatas (1 ruangan lab, 1 gedung sekolah, atau rumah) | Seluruh dunia tanpa batas negara |
| **Kecepatan Transfer** | Sangat cepat karena jaraknya dekat | Bergantung pada kecepatan paket internet penyedia layanan (ISP) |
| **Kebutuhan Kuota** | Tidak perlu kuota internet untuk berbagi file antar komputer lokal | Memerlukan kuota internet atau koneksi penyedia layanan internet |

---

### Media Penghubung Jaringan: Kabel vs Tanpa Kabel

1. **Jaringan Berkabel (*Wired Network*)**:
   - Menghubungkan komputer menggunakan **Kabel UTP / LAN** dengan kepala colokan transparan bernama **RJ-45**.
   - **Kelebihan**: Sangat stabil, jarang putus, dan kecepatannya kencang. Cocok untuk komputer PC di lab sekolah.

2. **Jaringan Tanpa Kabel (*Wireless / Nirkabel*)**:
   - Menghubungkan perangkat menggunakan gelombang radio tak kasat mata.
   - **Wi-Fi**: Jangkauan sekitar 10 - 30 meter di sekitar router. Biasa dipakai di smartphone, laptop, dan tablet.
   - **Bluetooth**: Jangkauan sangat pendek (sekitar 5 - 10 meter) untuk headset, speaker mini, atau transfer foto antar HP.
   - **Data Seluler (4G / 5G)**: Jangkauan luas dari menara BTS operator seluler.`,
      realWorldAnalogy: {
        title: 'Bicara Langsung vs Menelpon Antar Kota',
        story: 'Jaringan LAN itu seperti kamu mengobrol dengan teman sekelasmu di dalam ruangan kelas yang sama: suaramu terdengar sangat jelas, cepat, dan tidak butuh pulsa telepon. Sedangkan Internet itu seperti kamu menelpon saudaramu yang berada di luar pulau atau luar negeri: kamu memerlukan jaringan operator dan pulsa agar gelombang suaramu bisa sampai ke benua lain.',
        takeaway: 'LAN menghubungkan perangkat yang berdekatan, sedangkan Internet menghubungkan seluruh dunia.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Cek Perangkat yang Terhubung', detail: 'Perhatikan apakah ada komputer, printer, atau smart TV yang saling terhubung.' },
        { step: 2, title: 'Lihat Media Penghubung', detail: 'Periksa apakah menggunakan kabel LAN warna-warni atau menggunakan sinyal Wi-Fi tanpa kabel.' },
        { step: 3, title: 'Tentukan Jenis Jaringan', detail: 'Jika hanya di dalam satu ruangan -> LAN. Jika bisa membuka website luar negeri -> Internet.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira Wi-Fi itu sama dengan Internet.',
          correction: 'Wi-Fi adalah teknologi nirkabel (gelombang radio) untuk menghubungkan HP ke router. Jika router tidak dipasangi kabel internet, kamu tetap bisa terhubung ke Wi-Fi tapi tidak bisa membuka website (ada tanda "No Internet").',
          why: 'Wi-Fi hanyalah kabel tak kasat mata, sedangkan Internet adalah jaringan data globalnya.'
        }
      ],
      examTips: 'Ingat kepanjangan singkatan: LAN = Local Area Network. Kabel yang dipakai di lab komputer = Kabel UTP dengan konektor RJ-45.',
      interactiveDemo: 'network-subnet-calculator',
      glossaryTerms: [
        { term: 'Jaringan Komputer', definition: 'Sistem yang menghubungkan dua atau lebih komputer agar dapat bertukar data dan berbagi perangkat.' },
        { term: 'LAN (Local Area Network)', definition: 'Jaringan komputer yang jangkauannya hanya meliputi area lokal kecil seperti satu lab atau gedung sekolah.' },
        { term: 'Internet', definition: 'Jaringan komputer raksasa sedunia yang saling terhubung membentuk komunikasi global.' },
        { term: 'Wi-Fi', definition: 'Teknologi jaringan nirkabel yang memanfaatkan gelombang radio untuk bertukar data.' }
      ]
    },
    {
      id: 'sec-4-2',
      title: '2. Cara Kerja Internet, Alamat IP & Nama Domain Web (URL)',
      estimatedMinutes: 15,
      keyPoints: [
        'Setiap perangkat yang terhubung ke internet memiliki nomor pengenal unik yang disebut Alamat IP (IP Address).',
        'Alamat IP berfungsi seperti nomor rumah dan kode pos agar paket data terkirim tepat sasaran dan tidak nyasar.',
        'Manusia kesulitan menghafal deretan angka IP, sehingga diciptakan Sistem Nama Domain (DNS / Domain Name System) yang mudah dibaca.',
        'Contoh alamat website: www.kemdikbud.go.id, google.com, atau sman1prestasibangsa.sch.id.',
        'Domain khusus di Indonesia: .sch.id untuk sekolah, .go.id untuk instansi pemerintah, dan .ac.id untuk kampus universitas.'
      ],
      content: `## Bagaimana Komputer Menemukan Website di Internet?

Saat kamu mengetik **\`www.google.com\`** di peramban (browser) HP atau laptop, bagaimana komputer bisa tahu ke mana harus mencari halaman web tersebut dalam hitungan detik?

Ternyata, caranya mirip sekali dengan cara Pak Pos mengirim surat ke alamat rumahmu!

---

### 1. Alamat IP (*IP Address*): Alamat Rumah Digital

Setiap HP, laptop, dan komputer di dunia yang terhubung ke jaringan memiliki nomor identitas unik yang disebut **Alamat IP (*Internet Protocol Address*)**.

Contoh bentuk Alamat IP (IPv4):
\`\`\`
   192.168.1.15
   172.217.194.100  <-- Ini sebenarnya adalah alamat server Google!
\`\`\`

Jika komputermu ingin meminta halaman web dari server Google, komputermu harus mengirim pesan ke nomor IP tersebut.

---

### 2. Mengapa Ada Nama Website (Domain / URL)?

Bayangkan jika kamu harus menghafal angka **\`172.217.194.100\`** hanya untuk membuka Google, atau menghafal **\`157.240.241.35\`** untuk membuka Instagram. Pasti kepalamu akan pusing!

Oleh karena itu, para ahli komputer menciptakan buku telepon pintar yang disebut **DNS (*Domain Name System*)**. DNS mengubah nama website yang mudah dibaca manusia menjadi nomor IP yang dipahami komputer:

\`\`\`
   Siswa mengetik di browser:       Buku Telepon DNS menerjemahkan:        Komputer terhubung ke:
   "www.sman1prestasibangsa.sch.id" ------------> DNS Server ------------> Server IP: 103.247.112.5
\`\`\`

---

### Mengenal Akhiran Nama Domain di Indonesia:

| Akhiran Domain | Pengguna / Jenis Website | Contoh Website |
| :--- | :--- | :--- |
| **.sch.id** | Sekolah di Indonesia (*School Indonesia*) | \`sman1jakarta.sch.id\` |
| **.go.id** | Lembaga / Kementerian Pemerintah (*Government*) | \`kemdikbud.go.id\` |
| **.ac.id** | Kampus / Universitas (*Academic Indonesia*) | \`ugm.ac.id\`, \`ui.ac.id\` |
| **.com** | Perusahaan komersial umum dunia (*Commercial*) | \`google.com\`, \`youtube.com\` |
| **.org** | Organisasi nirlaba / sosial (*Organization*) | \`wikipedia.org\` |`,
      realWorldAnalogy: {
        title: 'Buku Kontak Telepon di Smartphone',
        story: 'Di HP-mu, kamu tidak perlu mengingat 12 digit nomor telepon ibumu (misal: 0812-3456-7890). Kamu cukup mencari nama "Ibu" di daftar kontak lalu menekan tombol panggil. Aplikasi kontak di HP-lah yang otomatis menghubungi nomor telepon di balik nama tersebut. Itulah persis cara kerja Domain Name System (DNS) di internet!',
        takeaway: 'Domain adalah nama yang ramah manusia, sedangkan IP Address adalah nomor telepon yang dipahami mesin.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Ketik Alamat Web', detail: 'Tuliskan nama website di kolom pencarian browser (URL).' },
        { step: 2, title: 'Penerjemahan DNS', detail: 'Sistem DNS mencari nomor IP dari nama website yang kamu ketik.' },
        { step: 3, title: 'Koneksi ke Server', detail: 'Komputer mengirim permintaan halaman web ke nomor IP tersebut.' },
        { step: 4, title: 'Halaman Muncul', detail: 'Server mengirimkan tampilan web ke layar monitormu.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira semua website di internet berakhiran .com.',
          correction: 'Ada banyak sekali akhiran domain. Khusus sekolah di Indonesia, domain resminya selalu berakhiran .sch.id.',
          why: 'Penggunaan .sch.id memerlukan surat izin resmi dari kepala sekolah dan dinas pendidikan.'
        }
      ],
      examTips: 'Jika ada soal tentang domain resmi sekolah di Indonesia, jawabannya pasti berakhiran .sch.id (School Indonesia).',
      interactiveDemo: 'network-subnet-calculator',
      glossaryTerms: [
        { term: 'Alamat IP (IP Address)', definition: 'Deretan nomor identitas unik yang dimiliki setiap perangkat yang terhubung ke jaringan komputer.' },
        { term: 'Nama Domain', definition: 'Nama alamat website yang mudah dibaca dan diingat manusia (seperti kemdikbud.go.id).' },
        { term: 'DNS (Domain Name System)', definition: 'Sistem buku telepon internet yang menerjemahkan nama domain menjadi nomor alamat IP.' }
      ]
    },
    {
      id: 'sec-4-3',
      title: '3. Panduan Keamanan Berinternet bagi Siswa SMA',
      estimatedMinutes: 10,
      keyPoints: [
        'Internet memiliki banyak manfaat untuk belajar, namun juga memiliki bahaya jika kita tidak berhati-hati.',
        'Situs web yang aman menggunakan tanda gembok terkunci dan berawalan HTTPS (bukan HTTP biasa).',
        'Password yang kuat minimal 8-12 karakter, menggabungkan huruf besar, huruf kecil, angka, dan simbol unik (contoh: Belajar!Info#26).',
        'Jangan pernah membagikan password atau kode OTP kepada siapa pun, termasuk teman sekelas!',
        'Waspada terhadap link jebakan (Phishing) yang mengiming-imingi hadiah kuota gratis atau skin game gratis.'
      ],
      content: `## Tips Berselancar di Internet dengan Aman

Sebagai siswa SMA yang cerdas, kita harus tahu cara melindungi akun dan data pribadi kita saat menjelajah internet. Berikut adalah 4 aturan emas keamanan internet:

---

### 1. Periksa Tanda Gembok Aman: HTTPS

Saat membuka website sekolah, media sosial, atau toko online, selalu perhatikan tulisan di bagian kiri atas bilah alamat browser:
- **Tanda Gembok Terkunci / \`HTTPS://\`**: **AMAN!** Huruf "S" berarti *Secure* (Aman). Semua ketikan nama dan passwordmu diacak (dienkripsi) sehingga tidak bisa diintip orang lain di jaringan Wi-Fi yang sama.
- **\`HTTP://\` (Tanpa gembok)**: **HATI-HATI!** Data yang kamu ketik tidak dienkripsi dan bisa dibaca oleh orang lain yang usil.

---

### 2. Cara Membuat Kata Sandi (Password) yang Kuat

Banyak siswa membuat password yang sangat mudah ditebak, seperti: \`123456\`, \`password\`, atau tanggal lahir seperti \`budi2012\`. Password seperti itu bisa dibobol orang hanya dalam hitungan detik!

\`\`\`
   CONTOH PASSWORD LEMAH (JANGAN DITIRU!):
   ❌ 12345678          (Terlalu mudah ditebak)
   ❌ tanggal lahir     (Bisa dilihat teman di buku presensi)
   ❌ nama panggilan    (Sangat mudah dicoba-coba)
   
   CONTOH PASSWORD KUAT & AMAN:
   ✅ Belajar!Informatika#26
   ✅ Kucing@Oren$Melompat99
   (Kombinasi huruf besar, kecil, angka, dan simbol seperti ! @ # $)
\`\`\`

---

### 3. Waspada Jebakan Phishing (Pancingan Link Palsu)

Pernahkah kamu menerima pesan WhatsApp berbunyi:  
*"Selamat! Nomor HP kamu memenangkan hadiah kuota 50 GB gratis dari pemerintah. Klik link di bawah ini dan masukkan nomor HP serta passwordmu sekarang!"*

**AWAS! ITU PENIPUAN (PHISHING)!**  
Penipu sengaja membuat halaman web tiruan yang mirip dengan aslinya untuk memancing kamu mengetikkan username dan password. Jika kamu mengetiknya, akunmu akan dicuri penipu.

> 🛡️ **Tips Menghindari Phishing:**  
> Jangan pernah mengklik link yang mencurigakan dari nomor yang tidak dikenal. Selalu tanyakan kepada guru atau orang tuamu terlebih dahulu!`,
      realWorldAnalogy: {
        title: 'Kunci Pintu Rumah yang Kuat',
        story: 'Password itu seperti kunci pintu rumahmu. Jika kuncinya hanya berupa kawat tipis yang gampang dibuka siapa saja (password lemah), pencuri bisa dengan mudah masuk dan mengambil barang di kamarmu. Tetapi jika rumahmu memakai gembok baja dengan kode kombinasi rahasia yang hanya kamu yang tahu (password kuat), rumahmu akan sangat aman!',
        takeaway: 'Gunakan password yang kuat dan jangan pernah menitipkan kunci rumahmu kepada orang lain.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Lihat Gembok Browser', detail: 'Pastikan website yang kamu buka memiliki ikon gembok HTTPS di sebelah kiri nama website.' },
        { step: 2, title: 'Gunakan Password Unik', detail: 'Gabungkan huruf besar, angka, dan tanda baca unik.' },
        { step: 3, title: 'Jaga Kerahasiaan OTP', detail: 'Jangan pernah memberikan kode verifikasi SMS / OTP kepada siapa pun.' },
        { step: 4, title: 'Hati-hati Wi-Fi Publik', detail: 'Hindari login akun penting saat tersambung ke Wi-Fi gratisan yang tidak memiliki sandi.' }
      ],
      commonMistakes: [
        {
          mistake: 'Menggunakan satu password yang sama persis untuk semua akun medsos, game, dan email sekolah.',
          correction: 'Jika satu akun bocor, semua akun lainnya akan ikut terbongkar. Gunakan variasi password yang berbeda untuk akun penting.',
          why: 'Membedakan password mencegah pembobolan berantai.'
        }
      ],
      examTips: 'Ciri-ciri website aman: menggunakan protokol HTTPS dan ada simbol gembok terkunci. Karakteristik password kuat: minimal 8 karakter dengan campuran huruf, angka, dan simbol.',
      interactiveDemo: 'network-subnet-calculator',
      glossaryTerms: [
        { term: 'HTTPS', definition: 'Protokol komunikasi internet yang aman dan dienkripsi untuk melindungi kerahasiaan data pengguna.' },
        { term: 'Phishing', definition: 'Upaya penipuan online dengan memancing korban agar membocorkan informasi rahasia seperti password atau PIN.' },
        { term: 'Password', definition: 'Kata sandi rahasia yang digunakan untuk mengunci dan membuka akses ke akun pengguna.' }
      ]
    }
  ],
  videoTutorialId: 'vid-4',
  questions: [
    {
      id: 'q-4-1',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Jaringan komputer yang menghubungkan seluruh komputer siswa dan printer di dalam satu ruang laboratorium komputer sekolah disebut jaringan...',
      options: [
        'LAN (Local Area Network)',
        'WAN (Wide Area Network)',
        'Internet Global',
        'Satelit Luar Angkasa'
      ],
      correctAnswer: 0,
      hint: 'Jaringan ini mencakup area lokal berskala kecil dalam satu ruangan atau gedung sekolah.',
      explanation: 'LAN (Local Area Network) adalah jaringan komputer yang jangkauannya terbatas pada area lokal kecil, seperti ruang laboratorium komputer atau gedung sekolah.',
      learningObjective: 'Membedakan jenis-jenis jaringan komputer berdasarkan jangkauan area.'
    },
    {
      id: 'q-4-2',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Manakah dari alamat website berikut ini yang merupakan alamat website resmi untuk sekolah di Indonesia?',
      options: [
        'www.sman1prestasibangsa.sch.id',
        'www.sman1prestasibangsa.go.id',
        'www.sman1prestasibangsa.ac.id',
        'www.sman1prestasibangsa.com'
      ],
      correctAnswer: 0,
      hint: 'Ekstensi domain khusus untuk sekolah (School Indonesia) berakhiran .sch.id.',
      explanation: 'Ekstensi domain .sch.id dikhususkan untuk institusi sekolah di Indonesia, sedangkan .go.id untuk instansi pemerintah, dan .ac.id untuk perguruan tinggi.',
      learningObjective: 'Mengenal ekstensi nama domain website di Indonesia.'
    },
    {
      id: 'q-4-3',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Dari contoh-contoh kata sandi berikut ini, manakah kata sandi yang PALING KUAT dan aman untuk melindungi akun belajar siswa?',
      options: [
        '12345678',
        'sman1hebat',
        'B3laj4r!Info#2026',
        '01012012'
      ],
      correctAnswer: 2,
      hint: 'Pilihlah yang menggabungkan huruf besar, huruf kecil, angka, dan simbol unik (!, #).',
      explanation: 'Kata sandi "B3laj4r!Info#2026" sangat kuat karena memiliki panjang lebih dari 12 karakter dan mengombinasikan huruf besar, huruf kecil, angka pengganti, serta simbol tanda baca unik (! dan #).',
      learningObjective: 'Menerapkan pembuatan kata sandi yang aman untuk akun digital.'
    },
    {
      id: 'q-4-4',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Topologi jaringan komputer di mana setiap komputer klien dihubungkan langsung ke satu perangkat konsentrator pusat (Switch/Hub) menggunakan kabel UTP disebut topologi...',
      options: [
        'Topologi Bintang (Star Topology)',
        'Topologi Bus',
        'Topologi Cincin (Ring Topology)',
        'Topologi Jala (Mesh Topology)'
      ],
      correctAnswer: 0,
      hint: 'Bentuk bentangan jaringannya menyerupai bintang yang memancar dari satu titik tengah (switch).',
      explanation: 'Topologi Star menghubungkan semua node klien ke satu titik pusat (Switch). Kelebihannya adalah jika salah satu kabel klien putus, komputer lain tidak terganggu.',
      learningObjective: 'Menganalisis karakteristik dan kelebihan topologi jaringan Star.'
    },
    {
      id: 'q-4-5',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Sebuah komputer di laboratorium memiliki alamat IPv4: 192.168.10.15 dengan subnet mask 255.255.255.0 (/24). Manakah alamat Jaringan (Network ID) dari segmen jaringan tersebut?',
      options: [
        '192.168.10.0',
        '192.168.10.255 (Alamat Broadcast)',
        '192.168.0.0',
        '192.168.10.1'
      ],
      correctAnswer: 0,
      hint: 'Dengan mask /24 (255.255.255.0), tiga oktet pertama adalah porsi jaringan dan oktet terakhir diisi 0 untuk Network ID.',
      explanation: 'Pada subnet mask /24, bagian network adalah 192.168.10. Host ID bernilai 0 dialokasikan khusus sebagai Alamat Jaringan (Network ID), yaitu 192.168.10.0.',
      learningObjective: 'Menentukan Network ID dan pembagian porsi host pada pengalamatan IPv4.'
    },
    {
      id: 'q-4-6',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Perangkat keras jaringan yang bertugas meneruskan dan mengarahkan paket data antar dua jaringan yang berbeda subnet atau teknologi (misalnya menghubungkan jaringan LAN sekolah ke jaringan Internet publik penyedia ISP) adalah...',
      options: [
        'Router',
        'Switch',
        'Repeater',
        'Network Interface Card (NIC)'
      ],
      correctAnswer: 0,
      hint: 'Perangkat ini melakukan routing paket data berdasarkan tabel rute alamat IP tujuan.',
      explanation: 'Router beroperasi pada Network Layer (Layer 3) dan bertugas menghubungkan jaringan-jaringan yang berbeda segmen IP serta memilih rute data terbaik (routing).',
      learningObjective: 'Membedakan fungsi perangkat jaringan Router dan Switch.'
    },
    {
      id: 'q-4-7',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Ketika siswa membuka browser dan mengetik alamat "kemdikbud.go.id", sistem apakah yang bertugas menerjemahkan nama domain tersebut menjadi alamat IP numerik server web?',
      options: [
        'DNS (Domain Name System)',
        'DHCP (Dynamic Host Configuration Protocol)',
        'FTP (File Transfer Protocol)',
        'HTML (Hypertext Markup Language)'
      ],
      correctAnswer: 0,
      hint: 'Sistem ini berfungsi layaknya "buku telepon" internet yang memetakan nama ke nomor telepon.',
      explanation: 'DNS (Domain Name System) adalah basis data terdistribusi yang menerjemahkan nama domain yang mudah diingat manusia (seperti kemdikbud.go.id) menjadi alamat IP yang dipahami komputer.',
      learningObjective: 'Menjelaskan mekanisme kerja Domain Name System (DNS) di internet.'
    },
    {
      id: 'q-4-8',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Mengapa saat mengakses portal ujian atau perbankan kita wajib memastikan alamat website diawali dengan "https://" dan berikon gembok terkunci, bukan hanya "http://"?',
      options: [
        'Karena HTTPS menggunakan protokol SSL/TLS yang mengenkripsi data kiriman agar tidak dapat disadap (eavesdropping) oleh pihak ketiga',
        'Karena HTTPS membuat koneksi internet berkecepatan 100 kali lebih kencang',
        'Karena HTTP sudah dilarang oleh seluruh operator seluler',
        'Karena HTTPS menjamin komputer pengguna bebas dari kerusakan fisik'
      ],
      correctAnswer: 0,
      hint: 'Huruf "S" pada HTTPS berarti "Secure", dengan enkripsi jalur data menggunakan sertifikat SSL/TLS.',
      explanation: 'HTTPS (Hypertext Transfer Protocol Secure) mengenkripsi seluruh komunikasi antara browser dan server dengan TLS/SSL, sehingga kata sandi atau data rahasia tidak dapat diintip oleh penyerang jaringan.',
      learningObjective: 'Menganalisis pentingnya enkripsi SSL/TLS pada protokol HTTPS.'
    },
    {
      id: 'q-4-9',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Pada model arsitektur 4 lapisan TCP/IP, protokol HTTP (web), DNS (resolusi nama), dan SMTP (email) berada pada lapisan yang sama, yaitu...',
      options: [
        'Lapisan Aplikasi (Application Layer)',
        'Lapisan Transportasi (Transport Layer)',
        'Lapisan Internet / Jaringan (Internet Layer)',
        'Lapisan Antarmuka Jaringan (Network Access Layer)'
      ],
      correctAnswer: 0,
      hint: 'Lapisan ini berinteraksi langsung dengan aplikasi perangkat lunak yang dipakai pengguna akhir.',
      explanation: 'HTTP, DNS, FTP, dan SMTP semuanya adalah protokol Application Layer (Lapisan Aplikasi) pada model TCP/IP yang melayani langsung program perangkat lunak pemakai.',
      learningObjective: 'Mengklasifikasikan protokol komunikasi ke dalam lapisan model TCP/IP.'
    },
    {
      id: 'q-4-10',
      moduleId: 'mod-4',
      element: 'JKI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Sistem keamanan jaringan yang memantau, menyaring, dan mengontrol lalu lintas data masuk maupun keluar berdasarkan aturan keamanan yang telah ditentukan disebut...',
      options: [
        'Firewall',
        'Web Browser',
        'VGA Card',
        'Kabel Coaxial'
      ],
      correctAnswer: 0,
      hint: 'Nama sistem ini mengibaratkan sebuah "dinding api" penyekat yang menahan bahaya dari luar.',
      explanation: 'Firewall berfungsi sebagai filter barikade antara jaringan privat internal dan jaringan publik internet guna mencegah akses ilegal dan serangan peretas.',
      learningObjective: 'Menjelaskan prinsip kerja Firewall dalam pengamanan jaringan komputer.'
    }
  ]
};
