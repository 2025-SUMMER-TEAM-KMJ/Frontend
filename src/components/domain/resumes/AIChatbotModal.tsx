'use client';

import { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal'; // Assuming common Modal component

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  height: 400px; // Fixed height for chat history
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatbotModal({ isOpen, onClose }: Props) {
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
    // This function would typically apply the suggestion to the QnAEditModal's answer field.
    // For now, it just clears the suggestion.
    setAiSuggestion(null);
    alert("AI 제안 적용 로직은 QnAEditModal과 연동되어야 합니다.");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI 챗봇"
      top="50%"
      left="75%"
      transform="translate(-50%, -50%)"
    >

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
    </Modal>
  );
}
