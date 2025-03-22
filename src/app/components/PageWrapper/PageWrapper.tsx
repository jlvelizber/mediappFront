import { ReactNode } from 'react';

interface PageWrapperProps {
    children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-4 border border-gray-200">{children}</div>
    )
}