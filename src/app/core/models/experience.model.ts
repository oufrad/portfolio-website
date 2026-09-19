export interface Experience {
  company: string;
  companyUrl?: string;
  role: string;
  /** ISO year-month, e.g. "2023-06". Omitted until the real date is filled in. */
  start?: string;
  /** Omit for the current role; the UI renders "Present" when `start` is set. */
  end?: string;
  location?: string;
  summary?: string;
  highlights?: string[];
}
