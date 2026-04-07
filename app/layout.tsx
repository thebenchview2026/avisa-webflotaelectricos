import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Providers from "./providers";
import JsonLd from "./json-ld";
import "./globals.css";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap";
const LOGO_IMAGE = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=630&fit=crop&auto=format&q=80";

const BASE_URL = "https://electricos.grupoavisa.com";
const OG_IMAGE = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=630&fit=crop&auto=format&q=80";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Coches Eléctricos e Híbridos en Sevilla | Grupo Avisa",
    template: "%s | Grupo Avisa",
  },
  description: "Concesionario oficial Volkswagen, Audi y Škoda en Sevilla. Vehículos eléctricos e híbridos con hasta 7.000 € del Plan MOVES. +50 técnicos certificados.",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: BASE_URL,
    siteName: "Grupo Avisa",
    title: "Concesionario Oficial Vehículos Eléctricos e Híbridos en Sevilla | Grupo Avisa",
    description: "Tu concesionario oficial de coches eléctricos e híbridos en Andalucía y Extremadura. Volkswagen, Audi, Škoda y 11 marcas más.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: "Grupo Avisa - Vehículos Eléctricos e Híbridos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Avisa - Vehículos Eléctricos e Híbridos",
    description: "Descubre la gama más completa de vehículos eléctricos e híbridos enchufables. Hasta 7.000€ de ayuda con Plan MOVES.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  other: {
    "geo.region": "ES-AN",
    "geo.placename": "Sevilla, Andalucía",
    "geo.position": "37.3748;-5.9637",
    "ICBM": "37.3748, -5.9637",
  },
  alternates: {
    types: {
      "text/plain": "/llms.txt",
      "application/json": "/ai-hints.json",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ad023b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://fonts.googleapis.com" suppressHydrationWarning />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" suppressHydrationWarning />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" suppressHydrationWarning />
        <link rel="dns-prefetch" href="https://unpkg.com" suppressHydrationWarning />
        <link rel="preload" href={FONT_URL} as="style" suppressHydrationWarning />
        <link rel="stylesheet" href={FONT_URL} suppressHydrationWarning />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.min.css"
          suppressHydrationWarning
        />
        <link rel="preload" as="image" href={LOGO_IMAGE} suppressHydrationWarning />
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
            <h1>Grupo Avisa - Vehículos Eléctricos e Híbridos</h1>
            <p>Concesionario oficial Volkswagen, Audi y Škoda en Andalucía y Extremadura.</p>
            <p>Para la mejor experiencia, activa JavaScript en tu navegador.</p>
            <p>
              Contacto: <a href="tel:+34955034600">955 034 600</a> |{" "}
              <a href="mailto:info@grupoavisa.com">info@grupoavisa.com</a>
            </p>
          </div>
        </noscript>
        <Providers>{children}</Providers>
        <JsonLd />
        <Script id="gtag-consent" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'functionality_storage': 'granted',
  'security_storage': 'granted',
  'wait_for_update': 500
});`}
        </Script>
      </body>
    </html>
  );
}
