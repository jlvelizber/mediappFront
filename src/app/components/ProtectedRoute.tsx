import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("auth/login");
    }
  }, [user, router]);

  if (!user) {
    return null; // Mostrar un loader o vacío mientras redirige
  }

  return <>{children}</>;
};

export default ProtectedRoute;
