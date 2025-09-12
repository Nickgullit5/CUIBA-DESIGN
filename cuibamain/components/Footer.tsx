/**
 * Footer con contacto, enlaces y legales.
 * Fondo oscuro → usamos .focus-ring-dark en los enlaces.
 */
export default function Footer() {
  return (
    <footer id="contacto" className="bg-coal py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 rounded-md focus-ring-dark">
              <img src="/images/logo-cuiba-light.png" alt="CUIBA" className="h-9 w-9 rounded" />
              <span className="font-semibold text-white">CUIBA DESIGN</span>
            </div>
            <p className="mt-4 text-sm">CUIBA Design Girona – Cocinas y baños a medida en Girona y Costa Brava.</p>
          </div>

          <div>
            <h3 className="font-medium text-white">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Passatge Puigneulós 14, Baixos 2, 17006 Girona</li>
              <li>
                Tel:{' '}
                <a href="tel:+34611637679" className="hover:underline rounded-md focus-ring-dark">
                  611 637 679
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="mailto:ventas@cuibagirona.com" className="hover:underline rounded-md focus-ring-dark">
                  ventas@cuibagirona.com
                </a>
              </li>
              <li>Horario: L–V 10:00–14:00 y 15:00–20:00</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white">Enlaces</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ['#inicio', 'Inicio'],
                ['#cocinas', 'Cocinas'],
                ['#banos', 'Baños'],
                ['#servicios', 'Servicios'],
                ['#contacto', 'Contacto'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:underline rounded-md focus-ring-dark">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Ronaldt Coca Patiño — Y0943024S</li>
              <li>
                <a href="/legal/aviso-legal" className="hover:underline rounded-md focus-ring-dark">
                  Aviso legal
                </a>
              </li>
              <li>
                <a href="/legal/privacidad" className="hover:underline rounded-md focus-ring-dark">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="/legal/cookies" className="hover:underline rounded-md focus-ring-dark">
                  Política de cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/70">
        © {new Date().getFullYear()} CUIBA Design. Todos los derechos reservados.
      </div>
    </footer>
  );
}

