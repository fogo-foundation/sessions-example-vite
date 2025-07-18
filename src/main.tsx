import "./polyfills";

import { FogoSessionProvider, SessionButton } from "@fogo/sessions-sdk-react";
import { NATIVE_MINT } from "@solana/spl-token";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadSponsorKey } from "./sponsor-key";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FogoSessionProvider
      endpoint="https://testnet.fogo.io/"
      sponsor={loadSponsorKey(import.meta.env.VITE_SPONSOR_KEY).publicKey.toBase58()}
      paymasterUrl="/paymaster"
      tokens={[NATIVE_MINT.toBase58()]}
      defaultRequestedLimits={{
        [NATIVE_MINT.toBase58()]: 1_500_000_000n,
      }}
    >
      <header>
        <h1>Fogo Sessions Example</h1>
        <SessionButton />
      </header>
      <hr />
      <main>
      </main>
    </FogoSessionProvider>
  </StrictMode>,
)
