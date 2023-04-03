export function validarPlaca(placa: string): boolean {
  const formatoPlaca = /^[A-Z]{3}\d{4}$/

  if (!formatoPlaca.test(placa)) {
    return false
  }

  const letras = placa.slice(0, 3)
  const numeros = placa.slice(4)

  for (const letra of letras) {
    if (!/[A-Z]/.test(letra)) {
      return false
    }
  }

  if (parseInt(numeros) < 1 || parseInt(numeros) > 9999) {
    return false
  }

  return true
}
