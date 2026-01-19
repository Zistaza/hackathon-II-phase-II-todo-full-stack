// Global providers for the application

'use client';

import React from 'react';
import { AuthProvider } from './contexts/auth-context';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};