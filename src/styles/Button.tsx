import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
  padding: 8px 16px;
  border: none;
  background: none;
  cursor: pointer;
  & span.button__text {
    display: block;
    position: relative;
    top: 1px;
  }
`;

export default Button;