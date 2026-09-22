import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { getUserByEmail } from "@/queries/user";
import { UserFull } from "@/types/types";

export const { handlers, auth, signIn, signOut } = NextAuth({
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
            name: 'Credentials',
            credentials: {
                email: { label: 'Email:', type: 'text' },
                password: { label: 'Password:', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                };

                const email = credentials.email as string;

                const user = await getUserByEmail(email) as UserFull;

                if (user) {
                    return user;
                };

                return null;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            };

            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            };

            return session;
        },
    },
});