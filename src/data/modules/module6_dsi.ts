import { InteractiveModule } from '../../types';
import { SMA_IMAGES } from '../smaImages';

export const module6_dsi: InteractiveModule = {
  id: 'mod-6',
  number: 6,
  title: 'Dampak Sosial Informatika & Etika Digital',
  element: 'DSI',
  classLevel: 'SMA',
  curriculum: 'Kurikulum Merdeka (SMA)',
  estimatedMinutes: 40,
  iconName: 'ShieldCheck',
  coverImage: SMA_IMAGES.bab6_dsi,
  summary: 'Mempelajari etika berkomunikasi di internet (Netiket), mengenali dan melawan perundungan siber (Cyberbullying), menjaga kerahasiaan data pribadi, mewaspadai berita bohong (Hoaks), serta menghargai hak cipta digital.',
  learningObjectives: [
    'Menerapkan etika berkomunikasi dan sopan santun saat berinteraksi di media sosial maupun grup chat kelas (Netiket).',
    'Mengenali bentuk-bentuk perundungan siber (Cyberbullying) dan melakukan tindakan Stop-Block-Tell.',
    'Membedakan data umum yang boleh dibagikan dengan data pribadi rahasia yang wajib dilindungi.',
    'Mendeteksi ciri-ciri berita bohong (Hoaks) dan penipuan digital dengan prinsip "Saring Sebelum Sharing".'
  ],
  galleryImages: [
    {
      id: 'img-dsi-sma-1',
      url: SMA_IMAGES.bab6_dsi,
      caption: 'Praktikum Siswa SMA: Workshop studi kasus hukum siber (UU ITE), presentasi perlindungan privasi data, dan etika kecerdasan buatan.',
      alt: 'Foto Praktikum Siswa-Siswi SMA Studi Kasus Dampak Sosial Informatika',
      source: 'Dokumentasi Laboratorium Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Etika Digital', 'UU ITE', 'Cyber Security', 'Workshop'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-dsi-sma-2',
      url: SMA_IMAGES.bab6_dsi_alt,
      caption: 'Praktikum Diskusi Etika Digital Siswa SMA: Bedah kasus jejak digital, pencegahan cyberbullying, dan verifikasi fakta berita hoaks.',
      alt: 'Foto Siswa SMA Diskusi Etika Siber & Keamanan Data',
      source: 'Laboratorium Komputer SMA Kurikulum Merdeka',
      tags: ['Siswa SMA', 'Praktikum', 'Literasi Digital', 'Anti-Hoaks'],
      aspectRatio: '16:9'
    },
    {
      id: 'img-dsi-sma-3',
      url: SMA_IMAGES.bab6_ethics_students,
      caption: 'Praktikum Presentasi Keamanan Data Siswa SMA: Kampanye kesadaran keamanan kata sandi, otentikasi dua faktor, dan lisensi hak cipta digital.',
      alt: 'Foto Siswa-Siswi SMA Kampanye Keamanan Digital',
      source: 'Dokumentasi Praktik Dampak Sosial Informatika SMA',
      tags: ['Siswa SMA', 'Praktikum', 'Keamanan Data', 'Hak Cipta'],
      aspectRatio: '16:9'
    }
  ],
  sections: [
    {
      id: 'sec-6-1',
      title: '1. Etika Berinternet (Netiket) & Melawan Cyberbullying',
      estimatedMinutes: 15,
      keyPoints: [
        'Netiket (Network Etiquette) adalah aturan tata krama dan sopan santun saat berkomunikasi di dunia maya atau internet.',
        'Di balik layar HP atau komputer lawan bicaramu adalah manusia nyata yang memiliki perasaan, sama seperti saat bertemu langsung tatap muka.',
        'Hindari mengetik menggunakan SEMUA HURUF BESAR (KAPITAL), karena di dunia digital itu dianggap seperti membentak atau berteriak marah.',
        'Cyberbullying adalah perundungan atau ejekan berulang menggunakan teknologi digital yang dapat melukai hati korban.',
        'Langkah menghadapi Cyberbullying: STOP (jangan membalas mengejek), BLOCK (blokir akun pengganggu), dan TELL (laporkan ke guru atau orang tua).'
      ],
      content: `## Bergaul Santun di Dunia Maya (Netiket)

Pernahkah kamu mengirim pesan teks ke teman atau guru di grup WhatsApp? Meskipun kita tidak bertatap muka secara langsung, tata krama dan rasa saling menghargai tetap wajib kita jaga!

Konsep tata krama dan etika pergaulan di ruang digital ini dikenal dengan istilah Netiket atau Network Etiquette, yaitu perpaduan dari kata Network yang berarti jaringan internet dan Etiquette yang berarti etika kesantunan. Netiket mengajarkan kita bahwa meskipun komunikasi berlangsung tanpa tatap muka langsung, setiap orang di balik layar gawai adalah manusia nyata yang memiliki perasaan, martabat, dan hak untuk dihargai. Dengan menerapkan etika berinternet yang baik, suasana pergaulan di media sosial dan ruang belajar digital akan senantiasa positif, aman, dan saling mendukung.

---

### Aturan Emas Netiket untuk Siswa SMA:

\`\`\`
   +---------------------------------------------------------------+
   |             5 ATURAN EMAS BERKOMUNIKASI DI GRUP CHAT          |
   +---------------------------------------------------------------+
   | 1. Selalu awali dengan salam (Contoh: "Selamat siang Ibu...") |
   | 2. Jangan gunakan HURUF BESAR SEMUA (dianggap membentak!)     |
   | 3. Gunakan bahasa yang sopan, hindari kata-kata kotor/kasar   |
   | 4. Jangan menyebarkan stiker atau pesan spam yang mengganggu  |
   | 5. Hormati perbedaan pendapat dan jangan mengejek teman       |
   +---------------------------------------------------------------+
\`\`\`

---

### Mengenal Perundungan Siber (Cyberbullying)

Perundungan Siber atau Cyberbullying merupakan tindakan yang disengaja dan berulang untuk menyakiti, mengintimidasi, mempermalukan, atau mengucilkan orang lain dengan memanfaatkan media sosial, game online, atau aplikasi percakapan digital. Tindakan ini dapat menimbulkan dampak psikologis yang mendalam bagi korban, seperti hilangnya rasa percaya diri, kecemasan, hingga trauma emosional berkepanjangan.

Bentuk perundungan ini sering kali ditemui dalam bentuk ejekan fisik atau body shaming di kolom komentar, penyebaran foto atau rahasia pribadi tanpa izin, pembuatan akun palsu untuk menjelekkan nama teman sekolah, hingga pengucilan secara sengaja dari grup belajar kelas.

---

### Apa yang Harus Dilakukan Jika Menjadi Korban Bullying? (Langkah 3T)

1. **Tolak (*STOP*)**: Jangan terpancing emosi untuk membalas dengan kata-kata kasar, karena itu hanya akan membuat pelaku semakin senang.
2. **Tahan Bukti & Tangkal (*BLOCK*)**: Lakukan tangkapan layar (*screenshot*) sebagai barang bukti, lalu segera **blokir** akun pelaku agar tidak bisa menghubungimu lagi.
3. **Tuturkan (*TELL*)**: Ceritakan kejadian ini kepada orang yang kamu percaya: **Guru BK, Wali Kelas, atau Orang Tuamu**. Jangan simpan masalah ini sendirian di dalam hati!`,
      realWorldAnalogy: {
        title: 'Cermin dan Bayangan di Balik Layar',
        story: 'Saat kamu mengetik komentar di HP, bayangkan kamu sedang berbicara langsung di depan wajah temanmu di lorong sekolah. Jika kamu tidak tega mengatakan kalimat kasar itu secara langsung di hadapannya, maka jangan pernah mengetikkan kalimat itu di media sosial atau game online!',
        takeaway: 'Ingatlah bahwa setiap pengguna internet adalah manusia nyata yang memiliki perasaan.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Pikirkan Sebelum Mengetik', detail: 'Tanyakan pada diri sendiri: Apakah kata-kata ini sopan? Apakah akan melukai perasaan orang lain?' },
        { step: 2, title: 'Gunakan Salam yang Baik', detail: 'Sebutkan nama dan maksud keperluanmu dengan bahasa yang santun.' },
        { step: 3, title: 'Simpan Bukti Jika Dibully', detail: 'Screenshot pesan atau komentar yang kasar sebagai bukti laporan.' },
        { step: 4, title: 'Laporkan Segera', detail: 'Bicarakan dengan guru atau orang tua untuk mendapatkan bantuan.' }
      ],
      commonMistakes: [
        {
          mistake: 'Menganggap komentar mengejek teman di medsos hanya sebagai "candaan biasa".',
          correction: 'Meskipun niatmu bercanda, jika kata-kata tersebut membuat temanmu sedih, menangis, atau malu, itu sudah termasuk tindakan perundungan (bullying).',
          why: 'Bercanda yang baik adalah saat kedua belah pihak sama-sama tertawa bahagia.'
        }
      ],
      examTips: 'Langkah standar jika mendapati perundungan siber: Simpan bukti tangkapan layar (screenshot), blokir pelaku, dan laporkan kepada guru atau orang tua.',
      interactiveDemo: 'cybersecurity-quiz',
      glossaryTerms: [
        { term: 'Netiket', definition: 'Etika atau tata krama sopan santun saat berkomunikasi melalui internet.' },
        { term: 'Cyberbullying', definition: 'Bentuk perundungan atau intimidasi yang dilakukan melalui teknologi digital atau media sosial.' },
        { term: 'Screenshot', definition: 'Tangkapan gambar dari apa yang sedang tampil di layar ponsel atau komputer.' }
      ]
    },
    {
      id: 'sec-6-2',
      title: '2. Menjaga Privasi & Perlindungan Data Pribadi',
      estimatedMinutes: 15,
      keyPoints: [
        'Data pribadi adalah informasi mengenai diri kita yang dapat digunakan orang lain untuk mengidentifikasi keberadaan kita.',
        'Data Pribadi RAHASIA yang TIDAK BOLEH disebar: Nomor telepon pribadi, alamat rumah lengkap, nama ibu kandung, kata sandi, kode OTP, dan foto Kartu Keluarga.',
        'Data yang boleh dibagikan: Nama panggilan, karya puisi/gambar buatan sendiri, dan prestasi sekolah yang membanggakan.',
        'Jejak Digital (Digital Footprint) adalah rekam jejak aktivitas kita di internet yang akan tersimpan selamanya dan sulit dihapus.',
        'Jangan pernah membagikan foto lokasi terkini (Live Location) di tempat umum secara sembarangan kepada orang yang tidak dikenal.'
      ],
      content: `## Lindungi Data Pribadimu dari Bahaya!

Pernahkah kamu diminta mengisi formulir online di game atau media sosial yang menanyakan:  
*"Di mana alamat rumah lengkapmu? Siapa nama gadis ibumu? Apa nomor HP ayahmu?"*

**BERHENTI! JANGAN PERNAH DIBERIKAN!**  
Informasi tersebut adalah **Data Pribadi yang Sangat Sensitif**. Jika data tersebut jatuh ke tangan orang jahat, mereka bisa melakukan penipuan atas namamu atau bahkan mendatangi rumahmu!

---

### Pilah-Pilih: Data Boleh Dibagikan vs Data Rahasia

\`\`\`
   DATA YANG BOLEH DIBAGIKAN (UMUM)         DATA RAHASIA (JANGAN DISEBARKAN!)
   +------------------------------------+   +---------------------------------------+
   | - Nama panggilan kamu             |   | - Alamat lengkap rumah & nomor RT/RW  |
   | - Hobi (misal: menggambar, robotik)|   | - Nomor WhatsApp pribadi              |
   | - Foto karya lukisan buatanmu     |   | - Foto Kartu Keluarga (KK) / KTP ortu |
   | - Cita-cita masa depanmu           |   | - Kata sandi (Password) & PIN ATM     |
   | - Prestasi lomba sekolah          |   | - Kode SMS OTP rahasia                |
   +------------------------------------+   | - Nama gadis ibu kandung              |
                                            +---------------------------------------+
\`\`\`

---

### Mengenal Jejak Digital (*Digital Footprint*)

Pernahkah kamu berjalan di atas pasir pantai basah? Setiap langkah kakimu akan meninggalkan bekas jejak kaki yang jelas.

Di internet, hal yang sama juga terjadi! Setiap foto yang kamu unggah, komentar yang kamu tulis, dan video yang kamu tonton akan meninggalkan **Jejak Digital (*Digital Footprint*)**.
- Sekali kamu mengunggah foto konyol atau komentar bernada marah, orang lain bisa mengunduh atau menyimpannya.
- Meskipun kamu sudah menghapus postingan tersebut, jejaknya bisa saja sudah disimpan orang lain dan muncul kembali bertahun-tahun kemudian saat kamu melamar pekerjaan atau mendaftar kuliah!

> 💡 **Kiat Emas Siswa Bijak:**  
> Selalu tanyakan pada dirimu sebelum menekan tombol posting: *"Apakah jika 5 tahun lagi orang tuaku, guruku, atau calon bos tempat kerjaku melihat postingan ini, aku akan merasa bangga atau justru merasa malu?"*`,
      realWorldAnalogy: {
        title: 'Kamar Tidur Pribadi vs Lapangan Upacara',
        story: 'Media sosial itu seperti lapangan upacara sekolah: siapa saja bisa melihat apa yang sedang kamu lakukan di sana. Kamu tentu tidak akan mengganti pakaian atau menaruh buku tabunganmu di tengah lapangan upacara, bukan? Jagalah privasimu di medsos sebagaimana kamu menjaga pintu kamar tidurmu tetap tertutup.',
        takeaway: 'Hargai privasi diri sendiri dan jangan pamerkan informasi rahasia di tempat umum.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Kunci Akun Medsos', detail: 'Atur privasi akun Instagram/TikTok menjadi Private (Hanya teman yang disetujui yang bisa melihat).' },
        { step: 2, title: 'Jangan Unggah Dokumen', detail: 'Jangan pernah memfoto raport ber-NISN lengkap, paspor, atau kartu identitas keluarga.' },
        { step: 3, title: 'Matikan Fitur Lokasi Otomatis', detail: 'Jangan memberi tag lokasi rumah saat mengunggah foto santai.' },
        { step: 4, title: 'Cek Jejak Digital Berkala', detail: 'Ketik namamu di Google sesekali untuk melihat apa saja informasi tentang dirimu yang tampil di internet.' }
      ],
      commonMistakes: [
        {
          mistake: 'Mengira bahwa foto yang dikirim di fitur Story 24 jam akan hilang selamanya tanpa jejak.',
          correction: 'Teman atau orang asing bisa mengambil tangkapan layar (screenshot) dalam hitungan detik sebelum foto itu hilang.',
          why: 'Apa pun yang pernah tampil di layar HP orang lain bisa diabadikan selamanya.'
        }
      ],
      examTips: 'Data yang paling rahasia dan tidak boleh disebarkan di antaranya: Password, Alamat Rumah Lengkap, Nomor Induk Siswa/Kependudukan, dan Kode OTP.',
      interactiveDemo: 'cybersecurity-quiz',
      glossaryTerms: [
        { term: 'Data Pribadi', definition: 'Setiap informasi benar dan nyata mengenai seseorang yang dapat digunakan untuk mengenali identitasnya.' },
        { term: 'Jejak Digital', definition: 'Rekam jejak seluruh riwayat aktivitas seseorang saat menggunakan perangkat dan internet.' },
        { term: 'Privasi', definition: 'Hak seseorang untuk menjaga informasi kehidupan pribadinya agar tidak diketahui atau diakses sembarangan oleh publik.' }
      ]
    },
    {
      id: 'sec-6-3',
      title: '3. Mengenali Hoaks, Penipuan Online & Menghargai Hak Cipta',
      estimatedMinutes: 10,
      keyPoints: [
        'Berita Bohong (Hoaks) adalah informasi yang tidak benar namun sengaja disebarkan untuk membuat orang cemas, panik, atau marah.',
        'Ciri-ciri Hoaks: Judul bombastis yang memancing emosi, kalimat bernada ancaman ("Sebarkan ke 10 grup sekarang juga!"), dan tidak berasal dari sumber resmi.',
        'Gunakan rumus "Saring Sebelum Sharing": Periksa dulu kebenarannya ke situs resmi sebelum meneruskan pesan ke orang lain.',
        'Hak Cipta Digital: Karya gambar, video, musik, dan tulisan orang lain di internet dilindungi hak cipta.',
        'Plagiarisme adalah tindakan menyalin atau meniru karya orang lain lalu mengakuinya sebagai buatan sendiri tanpa menyebutkan sumbernya.'
      ],
      content: `## Saring Sebelum Sharing: Lawan Hoaks & Hargai Karya Orang Lain

Pernahkah kamu menerima pesan WhatsApp berantai dari grup keluarga yang isinya sangat menyeramkan atau membagikan tautan hadiah uang tunai puluhan juta rupiah?

Sebagai generasi muda yang melek teknologi, siswa SMA harus menjadi benteng pertahanan keluarga dari bahaya **Berita Bohong (*Hoaks*)** dan **Penipuan Online**!

---

### Mengenali 4 Ciri Khas Berita Hoaks:

1. **Judul Sangat Bombastis & Memancing Emosi**: Menggunakan kata-kata heboh seperti: *"VIRAL!!", "MENGERIKAN!!", "BACA SEBELUM DIHAPUS PEMERINTAH!!"*.
2. **Memaksa untuk Disebarkan**: Selalu ada kalimat desakan di akhir pesan: *"Kirimkan pesan ini ke 10 grup WhatsApp sekarang atau kamu akan sial!"*.
3. **Tanggal dan Lokasi Tidak Jelas**: Menggunakan kata samar seperti *"Kemarin sore di daerah kita..."* tanpa menyebutkan hari, tanggal, atau kota yang pasti.
4. **Alamat Website Aneh**: Menggunakan domain tiruan yang tidak resmi, contoh: \`www.kemdikbud-gratis-kuota-hadiah.xyz\`.

\`\`\`
   ALUR CERDAS: SARING SEBELUM SHARING!
   
   Terima Berita / Pesan Heboh
               |
               v
   Apakah judulnya memancing emosi atau ada paksaan sebar?
        [ YA ] ---> JANGAN LANGSUNG PERCAYA!
               |
               v
   Cek ke situs resmi: www.kemdikbud.go.id atau media berita terpercaya
               |
               v
   Apakah ada beritanya di sumber resmi?
      /                 \\
   [ YA ]             [ TIDAK ]
     |                    |
   Aman dibagikan!     HOAKS! Hapus pesan dan ingatkan pengirimnya dengan sopan.
\`\`\`

---

### Menghargai Hak Cipta & Menghindari Plagiarisme

Saat kamu mengerjakan tugas makalah atau presentasi kelompok di sekolah:
- **Plagiarisme (Menjiplak)**: Mengambil tulisan atau gambar dari internet lalu mengganti namanya dengan namamu sendiri seolah-olah itu karyamu. Ini adalah perbuatan tidak jujur dan melanggar hukum!
- **Sikap yang Benar**: Kita boleh memanfaatkan gambar atau kutipan tulisan dari internet untuk tugas sekolah, asalkan kita **mencantumkan sumber aslinya** dengan jujur.

*Contoh penulisan sumber pada gambar slide tugasmu:*  
> Sumber Gambar: Dokumentasi Perpustakaan Kemendikbudristek (2024).`,
      realWorldAnalogy: {
        title: 'Memeriksa Tanggal Kedaluwarsa Makanan',
        story: 'Sebelum memakan makanan kaleng yang kamu temukan di lemari, kamu selalu memeriksa label tanggal kedaluwarsanya untuk memastikan makanan itu sehat dan aman dimakan. Membaca berita di internet juga sama: periksa tanggal dan sumber resminya terlebih dahulu agar otakmu tidak kemasukan informasi "beracun" yang berbahaya!',
        takeaway: 'Jangan telan mentah-mentah informasi apa pun sebelum kamu memverifikasi kebenarannya.'
      },
      stepByStepGuide: [
        { step: 1, title: 'Tenangkan Diri', detail: 'Jika membaca berita yang mengejutkan, jangan langsung panik atau marah.' },
        { step: 2, title: 'Periksa Sumbernya', detail: 'Cari tahu siapa yang pertama kali menulis berita tersebut.' },
        { step: 3, title: 'Bandingkan dengan Berita Lain', detail: 'Cari di Google News apakah kantor berita besar juga memberitakannya.' },
        { step: 4, title: 'Cantumkan Sumber Tugas', detail: 'Selalu tuliskan dari mana kamu mendapatkan gambar atau artikel tugasmu.' }
      ],
      commonMistakes: [
        {
          mistake: 'Langsung membagikan pesan heboh ke grup sekolah hanya karena dikirim oleh teman dekat.',
          correction: 'Teman dekatmu mungkin juga menjadi korban yang tertipu. Selalu cek kebenaran faktanya terlebih dahulu sebelum meneruskannya.',
          why: 'Meneruskan berita bohong bisa membuat banyak orang panik dan ketakutan.'
        }
      ],
      examTips: 'Prinsip bijak dalam menghadapi informasi digital adalah "Saring Sebelum Sharing". Plagiarisme berarti mengakui karya orang lain sebagai karya sendiri.',
      interactiveDemo: 'cybersecurity-quiz',
      glossaryTerms: [
        { term: 'Hoaks (Hoax)', definition: 'Berita atau informasi bohong yang sengaja disamarkan seolah-olah benar untuk memperdaya pembaca.' },
        { term: 'Plagiarisme', definition: 'Penjiplakan atau pengambilan karangan atau karya cipta orang lain dan menjadikannya seolah karangan sendiri.' },
        { term: 'Hak Cipta', definition: 'Hak eksklusif bagi pencipta karya seni, sastra, atau perangkat lunak untuk mengatur penggunaan karyanya.' }
      ]
    }
  ],
  videoTutorialId: 'vid-6',
  questions: [
    {
      id: 'q-6-1',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Saat sedang berdiskusi di grup percakapan WhatsApp kelas mengenai tugas kelompok, manakah sikap yang mencerminkan etika berinternet (Netiket) yang baik?',
      options: [
        'Mengetik kalimat menggunakan SEMUA HURUF BESAR agar terbaca jelas',
        'Mengirimkan stiker ejekan secara terus-menerus hingga chat penuh',
        'Mengawali percakapan dengan salam, menggunakan kata sopan, dan menghargai pendapat teman',
        'Mengeluarkan teman dari grup jika tidak sependapat dengan kita'
      ],
      correctAnswer: 2,
      hint: 'Pilihlah sikap yang saling menghargai dan bertutur kata santun.',
      explanation: 'Netiket yang baik mengajarkan kita untuk selalu mengawali obrolan dengan salam, bertutur kata santun, dan menghormati pendapat anggota lain dalam grup.',
      learningObjective: 'Menerapkan etika berkomunikasi yang sopan di dunia maya (Netiket).'
    },
    {
      id: 'q-6-2',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Manakah dari kelompok data berikut ini yang merupakan data pribadi rahasia yang TIDAK BOLEH dibagikan secara bebas di media sosial atau game online?',
      options: [
        'Nama panggilan dan warna seragam sekolah',
        'Hobi bermain sepak bola dan cita-cita menjadi dokter',
        'Alamat rumah lengkap, nomor HP pribadi, dan kata sandi akun',
        'Judul lagu favorit dan buku pelajaran yang disukai'
      ],
      correctAnswer: 2,
      hint: 'Data ini jika disebarkan bisa dimanfaatkan orang jahat untuk membobol akun atau mendatangi rumahmu.',
      explanation: 'Alamat rumah lengkap, nomor telepon pribadi, kata sandi (password), serta kode OTP adalah data pribadi sensitif yang harus dijaga kerahasiaannya demi keamanan diri dan keluarga.',
      learningObjective: 'Mengidentifikasi jenis-jenis data pribadi rahasia yang wajib dilindungi.'
    },
    {
      id: 'q-6-3',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Siti menerima pesan berantai di HP yang menyebutkan bahwa besok seluruh sekolah di kotanya diliburkan karena peristiwa aneh, dengan tulisan "Sebarkan ke 10 orang sekarang juga!". Apakah yang sebaiknya dilakukan Siti?',
      options: [
        'Langsung menyebarkan pesan tersebut ke grup kelas agar teman-temannya senang',
        'Memeriksa kebenaran berita tersebut terlebih dahulu ke wali kelas atau website resmi dinas pendidikan sekolah',
        'Langsung percaya dan memutuskan untuk tidak masuk sekolah besok',
        'Membuat status di media sosial bahwa besok libur'
      ],
      correctAnswer: 1,
      hint: 'Terapkan prinsip "Saring Sebelum Sharing" untuk mencegah peredaran hoaks.',
      explanation: 'Sikap yang bijak adalah memverifikasi kebenaran informasi ke sumber terpercaya (seperti wali kelas atau pengumuman resmi sekolah) sebelum mempercayai atau membagikan pesan yang mencurigakan.',
      learningObjective: 'Menerapkan prinsip "Saring Sebelum Sharing" dalam menghadapi berita hoaks.'
    },
    {
      id: 'q-6-4',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Seorang siswa menerima pesan email berkedok darurat yang mengatasnamakan "Pusat Admin Akun Pembelajaran", meminta korban segera mengklik tautan "http://akunbelajar-verifikasi-update.xyz" dan memasukkan kata sandi dalam 24 jam agar akun tidak diblokir. Upaya penipuan ini merupakan kejahatan siber jenis...',
      options: [
        'Phishing (Pengelabuan Rekayasa Sosial)',
        'DDoS Attack (Penolakan Layanan Terdistribusi)',
        'Brute Force Attack (Tebakan Kata Sandi Kasar)',
        'Defacing Website'
      ],
      correctAnswer: 0,
      hint: 'Pelaku memancing (fishing/phishing) korban menggunakan tautan palsu untuk mencuri kredensial login rahasia.',
      explanation: 'Phishing adalah metode penipuan digital yang menyamar sebagai pihak tepercaya (seperti admin sekolah atau bank) untuk memancing korban menyerahkan informasi sensitif seperti username, password, dan OTP.',
      learningObjective: 'Mengenali karakteristik dan bahaya serangan rekayasa sosial Phishing.'
    },
    {
      id: 'q-6-5',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Sebuah aplikasi pengolah kata dirilis di bawah lisensi Open Source (seperti Lisensi MIT atau GNU GPL). Apakah hak dan kebebasan yang dimiliki oleh siswa atau pengembang lain terhadap perangkat lunak tersebut?',
      options: [
        'Bebas melihat, mempelajari, memodifikasi kode sumbernya, dan mendistribusikannya kembali sesuai aturan lisensi',
        'Hanya boleh menggunakan aplikasi selama 30 hari masa percobaan gratis',
        'Wajib membayar biaya royalti bulanan kepada pencipta pertama',
        'Dilarang keras melihat atau membaca baris kode program'
      ],
      correctAnswer: 0,
      hint: 'Open Source berarti "Kode Sumber Terbuka" bagi komunitas publik untuk dipelajari dan dikembangkan.',
      explanation: 'Perangkat Lunak Sumber Terbuka (Open Source Software) memberikan kebebasan bagi siapa saja untuk menginspeksi, memodifikasi, meningkatkan fungsi, dan membagikan kembali kode programnya secara legal.',
      learningObjective: 'Memahami konsep Hak Cipta, Lisensi Perangkat Lunak, dan Open Source.'
    },
    {
      id: 'q-6-6',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Di Indonesia, penyebaran konten digital yang bermuatan pencemaran nama baik, penghinaan, penyebaran berita bohong yang menyesatkan (hoaks), dan ujaran kebencian diatur serta memiliki sanksi hukum pidana yang tegas dalam...',
      options: [
        'Undang-Undang Informasi dan Transaksi Elektronik (UU ITE)',
        'Undang-Undang Lalu Lintas dan Angkutan Jalan',
        'Peraturan Tata Tertib Organisasi Olahraga',
        'Hukum Internasional Maritim'
      ],
      correctAnswer: 0,
      hint: 'Peraturan perundang-undangan nasional yang mengatur aktivitas transaksi dan informasi elektronik di Indonesia.',
      explanation: 'UU ITE (Undang-Undang Nomor 11 Tahun 2008 beserta perubahannya) mengatur tentang pemanfaatan teknologi informasi serta larangan perbuatan terlarang seperti pencemaran nama baik, penyebaran hoaks, dan akses ilegal.',
      learningObjective: 'Mengetahui regulasi hukum digital (UU ITE) yang berlaku di Republik Indonesia.'
    },
    {
      id: 'q-6-7',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'Mudah',
      question: 'Apakah manfaat utama dari mengaktifkan fitur Otentikasi Dua Langkah (Two-Factor Authentication / 2FA) pada akun email dan media sosial siswa?',
      options: [
        'Memberikan lapisan proteksi tambahan sehingga akun tetap aman meskipun kata sandi diketahui atau dicuri orang lain',
        'Membuat kapasitas penyimpanan cloud menjadi tak terhingga',
        'Menghilangkan seluruh kuota internet saat menonton video edukasi',
        'Mempercepat kinerja kamera smartphone saat mengambil foto'
      ],
      correctAnswer: 0,
      hint: '2FA membutuhkan dua verifikasi: sesuatu yang kamu tahu (password) dan sesuatu yang kamu miliki (kode OTP/HP fisik).',
      explanation: '2FA mewajibkan dua bukti identitas saat login. Sekalipun peretas mengetahui kata sandi, mereka tetap tidak bisa masuk tanpa kode verifikasi kedua yang hanya dikirim ke ponsel sah pemilik akun.',
      learningObjective: 'Menerapkan langkah keamanan siber Two-Factor Authentication (2FA) pada akun pribadi.'
    },
    {
      id: 'q-6-8',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Segala rekam jejak aktivitas digital yang kita tinggalkan di dunia maya—seperti riwayat pencarian Google, unggahan foto, komentar status, hingga koordinat lokasi GPS—dinamakan...',
      options: [
        'Jejak Digital (Digital Footprint)',
        'Cache Memori Sementara',
        'Siklus Fetch Processor',
        'Topologi Jaringan Virtual'
      ],
      correctAnswer: 0,
      hint: 'Jejak ini tertinggal di server internet dan sangat sulit dihapus sepenuhnya, sehingga mempengaruhi reputasi di masa depan.',
      explanation: 'Jejak Digital (Digital Footprint) adalah seluruh data elektronik yang ditinggalkan pengguna saat beraktivitas online. Jejak digital bersifat abadi di server dan dapat dicari kembali oleh pihak institusi kampus atau perekrut kerja.',
      learningObjective: 'Menganalisis dampak jejak digital (Digital Footprint) terhadap reputasi masa depan.'
    },
    {
      id: 'q-6-9',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'Sedang',
      question: 'Sebuah komputer instansi tiba-tiba tidak dapat membuka berkas-berkas pentingnya karena seluruh file terenkripsi secara paksa dengan ekstensi terkunci. Di layar muncul peringatan yang menuntut pembayaran sejumlah uang tebusan dalam waktu 48 jam. Jenis malware berbahaya ini adalah...',
      options: [
        'Ransomware',
        'Adware (Iklan Pop-up)',
        'Screen Saver Otomatis',
        'Driver Printer'
      ],
      correctAnswer: 0,
      hint: 'Kata "Ransom" dalam bahasa Inggris berarti uang tebusan.',
      explanation: 'Ransomware adalah perangkat lunak perusak (malware) yang menyandera data pengguna dengan cara mengenkripsi file, lalu pelaku meminta tebusan (ransom) uang kripto untuk memberikan kunci dekripsi.',
      learningObjective: 'Mengidentifikasi karakteristik dan mitigasi serangan perangkat pemeras (Ransomware).'
    },
    {
      id: 'q-6-10',
      moduleId: 'mod-6',
      element: 'DSI',
      type: 'multiple-choice',
      difficulty: 'HOTS / Sulit',
      question: 'Sebuah perangkat lunak seleksi beasiswa berbasis Artificial Intelligence (AI) secara konsisten memberikan skor rendah pada pelamar dari sekolah di pedesaan, dikarenakan data riwayat masa lalu yang dipakai melatih model AI tersebut 95% berasal dari sekolah perkotaan. Fenomena permasalahan etika AI ini disebut...',
      options: [
        'Bias Algoritma (Algorithmic Bias)',
        'Kerusakan Chip Silikon CPU',
        'Kesalahan Subnet Mask Jaringan',
        'Overheating Pendingin Komputer'
      ],
      correctAnswer: 0,
      hint: 'Terjadi ketidakadilan/bias sistemik karena data latih kecerdasan buatan tidak seimbang dan memihak kelompok tertentu.',
      explanation: 'Bias Algoritma (Algorithmic Bias) terjadi ketika sistem komputasi menghasilkan keputusan yang tidak adil atau diskriminatif secara sistemik karena data pelatihan (training dataset) yang timpang dan mencerminkan prasangka manusia.',
      learningObjective: 'Menganalisis isu etika kecerdasan buatan (AI Ethics) dan bias algoritma dalam masyarakat.'
    }
  ]
};
