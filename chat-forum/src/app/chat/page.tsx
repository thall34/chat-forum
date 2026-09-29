'use client'

import LogoutButton from "../_components/LogoutButton";
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getChats, deleteChat } from "./actions";
import { Chat } from '@/types/types';

// User dashboard page once user is successfully signed in
export default function UserDashboard(): React.JSX.Element {
    // Gets active session using Next Auth
    const { data: session, status } = useSession();
    // State that contains all the chat names and descriptions for displaying on the chat main page
    const [chats, setChats] = useState<Chat[]>([]);
    // State that changes page layout if there are any errors with submitting the login form
    const [error, setError] = useState<string | null>(null);
    // State that changes page layout while loading all chats
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Page initialization function that gets all chats in database on component mount
        async function initializePage() {
            try {
                // Sets page to loading state
                setLoading(true);
                // Queries database for all chats and sets state
                const allChats = await getChats() as Chat[];
                setChats(allChats);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                };
            // sets loading to false once chats are found or if an error occurs
            } finally {
                setLoading(false)
            };
        };

        initializePage();
    }, []);

    // Handle delete function that removes chat topic from database and from chats state
    async function handleDelete(id: string) {
        try {
            await deleteChat(id);
            setChats(prevChats => {
                return prevChats.filter((chat) => chat.id !== id)
            });
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            };
        };
    };

    // Page loading state
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

    // Page error state
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

    // Admin page state
    if (session?.user.role === 'ADMIN') {
        return (
            <div>
                <main className="w-full">
                    <section className="flex flex-col items-center gap-[2em] w-full p-[2em]">
                        <h1 className="text-[1.5em]">Welcome to the Chat Page Admin!</h1>
                        <nav className="flex w-full justify-center">
                            <ul className="flex w-full items-center justify-center gap-[1em]">
                                <li>
                                    <LogoutButton />
                                </li>
                                <li>
                                    <Link href="/chat/new" 
                                        className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
                                        Create New Topic
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        {chats.length > 0 ? (
                            <aside className="flex flex-col w-9/10 items-start gap-[1em]">
                                {chats.map((chat) => (
                                    <div key={chat.id} className="flex justify-between items-center w-full p-[1em] border border-gray-400 rounded-xl shadow-md">
                                        <div className="flex flex-col">
                                            <h2 className="text-[1.5em]">{chat.name}</h2>
                                            <p className="text-gray-500 italic">{chat.description}</p>
                                        </div>
                                        <div className="flex gap-[1em]">
                                            <Link href={`/chat/${chat.id}`} 
                                                className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
                                                View Messages
                                            </Link>
                                            <Link href={`/chat/edit/${chat.id}`} 
                                                className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
                                                Edit
                                            </Link>
                                            <button className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110" 
                                            onClick={() => handleDelete(chat.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </aside>
                        ) : (
                            <></>
                        )}
                    </section>
                </main>
            </div>
        );
    };

    // Regular user page state
    if (session?.user.role === 'USER') {
        return (
            <div>
                <main className="w-full">
                    <section className="flex flex-col items-center gap-[2em] w-full p-[2em]">
                        <h1 className="text-[1.5em]">Welcome to the Chat Page Admin!</h1>
                        <LogoutButton />
                        {chats.length > 0 ? (
                            <aside className="flex flex-col w-9/10 items-start gap-[1em]">
                                {chats.map((chat) => (
                                    <div key={chat.id} className="flex justify-between items-center w-full p-[1em] border border-gray-400 rounded-xl shadow-md">
                                        <div className="flex flex-col">
                                            <h2 className="text-[1.5em]">{chat.name}</h2>
                                            <p className="text-gray-500 italic">{chat.description}</p>
                                        </div>
                                        <Link href={`/chat/${chat.id}`} 
                                            className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
                                            View Messages
                                        </Link>
                                    </div>
                                ))}
                            </aside>
                        ) : (
                            <></>
                        )}
                    </section>
                </main>
            </div>
        );
    };

    // Catch state for unauthorized access
    return (
        <div>
            <main className="w-full">
                <section className="flex flex-col items-center gap-[2em] w-full p-[2em]">
                    <h1>Unauthorized Access to Page</h1>
                    <Link href='/' 
                        className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">
                        Back to Homepage
                    </Link>
                </section>
            </main>
        </div>
    );
};