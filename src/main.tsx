import "./polyfills";

import { FogoSessionProvider, SessionButton, Network } from "@fogo/sessions-sdk-react";
import { NATIVE_MINT } from "@solana/spl-token";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FogoSessionProvider
      network={Network.Testnet}
      domain="https://sessions-example.fogo.io"
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
