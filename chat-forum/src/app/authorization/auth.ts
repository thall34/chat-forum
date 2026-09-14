'use server'

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/passport';
import { getUserByEmail } from '@/queries/user';
import { UserFull } from '@/types/types';

// Helper function that authorizes login credentials
async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log(email, password)

    const user = await getUserByEmail(email) as UserFull;
    if (!user || email !== user.email || password !== user.passwordHash) {
        throw new Error('Invalid email or password');
    };

    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: '/',
    });

    return user;
};

// Helper function that removes current session from cookies
async function logout() {
    const cookieStore = await cookies();
    cookieStore.set('session_token', '', {
        httpOnly: true,
        path: '/',
        maxAge: 0,
    });
};

export { 
    login, 
    logout,
};