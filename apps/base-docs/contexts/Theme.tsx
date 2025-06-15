import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type Theme = 'light' | 'dark';
type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.toggle('dark');
  }, []);

  useEffect(() => {
    const rootElement = document.documentElement;
    if (!rootElement) return;

    const updateTheme = () => {
      requestAnimationFrame(() => {
        setTheme(rootElement.classList.contains('dark') ? 'dark' : 'light');
      });
    };

    const observer = new MutationObserver(updateTheme);
    observer.observe(rootElement, { attributes: true, attributeFilter: ['class'] });

    updateTheme();

    return () => observer.disconnect();
  }, []);

  const values = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}
