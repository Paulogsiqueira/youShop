import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configura o trabalhador MSW com os manipuladores de rota
export const worker = setupWorker(...handlers);
