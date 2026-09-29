'use server'

import { getAllChats, getSingleChat } from "./queries";
import { createChatRow, editChatRow, deleteChatRow } from "./mutations";
import { requireUser, requireAdmin } from "@/lib/authorization";
import errorHandler from "../utils/errorHandler";
import { Chat } from "@/types/types";

export async function getChats(): Promise<Chat[]> {
    try {
        await requireUser();
        const chats = await getAllChats();
        return chats;
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};

export async function getChat(id: string): Promise<Chat> {
    try {
        await requireUser();
        const chat = await getSingleChat(id);

        if (!chat) {
            throw new Error('Chat not found')
        };

        return chat;
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};

export async function createChat(name: string, description: string): Promise<Chat> {
    try {
        await requireAdmin();
        const chat = await createChatRow(name, description);
        return chat;
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};

export async function editChat(id: string, name: string, description: string): Promise<Chat> {
    try {
        await requireAdmin();
        const chat = await editChatRow(id, name, description);
        return chat;
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};

export async function deleteChat(id: string): Promise<void> {
    try {
        await requireAdmin();
        await deleteChatRow(id);
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};