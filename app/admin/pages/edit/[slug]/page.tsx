"use client";
import AdminGuard from "../../../admin-guard";
import AdminPageEditor from "../../../../../client/src/pages/admin/page-editor";
export default function Page() { return <AdminGuard><AdminPageEditor /></AdminGuard>; }
