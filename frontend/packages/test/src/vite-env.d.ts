/// <reference types="vite/client" />

type MOCK_API = 'MOCK' | 'REAL'

interface ImportMetaEnv {
  readonly VITE_MOCK_API: MOCK_API
}
