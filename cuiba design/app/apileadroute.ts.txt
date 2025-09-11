import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const LeadSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
  telefono: z.string().min(5),
  localidad: z.string().min(1),
  mensaje: z.string().optional().default('')
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsed = LeadSchema.parse(data);

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL } = process.env;

    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && TO_EMAIL) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
      });

      const info = await transporter.sendMail({
        from: `CUIBA Web <${SMTP_USER}>`,
        to: TO_EMAIL,
        subject: 'Nuevo lead — CUIBA',
        text: `Nombre: ${parsed.nombre}
Email: ${parsed.email}
Teléfono: ${parsed.telefono}
Localidad: ${parsed.localidad}
Mensaje: ${parsed.mensaje}`
      });

      return NextResponse.json({ ok: true, messageId: info.messageId });
    }

    console.log('Lead (sin SMTP configurado):', parsed);
    return NextResponse.json({ ok: true, fallback: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ ok: false, error: err.message || 'Invalid payload' }, { status: 400 });
  }
}
