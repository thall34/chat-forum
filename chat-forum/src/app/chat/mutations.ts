import { prisma } from "@/lib/prisma";

export async function createChatRow(name: string, description: string) {
    const chat = await prisma.chat.create({
        data: {
            name,
            description,
        },
    });

    return chat;
};