import { prisma } from '@/lib/prisma';
import { Chat } from '@/types/types';

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

export async function getSingleChat(id: string): Promise<Chat | null> {
    const chat = await prisma.topic.findUnique({
        where: {
            id,
        },
    });

    return chat;
};