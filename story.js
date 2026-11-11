/* =========================================================
   DUNIA CODING YASMIN — data cerita
   Setiap babak = senarai langkah. Ubah teks/gambar/audio di sini.
   bg    : gambar latar (nama fail dalam assets/img, tanpa .webp)
   chars : watak di atas latar [{img, pos:'left'|'right'|'center', h:% tinggi}]
   say   : {who, text, type:'speech'|'thought'|'shout'}  -> belon dialog
   narr  : teks kotak narator (bawah)
   voice : audio suara (assets/snd, tanpa .mp3)
   tts   : true -> dibaca oleh suara komputer (Bahasa Melayu) jika tiada rakaman
   sfx   : kesan bunyi sekali main;  amb : bunyi latar berulang (null = henti)
   fx    : 'shake' | 'flash' | 'pow' | 'zoom' | 'arrows'
   title : tajuk besar konsep (SEQUENCE / LOOP / ...)
   dur   : tempoh minimum (saat)
   ========================================================= */

const STORY = [
  /* ---------- BAB 1: SEKOLAH ---------- */
  { id: 'sekolah', chapter: 'BAB 1', chapterTitle: 'Hari Biasa di Sekolah', steps: [
    { bg: 'sc1_padang', amb: 'amb_taman', narr: 'Pagi yang cerah di Sekolah Kebangsaan…', dur: 4 },
    { bg: 'sc1_luar', amb: 'amb_kelas', chars: [{ img: 'bitmap_6', pos: 'left', h: 78 }],
      say: { who: 'Yasmin', type: 'thought', text: 'Penatnya hari ini, dari pukul 7.30 pagi saya berlatih lompat tinggi di padang. Kalau dapat rehat sekejap kan best. Kejap lagi masa RBT Cikgu Azlan… hurmm.' },
      voice: 'yas_sc2' },
  ]},
  { id: 'makmal', steps: [
    { bg: 'makmal_murid', amb: null, sfx: 'sfx_7s', narr: 'Masa RBT di makmal komputer…', dur: 3 },
    { bg: 'makmal_guru', chars: [{ img: 'cikgu_azlan_hd', pos: 'right', h: 92 }],
      say: { who: 'Cikgu Azlan', type: 'speech', text: "Murid-murid, hari ini cikgu akan ajar kamu konsep pengaturcaraan menggunakan aplikasi Scratch. Kamu semua boleh 'on' komputer masing-masing." },
      voice: 'cikgu_azlan_1' },
    { bg: 'tas_mengantuk', say: { who: 'Yasmin', type: 'thought', text: 'Mesti best kalau dapat tidur sekejap ni…' }, voice: 'yas_sc_3' },
    { bg: 'tas_tekan', fx: 'pow', sfx: 'sfx_pom', say: { who: '', type: 'shout', text: 'POMMMMM!!!!' }, dur: 2.2 },
  ]},

  /* ---------- BAB 2: MASUK DUNIA CODING ---------- */
  { id: 'dunia', chapter: 'BAB 2', chapterTitle: 'Dunia Coding', steps: [
    { bg: 'dunia_a', fx: 'flash', sfx: 'sfx_4s_fu', dur: 3 },
    { bg: 'dunia_b', amb: 'sfx_drum', chars: [{ img: 'yasmin_terkejut_hd', pos: 'left', h: 88 }],
      say: { who: 'Yasmin', type: 'shout', text: 'Haaa… di mana saya berada sekarang?!' }, voice: 'yas_sc4' },
    { bg: 'dunia_b', amb: null, chars: [{ img: 'yasmin_terkejut_hd', pos: 'left', h: 88 }, { img: 'bitmap_8', pos: 'right', h: 82 }],
      say: { who: 'Izzuwan', type: 'speech', text: 'Hai… kamu okey? Nama saya Izzuwan. Jangan risau, kamu sekarang berada di Dunia Coding.' }, voice: 'iz_sc_4' },
    { bg: 'dunia_b', chars: [{ img: 'yasmin_terkejut_hd', pos: 'left', h: 88 }, { img: 'bitmap_8', pos: 'right', h: 82 }],
      say: { who: 'Yasmin', type: 'speech', text: 'Dunia Coding? Boleh kamu bantu saya keluar dari dunia ini? Saya perlu balik semula ke dunia saya.' }, voice: 'yas_sc4_2_copy' },
  ]},
  { id: 'jom', steps: [
    { bg: 'yas_sc5', say: { who: 'Izzuwan', type: 'speech', text: 'Jom! Ikut saya. Saya akan bantu awak keluar dari dunia ini.' }, voice: 'iz_sc5' },
    { bg: 'yas_sc5', say: { who: 'Yasmin', type: 'speech', text: 'Baiklah, terima kasih sudi bantu saya!' }, voice: 'yas_sc_5' },
    { bg: 'yas_sc5', sfx: 'sfx_2s', fx: 'zoom', dur: 2 },
  ]},
  { id: 'omar', chapter: 'BAB 3', chapterTitle: 'Pakcik Omar Perlu Bantuan', steps: [
    { bg: 'chatgpt_image_12_mei_2026_12_37_00_ptg', cam: 'push', chars: [{ img: 'walk_belakang', who: 'Izzuwan Yasmin', pos: 'center', h: 80, sprite: { frames: 4, fps: 4.5, aspect: '470/723' } }],
      say: { who: 'Izzuwan', type: 'speech', text: 'Di Dunia Coding, awak mesti mengikuti peraturan yang telah ditetapkan di sini.' }, voice: 'iz_sc_4_1' },
    { bg: 'chatgpt_image_12_mei_2026_01_09_35_ptg', amb: 'amb_koridor', dur: 2.5 },
    { bg: 'chatgpt_image_12_mei_2026_01_09_35_ptg', chars: [{ img: 'omar_lambai', who: 'Pakcik Omar', pos: 'right', h: 76, sprite: { frames: 6, fps: 6, aspect: '699/1123' } }],
      say: { who: 'Pakcik Omar', type: 'speech', text: 'Hai anak-anak, boleh bantu Pakcik Omar?' }, voice: 'omar_1' },
    { bg: 'chatgpt_image_12_mei_2026_01_09_35_ptg', amb: null, chars: [{ img: 'tiga_omar', who: 'Pakcik Omar', pos: 'center', h: 80, sprite: { frames: 8, fps: 8, aspect: '1152/768' } }],
      say: { who: 'Pakcik Omar', type: 'speech', text: 'Bantu Pakcik Omar untuk ke pejabat sekolah.' }, voice: 'omar_2' },
    { bg: 'chatgpt_image_12_mei_2026_01_09_35_ptg', chars: [{ img: 'tiga_izzuwan', who: 'Izzuwan', pos: 'center', h: 80, sprite: { frames: 8, fps: 8, aspect: '1152/768' } }],
      say: { who: 'Izzuwan', type: 'speech', text: 'Boleh, pakcik! Biar kami bantu pakcik ke pejabat sekolah.' }, voice: 'iz_sc6' },
  ]},

  /* ---------- KONSEP 1: SEQUENCE ---------- */
  { id: 'sequence', jump: 'sequence', steps: [
    { bg: 'cabaran_1', narr: 'Di Dunia Coding, pergerakan mestilah mengikut URUTAN (sequence).', voice: 'iz_sc_7_1' },
    { bg: 'cabaran_1', fx: 'arrows', narr: 'Pakcik Omar mesti bergerak mengikut urutan yang betul bagi memastikan beliau berjaya sampai ke pejabat.', voice: 'iz_sc_7_2' },
    { bg: 'cabaran_1', title: 'SEQUENCE', sfx: 'sfx_whoosh', dur: 2.6 },
  ]},
  { id: 'sequence-latih', steps: [
    { bg: 'cabaran_1', narr: 'Sebelum membantu Pakcik Omar, jom berlatih URUTAN dengan 2 misi latihan dahulu!', sfx: 'sfx_whoosh', dur: 3.2 },
  ]},
  { challenge: 'sequence' },
  { challenge: 'sequence2' },
  { id: 'sequence-omar', steps: [
    { bg: 'cabaran_1', narr: 'Hebat! Sekarang misi terakhir: bantu Pakcik Omar ke Pejabat Sekolah!', sfx: 'sfx_whoosh', dur: 3.2 },
  ]},
  { challenge: 'sequence3' },
  { id: 'pejabat', steps: [
    { bg: 'chatgpt_image_14_mei_2026_01_45_05_ptg', say: { who: 'Pakcik Omar', type: 'speech', text: 'Terima kasih, Izzuwan dan Yasmin!' }, voice: 'omar_3' },
    { bg: 'chatgpt_image_14_mei_2026_01_45_05_ptg', say: { who: 'Izzuwan & Yasmin', type: 'speech', text: 'Sama-sama, Pakcik Omar!' }, voice: 'iz_sc_13_1', voice2: 'vn_5_1' },
  ]},

  /* ---------- KONSEP 2: LOOP ---------- */
  { id: 'lim', chapter: 'BAB 4', chapterTitle: 'Kotak-Kotak Lim', steps: [
    { bg: 'chatgpt_image_14_mei_2026_01_55_14_ptg', cam: 'push', chars: [{ img: 'walk_belakang', who: 'Izzuwan Yasmin', pos: 'center', h: 78, sprite: { frames: 4, fps: 4.5, aspect: '470/723' } }],
      say: { who: 'Izzuwan', type: 'speech', text: 'Jom! Kita teruskan perjalanan.' }, voice: 'iz_sc_14' },
    { bg: 'chatgpt_image_14_mei_2026_02_05_07_ptg', say: { who: 'Lim', type: 'thought', text: 'Fuhh… banyaknya kotak. Mesti ada cara untuk mudahkan kerja saya.' }, voice: 'lim_1' },
    { bg: 'chatgpt_image_14_mei_2026_02_22_35_ptg', say: { who: 'Lim', type: 'speech', text: 'Haiii… kamu berdua boleh bantu saya?' }, voice: 'lim_2' },
  ]},
  { id: 'loop', jump: 'loop', steps: [
    { bg: 'chatgpt_image_14_mei_2026_02_45_16_ptg', narr: "Untuk bantu Lim, kita perlu menggunakan kaedah 'ULANGAN' atau LOOP.", voice: 'iz_sc_15_1' },
    { bg: 'chatgpt_image_14_mei_2026_02_45_16_ptg', narr: 'Lim tidak perlu mengangkat satu per satu. Dia hanya perlu mengira berapa jumlah kotak.', voice: 'iz_sc_15_2' },
    { bg: 'chatgpt_image_14_mei_2026_02_45_16_ptg', title: 'LOOP', sfx: 'sfx_whoosh', dur: 2.6 },
  ]},
  { challenge: 'loop' },
  { id: 'lim-tq', steps: [
    { bg: 'chatgpt_image_14_mei_2026_03_18_37_ptg', say: { who: 'Lim', type: 'speech', text: 'Terima kasih Izzuwan dan Yasmin kerana bantu saya. Hati-hati dalam perjalanan kamu!' }, voice: 'lim_3' },
    { bg: 'chatgpt_image_14_mei_2026_03_18_37_ptg',
      say: { who: 'Yasmin', type: 'speech', text: 'Kita teruskan perjalanan kita. Saya dah tak sabar nak balik ke dunia saya.' }, voice: 'vn_6_1' },
  ]},
  { id: 'loop-lagi', steps: [
    { bg: 'chatgpt_image_14_mei_2026_02_45_16_ptg', narr: 'Bagus! Jom cuba 2 lagi misi LOOP — ulang kerja tanpa buat satu per satu.', sfx: 'sfx_whoosh', dur: 3 },
  ]},
  { challenge: 'loop2' },
  { challenge: 'loop3' },

  /* ---------- KONSEP 3: CONDITIONAL ---------- */
  { id: 'priya', chapter: 'BAB 5', chapterTitle: 'Pilihan Sarah', steps: [
    { bg: 'chatgpt_image_14_mei_2026_03_34_57_ptg', sfx: 'sfx_menangis', narr: 'Eh… siapa yang menangis tu?', dur: 4 },
  ]},
  { id: 'conditional', jump: 'conditional', steps: [
    { bg: 'chatgpt_image_14_mei_2026_03_54_46_ptg', narr: 'Sarah perlu masuk kelas sebelum loceng berbunyi.', voice: 'nar_sarah_1' },
    { bg: 'chatgpt_image_14_mei_2026_03_54_46_ptg', narr: 'Tetapi Sarah takut untuk membuat pilihan — jalan yang mana paling selamat?', voice: 'nar_sarah_2' },
    { bg: 'chatgpt_image_14_mei_2026_03_54_46_ptg', narr: 'Tolong bantu Sarah membuat keputusan…', voice: 'nar_sarah_3' },
    { bg: 'chatgpt_image_14_mei_2026_03_54_46_ptg', narr: "Untuk bantu Sarah, kita perlu gunakan kaedah 'KEPUTUSAN' atau CONDITIONAL.", voice: 'iz_sc_19' },
    { bg: 'chatgpt_image_14_mei_2026_03_54_46_ptg', narr: "'Keputusan' atau conditional bermaksud membuat keputusan berdasarkan situasi.", voice: 'iz_sc_19_2' },
    { bg: 'chatgpt_image_14_mei_2026_03_54_46_ptg', narr: 'Sarah perlu menilai jalan mana yang paling selamat berdasarkan ciri-ciri: 1. kering  2. cerah  3. selamat.', voice: 'iz_sc19_3' },
    { bg: 'chatgpt_image_14_mei_2026_03_54_46_ptg', title: 'CONDITIONAL', sfx: 'sfx_whoosh', dur: 2.6 },
  ]},
  { challenge: 'conditional' },
  { id: 'priya-tq', steps: [
    { bg: 'chatgpt_image_17_mei_2026_04_46_52_pg', amb: 'amb_kelas', dur: 3.5 },
    { bg: 'chatgpt_image_17_mei_2026_05_01_43_pg', say: { who: 'Sarah', type: 'speech', text: 'Terima kasih, Yasmin dan Izzuwan!' }, voice: 'sarah_1' },
  ]},
  { id: 'conditional-lagi', steps: [
    { bg: 'chatgpt_image_14_mei_2026_03_54_46_ptg', narr: 'Pandai! Jom buat keputusan lagi dengan 2 misi CONDITIONAL — JIKA… MAKA… JIKA TIDAK…', sfx: 'sfx_whoosh', dur: 3 },
  ]},
  { challenge: 'conditional2' },
  { challenge: 'conditional3' },

  /* ---------- KONSEP 4: LOGIC ---------- */
  { id: 'hampir', chapter: 'BAB 6', chapterTitle: 'Pintu Koding', steps: [
    { bg: 'chatgpt_image_12_mei_2026_01_09_35_ptg', amb: null, chars: [{ img: 'chatgpt_image_17_mei_2026_05_08_47_pg', pos: 'center', h: 80 }],
      say: { who: 'Izzuwan', type: 'speech', text: 'Kita sudah hampir untuk keluar dari dunia ini.' }, voice: 'iz_sc_22_1' },
    { bg: 'chatgpt_image_12_mei_2026_01_09_35_ptg', chars: [{ img: 'chatgpt_image_17_mei_2026_05_08_47_pg', pos: 'center', h: 80 }],
      say: { who: 'Yasmin', type: 'speech', text: 'Wahhh… akhirnya! Kalau begitu, jom kita keluar dari sini.' }, voice: 'vn_7' },
    { bg: 'chatgpt_image_12_mei_2026_01_09_35_ptg', chars: [{ img: 'chatgpt_image_17_mei_2026_05_08_47_pg', pos: 'center', h: 80 }],
      say: { who: 'Izzuwan', type: 'speech', text: 'Cuma tinggal satu lagi cabaran terakhir. Mari saya tunjukkan.' }, voice: 'iz_sc22_2' },
    { bg: 'chatgpt_image_17_mei_2026_08_20_45_pg', sfx: 'sfx_transisi', dur: 3 },
    { bg: 'chatgpt_image_17_mei_2026_08_36_45_pg', amb: 'sfx_jantung', narr: 'PINTU KODING — gabungkan semua yang kamu telah belajar untuk membuka pintu ini!', dur: 4 },
  ]},
  { id: 'logic', jump: 'logic', steps: [
    { bg: 'chatgpt_image_19_mei_2026_11_03_44_ptg', amb: null, title: 'LOGIC', sfx: 'sfx_whoosh', dur: 2.6 },
  ]},
  { challenge: 'logic' },
  { id: 'logic-lagi', steps: [
    { bg: 'chatgpt_image_19_mei_2026_11_03_44_ptg', narr: 'Luar biasa! Dua misi LOGIC terakhir sebelum pintu terbuka.', sfx: 'sfx_whoosh', dur: 3 },
  ]},
  { id: 'pepijat', jump: 'pepijat', steps: [
    { bg: 'logic_pepijat', title: 'PEPIJAT 🐞', sfx: 'sfx_whoosh', dur: 2.6 },
    { bg: 'logic_pepijat', chars: [{ img: 'bitmap_8', pos: 'left', h: 82 }],
      say: { who: 'Izzuwan', type: 'shout', text: 'Alamak! Program saya ada PEPIJAT! Saya tak dapat sampai ke peti kod!' }, dur: 4 },
    { bg: 'logic_pepijat', narr: 'PEPIJAT 🐞 (bug) ialah KESILAPAN dalam kod. Satu blok yang salah menyebabkan program tidak berjalan seperti yang kita mahu.', dur: 6 },
    { bg: 'logic_pepijat', narr: 'Cara membetulkan pepijat (DEBUG): 1️⃣ semak setiap blok satu per satu dengan peta, 2️⃣ cari blok yang salah, 3️⃣ tekan untuk buang, 4️⃣ letak blok yang betul.', dur: 7.5 },
    { bg: 'logic_pepijat', chars: [{ img: 'bitmap_8', pos: 'left', h: 82 }],
      say: { who: 'Izzuwan', type: 'speech', text: 'Jom bantu saya cari dan betulkan pepijat itu!' }, dur: 3.5 },
  ]},
  { challenge: 'logic2' },
  { challenge: 'logic3' },

  /* ---------- PENUTUP ---------- */
  { id: 'pulang', chapter: 'BAB 7', chapterTitle: 'Kembali ke Dunia Nyata', steps: [
    { bg: 'chatgpt_image_18_mei_2026_02_09_00_ptg', fx: 'doors', sfx: 'sfx_pintu', dur: 3.5 },
    { bg: 'chatgpt_image_17_mei_2026_02_36_06_ptg', sfx: 'sfx_braam', dur: 2 },
    { bg: 'chatgpt_image_17_mei_2026_02_36_06_ptg', say: { who: 'Yasmin', type: 'shout', text: 'Wah… akhirnya saya dapat kembali ke dunia saya! Terima kasih, Izzuwan!' }, voice: 'vn_8_2' },
    { bg: 'chatgpt_image_17_mei_2026_02_36_06_ptg', say: { who: 'Izzuwan', type: 'speech', text: 'Sama-sama, Yasmin! Hati-hati, kaki awakkk…' }, voice: 'iz_sc25' },
    { bg: 'chatgpt_image_17_mei_2026_02_27_54_ptg', sfx: 'sfx_drum', fx: 'shake', dur: 2.2 },
    { bg: 'chatgpt_image_17_mei_2026_03_04_52_ptg', sfx: 'sfx_tidur', say: { who: '', type: 'thought', text: 'zzzzz……' }, dur: 2.5 },
    { bg: 'chatgpt_image_17_mei_2026_03_04_52_ptg', say: { who: 'Cikgu Azlan', type: 'shout', text: 'Yasmin… Yasmin… bangun!! Lena betul tidur dalam kelas saya ya!' }, voice: 'cikgu_azlan_2' },
    { bg: 'chatgpt_image_17_mei_2026_03_17_28_ptg', say: { who: 'Yasmin', type: 'thought', text: 'Alamak… saya tertidur rupanya…' }, voice: 'vn_8' },
    { bg: 'chatgpt_image_17_mei_2026_03_25_39_ptg', sfx: 'sfx_riser', say: { who: 'Yasmin', type: 'shout', text: 'SCRATCH……!' }, dur: 2.5 },
    { bg: 'chatgpt_image_17_mei_2026_03_31_59_ptg', fx: 'zoom', narr: 'Rupa-rupanya, semua yang Yasmin pelajari di Dunia Coding ada di depan matanya — dalam Scratch!', dur: 5 },
  ]},
  { end: true },
];

/* ---------- DATA CABARAN ---------- */
const CHALLENGES = {
  sequence: {
    name: 'Cabaran 1 · SEQUENCE', color: 'seq', bg: 'cabaran_1_kosong',
    no: '1.1', concept: 'SEQUENCE', conceptBM: 'Urutan', hero: 'bitmap_6', heroName: 'YASMIN', heroPos: 'center 10%',
    task: 'Bantu Yasmin pergi ke AIR PANCUT. Seret blok ke setiap titik pada laluan.',
    hint: 'Ikut titik di jalan: ⬆ lurus → ↱ kanan → ⬆ lurus → ↱ kanan.',
    showPath: ['up', 'right', 'up', 'right'],
    slots: ['lurus', 'kanan', 'lurus', 'kanan'],
    scene: { route: [[34, 84], [35, 62], [35, 46], [45, 46], [55, 46], [55, 53]],
             anchors: [[35, 62], [35, 46], [45, 46], [55, 46]],
             slotPos: [[19, 62], [19, 40], [42, 30], [70, 40]],
             arrows: true, legend: true,
             callouts: [[28, 55], [28, 50], [45, 40], [49, 52]],
             start: { at: [34, 90], label: 'MULA' }, goal: { at: [63, 64], label: 'AIR PANCUT', icon: '⛲', finish: true },
             walker: 'bitmap_6', walkerPos: 'center 8%', walkerStart: true },
    blocks: [
      { id: 'lurus', label: 'jalan lurus', icon: 'up', kind: 'motion' },
      { id: 'kanan', label: 'belok kanan', icon: 'right', kind: 'motion' },
      { id: 'lurus', label: 'jalan lurus', icon: 'up', kind: 'motion' },
      { id: 'kanan', label: 'belok kanan', icon: 'right', kind: 'motion' },
    ],
    mode: 'instant',
  },
  loop: {
    name: 'Cabaran 2 · LOOP', color: 'loop', bg: 'chatgpt_image_14_mei_2026_02_45_16_ptg',
    no: '2.1', concept: 'LOOP', conceptBM: 'Ulangan', hero: 'chatgpt_image_14_mei_2026_02_05_07_ptg', heroName: 'LIM', heroPos: '35% 40%', wrongCall: 'KIRA SEMULA!',
    task: 'Kira kotak Lim dalam gambar, kemudian seret nombor yang betul ke blok ULANG.',
    hint: 'Kira satu per satu: berapa kotak yang ada? 📦',
    boxes: 5,
    template: 'loop',
    slots: ['5'],
    scene: { slotPos: [[70, 74]], ring: { at: [64, 47], w: 21, h: 26, label: 'KOTAK LIM' },
             boxDots: [[61, 43], [67, 43], [58, 52], [64, 52], [70, 52]],
             slotCaption: ['🔁 ULANG', 'KALI ➜ angkat kotak 📦'] },
    blocks: [
      { id: '1', label: '1 kali', kind: 'num' }, { id: '3', label: '3 kali', kind: 'num' },
      { id: '5', label: '5 kali', kind: 'num' }, { id: '7', label: '7 kali', kind: 'num' },
    ],
    wrongMsg: 'Cuba lagi! Kira semula kotak itu.',
    mode: 'instant',
  },
  conditional: {
    name: 'Cabaran 3 · CONDITIONAL', color: 'cond', bg: 'sarah_simpang',
    no: '3.1', concept: 'CONDITIONAL', conceptBM: 'Keputusan', hero: 'chatgpt_image_14_mei_2026_03_34_57_ptg', heroName: 'SARAH', heroPos: '50% 60%', wrongCall: 'JALAN BAHAYA!',
    task: 'Bantu Sarah pergi ke kelas! 👀 Lihat dua jalan dalam gambar. Seret blok supaya Sarah ikut jalan yang SELAMAT.',
    hint: 'Jalan kiri basah dan licin. Jalan kanan kering dan cerah. Kalau jalan kanan kering, Sarah patut pergi ke mana?',
    slots: ['kering', 'kanan'],
    scene: { route: [[50, 92], [50, 74], [60, 62], [71, 50], [69, 34], [66, 22]],
             ifblock: { at: [22, 76], w: 34, cond: 0, then: 1, elseText: '✋ tunggu & minta tolong cikgu', condPh: 'apa kamu nampak?', thenPh: 'Sarah buat apa?' },
             start: { at: [50, 95], label: 'MULA' }, goal: { at: [66, 17], label: 'KELAS', icon: '🏫', finish: true },
             walker: 'sarah_jalan', walkerPos: 'center 20%', walkerStart: true },
    blocks: [
      { id: 'kering', label: '☀️ jalan kanan kering', kind: 'card', tone: 'cond' },
      { id: 'basah', label: '🌧️ jalan kanan basah', kind: 'card', tone: 'cond' },
      { id: 'gelap', label: '☀️ jalan kiri kering', kind: 'card', tone: 'cond' },
      { id: 'kanan', label: '➡ pergi ke kanan', kind: 'card', tone: 'seq' },
      { id: 'kiri', label: '⬅ pergi ke kiri', kind: 'card', tone: 'seq' },
    ],
    wrongMsg: 'Alamak! Jalan itu tidak selamat untuk Sarah. Cuba lagi!',
    mode: 'instant',
  },
  logic: {
    name: 'Cabaran Akhir · LOGIC', color: 'logic', bg: 'logic_peta',
    no: '4.1', concept: 'LOGIC', conceptBM: 'Logik', hero: 'chatgpt_image_17_mei_2026_08_36_45_pg', heroName: 'PINTU KODING', heroPos: 'center',
    task: 'Gabungkan SEQUENCE, LOOP dan CONDITIONAL! Seret blok ke setiap titik supaya Yasmin & Izzuwan sampai ke Pintu Koding dan ambil KUNCI emas. Kemudian tekan 🔑 KUNCI untuk semak.',
    hint: 'Titik 1: berapa batang kayu? (ULANG). Titik 2: ada RIBUT ⛈️ di jalan kiri, pilih jalan yang selamat. Titik 3: jalan terus. Titik 4: kira batang kayu lagi! Titik 5: apa yang perlu dibuat di depan pintu?',
    slots: ['loop2', 'kanan', 'lurus', 'loop5', 'kunci'],
    scene: { route: [[50, 95], [50, 92], [50, 84], [50, 76], [55.5, 70], [60, 63], [60, 50], [57, 44], [50, 40], [50, 31], [50, 19], [50, 15.5]],
             anchors: [[50, 84], [55.5, 70], [60, 56], [50, 31], [50, 15.5]],
             slotPos: [[30, 86], [79, 73], [82, 52], [28, 33], [28, 12]],
             arrows: true,
             start: { at: [50, 96], label: 'MULA' }, goal: { at: [62, 16], label: 'PINTU KODING', icon: '🚪', finish: true },
             walker: 'chatgpt_image_17_mei_2026_05_08_47_pg', walkerPos: '50% 20%', walkerStart: true },
    blocks: [
      { id: 'lurus', label: 'LURUS', icon: 'up', kind: 'motion' },
      { id: 'loop2', label: 'ULANG 2× lompat', icon: 'loop', kind: 'num' },
      { id: 'loop4', label: 'ULANG 4× lompat', icon: 'loop', kind: 'num' },
      { id: 'loop5', label: 'ULANG 5× lompat', icon: 'loop', kind: 'num' },
      { id: 'kanan', label: 'PILIH KANAN ☀️', icon: 'right', kind: 'dir' },
      { id: 'kiri', label: 'PILIH KIRI ⛈️', icon: 'left', kind: 'dir' },
      { id: 'kunci', label: '🔑 ambil kunci', kind: 'card', tone: 'logic' },
    ],
    mode: 'key',
  },

  /* ===== MISI TAMBAHAN: SEQUENCE ===== */
  sequence2: {
    color: 'seq', bg: 'cabaran_1_kosong',
    no: '1.2', concept: 'SEQUENCE', conceptBM: 'Urutan', hero: 'bitmap_6', heroName: 'YASMIN', heroPos: 'center 10%',
    task: 'Bantu Yasmin pergi ke GELANGGANG BOLA KERANJANG. Seret blok ke setiap titik pada laluan.',
    hint: 'Ikut titik di jalan: ⬆ lurus → ↱ kanan → ⬆ lurus → ↰ kiri, kemudian sampai di bendera TAMAT 🏁.',
    showPath: ['up', 'right', 'up', 'left'],
    slots: ['lurus', 'kanan', 'lurus', 'kiri'],
    scene: { route: [[34, 84], [35, 62], [35, 46.5], [57, 46.5], [79.5, 46.5], [79.5, 36]],
             anchors: [[35, 62], [35, 46.5], [57, 46.5], [79.5, 46.5]],
             slotPos: [[19, 62], [19, 40], [55, 36], [70, 60]],
             arrows: true, legend: true,
             callouts: [[28, 55], [28, 50], [57, 51.5], [73, 51]],
             start: { at: [34, 90], label: 'MULA' }, goal: { at: [79.5, 30], label: 'GELANGGANG', icon: '🏀', finish: true },
             walker: 'bitmap_6', walkerPos: 'center 8%', walkerStart: true },
    blocks: [
      { id: 'lurus', label: 'jalan lurus', icon: 'up', kind: 'motion' },
      { id: 'kanan', label: 'belok kanan', icon: 'right', kind: 'motion' },
      { id: 'lurus', label: 'jalan lurus', icon: 'up', kind: 'motion' },
      { id: 'kiri', label: 'belok kiri', icon: 'left', kind: 'motion' },
    ],
    mode: 'instant',
  },
  sequence3: {
    color: 'seq', bg: 'cabaran_1',
    no: '1.3', concept: 'SEQUENCE', conceptBM: 'Urutan', hero: 'bitmap_9', heroName: 'PAKCIK OMAR', heroPos: 'center top',
    task: 'Seret blok ke laluan pada peta supaya Pakcik Omar sampai ke Pejabat Sekolah.',
    hint: 'Ikut titik di jalan: ⬆ lurus → ↱ kanan → ⬆ lurus → ↰ kiri → ↱ kanan → ⬆ lurus → ↰ kiri → naik tangga.',
    showPath: ['up', 'right', 'up', 'left', 'right', 'up', 'left', 'stairs'],
    slots: ['lurus', 'kanan', 'lurus', 'kiri', 'kanan', 'lurus', 'kiri', 'tangga'],
    // kedudukan atas gambar latar (% lebar, % tinggi)
    scene: { route: [[34, 80], [35, 58], [36, 45.5], [41, 45.5], [45.3, 45.5], [45.3, 30], [57, 30], [70, 30], [70, 14], [70, 6]],
             // titik pergerakan atas jalan (1-7) & slot di tepi jalan
             anchors: [[35, 58], [36, 45.5], [41, 45.5], [45.3, 45.5], [45.3, 30], [57, 30], [70, 30], [70, 14]],
             slotPos: [[19, 62], [19, 47], [43, 61], [57, 55], [28, 15], [58, 42], [86, 36], [86, 13]],
             start: { at: [34, 86], label: 'MULA' }, goal: { at: [62, 16], label: 'PEJABAT', icon: '🏢', finish: true },
             arrows: true, legend: true,
             // label arahan bagi titik 1-7
             // callouts dibuang supaya lebih mencabar: [[28, 54], [28, 40], [40.5, 40], [46, 51.5], [39, 24], [57, 24.5], [77, 38], [80, 23]],
             walker: 'bitmap_9' },
    blocks: [
      { id: 'lurus', label: 'jalan lurus', icon: 'up', kind: 'motion' },
      { id: 'kanan', label: 'belok kanan', icon: 'right', kind: 'motion' },
      { id: 'lurus', label: 'jalan lurus', icon: 'up', kind: 'motion' },
      { id: 'kanan', label: 'belok kanan', icon: 'right', kind: 'motion' },
      { id: 'tangga', label: 'naik tangga', icon: 'stairs', kind: 'motion' },
      { id: 'lurus', label: 'jalan lurus', icon: 'up', kind: 'motion' },
      { id: 'kiri', label: 'belok kiri', icon: 'left', kind: 'motion' },
      { id: 'kiri', label: 'belok kiri', icon: 'left', kind: 'motion' },
    ],
    mode: 'instant',
  },

  /* ===== MISI TAMBAHAN: LOOP ===== */
  loop2: {
    color: 'loop', bg: 'koperasi_dalam',
    no: '2.2', concept: 'LOOP', conceptBM: 'Ulangan', hero: 'chatgpt_image_14_mei_2026_02_05_07_ptg', heroName: 'LIM', heroPos: '35% 40%', wrongCall: 'CUBA LAGI!',
    task: 'Kod Lim terlalu panjang! Ringkaskan kod itu dengan blok ULANG supaya semua buku 📘 diletak ke RAK KOSONG.',
    hint: 'Lihat KOD PANJANG: arahan apa yang ditulis berulang-ulang? Berapa kali ia ditulis? Masukkan dalam blok ULANG.',
    slots: ['6', 'letak'],
    scene: { goal: { at: [48, 20.5], label: 'RAK KOSONG', icon: '📚' },
             longCode: { at: [13, 77], w: 18, title: 'KOD PANJANG 😩', lines: Array(6).fill('📘 letak buku'), note: 'arahan sama ditulis berulang…' },
             items: [[33, 66], [39, 66], [45, 66], [33, 76], [39, 76], [45, 76]].map(at => ({ at, emoji: '📘', size: 3.6 })),
             boxDots: [[33, 61], [39, 61], [45, 61], [33, 71], [39, 71], [45, 71]],
             fillTo: [[38, 39], [42.5, 39], [47, 39], [51.5, 39], [56, 39], [60.5, 39]], fillSize: 2.6,
             cblock: { at: [63, 74], w: 22, times: 0, body: [1] } },
    blocks: [
      { id: '4', label: '4 kali', kind: 'num' }, { id: '6', label: '6 kali', kind: 'num' }, { id: '8', label: '8 kali', kind: 'num' },
      { id: 'letak', label: '📘 letak buku', kind: 'card', tone: 'loop' },
      { id: 'angkat', label: '📦 angkat kotak', kind: 'card', tone: 'loop' },
    ],
    mode: 'instant',
  },
  loop3: {
    color: 'loop', bg: 'koperasi_dalam',
    no: '2.3', concept: 'LOOP', conceptBM: 'Ulangan', hero: 'bitmap_6', heroName: 'YASMIN', heroPos: 'center 10%', wrongCall: 'CUBA LAGI!',
    task: 'Bina LOOP untuk Yasmin isi rak paling atas dengan air kotak 🧃. Berapa kali diulang, dan apa 2 langkah di dalam loop (ikut susunan)?',
    hint: 'Kira air kotak 🧃. Setiap kali, Yasmin mesti AMBIL dahulu, kemudian baru LETAK di rak.',
    slots: ['8', 'ambil', 'letak'],
    scene: { goal: { at: [48, 20.5], label: 'RAK ATAS', icon: '🧃' },
             items: [[16, 67], [22, 67], [28, 67], [34, 67], [16, 77], [22, 77], [28, 77], [34, 77]].map(at => ({ at, emoji: '🧃', size: 3.8 })),
             boxDots: [[16, 62], [22, 62], [28, 62], [34, 62], [16, 72], [22, 72], [28, 72], [34, 72]],
             fillTo: [[37.5, 29], [40.5, 29], [43.5, 29], [46.5, 29], [49.5, 29], [52.5, 29], [55.5, 29], [58.5, 29]], fillSize: 2.3,
             cblock: { at: [57, 73], w: 25, times: 0, body: [1, 2] } },
    blocks: [
      { id: '6', label: '6 kali', kind: 'num' }, { id: '8', label: '8 kali', kind: 'num' }, { id: '10', label: '10 kali', kind: 'num' },
      { id: 'ambil', label: '✋ ambil air kotak', kind: 'card', tone: 'loop' },
      { id: 'letak', label: '⬆ letak di rak', kind: 'card', tone: 'loop' },
      { id: 'kira', label: '🪙 kira duit', kind: 'card', tone: 'loop' },
      { id: 'sapu', label: '🧹 sapu lantai', kind: 'card', tone: 'loop' },
    ],
    mode: 'instant',
  },

  /* ===== MISI TAMBAHAN: CONDITIONAL ===== */
  conditional2: {
    color: 'cond', bg: 'chatgpt_image_14_mei_2026_03_34_57_ptg',
    no: '3.2', concept: 'CONDITIONAL', conceptBM: 'Keputusan', hero: 'sarah_portrait', heroName: 'SARAH', heroPos: 'center', wrongCall: 'TAK SESUAI!',
    task: 'Bantu Sarah bersedia ke kelas. Seret setiap CUACA ke barang yang betul.',
    hint: 'Payung ☂️ melindungi kita daripada air hujan. Topi 🧢 melindungi kita daripada panas matahari.',
    banner: '❓ <b>JIKA</b> 🌧️ hujan <b>MAKA</b> bawa <span data-ans="hujan" data-fill="☂️ PAYUNG">?</span> · <b>JIKA TIDAK</b> pakai <span data-ans="panas" data-fill="🧢 TOPI">?</span>',
    slots: ['payung', 'topi'],
    scene: { zones: [ { id: 'payung', x: 4, y: 16, w: 34, h: 52, label: '☂️ PAYUNG', tags: ['melindungi daripada air'] },
                      { id: 'topi', x: 63, y: 16, w: 28, h: 52, label: '🧢 TOPI', tags: ['melindungi daripada panas'] } ] },
    blocks: [
      { id: 'hujan', label: 'HUJAN', emoji: '🌧️', kind: 'token', goes: 'payung' },
      { id: 'panas', label: 'PANAS TERIK', emoji: '☀️', kind: 'token', goes: 'topi' },
    ],
    mode: 'instant',
  },
  conditional3: {
    color: 'cond', bg: 'sc1_padang',
    no: '3.3', concept: 'CONDITIONAL', conceptBM: 'Keputusan', hero: 'bitmap_6', heroName: 'YASMIN', heroPos: 'center 10%', wrongCall: 'SALAH TEMPAT!',
    task: 'Ke mana Yasmin patut pergi? Seret setiap SITUASI ke tempat yang betul.',
    hint: 'Loceng 🔔 berbunyi bermakna waktu belajar bermula. Masa PJ ⚽ kita bersukan di luar.',
    banner: '❓ <b>JIKA</b> 🔔 loceng berbunyi <b>MAKA</b> masuk <span data-ans="loceng" data-fill="🏫 KELAS">?</span> · <b>JIKA TIDAK</b> (masa PJ) pergi ke <span data-ans="pj" data-fill="⚽ PADANG">?</span>',
    slots: ['kelas', 'padang'],
    scene: { zones: [ { id: 'kelas', x: 47, y: 6, w: 48, h: 38, label: '🏫 KELAS', tags: ['belajar di dalam bilik darjah'] },
                      { id: 'padang', x: 6, y: 50, w: 56, h: 36, label: '⚽ PADANG', tags: ['bersukan & bermain'] } ] },
    blocks: [
      { id: 'loceng', label: 'LOCENG BERBUNYI', emoji: '🔔', kind: 'token', goes: 'kelas' },
      { id: 'pj', label: 'MASA PJ', emoji: '⚽', kind: 'token', goes: 'padang' },
    ],
    mode: 'instant',
  },

  /* ===== MISI TAMBAHAN: LOGIC ===== */
  logic2: {
    color: 'logic', bg: 'logic_pepijat',
    no: '4.2', concept: 'LOGIC', conceptBM: 'Logik', hero: 'bitmap_8', heroName: 'IZZUWAN', heroPos: 'center 10%',
    task: 'Program Izzuwan ada 1 PEPIJAT 🐞! Semak setiap blok dengan peta. Tekan blok yang salah untuk buang, seret blok yang betul, kemudian tekan 🔑 KUNCI.',
    hint: 'Lihat simpang di tengah peta — jambatan KIRI rosak! ⚠️ Blok mana yang membawa Izzuwan ke jambatan itu?',
    slots: ['loop3', 'kanan', 'lurus', 'loop2', 'buka'],
    prefill: ['loop3', 'kiri', 'lurus', 'loop2', 'buka'],
    prefillDefs: [
      { id: 'loop3', label: 'ULANG 3× lompat', icon: 'loop', kind: 'num' }, { id: 'kiri', label: 'PILIH KIRI', icon: 'left', kind: 'dir' },
      { id: 'lurus', label: 'LURUS', icon: 'up', kind: 'motion' }, { id: 'loop2', label: 'ULANG 2× lompat', icon: 'loop', kind: 'num' },
      { id: 'buka', label: '💻 buka peti kod', kind: 'card', tone: 'logic' },
    ],
    scene: { route: [[50, 97], [50, 88], [50, 78], [50, 66], [56, 60], [62, 54], [62, 44], [62, 34], [56, 28], [50, 25], [50, 20], [50, 14]],
             anchors: [[50, 78], [56, 60], [62, 44], [50, 22], [50, 14]],
             slotPos: [[29, 80], [80, 66], [85, 42], [29, 26], [75, 20]],
             arrows: true,
             start: { at: [50, 96], label: 'MULA' }, goal: { at: [65, 12], label: 'PETI KOD', icon: '💻', finish: true },
             walker: 'chatgpt_image_17_mei_2026_05_08_47_pg', walkerPos: '50% 20%', walkerStart: true },
    blocks: [
      { id: 'kanan', label: 'PILIH KANAN', icon: 'right', kind: 'dir' },
      { id: 'loop4', label: 'ULANG 4× lompat', icon: 'loop', kind: 'num' },
      { id: 'tunggu', label: '⏸ tunggu', kind: 'card', tone: 'logic' },
    ],
    mode: 'key',
  },
  logic3: {
    color: 'logic', bg: 'chatgpt_image_17_mei_2026_08_32_07_pg',
    no: '4.3', concept: 'LOGIC', conceptBM: 'Logik', hero: 'chatgpt_image_17_mei_2026_08_32_07_pg', heroName: 'PINTU KODING', heroPos: 'center 40%',
    task: 'MISI TERAKHIR! Pintu Koding ada 3 slot. Letakkan blok kod yang sepadan dengan SEQUENCE, LOOP dan CONDITIONAL, kemudian tekan 🔑 KUNCI.',
    hint: 'SEQUENCE = arahan ikut turutan. LOOP = ulang beberapa kali. CONDITIONAL = JIKA… MAKA…',
    slots: ['seq', 'loop', 'cond'],
    scene: { slotPos: [[32, 43], [50, 43], [68, 43]], slotShape: 'frame', slotCaption: ['', ''],
             medals: [ { at: [32, 59], img: 'medal_omar', tone: 'seq', labAt: [32, 69.5], label: 'TOLONG<br>PAKCIK OMAR' },
                       { at: [50, 59], img: 'medal_lim', tone: 'loop', labAt: [50, 69.5], label: 'TOLONG LIM<br>ANGKAT KOTAK' },
                       { at: [68, 59], img: 'medal_sarah', tone: 'cond', labAt: [68, 69.5], label: 'PILIH JALAN<br>UNTUK SARAH' } ],
             glow: { at: [50, 88], label: '🔑 BUKA PINTU' }, finishFx: 'doors', doorsReveal: 'makmal_murid', revealText: '🎉 Pintu terbuka! Kembali ke makmal komputer…' },
    blocks: [
      { id: 'seq', kind: 'code', lines: [['mo', '⬆ jalan lurus'], ['mo', '↱ belok kanan'], ['mo', '🪜 naik tangga']] },
      { id: 'loop', kind: 'code', lines: [['ct', '🔁 ulang 5 kali'], ['in', '📦 angkat kotak']] },
      { id: 'cond', kind: 'code', lines: [['if', '❓ jika jalan kering'], ['in', '➡ pergi ke kanan']] },
      { id: 'tidur', kind: 'code', lines: [['lk', '😴 tidur sekejap']] },
    ],
    mode: 'key',
  },
};
