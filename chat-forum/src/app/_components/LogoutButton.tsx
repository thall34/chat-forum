import { signOut } from "next-auth/react";

// Creates logout button component for all pages
export default function LogoutButton(): React.JSX.Element {
    return (
        <button 
        className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white hover:translate-y-0.5 hover:scale-110" 
        onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
    );
};