'use client';

import { default as CommonButton } from '@/components/common/Button';
import CommonInput from '@/components/common/Input'; // Renamed to avoid conflict
import Modal from '@/components/common/Modal';
import { Experience } from '@/types/api';
import { ko } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFieldArray, useForm, Controller } from 'react-hook-form'; // Added useForm, useFieldArray, Controller
import { FaTimes } from 'react-icons/fa'; // Added for icons
import styled from 'styled-components';

registerLocale('ko', ko);

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ProjectItemContainer = styled.div`
  position: relative; /* Added for absolute positioning of delete button */
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main}; /* Added font change */
  resize: none;
`;

const LinkInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const RemoveLinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
  display: block;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 100%;

  & > div {
    flex: 1;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.main};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.large}; /* Added margin-top */
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  font-size: 20px;
  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const AddProjectButton = styled(CommonButton)``;

const CenteredButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.medium};
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

  &.danger {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

interface EditProjectExperienceFormData {
  experiences: Experience[];
}

interface Props {
  profile: Profile;
  onSave: (data: Experience[]) => void;
  onClose: () => void;
}

export default function EditProjectExperienceModal({ profile, onSave, onClose }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<EditProjectExperienceFormData>({
    defaultValues: {
      experiences: profile.experiences || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const handleAddProject = () => {
    append({ title: '', description: '', link: '', tech_stack: [], start_date: '', end_date: '' });
  };

  const handleDeleteProject = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: EditProjectExperienceFormData) => {
    const experiencesToSave = data.experiences.map(exp => ({
      ...exp,
      end_date: exp.end_date === '' ? null : exp.end_date,
      start_date: exp.start_date === '' ? null : exp.start_date,
      link: exp.link === '' ? null : exp.link,
    }));
    onSave(experiencesToSave);
  };

  return (
    <Modal onClose={onClose} title="프로젝트 수정">
      <form onSubmit={handleSubmit(onSubmit)}> {/* Wrap with form */}
        {fields.map((field, index) => (
          <ProjectItemContainer key={field.id}>
            <Label>프로젝트명</Label>
            <CommonInput // Use common Input
              type="text"
              {...register(`experiences.${index}.title`)}
            />
            <DateRangeContainer>
              <div>
                <Label>시작일</Label>
                <Controller
                  control={control}
                  name={`experiences.${index}.start_date`}
                  render={({ field: { onChange, value } }) => (
                    <StyledDatePicker
                      selected={value && !isNaN(new Date(value).getTime()) ? new Date(value) : null}
                      onChange={(date: Date) => onChange(date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                      dateFormat="yyyy-MM"
                      showMonthYearPicker
                      locale="ko"
                    />
                  )}
                />
              </div>
              <div>
                <Label>종료일</Label>
                <Controller
                  control={control}
                  name={`experiences.${index}.end_date`}
                  render={({ field: { onChange, value } }) => (
                    <StyledDatePicker
                      selected={value && value !== '현재' && !isNaN(new Date(value).getTime()) ? new Date(value) : null}
                      onChange={(date: Date) => onChange(date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '')}
                      dateFormat="yyyy-MM"
                      showMonthYearPicker
                      locale="ko"
                      placeholderText="선택 또는 '현재' 입력"
                    />
                  )}
                />
              </div>
            </DateRangeContainer>
            <Label>주요 역할 및 성과</Label>
            <TextArea
              {...register(`experiences.${index}.description`)}
            />

            {/* Links Section */}
            <Label>링크</Label>
            <CommonInput
              type="text"
              {...register(`experiences.${index}.link`, {
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  message: "유효한 URL을 입력해주세요.",
                },
              })}
              placeholder="프로젝트 링크 (URL)"
            />

            <DeleteButton
              type="button"
              onClick={() => handleDeleteProject(index)}
            >
              <FaTimes />
            </DeleteButton>
          </ProjectItemContainer>
        ))}
        <CenteredButtonContainer>
          <Button className="secondary" type="button" onClick={handleAddProject}>프로젝트 추가</Button>
        </CenteredButtonContainer>
        <ButtonContainer>
          <CommonButton // Use common Button
            className="primary"
            type="submit"
          >
            저장
          </CommonButton>
        </ButtonContainer>
      </form>
    </Modal>
  );
}
