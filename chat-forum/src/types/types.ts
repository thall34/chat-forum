import { Role } from "@/generated/prisma/enums";

export interface User {
    id: string;
    email: string;
    username: string | null;
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