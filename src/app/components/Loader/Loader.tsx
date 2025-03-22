
interface LoaderProps {
    message?: string
    onScreen?: boolean
}
export default function Loader({ message, onScreen = true }: LoaderProps) {
    return (
        <div className={`${onScreen && 'fixed inset-0 flex items-center justify-center bg-white/80 z-50'}`}>
            <div className="flex flex-col items-center">
                {/* Animación de carga */}
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

                {/* Mensaje centrado */}
                <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
            </div>
        </div>
    )
}