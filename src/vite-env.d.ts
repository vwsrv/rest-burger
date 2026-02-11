/// <reference types="vite/client" />

interface ImportMetaEnv {
  //envs
  readonly APP_VERSION: string;
  //services
  readonly SERVICE_BURGER_API: string;
  readonly SERVICE_BURGER_WS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
