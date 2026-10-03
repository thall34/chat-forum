'use server'

import { getSingleMessage } from "./queries";
import { createMessageRow, editMessageRow, deleteMessageRow } from "./mutations";
import errorHandler from "../utils/errorHandler";
import { ChatMessage, ChatMessageWithUser } from "@/types/types";
import { requireUser } from "@/lib/authorization";

export async function getMessage(id: string): Promise<ChatMessageWithUser> {
    try {
        const message = await getSingleMessage(id);
        if (!message) {
            throw new Error('Message not found');
        };

        return message;
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};

export async function createMessage(text: string, topicId: string, userId: string): Promise<ChatMessage> {
    try {
        await requireUser();
        const message = await createMessageRow(text, topicId, userId);
        return message;
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};

export async function editMessage(id: string, text: string) {
    try {
        await requireUser();
        const message = await editMessageRow(id, text);
        return message;
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};

export async function deleteMessage(id: string): Promise<void> {
    try {
        await requireUser();
        await deleteMessageRow(id);
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};