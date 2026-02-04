export interface Book {
  title: string;
  author: string;
  url?: string;
}

export interface ReadingYear {
  year: number;
  books: Book[];
}
