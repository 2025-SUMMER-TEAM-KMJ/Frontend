import { Job, QnA, Resume } from '@/types';
import { getProfile } from './profile'; // 현재 프로필을 가져오기 위함

let MOCK_RESUMES: Resume[] = [
  {
    id: 'resume-1',
    title: '네이버 프론트엔드 개발자 지원',
    updatedAt: '2023-10-26',
    basedOn: 'job',
    jobInfo: {
      _id: { "$oid": "688e6ce616e0fa856eefa490" },
      metadata: { source: "wanted", sourceUrl: "https://www.wanted.co.kr/api/chaos/jobs/v4/300466/details", crawledAt: "2025-08-02T19:53:34.873901" },
      company: {
        name: "구름",
        logo_img: null,
        address: { country: "한국", location: "경기", district: "성남시", full_location: "성남시 분당구 판교로 242 PDC A동 9층" },
        features: ["식대지원", "자기계발지원", "커피·스낵바", "51~300명", "인원 급성장", "설립10년이상", "원티드 픽", "연봉 업계평균이상", "유망산업", "대규모 채용 중"],
        avgSalary: 43693400,
        avgEntrySalary: null
      },
      detail: {
        position: { jobGroup: "교육", job: ["교재·교육기획"] },
        intro: "구름은요,\nCDE(Cloud Development Environment)와 에듀테크 분야에서 선도적인 위치를 차지하고 있으며, goormIDE, goormDEVTH, goormEDU, goormLEVEL, goormEXP 등과 같이, 독자적인 기술력을 바탕으로 개발된 서비스를 제공하고 있습니다\n이들은 누적 가입자 수 100만 명 이상을 자랑하는 구름의 대표적인 SaaS 제품입니다",
        main_tasks: "1) 교육생 교육 경험 관리\n• 교육생의 진도율과 성취율 등 학습 현황 모니터링\n• 교육생의 피드백을 수집/분석해 교육 경험 개선 방안 제시\n\n2) 온/오프라인 교육 과정 운영 지원\n• 강사 및 멘토와의 커뮤니케이션을 통해 교육이 원활히 진행되도록 운영 전반 지원\n• 교육 과정 실행 준비 및 학습 자료 관리\n\n3) 교육 행정 및 사무 업무\n• 교육생 출석, 과제 제출, 평가 결과 등 교육 관련 데이터 관리\n• 교재 및 자료 준비, 교육 운영 보고서 작성 등 사무 지원",
        requirements: "• 문제를 발견하고 해결하는 능력을 갖춘 분\n• 커뮤니케이션 능력이 뛰어난 분\n• 최신 IT 트렌드에 민감하고 배우는 것을 좋아하는 분\n• 생각을 글로 명확하게 정리하여 전달할 수 있는 분",
        preferred_points: "• 평생교육사 자격증 보유한 분\n• 컴퓨터 공학 및 유사 전공 졸업한 분\n• 프로그래밍 역량이 있거나 프로그래밍 교육 과정을 이수한 분\n• IT 분야 교육 기획 및 운영 경험이 있는 분\n• 교육 시장 및 교육 콘텐츠에 대한 이해도가 높은 분\n• 코딩 교육 기관별 타겟과 시장 전략에 대해 설명할 수 있는 분",
        benefits: "[업무 환경을 위한 제도]\n • 최고 사양의 장비 지원\n • 유연 근무제(7:30~10:30 자율 출근)\n • 스프린트 마지막 날 2시간 조기 퇴근\n • 업무 집중이 가능한 goorm square 공간 마련\n\n[휴식을 위한 제도]\n • 리프레시 휴가(2n년 근속 마다 반복 지급)\n • 장기 근속 포상휴가(5n년 근속 마다 반복 지급)\n • 특별 휴가(생일, 건강 검진, 졸업, 병가 등)\n\n[건강 지킴을 위한 제도]\n • 건강 검진 지원(검진 당일 휴가 지원)\n • 운동비 지원\n • 안마 의자 및 릴렉스 공간 운영\n\n[행복 충전을 위한 제도]\n • 장기 근속 포상(순금 및 기념 상품)\n • 특별 Day(명절, 생일, 가정의 달, 입사 기념일 등)\n • 전세 자금 대출이자 지원\n • 교육비 지원\n • 주차 지원\n • 제주도 리조트 Free 이용 가능 \n • 맛있는 중식, 간식, 커피, 음료 지원\n • 구름 세미나, 구르미 독서 제도 지원\n \n[소통을 위한 제도]\n • 얼라인먼트 데이, 타운홀 미팅, 데모데이 진행\n • 랜덤 커피챗 및 사내 캐주얼 행사 진행\n • 제주도 워케이션 진행",
        hire_rounds: "[채용 과정 안내]\n • 서류 검토 - 1차 면접(화상) - 미션 수행 - 인성 검사 및 2차 면접 - 처우 협의 및 채용 확정\n • 채용 상황에 따라, 전형이 축소/확대 될 수 있습니다\n • 서류검토 결과는 합격/불합격 여부와 관계없이 모든 분께 결과를 안내해 드리고 있습니다\n\n[지원 방법 안내]\n • 제출 서류 : \'(필수)이력서\' 와 \'(선택)포트폴리오\'• 양식 형태 : 자유 양식(PDF 파일), URL 첨부 가능\n\n※ 채용서류 보관·파기 안내\n구름의 채용 전형 과정에서 제출하신 서류는 『채용절차의 공정화에 관한 법률』에 따라 채용 여부가 확정된 이후 180일간 보관되며, 그 이후에는 『개인정보보호법』에 따라 지체없이 파기 됩니다."
      },
      externalUrl: '',
      skill_tags: [],
      sourceData: '',
      status: '',
      title_images: []
    },
    // snapshot 객체는 프로필 정보만 포함하도록 수정
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
    // qnas 배열을 snapshot과 같은 레벨의 프로퍼티로 분리
    qnas: [
      { id: 'q1', question: '지원 동기를 말씀해주세요.', answer: '네이버의 기술력에...' },
      { id: 'q2', question: '가장 자신있는 프로젝트는 무엇인가요?', answer: 'careergo 프로젝트입니다...' },
    ]
  },
  // 두 번째 객체는 구조가 올바르므로 그대로 유지
  {
    id: 'resume-2',
    title: '나의 첫 프로필 자소서 (예시)',
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

export const getResumes = (jobId?: string): Promise<Resume[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (jobId) {
        const filtered = MOCK_RESUMES.filter(r => r.jobInfo?._id?.$oid === jobId);
        resolve(filtered);
      } else {
        resolve(MOCK_RESUMES);
      }
    }, 500);
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
        position: { jobGroup: job.jobGroup || "", job: [job.title] }, // jobGroup과 job을 Job에서 가져옵니다.
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