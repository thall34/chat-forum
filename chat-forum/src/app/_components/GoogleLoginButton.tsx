'use client'

import { signIn } from "next-auth/react";

export default function GoogleLoginButton(): React.JSX.Element {
    return (
            <button className=" flex items-center gap-[1em] border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-gray-200" onClick={() => signIn('google', { redirectTo: '/' })}>
                <img src="./logos/google.png" alt="google logo" className="w-6"/>
                Sign In with Google
            </button>
    );
};