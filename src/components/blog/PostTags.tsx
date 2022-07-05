import React from 'react';
import styled from 'styled-components';
import { PostInfo } from './PostFilter';

type Props = {
  tags: PostInfo['tags'];
};

const PostTags = ({ tags }: Props) => {
  return (
    <SPostTags className="no-scrollbar">
      {tags && tags.map((tag) => <PostTag key={tag}>{tag}</PostTag>)}
    </SPostTags>
  );
};

const PostTag = styled.li`
  margin-right: 8px;
  padding: 4px 8px;
  display: inline-block;
  background-color: ${({ theme }) => theme.color.primary.background};
`;

const SPostTags = styled.ul`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

export default PostTags;
