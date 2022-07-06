import React, { useState } from 'react';
import PostList from '../components/blog/PostList';
import PostFilter from '../components/blog/PostFilter';
import { PostFilters } from '../typing/blog';
import HeaderOffset from '../components/utilities/HeaderOffset';
import Container from '../styles/Container';

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

export default BlogView;
