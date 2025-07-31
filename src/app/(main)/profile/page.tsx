'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import { getProfile, updateProfile } from '@/lib/api/profile';
import { Profile } from '@/types/profile';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileView from '@/components/domain/profile/ProfileView';
import ProfileSetupModal from '@/components/domain/profile/ProfileSetupModal';
import Button from '@/components/common/Button';

const ProfilePageContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Loading = styled.p`
  text-align: center;
  padding: 50px;
`;

const EmptyProfileContainer = styled.div`
  text-align: center;
  padding: 80px 24px;
`;

function ProfilePageContent() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { openProfileSetupModal } = useAuthStore();

  const fetchProfile = async () => {
    setIsLoading(true);
    const data = await getProfile();
    setProfile(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (data: Profile) => {
    await updateProfile(data);
    await fetchProfile(); // Re-fetch to show updated data
  };

  if (isLoading) {
    return <Loading>프로필 정보를 불러오는 중...</Loading>;
  }

  return (
    <ProfilePageContainer>
      <ProfileSetupModal profile={profile} onSave={handleSaveProfile} />

      {profile ? (
        <ProfileView profile={profile} />
      ) : (
        <EmptyProfileContainer>
          <h2>프로필이 아직 없어요!</h2>
          <p>AI 추천과 자소서 생성을 위해 프로필을 만들어보세요.</p>
          <Button onClick={openProfileSetupModal} style={{ marginTop: '24px' }}>
            프로필 생성하기
          </Button>
        </EmptyProfileContainer>
      )}
    </ProfilePageContainer>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfilePageContent />
    </AuthGuard>
  );
}
