'use client';

import React from 'react';
import { Providers } from '../../providers';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </Providers>
  );
}