"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: string;
  username: string;
  role: string;
  displayName?: string;
  email?: string;
  active?: boolean;
  createdAt?: string;
}

const emptyUser = { username: "", password: "", role: "admin", displayName: "", email: "" };

export default function AdminUsers() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [form, setForm] = useState<any>(emptyUser);
  const { toast } = useToast();

  const { data: users = [], isLoading } = useQuery<AdminUser[]>({ queryKey: ["/api/admin/users"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editing) {
        const payload: any = { ...data };
        if (!payload.password) delete payload.password;
        return (await apiRequest("PUT", `/api/admin/users/${editing.id}`, payload)).json();
      }
      return (await apiRequest("POST", "/api/admin/users", data)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] }); setDialogOpen(false); toast({ title: editing ? "Usuario actualizado" : "Usuario creado" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/users/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] }); toast({ title: "Usuario eliminado" }); },
  });

  const openCreate = () => { setEditing(null); setForm({ ...emptyUser }); setDialogOpen(true); };
  const openEdit = (u: AdminUser) => { setEditing(u); setForm({ ...u, password: "" }); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-users-title">Usuarios</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-user"><i className="ri-add-line mr-1"></i> Nuevo Usuario</Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm" data-testid="table-users">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3">Usuario</th>
                  <th className="text-left p-3">Nombre</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Rol</th>
                  <th className="text-left p-3">Estado</th>
                  <th className="text-right p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b hover:bg-gray-50" data-testid={`row-user-${u.id}`}>
                    <td className="p-3 font-medium">{u.username}</td>
                    <td className="p-3">{u.displayName || "-"}</td>
                    <td className="p-3">{u.email || "-"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${u.role === "superadmin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{u.role}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${u.active !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{u.active !== false ? "Activo" : "Inactivo"}</span>
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => openEdit(u)} className="text-blue-600 mr-2" data-testid={`button-edit-user-${u.id}`}><i className="ri-edit-line"></i></button>
                      <button onClick={() => { if (confirm("¿Eliminar este usuario?")) deleteMutation.mutate(u.id); }} className="text-red-600" data-testid={`button-delete-user-${u.id}`}><i className="ri-delete-bin-line"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Usuario</label><Input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} data-testid="input-user-username" disabled={!!editing} /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">{editing ? "Nueva contraseña (dejar vacío para no cambiar)" : "Contraseña"}</label><Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} data-testid="input-user-password" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Nombre visible</label><Input value={form.displayName ?? ""} onChange={e => setForm({ ...form, displayName: e.target.value })} data-testid="input-user-displayname" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Email</label><Input value={form.email ?? ""} onChange={e => setForm({ ...form, email: e.target.value })} data-testid="input-user-email" /></div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Rol</label>
              <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" data-testid="select-user-role">
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveMutation.mutate(form)} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-user">{saveMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
