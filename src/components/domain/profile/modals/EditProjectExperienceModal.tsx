'use client';

import Modal from '@/components/common/Modal';
import { ProjectExperience } from '@/types/profile';
import { ko } from 'date-fns/locale';
import { useForm, useFieldArray } from 'react-hook-form'; // Added useForm, useFieldArray
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import CommonInput from '@/components/common/Input'; // Renamed to avoid conflict
import CommonButton from '@/components/common/Button'; // Renamed to avoid conflict

registerLocale('ko', ko);

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ProjectItemContainer = styled.div`
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

interface EditProjectExperienceFormData {
  projectExperiences: ProjectExperience[];
}

interface Props {
  profile: Profile;
  onSave: (data: ProjectExperience[]) => void;
  onClose: () => void;
}

export default function EditProjectExperienceModal({ profile, onSave, onClose }: Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<EditProjectExperienceFormData>({
    defaultValues: {
      projectExperiences: (profile.projectExperience || []).map(proj => ({
        ...proj,
        links: proj.links || [''], // Ensure links array is initialized
      })),
    },
  });

  const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: "projectExperiences",
  });

  const handleAddProject = () => {
    appendProject({ id: Date.now().toString(), title: '', startDate: '', endDate: '', description: '', links: [''] });
  };

  const handleDeleteProject = (index: number) => {
    removeProject(index);
  };

  const onSubmit = (data: EditProjectExperienceFormData) => {
    onSave(data.projectExperiences);
  };

  return (
    <Modal onClose={onClose} title="프로젝트 수정">
      <form onSubmit={handleSubmit(onSubmit)}> {/* Wrap with form */}
        {projectFields.map((proj, projectIndex) => (
          <ProjectItemContainer key={proj.id}>
            <Label>프로젝트명</Label>
            <CommonInput // Use common Input
              type="text"
              {...register(`projectExperiences.${projectIndex}.title`)}
            />
            <DateRangeContainer>
              <div>
                <Label>시작일</Label>
                <StyledDatePicker
                  selected={proj.startDate && !isNaN(new Date(proj.startDate).getTime()) ? new Date(proj.startDate) : null}
                  onChange={(date: Date) => {
                    const formattedDate = date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '';
                    control.setValue(`projectExperiences.${projectIndex}.startDate`, formattedDate);
                  }}
                  dateFormat="yyyy-MM"
                  showMonthYearPicker
                  locale="ko"
                />
              </div>
              <div>
                <Label>종료일</Label>
                <StyledDatePicker
                  selected={proj.endDate && proj.endDate !== '현재' && !isNaN(new Date(proj.endDate).getTime()) ? new Date(proj.endDate) : null}
                  onChange={(date: Date) => {
                    const formattedDate = date ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '';
                    control.setValue(`projectExperiences.${projectIndex}.endDate`, formattedDate);
                  }}
                  dateFormat="yyyy-MM"
                  showMonthYearPicker
                  locale="ko"
                  placeholderText="선택 또는 '현재' 입력"
                />
              </div>
            </DateRangeContainer>
            <Label>주요 역할 및 성과</Label>
            <TextArea
              {...register(`projectExperiences.${projectIndex}.description`)}
            />

            {/* Links Section */}
            <Label>링크</Label>
            <LinkFields projectIndex={projectIndex} control={control} /> {/* New component for links */}

            <CommonButton // Use common Button
              className="danger"
              type="button"
              onClick={() => handleDeleteProject(projectIndex)}
            >
              삭제
            </CommonButton>
          </ProjectItemContainer>
        ))}
        <CommonButton // Use common Button
          className="secondary"
          type="button"
          onClick={handleAddProject}
        >
          프로젝트 추가
        </CommonButton>
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

// New component for handling link fields
interface LinkFieldsProps {
  projectIndex: number;
  control: any; // Use any for now, or import Control from react-hook-form
}

const LinkFields: React.FC<LinkFieldsProps> = ({ projectIndex, control }) => {
  // We still use useFieldArray to manage the single link, but we'll ensure it's always one.
  const { fields, append, remove } = useFieldArray({
    control,
    name: `projectExperiences.${projectIndex}.links`,
  });

  // Ensure there's always exactly one link field.
  // If no link exists, add one. If more than one, remove extras.
  if (fields.length === 0) {
    append('');
  } else if (fields.length > 1) {
    // Remove all but the first one
    for (let i = fields.length - 1; i > 0; i--) {
      remove(i);
    }
  }

  return (
    <div style={{ position: 'relative', marginBottom: '8px' }}>
      <CommonInput // Use common Input
        {...control.register(`projectExperiences.${projectIndex}.links.0`)} // Always register the first (and only) link
        placeholder="프로젝트 링크 (URL)"
      />
      {/* No remove button needed, user can clear the input */}
    </div>
  );
};