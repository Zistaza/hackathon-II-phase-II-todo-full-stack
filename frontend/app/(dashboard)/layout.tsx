'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth-context';
import { Header } from '../../components/navigation/header';
import { Providers } from '../../providers';
import { TodoProvider } from '../../contexts/todo-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = useAuth();

  // If user is not authenticated, redirect to login (handled by middleware, but good to check)
  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>You need to be logged in to access this page.</p>
          <Link href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Providers>
      <TodoProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </TodoProvider>
    </Providers>
  );
}