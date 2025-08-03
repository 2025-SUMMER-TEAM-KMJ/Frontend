'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const LastModified = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: right;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

interface StoryCard {
  id: string;
  question: string;
  answer: string;
  lastModified: string; // New: Last modification date
}

const initialCards: StoryCard[] = [
  {
    id: '1',
    question: '나를 한 단어로 표현한다면?',
    answer: '저는 "성장"이라는 단어로 저를 표현하고 싶습니다. 끊임없이 배우고 발전하며 새로운 도전을 두려워하지 않는 저의 모습을 가장 잘 나타내는 단어라고 생각합니다. 개발자로서 기술적인 성장은 물론, 팀원들과의 협업을 통해 시너지를 내는 과정에서도 항상 배우고 발전하려 노력합니다.',
    lastModified: '2023-01-15',
  },
  {
    id: '2',
    question: '가장 기억에 남는 프로젝트는?',
    answer: '가장 기억에 남는 프로젝트는 "온라인 교육 플랫폼 개발" 프로젝트입니다. 이 프로젝트에서 저는 프론트엔드 개발을 담당하며 사용자 경험 개선에 집중했습니다. 특히, 실시간 강의 스트리밍 기능과 인터랙티브 퀴즈 시스템을 구현하면서 기술적인 난관에 부딪히기도 했지만, 팀원들과 머리를 맞대고 해결해나가면서 큰 성취감을 느꼈습니다. 이 프로젝트를 통해 사용자 중심의 개발과 문제 해결 능력을 크게 향상시킬 수 있었습니다.',
    lastModified: '2023-03-20',
  },
  {
    id: '3',
    question: '협업에서 가장 중요하다고 생각하는 것은?',
    answer: '협업에서 가장 중요하다고 생각하는 것은 "명확한 소통"과 "상호 존중"입니다. 팀원 각자의 역할과 책임을 명확히 하고, 솔직하고 개방적인 소통을 통해 오해를 줄이고 효율적인 의사결정을 내리는 것이 중요하다고 생각합니다. 또한, 서로의 의견을 경청하고 존중하는 태도는 긍정적인 팀 분위기를 조성하고 시너지를 창출하는 데 필수적입니다.',
    lastModified: '2023-05-10',
  },
  {
    id: '4',
    question: '스트레스를 해소하는 나만의 방법은?',
    answer: '스트레스를 해소하는 저만의 방법은 "운동"과 "독서"입니다. 규칙적인 운동은 신체적인 건강뿐만 아니라 정신적인 스트레스 해소에도 큰 도움이 됩니다. 특히, 조깅이나 등산을 통해 자연 속에서 시간을 보내는 것을 좋아합니다. 또한, 다양한 분야의 책을 읽으면서 새로운 지식을 얻고, 복잡한 생각에서 벗어나 몰입하는 시간을 가지면서 스트레스를 해소합니다.',
    lastModified: '2023-07-01',
  },
  {
    id: '5',
    question: '미래에 어떤 개발자가 되고 싶은가요?',
    answer: '미래에는 "사용자에게 가치를 제공하는 개발자"가 되고 싶습니다. 단순히 코드를 작성하는 것을 넘어, 사용자의 불편함을 해결하고 삶을 더 편리하게 만드는 서비스와 제품을 만드는 데 기여하고 싶습니다. 이를 위해 끊임없이 새로운 기술을 학습하고, 다양한 분야의 지식을 습득하여 폭넓은 시야를 가진 개발자로 성장해나갈 것입니다.',
    lastModified: '2023-09-25',
  },
];

export default function MyStoryCardView() {
  const [cards, setCards] = useState<StoryCard[]>(initialCards);
  const [selectedCard, setSelectedCard] = useState<StoryCard | null>(null);
  const [editingQuestion, setEditingQuestion] = useState('');
  const [editingAnswer, setEditingAnswer] = useState('');

  const handleCardClick = (card: StoryCard) => {
    setSelectedCard(card);
    setEditingQuestion(card.question);
    setEditingAnswer(card.answer);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleSave = () => {
    if (selectedCard) {
      const updatedCards = cards.map((card) =>
        card.id === selectedCard.id
          ? { ...card, question: editingQuestion, answer: editingAnswer, lastModified: new Date().toISOString().slice(0, 10) }
          : card
      );
      setCards(updatedCards);
      setSelectedCard(null);
    }
  };

  return (
    <>
      <CardGrid>
        {cards.map(card => (
          <Card key={card.id} onClick={() => handleCardClick(card)}>
            <CardTitle>{card.question}</CardTitle>
          </Card>
        ))}
      </CardGrid>

      {selectedCard && (
        <Modal onClose={handleCloseModal} title="본인 소개 카드 수정">
          <ModalContentWrapper>
            <Input
              label="질문"
              value={editingQuestion}
              onChange={(e) => setEditingQuestion(e.target.value)}
            />
            <Input
              label="답변"
              value={editingAnswer}
              onChange={(e) => setEditingAnswer(e.target.value)}
              textarea
              rows={10}
            />
            <LastModified>최종 수정일: {selectedCard.lastModified}</LastModified>
            <ButtonContainer>
              <Button onClick={handleCloseModal} variant="secondary">
                취소
              </Button>
              <Button onClick={handleSave}>
                저장
              </Button>
            </ButtonContainer>
          </ModalContentWrapper>
        </Modal>
      )}
    </>
  );
}
