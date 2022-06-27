import styled from 'styled-components';
import { LanguageName } from '../contexts/SettingsProvider';

const Highlight = styled.span<{ lang: LanguageName }>`
  font-family: ${({ lang }) => (lang === 'en' ? 'Righteous' : 'Pretendard')};
  font-weight: ${({ lang }) => (lang === 'en' ? '400' : '600')};
`;

export default Highlight;
