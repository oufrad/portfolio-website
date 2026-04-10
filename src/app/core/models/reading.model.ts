export interface Book {
  title: string;
  author: string;
  url?: string;
  date?: string;
  rating?: number;
}

export interface ReadingYear {
  year: number;
  books: Book[];
}
