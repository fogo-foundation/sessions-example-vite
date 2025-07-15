import { Keypair } from "@solana/web3.js";

export const loadSponsorKey = (value: string) => Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(value) as number[])
);
