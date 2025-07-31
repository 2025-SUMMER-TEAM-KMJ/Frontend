import { Job, Profile } from '.';

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
  jobInfo?: Pick<Job, 'id' | 'company' | 'title'>; // 공고 기반일 경우
}
