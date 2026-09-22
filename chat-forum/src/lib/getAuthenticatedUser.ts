'use server'

import { auth } from '@/lib/auth';

export default async function getAuthenticatedUser() {
    const session = await auth();

    if (!session || !session.user) return null;

    return session.user;
};