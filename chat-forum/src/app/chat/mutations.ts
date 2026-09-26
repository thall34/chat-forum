import { prisma } from "@/lib/prisma";

export async function createChatRow(name: string, description: string) {
    const chat = await prisma.topic.create({
        data: {
            name,
            description,
        },
    });

    return chat;
};

export async function editChatRow(id: string, name: string, description: string) {
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

export async function deleteChatRow(id: string) {
    await prisma.topic.delete({
        where: {
            id,
        },
    });
};