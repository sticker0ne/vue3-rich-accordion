/// <reference types="vite/client" />
interface ImportMetaEnv {
  APP_HOST: "https://host.api.com";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
