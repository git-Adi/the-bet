/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAME_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
