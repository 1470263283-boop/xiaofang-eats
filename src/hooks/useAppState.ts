import { useEffect, useState } from 'react';
import { loadAppState, saveAppState } from '../utils/storage';

export function useAppState() {
  const [state, setState] = useState(loadAppState);

  useEffect(() => {
    saveAppState(state);
  }, [state]);

  return [state, setState] as const;
}
