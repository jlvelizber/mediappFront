import { routeNames } from '@/app/routes';
import Link from 'next/link';

const ForbiddenPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Acceso no permitido</h1>
        <p className="mt-2 text-sm text-gray-600">No tienes permisos para acceder a esta sección.</p>
        <Link href={routeNames.dashboard} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Volver al panel del consultorio
        </Link>
      </div>
    );
  };
  
  export default ForbiddenPage;
  