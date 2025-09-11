import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'CUIBA Design — Cocinas y baños a medida en Girona y Costa Brava',
  description:
    'Diseñamos y reformamos cocinas y baños a medida en Girona y Costa Brava. Pide tu presupuesto gratis y recibe un render 3D sin compromiso en 48h.',
  openGraph: {
    type: 'website',
    title: 'CUIBA Design — Cocinas y baños a medida',
    description:
      'Reformas de cocinas y baños en Girona y Costa Brava. Render 3D y presupuesto en 48h.',
    url: 'https://cuibagirona.com'
  },
  metadataBase: new URL('https://cuibagirona.com')
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "CUIBA Design",
  "url": "https://cuibagirona.com",
  "image": "https://cuibagirona.com/images/logo-cuiba-light.png",
  "email": "ventas@cuibagirona.com",
  "telephone": "+34611637679",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Passatge Puigneulós 14, Baixos 2",
    "addressLocality": "Girona",
    "postalCode": "17006",
    "addressRegion": "Catalunya",
    "addressCountry": "ES"
  },
  "areaServed": ["Girona","Costa Brava"],
  "openingHours": "Mo-Fr 10:00-14:00,15:00-20:00",
  "founder": "Ronaldt Coca Patiño",
  "identifier": "NIF Y0943024S"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="text-slate-800 antialiased bg-snow">
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

