import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { routeNames } from "../routes";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(routeNames.login);
    }else if (allowedRoles && !allowedRoles.includes(user.role as string)) {
      router.push(routeNames.notAllowed); // Página de acceso denegado
    }
  }, [user, router, allowedRoles]);

  return <>{user && (!allowedRoles || allowedRoles.includes(user.role!)) ? children : null}</>;
};

export default ProtectedRoute;
