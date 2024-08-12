// tests/unit/validators.spec.js

import { isValidCPF } from '../../utils/validators';
import { isValidCNPJ } from '../../utils/validators';

describe('isValidCPF', () => {
  it('should return true for valid CPF', () => {
    const validCPF = '45584734861'; // Substitua por um CPF válido para teste
    expect(isValidCPF(validCPF)).toBe(true);
  });

  it('should return false for invalid CPF', () => {
    const invalidCPF = '11111111111'; // CPF inválido
    expect(isValidCPF(invalidCPF)).toBe(false);
  });

  it('should return false for CPF with incorrect length', () => {
    const shortCPF = '1234567890'; // Menos de 11 dígitos
    expect(isValidCPF(shortCPF)).toBe(false);

    const longCPF = '123456789012'; // Mais de 11 dígitos
    expect(isValidCPF(longCPF)).toBe(false);
  });

  it('should return false for non-numeric CPF', () => {
    const nonNumericCPF = '12345abcde'; // Contém caracteres não numéricos
    expect(isValidCPF(nonNumericCPF)).toBe(false);
  });
});

describe('isValidCNPJ', () => {
    it('should return true for valid CNPJ', () => {
      const validCNPJ = '12345678000195'; // Substitua por um CNPJ válido para teste
      expect(isValidCNPJ(validCNPJ)).toBe(true);
    });
  
    it('should return false for invalid CNPJ', () => {
      const invalidCNPJ = '00000000000000'; // CNPJ inválido
      expect(isValidCNPJ(invalidCNPJ)).toBe(false);
    });
  
    it('should return false for CNPJ with incorrect length', () => {
      const shortCNPJ = '1234567800019'; // Menos de 14 dígitos
      expect(isValidCNPJ(shortCNPJ)).toBe(false);
  
      const longCNPJ = '123456780001951234'; // Mais de 14 dígitos
      expect(isValidCNPJ(longCNPJ)).toBe(false);
    });
  
    it('should return false for non-numeric CNPJ', () => {
      const nonNumericCNPJ = '12345678abcd95'; // Contém caracteres não numéricos
      expect(isValidCNPJ(nonNumericCNPJ)).toBe(false);
    });
  });
