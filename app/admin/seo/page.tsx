export const dynamic = "force-dynamic";
import AdminGuard from "../admin-guard";
import AdminComponent from "@/pages/admin/seo";
export default function Page() { return <AdminGuard><AdminComponent /></AdminGuard>; }
