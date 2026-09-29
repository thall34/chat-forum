import { prisma } from "@/lib/prisma";
import { Chat } from "@/types/types";

export async function createChatRow(name: string, description: string): Promise<Chat> {
    const chat = await prisma.topic.create({
        data: {
            name,
            description,
        },
    });

    return chat;
};

export async function editChatRow(id: string, name: string, description: string): Promise<Chat> {
    const chat = await prisma.topic.update({
        where: {
            id,
        },
        data: {
            name,
            description,
        },
    });

    return chat;
};

export async function deleteChatRow(id: string): Promise<void> {
    await prisma.topic.delete({
        where: {
            id,
        },
    });
};