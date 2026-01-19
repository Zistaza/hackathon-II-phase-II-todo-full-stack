'use client';

import React from 'react';
import { LoginForm } from '../../../components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <LoginForm />
    </div>
  );
}