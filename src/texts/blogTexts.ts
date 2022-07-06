import { MultiLangTextsDef } from '../hooks/useText';

const blogTexts: MultiLangTextsDef = {
  blog: {
    ko: '블로그',
    en: 'Blog',
  },
  searchResults: {
    ko: '검색 결과',
    en: 'Search Results',
  },
  noPosts: {
    ko: '게시글이 없습니다.',
    en: 'No posts available.',
  },
  noPostsAfterFilter: {
    ko: '필터 조건에 맞는 게시글이 없습니다.',
    en: 'No posts matched your filter settings.',
  },
  getPostsError: {
    ko: '오류가 발생하여 블로그 게시물 목록 불러오기에 실패하였습니다.',
    en: 'Failed to load blog posts due to an error.',
  },
  postLoading: {
    ko: '게시글 내용 불러오는 중...',
    en: 'Loading post...',
  },
  postRefreshing: {
    ko: '새로고침 중...',
    en: 'Refreshing...',
  },
  postError: {
    ko: '오류가 발생하여 블로그 게시물 불러오기에 실패하였습니다.',
    en: 'Failed to load this blog post due to an error.',
  },
  updated: {
    ko: '수정됨',
    en: 'Updated',
  },
  author: {
    ko: '작성자',
    en: 'Author',
  },
};

export default blogTexts;
