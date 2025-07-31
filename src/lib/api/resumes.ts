import { Resume, Profile, Job } from '@/types';
import { getProfile } from './profile'; // 현재 프로필을 가져오기 위함

let MOCK_RESUMES: Resume[] = [
  // 초기 목 데이터 (테스트용)
  {
    id: 'resume-1',
    title: '네이버 프론트엔드 개발자 지원',
    updatedAt: '2023-10-26',
    basedOn: 'job',
    jobInfo: { id: 1, company: '네이버', title: '프론트엔드 개발자' },
    snapshot: { basicInfo: { name: '테스트 사용자', email: 'test@example.com', phone: '', brief: '' } } as Profile,
    qnas: [
      { id: 'q1', question: '지원 동기를 말씀해주세요.', answer: '네이버의 기술력에...' },
      { id: 'q2', question: '가장 자신있는 프로젝트는 무엇인가요?', answer: 'careergo 프로젝트입니다...' },
    ],
  },
  {
    id: 'resume-2',
    title: '기본 프로필 기반 자소서',
    updatedAt: '2023-10-25',
    basedOn: 'profile',
    snapshot: { basicInfo: { name: '테스트 사용자', email: 'test@example.com', phone: '', brief: '' } } as Profile,
    qnas: [
      { id: 'q1', question: '성장 과정을 들려주세요.', answer: '어릴 적부터...' },
    ],
  },
];

export const getResumes = (): Promise<Resume[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RESUMES), 500);
  });
};

export const getResumeById = (id: string): Promise<Resume | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resume = MOCK_RESUMES.find(r => r.id === id);
      resolve(resume);
    }, 300);
  });
};

export const createProfileBasedResume = async (): Promise<Resume> => {
    const currentProfile = await getProfile();
    if (!currentProfile) throw new Error('프로필이 존재하지 않습니다.');

    const newResume: Resume = {
        id: `resume-${Date.now()}`,
        title: '새 프로필 기반 자소서',
        updatedAt: new Date().toISOString().split('T')[0],
        basedOn: 'profile',
        snapshot: JSON.parse(JSON.stringify(currentProfile)), // Deep copy for snapshot
        qnas: [
            { id: 'q-new-1', question: 'AI가 생성한 새로운 질문입니다.', answer: 'AI가 생성한 새로운 답변입니다.' },
        ],
    };
    MOCK_RESUMES.unshift(newResume);
    return newResume;
};

export const createJobBasedResume = async (job: Job): Promise<Resume> => {
    const currentProfile = await getProfile();
    if (!currentProfile) throw new Error('프로필이 존재하지 않습니다.');

    const newResume: Resume = {
        id: `resume-${Date.now()}`,
        title: `${job.company} ${job.title} 지원`,
        updatedAt: new Date().toISOString().split('T')[0],
        basedOn: 'job',
        jobInfo: { id: job.id, company: job.company, title: job.title },
        snapshot: JSON.parse(JSON.stringify(currentProfile)), // Deep copy for snapshot
        qnas: [
            { id: 'q-job-1', question: `${job.title} 직무에 필요한 역량은 무엇이라고 생각하나요?`, answer: 'AI가 생성한 답변입니다...' },
        ],
    };
    MOCK_RESUMES.unshift(newResume);
    return newResume;
};

export const updateResumeQnA = (resumeId: string, qnaId: string, newAnswer: string): Promise<Resume> => {
    return new Promise((resolve, reject) => {
        const resumeIndex = MOCK_RESUMES.findIndex(r => r.id === resumeId);
        if (resumeIndex === -1) return reject(new Error('Resume not found'));

        const qnaIndex = MOCK_RESUMES[resumeIndex].qnas.findIndex(q => q.id === qnaId);
        if (qnaIndex === -1) return reject(new Error('QnA not found'));

        MOCK_RESUMES[resumeIndex].qnas[qnaIndex].answer = newAnswer;
        MOCK_RESUMES[resumeIndex].updatedAt = new Date().toISOString().split('T')[0];
        
        resolve(MOCK_RESUMES[resumeIndex]);
    });
};
