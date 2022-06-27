import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Asset from '../components/utilities/Asset';

const ScrollGuide = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const handleClick: React.MouseEventHandler = () => {
    navigate('#portfolio');
  };

  return (
    <SScrollGuide onClick={handleClick}>
      {children}
      <Asset
        src="scroll_guides.png"
        width="26px"
        height="12px"
        spriteX={4}
        spriteY={2}
        offsetX={1}
        hoverable={true}
      />
    </SScrollGuide>
  );
};

const SScrollGuide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.color.primary.default};
  & span {
    margin-top: 12px;
    position: relative;
    animation: bounce 1.875s ease-in-out 0s infinite alternate;
  }

  @keyframes bounce {
    0% {
      top: 0px;
    }
    20% {
      top: 4px;
    }
    40%,
    100% {
      top: 0px;
    }
  }
`;

export default ScrollGuide;
