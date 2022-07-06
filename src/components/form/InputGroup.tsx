import React from 'react';
import styled from 'styled-components/macro';
import { InputControl } from '../../hooks/useInput';
import Label from '../../styles/Label';

type PropTypes<T, E> = {
  label: string;
  description?: string;
  className?: string;
  id?: string;
  control: InputControl<T, E>;
  children?: React.ReactNode;
};

const InputGroup = <T, E>({
  label,
  description,
  className,
  id,
  control,
  children,
}: PropTypes<T, E>) => {
  const { message } = control;

  return (
    <Container className={className}>
      <Label htmlFor={id}>{label}</Label>
      <InputDescription>{description}</InputDescription>
      {children}
      <InputMessage>{message}</InputMessage>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const InputDescription = styled.p``;

const InputMessage = styled.p``;

export default InputGroup;
