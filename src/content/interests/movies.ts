export interface Book {
  title: string;
  author: string;
  status: 'reading' | 'finished' | 'partially';
  date: string;   
  tag?: string;                                                                                             
}


export const books: Book[] = [
  // Ghibli
  { title: "Castle in the Sky", tag: "Ghibli", author: "", status: "finished", date: "0000" },
  { title: "My Neighbor Totoro", tag: "Ghibli", author: "", status: "finished", date: "0000" },
  { title: "Kiki's Delivery Service", tag: "Ghibli", author: "", status: "finished", date: "2026" },
  { title: "Porco Rosso", tag: "Ghibli", author: "", status: "finished", date: "2026" },
  { title: "Spirited Away", tag: "Ghibli", author: "", status: "finished", date: "2025" },
  { title: "Ponyo", tag: "Ghibli", author: "", status: "finished", date: "0000" },
  { title: "Arrietty", tag: "Ghibli", author: "", status: "finished", date: "0000" },
  { title: "The Boy and the Heron", tag: "Ghibli", author: "", status: "finished", date: "2026" },
  { title: "Nausicaä of the Valley of the Wind", tag: "Ghibli", author: "", status: "finished", date: "0000" },

  // Christopher Nolan
  { title: "Interstellar", tag: "Christopher Nolan", author: "", status: "finished", date: "0000" },
  { title: "Oppenheimer", tag: "Christopher Nolan", author: "", status: "finished", date: "2024" },
  { title: "The Dark Knight", tag: "Christopher Nolan", author: "", status: "finished", date: "0000" },
  { title: "The Dark Knight Rises", tag: "Christopher Nolan", author: "", status: "finished", date: "0000" },
  { title: "Tenet", tag: "Christopher Nolan", author: "", status: "finished", date: "2024" },
  { title: "Inception", tag: "Christopher Nolan", author: "", status: "finished", date: "2024" },
  { title: "Dunkirk", tag: "Christopher Nolan", author: "", status: "finished", date: "2024" },

  // MCU
  { title: "Iron Man", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Iron Man 2", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Thor", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Captain America: The First Avenger", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "The Avengers", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Iron Man 3", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Thor: The Dark World", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Avengers: Age of Ultron", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Captain America: Civil War", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Doctor Strange", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Guardians of the Galaxy Vol. 2", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Spider-Man: Homecoming", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Thor: Ragnarok", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Black Panther", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Avengers: Infinity War", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Avengers: Endgame", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Spider-Man: Far From Home", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Spider-Man: No Way Home", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Doctor Strange in the Multiverse of Madness", tag: "MCU", author: "", status: "finished", date: "0000" },
  { title: "Black Panther: Wakanda Forever", tag: "MCU", author: "", status: "finished", date: "0000" },

  // No tag
  { title: "The Martian", author: "", status: "finished", date: "0000" },
  { title: "Blade Runner 2049", author: "", status: "finished", date: "0000" },
  { title: "Man of Steel", author: "", status: "finished", date: "0000" },
  { title: "Batman v Superman: Dawn of Justice", author: "", status: "finished", date: "0000" },
  { title: "Godzilla: King of the Monsters", author: "", status: "finished", date: "0000" },
  { title: "Demon Slayer: Mugen Train", author: "", status: "finished", date: "0000" },
  { title: "Demon Slayer: Infinity Castle Part 1", author: "", status: "finished", date: "2025" },
  { title: "Your Name", author: "", status: "finished", date: "0000" },
  { title: "Suzume", author: "", status: "finished", date: "0000" },
  { title: "Jujutsu Kaisen 0", author: "", status: "finished", date: "0000" },
  { title: "Summer Wars", author: "", status: "finished", date: "0000" },
  { title: "Dragon Ball Super: Broly", author: "", status: "finished", date: "0000" },
  { title: "Project Hail Mary", author: "", status: "finished", date: "2026" },
  { title: "The Amazing Digital Circus", author: "", status: "finished", date: "2026" },
  { title: "Arrival", author: "", status: "finished", date: "2024" },
  { title: "Gravity", author: "", status: "finished", date: "2024" },
  { title: "Ad Astra", author: "", status: "finished", date: "2024" },
  { title: "Geostorm", author: "", status: "finished", date: "0000" },
  { title: "Avatar", author: "", status: "finished", date: "0000" },
  { title: "2001: A Space Odyssey", author: "", status: "finished", date: "2025" },
];