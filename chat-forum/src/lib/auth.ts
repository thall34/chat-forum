import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getUserByEmail } from "@/app/user/queries";
import { Role } from '@/generated/prisma/enums';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: 'jwt',
    },

    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email:", type: "text" },
                password: { label: "Password:", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                };

                const email = credentials.email as string;
                const password = credentials.password as string;
                const user = await getUserByEmail(email);

                if (!user || !user.passwordHash) {
                    return null;
                };

                const validPassword = await bcrypt.compare(password, user.passwordHash);

                if (!validPassword) {
                    return null;
                };

                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            };

            return token;
        },

        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.role = token.role as Role;

            return session;
        },
    },
});