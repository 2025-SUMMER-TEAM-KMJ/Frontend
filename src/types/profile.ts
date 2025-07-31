export interface BasicInfo {
  name: string;
  email: string;
  phone: string;
  brief: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Profile {
  basicInfo: BasicInfo;
  skills: Skill[];
  experience: Experience[];
  // Education, etc. can be added here
}
