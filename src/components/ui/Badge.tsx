import React from 'react';
import { colors, typography, spacing, borderRadius } from '@/styles/tokens';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  dot = false,
  children,
  className = '',
  style,
  ...props
}) => {
  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.white,
    },
    success: {
      backgroundColor: colors.success,
      color: colors.white,
    },
    warning: {
      backgroundColor: colors.warning,
      color: colors.white,
    },
    error: {
      backgroundColor: colors.error,
      color: colors.white,
    },
    info: {
      backgroundColor: colors.info,
      color: colors.white,
    },
  };

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: `${spacing.xs / 2}px ${spacing.xs}px`,
      fontSize: '10px',
    },
    md: {
      padding: `${spacing.xs}px ${spacing.sm}px`,
      fontSize: typography.caption.fontSize,
    },
    lg: {
      padding: `${spacing.xs}px ${spacing.md}px`,
      fontSize: typography['body-small'].fontSize,
    },
  };

  // Dot style
  const dotStyles: React.CSSProperties = dot
    ? {
        width: '8px',
        height: '8px',
        padding: 0,
        borderRadius: borderRadius.full,
      }
    : {};

  // Base styles
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: typography.caption.fontFamily,
    fontWeight: 500,
    borderRadius: borderRadius.full,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...dotStyles,
  };

  return (
    <span className={className} style={{ ...baseStyles, ...style }} {...props}>
      {!dot && children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;

