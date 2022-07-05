import React from 'react';
import styled from 'styled-components';
import DateTime from '../utilities/DateTime';
import PostTags from './PostTags';
import { PostInfo } from '../../typing/blog';
import PostInsights from './PostInsights';

type PostItemProps = {
  postInfo?: PostInfo;
  showSkeleton?: boolean;
};

const PostItem = ({ postInfo, showSkeleton }: PostItemProps) => {
  // For loading, return skeleton UI
  if (showSkeleton) {
    return (
      <SPostItem>
        <ThumbnailSkeleton />
        <PostInfoSection>
          <div>
            <PostTitleSkeleton>Loading</PostTitleSkeleton>
            <PostTitleSkeleton style={{ width: '45%' }}>
              Loading
            </PostTitleSkeleton>
            <PostTags showSkeleton />
          </div>
          <FlexContainer>
            <PostInfoSkeleton></PostInfoSkeleton>
            <PostInfoSkeleton></PostInfoSkeleton>
          </FlexContainer>
        </PostInfoSection>
      </SPostItem>
    );
  }

  if (postInfo) {
    return (
      <SPostItem>
        <PostInfoSection>
          <div>
            <PostTitle>{postInfo.title}</PostTitle>
            <PostTags tags={postInfo.tags} />
          </div>
          <FlexContainer>
            <DateTime
              date={postInfo.createdAt}
              showDiffUntil="hours"
              format="date"
            />
            <PostInsights
              likeCount={postInfo.likeCount}
              commentCount={postInfo.commentCount}
            />
          </FlexContainer>
        </PostInfoSection>
      </SPostItem>
    );
  }

  return null;
};

const SPostItem = styled.li`
  box-shadow: 0px 2px 6px ${({ theme }) => theme.textColor.default}19;
  border-radius: 8px;
  height: 376px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.secondary.background};
  cursor: pointer;
  transition: transform 0.1s linear;

  &:hover {
    transform: scale(102%);
  }

  & span.datetime__span {
    font-size: 0.875rem;
    display: block;
    color: ${({ theme }) => theme.textColor.gray.default};
  }
`;

const ThumbnailSkeleton = styled.div`
  border-radius: 8px 8px 0 0;
  height: 156px;
  background-color: ${({ theme }) => theme.color.gray.default};
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PostInfoSection = styled(FlexContainer)`
  padding: 1.25rem;
  flex-direction: column;
  flex-grow: 1;
`;

const PostTitle = styled.span`
  margin-bottom: 16px;
  display: block;
  line-height: 1.4;
  font-size: 1.25rem;
  font-weight: 500;
`;

const PostTitleSkeleton = styled(PostTitle)`
  color: ${({ theme }) => theme.color.gray.default};
  background-color: ${({ theme }) => theme.color.gray.default};
`;

const PostInfoSkeleton = styled.span`
  width: 20%;
  height: 0.875rem;
  background-color: ${({ theme }) => theme.color.gray.default};
`;

export default PostItem;
