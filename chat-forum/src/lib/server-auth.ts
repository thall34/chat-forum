'use server'

import { cookies } from "next/headers";
import { passport } from './passport';

async function getAuthenticatedUser(): Promise<unknown> {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) return null;

    return new Promise((resolve) => {
        const mockReq = {
            cookies: { session_token: token },
        };

        passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
            if (err || !user) {
                resolve(null);
            };

            resolve(user);
        })(mockReq, {});
    });
};

export default getAuthenticatedUser;