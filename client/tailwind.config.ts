import type { Config } from 'tailwindcss';

import daisyui from 'daisyui';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'night'],
    darkTheme: 'night',
  },
} as unknown as Config;

export default config;
