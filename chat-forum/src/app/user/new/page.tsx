'use client'

import { useState } from 'react';
import { createUser } from '../actions';
import { useRouter } from 'next/navigation';

export default function RegisterUser(): React.JSX.Element {
    // state that changes page layout if there are any errors with submitting the register form
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    // prevents page reloading
    e.preventDefault();

    try {
      // gets login credentials from form and sends it to login utility function
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const username = formData.get('username') as string;
      const birthdate = formData.get('birthdate') as string;
      const dateFormat = new Date(birthdate);
      await createUser(email, password, username, dateFormat);
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
    return (
        <div>
            <main className="w-full pt-[3em]">
                <section className="flex flex-col items-center gap-[1em] w-full">
                    <form className="flex flex-col items-center gap-[1em] w-fit px-[5em] py-[2em] border border-gray-400 rounded-xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
                        <h1 className="text-[1.5em]">Create New User</h1>
                        <p>Required fields are marked with a red <span className='text-red-500'>*</span></p>
                        <label htmlFor="email">Email: <span className='text-red-500'>*</span></label>
                        <input type="text" name="email" id="email" required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md"/>
                        <label htmlFor="password">Password: <span className='text-red-500'>*</span></label>
                        <input type="password" name="password" id="password" required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md"/>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" id="username" className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md"/>
                        <label htmlFor="birthdate">Date of Birth: </label>
                        <input type="date" name="birthdate" id="birthdate" className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md"/>
                        <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Submit</button>
                    </form>
                </section>
            </main>
        </div>
    )
};