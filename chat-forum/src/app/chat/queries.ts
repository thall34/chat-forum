import { prisma } from '@/lib/prisma';

export async function getAllChats() {
    const chats = await prisma.chat.findMany({
        select: {
            id: true,
            name: true,
            description: true,
        },
    });

    return chats;
};