'use client';

import { useAuthStore } from '@/store/authStore';
import { Profile } from '@/types/profile';
import EditBriefModal from './modals/EditBriefModal';
import EditWorkExperienceModal from './modals/EditWorkExperienceModal';
import EditProjectExperienceModal from './modals/EditProjectExperienceModal';
import EditSkillsModal from './modals/EditSkillsModal';
import EditEducationModal from './modals/EditEducationModal';
import EditCertificationsModal from './modals/EditCertificationsModal';
import Image from 'next/image';
import styled from 'styled-components';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xlarge};
  background-color: white;
  padding: ${({ theme }) => theme.spacing.xlarge};
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
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
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xlarge};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
  padding-bottom: ${({ theme }) => theme.spacing.large};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
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

const EditIcon = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
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
}

export default function ProfileView({ profile }: Props) {
  const { openProfileSetupModal, openEditModal, closeEditModal, editingSection } = useAuthStore();

  return (
    <ViewContainer>
      <ProfileHeader>
        <ProfileImage>
          {/* 임시 이미지 또는 사용자 아바타 */}
          <Image src="/images/profile_placeholder.png" alt="프로필 이미지" width={120} height={120} />
        </ProfileImage>
        <ProfileInfo>
          <ProfileName>{profile.name}</ProfileName>
          <ProfileDetail>프론트엔드 개발자 | {profile.workExperience[0]?.position || '경력 정보 없음'}</ProfileDetail>
          <ProfileDetail>{profile.email}</ProfileDetail>
          <ProfileDetail>{profile.phone}</ProfileDetail>
        </ProfileInfo>
      </ProfileHeader>

      <ContentGrid>
        <LeftColumn>
          <Section>
            <SectionHeader>
              <SectionTitle>자기소개</SectionTitle>
              <EditIcon onClick={() => openEditModal('brief')}>✏️</EditIcon>
            </SectionHeader>
            <ContentText>{profile.brief}</ContentText>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>경력</SectionTitle>
              <EditIcon onClick={() => openEditModal('workExperience')}>✏️</EditIcon>
            </SectionHeader>
            {profile.workExperience.map(exp => (
              <ExperienceItem key={exp.id}>
                <ExperienceTitle>{exp.company} - {exp.position}</ExperienceTitle>
                <ExperiencePeriod>{exp.startDate} ~ {exp.endDate}</ExperiencePeriod>
                <ExperienceDescription>{exp.description}</ExperienceDescription>
              </ExperienceItem>
            ))}
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>프로젝트</SectionTitle>
              <EditIcon onClick={() => openEditModal('projectExperience')}>✏️</EditIcon>
            </SectionHeader>
            {profile.projectExperience.map(proj => (
              <ExperienceItem key={proj.id}>
                <ExperienceTitle>{proj.title}</ExperienceTitle>
                <ExperiencePeriod>{proj.startDate} ~ {proj.endDate}</ExperiencePeriod>
                <ExperienceDescription>{proj.description}</ExperienceDescription>
              </ExperienceItem>
            ))}
          </Section>
        </LeftColumn>

        <RightColumn>
          <Section>
            <SectionHeader>
              <SectionTitle>기술 스택</SectionTitle>
              <EditIcon onClick={() => openEditModal('skills')}>✏️</EditIcon>
            </SectionHeader>
            <SkillList>
              {profile.skills.map(skill => (
                <SkillItem key={skill.id}>{skill.name}</SkillItem>
              ))}
            </SkillList>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>학력</SectionTitle>
              <EditIcon onClick={() => openEditModal('education')}>✏️</EditIcon>
            </SectionHeader>
            {profile.education.map(edu => (
              <ExperienceItem key={edu.id}>
                <ExperienceTitle>{edu.institution} - {edu.major}</ExperienceTitle>
                <ExperiencePeriod>{edu.startDate} ~ {edu.endDate}</ExperiencePeriod>
                <ExperienceDescription>{edu.description}</ExperienceDescription>
              </ExperienceItem>
            ))}
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>자격증</SectionTitle>
              <EditIcon onClick={() => openEditModal('certifications')}>✏️</EditIcon>
            </SectionHeader>
            {profile.certifications.map(cert => (
              <ExperienceItem key={cert.id}>
                <ExperienceTitle>{cert.name}</ExperienceTitle>
                <ExperiencePeriod>{cert.issueDate}</ExperiencePeriod>
                <ExperienceDescription>{cert.issuer}</ExperienceDescription>
              </ExperienceItem>
            ))}
          </Section>
        </RightColumn>
      </ContentGrid>

      {editingSection === 'brief' && (
        <EditBriefModal
          profile={profile}
          onSave={(updatedBrief) => {
            // TODO: Save updated brief to backend
            console.log('Updated brief:', updatedBrief);
            closeEditModal();
          }}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'workExperience' && (
        <EditWorkExperienceModal
          profile={profile}
          onSave={(updatedWorkExperiences) => {
            // TODO: Save updated work experiences to backend
            console.log('Updated work experiences:', updatedWorkExperiences);
            closeEditModal();
          }}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'projectExperience' && (
        <EditProjectExperienceModal
          profile={profile}
          onSave={(updatedProjectExperiences) => {
            // TODO: Save updated project experiences to backend
            console.log('Updated project experiences:', updatedProjectExperiences);
            closeEditModal();
          }}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'skills' && (
        <EditSkillsModal
          profile={profile}
          onSave={(updatedSkills) => {
            // TODO: Save updated skills to backend
            console.log('Updated skills:', updatedSkills);
            closeEditModal();
          }}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'education' && (
        <EditEducationModal
          profile={profile}
          onSave={(updatedEducation) => {
            // TODO: Save updated education to backend
            console.log('Updated education:', updatedEducation);
            closeEditModal();
          }}
          onClose={closeEditModal}
        />
      )}

      {editingSection === 'certifications' && (
        <EditCertificationsModal
          profile={profile}
          onSave={(updatedCertifications) => {
            // TODO: Save updated certifications to backend
            console.log('Updated certifications:', updatedCertifications);
            closeEditModal();
          }}
          onClose={closeEditModal}
        />
      )}
    </ViewContainer>
  );
}
