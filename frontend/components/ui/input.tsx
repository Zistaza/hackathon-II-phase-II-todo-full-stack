'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  as = 'input',
  rows = 3,
  ...props
}) => {
  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      {as === 'textarea' ? (
        <Component
          className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
            ${error ? 'border-destructive' : 'border-input'}
            ${className}`}
          rows={rows}
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      ) : (
        <Component
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
            ${error ? 'border-destructive' : 'border-input'}
            ${className}`}
          {...props as React.InputHTMLAttributes<HTMLInputElement>}
        />
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};