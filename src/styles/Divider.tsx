import styled from 'styled-components/macro';

const Divider = styled.hr<{ color?: string; margin?: string; border?: string }>`
  border-top: ${({ border, color, theme }) =>
    border ? border : `0.5px solid ${color ? color : theme.textColor.default}`};
  margin: ${({ margin }) => (margin ? margin : '8px 0')};
  width: 100%;
`;

export default Divider;
