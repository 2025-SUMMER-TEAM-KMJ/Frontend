'use client';

import React from 'react';
import styled from 'styled-components';
import { useForm, useFieldArray } from 'react-hook-form';
import { Profile } from '@/types/profile';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
`;

const RemoveLinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 20px;
  padding: 0 5px;
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

interface EditBasicInfoFormData {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  preferredJobGroup?: string;
  preferredJob?: string;
  links: string[]; // Changed to array
}

interface Props {
  profile: Profile;
  onSave: (data: EditBasicInfoFormData) => void;
  onClose: () => void;
}

const Form = styled.form`
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

const EditBasicInfoModal: React.FC<Props> = ({ profile, onSave, onClose }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<EditBasicInfoFormData>({
    defaultValues: {
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      email: profile.email,
      phone: profile.phone,
      preferredJobGroup: profile.preferredPosition?.[0]?.industry || '',
      preferredJob: profile.preferredPosition?.[0]?.title || '',
      links: profile.links || [''], // Initialize as array
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = (data: EditBasicInfoFormData) => {
    onSave(data);
  };

  return (
    <Modal onClose={onClose} title="기본 정보 수정">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="이름"
          {...register('name', { required: '이름은 필수입니다.' })}
          error={errors.name?.message}
        />
        <Input
          label="나이"
          type="number"
          {...register('age', { required: '나이는 필수입니다.', valueAsNumber: true })}
          error={errors.age?.message}
        />
        <Input
          label="성별"
          {...register('gender', { required: '성별은 필수입니다.' })}
          error={errors.gender?.message}
        />
        <Input
          label="이메일"
          type="email"
          {...register('email', { required: '이메일은 필수입니다.' })}
          error={errors.email?.message}
        />
        <Input
          label="전화번호"
          {...register('phone', { required: '전화번호는 필수입니다.' })}
          error={errors.phone?.message}
        />
        <Input
          label="희망 직군"
          {...register('preferredJobGroup')}
          error={errors.preferredJobGroup?.message}
        />
        <Input
          label="희망 직무"
          {...register('preferredJob')}
          error={errors.preferredJob?.message}
        />
        {/* Links Section */}
        <Label>링크</Label>
        {fields.map((item, index) => (
          <div key={item.id} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Input
              {...register(`links.${index}`)}
              placeholder="링크 URL"
              style={{ flexGrow: 1 }}
            />
            <RemoveLinkButton type="button" onClick={() => remove(index)}>
              &times;
            </RemoveLinkButton>
          </div>
        ))}
        <Button type="button" onClick={() => append('')}>
          + 링크 추가
        </Button>
        <ButtonContainer>
          <Button type="submit">
            저장
          </Button>
        </ButtonContainer>
      </Form>
    </Modal>
  );
};

export default EditBasicInfoModal;