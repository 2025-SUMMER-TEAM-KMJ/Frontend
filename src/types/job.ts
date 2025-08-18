import { JobPostingResponse } from './api';

export type { JobPostingResponse as JobPosting };

export interface JobFilters {
  location: string;
  category: string; // 직군
  job: string;      // 직무
}

export type SortOption = 'recommend' | 'latest';