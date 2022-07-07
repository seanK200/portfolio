import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';
import { getBlogPost } from '../api/blog/posts';
import PostComments from '../components/blog/PostComments';
import PostInsights from '../components/blog/PostInsights';
import DateTime from '../components/utilities/DateTime';
import HeaderOffset from '../components/utilities/HeaderOffset';
import useMarkdown from '../hooks/useMarkdown';
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
    isFetching,
  } = useQuery(['posts', postId], () => getBlogPost(postId));
  const t = useText(blogTexts);
  const parsemd = useMarkdown();

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
        <PostTitle>{post.title}</PostTitle>
        <PostInfo>
          <PostInfoLeft>
            <PostAuthor>{post.author}</PostAuthor>
            {isFetching ? (
              <span>{t('postRefreshing')}</span>
            ) : (
              <DateTime
                date={post.updatedAt}
                textAfter={
                  post.createdAt === post.updatedAt
                    ? ` (${t('updated')})`
                    : undefined
                }
              />
            )}
          </PostInfoLeft>
          <PostInsights
            likeCount={post.likeCount}
            commentCount={post.commentCount}
          />
        </PostInfo>
        <PostContents
          dangerouslySetInnerHTML={{ __html: parsemd(post?.content) }}
        ></PostContents>
        <PostComments comments={post.comments} />
      </Container>
    );
  }

  return null;
};

const PostTitle = styled.h1`
  font-weight: 500;
  color: ${({ theme }) => theme.color.primary.default};
  margin-bottom: 0.75em;
`;

const PostInfo = styled.div`
  margin-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray.default};
  padding-bottom: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textColor.gray.default};

  @media screen and (max-width: ${breakpoints.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PostInfoLeft = styled.div`
  display: flex;
  align-items: flex-start;
  @media screen and (max-width: ${breakpoints.tablet}px) {
    flex-direction: column;
    margin-bottom: 8px;
    & span {
      margin-bottom: 8px;
    }
  }
`;

const PostAuthor = styled.span`
  display: inline-block;
  font-weight: 600;
  @media screen and (min-width: ${breakpoints.tablet}px) {
    margin-right: 16px;
  }
`;

const PostContents = styled.article`
  padding-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray.default};
  margin-bottom: 3rem;
`;

export default PostView;
