'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QnA } from '@/types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;
  height: 80vh;
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
`;

const LeftModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding-right: ${({ theme }) => theme.spacing.large};
`;

const RightModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  padding-left: ${({ theme }) => theme.spacing.large};
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

const ChatHistory = styled.div`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.medium};
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const ChatMessage = styled.div<{ $isUser: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  text-align: ${({ $isUser }) => ($isUser ? 'right' : 'left')};

  span {
    display: inline-block;
    background-color: ${({ $isUser, theme }) => ($isUser ? theme.colors.primary : theme.colors.white)};
    color: ${({ $isUser }) => ($isUser ? 'white' : 'black')};
    padding: 8px 12px;
    border-radius: 12px;
    max-width: 80%;
  }
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.small};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ChatInput = styled(Input)`
  flex-grow: 1;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const AiSuggestionContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
`;

const OriginalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: 8px;
`;

const OriginalQuestion = styled.p`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const OriginalAnswer = styled.p`
  white-space: pre-wrap;
`;

interface Props {
  qna: QnA;
  resumeId: string;
  onSave: (qnaId: string, newQuestion: string, newAnswer: string) => void;
  onClose: () => void;
}

export default function EditQnADualModal({ qna, resumeId, onSave, onClose }: Props) {
  const [editedQuestion, setEditedQuestion] = useState(qna.question);
  const [editedAnswer, setEditedAnswer] = useState(qna.answer);
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai'; message: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setChatInput('');

    // Mock AI response
    setTimeout(() => {
      const aiResponse = `AI: "${userMessage}"에 대한 답변을 개선해 드릴까요? 예를 들어, "${userMessage}"에 대한 구체적인 경험을 바탕으로 답변을 작성해보세요.`;
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
      setAiSuggestion(`AI가 제안하는 답변: 

${userMessage}에 대한 AI 생성 답변입니다. 이 내용을 참고하여 답변을 수정해보세요.`);
    }, 1000);
  };

  const handleApplySuggestion = () => {
    if (aiSuggestion) {
      setEditedAnswer(aiSuggestion);
      setAiSuggestion(null);
    }
  };

  const handleSave = () => {
    onSave(qna.id, editedQuestion, editedAnswer);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* Left Modal Content: Q&A Editor + Chatbot */}
        <LeftModalContent>
          <SectionTitle>Q&A 수정</SectionTitle>
          <Input
            label="질문"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
          />
          <StyledTextArea
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            placeholder="답변을 입력하세요."
          />
          <Button onClick={handleSave}>저장</Button>

          <SectionTitle>AI 챗봇</SectionTitle>
          <ChatContainer>
            <ChatHistory>
              {chatHistory.map((msg, index) => (
                <ChatMessage key={index} $isUser={msg.type === 'user'}>
                  <span>{msg.message}</span>
                </ChatMessage>
              ))}
            </ChatHistory>
            <ChatInputContainer>
              <ChatInput
                placeholder="AI에게 질문하거나 답변 개선을 요청하세요."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
              />
              <Button onClick={handleChatSubmit}>전송</Button>
            </ChatInputContainer>
          </ChatContainer>
          {aiSuggestion && (
            <AiSuggestionContainer>
              <p>{aiSuggestion}</p>
              <Button onClick={handleApplySuggestion}>AI 제안 적용</Button>
            </AiSuggestionContainer>
          )}
        </LeftModalContent>

        {/* Right Modal Content: Original Q&A Preview */}
        <RightModalContent>
          <SectionTitle>원본 Q&A</SectionTitle>
          <OriginalContent>
            <OriginalQuestion>질문: {qna.question}</OriginalQuestion>
            <OriginalAnswer>답변: {qna.answer}</OriginalAnswer>
          </OriginalContent>
        </RightModalContent>
      </ModalContent>
    </ModalBackdrop>
  );
}