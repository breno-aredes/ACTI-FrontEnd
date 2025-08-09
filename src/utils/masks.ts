export const cnpjMask = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
};

export const cpfMask = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .substring(0, 14);
};

export const cepMask = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/(\d{5})(\d)/, "$1-$2").substring(0, 9);
};

export const phoneMask = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 10) {
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  }
};

export const cnpjCpfMask = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    return cpfMask(value);
  } else {
    return cnpjMask(value);
  }
};

export const cnpjCpfMaskByPersonality = (
  value: string,
  personalityType?: string
): string => {
  if (personalityType === "Física") {
    return cpfMask(value);
  } else if (personalityType === "Jurídica") {
    return cnpjMask(value);
  } else {
    return cnpjCpfMask(value);
  }
};

export const removeMask = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const validateCNPJ = (cnpj: string): boolean => {
  const numbers = cnpj.replace(/\D/g, "");

  if (numbers.length !== 14) return false;

  if (/^(\d)\1+$/.test(numbers)) return false;

  let sum = 0;
  let multiplier = 5;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers.charAt(i)) * multiplier;
    multiplier = multiplier === 2 ? 9 : multiplier - 1;
  }

  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;

  if (digit !== parseInt(numbers.charAt(12))) return false;

  sum = 0;
  multiplier = 6;

  for (let i = 0; i < 13; i++) {
    sum += parseInt(numbers.charAt(i)) * multiplier;
    multiplier = multiplier === 2 ? 9 : multiplier - 1;
  }

  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;

  return digit === parseInt(numbers.charAt(13));
};

export const validateCPF = (cpf: string): boolean => {
  const numbers = cpf.replace(/\D/g, "");

  if (numbers.length !== 11) return false;

  if (/^(\d)\1+$/.test(numbers)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers.charAt(i)) * (10 - i);
  }

  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;

  if (digit !== parseInt(numbers.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers.charAt(i)) * (11 - i);
  }

  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;

  return digit === parseInt(numbers.charAt(10));
};

export const validateCnpjCpf = (value: string): boolean => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length === 11) {
    return validateCPF(value);
  } else if (numbers.length === 14) {
    return validateCNPJ(value);
  }
  return false;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCEP = (cep: string): boolean => {
  const numbers = cep.replace(/\D/g, "");
  return numbers.length === 8;
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
