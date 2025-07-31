'use client';

import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import { Profile } from '@/types/profile';
import Button from '@/components/common/Button';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xlarge};
`;

const Section = styled.section`
  /* Basic section styling */
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding-bottom: ${({ theme }) => theme.spacing.small};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
`;

interface Props {
  profile: Profile;
}

export default function ProfileView({ profile }: Props) {
  const { openProfileSetupModal } = useAuthStore();

  return (
    <ViewContainer>
      <Header>
        <Title>내 프로필</Title>
        <Button onClick={openProfileSetupModal}>프로필 수정</Button>
      </Header>

      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <p><strong>이름:</strong> {profile.basicInfo.name}</p>
        <p><strong>이메일:</strong> {profile.basicInfo.email}</p>
        <p><strong>연락처:</strong> {profile.basicInfo.phone}</p>
        <p><strong>한 줄 소개:</strong> {profile.basicInfo.brief}</p>
      </Section>

      {/* Other sections like Skills, Experience would go here */}
    </ViewContainer>
  );
}
