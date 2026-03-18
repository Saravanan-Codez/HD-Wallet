import { PublicKey } from "@solana/web3.js";
import { connection } from "./RPC_Connection";

export async function getSOLBalance(address) {
  const publicKey = new PublicKey(address);
  const balance = await connection.getBalance(publicKey);
  return balance / 1e9;
}