import React from 'react';
import {
  ExclamationCircle,
  ReplyFill,
  PersonFill,
} from 'react-bootstrap-icons';
import styled from 'styled-components/macro';
import { PostCommentInterface } from '../../typing/blog';

type Props = {
  comment?: PostCommentInterface;
};

const PostComment = ({ comment }: Props) => {
  if (!comment) return null;

  return (
    <SPostComment>
      <div style={{ marginRight: '8px' }}>
        <PersonFill />
      </div>
      <div>
        <AuthorName>{comment.authorName}</AuthorName>
        <p>{comment.content}</p>
        <div style={{ display: 'flex' }}>
          <CommentAction>
            <ReplyFill />
            Reply
          </CommentAction>
          <CommentAction>
            <ExclamationCircle />
            Report
          </CommentAction>
        </div>
      </div>
    </SPostComment>
  );
};

const SPostComment = styled.div`
  display: flex;
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const CommentAction = styled.button`
  margin: 0;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  background: none;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.primary.default};
  cursor: pointer;
  margin-right: 16px;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    text-decoration: underline;
  }
  & svg {
    margin-right: 4px;
  }
`;

const AuthorName = styled.span`
  font-weight: 600;
`;

export default PostComment;
