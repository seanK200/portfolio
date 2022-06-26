import React, { useState } from 'react';
import styled from 'styled-components';
import Label from '../../styles/Label';

type PropTypes = {
  children: React.ReactNode;
  label?: string;
  id?: string;
  style?: React.CSSProperties;
  selectedValue?: string;
  selectValue?: (value: string) => void;
};

const Selector = ({
  children,
  label,
  id,
  selectedValue,
  selectValue,
}: PropTypes) => {
  const [_selectedValue, _selectValue] = useState<string>('');

  selectedValue = selectedValue || _selectedValue;
  selectValue = selectValue || _selectValue;

  return (
    <Container className="selector__container">
      <Label htmlFor={id}>{label}</Label>
      <SSelector id={id} role="menu">
        {React.Children.map(children, (child) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return React.cloneElement(child, {
            onSelect: selectValue,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            selected: selectedValue === child?.props?.value,
          });
        })}
      </SSelector>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const SSelector = styled.ul`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.color.primary.background};
  padding: 8px;
  border-radius: 8px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`;

export default Selector;
