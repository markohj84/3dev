import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateContact} from '../src/lib/contact.ts';
function form(overrides:Record<string,string>={}) {
 const data = new FormData();
 for(const [k,v] of Object.entries({nombre:' Persona ',empresa:'Empresa',email:'persona@example.com',tipo_proyecto:'Producto digital',timing:'Explorando',descripcion:'Queremos construir un producto digital.',...overrides})) data.set(k,v);
 return data;
}
test('accepts a complete inquiry and trims input',()=>{const result=validateContact(form());assert.deepEqual(result.errors,{});assert.equal(result.values.nombre,'Persona');});
test('identifies each missing required field',()=>{const {errors}=validateContact(new FormData());assert.deepEqual(Object.keys(errors).sort(),['nombre','empresa','email','tipo_proyecto','timing','descripcion'].sort());});
test('rejects malformed email before contacting the provider',()=>{assert.ok(validateContact(form({email:'not-an-email'})).errors.email);});
test('limits long messages and rejects unsupported choices',()=>{const {errors}=validateContact(form({descripcion:'x'.repeat(6001),timing:'yesterday',tipo_proyecto:'x'.repeat(255)}));assert.ok(errors.descripcion);assert.ok(errors.timing);assert.ok(errors.tipo_proyecto);});
test('accepts any free-text project description',()=>{assert.equal(validateContact(form({tipo_proyecto:'Un agente que conteste WhatsApp'})).errors.tipo_proyecto,undefined);});
test('rejects file values in text fields',()=>{const data=form();data.set('nombre',new Blob(['example']),'example.txt');assert.ok(validateContact(data).errors.nombre);});
