'use server'

import { getAllChats, getSingleChat } from "./queries";
import { createChatRow, editChatRow, deleteChatRow } from "./mutations";
import { requireUser, requireAdmin } from "@/lib/authorization";
import { Chat } from "@/types/types";

export async function getChats() {
    try {
        await requireUser();
        const chats = await getAllChats();
        return chats;
    } catch(err) {
        return err;
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
        throw new Error('Chat not found')
    };
};

export async function createChat(name: string, description: string) {
    try {
        await requireAdmin();
        const chat = await createChatRow(name, description);
        return chat;
    } catch(err) {
        return err;
    };
};

export async function editChat(id: string, name: string, description: string) {
    try {
        await requireAdmin();
        const chat = await editChatRow(id, name, description);
        return chat;
    } catch(err) {
        return err;
    };
};

export async function deleteChat(id: string) {
    try {
        await requireAdmin();
        await deleteChatRow(id);
    } catch(err) {
        return err;
    };
};