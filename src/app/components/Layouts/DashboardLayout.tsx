import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                {/* Contenido */}
                <main className="flex-1 p-6">{children}</main>
            </div>


        </div>
    );
}
