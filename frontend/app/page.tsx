'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black font-sans px-4 text-center">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-6">
        Welcome to My Todo App
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
        Organize your tasks, track your progress, and manage your day efficiently.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push('/register')}
          className="px-6 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}
