import { Resume, Profile, Job, QnA } from '@/types';
import { getProfile } from './profile'; // 현재 프로필을 가져오기 위함

let MOCK_RESUMES: Resume[] = [
  // 초기 목 데이터 (테스트용)
  {
    id: 'resume-1',
    title: '네이버 프론트엔드 개발자 지원',
    updatedAt: '2023-10-26',
    basedOn: 'job',
    jobInfo: {
      _id: { "$oid": "688e6ce616e0fa856eefa490" },
      metadata: { source: "wanted", sourceUrl: "https://www.wanted.co.kr/api/chaos/jobs/v4/300466/details", crawledAt: "2025-08-02T19:53:34.873901" },
      company: { name: "네이버", logo_img: null, address: { country: "한국", location: "경기", district: "성남시", full_location: "성남시 분당구" }, features: [], avgSalary: 0, avgEntrySalary: null },
      detail: { position: { jobGroup: "IT", job: ["프론트엔드 개발자"] }, intro: "", main_tasks: "", requirements: "", preferred_points: "", benefits: "", hire_rounds: "" },
      externalUrl: "https://www.wanted.co.kr/wd/12345",
      skill_tags: [],
      sourceData: "",
      status: "active",
      title_images: []
    },
    snapshot: {
      name: '테스트 사용자',
      age: 30,
      gender: '남',
      email: 'test@example.com',
      phone: '010-1234-5678',
      brief: '프론트엔드 개발자입니다.',
      skills: [{ id: 's1', name: 'React' }],
      education: [{ id: 'e1', institution: '테스트대학교', major: '컴퓨터공학', startDate: '2015-03-01', endDate: '2019-02-28' }],
      workExperience: [{ id: 'w1', company: '테스트회사', position: '주니어 개발자', startDate: '2019-03-01', endDate: '2021-02-28' }],
      projectExperience: [{ id: 'p1', title: '테스트 프로젝트', startDate: '2022-01-01', endDate: '2022-06-30' }],
      certifications: [{ id: 'c1', name: '정보처리기사', issueDate: '2020-01-01', issuer: '한국산업인력공단' }],
    },
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
    snapshot: {
      name: '테스트 사용자',
      age: 30,
      gender: '남',
      email: 'test@example.com',
      phone: '010-1234-5678',
      brief: '프론트엔드 개발자입니다.',
      skills: [{ id: 's1', name: 'React' }],
      education: [{ id: 'e1', institution: '테스트대학교', major: '컴퓨터공학', startDate: '2015-03-01', endDate: '2019-02-28' }],
      workExperience: [{ id: 'w1', company: '테스트회사', position: '주니어 개발자', startDate: '2019-03-01', endDate: '2021-02-28' }],
      projectExperience: [{ id: 'p1', title: '테스트 프로젝트', startDate: '2022-01-01', endDate: '2022-06-30' }],
      certifications: [{ id: 'c1', name: '정보처리기사', issueDate: '2020-01-01', issuer: '한국산업인력공단' }],
    },
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
            { id: 'q-new-1', question: '성장 과정을 들려주세요.', answer: '' },
            { id: 'q-new-2', question: '지원자님의 강점과 약점은 무엇인가요?', answer: '' },
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
        jobInfo: {
            _id: { "$oid": job.id.toString() }, // job.id를 JobPosting의 _id.$oid에 매핑
            metadata: { source: "mock", sourceUrl: "", crawledAt: new Date().toISOString() },
            company: {
                name: job.company,
                logo_img: null,
                address: { country: "", location: "", district: "", full_location: job.location },
                features: [],
                avgSalary: 0,
                avgEntrySalary: null,
            },
            detail: {
                position: { jobGroup: "", job: [job.title] },
                intro: "",
                main_tasks: "",
                requirements: "",
                preferred_points: "",
                benefits: "",
                hire_rounds: "",
            },
            externalUrl: "",
            skill_tags: job.tags || [], // job.tags가 있다면 사용
            sourceData: "",
            status: "active",
            title_images: [],
        },
        snapshot: JSON.parse(JSON.stringify(currentProfile)), // Deep copy for snapshot
        qnas: [
            { id: 'q-job-1', question: `${job.title} 직무에 필요한 역량은 무엇이라고 생각하나요?`, answer: 'AI가 생성한 답변입니다...' },
        ],
    };
    MOCK_RESUMES.unshift(newResume);
    return newResume;
};

export const updateResumeQnA = (resumeId: string, qnaId: string, newQuestion: string, newAnswer: string): Promise<Resume> => {
    return new Promise((resolve, reject) => {
        const resumeIndex = MOCK_RESUMES.findIndex(r => r.id === resumeId);
        if (resumeIndex === -1) return reject(new Error('Resume not found'));

        const qnaIndex = MOCK_RESUMES[resumeIndex].qnas.findIndex(q => q.id === qnaId);
        if (qnaIndex === -1) return reject(new Error('QnA not found'));

        MOCK_RESUMES[resumeIndex].qnas[qnaIndex] = { ...MOCK_RESUMES[resumeIndex].qnas[qnaIndex], question: newQuestion, answer: newAnswer };
        MOCK_RESUMES[resumeIndex].updatedAt = new Date().toISOString().split('T')[0];
        
        resolve(MOCK_RESUMES[resumeIndex]);
    });
};

export const addResumeQnA = (resumeId: string): Promise<Resume> => {
    return new Promise((resolve, reject) => {
        const resumeIndex = MOCK_RESUMES.findIndex(r => r.id === resumeId);
        if (resumeIndex === -1) return reject(new Error('Resume not found'));

        const newQnA: QnA = {
            id: `qna-${Date.now()}`,
            question: '새로운 질문을 입력하세요.',
            answer: '새로운 답변을 입력하세요.',
        };

        const updatedResume = {
            ...MOCK_RESUMES[resumeIndex],
            qnas: [...MOCK_RESUMES[resumeIndex].qnas, newQnA],
            updatedAt: new Date().toISOString().split('T')[0],
        };

        MOCK_RESUMES[resumeIndex] = updatedResume;

        resolve(updatedResume);
    });
};

export const deleteResumeQnA = (resumeId: string, qnaId: string): Promise<Resume> => {
    return new Promise((resolve, reject) => {
        const resumeIndex = MOCK_RESUMES.findIndex(r => r.id === resumeId);
        if (resumeIndex === -1) return reject(new Error('Resume not found'));

        MOCK_RESUMES[resumeIndex].qnas = MOCK_RESUMES[resumeIndex].qnas.filter(q => q.id !== qnaId);
        MOCK_RESUMES[resumeIndex].updatedAt = new Date().toISOString().split('T')[0];

        resolve(MOCK_RESUMES[resumeIndex]);
    });
};
