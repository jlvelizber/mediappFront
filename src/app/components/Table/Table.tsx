import { ReactNode } from 'react';

interface TableProps {
    children: ReactNode;
    shadow?: boolean;
}

export default function Table({ children, shadow = false }: TableProps) {
    return (
        <div className={`overflow-x-auto bg-white rounded-lg border border-gray-200 ${shadow ? 'shadow-md' : ''}`}>
            <table className="w-full">{children}</table>
        </div>
    )
}
