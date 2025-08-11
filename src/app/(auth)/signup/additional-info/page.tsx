'use client';

import Button from '@/components/common/Button';
import { addMyStory } from '@/lib/api/profile';
import { MyStory } from '@/types/profile';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 40px 24px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 650px;
  text-align: center;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.xlarge};
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.large};
  text-align: left;
`;

const QuestionLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.xlarge};
`;

const questionsData: { id: string; question: string; tag: MyStory['tag']; }[] = [
  { id: 'q1', question: '귀하의 장점과 단점 3개를 자유롭게 문장 형식으로 작성해주세요 :)', tag: '자기소개' },
  { id: 'q2', question: '귀하께서 갖고 계신 인생관, 혹은 평소에 생각하고 계신 것이 있나요?', tag: '자기소개' },
  { id: 'q3', question: '가장 중요한 질문입니다. 귀하의 문제해결능력이 드러나는 사례를 자유롭게 서술해주십시오.', tag: '일화' },
];

export default function AdditionalInfoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const router = useRouter();

  const currentQuestion = questionsData[currentStep];

  const handleNext = async () => {
    if (!answer.trim()) {
      alert('답변을 입력해주세요.');
      return;
    }

    try {
      const newStory: MyStory = {
        id: `story-${Date.now()}-${currentStep}`,
        title: currentQuestion.question,
        content: answer,
        tag: currentQuestion.tag,
      };
      await addMyStory(newStory);

      if (currentStep < questionsData.length - 1) {
        setCurrentStep(prev => prev + 1);
        setAnswer(''); // 다음 질문을 위해 답변 초기화
      } else {
        // 마지막 질문까지 완료
        alert('모든 답변이 성공적으로 제출되었습니다!');
        router.push('/profile');
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : '답변 제출에 실패했습니다.');
    }
  };

  const handleSkip = () => {
    router.push('/');
  };

  return (
    <Container>
      <ContentWrapper>
        <Title>🎉 회원가입이 완료되었습니다! 🎉</Title>
        <Subtitle>프로필을 더욱 풍성하게 만들기 위해 몇 가지 질문에 답변해주세요.</Subtitle>
        <Form>
          <div>
            <QuestionLabel>{currentQuestion.question}</QuestionLabel>
            <StyledTextarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </div>
        </Form>
        <ButtonContainer>
          <Button onClick={handleSkip} variant="secondary">건너뛰기</Button>
          {currentStep < questionsData.length - 1 ? (
            <Button onClick={handleNext}>다음</Button>
          ) : (
            <Button onClick={handleNext}>제출하기</Button>
          )}
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  );
}
