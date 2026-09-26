'use server'

import { getAllChats } from "./queries";
import { createChatRow } from "./mutations";

export async function getChats() {
    try {
        const chats = await getAllChats();
        return chats;
    } catch(err) {
        return err;
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