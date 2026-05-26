import * as bip39 from "bip39";
import { MlKem1024 } from "mlkem";
// FIXED: Exact deep submodule import to bypass root import restrictions in Vite
import { ml_dsa87 } from "@noble/post-quantum/ml-dsa.js"; 


// BASE64 HELPERS
const uint8ToBase64 = (bytes) => {
  return btoa(
    String.fromCharCode(...bytes)
  );
};

const base64ToUint8 = (base64) => {
  return Uint8Array.from(
    atob(base64),
    c => c.charCodeAt(0)
  );
};


// GENERATE RECOVERY PHRASE
export const generateRecoveryPhrase = () => {
  return bip39.generateMnemonic();
};


// SEEDED RANDOM GENERATOR
const seededRandomGenerator = (seedBytes) => {
  let index = 0;
  return () => {
    const value = seedBytes[index % seedBytes.length];
    index++;
    return value / 255;
  };
};


// PATCHED RANDOM WRAPPER
const withSeededRandom = async (recoveryPhrase, callback) => {
  const seed = await bip39.mnemonicToSeed(recoveryPhrase);
  const seedBytes = new Uint8Array(seed);
  const random = seededRandomGenerator(seedBytes);

  const originalCrypto = crypto.getRandomValues;

  crypto.getRandomValues = (array) => {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(random() * 256);
    }
    return array;
  };

  try {
    return await callback();
  } finally {
    crypto.getRandomValues = originalCrypto;
  }
};


// GENERATE KYBER KEYPAIR
export const generateKyberKeyPair = async (recoveryPhrase) => {
  return await withSeededRandom(
    recoveryPhrase,
    async () => {
      const kem = new MlKem1024();
      const [publicKey, secretKey] = await kem.generateKeyPair();

      return {
        publicKey: uint8ToBase64(publicKey),
        privateKey: uint8ToBase64(secretKey)
      };
    }
  );
};


// GENERATE DILITHIUM KEYPAIR
export const generateDilithiumKeyPair = async (recoveryPhrase) => {
  return await withSeededRandom(
    recoveryPhrase,
    async () => {
      // FIXED: Calling .keygen directly on the correctly sub-imported ml_dsa87 module
      const keys = ml_dsa87.keygen();

      return {
        publicKey: uint8ToBase64(keys.publicKey),
        privateKey: uint8ToBase64(keys.secretKey)
      };
    }
  );
};


// REGENERATE KYBER
export const regenerateKyberKeyPair = async (recoveryPhrase) => {
  return await generateKyberKeyPair(recoveryPhrase);
};


// REGENERATE DILITHIUM
export const regenerateDilithiumKeyPair = async (recoveryPhrase) => {
  return await generateDilithiumKeyPair(recoveryPhrase);
};


// STORE KYBER PRIVATE KEY
export const storePrivateKey = (privateKey) => {
  localStorage.setItem("kyberPrivateKey", privateKey);
};


// GET KYBER PRIVATE KEY
export const getPrivateKey = () => {
  return localStorage.getItem("kyberPrivateKey");
};


// STORE DILITHIUM PRIVATE KEY
export const storeDilithiumPrivateKey = (privateKey) => {
  localStorage.setItem("dilithiumPrivateKey", privateKey);
};


// GET DILITHIUM PRIVATE KEY
export const getDilithiumPrivateKey = () => {
  return localStorage.getItem("dilithiumPrivateKey");
};


// STORE RECOVERY PHRASE
export const storeRecoveryPhrase = (phrase) => {
  localStorage.setItem("recoveryPhrase", phrase);
};


// GET RECOVERY PHRASE
export const getRecoveryPhrase = () => {
  return localStorage.getItem("recoveryPhrase");
};