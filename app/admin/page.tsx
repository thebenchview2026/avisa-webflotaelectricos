"use client";
import AdminGuard from "./admin-guard";
import AdminDashboard from "../../client/src/pages/admin/dashboard";
export default function Page() { return <AdminGuard><AdminDashboard /></AdminGuard>; }
