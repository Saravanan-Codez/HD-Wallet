import { SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import { connection } from './RPC_Connection';

export default async function sendSOL(sender, reciever, amount) {
  
  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: new PublicKey(reciever),
      lamports: amount * 1e9, // Convert SOL to lamports
    })
  );

  return await connection.sendTransaction(tx, [sender]);
}
