'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMediaQuery } from 'usehooks-ts';

type CardRef = {
  blobRef: React.RefObject<HTMLDivElement>;
  fakeBlobRef: React.RefObject<HTMLDivElement>;
};
export type CardsContextProps = {
  registerCard: (id: string, cardRef: CardRef) => void;
  unregisterCard: (id: string) => void;
};

export const CardsContext = createContext<CardsContextProps>({
  registerCard: function () {
    return undefined;
  },
  unregisterCard: function () {
    return undefined;
  },
});

export function useCards() {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
}

type CardsProviderProps = {
  children?: ReactNode;
};

/*
The shimmer effect is based on mouse movements.
To avoid registering a "mousemove" for each card, we have this provider
to use only one event
*/
export default function CardsProvider({ children }: CardsProviderProps) {
  const [cards, setCards] = useState<Record<string, CardRef>>({});
  const isDesktop = useMediaQuery('(min-width: 768px)');
  useEffect(() => {
    if (!isDesktop) return;
    const handleInteraction = (ev: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in ev ? ev.touches[0].clientX : ev.clientX;
      const clientY = 'touches' in ev ? ev.touches[0].clientY : ev.clientY;

      Object.values(cards).forEach(({ blobRef, fakeBlobRef }) => {
        if (blobRef.current && fakeBlobRef.current) {
          const rec = fakeBlobRef.current.getBoundingClientRect();

          blobRef.current.animate(
            [
              {
                transform: `translate(${clientX - rec.left - rec.width / 2}px,${
                  clientY - rec.top - rec.height / 2
                }px)`,
              },
            ],
            {
              duration: 300,
              fill: 'forwards',
            },
          );
          blobRef.current.classList.remove('opacity-0');
        }
      });
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchmove', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchmove', handleInteraction);
    };
  }, [cards, isDesktop]);

  const registerCard = useCallback((id: string, cardRef: CardRef) => {
    setCards((prevCards) => ({ ...prevCards, [id]: cardRef }));
  }, []);

  const unregisterCard = useCallback((id: string) => {
    setCards((prevCards) => {
      const newCards = { ...prevCards };
      delete newCards[id];
      return newCards;
    });
  }, []);

  const values = useMemo(() => {
    return { registerCard, unregisterCard };
  }, [registerCard, unregisterCard]);

  return <CardsContext.Provider value={values}>{children}</CardsContext.Provider>;
}
