'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createChat } from '../actions';

export default function NewTopicForm(): React.JSX.Element {
  // state that changes page layout if there are any errors with submitting the register form
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    // prevents page reloading
    e.preventDefault();

    try {
      // gets login credentials from form and sends it to login utility function
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      await createChat(name, description);
      router.push('/chat');
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      };
    };
  };

  if (error) {
    return (
      <div>
        <main className="w-full">
          <section className="flex flex-col items-center gap-[2em] w-full p-[2em]">
            <h1 className="text-[2em] font-bold">Error</h1>
            <p className="text-[1.5em]">{error}</p>
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110" onClick={() => setError(null)}>Back to Login</button>
          </section>
        </main>
      </div>
    );
  };

  return (
    <div>
      <main className="w-full pt-[3em]">
        <section className="flex flex-col items-center gap-[1em] w-full">
          <form className="flex flex-col items-center gap-[1em] w-fit px-[5em] py-[2em] border border-gray-400 rounded-xl shadow-md" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-[1.5em]">Create New User</h1>
            <p>Required fields are marked with a red <span className='text-red-500'>*</span></p>
            <label htmlFor="name">Name: <span className='text-red-500'>*</span></label>
            <input type="text" name="name" id="name" required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <label htmlFor="description">Description: <span className='text-red-500'>*</span></label>
            <input type="text" name="description" id="description" required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Submit</button>
          </form>
        </section>
      </main>
    </div>
  )
};