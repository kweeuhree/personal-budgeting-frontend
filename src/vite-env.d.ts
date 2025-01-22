/// <reference types="vite/client" />
declare module "*.module.css";

interface ImportMetaEnv {
  VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
