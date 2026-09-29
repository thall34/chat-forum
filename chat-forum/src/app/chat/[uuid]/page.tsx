'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getChat } from '../actions';
import { Chat } from '@/types/types';

// Chat page for selected chat
export default function ChatPage(): React.JSX.Element {
    // Gets active session using Next Auth
    const { data: session, status } = useSession();
    // Gets params from url
    const params = useParams<{ uuid: string }>();
    // Creates constant for topic uuid
    const uuid = params.uuid;
    // State for selected chat topic
    const [chat, setChat] = useState<Chat | null>(null);
    // State for errors when loading page
    const [error, setError] = useState<string | null>(null);
    // State for loading the page on component mount
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Page initialization function that gets chat from database on component mount
        async function initializePage() {
            try {
                // Queries database for specific chat using UUID
                const chat = await getChat(uuid);
                // If no chat is found, set error message
                if (!chat) {
                    setError('Chat not found');
                };
                // If chat is found, set chat state
                setChat(chat);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                };
            } finally {
            // Once chat is found or error is received, set loading state to false
                setLoading(false);
            };
        };

        initializePage();
    }, []);

    // Loading page state
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

    // Error page state
    if (error) {
        return (
            <div>
                <main className="w-full">
                    <section className="flex flex-col items-center gap-[2em] w-full p-[2em]">
                        <h1 className="text-[2em] font-bold">Error</h1>
                        <p className="text-[1.5em]">{error}</p>
                        <Link href='/chat' 
                            className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
                            Back to Chats
                        </Link>
                    </section>
                </main>
            </div>
        );
    };

    // User page state
    if (session?.user && chat) {
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
                    <h1 className="text-[2em] font-bold">Unauthorized Access to Page</h1>
                    <Link href='/' 
                        className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
                        Back to Homepage
                    </Link>
                </section>
            </main>
        </div>
    );
};