import { prisma } from '@/lib/prisma';
import { User } from '@/types/types';

async function getUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
};

async function getUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
};

export {
    getUserByEmail,
    getUserById,
};