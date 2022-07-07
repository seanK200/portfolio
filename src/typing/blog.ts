import { LanguageName } from '../contexts/SettingsProvider';

export type PostId = string;
export type CommentId = number;

export interface PostCommentInterface {
  id: CommentId;
  content: string;
  authorName: string;
  authorEmail: string;
  authorIp: string;
  createdAt: Date;
  postId: PostId;
  parentComment?: CommentId;
}

interface QueriablePostProperties {
  id: PostId;
  title: string;
  content?: string;
  languages: LanguageName[];
  tags?: string[];
  author: string;
}

interface OtherPostProperties {
  thumbnail?: string;
  comments?: PostCommentInterface[];
}

interface RangablePostProperties {
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export interface PostInfo
  extends QueriablePostProperties,
    RangablePostProperties,
    OtherPostProperties {}

interface PostFilterQuery {
  property: keyof QueriablePostProperties;
  query: string | string[];
}

interface PostFilterRange {
  property: keyof RangablePostProperties;
  start?: RangablePostProperties[keyof RangablePostProperties];
  end?: RangablePostProperties[keyof RangablePostProperties];
}

type PostFilterMode = 'and' | 'or';

export interface PostFilters {
  queryAll: string; // look for search query in all fields
  queries: PostFilterQuery[];
  queryMode: PostFilterMode;
  ranges: PostFilterRange[];
  rangeMode: PostFilterMode;
  sort: (keyof PostInfo)[];
  limit: 50;
  enabled: boolean;
}
