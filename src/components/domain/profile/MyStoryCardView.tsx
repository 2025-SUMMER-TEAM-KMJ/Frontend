'use client';

import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import Modal from '@/components/common/Modal';
import { Profile, QnA } from '@/types';
import { schemas_user_QnACreate, schemas_user_QnAUpdate } from '@/types/api';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

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

const AddCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: bold;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const AddIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.small};
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

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
`;

const StyledBorderlessTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main};
  resize: none;
  flex-grow: 1;
  background-color: transparent;
  &:focus {
    outline: none;
  }
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

const NoDataMessage = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.medium} 0;
`;

const tagOptions = [
  { value: '자기소개', label: '자기소개' },
  { value: '일화', label: '일화' },
  { value: '기타', label: '기타' },
];

interface MyStoryCardViewProps {
  profile: Profile;
  onAddStory: (story: schemas_user_QnACreate) => void;
  onUpdateStory: (storyId: string, story: schemas_user_QnAUpdate) => void;
  onDeleteStory: (storyId: string) => void;
}

export default function MyStoryCardView({ profile, onAddStory, onUpdateStory, onDeleteStory }: MyStoryCardViewProps) {
  const [selectedCard, setSelectedCard] = useState<QnA | null>(null);
  const [isAddingNewStory, setIsAddingNewStory] = useState(false);

  const handleTagChange = (newTag: string) => {
    setSelectedCard(prev => prev ? { ...prev, category: newTag } : null);
  };

  const handleCardClick = (card: QnA) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setIsAddingNewStory(false);
  };

  const handleSave = async () => {
    if (!selectedCard) return;

    try {
      const updatedQnAData = {
        title: selectedCard.title,
        content: selectedCard.content,
        category: selectedCard.category,
      };
      await onUpdateStory(selectedCard.id, updatedQnAData);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save story', error);
      alert('스토리 저장에 실패했습니다.');
    }
  };

  const handleAddNewStory = () => {
    setIsAddingNewStory(true);
    setSelectedCard({
      id: '', // Temporary ID, will be replaced by backend
      title: '새로운 이야기',
      content: '',
      category: '자기소개',
      created_at: '',
      updated_at: '',
    });
  };

  const handleCreateStory = async () => {
    if (!selectedCard) return;

    try {
      const newStoryData = {
        title: selectedCard.title,
        content: selectedCard.content,
        category: selectedCard.category,
      };
      await onAddStory(newStoryData);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to create story', error);
      alert('새로운 이야기 생성에 실패했습니다.');
    }
  };

  const handleDeleteStory = async () => {
    if (!selectedCard) return;

    if (!confirm('정말로 이 이야기를 삭제하시겠습니까?')) return;

    try {
      await onDeleteStory(selectedCard.id);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete story', error);
      alert('스토리 삭제에 실패했습니다.');
    }
  };

  return (
    <>
      <CardGrid>
        {profile.qnas.map((story, index) => (
          <Card key={index} onClick={() => handleCardClick(story)}>
            <TagDisplay>{story.category}</TagDisplay>
            <CardTitle>{story.title}</CardTitle>
          </Card>
        ))}
        <AddCard onClick={handleAddNewStory}>
          <AddIcon><FaPlus /></AddIcon>
          새로운 이야기 추가
        </AddCard>
      </CardGrid>

      {(selectedCard && !isAddingNewStory) && (
        <Modal onClose={handleCloseModal} title="나의 이야기 수정">
          <ModalContentWrapper>
            <div>
              <Label>제목</Label>
              <StyledBorderlessTextarea
                value={selectedCard.title}
                rows={2}
                onChange={(e) => setSelectedCard(prev => prev ? { ...prev, title: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>내용</Label>
              <StyledBorderlessTextarea
                value={selectedCard.content || ''}
                rows={10}
                onChange={(e) => setSelectedCard(prev => prev ? { ...prev, content: e.target.value } : null)}
              />
            </div>
            <Dropdown
              label="태그 선택"
              options={tagOptions}
              value={selectedCard.category || ''}
              onChange={(e) => handleTagChange(e.target.value)}
            />
            <ButtonContainer>
              <Button onClick={handleSave}>
                저장
              </Button>
              <Button onClick={handleDeleteStory}>
                삭제
              </Button>
            </ButtonContainer>
          </ModalContentWrapper>
        </Modal>
      )}

      {isAddingNewStory && selectedCard && (
        <Modal onClose={handleCloseModal} title="새로운 이야기 추가">
          <ModalContentWrapper>
            <div>
              <Label>제목</Label>
              <StyledBorderlessTextarea
                value={selectedCard.title}
                rows={2}
                onChange={(e) => setSelectedCard(prev => prev ? { ...prev, title: e.target.value } : null)}
              />
            </div>
            <div>
              <Label>내용</Label>
              <StyledBorderlessTextarea
                value={selectedCard.content || ''}
                rows={10}
                onChange={(e) => setSelectedCard(prev => prev ? { ...prev, content: e.target.value } : null)}
              />
            </div>
            <Dropdown
              label="태그 선택"
              options={tagOptions}
              value={selectedCard.category || ''}
              onChange={(e) => handleTagChange(e.target.value)}
            />
            <ButtonContainer>
              <Button onClick={handleCreateStory}>
                추가
              </Button>
            </ButtonContainer>
          </ModalContentWrapper>
        </Modal>
      )}
    </>
  );
}
