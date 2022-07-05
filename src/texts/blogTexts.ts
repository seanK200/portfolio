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
    ko: '오류가 발생하여 블로그 게시물 불러오기에 실패하였습니다.',
    en: 'Failed to load blog posts due to an error.',
  },
};

export default blogTexts;
