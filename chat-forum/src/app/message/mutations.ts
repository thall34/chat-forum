import { prisma } from "@/lib/prisma";
import { ChatMessage } from "@/types/types";

export async function createMessageRow(text: string, topicId: string, userId: string): Promise<ChatMessage> {
    const message = await prisma.chatMessage.create({
        data: {
            text,
            topicId,
            userId,
        },
    });

    return message;
};

export async function editMessageRow(id: string, text: string) {
    const message = await prisma.chatMessage.update({
       where: {
        id,
       },
       data: {
        text,
       },
    });

    return message;
};

export async function deleteMessageRow(id: string): Promise<void> {
    await prisma.chatMessage.delete({
        where: {
            id,
        },
    });
};