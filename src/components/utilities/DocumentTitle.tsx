import React, { useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsProvider';
import titleTexts from '../../texts/titleTexts';
import useText, { MultiLangText } from '../../hooks/useText';
import { Helmet } from 'react-helmet';

const DocumentTitle = ({ title }: { title?: MultiLangText }) => {
  const { documentTitle, setDocumentTitle } = useSettings();
  const t = useText({
    ...titleTexts,
    documentTitle: documentTitle[documentTitle.length - 1],
  });

  const firstPathName = (): string => {
    const pathparts = location.pathname.split('/');

    if (pathparts.length > 1) {
      return '/' + pathparts[1];
    }
    return '/';
  };

  useEffect(() => {
    if (title) setDocumentTitle((prev) => [...prev, title]);
    return () => {
      if (title) setDocumentTitle((prev) => prev.slice(0, -1));
    };
  }, []);

  let finalTitle = t('documentTitle') || t(firstPathName());
  finalTitle && (finalTitle += ' - ');
  finalTitle += t('main');

  return (
    <Helmet>
      <title>{finalTitle}</title>
    </Helmet>
  );
};

export default DocumentTitle;
