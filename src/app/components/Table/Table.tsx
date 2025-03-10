import { ReactNode } from 'react';

interface TableProps {
    headers: string[];
    children: ReactNode;
    shadow?: boolean;
}

export default function Table({ headers, children, shadow = false }: TableProps) {
    return (
        <div className={`w-full border-collapse rounded-lg shadow-md overflow-hidden  ${shadow ? 'shadow-md' : ''}`}>
            <table className="w-full">
                <thead className="bg-primary text-white">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-sm font-semibold uppercase">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {children}
                </tbody>
            </table>
        </div >
    )
}
