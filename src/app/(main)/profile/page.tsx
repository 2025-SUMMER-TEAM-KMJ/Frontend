'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import { getProfile, updateProfile } from '@/lib/api/profile';
import { Profile, ResumeFormData } from '@/types';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileView from '@/components/domain/profile/ProfileView';

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

  const handleSaveProfile = async (data: ResumeFormData) => {
    const newProfile: Profile = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      brief: data.personalNarratives?.motivation || '',
      skills: data.competencies?.map(c => ({ id: c.id, name: c.name })) || [],
      education: data.education || [],
      workExperience: data.workExperience || [],
      projectExperience: data.experience || [],
      certifications: data.certifications || [],
    };
    await updateProfile(newProfile);
    await fetchProfile(); // Re-fetch to show updated data
  };

  if (isLoading) {
    return <Loading>프로필 정보를 불러오는 중...</Loading>;
  }

  return (
    <ProfilePageContainer>
      {profile && <ProfileView profile={profile} />}
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
