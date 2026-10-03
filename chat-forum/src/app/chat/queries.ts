import { prisma } from '@/lib/prisma';
import { Chat, ChatWithMessages } from '@/types/types';

export async function getAllChats(): Promise<Chat[]> {
    const chats = await prisma.topic.findMany({
        select: {
            id: true,
            name: true,
            description: true,
        },
    });

    return chats;
};

export async function getSingleChat(id: string): Promise<ChatWithMessages | null> {
    const chat = await prisma.topic.findUnique({
        where: {
            id,
        },
        include: {
            chatMessages: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });

    return chat;
};