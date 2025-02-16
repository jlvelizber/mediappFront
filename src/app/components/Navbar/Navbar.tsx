import { useAuth } from "@/app/context";

export default function Navbar() {
    const { user, logout } = useAuth();
    const handleLogout = () => logout()
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary">Dashboard</h2>
            <div>
                {user ? (
                    <button onClick={() => handleLogout()} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                ) : null}
            </div>
        </nav>
    );
}
