import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/jest.globals.js'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^axios$': require.resolve('axios'),
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Opcional, mas recomendado
  transform: {
    // Isso garante que o ts-jest processe arquivos .ts e .tsx
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx', // <--- ISSO RESOLVE O ERRO DO --jsx
        },
      },
    ],
  },
  transformIgnorePatterns: [
    // Garante que o Jest transforme o react-router, que é distribuído como ESM
    "node_modules/(?!react-router|@remix-run)"
  ],
};
