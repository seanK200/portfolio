import React from 'react';
import styled from 'styled-components/macro';
import useInput from '../../hooks/useInput';
import useText from '../../hooks/useText';
import breakpoints from '../../styles/breakpoints';
import SButton from '../../styles/Button';
import blogTexts from '../../texts/blogTexts';

type Props = {
  disabled?: boolean;
};

const COMMENT_MAX_LENGTH = 256;

const PostCommentForm = ({ disabled }: Props) => {
  const [newComment, isNewCommentValid, newCommentControl] = useInput<
    string,
    HTMLTextAreaElement
  >({ initialValue: '', length: COMMENT_MAX_LENGTH });
  const t = useText(blogTexts);
  return (
    <Form>
      <TextArea
        value={newComment}
        onChange={(e) => newCommentControl.setValue(e.target.value)}
        onBlur={newCommentControl.handleInputBlur}
        rows={4}
        placeholder={t('commentPlaceholder')}
        className={isNewCommentValid ? undefined : 'invalid'}
        disabled={disabled}
      />
      <CommentFooter
        visible={newComment !== undefined && newComment.length > 0}
      >
        <Info>
          <CharCount message={newCommentControl.message || ''}>
            {newComment ? newComment.length : 0} / {COMMENT_MAX_LENGTH}
            {' ' + t('commentLengthUnit')}
          </CharCount>
          <Message className={isNewCommentValid ? undefined : 'invalid'}>
            {newCommentControl.message}
          </Message>
        </Info>
        <Actions>
          <Button
            className="primary small"
            disabled={!newCommentControl.isValid}
          >
            {t('commentSubmit')}
          </Button>
        </Actions>
      </CommentFooter>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const TextArea = styled.textarea`
  margin-bottom: 12px;
  outline-color: ${({ theme }) => theme.color.primary.default};
  border: 1px solid ${({ theme }) => theme.color.gray.default};
  border-radius: 8px;
  padding: 16px;
  width: 100%;
  font-family: Pretendard;
  font-size: 1rem;
  color: ${({ theme }) => theme.textColor.default};
  background-color: ${({ theme }) => theme.color.gray.default};
  &::placeholder {
    color: ${({ theme }) => theme.textColor.gray.default};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.primary.default};
    background-color: ${({ theme }) => theme.color.primary.background};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.color.primary.disabled};
    color: ${({ theme }) => theme.textColor.primary.disabled};
    overflow: hidden;
  }
  &.invalid {
    border-color: ${({ theme }) => theme.color.dangerous.default};
    outline-color: ${({ theme }) => theme.color.dangerous.default};
    background-color: ${({ theme }) => theme.color.dangerous.background};
  }
`;

const CommentFooter = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: ${breakpoints.mobile}px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Info = styled.div`
  flex-shrink: 0;
  display: flex;
  color: ${({ theme }) => theme.textColor.gray.default};
  font-size: 0.875rem;
  @media screen and (max-width: ${breakpoints.mobile}px) {
    margin-bottom: 16px;
    flex-direction: column;
  }
`;

const CharCount = styled.span<{ message: string }>`
  margin-right: 16px;
  @media screen and (max-width: ${breakpoints.mobile}px) {
    margin-right: 0;
  }
`;

const Message = styled.span`
  &.invalid {
    color: ${({ theme }) => theme.color.dangerous.default};
  }
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: ${breakpoints.mobile}px) {
    justify-content: flex-start;
  }
`;

const Button = styled(SButton)`
  flex-shrink: 0;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
`;

export default PostCommentForm;
