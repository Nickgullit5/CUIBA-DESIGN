// app/layout.tsx
// ————————————————————————————————————————————————————————————————
// Layout raíz (App Router).
// - Carga estilos globales y la tipografía Inter (next/font).
// - Define metadatos SEO (OpenGraph + Twitter Card mejorados).
// - Inyecta JSON-LD de negocio local (schema.org).
// - Envuelve las páginas con Header / Footer / CookieBanner.
// ————————————————————————————————————————————————————————————————

import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// UI común
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

// Tipografía optimizada (sin FOUT)
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });

// URL base para metadatos absolutos (ajústala en Vercel → SITE_URL)
const SITE_URL = process.env.SITE_URL || 'https://cuibadesign.com';

// ————————————————————————————————————————————————————————————————
// METADATA global
// • metadataBase → construye URLs absolutas (ej. OG image).
// • openGraph → control de cómo se ve la previsualización en WhatsApp/Facebook.
// • twitter → control de la tarjeta en Twitter/X (usamos summary_large_image).
// • themeColor → color del UI (Chrome en Android, etc.).
// • alternates.canonical → URL canónica de la home.
// ————————————————————————————————————————————————————————————————
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'CUIBA Design — Cocinas y baños a medida en Girona y Costa Brava',
  description:
    'Diseñamos y reformamos cocinas y baños a medida en Girona y Costa Brava. Pide tu presupuesto gratis y recibe un render 3D sin compromiso en 48h.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'CUIBA Design',
    url: '/', // con metadataBase se resolverá a SITE_URL + "/"
    title: 'CUIBA Design — Cocinas y baños a medida en Girona y Costa Brava',
    description:
      'Reformas de cocinas y baños en Girona y Costa Brava. Render 3D y presupuesto en 48h.',
    // Reemplaza /og.jpg por tu imagen en public/ (1200x630, JPG/PNG/WebP)
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'CUIBA Design — Reformas de cocinas y baños en Girona y Costa Brava',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CUIBA Design — Cocinas y baños a medida en Girona y Costa Brava',
    description:
      'Reformas de cocinas y baños en Girona y Costa Brava. Render 3D y presupuesto en 48h.',
    images: ['/og.jpg'], // Next resolverá a URL absoluta con metadataBase
    // Si tienes usuario de X/Twitter, descomenta y actualiza:
    // site: '@cuibagirona',
    // creator: '@cuibagirona',
  },
  themeColor: '#007F7F'
};

// ————————————————————————————————————————————————————————————————
// JSON-LD (schema.org) para SEO local (Business Profile).
// ————————————————————————————————————————————————————————————————
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'CUIBA Design',
  url: SITE_URL,
  image: `${SITE_URL}/images/logo-cuiba-light.png`,
  email: 'info@cuibadesign.com',
  telephone: '+34611637679',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Passatge Puigneulós 14, Baixos 2',
    addressLocality: 'Girona',
    postalCode: '17006',
    addressRegion: 'Catalunya',
    addressCountry: 'ES'
  },
  areaServed: ['Girona', 'Costa Brava'],
  openingHours: 'Mo-Fr 10:00-14:00,15:00-20:00',
  founder: 'Ronaldt Coca Patiño',
  identifier: 'NIF Y0943024S',
  sameAs: [
    // Añade redes cuando estén listas:
    // 'https://www.instagram.com/tuusuario',
    // 'https://www.facebook.com/tuusuario',
    // 'https://www.pinterest.com/tuusuario'
  ]
};

// ————————————————————————————————————————————————————————————————
// RootLayout: aplica Inter a todo el <body>, UI compartida y JSON-LD.
// ————————————————————————————————————————————————————————————————
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} text-slate-800 antialiased bg-snow`}>
        <Header />
        {children}
        <Footer />
        <CookieBanner />

        {/* Inyección segura de JSON-LD (sin dangerouslySetInnerHTML) */}
        <Script id="cuiba-ldjson" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      </body>
    </html>
  );
}

