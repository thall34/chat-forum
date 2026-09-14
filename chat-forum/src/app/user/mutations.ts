import { prisma } from '@/lib/prisma';

export async function createUserRow(email: string, passwordHash: string, username?:string, birthdate?: Date): Promise<unknown> {
    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
            username,
            birthdate,
        },
    });

    return user;
};