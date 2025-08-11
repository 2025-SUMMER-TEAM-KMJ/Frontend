'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { getProfile, updateProfile } from '@/lib/api/profile';
import { createProfileBasedResume } from '@/lib/api/resumes';
import { Profile, ResumeFormData, Resume } from '@/types';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileView from '@/components/domain/profile/ProfileView';
import ProfileSetupModal from '@/components/domain/profile/ProfileSetupModal';
import EditBasicInfoModal from '@/components/domain/profile/modals/EditBasicInfoModal';
import Button from '@/components/common/Button';

const ProfilePageContainer = styled(motion.div)`
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
  const { showProfileSetupModal, closeProfileSetupModal, showBasicInfoModal, closeBasicInfoModal } = useAuthStore();
  const router = useRouter();

  const fetchProfile = async () => {
    setIsLoading(true);
    const data = await getProfile();
    setProfile(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async (data: ResumeFormData): Promise<Resume> => {
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
    const newResume = await createProfileBasedResume(); // 프로필 기반 자소서 생성
    await fetchProfile(); // Re-fetch to show updated data
    closeProfileSetupModal(); // Close modal after saving
    router.push(`/resumes/profile-based/${newResume.id}`); // 리다이렉트
    return newResume;
  };

  const handleSaveBasicInfo = async (data: { name: string; age: number; gender: string; email: string; phone: string; preferredJobGroup?: string; preferredJob?: string; }) => {
    if (!profile) return;

    const newPreferredPosition = [];
    if (data.preferredJobGroup || data.preferredJob) {
      newPreferredPosition.push({
        id: profile.preferredPosition?.[0]?.id || `pref-${Date.now()}`,
        industry: data.preferredJobGroup || '',
        title: data.preferredJob || '',
      });
    }

    const newProfile: Profile = {
      ...profile,
      name: data.name,
      age: data.age,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      preferredPosition: newPreferredPosition,
    };
    await updateProfile(newProfile);
    await fetchProfile(); // Re-fetch to show updated data
    closeBasicInfoModal(); // Close modal after saving
  };

  if (isLoading) {
    return <Loading>프로필 정보를 불러오는 중...</Loading>;
  }

  return (
    <ProfilePageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      {profile && <ProfileView profile={profile} />}
      {showProfileSetupModal && profile && (
        <ProfileSetupModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={closeProfileSetupModal}
        />
      )}
      {showBasicInfoModal && profile && (
        <EditBasicInfoModal
          profile={profile}
          onSave={handleSaveBasicInfo}
          onClose={closeBasicInfoModal}
        />
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