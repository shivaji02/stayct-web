import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        stayct: {
          'beige': '#f2ede3',
          'green-dark': '#1a3326',
          'green-medium': '#4a6456',
          'green-accent': '#2d6a4f',
          'green-light': '#6aad8a',
          'green-lighter': '#7aad90',
          'border': '#c8d9cf',
          'border-light': '#b8c9be',
          'bg-light': '#e0ede8',
          'text-light': '#c0ddd0',
          'overlay-light': '#d8ece2',
          'text-link': '#5a9070',
          'text-muted': '#8aad9a',
        },
      },
      fontFamily: {
        nunito: ["'Nunito'", 'sans-serif'],
      },
      fontSize: {
        '10px': '10px',
        '11px': '11px',
        '13px': '13px',
        '15px': '15px',
        '17px': '17px',
        '19px': '19px',
        '21px': '21px',
        '26px': '26px',
        '40px': '40px',
        '60px': '60px',
        '100px': '100px',
      },
      lineHeight: {
        '0.94': '0.94',
        '1.55': '1.55',
        '1.6': '1.6',
        '1.7': '1.7',
        '1.75': '1.75',
      },
      letterSpacing: {
        '0.01em': '0.01em',
        '0.02em': '0.02em',
        '0.03em': '0.03em',
        '0.04em': '0.04em',
        '0.1em': '0.1em',
        '0.12em': '0.12em',
        '0.13em': '0.13em',
        '0.18em': '0.18em',
      },
      maxWidth: {
        '340px': '340px',
        '440px': '440px',
        '580px': '580px',
        '860px': '860px',
      },
      spacing: {
        '84px': '84px',
        '100px': '100px',
      },
      borderRadius: {
        '6px': '6px',
        '10px': '10px',
        '14px': '14px',
        '20px': '20px',
      },
    },
  },
  plugins: [],
};

export default config;
