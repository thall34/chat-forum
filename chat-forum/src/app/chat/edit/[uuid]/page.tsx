'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getChat, editChat } from '../../actions';
import handleChange from '@/app/utils/handleChange';
import { Chat } from '@/types/types';

export default function EditTopicForm() {
  const params = useParams<{ uuid: string }>();
  const uuid = params.uuid;
  const [chat, setChat] = useState<Chat>({
    id: '',
    name: '',
    description: '',
  });

  // state that changes page layout if there are any errors with submitting the register form
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function initializePage() {
      try {
        const topic = await getChat(uuid);
        if (!topic) {
          setError('Chat not found');
        }
        setChat({
          id: topic.id,
          name: topic.name,
          description: topic.description,
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred')
        }
      }
    }

    initializePage();
  }, []);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    // prevents page reloading
    e.preventDefault();

    try {
      await editChat(chat.id, chat.name, chat.description);
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
            <h1 className="text-[1.5em]">Edit Topic</h1>
            <p>Required fields are marked with a red <span className='text-red-500'>*</span></p>
            <label htmlFor="name">Name: <span className='text-red-500'>*</span></label>
            <input type="text" name="name" id="name" value={chat.name} onChange={(e) => handleChange(e, setChat)} required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <label htmlFor="description">Description: <span className='text-red-500'>*</span></label>
            <input type="text" name="description" id="description" value={chat.description} onChange={(e) => handleChange(e, setChat)} required className="border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md" />
            <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Submit</button>
          </form>
        </section>
      </main>
    </div>
  )
};