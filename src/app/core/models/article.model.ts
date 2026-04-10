export interface Article {
  title: string;
  slug: string;
  date: string;
  url: string;
}

export interface ArticleYear {
  year: number;
  articles: Article[];
}
