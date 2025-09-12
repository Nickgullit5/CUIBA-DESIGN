// app/api/lead/route.ts
// ---------------------------------------------------------
// API de leads:
// - Honeypot (website) → si viene relleno, ignoramos (probable bot).
// - Validación con Zod: devolvemos errores por campo.
// - Envío por email con SMTP si está configurado; si no, logeamos.
// ---------------------------------------------------------
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { LeadSchema, zodErrorToFieldMap } from '@/lib/lead-schema';

export async function POST(req: Request) {
  try {
    const raw = await req.json();

    // 1) Honeypot: si el campo oculto viene relleno, ignoramos (no revelamos nada al bot).
    if (raw?.website) {
      console.log('Honeypot hit. Ignorando lead aparente bot.');
      return NextResponse.json({ ok: true, ignored: true }); // OK silencioso
    }

    // 2) Validación con Zod (servidor es la autoridad final)
    const parsed = LeadSchema.omit({ website: true }).parse(raw);

    // 3) Si hay SMTP configurado, enviamos email
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && TO_EMAIL) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      const info = await transporter.sendMail({
        from: `CUIBA Web <${SMTP_USER}>`,
        to: TO_EMAIL,
        subject: 'Nuevo lead — CUIBA',
        text: `Nombre: ${parsed.nombre}
Email: ${parsed.email}
Teléfono: ${parsed.telefono}
Localidad: ${parsed.localidad}
Mensaje: ${parsed.mensaje || ''}`,
      });

      return NextResponse.json({ ok: true, messageId: info.messageId });
    }

    // 4) Sin SMTP: log para verificar en Vercel → Functions → Logs
    console.log('Lead (sin SMTP configurado):', parsed);
    return NextResponse.json({ ok: true, fallback: true });
  } catch (err) {
    // 5) Si es error de Zod, devolvemos errores por campo
    const fields = zodErrorToFieldMap(err);
    if (Object.keys(fields).length) {
      return NextResponse.json({ ok: false, errors: fields }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ ok: false, error: 'Error inesperado' }, { status: 500 });
  }
}


