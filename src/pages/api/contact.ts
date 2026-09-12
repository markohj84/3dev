import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { validateContact } from '../../lib/contact';
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const respond = (status:number, error?:string, errors?:Record<string,string>) => {
    if(request.headers.get('accept')?.includes('application/json')) return Response.json(error?{error,errors}:{ok:true},{status});
    const message=error?'No pudimos enviar tu mensaje. Revisa los campos o escríbenos a contacto@3dev.mx.':'Mensaje enviado. Gracias por contarnos tu proyecto.';
    return new Response(`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Contacto — 3dev</title><body style="font-family:system-ui;background:#111310;color:#f4f3ee;padding:8vw;line-height:1.6"><main><h1>${message}</h1><p><a style="color:#5dc4a4" href="/contacto">Volver a contacto</a></p><a style="color:#5dc4a4" href="mailto:contacto@3dev.mx">contacto@3dev.mx</a></main></body></html>`,{status,headers:{'Content-Type':'text/html; charset=utf-8'}});
  };
  let form:FormData;
  try { form=await request.formData(); } catch { return respond(400,'No pudimos leer el formulario. Inténtalo de nuevo.'); }
  const {values,errors}=validateContact(form);
  if(Object.keys(errors).length) return respond(400,'Revisa los campos señalados.',errors);
  const apiKey=import.meta.env.RESEND_API_KEY;
  if(!apiKey) return respond(503,'El formulario no está disponible ahora. Escríbenos a contacto@3dev.mx.');
  try {
    const {error}=await new Resend(apiKey).emails.send({
      from:'Formulario 3dev <noreply@3dev.mx>',to:['contacto@3dev.mx'],replyTo:values.email,
      subject:`Nuevo proyecto · ${values.empresa.replace(/[\r\n]/g,' ')}`,
      text:`Nombre: ${values.nombre}\nEmpresa: ${values.empresa}\nEmail: ${values.email}\nProyecto: ${values.tipo_proyecto}\nPresupuesto: ${values.presupuesto || 'Sin definir'}\nInicio: ${values.timing}\n\n${values.descripcion}`,
    });
    if(error) return respond(502,'No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos a contacto@3dev.mx.');
    return respond(200);
  } catch { return respond(502,'No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos a contacto@3dev.mx.'); }
};
