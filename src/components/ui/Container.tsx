import React from 'react';
import { spacing, breakpoints } from '@/styles/tokens';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  center?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  maxWidth = 'xl',
  padding = true,
  center = true,
  children,
  className = '',
  style,
  ...props
}) => {
  // Max width styles
  const maxWidthStyles: Record<string, string> = {
    sm: breakpoints.sm,
    md: breakpoints.md,
    lg: breakpoints.lg,
    xl: breakpoints.xl,
    '2xl': breakpoints['2xl'],
    full: '100%',
  };

  // Base styles
  const baseStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidthStyles[maxWidth],
    marginLeft: center ? 'auto' : undefined,
    marginRight: center ? 'auto' : undefined,
    paddingLeft: padding ? `${spacing.md}px` : undefined,
    paddingRight: padding ? `${spacing.md}px` : undefined,
  };

  return (
    <div className={className} style={{ ...baseStyles, ...style }} {...props}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';

export default Container;

