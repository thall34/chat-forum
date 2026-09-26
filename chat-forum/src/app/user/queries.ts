import { prisma } from '@/lib/prisma';

async function getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
};

async function getUserById(id: string) {
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