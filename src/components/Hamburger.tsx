import React, { useState } from 'react';
import styled from 'styled-components/macro';

interface StyledProps {
  width: string;
  height: string;
  color: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

interface Props extends StyledProps {
  pressedColor: string;
  pressed: boolean;
}

const Hamburger = (props: Partial<Props>) => {
  const [_pressed, setPressed] = useState<boolean>(false);
  const pressed = props.pressed === undefined ? _pressed : props.pressed;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setPressed((prev) => !prev);
    typeof props.onClick === 'function' && props.onClick(e);
  };

  const width = props.width
    ? props.width
    : props.height
    ? props.height
    : '1rem';
  const height = props.height
    ? props.height
    : props.width
    ? props.width
    : '1rem';
  const color = pressed
    ? props.pressedColor || props.color || ''
    : props.color || '';

  return (
    <Container
      width={width}
      height={height}
      color={color}
      onClick={handleClick}
      role="button"
    >
      <span className={`first${pressed ? ' pressed' : ''}`}></span>
      <span className={`second${pressed ? ' pressed' : ''}`}></span>
      <span className={`third${pressed ? ' pressed' : ''}`}></span>
    </Container>
  );
};

const Container = styled.div<StyledProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  & > span {
    width: 100%;
    height: ${({ height }) => `calc(${height} / 5)`};
    background-color: ${({ color, theme }) => color || theme.textColor.default};
    position: absolute;
    transform: rotate(0deg);
    transition: 0.3s ease-in-out;
    border-radius: ${({ height }) => `calc(${height} / 10)`};
  }
  & > span.first {
    top: 0;
  }
  & > span.second {
    top: 50%;
    transform: translateY(-50%);
  }
  & > span.third {
    top: 100%;
    transform: translateY(-100%);
  }

  & > span.first.pressed {
    top: 50%;
    transform: translateY(-50%) rotate(135deg);
  }

  & > span.second.pressed {
    opacity: 1;
    transform: translateX(-100%) translateY(-50%);
  }

  & > span.third.pressed {
    top: 50%;
    transform: translateY(-50%) rotate(-135deg);
  }
`;

export default Hamburger;
