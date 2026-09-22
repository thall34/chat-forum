'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { UserLight } from '@/types/types';
import getAuthenticatedUser from '@/lib/getAuthenticatedUser';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from './_components/GoogleLoginButton';
import GitHubLoginButton from './_components/GitHubLoginButton';

export default function Home() {
  const router = useRouter();
  // state that manages the currently logged in user
  const [user, setUser] = useState<UserLight | null>(null);
  // state that changes page layout if there are any errors with submitting the login form
  const [error, setError] = useState<string | null>(null);
  // state that changes page layout to hide load times for page initialization and form submission
  const [loading, setLoading] = useState<boolean>(true);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    // prevents page reloading
    e.preventDefault();

    try {
      setLoading(true);
      // gets login credentials from form and sends it to login utility function
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setLoading(false);
      } else {
        const authenticatedUser = await getAuthenticatedUser() as UserLight;
        setUser(authenticatedUser);
        setLoading(false);
      };

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      };
    };
  };

  function handleNavigate() {
    router.push('/chat');
    router.refresh();
  }

  useEffect(() => {
    async function initializePage() {
      try {
        const user = await getAuthenticatedUser() as UserLight;
        if (!user) {
          setUser(null);
        } else {
          setUser(user);
        };

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

  if (user) {
    return (
      <div>
        <main className="w-full">
          <section className="flex flex-col items-center gap-[2em] w-full">
            <h1 className="p-[1em] text-[1.5em]">Welcome to Harmony</h1>
            <p>Welcome back {user.email}</p>
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white" onClick={() => handleNavigate()}>To User Dashboard</button>
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
          <GoogleLoginButton />
          <GitHubLoginButton />
          <Link href='/user/new' className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Register New User</Link>
        </section>
      </main>
    </div>
  );
};