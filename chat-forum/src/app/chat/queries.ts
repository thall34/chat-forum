import { prisma } from '@/lib/prisma';

export async function getAllChats() {
    const chats = await prisma.topic.findMany({
        select: {
            id: true,
            name: true,
            description: true,
        },
    });

    return chats;
};

export async function getSingleChat(id: string) {
    const chat = await prisma.topic.findUnique({
        where: {
            id,
        },
    });

    return chat;
};