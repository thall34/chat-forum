'use server'

import { getAllChats, getSingleChat } from "./queries";
import { createChatRow, editChatRow, deleteChatRow } from "./mutations";
import { Chat } from "@/types/types";

export async function getChats() {
    try {
        const chats = await getAllChats();
        return chats;
    } catch(err) {
        return err;
    };
};

export async function getChat(id: string): Promise<Chat> {
    try {
        const chat = await getSingleChat(id);

        if (!chat) {
            throw new Error('')
        };

        return chat;
    } catch(err) {
        throw new Error('')
    };
};

export async function createChat(name: string, description: string) {
    try {
        const chat = await createChatRow(name, description);
        return chat;
    } catch(err) {
        return err;
    };
};

export async function editChat(id: string, name: string, description: string) {
    try {
        const chat = await editChatRow(id, name, description);
        return chat;
    } catch(err) {
        return err;
    };
};

export async function deleteChat(id: string) {
    try {
        await deleteChatRow(id);
    } catch(err) {
        return err;
    };
};