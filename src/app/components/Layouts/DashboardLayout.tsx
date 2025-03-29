import { ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import { Toasts } from "../Toasts";

export function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen">
            <Toasts />
            {/* Sidebar */}
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                {/* Contenido */}
                <div className="p-6 md:p-8">
                    <main>{children}</main>
                </div>
            </div>


        </div>
    );
}
