import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { getBlogPost } from '../api/blog/posts';
import PostInsights from '../components/blog/PostInsights';
import DateTime from '../components/utilities/DateTime';
import HeaderOffset from '../components/utilities/HeaderOffset';
import useText from '../hooks/useText';
import breakpoints from '../styles/breakpoints';
import Container from '../styles/Container';
import ErrorMessage from '../styles/ErrorMessage';
import blogTexts from '../texts/blogTexts';

const PostView = () => {
  const { id: postId } = useParams();
  const {
    isLoading,
    data: post,
    error,
  } = useQuery(['posts', postId], () => getBlogPost(postId));
  const t = useText(blogTexts);

  if (isLoading) {
    return <p className="highlight">{t('postLoading')}</p>;
  }

  if (error) {
    return <ErrorMessage className="highlight"> {t('postError')}</ErrorMessage>;
  }
  if (post) {
    return (
      <Container>
        <HeaderOffset />
        <h1>{post.title}</h1>
        <PostInfo>
          <PostInfoLeft>
            <PostAuthor>{post.author}</PostAuthor>
            <DateTime date={post.createdAt} />
          </PostInfoLeft>
          <PostInsights
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        </PostInfo>
      </Container>
    );
  }

  return null;
};

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textColor.gray.default};
`;

const PostInfoLeft = styled.div`
  display: flex;
  @media only screen and (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const PostAuthor = styled.span`
  display: inline-block;
  margin-right: 24px;
  font-weight: 600;

  @media only screen and (max-width: ${breakpoints.mobile}) {
    margin-right: 0;
  }
`;

export default PostView;
