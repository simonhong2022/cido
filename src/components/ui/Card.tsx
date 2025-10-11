import React from 'react';
import { colors, spacing, borderRadius, shadows, transitions } from '@/styles/tokens';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      children,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        backgroundColor: colors.surface,
        border: 'none',
        boxShadow: shadows.sm,
      },
      bordered: {
        backgroundColor: colors.surface,
        border: `1px solid ${colors['gray-200']}`,
        boxShadow: 'none',
      },
      elevated: {
        backgroundColor: colors.surface,
        border: 'none',
        boxShadow: shadows.lg,
      },
    };

    // Padding styles
    const paddingStyles: Record<string, React.CSSProperties> = {
      none: { padding: 0 },
      sm: { padding: `${spacing.sm}px` },
      md: { padding: `${spacing.md}px` },
      lg: { padding: `${spacing.lg}px` },
    };

    // Base styles
    const baseStyles: React.CSSProperties = {
      borderRadius: borderRadius.lg,
      transition: transitions.base,
      cursor: clickable ? 'pointer' : 'default',
      overflow: 'hidden',
      ...variantStyles[variant],
      ...paddingStyles[padding],
    };

    // Hover styles
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable || clickable) {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = shadows.xl;
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable || clickable) {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow as string;
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...baseStyles, ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

