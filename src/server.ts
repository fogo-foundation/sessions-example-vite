import "dotenv/config";

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import {
  createSolanaRpc,
  getTransactionDecoder,
  getBase64Encoder,
} from "@solana/kit";
import { sponsorAndSend } from "@fogo/sessions-sdk/paymaster";
import { fromLegacyKeypair } from "@solana/compat";

import { loadSponsorKey } from "./sponsor-key.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rpc = createSolanaRpc("https://testnet.fogo.io/");

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  app.use(vite.middlewares)

  app.use(express.json());

  app.post("/paymaster", async (req, res) => {
    const sponsor = await fromLegacyKeypair(loadSponsorKey(process.env.VITE_SPONSOR_KEY!));
    const result = await sponsorAndSend(rpc, sponsor, getTransactionDecoder().decode(
      getBase64Encoder().encode(req.body.transaction),
    ));
    res.status(200).end(result);
  })

  app.use('*all', async (req, res, next) => {
    try {
      res.status(200).set({ 'Content-Type': 'text/html' }).end(
        await vite.transformIndexHtml(req.originalUrl, fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8',
        ))
      )
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
      }
      next(e)
    }
  })

  app.listen(5173)
}

createServer()
