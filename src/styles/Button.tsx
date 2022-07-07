import styled from 'styled-components/macro';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 8px 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  background: none;
  cursor: pointer;
  &.small {
    font-size: 1rem;
    padding: 6px 12px;
  }
  &.primary {
    color: ${({ theme }) => theme.textColor.primary.default};
    background-color: ${({ theme }) => theme.color.primary.default};
    border-color: ${({ theme }) => theme.color.primary.default};
  }
  &.primary.border {
    color: ${({ theme }) => theme.color.primary.default};
  }
  &.secondary {
    color: ${({ theme }) => theme.textColor.secondary.default};
    background-color: ${({ theme }) => theme.color.secondary.default};
    border-color: ${({ theme }) => theme.color.secondary.default};
  }
  &.secondary.border {
    color: ${({ theme }) => theme.color.secondary.default};
  }
  &.dangerous {
    color: ${({ theme }) => theme.textColor.dangerous.default};
    background-color: ${({ theme }) => theme.color.dangerous.default};
    border-color: ${({ theme }) => theme.color.dangerous.default};
  }
  &.dangerous.border {
    color: ${({ theme }) => theme.color.dangerous.default};
  }
  &:disabled.primary {
    color: ${({ theme }) => theme.textColor.primary.disabled};
    background-color: ${({ theme }) => theme.color.primary.disabled};
    border-color: ${({ theme }) => theme.color.primary.disabled};
  }
  &:disabled.primary.border {
    color: ${({ theme }) => theme.color.primary.disabled};
  }
  &:disabled.secondary {
    color: ${({ theme }) => theme.textColor.secondary.disabled};
    background-color: ${({ theme }) => theme.color.secondary.disabled};
    border-color: ${({ theme }) => theme.color.secondary.disabled};
  }
  &:disabled.secondary.border {
    color: ${({ theme }) => theme.color.secondary.disabled};
  }
  &:disabled.dangerous {
    color: ${({ theme }) => theme.textColor.dangerous.disabled};
    background-color: ${({ theme }) => theme.color.dangerous.disabled};
    border-color: ${({ theme }) => theme.color.dangerous.disabled};
  }
  &:disabled.dangerous.border {
    color: ${({ theme }) => theme.color.dangerous.disabled};
  }
  &.border {
    background: none;
  }
  & span.button__text {
    display: block;
    position: relative;
    top: 1px;
  }
`;

export default Button;
