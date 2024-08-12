export const isValidCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');
  

    /* Retornando True para poder fazer a verificação após enviar requisição*/
    if(cpf == "00000000000"){
      return true;
    }

    if(cpf == "01234567890"){
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
    cnpj = cnpj.replace(/\D/g, '');
  
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