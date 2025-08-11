'use client';

import Modal from '@/components/common/Modal';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.large};
`;

const FixedFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  align-items: center;
`;

const PromptInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 16px;
`;

const UsedPromptContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const PromptTag = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 8px 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
`;

const RemovePromptButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
  padding: 0;
  line-height: 1;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  border: none;

  &.primary {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &.secondary {
    background-color: ${({ theme }) => theme.colors.lightGray};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default function EditBriefModal({ profile, onSave, onClose }: Props) {
  const [brief, setBrief] = useState(profile.brief);
  const [prompt, setPrompt] = useState('');
  const [usedPrompts, setUsedPrompts] = useState<string[]>([]);

  useEffect(() => {
    setBrief(profile.brief);
  }, [profile.brief]);

  const handleAddPrompt = () => {
    if (!prompt || usedPrompts.includes(prompt)) return;
    setUsedPrompts(prevPrompts => [...prevPrompts, prompt]);
    setPrompt('');
  };

  const handleGenerate = () => {
    if (usedPrompts.length === 0) return;
    
    const promptsText = usedPrompts.join(', ');
    const generatedText = `

[${promptsText}에 대한 AI 생성 내용]
- AI가 생성한 자기소개 문단입니다.
- 사용자는 이 내용을 자유롭게 편집하고 추가할 수 있습니다.`;
    
    setBrief(prevBrief => prevBrief + generatedText);
    setUsedPrompts([]); // 생성 후 프롬프트 목록 초기화
  };

  const handleRemoveUsedPrompt = (promptToRemove: string) => {
    setUsedPrompts(prevPrompts => prevPrompts.filter(p => p !== promptToRemove));
  };

  const handleSave = () => {
    onSave(brief);
  };

  return (
    <Modal onClose={onClose} title="자기소개 수정">
      <ScrollableContent>
        <TextArea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="자기소개를 입력하거나, AI에게 생성을 요청해보세요."
        />
        {usedPrompts.length > 0 && (
          <UsedPromptContainer>
            {usedPrompts.map((p, index) => (
              <PromptTag key={index}>
                <span>{p}</span>
                <RemovePromptButton onClick={() => handleRemoveUsedPrompt(p)}>×</RemovePromptButton>
              </PromptTag>
            ))}
          </UsedPromptContainer>
        )}
      </ScrollableContent>
      <FixedFooter>
        <PromptInput
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="추가할 프롬프트를 입력하세요 (예: 성실함을 강조)"
          onKeyDown={(e) => e.key === 'Enter' && handleAddPrompt()}
        />
        <Button className="secondary" onClick={handleAddPrompt}>추가</Button>
        <Button className="secondary" onClick={handleGenerate}>생성</Button>
        <Button className="primary" onClick={handleSave}>저장</Button>
      </FixedFooter>
    </Modal>
  );
}
