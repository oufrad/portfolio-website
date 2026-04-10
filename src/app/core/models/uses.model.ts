export interface UsesItem {
  name: string;
  description?: string;
  url?: string;
}

export interface UsesCategory {
  category: string;
  items: UsesItem[];
}
