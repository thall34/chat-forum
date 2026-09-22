import { signOut } from '@/lib/auth';

// Creates logout button component for admin side of app
function LogoutButton() {
    return (
        <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
        }}
        >
            <button type='submit' className="border border-black rounded-2xl px-[1em] py-[0.5em] transition-all duration-200 ease-in-out hover:bg-black hover:text-white">Logout</button>
        </form>
    );
};

export default LogoutButton;