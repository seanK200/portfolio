import styled from 'styled-components';
import Button from './Button';

const ButtonWithIcon = styled(Button)`
  & img {
    margin-right: 8px;
  }
`;

export default ButtonWithIcon;
