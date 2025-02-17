import { useLayout } from "@/app/context";
import { UserMenu } from "../UserMenu";

export default function Navbar() {

    const { titlePage } = useLayout()

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex-1 md:none"></div>
            <h2 className="text-xl flex-1 font-bold text-primary">{titlePage || "Dashboard"}</h2>
            {/* User menu */}
            <div className="flex items-center space-x-4">
                <UserMenu />
            </div>
        </nav>
    );
}
