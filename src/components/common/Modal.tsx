'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  title?: string;
  top?: string;
  left?: string;
  transform?: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)<{ $dynamicWidth?: string }>`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: ${({ $dynamicWidth }) => $dynamicWidth || '90%'}; /* Use dynamicWidth or default */
  max-width: ${({ $dynamicWidth }) => $dynamicWidth || '600px'}; /* Use dynamicWidth or default */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  max-height: 100vh;
  overflow-y: auto;
  transition: max-width 0.3s ease-in-out, width 0.3s ease-in-out; /* Smooth transition */
`;



interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  title?: string;
  top?: string;
  left?: string;
  transform?: string;
  dynamicWidth?: string; // New prop
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #aaa;
  &:hover {
    color: #333;
  }
`;
const Modal: React.FC<ModalProps> = ({ children, onClose, title, top, left, transform, dynamicWidth }) => {
  return (
    <ModalOverlay onClick={onClose} style={{ top, left, transform }}>
      <ModalContent
        $dynamicWidth={dynamicWidth} // Pass the new prop
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      >
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;