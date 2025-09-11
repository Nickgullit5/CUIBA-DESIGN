'use client';
import { useEffect, useState } from 'react';
const KEY = 'cuiba-cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (typeof window !== 'undefined' && !localStorage.getItem(KEY)) setVisible(true); }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl rounded-xl bg-white shadow-lg border border-slate-200 p-4 z-50">
      <p className="text-sm text-slate-700">
        Usamos cookies propias para mejorar la experiencia. <a href="/legal/cookies" className="underline">Saber más</a>.
      </p>
      <div className="mt-3 flex gap-2 justify-end">
        <button
          className="rounded-md border border-slate-300 px-4 py-2 text-sm"
          onClick={() => { localStorage.setItem(KEY, 'rejected'); setVisible(false); }}
        >
          Rechazar
        </button>
        <button
          className="rounded-md bg-sea px-4 py-2 text-sm text-white"
          onClick={() => { localStorage.setItem(KEY, 'accepted'); setVisible(false); }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
