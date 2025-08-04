export interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  experience: string;
  tags: string[];
  jobGroup?: string; // jobGroup 추가
}

export interface JobFilters {
  location: string;
  category: string; // 직군
  job: string;      // 직무
}

export type SortOption = 'recommend' | 'latest';

export interface JobPosting {
  _id: { $oid: string };
  metadata: {
    source: string;
    sourceUrl: string;
    crawledAt: string;
  };
  company: {
    name: string;
    logo_img: string | null;
    address: {
      country: string;
      location: string;
      district: string;
      full_location: string;
    };
    features: string[];
    avgSalary: number;
    avgEntrySalary: number | null;
  };
  detail: {
    position: {
      jobGroup: string;
      job: string[];
    };
    intro: string;
    main_tasks: string;
    requirements: string;
    preferred_points: string;
    benefits: string;
    hire_rounds: string;
  };
  externalUrl: string;
  skill_tags: string[];
  sourceData: string;
  status: string;
  title_images: string[];
}
