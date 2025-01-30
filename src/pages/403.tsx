import { routeNames } from '@/app/routes';
import Link from 'next/link';

const ForbiddenPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Link href={routeNames.dashboard} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          
            Volver al inicio
          
        </Link>
      </div>
    );
  };
  
  export default ForbiddenPage;
  