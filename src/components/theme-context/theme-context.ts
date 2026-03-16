import { createContext, useContext } from 'react';

// Määritellään teeman tyypit
export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Luodaan Context (oletusarvona undefined, jotta voimme heittää virheen hookissa)
export const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

// Viedään ulos vain tämä funktio/hook
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};