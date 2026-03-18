import { Connection } from "@solana/web3.js";

const RPC_URL =
  import.meta.env.VITE_SOLANA_RPC_URL ??
  "https://api.devnet.solana.com";

export const connection = new Connection(RPC_URL, "confirmed");