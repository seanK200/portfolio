import { MultiLangTextsDef } from '../hooks/useText';

export const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const monthNamesShort: string[] = monthNames.map((month) =>
  month.slice(0, 3)
);

const dateTexts: MultiLangTextsDef = {
  justnow: {
    ko: '방금 전',
    en: 'Just now',
  },
  seconds: {
    ko: (args) => `${args.seconds}초 ${args.seconds >= 0 ? '전' : '후'}`,
    en: (args) => {
      let str = `${args.seconds} second`;
      if (typeof args.seconds === 'number') {
        str += Math.abs(args.seconds) > 1 ? 's ' : ' ';
      }
      str += args.seconds >= 0 ? 'ago' : 'later';
      return str;
    },
  },
  minutes: {
    ko: (args) => `${args.minutes}분 ${args.minutes >= 0 ? '전' : '후'}`,
    en: (args) => {
      let str = `${args.minutes} minute`;
      if (typeof args.minutes === 'number') {
        str += Math.abs(args.minutes) > 1 ? 's ' : ' ';
      }
      str += args.minutes >= 0 ? 'ago' : 'later';
      return str;
    },
  },
  hours: {
    ko: (args) => `${args.hours}시간 ${args.hours >= 0 ? '전' : '후'}`,
    en: (args) => {
      let str = `${args.hours} hour`;
      if (typeof args.hours === 'number') {
        str += Math.abs(args.hours) > 1 ? 's ' : ' ';
      }
      str += args.hours >= 0 ? 'ago' : 'later';
      return str;
    },
  },
  days: {
    ko: (args) => `${args.days}일 ${args.days >= 0 ? '전' : '후'}`,
    en: (args) => {
      let str = `${args.days} day`;
      if (typeof args.days === 'number') {
        str += Math.abs(args.days) > 1 ? 's ' : ' ';
      }
      str += args.days >= 0 ? 'ago' : 'later';
      return str;
    },
  },
  date: {
    ko: (args) => `${args.y}년 ${args.m}월 ${args.d}일`,
    en: (args) =>
      `${args.d} ${typeof args.m === 'number' ? monthNames[args.m] : args.m} ${
        args.y
      }`,
  },
  time: {
    ko: (args) => `${args.H}:${args.M}:${args.S}`,
    en: (args) => `${args.H}:${args.M}:${args.S}`,
  },
};

export default dateTexts;
