import React from 'react';
import styled from 'styled-components/macro';
import {
  checkFilterActive,
  defaultPostFilters,
  getPostFilter,
} from './PostFilter';
import { PostFilters } from '../../typing/blog';
import PostItem from './PostItem';
import { useQuery } from 'react-query';
import { getBlogPosts } from '../../api/blog/posts';
import useText from '../../hooks/useText';
import blogTexts from '../../texts/blogTexts';
import ErrorMessage from '../../styles/ErrorMessage';

type PostListProps = {
  filters: Partial<PostFilters>;
};

const PostList = ({ filters }: PostListProps) => {
  // Use default values if not specified
  filters = { ...defaultPostFilters, ...filters };

  const t = useText(blogTexts);
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(['posts'], getBlogPosts, { refetchOnWindowFocus: false });

  // Still fetching posts
  if (isLoading) {
    return (
      <SPostList>
        {Array(9)
          .fill(0)
          .map((_, idx) => (
            <PostItem key={idx} showSkeleton />
          ))}
      </SPostList>
    );
  }

  // Error while fetching posts
  if (error) {
    return (
      <ErrorMessage className="highlight">{t('getPostsError')}</ErrorMessage>
    );
  }

  // No posts
  if (posts && posts.length === 0) {
    return (
      <p className="highlight">
        {checkFilterActive(filters) ? t('noPostsAfterFilter') : t('noPosts')}
      </p>
    );
  }
  if (posts) {
    return (
      <SPostList>
        {posts &&
          posts
            .slice(0, filters.limit)
            .filter(getPostFilter(filters))
            .map((postInfo) => {
              return <PostItem key={postInfo.id} postInfo={postInfo} />;
            })}
      </SPostList>
    );
  }

  return null;
};

const SPostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  column-gap: 32px;
  row-gap: 32px;
`;

export default PostList;
