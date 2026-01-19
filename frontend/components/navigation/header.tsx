'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import ThemeToggle from '../ui/theme-toggle';

export const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600 hover:text-blue-400">
          Todo App
        </Link>

        <nav className="flex items-center space-x-4">
          <ThemeToggle />
          {state.isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="primary" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link href="/tasks">
                <Button variant="primary" size="sm">
                  Tasks
                </Button>
              </Link>
              <Button
                onClick={() => {
                  logout();
                  router.push('/login');
                  router.refresh(); // Refresh to ensure state updates
                }}
                variant="primary"
                size="sm"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:underline">
                Login
              </Link>
              <Link href="/register" className="text-sm font-medium hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};