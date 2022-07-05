import React from 'react';
import styled from 'styled-components';
import {
  defaultPostFilters,
  getPostFilter,
  PostFilters,
  PostInfo,
} from './PostFilter';
import PostItem from './PostItem';

type PostListProps = {
  filters: Partial<PostFilters>;
};

// dummy data
const posts: PostInfo[] = [
  {
    postId: 'q9283rh2pr',
    title: 'Typescript Utility Types And Their Usage',
    languages: ['ko', 'en'],
    tags: ['typescript', 'ts'],
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'Youngwoo',
    viewCount: 123,
    likeCount: 44,
    commentCount: 0,
  },
  {
    postId: 'xfgbp978',
    title: '타입스크립트 유틸리티 타입으로 동적 타입 만들기',
    languages: ['ko', 'en'],
    tags: ['typescript', 'ts'],
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'Youngwoo',
    viewCount: 123,
    likeCount: 44,
    commentCount: 10,
  },
  {
    postId: 'nsdp9au',
    title: 'Typescript Utility Types',
    languages: ['ko', 'en'],
    tags: ['typescript', 'ts'],
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'Youngwoo',
    viewCount: 123,
    likeCount: 44,
    commentCount: 10,
  },
  {
    postId: 'cbzhpvx89',
    title: 'Typescript Utility Types',
    languages: ['ko', 'en'],
    tags: ['typescript', 'ts'],
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'Youngwoo',
    viewCount: 123,
    likeCount: 44,
    commentCount: 10,
  },
];

const PostList = ({ filters }: PostListProps) => {
  // Use default values if not specified
  filters = { ...defaultPostFilters, ...filters };
  return (
    <SPostList>
      {posts
        .slice(0, filters.limit)
        .filter(getPostFilter(filters))
        .map((postInfo) => {
          return <PostItem key={postInfo.postId} postInfo={postInfo} />;
        })}
    </SPostList>
  );
};

const SPostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  column-gap: 32px;
  row-gap: 32px;
`;

export default PostList;
