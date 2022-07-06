import axiosInstance from '..';
import { PostInfo } from '../../typing/blog';

export const getBlogPosts = () => {
  return axiosInstance.get<PostInfo[]>('/posts').then((res) => res.data);
};

export const getBlogPost = (id: string | undefined) => {
  if (!id) throw new Error('api/getBlogPost: Post Id is undefined');
  return axiosInstance.get<PostInfo>(`/posts/${id}`).then((res) => res.data);
};
