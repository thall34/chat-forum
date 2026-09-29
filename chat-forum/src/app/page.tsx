'use client'

import { useState } from 'react';
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from './_components/GoogleLoginButton';
import GitHubLoginButton from './_components/GitHubLoginButton';

// Homepage component
export default function Home(): React.JSX.Element {
  // Sets up App router for redirects
  const router = useRouter();
  // Gets active session using Next Auth
  const { data: session, status } = useSession();
  // State that changes page layout if there are any errors with submitting the login form
  const [error, setError] = useState<string | null>(null);
  // State that changes page layout to hide load times for page initialization and form submission
  const [loading, setLoading] = useState<boolean>(false);

  // Handles form submission for login form
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    // Prevents page reloading
    e.preventDefault();

    try {
      setLoading(true);
      // Gets login credentials (email and password) from form
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // Sends email and password from form to signIn function which checks if that user exists and password matches database
      const result = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      // Sets page to error mode if email or password don't allow for a clean login
      if (result?.error) {
        setError('Invalid email or password');
        return;
      };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      };
    } finally {
      setLoading(false);
    };
  };

  // Handles navigating from success login screen to the chat page
  function handleNavigate() {
    router.push('/chat');
    router.refresh();
  }

  // Page in loading mode
  if (status === 'loading' || loading) {
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

  // Page in error mode
  if (error) {
    return (
      <div>
          <main className="w-full">
            <section className="flex flex-col items-center gap-[2em] w-full p-[2em]">
            <h1 className="text-[2em] font-bold">Error</h1>
            <p className="text-[1.5em]">{error}</p>
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110" 
            onClick={() => setError(null)}>Back to Login</button>
          </section>
        </main>
      </div>
    );
  };

  // Page if an active session already exists
  if (session) {
    return (
      <div>
        <main className="w-full">
          <section className="flex flex-col items-center gap-[2em] w-full">
            <h1 className="p-[1em] text-[1.5em]">Welcome to Harmony</h1>
            <p>Welcome back {session.user.email}</p>
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-105" 
            onClick={() => handleNavigate()}>To User Dashboard</button>
          </section>
        </main>
      </div>
    );
  };

  // Page with the login form
  return (
    <div>
      <main className="w-full">
        <section className="flex flex-col items-center gap-[1em] w-full">
          <h1 className="p-[1em] text-[1.5em]">Welcome to Harmony</h1>
          <form className="flex flex-col items-center gap-[1em] w-fit px-[5em] py-[2em] border border-gray-400 rounded-xl shadow-md" 
          onSubmit={(e) => handleSubmit(e)}>
            <h2 className="text-[1.5em]">Login</h2>
            <label htmlFor="email">Email: </label>
            <input type="text" name="email" id="email" required 
            className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" required 
            className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
            Submit</button>
          </form>
          <GoogleLoginButton />
          <GitHubLoginButton />
          <Link href='/user/new' 
            className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
            Register New User
          </Link>
        </section>
      </main>
    </div>
  );
};