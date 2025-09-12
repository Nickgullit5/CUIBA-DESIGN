'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { LeadSchema, zodErrorToFieldMap } from '@/lib/lead-schema';

/**
 * Página de inicio:
 * - HERO y Galería con next/image (rendimiento y LCP).
 * - Focus ring accesible (.focus-ring / .focus-ring-dark).
 * - Formulario con validación Zod (cliente) + honeypot + errores por campo.
 */
export default function Page() {
  return (
    <main id="inicio">
      {/* ===========================
         HERO (fondo oscuro)
         - Imagen optimizada (next/image) + overlay para contraste.
         - Botones con focus-ring-dark (fondo oscuro).
         =========================== */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-cocina-01.jpg"
            alt="Cocina con isla en madera y encimera clara — Girona"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-36 text-white">
          <h1 className="max-w-3xl text-4xl font-semibold sm:text-5xl">
            Diseñamos y reformamos <span className="text-wood-light">cocinas y baños</span> a medida en Girona y Costa Brava
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Render 3D sin compromiso y presupuesto claro en 48h. Materiales premium, instalación llave en mano.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cta" className="inline-flex items-center rounded-md bg-sea px-6 py-3 font-medium text-white hover:opacity-90 focus-ring-dark">
              Pide tu presupuesto gratis
            </a>
            <a href="#galeria" className="inline-flex items-center rounded-md bg-white/10 px-6 py-3 font-medium hover:bg-white/20 focus-ring-dark">
              Ver proyectos
            </a>
          </div>
        </div>
      </section>

      {/* ===========================
         COCINAS (fondo claro)
         - Imagen con aspect ratio estable (evita CLS).
         - CTA con focus-ring (fondo claro).
         =========================== */}
      <section id="cocinas" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Cocinas a medida</h2>
              <p className="mt-3 text-slate-600">
                Diseño funcional y estético: mobiliario a medida, encimeras, iluminación, electrodomésticos integrados y soluciones para ganar espacio.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                <li>• Estudio y render 3D incluidos</li>
                <li>• Fabricación y montaje propios</li>
                <li>• Gestión integral de gremios</li>
              </ul>
              <a href="#cta" className="mt-6 inline-flex rounded-md bg-sea px-5 py-2.5 font-medium text-white focus-ring">
                Quiero un render 3D
              </a>
            </div>

            {/* Imagen responsive con relación 4/3 */}
            <div className="relative rounded-xl w-full overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/galeria-01.jpg"
                  alt="Cocina con isla en madera — Girona"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
         BAÑOS (fondo claro)
         =========================== */}
      <section id="banos" className="bg-fog py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative rounded-xl w-full overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/galeria-02.jpg"
                  alt="Baño moderno con encimera clara — Girona"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Reformas de baños</h2>
              <p className="mt-3 text-slate-700">
                Duchas a ras, sanitarios de calidad, microcemento/revestimientos y mamparas a medida. Obra limpia y plazos cerrados.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                <li>• Fontanería y electricidad</li>
                <li>• Materiales resistentes a la humedad</li>
                <li>• Garantías por escrito</li>
              </ul>
              <a href="#cta" className="mt-6 inline-flex rounded-md bg-sea px-5 py-2.5 font-medium text-white focus-ring">
                Pide presupuesto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
         SERVICIOS (informativo)
         =========================== */}
      <section id="servicios" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Servicios principales</h2>
          <p className="mt-2 text-slate-600">Desde el diseño al montaje, con equipo propio.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Cocinas a medida', desc: 'Mobiliario, encimeras, iluminación y electrodomésticos.' },
              { title: 'Reformas de baños', desc: 'Platos de ducha, sanitarios y revestimientos a medida.' },
              { title: 'Llave en mano', desc: 'Albañilería, fontanería, electricidad y pintura.' },
            ].map((s) => (
              <div key={s.title} className="rounded-xl border border-slate-200 p-6">
                <div className="mb-4 h-10 w-10 rounded bg-sea/10 flex items-center justify-center">
                  <span className="text-sea font-bold">✓</span>
                </div>
                <h3 className="font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
         GALERÍA con next/image + lightbox
         - Thumbnails lazy por defecto.
         - Botón con focus-ring.
         =========================== */}
      <Gallery />

      {/* ===========================
         PROCESO (informativo)
         =========================== */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Cómo trabajamos</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Primera cita + render 3D', 'Medimos y preparamos una propuesta visual sin compromiso.'],
              ['Elección de materiales', 'Madera, piedra, porcelánicos y herrajes premium.'],
              ['Presupuesto claro', 'Precio cerrado, calendario y gestión de licencias.'],
              ['Instalación y postventa', 'Equipo propio, limpieza de obra y garantías por escrito.'],
            ].map(([t, d], i) => (
              <div key={i} className="rounded-xl border border-slate-200 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded bg-sea/10">
                  <span className="font-semibold text-sea">{i + 1}</span>
                </div>
                <h3 className="font-medium">{t}</h3>
                <p className="mt-2 text-sm text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
         OPINIONES (informativo)
         =========================== */}
      <section className="bg-fog py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Opiniones</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ['★★★★★', '“Render muy realista y ejecución impecable. ¡Recomendables!”', 'Marta — Girona'],
              ['★★★★★', '“Baño completo en tiempo y precio cerrado. Muy buen trato.”', 'Jordi — Salt'],
              ['★★★★★', '“Llave en mano y resultados de revista. Volveríamos a elegirlos.”', 'Laura — Blanes'],
            ].map(([stars, quote, by], i) => (
              <figure key={i} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="text-amber-400" aria-label={`${stars} estrellas`}>{stars}</div>
                <blockquote className="mt-2 text-slate-700">{quote}</blockquote>
                <figcaption className="mt-3 text-sm text-slate-500">{by}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
         DIFERENCIALES (informativo)
         =========================== */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">¿Por qué CUIBA?</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Diseño mediterráneo + materiales premium',
              'Trabajamos Girona y Costa Brava',
              'Financiación disponible',
              'Render gratis incluido',
            ].map((text) => (
              <div key={text} className="rounded-lg bg-wood-light/15 p-4">{text}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
         CTA + FORM (fondo oscuro)
         - Link WhatsApp con focus-ring-dark.
         - Form en tarjeta blanca (focus-ring en botones).
         =========================== */}
      <section id="cta" className="relative overflow-hidden bg-gradient-to-br from-sea to-coal py-16 text-white">
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,.1), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,.1), transparent 40%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold">Recibe tu presupuesto + render sin compromiso en 48h</h2>
              <p className="mt-3 text-white/90">Déjanos tus datos y te contactamos hoy mismo.</p>
              <div className="mt-6">
                <a
                  href="https://wa.me/34611637679?text=Hola%20CUIBA%2C%20quiero%20un%20presupuesto%20y%20render%203D"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-medium text-sea hover:opacity-90 focus-ring-dark"
                >
                  WhatsApp directo
                </a>
              </div>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>
    </main>
  );
}

/* =======================================================================
   GALERÍA:
   - Grid de miniaturas con next/image (lazy por defecto).
   - Lightbox simple (click para ampliar; click fuera para cerrar).
   - Accesibilidad: aria-label en el botón; foco visible con .focus-ring.
   ======================================================================= */
function Gallery() {
  const items = [
    ['/images/galeria-01.jpg', 'Cocina moderna 10 m² – Girona'],
    ['/images/galeria-03.jpg', 'Isla con estanterías – Blanes'],
    ['/images/galeria-04.jpg', 'Cocina en L — Caldes'],
    ['/images/galeria-05.jpg', 'Cocina madera clara — Girona'],
    ['/images/galeria-06.jpg', 'Encimera piedra natural — Lloret'],
    ['/images/galeria-07.jpg', 'Montaje en curso — Girona'],
  ] as const;

  const [full, setFull] = useState<string | null>(null);

  return (
    <section id="galeria" className="bg-fog py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Proyectos y renders</h2>
            <p className="mt-2 text-slate-600">Selección reciente en Girona y Costa Brava.</p>
          </div>
          <a href="#" className="text-sea hover:underline rounded-md focus-ring">Ver portfolio completo</a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([src, label]) => (
            <button
              key={src}
              onClick={() => setFull(src)}
              className="group relative overflow-hidden rounded-xl bg-white text-left focus-ring"
              aria-label={`Abrir imagen: ${label}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={src}
                  alt={label}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-coal/60 p-3 text-sm text-white">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox (usa object-contain para ver la imagen completa) */}
      {full && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
          onClick={() => setFull(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-[90vw] h-[90vh] max-w-[1200px]">
            <Image src={full} alt="Imagen ampliada" fill sizes="90vw" className="object-contain rounded-xl" />
          </div>
        </div>
      )}
    </section>
  );
}

/* =======================================================================
   FORMULARIO de leads:
   - Validación cliente con Zod (mismas reglas que servidor).
   - Errores por campo (mensaje debajo + borde rojo).
   - Honeypot (campo oculto "website"): si se rellena, el servidor ignora el lead.
   - ARIA live para mensajes globales; atributos aria-invalid/aria-describedby.
   ======================================================================= */
function LeadForm() {
  // Estado global de envío
  const [ok, setOk] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // Errores por campo { nombre?: '...', email?: '...', ... }
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Limpia el error de un campo al escribir
  function clearFieldError(name: string) {
    if (errors[name]) {
      setErrors((e) => {
        const { [name]: _, ...rest } = e;
        return rest;
      });
    }
  }

  // Valida en cliente con Zod (safeParse no lanza excepciones)
  function validateClient(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = LeadSchema.safeParse(data);
    if (parsed.success) return { ok: true as const, data: parsed.data };
    return { ok: false as const, errors: zodErrorToFieldMap(parsed.error) };
  }

  // Submit handler
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErrors({});

    const form = e.currentTarget;

    // 1) Validación cliente
    const v = validateClient(form);
    if (!v.ok) {
      setErrors(v.errors);
      setLoading(false);
      return;
    }

    // 2) POST al API (valida de nuevo en servidor)
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(v.data),
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (json?.errors) setErrors(json.errors as Record<string, string>);
      setOk(false);
      setLoading(false);
      return;
    }

    // 3) OK → reset y mensaje
    form.reset();
    setOk(true);
    setLoading(false);
  }

  // Clases para inputs con/sin error
  function inputClass(name: string) {
    const base = 'mt-1 w-full rounded-md border px-3 py-2';
    return errors[name]
      ? `${base} border-red-500 ring-1 ring-red-500`
      : `${base} border-slate-300`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-6 text-slate-800 shadow-xl">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Nombre */}
        <div className="sm:col-span-2">
          <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            autoComplete="name"
            required
            className={inputClass('nombre')}
            placeholder="Tu nombre"
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? 'err-nombre' : undefined}
            onInput={() => clearFieldError('nombre')}
          />
          {errors.nombre && <p id="err-nombre" className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            required
            className={inputClass('email')}
            placeholder="tucorreo@ejemplo.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
            onInput={() => clearFieldError('email')}
          />
          {errors.email && <p id="err-email" className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            autoComplete="tel"
            inputMode="tel"
            required
            className={inputClass('telefono')}
            placeholder="611 637 679"
            aria-invalid={!!errors.telefono}
            aria-describedby={errors.telefono ? 'err-telefono' : undefined}
            onInput={() => clearFieldError('telefono')}
          />
          {errors.telefono && <p id="err-telefono" className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
        </div>

        {/* Localidad */}
        <div className="sm:col-span-2">
          <label htmlFor="localidad" className="block text-sm font-medium">Localidad</label>
          <input
            id="localidad"
            name="localidad"
            required
            className={inputClass('localidad')}
            placeholder="Girona, Blanes, Figueres..."
            aria-invalid={!!errors.localidad}
            aria-describedby={errors.localidad ? 'err-localidad' : undefined}
            onInput={() => clearFieldError('localidad')}
          />
          {errors.localidad && <p id="err-localidad" className="mt-1 text-sm text-red-600">{errors.localidad}</p>}
        </div>

        {/* Mensaje */}
        <div className="sm:col-span-2">
          <label htmlFor="mensaje" className="block text-sm font-medium">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={3}
            className={inputClass('mensaje')}
            placeholder="Cuéntanos tu reforma (m², estilo, plazo)"
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? 'err-mensaje' : undefined}
            onInput={() => clearFieldError('mensaje')}
          />
          {errors.mensaje && <p id="err-mensaje" className="mt-1 text-sm text-red-600">{errors.mensaje}</p>}
        </div>

        {/* Honeypot (oculto). Si un bot lo rellena, el servidor ignora el lead. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="website">No rellenar</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Consentimiento RGPD */}
        <label className="sm:col-span-2 flex items-start gap-2 text-sm text-slate-600">
          <input type="checkbox" required className="mt-1" />
          Acepto la política de privacidad y el tratamiento de datos para responder a mi solicitud.
        </label>

        {/* Acciones */}
        <div className="sm:col-span-2 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-md bg-sea px-5 py-2.5 font-medium text-white hover:opacity-90 disabled:opacity-50 focus-ring"
          >
            {loading ? 'Enviando…' : 'Enviar solicitud'}
          </button>

          <button
            type="button"
            onClick={() => {
              const form = document.querySelector('#cta form') as HTMLFormElement;
              const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
              const text = encodeURIComponent(
                `Hola CUIBA, soy ${data.nombre || ''}. Localidad: ${data.localidad || ''}. Tel: ${data.telefono || ''}. Quiero un render 3D y presupuesto. Detalles: ${data.mensaje || ''}`
              );
              window.open(`https://wa.me/34611637679?text=${text}`, '_blank');
            }}
            className="inline-flex items-center rounded-md border border-slate-300 px-5 py-2.5 focus-ring"
          >
            Enviar por WhatsApp
          </button>
        </div>

        {/* Mensajes globales (aria-live para lectores de pantalla) */}
        <div className="sm:col-span-2" aria-live="polite">
          {ok === true && <p className="text-sm text-green-700">¡Gracias! Te contactaremos en breve.</p>}
          {ok === false && Object.keys(errors).length === 0 && (
            <p className="text-sm text-red-700">Ha ocurrido un error. Prueba por WhatsApp.</p>
          )}
        </div>
      </div>
    </form>
  );
}
