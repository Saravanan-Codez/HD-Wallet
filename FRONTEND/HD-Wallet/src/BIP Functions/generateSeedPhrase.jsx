import { mnemonicToSeedSync, validateMnemonic, generateMnemonic } from "bip39";
import * as ed from "@noble/ed25519";
import { derivePath } from "ed25519-hd-key";
import { Buffer } from "buffer";

function generateSeedPhrase(setSeedPhrase, setSeed) {
  const newSeedPhrase = generateMnemonic(128);
  setSeedPhrase(newSeedPhrase);
  seedFromMnemonic(newSeedPhrase, setSeed);
}

function seedFromMnemonic(mnemonic, setSeed) {
  const seed = mnemonicToSeedSync(mnemonic);
  setSeed(seed);
}

function generateWalletFromMnemonic(index, mnemonic) {
  if (!validateMnemonic(mnemonic)) {
    throw new Error("Invalid mnemonic");
  }

  const seed = mnemonicToSeedSync(mnemonic);
  const seedHex = Buffer.from(seed).toString("hex");

  const path = `m/44'/501'/${index}'/0'`;
  const { key: privateKey } = derivePath(path, seedHex);

  const publicKey = ed.getPublicKey(privateKey);

  // cleanup
  seed.fill(0);

  return {
    index,
    path,
    privateKey, // ⚠️ do NOT expose in UI
    publicKey
  };
}

export { 
  generateSeedPhrase, 
  seedFromMnemonic, 
  generateWalletFromMnemonic 
};