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

export interface Profile {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  brief: string;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  projectExperience: ProjectExperience[];
  certifications: Certification[];
}