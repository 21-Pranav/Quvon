# Quvon — Post-Quantum Secure Collaboration Platform

Quvon is a real-time post-quantum secure communication and file-sharing platform designed to provide quantum-resistant encrypted collaboration using modern Post-Quantum Cryptography (PQC) algorithms.

The platform combines:

- ML-KEM (Kyber) for secure key exchange
- ML-DSA (Dilithium) for digital signatures
- AES-GCM for symmetric encryption
- Socket.IO for real-time communication
- MongoDB GridFS for encrypted file storage

Quvon ensures:

- Confidentiality
- Integrity
- Authenticity
- Secure key distribution
- Quantum-resistant communication

---

# Features

## Post-Quantum Secure Messaging

- Real-time encrypted messaging
- Quantum-resistant key exchange
- ML-DSA signed messages
- Signature verification for integrity protection

---

## Secure File Sharing

- Encrypted file uploads
- Encrypted file names
- Digital signature verification for files
- MongoDB GridFS encrypted storage

---

## Quantum-Safe Authentication

- BIP39 recovery phrase generation
- Deterministic PQC key regeneration
- Secure local private key storage

---

## Secure Collaboration Rooms

- AES encrypted room communication
- Secure room-key sharing using ML-KEM
- Join request approval system
- Real-time secure collaboration

---

# Technologies Used

## Frontend

- React.js
- Vite
- Socket.IO Client
- AES-GCM Web Crypto API

---

## Backend

- Flask
- Flask-SocketIO
- JWT Authentication
- bcrypt

---

## Database

- MongoDB
- GridFS

---

## Post-Quantum Cryptography

### ML-KEM 1024 (Kyber)

Used for:

- Secure room key exchange
- Quantum-safe encapsulation/decapsulation

Library:
- mlkem

---

### ML-DSA 87 (Dilithium)

Used for:

- Message signing
- File metadata signing
- Signature verification

Library:
- @noble/post-quantum

---

# System Architecture

## User Registration Flow

1. User registers account
2. Recovery phrase generated using BIP39
3. ML-KEM keypair generated
4. ML-DSA keypair generated
5. Public keys stored in database
6. Private keys stored locally

---

## Secure Room Flow

1. Room creator generates AES room key
2. Joining user sends request
3. Owner fetches user's ML-KEM public key
4. Room AES key encrypted using ML-KEM shared secret
5. Encrypted room key stored securely
6. User decapsulates and decrypts room key

---

## Secure Messaging Flow

1. Message encrypted using AES-GCM
2. Ciphertext signed using ML-DSA
3. Signature stored with message
4. Receiver verifies signature
5. Receiver decrypts message

---

## Secure File Sharing Flow

1. File encrypted using AES-GCM
2. File name encrypted
3. File metadata signed using ML-DSA
4. Encrypted file stored in GridFS
5. Receiver verifies signature
6. Receiver decrypts file

---

# Security Properties

Quvon provides:

- Quantum-resistant encryption
- End-to-end encrypted messaging
- Forward secrecy
- Digital authenticity
- Integrity verification
- Secure key exchange
- Persistent encrypted storage

---

# Project Structure

```txt
Quvon/
│
├── backend/
│   ├── routes/
│   ├── socket/
│   ├── models/
│   ├── database/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation Guide

# Prerequisites

Install:

- Node.js
- Python 3.10+
- MongoDB
- Git

---

# Backend Setup

## Step 1 — Open Backend Folder

```bash
cd backend
```

---

## Step 2 — Create Virtual Environment

```bash
python -m venv venv
```

---

## Step 3 — Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

---

## Step 4 — Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Step 5 — Create `.env`

Create:

```txt
backend/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## Step 6 — Run Backend

```bash
python app.py
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## Step 1 — Open Frontend Folder

```bash
cd frontend
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

---

## Step 3 — Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```




## Push to GitHub

```bash
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```



# Future Improvements

- Hybrid classical + PQC encryption
- Video conferencing
- Secure group calls
- Zero-knowledge authentication
- Hardware security module support
- Multi-device synchronization

---

# Author

Pranav Prajapti

M.Tech Cyber Security  
DIAT Pune

---

# License

This project is developed for educational and research purposes.
