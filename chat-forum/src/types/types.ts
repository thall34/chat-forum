import { Role } from "@/generated/prisma/enums";

export interface User {
    id: string;
    email: string;
    birthdate: Date | null;
    image: string | null;
    name: string | null;
    role: Role;
    emailVerified: Date | null;
    passwordHash: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export interface Chat {
    id: string;
    name: string;
    description: string;
};

export interface ChatWithMessages extends Chat {
    chatMessages: ChatMessageWithUser[];
}

export interface UserLight {
    id: string;
    name: string | null;
}

export interface ChatMessageWithUser {
    id: string;
    text: string;
    topicId: string;
    user: UserLight;
}

export interface ChatMessage {
    id: string;
    text: string;
    topicId: string;
    userId: string;
}