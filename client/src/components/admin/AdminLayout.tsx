"use client";
import { Link, useLocation } from "@/lib/router";
import { useAdmin } from "@/hooks/useAdmin";

type AllowedRole = "superadmin" | "admin" | "editor";

interface NavItem {
  path: string;
  label: string;
  icon: string;
  allowedRoles?: AllowedRole[];
}

interface MenuGroup {
  label: string | null;
  allowedRoles?: AllowedRole[];
  items: NavItem[];
}

const menuGroups: MenuGroup[] = [
  {
    label: null,
    allowedRoles: ["superadmin", "admin"],
    items: [
      { path: "/admin", label: "Dashboard", icon: "ri-dashboard-line" },
    ],
  },
  {
    label: "Catálogo",
    items: [
      { path: "/admin/vehicles", label: "Vehículos", icon: "ri-car-line" },
      { path: "/admin/brands", label: "Marcas", icon: "ri-building-line" },
      { path: "/admin/promotions", label: "Promociones", icon: "ri-price-tag-3-line" },
    ],
  },
  {
    label: "Comercial",
    allowedRoles: ["superadmin", "admin"],
    items: [
      { path: "/admin/leads", label: "Leads", icon: "ri-contacts-line" },
      { path: "/admin/dealers", label: "Concesionarios", icon: "ri-map-pin-line" },
    ],
  },
  {
    label: "Contenido",
    items: [
      { path: "/admin/pages", label: "Páginas", icon: "ri-file-text-line" },
      { path: "/admin/faqs", label: "Centro de Preguntas", icon: "ri-question-line" },
      { path: "/admin/import-faqs", label: "Importar Preguntas", icon: "ri-upload-cloud-line", allowedRoles: ["superadmin", "admin"] },
      { path: "/admin/faq-generator", label: "Generador FAQ", icon: "ri-magic-line", allowedRoles: ["superadmin", "admin"] },
      { path: "/admin/whatsapp-faq", label: "WhatsApp → FAQ", icon: "ri-whatsapp-line", allowedRoles: ["superadmin", "admin"] },
      { path: "/admin/chatbot", label: "Chatbot Web", icon: "ri-robot-line", allowedRoles: ["superadmin", "admin"] },
      { path: "/admin/media", label: "Biblioteca de imágenes", icon: "ri-image-2-line" },
      { path: "/admin/testimonials", label: "Testimonios", icon: "ri-chat-quote-line" },
      { path: "/admin/services", label: "Servicios", icon: "ri-tools-line" },
      { path: "/admin/plans", label: "Planes", icon: "ri-shield-check-line" },
      { path: "/admin/sections", label: "Secciones", icon: "ri-layout-line" },
      { path: "/admin/editorial", label: "Editorial", icon: "ri-article-line" },
    ],
  },
  {
    label: "SEO",
    allowedRoles: ["superadmin", "admin"],
    items: [
      { path: "/admin/seo", label: "SEO", icon: "ri-search-eye-line" },
      { path: "/admin/indexacion", label: "Indexación", icon: "ri-file-search-line" },
      { path: "/admin/topical-authority", label: "Autoridad Topical", icon: "ri-node-tree" },
      { path: "/admin/scheduled-growth", label: "Crecimiento Programado", icon: "ri-robot-line" },
      { path: "/admin/seo-audit", label: "Auditoría SEO", icon: "ri-radar-line" },
      { path: "/admin/seo-analytics", label: "SEO Analytics", icon: "ri-bar-chart-grouped-line" },
    ],
  },
  {
    label: "Sistema",
    allowedRoles: ["superadmin", "admin"],
    items: [
      { path: "/admin/settings", label: "Ajustes", icon: "ri-settings-3-line" },
      { path: "/admin/users", label: "Usuarios", icon: "ri-user-settings-line", allowedRoles: ["superadmin"] },
      { path: "/admin/activity", label: "Actividad", icon: "ri-history-line" },
    ],
  },
];

function canAccess(allowedRoles: AllowedRole[] | undefined, userRole: string | undefined): boolean {
  if (!allowedRoles) return true;
  return allowedRoles.includes((userRole ?? "") as AllowedRole);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAdmin();

  const visibleGroups = menuGroups
    .filter(group => canAccess(group.allowedRoles, user?.role))
    .map(group => ({
      ...group,
      items: group.items.filter(item => canAccess(item.allowedRoles, user?.role)),
    }))
    .filter(group => group.items.length > 0);

  return (
    <div className="flex h-screen bg-gray-100" data-testid="admin-layout">
      <aside className="w-64 bg-[#1a1a1a] text-white flex flex-col flex-shrink-0 overflow-y-auto" data-testid="admin-sidebar">
        <div className="p-4 border-b border-gray-700">
          <Link href="/admin">
            <span className="text-lg font-bold text-white cursor-pointer" data-testid="admin-logo">
              <span className="text-[#ad023b]">AVISA</span> Admin
            </span>
          </Link>
        </div>
        <nav className="flex-1 py-2">
          {visibleGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <div className="px-4 pt-4 pb-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = location === item.path || (item.path !== "/admin" && location.startsWith(item.path));
                return (
                  <Link key={item.path} href={item.path}>
                    <span
                      className={`flex items-center gap-3 px-4 py-2 text-sm cursor-pointer transition-colors ${
                        isActive
                          ? "bg-[#ad023b] text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                      data-testid={`nav-${item.path.split("/").pop()}`}
                    >
                      <i className={`${item.icon} text-lg`}></i>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#ad023b] rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.username?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.username}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role ?? "editor"}</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            data-testid="button-logout"
          >
            <i className="ri-logout-box-line text-lg" aria-hidden="true"></i>
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
