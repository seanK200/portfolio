import React, { useEffect, useState } from 'react';
import useText from '../../hooks/useText';
import dateTexts from '../../texts/dateTexts';

type Props = {
  date: Date | string;
  showDiffUntil?: 'justnow' | 'seconds' | 'minutes' | 'hours' | 'days';
  format?: 'date' | 'time' | 'datetime'; // predefined format in dateTexts
  formatter?: (d: Date) => string; // custom formatter function. overrides all
  style?: React.CSSProperties;
  className?: string;
};

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

const DateTime = ({
  date: dateProp,
  showDiffUntil,
  format,
  formatter,
  style,
  className,
}: Props) => {
  const date: Date =
    typeof dateProp === 'string' ? new Date(dateProp) : dateProp;

  const [formattedDate, setFormattedDate] = useState<string>('');
  const t = useText(dateTexts);
  const d = {
    y: date.getFullYear(),
    m: date.getMonth(),
    d: date.getDate(),
    H: date.getHours(),
    M: date.getMinutes(),
    S: date.getSeconds(),
  };

  const getFullDate = (): string => {
    if (!date) return '';
    return t('date', { args: { ...d } }) + ' ' + t('time', { args: { ...d } });
  };

  const formatDate = (): string => {
    if (!date) return '';

    if (typeof formatter === 'function') {
      return formatter(date);
    }

    if (showDiffUntil) {
      const current = new Date();
      const diff = current.getTime() - date.getTime(); // seconds
      if (diff < SECOND * 5 && showDiffUntil === 'justnow') {
        return t('justnow');
      } else if (
        SECOND * 5 < diff &&
        diff < MINUTE &&
        showDiffUntil === 'seconds'
      ) {
        return t('seconds', { args: { seconds: Math.floor(diff / SECOND) } });
      } else if (MINUTE < diff && diff < HOUR && showDiffUntil === 'minutes') {
        return t('minutes', { args: { minutes: Math.floor(diff / MINUTE) } });
      } else if (HOUR < diff && diff < DAY && showDiffUntil === 'hours') {
        return t('hours', { args: { hours: Math.floor(diff / HOUR) } });
      } else if (DAY < diff && diff < WEEK && showDiffUntil === 'days') {
        return t('days', { args: { days: Math.floor(diff / DAY) } });
      }
    }

    if (format) {
      switch (format) {
        case 'date':
          return t('date', { args: { ...d } });
        case 'time':
          return t('time', { args: { ...d } });
      }
    }

    return getFullDate();
  };

  useEffect(() => {
    setFormattedDate(formatDate());
  }, [date]);

  return (
    <span
      style={style}
      className={`datetime__span${className ? ' ' + className : ''}`}
    >
      {formattedDate}
    </span>
  );
};

export default DateTime;
