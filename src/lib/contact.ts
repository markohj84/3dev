export const timings = ['Lo antes posible','En 1 a 2 meses','En 3 a 6 meses','Explorando'];
export function validateContact(data: FormData) {
  const fields = ['nombre','empresa','email','tipo_proyecto','presupuesto','timing','descripcion'] as const;
  const values = Object.fromEntries(fields.map(name=>{const value=data.get(name);return [name,typeof value==='string'?value.trim():''];})) as Record<typeof fields[number],string>;
  const errors: Record<string,string> = {};
  for (const name of ['nombre','empresa','email','tipo_proyecto','timing','descripcion'] as const) if(!values[name]) errors[name] = 'Completa este campo.';
  for (const name of fields) if(values[name].length>(name==='descripcion'?6000:254)) errors[name]='El texto es demasiado largo.';
  if(values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email='Escribe un correo válido.';
  if(values.timing && !timings.includes(values.timing)) errors.timing='Selecciona una opción de la lista.';
  return {values,errors};
}
