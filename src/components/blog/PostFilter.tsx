import React, { useEffect, useState } from 'react';
import { FunnelFill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import useText from '../../hooks/useText';
import Input from '../../styles/Input';
import blogTexts from '../../texts/blogTexts';
import Asset from '../utilities/Asset';
import HideMobile from '../utilities/HideMobile';
import { PostFilters, PostInfo } from '../../typing/blog';
import useThrottledState from '../../hooks/useThrottledState';

export const defaultPostFilters: PostFilters = {
  queryAll: '',
  queries: [],
  queryMode: 'and',
  ranges: [],
  rangeMode: 'and',
  sort: [],
  limit: 50,
  enabled: true,
};

type PostFilterProps = {
  filters: Partial<PostFilters>;
  setFilters: React.Dispatch<React.SetStateAction<Partial<PostFilters>>>;
};

export const getPostFilter = (filters: Partial<PostFilters>) => {
  // Use default values if not specified
  filters = { ...defaultPostFilters, ...filters };

  return (postInfo: PostInfo): boolean => {
    // Check if filter is enabled
    if (!filters.enabled) return true;

    // Check queryAll filter
    let queryAllMatch = true;
    if (filters.queryAll) {
      queryAllMatch = postInfo.title.includes(filters.queryAll);
      if (postInfo.tags)
        queryAllMatch ||= postInfo.tags.includes(filters.queryAll);
      if (postInfo.content)
        queryAllMatch ||= postInfo.content.includes(filters.queryAll);
    }

    // Check query filters
    let queryMatch = true;
    if (filters.queries && filters.queries.length) {
      // Look at each filter
      queryMatch = filters.queries.reduce(
        (prevMatch, filter) => {
          let newMatch = true;
          if (postInfo[filter.property] && filter.query) {
            const value: PostInfo[keyof PostInfo] = postInfo[filter.property];
            const { query } = filter;
            if (typeof value === 'string') {
              // value is a string
              if (typeof query === 'string') {
                // query is a string
                // check if query is a substring of value
                newMatch = value.includes(query);
              }
            } else {
              if (value) {
                // Value is an array
                // Prevent LanguageName[] type assertion errors
                const arrayValue = value as string[];
                if (typeof query === 'string') {
                  // query is a string
                  // check if any item in the array contains the query string
                  newMatch = arrayValue.reduce((prevQueryMatch, v) => {
                    return prevQueryMatch || v.includes(query);
                  }, newMatch);
                } else {
                  if (query) {
                    // query is an array
                    // check if all of the query items are in the value array
                    newMatch = query.reduce((prevQueryMatch, q) => {
                      return prevQueryMatch && arrayValue.includes(q);
                    }, true);
                  }
                }
              }
            }
          }

          // Final decision on this value
          if (filters.queryMode === 'and') {
            return prevMatch && newMatch;
          }
          return prevMatch || newMatch;
        },
        filters.queryMode === 'and' ? true : false
      );
    }

    // Check range filters
    let rangeMatch = true;
    if (filters.ranges && filters.ranges.length) {
      rangeMatch = filters.ranges.reduce(
        (prevMatch, filter) => {
          let newMatch = true;
          const value = postInfo[filter.property];
          if (value) {
            // out of range (start)
            if (filter.start) {
              if (value < filter.start) {
                newMatch = false;
              }
            }

            // out of range (end)
            if (filter.end) {
              if (value >= filter.end) {
                newMatch = false;
              }
            }
          }

          // Final decision on this value
          if (filters.rangeMode === 'and') {
            return newMatch && prevMatch;
          }
          return newMatch || prevMatch;
        },
        filters.rangeMode === 'and' ? true : false
      );
    }

    return queryAllMatch && queryMatch && rangeMatch;
  };
};

// Color the filter icon if any filter is set
export const checkFilterActive = (filters: Partial<PostFilters>): boolean => {
  if (!filters.enabled) return false;

  if (filters.queryAll) return true;
  if (filters?.queries?.length) return true;
  if (filters?.ranges?.length) return true;

  return false;
};

const PostFilter = ({ filters, setFilters }: PostFilterProps) => {
  // const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchQuery, tsearchQuery, setSearchQuery] =
    useThrottledState<string>('');
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [isSortActive, setIsSortActive] = useState<boolean>(false);

  // Color the sort icon if any sorting option is set
  const checkSortActive = (): boolean => {
    if (!filters.enabled) return false;
    if (filters?.sort?.length) return true;
    return false;
  };

  // Simple search from search input field
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      queryAll: tsearchQuery,
    }));
  }, [tsearchQuery]);

  // Color the icons if filter/sorting options are set
  useEffect(() => {
    setIsFilterActive(checkFilterActive(filters));
    setIsSortActive(checkSortActive());
  }, [filters]);

  const t = useText(blogTexts);
  return (
    <SPostFilter>
      <PostCount className="highlight">
        {searchQuery
          ? '"' + searchQuery + '" ' + t('searchResults')
          : t('blog')}
      </PostCount>
      <FilterActions>
        <HideMobile>
          <SearchInput
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </HideMobile>
        <FunnelFill
          style={{ fontSize: '1.25rem' }}
          className={isFilterActive ? 'active' : undefined}
        />
        <Asset
          src="sort.png"
          width="1.25rem"
          height="1.25rem"
          spriteX={5}
          spriteY={2}
          hoverable={true}
          offsetX={isSortActive ? 1 : undefined}
        />
      </FilterActions>
    </SPostFilter>
  );
};

const SPostFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;
`;

const PostCount = styled.h1`
  line-height: 1;
  margin: 0;
`;

const FilterActions = styled.div`
  display: flex;
  align-items: center;
  & span.asset__span {
    margin-left: 16px;
  }
  & svg {
    fill: ${({ theme }) => theme.textColor.default};
    flex-shrink: 0;
    cursor: pointer;
    margin-left: 16px;
  }
  & svg:hover,
  & svg.active {
    fill: ${({ theme }) => theme.color.primary.default};
  }
`;

const SearchInput = styled(Input)`
  margin-right: 8px;
`;

export default PostFilter;
