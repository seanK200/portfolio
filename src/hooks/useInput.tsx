import React, { useEffect, useState } from 'react';
import { useSettings } from '../contexts/SettingsProvider';
import { MultiLangText } from './useText';

interface InputMessages {
  valid?: MultiLangText;
  invalid?: MultiLangText;
  loading?: MultiLangText;
  success?: MultiLangText;
  error?: MultiLangText;
  saved?: MultiLangText;
  unsavedChangesExist?: MultiLangText;
  saving?: MultiLangText;
  saveFailed: MultiLangText;
  numberTooSmall: MultiLangText;
  numberTooBig: MultiLangText;
  lengthTooShort?: MultiLangText;
  lengthTooLong?: MultiLangText;
  requiredLeftEmpty?: MultiLangText;
  isNotEmail?: MultiLangText;
  isNotNumber?: MultiLangText;
  isNotAlphabet?: MultiLangText;
  illegalCharacters: MultiLangText;
  valueNotAvailable?: MultiLangText;
}

export interface InputControl<T, E> {
  setValue: React.Dispatch<React.SetStateAction<T | undefined>>;
  displayValue: string | T | undefined;
  message: string | undefined;
  validate: () => boolean;
  sanitize: () => void;
  resetInput: () => void;
  handleInputFocus: (e: React.FocusEvent<E>) => void;
  handleInputBlur: (e: React.FocusEvent<E>) => void;
}

const defaultMessages: InputMessages = {
  valid: {
    ko: '',
    en: '',
  },
  invalid: {
    ko: '유효하지 않은 값입니다.',
    en: 'Invalid value',
  },
  loading: {
    ko: '로딩 중입니다..',
    en: 'Loading..',
  },
  success: {
    ko: '성공',
    en: 'Success',
  },
  error: {
    ko: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
    en: 'An error occured. Please try again later.',
  },
  saved: {
    ko: '변경사항이 저장되었습니다.',
    en: 'Changes saved',
  },
  unsavedChangesExist: {
    ko: '저장되지 않은 변경사항이 있습니다.',
    en: 'You have unsaved changes.',
  },
  saving: {
    ko: '저장 중입니다..',
    en: 'Saving..',
  },
  saveFailed: {
    ko: '변경사항 저장에 실패하였습니다.',
    en: 'Failed to save changes',
  },
  numberTooSmall: {
    ko: '입력값이 최솟값 제한에 미달하였습니다.',
    en: 'Too small',
  },
  numberTooBig: {
    ko: '입력값이 최댓값 제한을 초과하였습니다.',
    en: 'Too big',
  },
  lengthTooShort: {
    ko: '최소 글자 수 제한보다 짧습니다.',
    en: 'Too short',
  },
  lengthTooLong: {
    ko: '최대 글자 수 제한을 초과하였습니다.',
    en: 'Too long',
  },
  requiredLeftEmpty: {
    ko: '필수 입력 항목입니다.',
    en: 'Required field',
  },
  isNotEmail: {
    ko: '이메일 주소가 유효하지 않습니다.',
    en: 'Invalid email address',
  },
  isNotNumber: {
    ko: '숫자(0~9)만 입력 가능합니다.',
    en: 'Numbers(0-9) only',
  },
  illegalCharacters: {
    ko: '사용 불가능한 문자가 포함되어 있습니다.',
    en: 'Illegal character(s) exist',
  },
  valueNotAvailable: {
    ko: '이 값은 사용할 수 없습니다.',
    en: 'Unavailable',
  },
};

const useInput = <T, E>({
  initialValue,
  displayValue: deriveDisplayValue,
  messages = defaultMessages,
  required = false,
  length = 0,
  range = 0,
  validator,
  sanitizor,
  onFocus,
  onBlur,
}: {
  initialValue?: T;
  displayValue?: (value: T | undefined) => string;
  messages?: InputMessages;
  required?: boolean;
  length?: number | [number, number];
  range?: number | [number, number];
  validator?: (value: T | undefined) => keyof InputMessages;
  sanitizor?: (value: T | undefined) => T;
  onFocus: React.FocusEventHandler<E>;
  onBlur: React.FocusEventHandler<E>;
}) => {
  messages = { ...defaultMessages, ...messages };

  const { language } = useSettings();

  const [value, setValue] = useState<T | undefined>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [doValidate, setDoValidate] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>('');

  const displayValue =
    typeof deriveDisplayValue === 'function'
      ? deriveDisplayValue(value)
      : value;

  const sanitize = (): void => {
    if (value && typeof sanitizor === 'function')
      setValue((prev) => sanitizor(prev));
  };

  const getMessageKey = (): keyof InputMessages => {
    // required
    if (required && value === undefined) return 'requiredLeftEmpty';

    // length
    if (length && typeof value === 'string') {
      if (typeof length === 'number' && length !== 0) {
        if (value.length > length) {
          return 'lengthTooLong';
        }
      } else if (typeof length === 'object' && length.length) {
        if (length[1] >= 0 && value.length > length[1]) return 'lengthTooLong';
        if (value.length < length[0]) return 'lengthTooShort';
      }
    }

    // range
    if (range && typeof value === 'number') {
      if (typeof range === 'number' && range !== 0) {
        if (value > range) return 'numberTooBig';
      } else if (typeof range === 'object' && range.length) {
        if (range[1] >= 0 && value > range[1]) return 'numberTooBig';
        if (value < range[0]) return 'numberTooSmall';
      }
    }

    // custom validator
    if (typeof validator === 'function') {
      return validator(value);
    }

    return 'valid';
  };

  const validate = (): boolean => {
    if (!doValidate) setDoValidate(true);

    const messageKey = getMessageKey();
    const message = messages[messageKey];
    if (message) {
      setMessage(message[language]);
    }

    return messageKey === 'valid';
  };

  const resetInput = () => {
    setValue(initialValue);
    setIsValid(false);
    setDoValidate(false);
    setMessage('');
  };

  const handleInputFocus = (e: React.FocusEvent<E>) => {
    typeof onFocus === 'function' && onFocus(e);
  };

  const handleInputBlur = (e: React.FocusEvent<E>) => {
    if (!doValidate) setDoValidate(true);
    typeof onBlur === 'function' && onBlur(e);
  };

  useEffect(() => {
    if (doValidate) validate();
  }, [value]);

  const inputControl = {
    value,
    setValue,
    displayValue,
    isValid,
    doValidate,
    message,
    validate,
    sanitize,
    resetInput,
    handleInputFocus,
    handleInputBlur,
  };

  return [value, isValid, inputControl];
};

export default useInput;
