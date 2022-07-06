import React from 'react';
import styled from 'styled-components/macro';

type Props = {
  type: React.HTMLInputTypeAttribute;
  id?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const Input = (props: Props) => {
  return <SInput {...props} />;
};

const SInput = styled.input`
  border: 1px solid ${({ theme }) => theme.color.gray.default};
  outline-color: ${({ theme }) => theme.color.primary.default};
  border-radius: 8px;
  font-size: 1rem;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.color.gray.default};
  color: ${({ theme }) => theme.textColor.default};
  &::placeholder {
    color: ${({ theme }) => theme.textColor.gray.default};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.primary.default};
    background-color: ${({ theme }) => theme.color.primary.background};
  }
`;

export default Input;
