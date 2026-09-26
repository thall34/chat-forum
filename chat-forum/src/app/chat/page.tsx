'use client'

import LogoutButton from "../_components/LogoutButton";
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getChats, deleteChat } from "./actions";
import { Chat } from '@/types/types';

export default function UserDashboard(): React.JSX.Element {
    const { data: session, status } = useSession();
    // state that contains all the chat names and descriptions for displaying on the chat main page
    const [chats, setChats] = useState<Chat[]>([]);
    // state that changes page layout if there are any errors with submitting the login form
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function initializePage() {
            try {
                setLoading(true);
                const allChats = await getChats() as Chat[];
                setChats(allChats);
            } catch(err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                };
            } finally {
                setLoading(false)
            };
        };

        initializePage();
    }, []);

    async function handleDelete(id: string) {
        try {
            await deleteChat(id);
            setChats(prevChats => {
                return prevChats.filter((chat) => chat.id !== id)
            });
        } catch(err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            };
        };
    };

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
                                    <Link href="/chat/new" className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">Create New Topic</Link>
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
                                            <Link href='' className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">View Messages</Link>
                                            <Link href={`/chat/edit/${chat.id}`} className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">Edit</Link>
                                            <button className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110" onClick={() => handleDelete(chat.id)}>Delete</button>
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
                                        <Link href='' className="flex border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">View Messages</Link>
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

    return (
        <div>
            <main className="w-full">
                <section className="flex flex-col items-center gap-[2em] w-full p-[2em]">
                    <h1>Unauthorized Access to Page</h1>
                    <Link href='/' className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110">Back to Homepage</Link>
                </section>
            </main>
        </div>
    )
};