'use client';

import React from 'react';
import { RegisterForm } from '../../../components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>
      <RegisterForm />
    </div>
  );
}