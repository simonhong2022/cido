// Design Tokens - Cido Frontend
// 기본 디자인 시스템 토큰 (Figma 연동 전 사용)

export const colors = {
  // Brand Colors
  'primary': '#000000',
  'secondary': '#8E8E93',
  'accent': '#3B82F6',
  
  // Text Colors
  'text': '#FFFFFF',
  'text-primary': '#FFFFFF',
  'text-secondary': '#8E8E93',
  'text-dark': '#000000',
  
  // Background Colors
  'background': '#000000',
  'background-light': '#FFFFFF',
  'surface': '#1A1A1A',
  'surface-light': '#F5F5F5',
  
  // Semantic Colors
  'success': '#10B981',
  'warning': '#F59E0B',
  'error': '#EF4444',
  'info': '#3B82F6',
  
  // Neutral Colors
  'gray-50': '#F9FAFB',
  'gray-100': '#F3F4F6',
  'gray-200': '#E5E7EB',
  'gray-300': '#D1D5DB',
  'gray-400': '#9CA3AF',
  'gray-500': '#6B7280',
  'gray-600': '#4B5563',
  'gray-700': '#374151',
  'gray-800': '#1F2937',
  'gray-900': '#111827',
  
  // Utility Colors
  'white': '#FFFFFF',
  'black': '#000000',
  'transparent': 'transparent',
} as const;

export const typography = {
  // Headings
  'heading-1': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
  },
  'heading-2': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '36px',
    fontWeight: 600,
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
  },
  'heading-3': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: '1.4',
    letterSpacing: '-0.01em',
  },
  'heading-4': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '24px',
    fontWeight: 600,
    lineHeight: '1.4',
    letterSpacing: '0',
  },
  'heading-5': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '1.5',
    letterSpacing: '0',
  },
  'heading-6': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '1.5',
    letterSpacing: '0',
  },
  
  // Body Text
  'body-large': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '1.6',
    letterSpacing: '0',
  },
  'body': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.6',
    letterSpacing: '0',
  },
  'body-small': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '1.5',
    letterSpacing: '0',
  },
  
  // Special Text
  'caption': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '1.4',
    letterSpacing: '0',
  },
  'overline': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '1.4',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  'button': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.5',
    letterSpacing: '0',
  },
  'button-large': {
    fontFamily: 'Pretendard Variable, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '1.5',
    letterSpacing: '0',
  },
  
  // Montserrat (Secondary Font)
  'display': {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '56px',
    fontWeight: 700,
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
  },
} as const;

export const spacing = {
  '0': 0,
  'xs': 4,
  'sm': 8,
  'md': 16,
  'lg': 24,
  'xl': 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
  '5xl': 96,
} as const;

export const borderRadius = {
  'none': '0',
  'sm': '4px',
  'md': '8px',
  'lg': '12px',
  'xl': '16px',
  '2xl': '24px',
  'full': '9999px',
} as const;

export const shadows = {
  'none': 'none',
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

export const transitions = {
  'fast': '150ms ease-in-out',
  'base': '200ms ease-in-out',
  'slow': '300ms ease-in-out',
} as const;

export const breakpoints = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
} as const;

// Type exports
export type ColorKey = keyof typeof colors;
export type TypographyKey = keyof typeof typography;
export type SpacingKey = keyof typeof spacing;
export type BorderRadiusKey = keyof typeof borderRadius;
export type ShadowKey = keyof typeof shadows;
export type TransitionKey = keyof typeof transitions;
export type BreakpointKey = keyof typeof breakpoints;
