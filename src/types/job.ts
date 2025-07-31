export interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  experience: string;
  tags: string[];
}

export interface JobFilters {
  location: string;
  category: string; // 직군
  job: string;      // 직무
}

export type SortOption = 'recommend' | 'latest';
