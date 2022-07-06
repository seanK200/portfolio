import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

const useMarkdown = (
  md: string | undefined,
  options: marked.MarkedOptions | undefined = undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: ((error: any, parseResult: string) => void) | undefined = undefined
) => {
  const [html, setHtml] = useState<string>('');

  const parse = (md: string): string => {
    return marked.parse(md, options, callback);
  };

  const sanitize = (htmlstring: string): string => {
    return DOMPurify.sanitize(htmlstring);
  };

  useEffect(() => {
    if (md) {
      setHtml(sanitize(parse(md)));
    } else {
      setHtml('');
    }
  }, [md]);

  return html;
};

export default useMarkdown;
