'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { getProfile, updateProfile, addProfileQnA, updateProfileQnA, deleteProfileQnA } from '@/lib/api/profile';

import { Profile } from '@/types';
import { UserUpdateRequest, schemas_user_QnACreate, schemas_user_QnAUpdate } from '@/types/api';
import AuthGuard from '@/components/auth/AuthGuard';
import ProfileView from '@/components/domain/profile/ProfileView';

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
  const { showProfileSetupModal, closeProfileSetupModal, showBasicInfoModal, closeBasicInfoModal, editingSection, closeEditModal } = useAuthStore();
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

  const handleUpdateProfile = async (data: Partial<UserUpdateRequest>) => {
    if (!profile) return;

    await updateProfile(data);
    await fetchProfile(); // Re-fetch to show updated data
    closeEditModal(); // Close generic modal
    closeBasicInfoModal(); // Close basic info modal if open
  };

  const handleAddStory = async (story: schemas_user_QnACreate) => {
    await addProfileQnA(story);
    await fetchProfile();
  };

  const handleUpdateStory = async (storyId: string, story: schemas_user_QnAUpdate) => {
    await updateProfileQnA(storyId, story);
    await fetchProfile();
  };

  const handleDeleteStory = async (storyId: string) => {
    await deleteProfileQnA(storyId);
    await fetchProfile();
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
      {profile && (
        <ProfileView
          profile={profile}
          onSave={handleUpdateProfile}
          onAddStory={handleAddStory}
          onUpdateStory={handleUpdateStory}
          onDeleteStory={handleDeleteStory}
        />
      )}
      
      {showBasicInfoModal && profile && (
        <EditBasicInfoModal
          profile={profile}
          onSave={handleUpdateProfile}
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