import styled from 'styled-components/macro';
import breakpoints from '../../styles/breakpoints';

const FullSection = styled.section<{ headerHeight?: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media screen and (max-width: ${breakpoints.mobile}px) {
    padding: 88px 0;
  }
`;

export default FullSection;
