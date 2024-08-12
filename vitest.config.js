import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permite o uso de globals como `describe`, `it`, `expect`
    environment: 'node', // Define o ambiente de teste como Node.js
  },
});