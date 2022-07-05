import React from 'react';
import { useParams } from 'react-router-dom';

const PostView = () => {
  const { id: postId } = useParams();

  return <div>Viewing post {postId}</div>;
};

export default PostView;
