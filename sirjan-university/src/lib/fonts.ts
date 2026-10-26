import localFont from 'next/font/local';

/** Fonts are self-hosted from the @fontsource packages: no third-party font requests at runtime. */
export const vazirmatn = localFont({
  src: [
    { path: '../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2', weight: '100 900', style: 'normal' },
    { path: '../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-latin-wght-normal.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-vazirmatn',
  display: 'swap',
  fallback: ['Tahoma', 'sans-serif'],
});

export const inter = localFont({
  src: [
    { path: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', weight: '100 900', style: 'normal' },
    { path: '../../node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2', weight: '100 900', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['Segoe UI', 'Arial', 'sans-serif'],
});
