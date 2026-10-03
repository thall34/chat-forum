'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getChat } from '../actions';
import { ChatWithMessages } from '@/types/types';
import { createMessage, getMessage, editMessage, deleteMessage } from '@/app/message/actions';
import handleChange from '@/app/utils/handleChange';

// Chat page for selected chat
export default function ChatPage(): React.JSX.Element {
    // Gets active session using Next Auth
    const { data: session, status } = useSession();
    // Gets params from url
    const params = useParams<{ uuid: string }>();
    // Creates constant for topic uuid
    const uuid = params.uuid;
    // State for selected chat topic
    const [chat, setChat] = useState<ChatWithMessages>({
        id: '',
        name: '',
        description: '',
        chatMessages: [],
    });
    const [editToggle, setEditToggle] = useState({
        messageId: '',
        text: '',
        editing: false,
    });
    // State for errors when loading page
    const [error, setError] = useState<string | null>(null);
    // State for loading the page on component mount
    const [loading, setLoading] = useState<boolean>(true);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const text = formData.get('text') as string;
            const userId = session?.user.id as string;
            const message = await createMessage(text, uuid, userId);
            const addMessage = await getMessage(message.id);
            setChat(prevChat => {
                return {
                    ...prevChat,
                    chatMessages: [...prevChat?.chatMessages, addMessage]
                }
            })
        } catch(err) {
            return;
        };
    };

    function handleToggle(id: string, text: string) {
        setEditToggle({
            messageId: id,
            text,
            editing: true,
        });
    };

    async function handleEdit(id: string, text: string) {
        try {
            const editedMessage = await editMessage(id, text);
            setEditToggle({
                messageId: '',
                text: '',
                editing: false,
            });
            const updatedMessage = await getMessage(editedMessage.id);
            const updatedChatMessages = chat.chatMessages.map(message => {
                if (message.id === updatedMessage.id) {
                    return updatedMessage
                };

                return message;
            })
            setChat(prevChat => {
                return {
                    ...prevChat,
                    chatMessages: updatedChatMessages,
                };
            });
        } catch(err) {
            return;
        };
    };

    async function handleDelete(id: string) {
        try {
            await deleteMessage(id);
            setChat(prevChat => {
                return {
                    ...prevChat,
                    chatMessages: prevChat.chatMessages.filter(message => message.id !== id)
                };
            });
        } catch(err) {
            return;
        };
    };

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
    if (session?.user) {
        return (
            <div>
                <main className='w-full'>
                    <section className='flex flex-col items-center gap-[2em] w-full p-[2em]'>
                        <h1 className="text-[1.5em]">{chat.name}</h1>
                        {chat.chatMessages.length > 0 ? (
                            <div className='flex flex-col gap-[1em] w-full justify-center'>
                                {chat.chatMessages.map((message) => (
                                    <div key={message.id} className='flex w-full gap-[0.5em] p-[1em] justify-items-start items-center border border-gray-400 rounded-xl shadow-sm'>
                                        {editToggle.editing && editToggle.messageId === message.id ? (
                                            <>
                                                <div>
                                                    <p>{message.user.name}</p>
                                                    <input type="text" name='text' id='text' value={editToggle.text} onChange={(e) => handleChange(e, setEditToggle)} required/>
                                                    <button onClick={() => handleEdit(editToggle.messageId, editToggle.text)}>Confirm</button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p>{message.user.name}:</p>
                                                <p>{message.text}</p>
                                                <button 
                                                    className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white"
                                                    onClick={() => handleToggle(message.id, message.text)}>
                                                    Edit
                                                </button>
                                                <button 
                                                    className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white"
                                                    onClick={() => handleDelete(message.id)}>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className='w-full'>
                            <form className="flex flex-col items-center gap-[1em] w-full px-[5em] py-[2em] border border-gray-400 rounded-xl shadow-md"
                            onSubmit={(e) => handleSubmit(e)}>
                                <label htmlFor="text">Message: </label>
                                <input type="text" name='text' id='text' required 
                                    className="w-full border border-gray-400 p-[0.3em] rounded outline-none transition-all duration-200 ease-in-out hover:border-gray-600 focus:border-gray-800 focus:shadow-md"
                                />
                                <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Add message</button>
                            </form>
                        </div>
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