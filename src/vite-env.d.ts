/// <reference types="vite/client" />
declare module "*.css";
declare module "redux-logger";
declare module "react-dom/client";

interface ImportMetaEnv {
  VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
