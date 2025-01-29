import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function Index() {
  return (
    <ProtectedRoute>
      <div>¡Bienvenido al panel principal!</div>
    </ProtectedRoute>
  )
};
