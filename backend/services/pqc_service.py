from pqcrypto.kem.ml_kem_512 import (
    generate_keypair,
    encrypt,
    decrypt
)
import hashlib


# GENERATE USER KYBER KEYS
def generate_user_keys():

    public_key, private_key = (
        generate_keypair()
    )

    return {

        "publicKey":
        public_key.hex(),

        "privateKey":
        private_key.hex()

    }


# ENCRYPT AES ROOM KEY
def encapsulate_room_key(
    public_key_hex
):

    public_key = bytes.fromhex(
        public_key_hex
    )

    ciphertext, shared_secret = encrypt(
        public_key
    )

    aes_key = hashlib.sha256(
        shared_secret
    ).hexdigest()

    return {

        "ciphertext":
        ciphertext.hex(),

        "aesKey":
        aes_key

    }


# DECRYPT AES ROOM KEY
def decapsulate_room_key(

    ciphertext_hex,

    private_key_hex

):

    ciphertext = bytes.fromhex(
        ciphertext_hex
    )

    private_key = bytes.fromhex(
        private_key_hex
    )

    shared_secret = decrypt(

        ciphertext,

        private_key

    )

    aes_key = hashlib.sha256(
        shared_secret
    ).hexdigest()

    return aes_key