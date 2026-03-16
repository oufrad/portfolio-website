export interface HomeData {
  name: string;
  title: string;
  bio: string[];
  socialLinks: { name: string; url: string }[];
  selectedWriting: { date: string; title: string; url: string }[];
}
