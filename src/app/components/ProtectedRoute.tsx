import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { routeNames } from "../routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      router.push(routeNames.login);
    }
  }, [user, router]);

  if (!user) return <p>Cargando...</p>;

  return <>{user ? children : null}</>;
};