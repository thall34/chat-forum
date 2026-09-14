'use server'

import { createUserRow } from "./mutations";

export async function createUser(email: string, password: string, username?:string, birthdate?: Date): Promise<unknown> {
    try {
        const user = await createUserRow(email, password, username, birthdate);
        return user;
    } catch(err) {
        return err;
    };
};