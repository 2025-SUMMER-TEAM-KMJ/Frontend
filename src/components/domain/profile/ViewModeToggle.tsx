'use client';

import { useAuthStore } from '@/store/authStore';
import styled from 'styled-components';

type ProfileViewMode = 'resume' | 'cards';

const ToggleContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  overflow: hidden;
  width: fit-content;
`;

const ToggleButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${({ $isActive, theme }) => $isActive ? theme.colors.primary : 'transparent'};
  color: ${({ $isActive, theme }) => $isActive ? 'white' : theme.colors.primary};
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export default function ViewModeToggle() {
  const { profileViewMode, setProfileViewMode } = useAuthStore();

  return (
    <ToggleContainer>
      <ToggleButton 
        $isActive={profileViewMode === 'resume'} 
        onClick={() => setProfileViewMode('resume')}
      >
        이력서
      </ToggleButton>
      <ToggleButton 
        $isActive={profileViewMode === 'cards'} 
        onClick={() => setProfileViewMode('cards')}
      >
        나의 이야기
      </ToggleButton>
    </ToggleContainer>
  );
}
