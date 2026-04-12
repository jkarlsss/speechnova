import { createAvatar } from '@dicebear/core';
import { glass } from '@dicebear/collection';
import { useMemo } from 'react';

export function useVoiceAvatar(seed: string) {
  return useMemo(() => {
    return createAvatar(glass, {
      seed,
      size: 128,
    }).toDataUri();
  }, [seed])
}

