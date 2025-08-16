export interface Education {
  id: string;
  institution: string;
  major: string;
  startDate: string;
  endDate: string;
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

export interface Skill {
  id: string;
  name: string;
}

export interface Certification {
  id: string;
  name: string;
  issueDate: string;
  issuer: string;
}

export interface MyStory {
  id: string;
  title: string;
  content: string;
  tag: '자기소개' | '일화' | '기타';
}

export interface Profile {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  brief: string;
  desiredJobGroup?: string;
  desiredJobRole?: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  projectExperience: ProjectExperience[];
  certifications: Certification[];
  myStories?: MyStory[];
  links?: string[];
}