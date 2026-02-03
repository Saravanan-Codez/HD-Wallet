const nacl = require("tweetnacl");
const { mnemonicToSeedSync, validateMnemonic } = require("bip39");
const { derivePath } = require("ed25519-hd-key");
const { Keypair } = require("@solana/web3.js");


const healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      status: 'OK',
      message: 'Server is healthy'
    })
  } catch (error) {
    res.status(500).json(
      { error: 'Internal Server Error' });
  }
}

const getKeyPair = async (req, res) => {
  try {
    const {mnemonic, count} = req.body;

    if (!mnemonic || count === undefined) {
      return res.status(400).json({
        message: "Mnemonic and count are required"
      });
    }

    if (!validateMnemonic(mnemonic)) {
      return res.status(400).json({
        message: "Invalid mnemonic phrase"
      });
    }

    const seed = mnemonicToSeedSync(mnemonic);

    const path = `m/44'/501'/${count}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const naclKeyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

    const solanaKeyPair = Keypair.fromSecretKey(naclKeyPair.secretKey);

    const publicKey = solanaKeyPair.publicKey.toBase58();

    res.status(200).json({
      message: 'success',
      path,
      publicKey,
    });

  } catch(error) {
    res.status(500).json({
      message: "Somthing's wrong",
      error: error
    });
  }
};

module.exports = {
    getKeyPair,
    healthCheck
};