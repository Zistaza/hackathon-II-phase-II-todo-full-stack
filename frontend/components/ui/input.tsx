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
        <label htmlFor={props.id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {as === 'textarea' ? (
        <Component
          className={`flex w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}`}
          rows={rows}
          {...props as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      ) : (
        <Component
          className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}`}
          {...props as React.InputHTMLAttributes<HTMLInputElement>}
        />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};