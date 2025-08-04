import { Job, Profile, JobPosting, Certification } from '.';

export interface QnA {
  id: string;
  question: string;
  answer: string;
}

export interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  snapshot: Profile; // 생성 시점의 프로필 스냅샷
  qnas: QnA[];
  basedOn?: 'profile' | 'job';
  jobInfo?: JobPosting; // 공고 기반일 경우
}

// New types for multi-step resume creation
export interface Education {
  id: string;
  institution: string;
  major: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ProjectExperience {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Competency {
  id: string;
  name: string;
}

// Certification 인터페이스는 profile.ts에만 정의됩니다.
// export interface Certification {
//   id: string;
//   name: string;
//   issueDate: string;
//   issuer: string;
// }

export interface PreferredPosition {
  id: string;
  title: string;
  industry: string;
}

export interface PersonalNarratives {
  strengths: string;
  values: string;
  motivation: string;
}

export interface ResumeFormData {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  education: Education[];
  workExperience: WorkExperience[];
  experience: ProjectExperience[];
  competencies: Competency[];
  certifications: Certification[]; // profile.ts에서 import
  preferredPosition: PreferredPosition[];
  personalNarratives: PersonalNarratives;
}
