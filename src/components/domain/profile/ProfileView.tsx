'use client';

import { useAuthStore } from '@/store/authStore';
import { Profile } from '@/types/profile';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import EditBriefModal from './modals/EditBriefModal';
import EditCertificationsModal from './modals/EditCertificationsModal';
import EditEducationModal from './modals/EditEducationModal';
import EditProjectExperienceModal from './modals/EditProjectExperienceModal';
import EditSkillsModal from './modals/EditSkillsModal';
import EditWorkExperienceModal from './modals/EditWorkExperienceModal';
import MyStoryCardView from './MyStoryCardView';
import { UserUpdateRequest } from '@/types/api';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xlarge};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Left column wider than right */
  gap: ${({ theme }) => theme.spacing.xlarge};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr; /* Stack columns on smaller screens */
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xlarge};
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xlarge};
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const EditIcon = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  position: relative; /* Add this for positioning the edit icon */
`;

const ProfileHeaderEditIcon = styled(EditIcon)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.medium};
  right: ${({ theme }) => theme.spacing.medium};
  font-size: 20px;
`;

const EditProfileButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  align-self: flex-end; /* Align to the right */

  &:hover {
    opacity: 0.9;
  }
`;

const ProfileImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const ProfileName = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const ProfileDetail = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Section = styled.section`
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
`;

const ContentText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;

const SkillItem = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
`;

const ExperienceItem = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.large};
  &:last-child { margin-bottom: 0; }
`;

const ExperienceTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const ExperiencePeriod = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const ExperienceDescription = styled.p`
  font-size: 15px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

interface Props {
  profile: Profile;
  onSave: (data: Partial<UserUpdateRequest>) => void;
  onAddStory: (story: schemas_user_QnACreate) => void;
  onUpdateStory: (storyId: string, story: schemas_user_QnAUpdate) => void;
  onDeleteStory: (storyId: string) => void;
}

const ToggleButton = styled.button<{ active: boolean }>`
  background-color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.lightGray)};
  color: ${({ active, theme }) => (active ? 'white' : theme.colors.textSecondary)};
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const NoContentMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  padding: 20px;
  border: 1px dashed ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  margin-top: 20px;
`;

export default function ProfileView({ profile, onSave, onAddStory, onUpdateStory, onDeleteStory }: Props) {
  const { openBasicInfoModal, openEditModal, closeEditModal, editingSection } = useAuthStore();
  const [viewMode, setViewMode] = useState<'resume' | 'card'>('resume');

  return (
    <ViewContainer>
      <ProfileHeader>
        <ProfileHeaderEditIcon onClick={openBasicInfoModal}>✏️</ProfileHeaderEditIcon>
        <ProfileImage>
          {/* 임시 이미지 또는 사용자 아바타 */}
          <Image src={profile.profile_img_key ? `http://35.192.157.46:8765/users/profile-image` : "/images/profile_placeholder.png"} alt="프로필 이미지" width={120} height={120} />
        </ProfileImage>
        <ProfileInfo>
          <ProfileName>{profile.name}</ProfileName>
          <ProfileDetail>{profile.email}</ProfileDetail>
          <ProfileDetail>{profile.phone}</ProfileDetail>
          {profile.preferred_position && profile.preferred_position.length > 0 && (
            <>
              <ProfileDetail>희망 직군: {profile.preferred_position[0].job_group}</ProfileDetail>
              <ProfileDetail>희망 직무: {profile.preferred_position[0].job}</ProfileDetail>
            </>
          )}
          {profile.urls && profile.urls.length > 0 && (
            <ProfileDetail>
              링크:
              {profile.urls.map((link, index) => (
                <span key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: index === 0 ? '5px' : '0', color: 'blue', textDecoration: 'underline' }}>
                    {link}
                  </a>
                  {index < profile.urls.length - 1 && ' | '}
                </span>
              ))}
            </ProfileDetail>
          )}
        </ProfileInfo>
      </ProfileHeader>
      <ToggleContainer>
        <ToggleButton active={viewMode === 'resume'} onClick={() => setViewMode('resume')}>이력서</ToggleButton>
        <ToggleButton active={viewMode === 'card'} onClick={() => setViewMode('card')}>나의 이야기</ToggleButton>
      </ToggleContainer>

      <ContentGrid>
        {viewMode === 'resume' ? (
          <>
            <LeftColumn>
              <Section>
                <SectionHeader>
                  <SectionTitle>자기소개</SectionTitle>
                  <EditIcon onClick={() => openEditModal('brief')}>✏️</EditIcon>
                </SectionHeader>
                {profile.brief ? (
                  <ContentText>{profile.brief}</ContentText>
                ) : (
                  <NoContentMessage>자기소개 정보가 없습니다.</NoContentMessage>
                )}
              </Section>

              <Section>
                <SectionHeader>
                  <SectionTitle>경력</SectionTitle>
                  <EditIcon onClick={() => openEditModal('workExperience')}>✏️</EditIcon>
                </SectionHeader>
                {profile.work_experience && profile.work_experience.length > 0 ? (
                  profile.work_experience.map((exp, index) => (
                    <ExperienceItem key={index}>
                      <ExperienceTitle>{exp.company_name} - {exp.job}</ExperienceTitle>
                      <ExperiencePeriod>{exp.start_date} ~ {exp.end_date}</ExperiencePeriod>
                      <ExperienceDescription>{exp.description}</ExperienceDescription>
                    </ExperienceItem>
                  ))
                ) : (
                  <NoContentMessage>경력 정보가 없습니다.</NoContentMessage>
                )}
              </Section>

              <Section>
                <SectionHeader>
                  <SectionTitle>프로젝트</SectionTitle>
                  <EditIcon onClick={() => openEditModal('projectExperience')}>✏️</EditIcon>
                </SectionHeader>
                {profile.experiences && profile.experiences.length > 0 ? (
                  profile.experiences.map((proj, index) => (
                    <ExperienceItem key={index}>
                      <ExperienceTitle>{proj.title}</ExperienceTitle>
                      <ExperiencePeriod>{proj.start_date} ~ {proj.end_date}</ExperiencePeriod>
                      <ExperienceDescription>{proj.description}</ExperienceDescription>
                    </ExperienceItem>
                  ))
                ) : (
                  <NoContentMessage>프로젝트 경험 정보가 없습니다.</NoContentMessage>
                )}
              </Section>
            </LeftColumn>

            <RightColumn>
              <Section>
                <SectionHeader>
                  <SectionTitle>기술 스택</SectionTitle>
                  <EditIcon onClick={() => openEditModal('skills')}>✏️</EditIcon>
                </SectionHeader>
                {profile.competencies && profile.competencies.length > 0 ? (
                  <SkillList>
                    {profile.competencies.map((skill, index) => (
                      <SkillItem key={index}>{skill}</SkillItem>
                    ))}
                  </SkillList>
                ) : (
                  <NoContentMessage>기술 스택 정보가 없습니다.</NoContentMessage>
                )}
              </Section>

              <Section>
                <SectionHeader>
                  <SectionTitle>학력</SectionTitle>
                  <EditIcon onClick={() => openEditModal('education')}>✏️</EditIcon>
                </SectionHeader>
                {profile.educations && profile.educations.length > 0 ? (
                  profile.educations.map((edu, index) => (
                    <ExperienceItem key={index}>
                      <ExperienceTitle>{edu.school_name} - {edu.major}</ExperienceTitle>
                      <ExperiencePeriod>{edu.start_date} ~ {edu.end_date}</ExperiencePeriod>
                    </ExperienceItem>
                  ))
                ) : (
                  <NoContentMessage>학력 정보가 없습니다.</NoContentMessage>
                )}
              </Section>

              <Section>
                <SectionHeader>
                  <SectionTitle>자격증</SectionTitle>
                  <EditIcon onClick={() => openEditModal('certifications')}>✏️</EditIcon>
                </SectionHeader>
                {profile.certifications && profile.certifications.length > 0 ? (
                  profile.certifications.map((cert, index) => (
                    <ExperienceItem key={index}>
                      <ExperienceTitle>{cert.name}</ExperienceTitle>
                      <ExperiencePeriod>{cert.issue_date}</ExperiencePeriod>
                      <ExperienceDescription>{cert.agency}</ExperienceDescription>
                    </ExperienceItem>
                  ))
                ) : (
                  <NoContentMessage>자격증 정보가 없습니다.</NoContentMessage>
                )}
              </Section>
            </RightColumn>
          </>
        ) : (
          <MyStoryCardView
            profile={profile}
            onAddStory={onAddStory}
            onUpdateStory={onUpdateStory}
            onDeleteStory={onDeleteStory}
          />
        )}
      </ContentGrid>

      {editingSection === 'brief' && (
        <EditBriefModal
          profile={profile}
          onSave={(updatedBrief) => onSave({ brief: updatedBrief })}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'workExperience' && (
        <EditWorkExperienceModal
          profile={profile}
          onSave={(updatedWorkExperiences) => onSave({ work_experience: updatedWorkExperiences })}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'projectExperience' && (
        <EditProjectExperienceModal
          profile={profile}
          onSave={(updatedProjectExperiences) => onSave({ experiences: updatedProjectExperiences })}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'skills' && (
        <EditSkillsModal
          profile={profile}
          onSave={(updatedSkills) => onSave({ competencies: updatedSkills })}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'education' && (
        <EditEducationModal
          profile={profile}
          onSave={(updatedEducation) => onSave({ educations: updatedEducation })}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'certifications' && (
        <EditCertificationsModal
          profile={profile}
          onSave={(updatedCertifications) => onSave({ certifications: updatedCertifications })}
          onClose={closeEditModal}
        />
      )}
    </ViewContainer>
  );
}

