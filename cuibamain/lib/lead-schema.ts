// lib/lead-schema.ts
// ---------------------------------------------------------
// Esquema Zod compartido para el lead.
// Lo usamos tanto en cliente (mostrar errores por campo)
// como en servidor (validación definitiva).
// ---------------------------------------------------------
import { z } from 'zod';

export const LeadSchema = z.object({
  nombre: z.string().min(2, 'Introduce tu nombre (mín. 2 caracteres)'),
  email: z.string().email('Introduce un email válido'),
  telefono: z
    .string()
    .min(7, 'Teléfono demasiado corto')
    .regex(/^[0-9+\s\-()]{7,}$/, 'Teléfono no válido'),
  localidad: z.string().min(2, 'Indica tu localidad'),
  mensaje: z
    .string()
    .max(800, 'Máximo 800 caracteres')
    .optional()
    .default(''),

  // Honeypot: debe venir vacío. Los bots suelen autocompletarlo.
  // Lo validamos en servidor para descartarlo, pero aquí también
  // lo declaramos para que safeParse no se queje si existe el campo.
  website: z.string().max(0).optional().default(''),
});

export type LeadInput = z.infer<typeof LeadSchema>;

// Helper: convierte ZodError a { campo: "mensaje" }
export function zodErrorToFieldMap(e: unknown): Record<string, string> {
  const map: Record<string, string> = {};
  if (e && typeof e === 'object' && 'issues' in (e as any)) {
    for (const issue of (e as any).issues as Array<{ path: (string | number)[]; message: string }>) {
      const key = String(issue.path[0] ?? 'form');
      if (!map[key]) map[key] = issue.message;
    }
  }
  return map;
}
