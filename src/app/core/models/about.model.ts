export interface SocialLink {
  name: string;
  url: string;
}

export interface Talk {
  title: string;
  recordingUrl?: string;
  slidesUrl?: string;
  description: string;
}

export interface Interview {
  title: string;
  url: string;
}

export interface Person {
  name: string;
  url: string;
  met: boolean;
}

export interface AboutData {
  bio: string[];
  links: SocialLink[];
  talks: Talk[];
  interviews: Interview[];
  people: Person[];
}
