import {
  MlKem1024
} from "mlkem";

// FIXED: Exact deep submodule import to bypass root import restrictions in Vite
import {
  ml_dsa87
} from "@noble/post-quantum/ml-dsa.js"; 


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


// GENERATE AES ROOM KEY
export const generateRoomAESKey = async () => {
  const aesKey = crypto.getRandomValues(new Uint8Array(32));
  return aesKey;
};


// AES ENCRYPTION
export const encryptWithAES = async (data, aesKey) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const importedKey = await crypto.subtle.importKey(
    "raw",
    aesKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const encoded = new TextEncoder().encode(data);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    importedKey,
    encoded
  );

  return {
    iv: uint8ToBase64(iv),
    ciphertext: uint8ToBase64(new Uint8Array(ciphertext))
  };
};


// ML-KEM ENCAPSULATION
export const encapsulateSharedSecret = async (publicKeyBase64) => {
  const kem = new MlKem1024();
  const publicKey = base64ToUint8(publicKeyBase64);

  const [kemCiphertext, sharedSecret] = await kem.encap(publicKey);

  return {
    kemCiphertext: uint8ToBase64(kemCiphertext),
    sharedSecret
  };
};


// ML-KEM DECAPSULATION
export const decapsulateSharedSecret = async (kemCiphertextBase64, privateKeyBase64) => {
  const kem = new MlKem1024();
  const kemCiphertext = base64ToUint8(kemCiphertextBase64);
  const privateKey = base64ToUint8(privateKeyBase64);

  const sharedSecret = await kem.decap(kemCiphertext, privateKey);
  return sharedSecret;
};


// AES DECRYPTION
export const decryptWithAES = async (ciphertextBase64, ivBase64, aesKey) => {
  const ciphertext = base64ToUint8(ciphertextBase64);
  const iv = base64ToUint8(ivBase64);
  const importedKey = await crypto.subtle.importKey(
    "raw",
    aesKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    importedKey,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
};


// ENCRYPT MESSAGE
export const encryptMessage = async (message, roomAESKeyBase64) => {
  const aesKey = base64ToUint8(roomAESKeyBase64);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const importedKey = await crypto.subtle.importKey(
    "raw",
    aesKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const encoded = new TextEncoder().encode(message);
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    importedKey,
    encoded
  );

  return {
    ciphertext: uint8ToBase64(new Uint8Array(ciphertext)),
    iv: uint8ToBase64(iv)
  };
};


// DECRYPT MESSAGE
export const decryptMessage = async (ciphertextBase64, ivBase64, roomAESKeyBase64) => {
  const aesKey = base64ToUint8(roomAESKeyBase64);
  const ciphertext = base64ToUint8(ciphertextBase64);
  const iv = base64ToUint8(ivBase64);
  const importedKey = await crypto.subtle.importKey(
    "raw",
    aesKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    importedKey,
    ciphertext
  );

  return new TextDecoder().decode(decrypted);
};


// SIGN MESSAGE USING DILITHIUM
export const signMessage = async (ciphertext, privateKeyBase64) => {
  const privateKey = base64ToUint8(privateKeyBase64);
  const messageBytes = new TextEncoder().encode(ciphertext);

  // FIXED: Calling .sign directly on the correctly sub-imported ml_dsa87 module
  const signature = ml_dsa87.sign(messageBytes, privateKey);

  return uint8ToBase64(signature);
};


// VERIFY SIGNATURE
export const verifySignature = async (ciphertext, signatureBase64, publicKeyBase64) => {
  try {
    const publicKey = base64ToUint8(publicKeyBase64);
    const signature = base64ToUint8(signatureBase64);
    const messageBytes = new TextEncoder().encode(ciphertext);

    // FIXED: Calling .verify directly on the correctly sub-imported ml_dsa87 module
    return ml_dsa87.verify(signature, messageBytes, publicKey);

  } catch (error) {
    console.log(error);
    return false;
  }
};


// ENCRYPT FILE
export const encryptFile = async (file, roomAESKeyBase64) => {
  const aesKey = base64ToUint8(roomAESKeyBase64);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const importedKey = await crypto.subtle.importKey(
    "raw",
    aesKey,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const fileBuffer = await file.arrayBuffer();
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    importedKey,
    fileBuffer
  );

  return {
    encryptedFile: new Blob([encrypted]),
    iv: uint8ToBase64(iv)
  };
};


// DECRYPT FILE
export const decryptFile = async (encryptedBlob, ivBase64, roomAESKeyBase64, mimeType) => {
  const aesKey = base64ToUint8(roomAESKeyBase64);
  const iv = base64ToUint8(ivBase64);
  const importedKey = await crypto.subtle.importKey(
    "raw",
    aesKey,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const encryptedBuffer = await encryptedBlob.arrayBuffer();
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    importedKey,
    encryptedBuffer
  );

  return new Blob([decrypted], { type: mimeType });
};