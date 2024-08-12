import { isValidCPF } from '../../src/utils/validators';
import { isValidCNPJ } from '../../src/utils/validators';

describe('isValidCPF', () => {
  it('should return true for valid CPF', () => {
    const validCPF = '45584734861';
    expect(isValidCPF(validCPF)).toBe(true);
  });

  it('should return false for invalid CPF', () => {
    const invalidCPF = '11111111111'; 
    expect(isValidCPF(invalidCPF)).toBe(false);
  });

  it('should return false for CPF with incorrect length', () => {
    const shortCPF = '1234567890'; 
    expect(isValidCPF(shortCPF)).toBe(false);

    const longCPF = '123456789012';
    expect(isValidCPF(longCPF)).toBe(false);
  });

  it('should return false for non-numeric CPF', () => {
    const nonNumericCPF = '12345abcde'; 
    expect(isValidCPF(nonNumericCPF)).toBe(false);
  });
});

describe('isValidCNPJ', () => {
    it('should return true for valid CNPJ', () => {
      const validCNPJ = '12345678000195'; 
      expect(isValidCNPJ(validCNPJ)).toBe(true);
    });
  
    it('should return false for invalid CNPJ', () => {
      const invalidCNPJ = '00000000000000';
      expect(isValidCNPJ(invalidCNPJ)).toBe(false);
    });
  
    it('should return false for CNPJ with incorrect length', () => {
      const shortCNPJ = '1234567800019'; 
      expect(isValidCNPJ(shortCNPJ)).toBe(false);
  
      const longCNPJ = '123456780001951234'; 
      expect(isValidCNPJ(longCNPJ)).toBe(false);
    });
  
    it('should return false for non-numeric CNPJ', () => {
      const nonNumericCNPJ = '12345678abcd95'; 
      expect(isValidCNPJ(nonNumericCNPJ)).toBe(false);
    });
  });
