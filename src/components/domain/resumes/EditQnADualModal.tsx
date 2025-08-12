'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { QnA } from '@/types';
import { useState } from 'react';
import styled from 'styled-components';

const LeftModalContent = styled.div<{ $showChatbot: boolean }>`
  flex: ${({ $showChatbot }) => ($showChatbot ? 1 : 'none')}; /* Take full width when chatbot is hidden */
  width: ${({ $showChatbot }) => ($showChatbot ? 'auto' : '100%')};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  border-right: ${({ $showChatbot, theme }) => ($showChatbot ? `1px solid ${theme.colors.border}` : 'none')};
  padding-right: ${({ $showChatbot, theme }) => ($showChatbot ? theme.spacing.large : '0')};
  position: relative; /* For positioning the toggle button */
`;

const RightModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  padding-left: ${({ theme }) => theme.spacing.large};
`;

const ModalContentWrapper = styled.div<{ $showChatbot: boolean }>`
  display: flex;
  width: 100%;
  height: 100%; /* Ensure it takes full height of modal */
`;

const ChatToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px 0 0 4px;
  padding: 10px 5px;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
`;



const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const StyledInput = styled.input`
  width: 100%;
  height: auto; /* 최소 높이 설정 */
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 100px; /* Keep min-height for initial size */
  padding: 10px;
  border: none; /* Removed border */
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main}; /* Added font change */
  resize: none; /* Prevent resizing */
  flex-grow: 1;
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

const ChatInput = styled.input`
  flex-grow: 1;
  margin-right: ${({ theme }) => theme.spacing.small};
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
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
  const [showChatbot, setShowChatbot] = useState(false); // New state


  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setChatInput('');

    // Mock AI response
    setTimeout(() => {
      const aiResponse = `AI: "${userMessage}"에 대한 답변을 개선해 드릴까요? 예를 들어, "${userMessage}"에 대한 구체적인 경험을 바탕으로 답변을 작성해보세요.`;
      setChatHistory(prev => [...prev, { type: 'ai', message: aiResponse }]);
    }, 1000);
  };

  

  const handleSave = () => {
    onSave(qna.id, editedQuestion, editedAnswer);
  };

  return (
    <Modal onClose={onClose} title="Q&A 수정" dynamicWidth={showChatbot ? '1200px' : '600px'}> {/* Pass dynamicWidth */}
      {/* Main Modal Content Wrapper */}
      <ModalContentWrapper $showChatbot={showChatbot}> {/* New wrapper for flex layout */}
        {/* Left Modal Content: Q&A Editor */}
        <LeftModalContent $showChatbot={showChatbot}> {/* Pass showChatbot prop */}
          <SectionTitle>Q&A 수정</SectionTitle>
          <StyledInput
            placeholder="질문을 입력하세요."
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
          />
          <StyledTextArea
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            placeholder="답변을 입력하세요."
          />
          <Button onClick={handleSave}>저장</Button>
          <ChatToggleButton onClick={() => setShowChatbot(!showChatbot)}>{showChatbot ? '<<' : '>>'}</ChatToggleButton> {/* New button */}
        </LeftModalContent>

        {/* Right Modal Content: AI Chatbot */}
        {showChatbot && (
          <RightModalContent>
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
          </RightModalContent>
        )}
      </ModalContentWrapper>
    </Modal>
  );
}