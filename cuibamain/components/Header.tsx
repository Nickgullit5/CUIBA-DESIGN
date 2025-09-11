'use client';
import Link from 'next/link';
import { useState } from 'react';

/**
 * Header sticky con navegación principal.
 * A11Y: añadimos .focus-ring-dark a enlaces/botones sobre fondo oscuro.
 */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-coal/95 backdrop-blur border-b border-black/20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + marca — foco visible accesible */}
          <Link href="#inicio" className="flex items-center gap-3 rounded-md focus-ring-dark">
            <img src="/images/logo-cuiba-light.png" alt="CUIBA Design" className="h-9 w-9 rounded" />
            <span className="font-semibold tracking-wide">CUIBA DESIGN</span>
          </Link>

          {/* Menú desktop */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Principal">
            {[
              ['#inicio', 'Inicio'],
              ['#cocinas', 'Cocinas'],
              ['#banos', 'Baños'],
              ['#servicios', 'Servicios'],
              ['#galeria', 'Proyectos'],
              ['#contacto', 'Contacto'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-md px-1 hover:text-sea focus-ring-dark">
                {label}
              </a>
            ))}
          </nav>

          {/* Acciones (tel/wa/cta) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+34611637679"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm hover:border-sea hover:text-sea focus-ring-dark"
            >
              <span className="hidden lg:inline">611 637 679</span>
            </a>
            <a
              href="https://wa.me/34611637679?text=Hola%20CUIBA%2C%20quiero%20un%20presupuesto%20gratis"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-3 py-2 text-sm text-white hover:opacity-90 focus-ring-dark"
            >
              WhatsApp
            </a>
            <a
              href="#cta"
              className="ml-2 inline-flex items-center rounded-md bg-sea px-4 py-2 text-sm font-semibold text-white hover:opacity-90 focus-ring-dark"
            >
              Pide tu presupuesto gratis
            </a>
          </div>

          {/* Hamburguesa móvil — foco visible */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus-ring-dark"
            aria-label="Abrir menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {open && (
          <nav className="md:hidden pb-4" aria-label="Menú móvil">
            <div className="flex flex-col gap-2">
              {[
                ['#inicio', 'Inicio'],
                ['#cocinas', 'Cocinas'],
                ['#banos', 'Baños'],
                ['#servicios', 'Servicios'],
                ['#galeria', 'Proyectos'],
                ['#contacto', 'Contacto'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="py-2 rounded-md focus-ring-dark">
                  {label}
                </a>
              ))}
              <a
                href="#cta"
                className="mt-2 inline-flex items-center justify-center rounded-md bg-sea px-4 py-2 text-sm font-semibold text-white focus-ring-dark"
              >
                Pide tu presupuesto gratis
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

