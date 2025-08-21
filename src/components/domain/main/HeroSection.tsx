'use client';

import styled from 'styled-components';

const HeroWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Subtitle = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
`;

export default function HeroSection() {
  return (
    <HeroWrapper>
      <Title>Chee-Up! 당신의 여정을 함께합니다.</Title>
      <Subtitle>AI 기반 맞춤형 자소서 생성 및 채용 정보 추천 서비스</Subtitle>
    </HeroWrapper>
  );
}
