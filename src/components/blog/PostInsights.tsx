import React from 'react';
import { Chat, Heart } from 'react-bootstrap-icons';
import styled from 'styled-components';

type Props = {
  likeCount: number;
  commentCount: number;
};

const PostInsights = ({ likeCount, commentCount }: Props) => {
  return (
    <SPostInsights>
      {likeCount ? (
        <span>
          <Heart />
          {likeCount}
        </span>
      ) : null}
      {commentCount ? (
        <span>
          <Chat style={{ top: '1px' }} />
          {commentCount}
        </span>
      ) : null}
    </SPostInsights>
  );
};

const SPostInsights = styled.div`
  color: ${({ theme }) => theme.textColor.gray.default};
  font-size: 0.875rem;
  & svg {
    font-size: 0.75rem;
    position: relative;
    top: 2px;
    margin-left: 12px;
    margin-right: 4px;
  }
`;

export default PostInsights;
