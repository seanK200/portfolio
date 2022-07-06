import styled from 'styled-components/macro';

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.color.dangerous.default};
`;

export default ErrorMessage;
