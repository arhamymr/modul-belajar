import heroImg from '../assets/images/sma_students_hero_1789892289305.jpg';
import bkImg from '../assets/images/sma_lab_bk_1790998902238.jpg';
import codingImg from '../assets/images/sma_lab_coding_1790998916442.jpg';
import hardwareImg from '../assets/images/sma_lab_hardware_1790998930342.jpg';
import networkImg from '../assets/images/sma_lab_network_1790998942691.jpg';
import dataImg from '../assets/images/sma_lab_data_1790998954220.jpg';
import ethicsImg from '../assets/images/sma_ethics_white_1794106858918.jpg';

// Alternate SMA student photos
import bkAltImg from '../assets/images/sma_praktikum_bk_1790998430572.jpg';
import apAltImg from '../assets/images/sma_praktikum_ap_1790998445558.jpg';
import skAltImg from '../assets/images/sma_praktikum_sk_1790998458439.jpg';
import jkiAltImg from '../assets/images/sma_praktikum_jki_1790998470127.jpg';
import adAltImg from '../assets/images/sma_praktikum_ad_1790998480423.jpg';
import dsiAltImg from '../assets/images/sma_praktikum_dsi_1790998491404.jpg';

import codingStudentsImg from '../assets/images/sma_coding_students_1789892306936.jpg';
import hardwareStudentsImg from '../assets/images/sma_hardware_students_1789892320931.jpg';
import networkStudentsImg from '../assets/images/sma_network_students_1789892337926.jpg';
import dataStudentsImg from '../assets/images/sma_data_students_1789892359912.jpg';
import ethicsStudentsImg from '../assets/images/sma_ethics_students_1789892378237.jpg';

// High-impact vibrant guide infographics
import guideInfographicImg from '../assets/images/sma_guide_infographic_1791767440679.jpg';
import guideRoadmapImg from '../assets/images/sma_infographic_roadmap_1791767460101.jpg';

export const SMA_IMAGES = {
  // Beranda & Hero
  hero: heroImg,
  guide_infographic: guideInfographicImg,
  guide_roadmap: guideRoadmapImg,

  // Bab 1: Berpikir Komputasional (Siswa SMA Seragam Putih Abu-Abu Belajar Logika Komputasi)
  bab1_bk: bkImg,
  bab1_bk_alt: bkAltImg,

  // Bab 2: Algoritma & Pemrograman (Siswa SMA Belajar Koding Python di Lab Komputer)
  bab2_ap: codingImg,
  bab2_ap_alt: apAltImg,
  bab2_coding_students: codingStudentsImg,

  // Bab 3: Sistem Komputer (Siswa SMA Mengamati Perangkat Keras Motherboard & RAM PC)
  bab3_sk: hardwareImg,
  bab3_sk_alt: skAltImg,
  bab3_hardware_students: hardwareStudentsImg,

  // Bab 4: Jaringan Komputer & Internet (Siswa SMA Praktik Kabel LAN & Router Jaringan)
  bab4_jki: networkImg,
  bab4_jki_alt: jkiAltImg,
  bab4_network_students: networkStudentsImg,

  // Bab 5: Analisis Data (Siswa SMA Menganalisis Grafik & Spreadsheet di Layar Lab)
  bab5_ad: dataImg,
  bab5_ad_alt: adAltImg,
  bab5_data_students: dataStudentsImg,

  // Bab 6: Dampak Sosial Informatika (Siswa SMA Diskusi Etika Digital & Keamanan Siber)
  bab6_dsi: ethicsImg,
  bab6_dsi_alt: dsiAltImg,
  bab6_ethics_students: ethicsStudentsImg,
};

export const getChapterStudentImage = (chapterIdOrElement: string): string => {
  const key = chapterIdOrElement.toLowerCase();
  if (key === 'mod-1' || key === 'bk') return SMA_IMAGES.bab1_bk;
  if (key === 'mod-2' || key === 'ap') return SMA_IMAGES.bab2_ap;
  if (key === 'mod-3' || key === 'sk') return SMA_IMAGES.bab3_sk;
  if (key === 'mod-4' || key === 'jki') return SMA_IMAGES.bab4_jki;
  if (key === 'mod-5' || key === 'ad') return SMA_IMAGES.bab5_ad;
  if (key === 'mod-6' || key === 'dsi') return SMA_IMAGES.bab6_dsi;
  return SMA_IMAGES.hero;
};
