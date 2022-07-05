import React from 'react';
import styled from 'styled-components';
import { PostInfo } from '../../typing/blog';

type Props = {
  tags?: PostInfo['tags'];
  showSkeleton?: boolean;
};

const PostTags = ({ tags, showSkeleton }: Props) => {
  if (showSkeleton) {
    return (
      <SPostTags className="no-scrollbar">
        <PostTagSkeleton>Loading</PostTagSkeleton>
        <PostTagSkeleton>Loading</PostTagSkeleton>
      </SPostTags>
    );
  }

  return (
    <SPostTags className="no-scrollbar">
      {tags && tags.map((tag) => <PostTag key={tag}>{tag}</PostTag>)}
    </SPostTags>
  );
};

const PostTag = styled.li`
  margin-right: 12px;
  border-radius: 0.75rem;
  padding: 4px 16px;
  display: inline-block;
  background-color: ${({ theme }) => theme.color.primary.background};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.textColor.primary.default};
    background-color: ${({ theme }) => theme.color.primary.default};
  }
`;

const PostTagSkeleton = styled(PostTag)`
  color: ${({ theme }) => theme.color.gray.default};
  background-color: ${({ theme }) => theme.color.gray.default};
`;

const SPostTags = styled.ul`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export default PostTags;
