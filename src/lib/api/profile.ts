import { Profile } from '@/types/profile';

// In a real app, this would be null until the user creates it.
// We'll start with mock data for demonstration.
let MOCK_PROFILE: Profile | null = {
  name: '김민준',
  age: 30,
  gender: '남',
  email: 'minjun.kim@email.com',
  phone: '010-1234-5678',
  brief: '안녕하세요, 프론트엔드 개발자 김민준입니다. React와 TypeScript를 주로 사용하며, 사용자 경험을 향상시키는 인터페이스 개발에 관심이 많습니다. 최근에는 Next.js와 Tailwind CSS를 활용한 프로젝트를 진행했으며, 성능 최적화와 접근성 향상에 중점을 두고 있습니다. 새로운 기술을 배우는 것을 좋아하며, 팀과 함께 성장하는 환경에서 일하고 싶습니다.',
  skills: [
    { id: '1', name: 'JavaScript' },
    { id: '2', name: 'React' },
    { id: '3', name: 'TypeScript' },
    { id: '4', name: 'HTML/CSS' },
    { id: '5', name: 'Next.js' },
  ],
  education: [
    { id: '1', institution: '서울대학교', major: '컴퓨터공학과', startDate: '2015.03', endDate: '2019.02' },
    { id: '2', institution: '한국디지털고등학교', major: '소프트웨어개발과', startDate: '2012.03', endDate: '2015.02' },
  ],
  workExperience: [
    { id: '1', company: 'ABC 테크', position: '프론트엔드 개발자', startDate: '2021.03', endDate: '현재', description: 'React와 TypeScript를 활용한 웹 애플리케이션 개발\nRedux를 이용한 상태 관리 및 API 연동\nUI/UX 개선 및 성능 최적화' },
    { id: '2', company: 'XYZ 소프트', position: '주니어 개발자', startDate: '2020.01', endDate: '2021.02', description: 'HTML, CSS, JavaScript를 활용한 웹 페이지 구현\njQuery 기반 레거시 코드 유지보수\n반응형 웹 디자인 적용' },
  ],
  projectExperience: [
    { id: '1', title: '온라인 쇼핑몰 리뉴얼', startDate: '2022.05', endDate: '2022.08', description: 'Next.js와 Tailwind CSS를 활용한 이커머스 플랫폼 개발. 기존 사이트 대비 페이지 로딩 속도 40% 향상 및 모바일 사용성 개선.' },
    { id: '2', title: '사내 대시보드 시스템', startDate: '2021.09', endDate: '2021.12', description: 'React와 Chart.js를 활용한 데이터 시각화 대시보드 개발. 실시간 데이터 업데이트 및 커스텀 필터링 기능 구현.' },
  ],
  certifications: [
    { id: '1', name: '정보처리기사', issueDate: '2018.05', issuer: '' },
    { id: '2', name: 'SQLD', issueDate: '2019.11', issuer: '' },
  ],
  myStories: [
    { id: 'story1', title: '나의 성장 과정', content: '어릴 적부터 새로운 것을 배우는 데 큰 흥미를 느꼈습니다...', tag: '자기소개' },
    { id: 'story2', title: '가장 큰 성과를 냈던 프로젝트', content: 'XYZ 소프트 재직 시절, 레거시 코드를 리팩토링하여...', tag: '일화' },
    { id: 'story3', title: '나의 직업 가치관', content: '사용자에게 실질적인 가치를 제공하는 제품을 만드는 것이 중요하다고 생각합니다...', tag: '기타' },
  ],
};

export const getProfile = (): Promise<Profile | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetching profile...', MOCK_PROFILE);
      resolve(MOCK_PROFILE);
    }, 500);
  });
};

export const updateProfile = (newProfileData: Profile): Promise<Profile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_PROFILE = newProfileData;
      console.log('Profile updated!', MOCK_PROFILE);
      resolve(MOCK_PROFILE);
    }, 500);
  });
};

export const updateMyStoryTag = (storyId: string, newTag: '자기소개' | '일화' | '기타'): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_PROFILE && MOCK_PROFILE.myStories) {
        const storyIndex = MOCK_PROFILE.myStories.findIndex(s => s.id === storyId);
        if (storyIndex > -1) {
          MOCK_PROFILE.myStories[storyIndex].tag = newTag;
          console.log(`Story ${storyId} tag updated to ${newTag}`);
          resolve();
        } else {
          reject(new Error('Story not found'));
        }
      } else {
        reject(new Error('Profile or stories not found'));
      }
    }, 200);
  });
};

export const addMyStory = (story: MyStory): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!MOCK_PROFILE) {
        return reject(new Error('Profile not found. Please sign up first.'));
      }
      if (!MOCK_PROFILE.myStories) {
        MOCK_PROFILE.myStories = [];
      }
      MOCK_PROFILE.myStories.push(story);
      console.log('My Story added to profile', story);
      resolve();
    }, 200);
  });
};

export const updateMyStory = (updatedStory: MyStory): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (MOCK_PROFILE && MOCK_PROFILE.myStories) {
        const index = MOCK_PROFILE.myStories.findIndex(s => s.id === updatedStory.id);
        if (index > -1) {
          MOCK_PROFILE.myStories[index] = updatedStory;
          console.log('MyStory updated:', updatedStory);
          resolve();
        } else {
          reject(new Error('MyStory not found'));
        }
      } else {
        reject(new Error('Profile or stories not found'));
      }
    }, 200);
  });
};
