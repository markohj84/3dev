import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const nombre      = data.get('nombre')?.toString().trim() ?? '';
  const empresa     = data.get('empresa')?.toString().trim() ?? '';
  const email       = data.get('email')?.toString().trim() ?? '';
  const linkedin    = data.get('linkedin')?.toString().trim() ?? '';
  const tipo        = data.get('tipo_proyecto')?.toString().trim() ?? '';
  const presupuesto = data.get('presupuesto')?.toString().trim() ?? '';
  const timing      = data.get('timing')?.toString().trim() ?? '';
  const descripcion = data.get('descripcion')?.toString().trim() ?? '';

  if (!nombre || !empresa || !email || !tipo || !descripcion) {
    return new Response(JSON.stringify({ error: 'Campos requeridos faltantes.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Configuración de correo no disponible.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: monospace; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="border-bottom: 2px solid #5dc4a4; padding-bottom: 12px; color: #085041;">
        Nuevo contacto — 3dev.mx
      </h2>

      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        <tr><td style="padding: 10px 0; color: #555; width: 160px;">Nombre</td><td style="padding: 10px 0; font-weight: 600;">${nombre}</td></tr>
        <tr><td style="padding: 10px 0; color: #555;">Empresa</td><td style="padding: 10px 0; font-weight: 600;">${empresa}</td></tr>
        <tr><td style="padding: 10px 0; color: #555;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #1d9e75;">${email}</a></td></tr>
        ${linkedin ? `<tr><td style="padding: 10px 0; color: #555;">LinkedIn</td><td style="padding: 10px 0;"><a href="${linkedin}" style="color: #1d9e75;">${linkedin}</a></td></tr>` : ''}
        <tr><td style="padding: 10px 0; color: #555;">Tipo</td><td style="padding: 10px 0;">${tipo}</td></tr>
        <tr><td style="padding: 10px 0; color: #555;">Presupuesto</td><td style="padding: 10px 0;">${presupuesto || '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #555;">Timing</td><td style="padding: 10px 0;">${timing}</td></tr>
      </table>

      <div style="background: #f4f9f7; border-left: 3px solid #5dc4a4; padding: 20px 24px; border-radius: 4px; margin: 24px 0;">
        <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${descripcion}</p>
      </div>

      <p style="color: #999; font-size: 12px; margin-top: 32px;">
        Enviado desde 3dev.mx · ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
      </p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: 'Formulario 3dev <onboarding@resend.dev>',
    to:   ['contacto@3dev.mx'],
    replyTo: email,
    subject: `Nuevo lead — ${nombre} · ${empresa}`,
    html,
  });

  if (error) {
    console.error('Resend error FULL:', JSON.stringify(error, null, 2));
    return new Response(JSON.stringify({ error: 'No se pudo enviar el correo.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
