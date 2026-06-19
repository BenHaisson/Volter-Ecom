/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYGATE_WALLET_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
