'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getChat } from '../actions';
import { Chat } from '@/types/types';

export default function ChatPage(): React.JSX.Element {
    const { data: session, status } = useSession();
    const params = useParams<{ uuid: string }>();
    const uuid = params.uuid;

    const [chat, setChat] = useState<Chat | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function initializePage() {
            try {
                const chat = await getChat(uuid);
                if (!chat) {
                    setChat(null);
                };

                setChat(chat);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                };
            } finally {
                setLoading(false);
            }
        };

        initializePage();
    }, []);

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

    // make button link to go back to chat page
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

    if (session && chat) {
        return (
            <div>
                <main className='w-full'>
                    <section className='flex flex-col items-center gap-[2em] w-full p-[2em]'>
                        <h1>{chat.name}</h1>
                    </section>
                </main>
            </div>
        );
    };

    return (
        <div>
            <main className="w-full">
                <section className="flex flex-col items-center gap-[2em] w-full p-[2em]">
                    <h1 className="text-[2em] font-bold">No Chat Found</h1>
                    <Link href='/chat'>Back to Chats</Link>
                </section>
            </main>
        </div>
    );
};