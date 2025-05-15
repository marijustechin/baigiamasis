import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Restore theme on load
  useEffect(() => {
    const saved = localStorage.getItem('theme') ?? 'light';
    setIsDark(saved === 'dark');
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dark = e.target.checked;
    const theme = dark ? 'dark' : 'light';
    setIsDark(dark);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <input
      name="theme-toggle"
      type="checkbox"
      className="toggle"
      checked={isDark}
      onChange={handleToggle}
    />
  );
};
