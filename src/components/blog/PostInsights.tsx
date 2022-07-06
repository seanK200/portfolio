import React from 'react';
import { Chat, Heart } from 'react-bootstrap-icons';
import styled from 'styled-components/macro';

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
  & svg {
    font-size: 0.8em;
    position: relative;
    top: 2px;
    margin-left: 12px;
    margin-right: 4px;
  }
  & svg:first-child {
    margin-left: 0;
  }
`;

export default PostInsights;
