export const validateCPFCNPJ = (value) => {
  if (value.length === 11) {
    return isValidCPF(value);
  } else if (value.length === 14) {
    return isValidCNPJ(value);
  } else {
    return false;
  }
};

export const validateCode = (value) => {
  return /^\d{3}$/.test(value);
};

export const validateNumber = (value) => {
  return /^\d{16}$/.test(value);
};

export const validateCardHolderName = (value) => {
  return /^[A-Za-z\s]+$/.test(value) && value.length > 10;
};

export const validateValidity = (value) => {
  const [month, year] = value.split("/");
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const inputYear = parseInt(year, 10);
  const inputMonth = parseInt(month, 10);

  return (
    /^\d{2}\/\d{4}$/.test(value) &&
    (inputYear > currentYear ||
      (inputYear === currentYear && inputMonth > currentMonth))
  );
};

export const isValidCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");

  /* Retornando True para poder fazer a verificação após enviar requisição*/
  if (cpf == "00000000000") {
    return true;
  }

  if (cpf == "01234567890") {
    return false;
  }

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += cpf[i] * (10 - i);
  }
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10) firstCheck = 0;
  if (firstCheck !== +cpf[9]) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpf[i] * (11 - i);
  }
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10) secondCheck = 0;
  return secondCheck === +cpf[10];
};

export const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  const calculateDigit = (numbers, weights) => {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += numbers[i] * weights[i];
    }
    let remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigitWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstDigit = calculateDigit(cnpj.substr(0, 12), firstDigitWeights);
  if (firstDigit !== +cnpj[12]) return false;

  const secondDigitWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondDigit = calculateDigit(cnpj.substr(0, 13), secondDigitWeights);
  return secondDigit === +cnpj[13];
};
