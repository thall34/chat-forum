import { prisma } from '@/lib/prisma';
import { User } from '@/types/types'

export async function createUserRow(email: string, passwordHash: string, username?:string, birthdate?: Date): Promise<User> {
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