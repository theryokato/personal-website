export interface Book {
  title: string;
  author: string;
  status: 'reading' | 'finished' | 'abandoned';
  date: string;                                                                                                
}

export const books: Book[] = [
  // Currently reading
  { title: "On the Genealogy of Morality", author: "Friedrich Nietzsche", status: "reading", date: "2026" },

  // 2026
  { title: "Beyond Good and Evil", author: "Friedrich Nietzsche", status: "finished", date: "May 2026" },
  { title: "I Have No Mouth, and I Must Scream", author: "Harlan Ellison", status: "finished", date: "March 2026" },

  // Before cutoff year (2024)
  { title: "The Maze Runner", author: "James Dashner", status: "finished", date: "0000" },
  { title: "The Mortality Doctrine", author: "James Dashner", status: "finished", date: "0000" },
  { title: "The Watsons Go to Birmingham—1963", author: "Christopher Paul Curtis", status: "finished", date: "0000" },
  { title: "The Diary of a Young Girl", author: "Anne Frank", status: "finished", date: "0000" },
  { title: "The Time I got Reincarnated as a Slime", author: "Fuse", status: "finished", date: "0000" },
  { title: "Percy Jackson & the Olympians", author: "Rick Riordan", status: "finished", date: "0000" },
];