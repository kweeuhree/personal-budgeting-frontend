/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
