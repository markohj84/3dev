// Inputs are cumulative totals for a single reporting window, in MXN cents.
export function summarizeResults(input) {
  for (const key of ['spendCents', 'conversations', 'qualified', 'proposals', 'receivedCents']) {
    if (!Number.isSafeInteger(input?.[key]) || input[key] < 0) {
      throw new Error('Falta un entero no negativo en ' + key);
    }
  }
  if (input.qualified > input.conversations || input.proposals > input.qualified) {
    throw new Error('Revisa los totales del mismo embudo y periodo');
  }
  return {
    ...Object.fromEntries(['spendCents','conversations','qualified','proposals','receivedCents'].map(key=>[key,input[key]])),
    costPerQualifiedCents: input.qualified ? Math.round(input.spendCents / input.qualified) : null,
    receivedLessSpendCents: input.receivedCents - input.spendCents,
  };
}
