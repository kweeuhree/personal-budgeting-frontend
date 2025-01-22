/// <reference types="vite/client" />
/// <reference types="vite" />
/// <reference types="node" />
/// <reference types="vitest" />
declare module "*.css";
declare module "redux-logger";
declare module "react-dom/client";

interface ImportMetaEnv {
  VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
