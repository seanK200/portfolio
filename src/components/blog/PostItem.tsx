import React from 'react';
import styled from 'styled-components';
import DateTime from '../utilities/DateTime';
import PostTags from './PostTags';
import { PostInfo } from '../../typing/blog';
import PostInsights from './PostInsights';
import { useNavigate } from 'react-router-dom';

type PostItemProps = {
  postInfo?: PostInfo;
  showSkeleton?: boolean;
};

const PostItem = ({ postInfo, showSkeleton }: PostItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (postInfo && postInfo.id) navigate(`/post/${postInfo.id}`);
  };

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
      <SPostItem onClick={handleClick}>
        {postInfo.thumbnail && <Thumbnail src={postInfo.thumbnail} />}
        <PostInfoSection>
          <div>
            <PostTitle>{postInfo.title}</PostTitle>
            <PostTags tags={postInfo.tags} />
          </div>
          {!postInfo.thumbnail && (
            <TextPreview>{postInfo.content?.slice(0, 300)}</TextPreview>
          )}
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

const ContentPreview = styled.div`
  border-radius: 8px 8px 0 0;
  height: 156px;
`;

const ThumbnailSkeleton = styled(ContentPreview)`
  background-color: ${({ theme }) => theme.color.gray.default};
`;

const Thumbnail = styled(ContentPreview)<{ src: string }>`
  background-color: ${({ theme }) => theme.color.gray.default};
  background-image: url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
`;

const TextPreview = styled(ContentPreview)`
  color: ${({ theme }) => theme.textColor.gray.default};
  overflow: hidden;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: #ffffff00;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
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
