"use client";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import type { ActivityLog } from "@shared/schema";

export default function AdminActivity() {
  const { data: items = [], isLoading } = useQuery<ActivityLog[]>({ queryKey: ["/api/admin/activity-log"] });

  const actionIcons: Record<string, string> = {
    login: "ri-login-box-line",
    create: "ri-add-circle-line",
    update: "ri-edit-line",
    delete: "ri-delete-bin-line",
  };

  const actionColors: Record<string, string> = {
    login: "text-blue-600 bg-blue-50",
    create: "text-green-600 bg-green-50",
    update: "text-yellow-600 bg-yellow-50",
    delete: "text-red-600 bg-red-50",
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6" data-testid="text-activity-title">Registro de Actividad</h1>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {items.map(a => (
                <div key={a.id} className="flex items-center gap-4 p-4 hover:bg-gray-50" data-testid={`activity-row-${a.id}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${actionColors[a.action] || "text-gray-600 bg-gray-50"}`}>
                    <i className={`${actionIcons[a.action] || "ri-information-line"} text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.details}</p>
                    <div className="flex gap-2 text-xs text-gray-500">
                      <span className="capitalize">{a.action}</span>
                      <span>·</span>
                      <span>{a.entity}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {a.createdAt ? new Date(a.createdAt).toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit" }) : ""}
                  </div>
                </div>
              ))}
              {items.length === 0 && <p className="text-center py-8 text-gray-500">Sin actividad registrada</p>}
            </div>
          </CardContent>
        </Card>
      )}
    </AdminLayout>
  );
}
