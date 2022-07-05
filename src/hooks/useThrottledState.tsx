import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

type InitialState<T> = T | (() => T);

const useThrottledState = <T,>(
  initialState: InitialState<T>,
  timeout = 1000
): [T, T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialState);
  const [tState, setTState] = useState<T>(initialState); // throttled state

  const throttledSetValue = useCallback(
    _.throttle((newState) => {
      setTState(newState);
    }, timeout),
    []
  );

  useEffect(() => throttledSetValue(state), [state]);

  return [state, tState, setState];
};

export default useThrottledState;
