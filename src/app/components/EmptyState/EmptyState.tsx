import { InboxIcon } from '@primer/octicons-react';

interface EmptyStateProps {
    message?: string;
}

export default function EmptyState({ message = "Sin datos disponibles" }: EmptyStateProps) {

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md border border-gray-200 text-gray-600">
            <InboxIcon className="w-16 h-16 text-gray-400 mb-4 animate-bounce" />
            <p className="text-lg font-semibold">{message}</p>
        </div>
    );

}