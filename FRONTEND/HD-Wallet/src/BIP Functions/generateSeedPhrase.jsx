import { generateMnemonic, mnemonicToSeedSync } from 'bip39';


function generateSeedPhrase(setSeedPhrase, setSeed) {
  const newSeedPhrase = generateMnemonic(128);
  setSeedPhrase(newSeedPhrase);
  seedFromMnemonic(newSeedPhrase, setSeed);
}

function seedFromMnemonic(mnemonic, setSeed) {
  const seed = mnemonicToSeedSync(mnemonic);
  setSeed(seed);
}

  export { generateSeedPhrase, seedFromMnemonic };