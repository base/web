// github.com/mantinedev/mantine/blob/master/packages/@mantine/hooks/src/use-focus-within/use-focus-within.ts
import { useCallback, useEffect, useRef, useState } from 'react';

export type UseFocusWithinOptions = {
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

function containsRelatedTarget(event: FocusEvent) {
  if (event.currentTarget instanceof HTMLElement && event.relatedTarget instanceof HTMLElement) {
    return event.currentTarget.contains(event.relatedTarget);
  }

  return false;
}

export function useFocusWithin<T extends HTMLElement = unknown>({
  onBlur,
  onFocus,
}: UseFocusWithinOptions = {}): { ref: React.MutableRefObject<T>; focused: boolean } {
  const ref = useRef<T>();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [focused, _setFocused] = useState(false);
  const focusedRef = useRef(false);
  const setFocused = (value: boolean) => {
    _setFocused(value);
    focusedRef.current = value;
  };

  const handleFocusIn = useCallback(
    (event: FocusEvent) => {
      if (!focusedRef.current) {
        setFocused(true);
        onFocus?.(event);
      }
    },
    [onFocus],
  );

  const handleFocusOut = useCallback(
    (event: FocusEvent) => {
      if (focusedRef.current && !containsRelatedTarget(event)) {
        setFocused(false);
        onBlur?.(event);
      }
    },
    [onBlur],
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('focusin', handleFocusIn);
      ref.current.addEventListener('focusout', handleFocusOut);

      return () => {
        ref.current?.removeEventListener('focusin', handleFocusIn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current?.removeEventListener('focusout', handleFocusOut);
      };
    }

    return undefined;
  }, [handleFocusIn, handleFocusOut]);

  return { ref: ref as React.MutableRefObject<T>, focused };
}
