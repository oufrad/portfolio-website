export interface Project {
  name: string;
  description: string;
  url: string;
  stars?: number;
  featured?: boolean;
}

export interface ProjectCategory {
  category: string;
  projects: Project[];
}
