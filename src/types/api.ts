/* eslint-disable */
/* tslint:disable */
/*
 * --------------------------------------------------------------- 
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * --------------------------------------------------------------- 
 */

export interface Certification {
  name: string;
  agency?: string | null;
  /** @pattern ^\d{4}-(0[1-9]|1[0-2])$ */
  issue_date: string;
}

/** 자기소개서 생성 요청 */
export interface CoverLetterCreate {
  /**
   * 자기소개서 제목
   * @minLength 1
   * @maxLength 100
   */
  title: string;
  /** 자기소개서 타입 */
  type: "profile" | "job_posting";
  /** 공고 기반일 경우 해당 공고 id */
  job_posting_id?: string | null;
  /** 초기 문항 리스트 */
  qnas?: schemas__cover_letter__QnA[] | null;
}

export interface CoverLetterListResponse {
  /** 전체 개수 */
  total: number;
  /** 자기소개서 목록 */
  items: CoverLetterResponse[];
}

/** 클라이언트 응답 모델 */
export interface CoverLetterResponse {
  id: string;
  user_id: string;
  title: string;
  type: "profile" | "job_posting";
  job_posting_id?: string | null;
  qnas: schemas__cover_letter__QnA[];
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

/** 자기소개서 상위 메타 수정 요청 (부분 업데이트), 문항 수정은 별도 엔드포인트로 진행 */
export interface CoverLetterUpdate {
  /**
   * @minLength 1
   * @maxLength 100
   */
  title?: string | null;
}

export interface Education {
  school_name: string;
  major?: string | null;
  degree?: ("Associate" | "Bachelor" | "Master" | "Doctorate") | null;
  /** @pattern ^\d{4}-(0[1-9]|1[0-2])$ */
  start_date: string;
  /** @pattern ^\d{4}-(0[1-9]|1[0-2])$ */
  end_date?: string | null;
}

export interface Experience {
  title: string;
  description?: string | null;
  /**
   * @format uri
   * @minLength 1
   * @maxLength 2083
   */
  link?: string | null;
  tech_stack?: string[] | null;
  /** @pattern ^\d{4}-(0[1-9]|1[0-2])$ */
  start_date?: string | null;
  /** @pattern ^\d{4}-(0[1-9]|1[0-2])$ */
  end_date?: string | null;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface JobPostingCompany {
  name: string;
  logo_img?: string | null;
  address?: JobPostingCompanyAddress | null;
}

export interface JobPostingCompanyAddress {
  country?: string | null;
  location?: string | null;
  district?: string | null;
  full_location?: string | null;
}

export interface JobPostingDetail {
  position?: JobPostingPosition | null;
  intro?: string | null;
  main_tasks?: string | null;
  requirements?: string | null;
  preferred_points?: string | null;
  benefits?: string | null;
  hire_rounds?: string | null;
}

/** 채용 공고 목록과 전체 개수를 함께 반환하는 모델 */
export interface JobPostingListResponse {
  /** 조건에 맞는 전체 공고 수 */
  total: number;
  /** 조회된 공고 목록 */
  items: JobPostingResponse[];
}

export interface JobPostingMetadata {
  source?: string | null;
  /**
   * @format uri
   * @minLength 1
   * @maxLength 2083
   */
  sourceUrl?: string | null;
  /** @format date-time */
  crawledAt?: string | null;
}

export interface JobPostingPosition {
  jobGroup?: string | null;
  job?: string | null;
}

export interface JobPostingResponse {
  id: string;
  metadata: JobPostingMetadata;
  company: JobPostingCompany;
  detail: JobPostingDetail;
  /**
   * @format date-time
   */
  due_time?: string | null; // Added due_time field
  /**
   * @format uri
   * @minLength 1
   * @maxLength 2083
   */
  externalUrl?: string | null;
  skill_tags: string[];
  sourceData?: string | null;
  status?: ("active" | "inactive" | "closed") | null;
  title_images: string[];
  bookmarked?: boolean | null;
}

export interface LoginRequest {
  /** @format email */
  email: string;
  /** @minLength 8 */
  password: string;
}

export interface PreferredPosition {
  job_group: string;
  job?: string | null;
}

/** 자기소개서 개별 항목 생성 -> AI로 생성 진행 */
export interface QnACreate {
  /**
   * 자기소개서 문항 질문
   * @minLength 1
   * @maxLength 100
   */
  question: string;
  answer?: string | null;
}

/** 자기소개서 개별 항목 수정 -> 유저가 수정 */
export interface QnAUpdate {
  question?: string | null;
  answer?: string | null;
}

export interface SignUpRequest {
  /** @format email */
  email: string;
  /** @minLength 8 */
  password: string;
  name: string;
  age: number;
  gender: "남성" | "여성";
  phone: string;
}

export interface TokenResponse {
  access_token: string;
  token_type?: string;
}

export interface UserResponse {
  /** @format email */
  email: string;
  name: string;
  age: number;
  gender: "남성" | "여성";
  phone: string;
  profile_img_key?: string | null;
  /** @format uri */
  urls: string[];
  brief?: string | null;
  competencies: string[];
  preferred_position: PreferredPosition[];
  educations: Education[];
  work_experience: WorkExperience[];
  experiences: Experience[];
  certifications: Certification[];
  qnas: schemas__user__QnA[];
  interest_jobs: string[];
}

export interface UserUpdateRequest {
  age?: number | null;
  phone?: string | null;
  /** @format uri */
  urls?: string[] | null;
  brief?: string | null;
  competencies?: string[] | null;
  preferred_position?: PreferredPosition[] | null;
  educations?: Education[] | null;
  work_experience?: WorkExperience[] | null;
  experiences?: Experience[] | null;
  certifications?: Certification[] | null;
  qnas?: schemas__user__QnA[] | null;
  interest_jobs?: string[] | null;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface WorkExperience {
  company_name: string;
  job_group: string;
  job: string;
  /** @pattern ^\d{4}-(0[1-9]|1[0-2])$ */
  start_date: string;
  /** @pattern ^\d{4}-(0[1--9]|1[0-2])$ */
  end_date?: string | null;
  description?: string | null;
}

export interface schemas__cover_letter__QnA {
  /**
   * 문항에 대한 식별자
   * @format uuid
   */
  id?: string;
  /** 자기소개서 문항 */
  question: string;
  /** 문항에 맞는 답변 */
  answer: string;
  /** @format date-time */
  created_at?: string;
  /** @format date-time */
  updated_at?: string;
}

export interface schemas__user__QnA {
  title: string;
  content?: string | null;
  category?: string | null;
}
