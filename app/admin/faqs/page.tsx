export const dynamic = "force-dynamic";
import AdminGuard from "../admin-guard";
import AdminComponent from "@/pages/admin/faqs";
export default function Page() { return <AdminGuard><AdminComponent /></AdminGuard>; }
