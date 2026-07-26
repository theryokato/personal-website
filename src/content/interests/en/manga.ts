export interface Book {
  title: string;
  author: string;
  status: 'reading' | 'finished' | 'partially';
  date: string;                                                                                                
}

export const books: Book[] = [
  // Currently reading
  { title: "Blue Lock", author: "Muneyuki Kaneshiro, Yusuke Nomura", status: "reading", date: "2026" },
  { title: "Hunter × Hunter", author: "Yoshihiro Togashi", status: "reading", date: "2026" },
   { title: "Frieren: Beyond Journey's End", author: "Kanehito Yamada, Tsukasa Abe", status: "reading", date: "2026" },

  // 2026
  { title: "Grand Blue Dreaming", author: "Kenji Inoue, Kimitake Yoshioka", status: "finished", date: "May 2026" },
  { title: "Chainsaw Man", author: "Tatsuki Fujimoto", status: "finished", date: "May 2026" },
  { title: "The Apothecary Diaries", author: "Natsu Hyuuga, Nekokurage", status: "partially", date: "May 2026" },
  
  // 2025
  { title: "Jujutsu Kaisen", author: "Gege Akutami", status: "finished", date: "2025" },

  // 2024
  { title: "Kaguya-sama: Love Is War", author: "Aka Akasaka", status: "finished", date: "2024" },
  { title: "A Chef of Obunaga", author: "Mitsuru Nishimura, Takuro Kajikawa", status: "finished", date: "2024" },
  { title: "Solo Leveling", author: "Chugong, DUBU", status: "finished", date: "2024" },
  { title: "One-Punch Man", author: "ONE, Yusuke Murata", status: "partially", date: "2024" },

  // Before cutoff year (2023)
  { title: "Dragon Ball", author: "Akira Toriyama", status: "finished", date: "0000" },
  { title: "Doraemon", author: "Fujiko F. Fujio", status: "partially", date: "0000" },
  { title: "Case Closed / Detective Conan", author: "Gosho Aoyama", status: "partially", date: "0000" },
  { title: "Demon Slayer: Kimetsu no Yaiba", author: "Koyoharu Gotouge", status: "partially", date: "0000" },
  { title: "One Piece", author: "Eiichiro Oda", status: "partially", date: "0000" },
];