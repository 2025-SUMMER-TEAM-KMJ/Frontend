import { Job, JobFilters, SortOption } from '@/types';

const ALL_JOBS: Job[] = [
  { id: 1, company: '네이버', title: '프론트엔드 개발자', location: '경기', experience: '신입/경력', tags: ['React', 'TypeScript'] },
  { id: 2, company: '카카오', title: '백엔드 개발자 (Java)', location: '제주', experience: '경력 3년+', tags: ['Java', 'Spring'] },
  { id: 3, company: '쿠팡', title: 'iOS 개발자', location: '서울', experience: '경력 5년+', tags: ['Swift', 'iOS'] },
  { id: 4, company: '토스', title: '데이터 분석가', location: '서울', experience: '신입', tags: ['SQL', 'Python'] },
  { id: 5, company: '배달의민족', title: '안드로이드 개발자', location: '서울', experience: '경력 2년+', tags: ['Kotlin', 'Android'] },
  { id: 6, company: '삼성전자', title: 'AI 연구원', location: '서울', experience: '석사 이상', tags: ['PyTorch', 'AI'] },
  { id: 7, company: '네이버', title: 'UI/UX 디자이너', location: '경기', experience: '경력 3년+', tags: ['Figma', 'UX'] },
  { id: 8, company: '카카오', title: '프론트엔드 개발자 (Vue)', location: '제주', experience: '경력 1년+', tags: ['Vue.js', 'JavaScript'] },
];

export const getJobs = (
  filters: JobFilters,
  sort: SortOption,
  isLoggedIn: boolean
): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredJobs = ALL_JOBS;

      // Filtering logic (simple for now)
      if (filters.location && filters.location !== '전체') {
        filteredJobs = filteredJobs.filter(job => job.location === filters.location);
      }
      // Add more filters for category and job here...

      // Sorting logic
      if (sort === 'recommend' && isLoggedIn) {
        // Mock recommendation: shuffle array to simulate personalized result
        filteredJobs.sort(() => Math.random() - 0.5);
      } else { // 'latest' or not logged in
        // Mock latest: sort by ID descending
        filteredJobs.sort((a, b) => b.id - a.id);
      }

      resolve(filteredJobs);
    }, 500);
  });
};
