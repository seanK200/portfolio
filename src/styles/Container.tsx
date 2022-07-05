import styled from 'styled-components';
import breakpoints from './breakpoints';

const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  padding: 0 48px 48px 48px;
  margin: 0 auto;
  @media screen and (max-width: ${breakpoints.mobile}px) {
    padding: 0 36px 36px 36px;
  }
`;

export default Container;
