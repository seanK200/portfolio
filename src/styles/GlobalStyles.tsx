import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyles = createGlobalStyle`
   body {
    color: ${({ theme }) => theme.textColor.default};
    background-color: ${({ theme }) => theme.color.background};
   }

   h1, h2, h3, h4, h5, h6, p {
    display: block;
    line-height: 1.4;
   }

   h1 {
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 1.5rem;
   }

   p ~ h1 {
    margin-top: 3.5rem;
   }

   h2 {
    font-size: 2rem;
    font-weight: 300;
    color: ${({ theme }) => theme.color.primary.default};
    margin-bottom: 1.5rem;
   }

   p ~ h2 {
    margin-top: 3rem;
   }

   h3 {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 1.5rem;
   }

   p ~ h3 {
    margin-top: 2rem;
   }

   h4 {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.primary.default};
    margin-bottom: 1.5rem;
   }

   p ~ h4 {
    margin-top: 2rem;
   }

   h5 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
   }

   p ~ h5 {
    margin-top: 2rem;
   }

   h6 {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.color.primary.default};
    margin-bottom: 1rem;
   }

   p ~ h6 {
    margin-top: 2rem;
   }

   p {
    line-height: 1.5;
    margin-bottom: 0.75rem;
   }

   p.highlight {
    font-size: 1.25rem;
    font-weight: 300;
   }

   blockquote {
    background-color: ${({ theme }) => theme.color.primary.background};
    padding: 16px 24px;
    display: flex;
    align-items: center;
   }
`;

export default GlobalStyles;
