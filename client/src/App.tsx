import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ChatbotWidget from "@/components/ChatbotWidget";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import { useAdmin } from "@/hooks/useAdmin";
import { lazy, Suspense } from "react";
import CookieConsent from "@/components/CookieConsent";

const PromocionesElectricosPage = lazy(() => import("@/pages/promociones-electricos"));
const PromocionesHibridosPage = lazy(() => import("@/pages/promociones-hibridos"));
const AutoplusPage = lazy(() => import("@/pages/autoplus"));
const PostventaPage = lazy(() => import("@/pages/postventa"));
const PreguntasPage = lazy(() => import("@/pages/preguntas"));
const PreguntasCategoriaPage = lazy(() => import("@/pages/preguntas-categoria"));
const PreguntasDetallePage = lazy(() => import("@/pages/preguntas-detalle"));
const ConcesionariosPage = lazy(() => import("@/pages/concesionarios"));
const ElectrificacionPage = lazy(() => import("@/pages/electrificacion"));
const ConductoresAdopcionPage = lazy(() => import("@/pages/conductores-adopcion"));
const TerminosPage = lazy(() => import("@/pages/terminos"));
const AvisoLegalPage = lazy(() => import("@/pages/aviso-legal"));
const PoliticaCookiesPage = lazy(() => import("@/pages/politica-cookies"));
const CondicionesUsoPage = lazy(() => import("@/pages/condiciones-uso"));
const AccesibilidadPage = lazy(() => import("@/pages/accesibilidad"));
const ConfirmacionContactoPage = lazy(() => import("@/pages/confirmacion-contacto"));
const ConfirmacionCitaPage = lazy(() => import("@/pages/confirmacion-cita"));
const ConfirmacionMovesPage = lazy(() => import("@/pages/confirmacion-moves"));
const ConfirmacionSolicitudPage = lazy(() => import("@/pages/confirmacion-solicitud"));
const VehiculoElectricoPage = lazy(() => import("@/pages/vehiculo-electrico"));
const VehiculoHibridoPage = lazy(() => import("@/pages/vehiculo-hibrido"));
const ServicioDispatcher = lazy(() => import("@/pages/servicio-dispatcher"));
const MarcaDetallePage = lazy(() => import("@/pages/marca-detalle"));

const AdminLogin = lazy(() => import("@/pages/admin/login"));
const AdminDashboard = lazy(() => import("@/pages/admin/dashboard"));
const AdminVehicles = lazy(() => import("@/pages/admin/vehicles"));
const AdminBrands = lazy(() => import("@/pages/admin/brands"));
const AdminLeads = lazy(() => import("@/pages/admin/leads"));
const AdminPagesPage = lazy(() => import("@/pages/admin/pages-admin"));
const AdminPageEditor = lazy(() => import("@/pages/admin/page-editor"));
const AdminDealers = lazy(() => import("@/pages/admin/dealers"));
const AdminFaqs = lazy(() => import("@/pages/admin/faqs"));
const AdminTestimonials = lazy(() => import("@/pages/admin/testimonials"));
const AdminPromotions = lazy(() => import("@/pages/admin/promotions"));
const AdminServices = lazy(() => import("@/pages/admin/services"));
const AdminPlans = lazy(() => import("@/pages/admin/plans"));
const AdminSettings = lazy(() => import("@/pages/admin/settings"));
const AdminSections = lazy(() => import("@/pages/admin/sections"));
const AdminUsers = lazy(() => import("@/pages/admin/users"));
const AdminActivity = lazy(() => import("@/pages/admin/activity"));
const AdminWhatsappFaq = lazy(() => import("@/pages/admin/whatsapp-faq"));
const AdminChatbot = lazy(() => import("@/pages/admin/chatbot"));
const AdminSeo = lazy(() => import("@/pages/admin/seo"));
const AdminIndexacion = lazy(() => import("@/pages/admin/indexacion"));
const AdminTopicalAuthority = lazy(() => import("@/pages/admin/topical-authority"));
const AdminSeoAnalytics = lazy(() => import("@/pages/admin/seo-analytics"));
const AdminFaqGenerator = lazy(() => import("@/pages/admin/faq-generator"));
const AdminImportFaqs = lazy(() => import("@/pages/admin/import-faqs"));
const AdminScheduledGrowth = lazy(() => import("@/pages/admin/scheduled-growth"));
const AdminMedia = lazy(() => import("@/pages/admin/media"));

function AdminGuard({ children }: { children: React.ReactNode }) {
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

function AdminRoute({ component: Component }: { component: React.LazyExoticComponent<() => JSX.Element> }) {
  return (
    <AdminGuard>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="text-gray-500">Cargando...</div></div>}>
        <Component />
      </Suspense>
    </AdminGuard>
  );
}

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-gray-500">Cargando...</div>
  </div>
);

function LazyRoute({ component: Component }: { component: React.LazyExoticComponent<React.ComponentType<any>> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Component />
    </Suspense>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/promociones-electricos">{() => <LazyRoute component={PromocionesElectricosPage} />}</Route>
      <Route path="/promociones-hibridos">{() => <LazyRoute component={PromocionesHibridosPage} />}</Route>
      <Route path="/autoplus">{() => <LazyRoute component={AutoplusPage} />}</Route>
      <Route path="/postventa">{() => <LazyRoute component={PostventaPage} />}</Route>
      <Route path="/preguntas">{() => <LazyRoute component={PreguntasPage} />}</Route>
      <Route path="/preguntas/:categoria">{() => <LazyRoute component={PreguntasCategoriaPage} />}</Route>
      <Route path="/preguntas/:categoria/:pregunta">{() => <LazyRoute component={PreguntasDetallePage} />}</Route>
      <Route path="/concesionarios">{() => <LazyRoute component={ConcesionariosPage} />}</Route>
      <Route path="/electrificacion">{() => <LazyRoute component={ElectrificacionPage} />}</Route>
      <Route path="/conductores-adopcion">{() => <LazyRoute component={ConductoresAdopcionPage} />}</Route>
      <Route path="/marcas/:slug">{() => <LazyRoute component={MarcaDetallePage} />}</Route>
      <Route path="/servicios/:slug">{() => <LazyRoute component={ServicioDispatcher} />}</Route>
      <Route path="/terminos">{() => <LazyRoute component={TerminosPage} />}</Route>
      <Route path="/aviso-legal">{() => <LazyRoute component={AvisoLegalPage} />}</Route>
      <Route path="/politica-cookies">{() => <LazyRoute component={PoliticaCookiesPage} />}</Route>
      <Route path="/condiciones-uso">{() => <LazyRoute component={CondicionesUsoPage} />}</Route>
      <Route path="/accesibilidad">{() => <LazyRoute component={AccesibilidadPage} />}</Route>
      <Route path="/confirmacion-contacto">{() => <LazyRoute component={ConfirmacionContactoPage} />}</Route>
      <Route path="/confirmacion-cita">{() => <LazyRoute component={ConfirmacionCitaPage} />}</Route>
      <Route path="/confirmacion-moves">{() => <LazyRoute component={ConfirmacionMovesPage} />}</Route>
      <Route path="/confirmacion-solicitud">{() => <LazyRoute component={ConfirmacionSolicitudPage} />}</Route>
      <Route path="/vehiculos/electricos/:slug">{() => <LazyRoute component={VehiculoElectricoPage} />}</Route>
      <Route path="/vehiculos/hibridos/:slug">{() => <LazyRoute component={VehiculoHibridoPage} />}</Route>
      <Route path="/admin/login">{() => <Suspense fallback={<div />}><AdminLogin /></Suspense>}</Route>
      <Route path="/admin">{() => <AdminRoute component={AdminDashboard} />}</Route>
      <Route path="/admin/vehicles">{() => <AdminRoute component={AdminVehicles} />}</Route>
      <Route path="/admin/brands">{() => <AdminRoute component={AdminBrands} />}</Route>
      <Route path="/admin/leads">{() => <AdminRoute component={AdminLeads} />}</Route>
      <Route path="/admin/pages">{() => <AdminRoute component={AdminPagesPage} />}</Route>
      <Route path="/admin/pages/edit/:slug">{() => <AdminRoute component={AdminPageEditor} />}</Route>
      <Route path="/admin/dealers">{() => <AdminRoute component={AdminDealers} />}</Route>
      <Route path="/admin/faqs">{() => <AdminRoute component={AdminFaqs} />}</Route>
      <Route path="/admin/whatsapp-faq">{() => <AdminRoute component={AdminWhatsappFaq} />}</Route>
      <Route path="/admin/chatbot">{() => <AdminRoute component={AdminChatbot} />}</Route>
      <Route path="/admin/faq-generator">{() => <AdminRoute component={AdminFaqGenerator} />}</Route>
      <Route path="/admin/import-faqs">{() => <AdminRoute component={AdminImportFaqs} />}</Route>
      <Route path="/admin/scheduled-growth">{() => <AdminRoute component={AdminScheduledGrowth} />}</Route>
      <Route path="/admin/media">{() => <AdminRoute component={AdminMedia} />}</Route>
      <Route path="/admin/testimonials">{() => <AdminRoute component={AdminTestimonials} />}</Route>
      <Route path="/admin/promotions">{() => <AdminRoute component={AdminPromotions} />}</Route>
      <Route path="/admin/services">{() => <AdminRoute component={AdminServices} />}</Route>
      <Route path="/admin/plans">{() => <AdminRoute component={AdminPlans} />}</Route>
      <Route path="/admin/settings">{() => <AdminRoute component={AdminSettings} />}</Route>
      <Route path="/admin/sections">{() => <AdminRoute component={AdminSections} />}</Route>
      <Route path="/admin/users">{() => <AdminRoute component={AdminUsers} />}</Route>
      <Route path="/admin/activity">{() => <AdminRoute component={AdminActivity} />}</Route>
      <Route path="/admin/seo">{() => <AdminRoute component={AdminSeo} />}</Route>
      <Route path="/admin/indexacion">{() => <AdminRoute component={AdminIndexacion} />}</Route>
      <Route path="/admin/topical-authority">{() => <AdminRoute component={AdminTopicalAuthority} />}</Route>
      <Route path="/admin/seo-analytics">{() => <AdminRoute component={AdminSeoAnalytics} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieConsent />
        <ChatbotWidget />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
