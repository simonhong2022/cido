import React from 'react';
import { colors, typography, spacing, borderRadius, transitions } from '@/styles/tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: colors.primary,
        color: colors.text,
        border: 'none',
      },
      secondary: {
        backgroundColor: colors.secondary,
        color: colors.text,
        border: 'none',
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `2px solid ${colors.primary}`,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: colors.primary,
        border: 'none',
      },
      danger: {
        backgroundColor: colors.error,
        color: colors.white,
        border: 'none',
      },
    };

    // Size styles
    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        padding: `${spacing.xs}px ${spacing.sm}px`,
        fontSize: '12px',
        fontWeight: typography.button.fontWeight,
      },
      md: {
        padding: `${spacing.sm}px ${spacing.md}px`,
        fontSize: typography.button.fontSize,
        fontWeight: typography.button.fontWeight,
      },
      lg: {
        padding: `${spacing.md}px ${spacing.lg}px`,
        fontSize: typography['button-large'].fontSize,
        fontWeight: typography['button-large'].fontWeight,
      },
    };

    // Base styles
    const baseStyles: React.CSSProperties = {
      fontFamily: typography.button.fontFamily,
      borderRadius: borderRadius.md,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: transitions.base,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: `${spacing.xs}px`,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled || loading ? 0.6 : 1,
      textDecoration: 'none',
      outline: 'none',
      ...variantStyles[variant],
      ...sizeStyles[size],
    };

    // Hover styles
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        e.currentTarget.style.opacity = '0.8';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.transform = 'translateY(0)';
      }
    };

    return (
      <button
        ref={ref}
        className={className}
        style={{ ...baseStyles, ...style }}
        disabled={disabled || loading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {loading && <span>⏳</span>}
        {!loading && leftIcon && <span>{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

