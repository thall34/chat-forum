'use client'

import { logout } from "../authorization/auth";
import { useRouter } from 'next/navigation';

// Creates logout button component for admin side of app
function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
            await logout();

            router.push('/');
            router.refresh();
    };

    return (
        <button className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white" onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;