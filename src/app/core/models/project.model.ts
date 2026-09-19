export interface Project {
  name: string;
  description: string;
  url: string;
  /** Primary languages, tools and platforms, rendered as tags. */
  tech?: string[];
  /** Year the work was done, shown alongside the title. */
  year?: number;
  repoUrl?: string;
  liveUrl?: string;
  stars?: number;
  featured?: boolean;
}

export interface ProjectCategory {
  category: string;
  projects: Project[];
}
