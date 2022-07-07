import React from 'react';
import styled from 'styled-components/macro';
import useText from '../../hooks/useText';
import blogTexts from '../../texts/blogTexts';
import { PostCommentInterface } from '../../typing/blog';
import PostComment from './PostComment';
import PostCommentForm from './PostCommentForm';

type Props = {
  comments?: PostCommentInterface[];
};

const PostCommentList = ({ comments }: Props) => {
  const t = useText(blogTexts);
  const commentCount = comments && comments.length ? comments.length : 0;
  return (
    <SPostComments>
      <h1 className="highlight">{`${t('comments')} (${commentCount})`}</h1>
      <PostCommentForm />
      {comments &&
        comments.map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
    </SPostComments>
  );
};

const SPostComments = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default PostCommentList;
