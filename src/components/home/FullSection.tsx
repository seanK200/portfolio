import styled from 'styled-components';

const FullSection = styled.section<{ headerHeight?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: ${({ headerHeight }) => headerHeight || 0}px;
`;

export default FullSection;
