import { PaginatorIComponentnterface } from "./PaginatorIComponentnterface";

export default function Paginator({ meta, onPageChange }: PaginatorIComponentnterface) {
    const totalPages = meta?.last_page || 1;
    const currentPage = meta?.current_page || 1;
    return (
        <div className={`flex justify-end mt-4 space-x-2 ${totalPages === 1 && 'invisible'}`}>
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:opacity-50 text-xs"
            >
                Anterior
            </button>
            <span className="text-gray-700 py-2 px-4">{currentPage} / {totalPages}</span>
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-white bg-primary rounded-lg shadow-sm hover:bg-primary-dark disabled:opacity-50 text-xs"
            >
                Siguiente
            </button>
        </div >
    )
}
