'use client';

import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Profile } from '@/types/profile';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface EditBasicInfoFormData {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
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
  const { register, handleSubmit, formState: { errors } } = useForm<EditBasicInfoFormData>({
    defaultValues: {
      name: profile.name,
      age: profile.age,
      gender: profile.gender,
      email: profile.email,
      phone: profile.phone,
    },
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
        <ButtonContainer>
          <Button type="button" onClick={onClose} variant="secondary">
            취소
          </Button>
          <Button type="submit">
            저장
          </Button>
        </ButtonContainer>
      </Form>
    </Modal>
  );
};

export default EditBasicInfoModal;