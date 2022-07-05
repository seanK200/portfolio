import React, { useState } from 'react';
import PostList from '../components/blog/PostList';
import PostFilter from '../components/blog/PostFilter';
import { PostFilters } from '../typing/blog';
import HeaderOffset from '../components/utilities/HeaderOffset';
import SContainer from '../styles/Container';
import styled from 'styled-components';

const BlogView = (): JSX.Element => {
  const [postFilters, setPostFilters] = useState<Partial<PostFilters>>({});

  return (
    <Container>
      <HeaderOffset />
      <PostFilter filters={postFilters} setFilters={setPostFilters} />
      <PostList filters={postFilters} />
    </Container>
  );
};

const Container = styled(SContainer)`
  padding-bottom: 48px;
`;

export default BlogView;
