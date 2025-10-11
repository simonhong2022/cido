import React from 'react';
import { colors, typography, spacing, borderRadius, transitions } from '@/styles/tokens';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const containerStyles: React.CSSProperties = {
      width: fullWidth ? '100%' : 'auto',
      display: 'inline-block',
    };

    const labelStyles: React.CSSProperties = {
      display: 'block',
      marginBottom: `${spacing.xs}px`,
      fontSize: typography['body-small'].fontSize,
      fontWeight: 500,
      color: error ? colors.error : colors['text-dark'],
      fontFamily: typography.body.fontFamily,
    };

    const inputWrapperStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const inputStyles: React.CSSProperties = {
      width: '100%',
      padding: `${spacing.sm}px ${spacing.md}px`,
      paddingLeft: leftIcon ? `${spacing.xl}px` : `${spacing.md}px`,
      paddingRight: rightIcon ? `${spacing.xl}px` : `${spacing.md}px`,
      fontSize: typography.body.fontSize,
      fontFamily: typography.body.fontFamily,
      color: colors['text-dark'],
      backgroundColor: disabled ? colors['gray-100'] : colors.white,
      border: `1px solid ${error ? colors.error : colors['gray-300']}`,
      borderRadius: borderRadius.md,
      outline: 'none',
      transition: transitions.base,
      cursor: disabled ? 'not-allowed' : 'text',
    };

    const iconStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      color: error ? colors.error : colors['gray-500'],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    };

    const leftIconStyles: React.CSSProperties = {
      ...iconStyles,
      left: `${spacing.sm}px`,
    };

    const rightIconStyles: React.CSSProperties = {
      ...iconStyles,
      right: `${spacing.sm}px`,
    };

    const helperTextStyles: React.CSSProperties = {
      marginTop: `${spacing.xs}px`,
      fontSize: typography.caption.fontSize,
      color: error ? colors.error : colors['gray-600'],
      fontFamily: typography.caption.fontFamily,
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!disabled) {
        e.currentTarget.style.borderColor = error ? colors.error : colors.primary;
        e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? colors.error : colors.primary}20`;
      }
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = error ? colors.error : colors['gray-300'];
      e.currentTarget.style.boxShadow = 'none';
      props.onBlur?.(e);
    };

    return (
      <div style={containerStyles} className={className}>
        {label && (
          <label htmlFor={inputId} style={labelStyles}>
            {label}
          </label>
        )}
        <div style={inputWrapperStyles}>
          {leftIcon && <span style={leftIconStyles}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            style={{ ...inputStyles, ...style }}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightIcon && <span style={rightIconStyles}>{rightIcon}</span>}
        </div>
        {(error || helperText) && (
          <p style={helperTextStyles}>{error || helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

