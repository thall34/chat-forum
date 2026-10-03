'use client'

import { useState } from 'react';
import { createUser } from '../actions';
import { useRouter } from 'next/navigation';

// User registration page
export default function RegisterUser(): React.JSX.Element {
  // Sets up app router for any redirects
  const router = useRouter();
  // State that changes page layout if there are any errors with submitting the register form
  const [error, setError] = useState<string | null>(null);

  // Handles form submission for user registration
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    // Prevents page reloading
    e.preventDefault();

    try {
      // Gets new user data from form
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const name = formData.get('name') as string;
      const birthdate = formData.get('birthdate') as string;
      const dateFormat = new Date(birthdate);
      // Creates user using details from form data
      await createUser(email, password, name, dateFormat);
      // If successful, redirects back to the homepage
      router.push('/');
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      };
    };
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

  // Page with new user registration form
  return (
    <div>
      <main className="w-full pt-[3em]">
        <section className="flex flex-col items-center gap-[1em] w-full">
          <form className="flex flex-col items-center gap-[1em] w-fit px-[5em] py-[2em] border border-gray-400 rounded-xl shadow-md" 
          onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-[1.5em]">Create New User</h1>
            <p>Required fields are marked with a red <span className='text-red-500'>*</span></p>
            <label htmlFor="email">Email: <span className='text-red-500'>*</span></label>
            <input type="text" name="email" id="email" required 
            className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <label htmlFor="password">Password: <span className='text-red-500'>*</span></label>
            <input type="password" name="password" id="password" required 
            className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" 
            className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <label htmlFor="birthdate">Date of Birth: </label>
            <input type="date" name="birthdate" id="birthdate" 
            className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">
            Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
};