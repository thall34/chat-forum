import { prisma } from "@/lib/prisma";
import { ChatMessage, ChatMessageWithUser } from "@/types/types";

export async function getSingleMessage(id: string): Promise<ChatMessageWithUser | null> {
    const message = await prisma.chatMessage.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            text: true,
            topicId: true,
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

    return message;
};