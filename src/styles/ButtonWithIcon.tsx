import styled from 'styled-components/macro';
import Button from './Button';

const ButtonWithIcon = styled(Button)`
  & img,
  & span {
    margin-right: 10px;
  }
`;

export default ButtonWithIcon;
