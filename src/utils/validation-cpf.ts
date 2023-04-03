export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
    return false
  }

  const digits = cpf.split('').map((digit) => parseInt(digit, 10))

  // Validação do primeiro dígito
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i)
  }

  let remainder = 11 - (sum % 11)
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }

  if (remainder !== digits[9]) {
    return false
  }

  // Validação do segundo dígito
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i)
  }

  remainder = 11 - (sum % 11)
  if (remainder === 10 || remainder === 11) {
    remainder = 0
  }

  if (remainder !== digits[10]) {
    return false
  }

  return true
}
