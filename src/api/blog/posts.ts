import axiosInstance from '..';
import { PostInfo } from '../../typing/blog';

export const getBlogPosts = () => {
  return axiosInstance.get<PostInfo[]>('/posts').then((res) => res.data);
};
