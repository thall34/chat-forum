'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { login } from '@/app/authorization/auth';
import { UserLight } from '@/types/types';
import getAuthenticatedUser from '@/lib/server-auth';

export default function Home() {
  // state that manages the currently logged in user
  const [user, setUser] = useState<UserLight | null>(null);
  // state that changes page layout if there are any errors with submitting the login form
  const [error, setError] = useState<string | null>(null);
  // state that changes page layout to hide load times for page initialization and form submission
  const [loading, setLoading] = useState<boolean>(true);
  // state that sets welcome message if user was previously logged in and session cookie still exists
  const [previousAuth, setPreviousAuth] = useState<boolean>(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    // prevents page reloading
    e.preventDefault();

    try {
      setLoading(true);
      // gets login credentials from form and sends it to login utility function
      const formData = new FormData(e.currentTarget);
      const user = await login(formData);
      setUser(user);
      setPreviousAuth(false);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      };
    };
  };

  useEffect(() => {
    async function initializePage() {
      try {
        const user = await getAuthenticatedUser() as UserLight;
        if (!user) {
          setUser(null);
          setPreviousAuth(false);
        };

        setUser(user);
        setPreviousAuth(true);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        };
      };
    };

    initializePage();
  }, []);

  if (loading) {
    return (
      <div>
        <main className="w-full">
          <section className="flex flex-col items-center gap-[2em] w-full">
            <h1 className="p-[1em] text-[1.5em]">Welcome to Harmony</h1>
            <p>Loading...</p>
          </section>
        </main>
      </div>
    );
  };

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => setError(null)}>Back to Login</button>
      </div>
    );
  };

  if (user && previousAuth) {
    return (
      <div>
        <main className="w-full">
          <section className="flex flex-col items-center gap-[2em] w-full">
            <h1 className="p-[1em] text-[1.5em]">Welcome to Harmony</h1>
            <p>Welcome back {user.email}</p>
          </section>
        </main>
      </div>
    );
  };

  if (user && !previousAuth) {
    return (
      <div>
        <main className="w-full">
          <section className="flex flex-col items-center gap-[2em] w-full">
            <h1 className="p-[1em] text-[1.5em]">Welcome to Harmony</h1>
            <p>{user.email} has successfully logged in</p>
          </section>
        </main>
      </div>
    );
  };

  return (
    <div>
      <main className="w-full">
        <section className="flex flex-col items-center gap-[1em] w-full">
          <h1 className="p-[1em] text-[1.5em]">Welcome to Harmony</h1>
          <form className="flex flex-col items-center gap-[1em] w-fit px-[5em] py-[2em] border border-gray-400 rounded-xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
            <h2 className="text-[1.5em]">Login</h2>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" id="email" required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Submit</button>
          </form>
          <Link href='/user/new' className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Register New User</Link>
        </section>
      </main>
    </div>
  );
};