'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MyStory } from '@/types/profile';
import { getProfile, updateMyStoryTag } from '@/lib/api/profile';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';

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
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TagDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: bold;
  border-bottom-right-radius: 8px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: ${({ theme }) => theme.spacing.large}; // to make space for the tag
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const tagOptions = [
  { value: '자기소개', label: '자기소개' },
  { value: '일화', label: '일화' },
  { value: '기타', label: '기타' },
];

export default function MyStoryCardView() {
  const [stories, setStories] = useState<MyStory[]>([]);
  const [selectedCard, setSelectedCard] = useState<MyStory | null>(null);
  // Editing states for modal can be added here if needed

  useEffect(() => {
    const fetchStories = async () => {
      const profile = await getProfile();
      if (profile && profile.myStories) {
        setStories(profile.myStories);
      }
    };
    fetchStories();
  }, []);

  const handleTagChange = async (storyId: string, newTag: '자기소개' | '일화' | '기타') => {
    try {
      await updateMyStoryTag(storyId, newTag);
      setStories(prevStories =>
        prevStories.map(story =>
          story.id === storyId ? { ...story, tag: newTag } : story
        )
      );
    } catch (error) {
      console.error('Failed to update tag', error);
      alert('태그 업데이트에 실패했습니다.');
    }
  };

  const handleCardClick = (card: MyStory) => {
    setSelectedCard(card);
    // Logic to handle editing title and content can be added here
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <>
      <CardGrid>
        {stories.map(story => (
          <Card key={story.id} onClick={() => handleCardClick(story)}>
            <TagDisplay>{story.tag}</TagDisplay>
            <CardTitle>{story.title}</CardTitle>
          </Card>
        ))}
      </CardGrid>

      {selectedCard && (
        <Modal onClose={handleCloseModal} title="본인 소개 카드 수정">
          <ModalContentWrapper>
            <Input
              label="제목"
              value={selectedCard.title}
              // onChange handler for title
            />
            <Input
              label="내용"
              value={selectedCard.content}
              // onChange handler for content
              textarea
              rows={10}
            />
            <Dropdown
              label="태그 선택"
              options={tagOptions}
              value={selectedCard.tag}
              onChange={(e) => handleTagChange(selectedCard.id, e.target.value as any)}
            />
            <ButtonContainer>
              <Button onClick={handleCloseModal} variant="secondary">
                취소
              </Button>
              <Button onClick={handleCloseModal}> {/* Replace with actual save logic */}
                저장
              </Button>
            </ButtonContainer>
          </ModalContentWrapper>
        </Modal>
      )}
    </>
  );
}
