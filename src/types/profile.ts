import { UserResponse } from './api';

export type { UserResponse as Profile };

export interface MyStory {
  id: string;
  title: string;
  content: string;
  tag: '자기소개' | '일화' | '기타';
}

export interface Skill {
  id: string;
  name: string;
}
