'use server'

import { createUserRow } from "./mutations";
import bcrypt from "bcryptjs";
import { User } from "@/types/types";
import errorHandler from "../utils/errorHandler";

export async function createUser(email: string, password: string, name?:string, birthdate?: Date): Promise<User> {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUserRow(email, hashedPassword, name, birthdate);
        return user;
    } catch(err) {
        throw new Error(errorHandler(err));
    };
};