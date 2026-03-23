import { messages } from "./messages";

/**
 * Devuelve el texto del label según el estado de validación del campo.
 * Útil para accesibilidad (aria-label) o para resaltar el campo con error.
 */
export function formFieldLabel(
  baseLabel: string,
  hasValidationError: boolean
): string {
  if (!hasValidationError) {
    return baseLabel;
  }
  return `${baseLabel} ${messages.common.form.invalidLabelSuffix}`;
}
