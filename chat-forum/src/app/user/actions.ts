'use server'

import { createUserRow } from "./mutations";
import bcrypt from "bcryptjs";

export async function createUser(email: string, password: string, username?:string, birthdate?: Date): Promise<unknown> {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUserRow(email, hashedPassword, username, birthdate);
        return user;
    } catch(err) {
        return err;
    };
};