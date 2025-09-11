// app/layout.tsx
// ————————————————————————————————————————————————————————————————
// Layout raíz de la App Router (Next.js).
// Aquí cargamos estilos globales, definimos la tipografía (Inter),
// metadatos SEO compartidos y envolvemos todas las páginas con
// Header / Footer / CookieBanner.
// ————————————————————————————————————————————————————————————————

import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// Componentes de la UI común
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

// TIPOGRAFÍA: next/font (Inter) — carga optimizada, sin FOUT/FORB
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],   // glifos necesarios (reduce peso)
  display: 'swap'       // usa sistema hasta que Inter esté lista (mejor CLS)
});

// ————————————————————————————————————————————————————————————————
// METADATA global (título/OG/Twitter). Next inyecta esto en <head>.
// Ajusta SITE_URL en Vercel para que coincidida con tu dominio final.
// ————————————————————————————————————————————————————————————————
export const metadata: Metadata = {
  title: 'CUIBA Design — Cocinas y baños a medida en Girona y Costa Brava',
  description:
    'Diseñamos y reformamos cocinas y baños a medida en Girona y Costa Brava. Pide tu presupuesto gratis y recibe un render 3D sin compromiso en 48h.',
  metadataBase: new URL('https://cuibagirona.com'),
  openGraph: {
    type: 'website',
    title: 'CUIBA Design — Cocinas y baños a medida',
    description:
      'Reformas de cocinas y baños en Girona y Costa Brava. Render 3D y presupuesto en 48h.',
    url: 'https://cuibagirona.com',
    images: ['/og.jpg'] // coloca un 1200x630 en public/og.jpg para mejores previews
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.jpg']
  }
};

// ————————————————————————————————————————————————————————————————
// JSON-LD (schema.org) para SEO local. Se inyecta como <script type="application/ld+json">.
// ————————————————————————————————————————————————————————————————
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'CUIBA Design',
  url: 'https://cuibagirona.com',
  image: 'https://cuibagirona.com/images/logo-cuiba-light.png',
  email: 'ventas@cuibagirona.com',
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
    // Añade tus redes si las tienes publicadas
    // 'https://www.instagram.com/tuusuario',
    // 'https://www.facebook.com/tuusuario',
    // 'https://www.pinterest.com/tuusuario'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cocinas a medida' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reformas de baños' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Proyecto llave en mano' } }
    ]
  }
};

// ————————————————————————————————————————————————————————————————
// RootLayout: envuelve todas las rutas. Cargamos Inter en <body>.
// ————————————————————————————————————————————————————————————————
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* 
        Nota: <body> aplica la clase de Inter para que toda la web
        use la fuente, además de las utilidades Tailwind globales.
      */}
      <body className={`${inter.className} text-slate-800 antialiased bg-snow`}>
        {/* HEADER sticky con menú/CTA */}
        <Header />

        {/* CONTENIDO de cada página (app/...) */}
        {children}

        {/* FOOTER con contacto, legales y claim */}
        <Footer />

        {/* Banner de cookies básico (propias) */}
        <CookieBanner />

        {/* Inyectamos JSON-LD de forma segura sin romper el type-check */}
        <Script id="cuiba-ldjson" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
      </body>
    </html>
  );
}

