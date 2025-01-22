/// <reference types="vite/client" />
declare module "*.css";
declare module "redux-logger";

interface ImportMetaEnv {
  VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
