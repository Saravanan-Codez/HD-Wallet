import { mnemonicToSeedSync, validateMnemonic, generateMnemonic } from "bip39";
import { HDKey } from "micro-ed25519-hdkey";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";


function generateSeedPhrase(setSeedPhrase, setSeed) {
  const newSeedPhrase = generateMnemonic(128);
  setSeedPhrase(newSeedPhrase);
  seedFromMnemonic(newSeedPhrase, setSeed);
}

function seedFromMnemonic(mnemonic, setSeed) {
  const seed = mnemonicToSeedSync(mnemonic);
  setSeed(seed);
}

function generateWalletFromMnemonic(mnemonic, index) {
  if (!validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic phrase");
  }

  if (index < 0) {
    throw new Error("Invalid wallet index");
  }

  const seed = mnemonicToSeedSync(mnemonic);

  const hd = HDKey.fromMasterSeed(seed);

  const path = `m/44'/501'/${index}'/0'`;

  const child = hd.derive(path);

  const derivedPrivateKey = child.privateKey;

  const naclKeypair = nacl.sign.keyPair.fromSeed(derivedPrivateKey);

  const solanaKeypair = Keypair.fromSecretKey(
    naclKeypair.secretKey
);

  const publicKeyBase58 = solanaKeypair.publicKey.toBase58();
  const privateKeyBase58 = bs58.encode(solanaKeypair.secretKey);

  console.log("child ->", child);
  console.log("derivedPrivateKey ->", derivedPrivateKey);
  console.log("naclKeypair -> ", naclKeypair);
  console.log("publicKeyBase58 -> ", solanaKeypair.publicKey.toBase58());
  
  
  return {
    index,
    path,
    publicKeyBase58,
    privateKeyBase58
  };
}
export { 
  generateSeedPhrase, 
  seedFromMnemonic, 
  generateWalletFromMnemonic 
};