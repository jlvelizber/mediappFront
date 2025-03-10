import { ReactNode } from 'react';

interface PageWrapperProps {
    children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">{children}</div>
    )
}