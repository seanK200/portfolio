import DOMPurify from 'dompurify';
import { marked } from 'marked';

// type useMarkdownOptions = {
//   textContent?: boolean;
//   options?: marked.MarkedOptions;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   callback?: ((error: any, parseResult: string) => void);
// }

// const useMarkdown = (
//   md: string | undefined,
//   parseOptions: useMarkdownOptions = {}
// ) => {
//   const { textContent, options, callback } = parseOptions;

//   const [html, setHtml] = useState<string>('');

// const parse = (md: string): string => {
//   return marked.parse(md, options, callback);
// };

// const sanitize = (htmlstring: string): string => {
//   return DOMPurify.sanitize(htmlstring);
// };

// const extractText = (s: string) => {
//   return s.replace(/<(?:.|\n)*?>/gm, '');
// }

//   useEffect(() => {
//     if (md) {
//       const sanitized = sanitize(parse(md));
//       setHtml(textContent ? extractText(sanitized) : sanitized);
//     } else {
//       setHtml('');
//     }
//   }, [md]);

//   return html;
// };

type useMarkdownOptions = {
  textContent: boolean;
  markedOptions: marked.MarkedOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markedCallback: (error: any, parseResult: string) => void;
};

const useMarkdown = (options: Partial<useMarkdownOptions> = {}) => {
  const parse = (md: string): string => {
    return marked.parse(md, options.markedOptions, options.markedCallback);
  };

  const sanitize = (htmlstring: string): string => {
    return DOMPurify.sanitize(htmlstring);
  };

  const extractText = (s: string) => {
    return s.replace(/<(?:.|\n)*?>/gm, '');
  };

  const parsemd = (
    md: string | undefined,
    optionsOverride?: Partial<useMarkdownOptions>
  ): string => {
    if (md) {
      optionsOverride = { ...options, ...optionsOverride };
      const { textContent } = optionsOverride;
      let htmlString = sanitize(parse(md));
      if (textContent) htmlString = extractText(htmlString);
      return htmlString;
    }
    return '';
  };

  return parsemd;
};

export default useMarkdown;
