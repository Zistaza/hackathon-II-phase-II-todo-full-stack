'use client';

import React from 'react';
import { LoginForm } from '../../../components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Sign in to your account
        </h2>
        <div className="mt-4 text-center">
          <a href="/" className="text-indigo-600 hover:text-indigo-500 text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}