'use client';

import Header from '@/components/domain/shared/Header';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useAuthStore } from '@/store/authStore';
import ProfileSetupModal from '@/components/domain/profile/ProfileSetupModal';
import { updateProfile } from '@/lib/api/profile';
import { UserUpdateRequest } from '@/types/api';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MotionContentWrapper = styled(motion.div)`
  flex: 1;
  padding-top: 60px; /* Header height */
`;

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoggedIn, user, showProfileSetupModal, closeProfileSetupModal } = useAuthStore();

  const handleSaveProfile = async (data: UserUpdateRequest) => {
    if (!user) return;
    await updateProfile(data);
    closeProfileSetupModal();
  };

  return (
    <MainContainer>
      <Header />
      <MotionContentWrapper
        key={pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        {children}
      </MotionContentWrapper>
      {isLoggedIn && showProfileSetupModal && user && (
        <ProfileSetupModal
          profile={user}
          onSave={handleSaveProfile}
          onClose={closeProfileSetupModal}
        />
      )}
    </MainContainer>
  );
}