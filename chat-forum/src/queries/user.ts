import { prisma } from '@/lib/prisma';
import { UserLight, UserFull } from '@/types/types';

async function getUserByEmail(email: string): Promise<UserFull | null> {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                passwordHash: true,
            },
        });

        return user
};

async function getUserById(id: string): Promise<UserLight | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
            },
        });

        return user
};

export {
    getUserByEmail,
    getUserById,
}