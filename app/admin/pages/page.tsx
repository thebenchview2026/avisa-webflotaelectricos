export const dynamic = "force-dynamic";
import AdminGuard from "../admin-guard";
import AdminPagesPage from "@/pages/admin/pages-admin";
export default function Page() { return <AdminGuard><AdminPagesPage /></AdminGuard>; }
