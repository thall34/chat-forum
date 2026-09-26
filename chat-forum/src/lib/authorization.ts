import { auth } from "./auth";
import { getUserById } from "@/app/user/queries";
import { Role } from "@/generated/prisma/enums";

export async function requireUser() {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    };

    const user = await getUserById(session.user.id);

    if (!user) {
        throw new Error('Unauthorized');
    };

    return user;
};

export async function requireAdmin() {
    const user = await requireUser();

    if (user.role !== Role.ADMIN) {
        throw new Error('Forbidden');
    };

    return user;
};