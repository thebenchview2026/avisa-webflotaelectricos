"use client";

import { useAdmin } from "../../client/src/hooks/useAdmin";
import { Suspense, lazy } from "react";

const AdminLogin = lazy(() => import("../../client/src/pages/admin/login"));

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
        <AdminLogin />
      </Suspense>
    );
  }

  return <>{children}</>;
}
