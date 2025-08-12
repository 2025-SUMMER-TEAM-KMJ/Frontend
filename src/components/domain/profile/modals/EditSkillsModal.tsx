'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Profile, Skill } from '@/types/profile';
import Modal from '@/components/common/Modal';

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SkillInputContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Input = styled.input`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
`;

const SkillTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
`;

const SkillListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.large};
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

export default function EditSkillsModal({ profile, onSave, onClose }: Props) {
  const [skills, setSkills] = useState<Skill[]>(profile.skills);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    setSkills(profile.skills);
  }, [profile.skills]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.some(s => s.name === newSkill.trim())) {
      setSkills([...skills, { id: Date.now().toString(), name: newSkill.trim() }]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleSave = () => {
    onSave(skills);
  };

  return (
    <Modal onClose={onClose} title="기술 스택 수정">
      <SkillInputContainer>
        <Input
          type="text"
          placeholder="새 기술 추가"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddSkill();
            }
          }}
        />
        <Button className="primary" onClick={handleAddSkill}>추가</Button>
      </SkillInputContainer>
      <SkillListContainer>
        {skills.map(skill => (
          <SkillTag key={skill.id}>
            {skill.name}
            <RemoveButton onClick={() => handleRemoveSkill(skill.id)}>x</RemoveButton>
          </SkillTag>
        ))}
      </SkillListContainer>
      
      
    </Modal>
  );
}
