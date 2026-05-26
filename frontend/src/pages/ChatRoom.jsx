import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import socket from "../services/socket";
import API from "../services/api";

import {
  encryptMessage,
  decryptMessage,
  decapsulateSharedSecret,
  decryptWithAES,
  encapsulateSharedSecret,
  encryptWithAES,
  encryptFile,
  decryptFile,
  signMessage,
  verifySignature,
} from "../services/cryptoService";

import {
  regenerateKyberKeyPair,
  storePrivateKey,
  getDilithiumPrivateKey,
} from "../services/pqcService";

import "../styles/ChatRoom.css";

function ChatRoom() {

  const storedUser =
    localStorage.getItem("user");

  const user =
    storedUser
      ? JSON.parse(storedUser)
      : null;

  const username =
    user?.username;

  const { roomId } =
    useParams();

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [roomAESKey, setRoomAESKey] =
    useState(null);

  const [joinRequests, setJoinRequests] =
    useState([]);

  const [isRoomOwner, setIsRoomOwner] =
    useState(false);

  const [waitingApproval, setWaitingApproval] =
    useState(false);

  const [files, setFiles] =
    useState([]);

  const [uploadingFile, setUploadingFile] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages]);

  // INITIALIZE ROOM
  useEffect(() => {

    let active = true;

    const initializeRoom =
    async () => {

      try {

        setMessages([]);

        const roomResponse =
          await API.get(

            `/rooms/join/${roomId}`

          );

        const roomData =
          roomResponse.data.room;

        setIsRoomOwner(

          roomData.createdBy === username

        );

        // WAITING FOR APPROVAL
        if (

          roomData.createdBy !== username &&

          !roomData.encryptedKeys?.[username]

        ) {

          setWaitingApproval(true);

          setLoading(false);

          return;

        }

        let decryptedRoomKey =
          JSON.parse(

            localStorage.getItem(
              `roomKey_${roomId}`
            )

          );

        // RESTORE ROOM KEY
        if (!decryptedRoomKey) {

          const encryptedKeyData =
            roomData.encryptedKeys[username];

          if (!encryptedKeyData)
            return;

          let privateKey =
            localStorage.getItem(
              "kyberPrivateKey"
            );

          // RESTORE PRIVATE KEY
          if (!privateKey) {

            const recoveryPhrase =
              prompt(
                "Enter your recovery phrase"
              );

            if (!recoveryPhrase) {

              alert(
                "Recovery phrase required"
              );

              return;

            }

            const regeneratedKeys =
              await regenerateKyberKeyPair(

                recoveryPhrase

              );

            const publicKeyResponse =
              await API.get(

                `/users/public-key/${username}`

              );

            const serverPublicKey =
              publicKeyResponse.data.publicKey;

            if (

              regeneratedKeys.publicKey !==
              serverPublicKey

            ) {

              alert(
                "Invalid recovery phrase"
              );

              return;

            }

            storePrivateKey(

              regeneratedKeys.privateKey

            );

            privateKey =
              regeneratedKeys.privateKey;

            alert(
              "Private key restored successfully"
            );

          }

          const sharedSecret =
            await decapsulateSharedSecret(

              encryptedKeyData.kemCiphertext,

              privateKey

            );

          decryptedRoomKey =
            await decryptWithAES(

              encryptedKeyData.encryptedRoomKey,

              encryptedKeyData.iv,

              sharedSecret

            );

          localStorage.setItem(

            `roomKey_${roomId}`,

            JSON.stringify(
              decryptedRoomKey
            )

          );

        }

        setRoomAESKey(
          decryptedRoomKey
        );

        // OWNER LOAD JOIN REQUESTS
        if (

          roomData.createdBy === username

        ) {

          const requestResponse =
            await API.get(

              `/join-requests/room/${roomId}`

            );

          setJoinRequests(

            requestResponse.data.requests

          );

        }

        // JOIN SOCKET ROOM
        socket.emit(

          "join_room",

          {

            username:
              username || "Anonymous",

            roomId,

          }

        );

        // LOAD MESSAGES
        const response =
          await API.get(

            `/messages/${roomId}`

          );

        const decryptedMessages =
          await Promise.all(

            response.data.messages.map(
              async (msg) => {

                const decryptedText =
                  await decryptMessage(

                    msg.message,
                    msg.iv,
                    decryptedRoomKey

                  );

                let verified =
                  false;

                try {

                  const userResponse =
                    await API.get(

                      `/users/public-key/${msg.username}`

                    );

                  if (

                    msg.signature &&

                    userResponse.data.signPublicKey

                  ) {

                    verified =
                      await verifySignature(

                        msg.message,

                        msg.signature,

                        userResponse.data.signPublicKey

                      );

                  }

                } catch (err) {

                  console.log(err);

                }

                return {

                  ...msg,

                  message:
                    decryptedText,

                  verified

                };

              }

            )

          );

        if (active)
          setMessages(
            decryptedMessages
          );

        // LOAD FILES
        const fileResponse =
          await API.get(

            `/files/room/${roomId}`

          );

        const decryptedFiles =
          await Promise.all(

            fileResponse.data.files.map(
              async (file) => {

                const decryptedFilename =
                  await decryptMessage(

                    file.encryptedFilename,

                    file.fileNameIV,

                    decryptedRoomKey

                  );

                return {

                  ...file,

                  filename:
                    decryptedFilename,

                  verified:
                    !!file.signature

                };

              }

            )

          );

        if (active) {

          setFiles(
            decryptedFiles
          );

        }

      } catch (error) {

        console.log(error);

      } finally {

        if (active)
          setLoading(false);

      }

    };

    initializeRoom();

    return () => {

      active = false;

      socket.emit(
        "leave_room",
        { roomId }
      );

    };

  }, [roomId, username]);

  // LIVE JOIN REQUEST POLLING
  useEffect(() => {

    if (!isRoomOwner)
      return;

    const interval =
      setInterval(

        async () => {

          try {

            const response =
              await API.get(

                `/join-requests/room/${roomId}`

              );

            setJoinRequests(

              response.data.requests

            );

          } catch (error) {

            console.log(error);

          }

        },

        3000

      );

    return () =>
      clearInterval(interval);

  }, [roomId, isRoomOwner]);

  // WAITING APPROVAL CHECK
  useEffect(() => {

    if (!waitingApproval)
      return;

    const interval =
      setInterval(

        async () => {

          try {

            const roomResponse =
              await API.get(

                `/rooms/join/${roomId}`

              );

            const roomData =
              roomResponse.data.room;

            if (

              roomData.encryptedKeys?.[username]

            ) {

              window.location.reload();

            }

          } catch (error) {

            console.log(error);

          }

        },

        4000

      );

    return () =>
      clearInterval(interval);

  }, [

    waitingApproval,
    roomId,
    username

  ]);

  // APPROVE REQUEST
  const approveRequest =
  async (requestData) => {

    try {

      const requestUser =
        requestData.requestedBy;

      const userResponse =
        await API.get(

          `/users/public-key/${requestUser.username}`

        );

      const targetPublicKey =
        userResponse.data.publicKey;

      const activeRoomKey =
        JSON.parse(

          localStorage.getItem(
            `roomKey_${roomId}`
          )

        );

      const {

        kemCiphertext,
        sharedSecret

      } =
      await encapsulateSharedSecret(

        targetPublicKey

      );

      const encryptedResult =
        await encryptWithAES(

          activeRoomKey,
          sharedSecret

        );

      await API.post(

        `/rooms/share-key/${roomId}`,

        {

          username:
            requestUser.username,

          encryptedKeyData: {

            kemCiphertext,

            encryptedRoomKey:
              encryptedResult.ciphertext,

            iv:
              encryptedResult.iv,

          },

        }

      );

      await API.post(

        `/join-requests/approve/${requestData._id}`

      );

      setJoinRequests((prev) =>

        prev.filter(

          (req) =>
            req._id !== requestData._id

        )

      );

      alert(
        "Secure access granted"
      );

    } catch (error) {

      console.log(error);

    }

  };

  // FILE UPLOAD
  const handleFileUpload =
  async (event) => {

    try {

      const file =
        event.target.files[0];

      if (!file) return;

      setUploadingFile(true);

      const encryptedResult =
        await encryptFile(
          file,
          roomAESKey
        );

      const encryptedFileNameResult =
        await encryptMessage(
          file.name,
          roomAESKey
        );

      const dilithiumPrivateKey =
        getDilithiumPrivateKey();

      const fileSignature =
        await signMessage(

          encryptedFileNameResult.ciphertext,

          dilithiumPrivateKey

        );

      const formData =
        new FormData();

      formData.append(
        "file",
        encryptedResult.encryptedFile
      );

      formData.append(
        "roomId",
        roomId
      );

      formData.append(
        "username",
        username
      );

      formData.append(
        "iv",
        encryptedResult.iv
      );

      formData.append(
        "encryptedFilename",
        encryptedFileNameResult.ciphertext
      );

      formData.append(
        "fileNameIV",
        encryptedFileNameResult.iv
      );

      formData.append(
        "signature",
        fileSignature
      );

      const response =
        await API.post(

          "/files/upload",

          formData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",

            },

          }

        );

      const uploadedFile =
        response.data.file;

      socket.emit(

        "send_file",

        {

          roomId,
          file: uploadedFile,

        }

      );

      alert(
        "Encrypted file uploaded"
      );

    } catch (error) {

      console.log(error);

      alert(
        "File upload failed"
      );

    } finally {

      setUploadingFile(false);

    }

  };

  // DOWNLOAD FILE
  const downloadFile =
  async (fileData) => {

    try {

      const response =
        await API.get(

          `/files/download/${fileData.fileId}`,

          {

            responseType:
              "blob",

          }

        );

      const decryptedBlob =
        await decryptFile(

          response.data,

          fileData.iv,

          roomAESKey,

          "application/octet-stream"

        );

      const url =
        window.URL.createObjectURL(
          decryptedBlob
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        fileData.filename;

      document.body.appendChild(
        link
      );

      link.click();

      link.remove();

    } catch (error) {

      console.log(error);

      alert(
        "File download failed"
      );

    }

  };

  // SEND MESSAGE
  const sendMessage =
  async () => {

    if (!message.trim())
      return;

    try {

      const encryptedResult =
        await encryptMessage(

          message,
          roomAESKey

        );

      const dilithiumPrivateKey =
        getDilithiumPrivateKey();

      const signature =
        await signMessage(

          encryptedResult.ciphertext,

          dilithiumPrivateKey

        );

      socket.emit(

        "send_message",

        {

          roomId,

          username:
            username || "Anonymous",

          message:
            encryptedResult.ciphertext,

          iv:
            encryptedResult.iv,

          signature

        }

      );

      setMessage("");

    } catch (error) {

      console.log(error);

    }

  };

  const handleKeyDown =
  (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }

  };

  // SOCKET MESSAGE LISTENER
  useEffect(() => {

    if (!roomAESKey)
      return;

    const handleReceiveMessage =
    async (data) => {

      try {

        const decryptedText =
          await decryptMessage(

            data.message,
            data.iv,
            roomAESKey

          );

        let verified =
          false;

        try {

          const userResponse =
            await API.get(

              `/users/public-key/${data.username}`

            );

          if (

            data.signature &&

            userResponse.data.signPublicKey

          ) {

            verified =
              await verifySignature(

                data.message,

                data.signature,

                userResponse.data.signPublicKey

              );

          }

        } catch (err) {

          console.log(err);

        }

        setMessages((prev) => [

          ...prev,

          {

            ...data,

            message:
              decryptedText,

            verified

          },

        ]);

      } catch (error) {

        console.log(error);

      }

    };

    socket.off(
      "receive_message"
    );

    socket.on(

      "receive_message",

      handleReceiveMessage

    );

    return () => {

      socket.off(

        "receive_message",

        handleReceiveMessage

      );

    };

  }, [roomAESKey]);

  // SOCKET FILE LISTENER
  useEffect(() => {

    if (!roomAESKey)
      return;

    const handleReceiveFile =
    async (fileData) => {

      try {

        const decryptedFilename =
          await decryptMessage(

            fileData.encryptedFilename,

            fileData.fileNameIV,

            roomAESKey

          );

        const updatedFile = {

          ...fileData,

          filename:
            decryptedFilename,

          verified:
            !!fileData.signature

        };

        setFiles((prev) => {

          const alreadyExists =
            prev.some(

              (f) =>
                f.fileId ===
                updatedFile.fileId

            );

          if (alreadyExists)
            return prev;

          return [

            ...prev,

            updatedFile

          ];

        });

      } catch (error) {

        console.log(error);

      }

    };

    socket.off(
      "receive_file"
    );

    socket.on(

      "receive_file",

      handleReceiveFile

    );

    return () => {

      socket.off(

        "receive_file",

        handleReceiveFile

      );

    };

  }, [roomAESKey]);

  // WAITING SCREEN
  if (waitingApproval) {

    return (

      <div className="chat-state-screen">

        <div className="chat-state-box chat-state-box--warning">

          <span className="chat-state-box__tag">

            // ACCESS PENDING

          </span>

          <h1 className="chat-state-box__title">

            Waiting for Room Approval

          </h1>

          <p className="chat-state-box__desc">

            Your secure join request
            has been sent to the
            room creator.

          </p>

        </div>

      </div>

    );

  }

  // LOADING SCREEN
  if (loading) {

    return (

      <div className="chat-state-screen">

        <div className="chat-state-box">

          <span className="chat-state-box__tag">

            // INITIALIZING

          </span>

          <h1 className="chat-state-box__title">

            Quantum Secure Workspace

          </h1>

        </div>

      </div>

    );

  }

  return (

    <div className="chatroom">

      <div
        className="chatroom__grid-bg"
        aria-hidden="true"
      />

      {/* TOP BAR */}
      <div className="chatroom__topbar">

        <div className="chatroom__topbar-inner">

          <div className="chatroom__topbar-left">

            <span className="chatroom__tag">

              // Quvon

            </span>

            <h1 className="chatroom__title">

              Secure Collaboration Room

            </h1>

          </div>

          {/* ROOM ID */}
          <div className="chatroom__room-id-badge">

            <span className="chatroom__room-id-label">

              ROOM ID

            </span>

            <span className="chatroom__room-id-value">

              {roomId}

            </span>

          </div>

        </div>

      </div>

      {/* BODY */}
      <div className="chatroom__body">

        {/* SIDEBAR */}
        <aside className="chatroom__sidebar">

          <div className="sidebar__header">

            <div>

              <span className="sidebar__tag">

                // ENCRYPTED STORAGE

              </span>

              <h2 className="sidebar__title">

                Shared Files

              </h2>

            </div>

            <label
              className={`sidebar__upload-btn ${
                uploadingFile
                  ? "sidebar__upload-btn--busy"
                  : ""
              }`}
            >

              {

                uploadingFile
                  ? "Uploading..."
                  : "Upload ↑"

              }

              <input
                type="file"
                hidden
                onChange={handleFileUpload}
              />

            </label>

          </div>

          <div className="sidebar__file-list">

            {

              files.length === 0

                ? (

                  <div className="sidebar__empty">

                    No encrypted files shared yet.

                  </div>

                )

                : (

                  files.map((file, index) => (

                    <div
                      key={index}
                      className="file-card"
                    >

                      <div className="file-card__info">

                        <span className="file-card__name">

                          {file.filename}

                        </span>

                        <span className="file-card__meta">

                          by {file.username}

                        </span>

                        <span className="file-card__time">

                          {

                            new Date(
                              file.timestamp
                            ).toLocaleString()

                          }

                        </span>

                        <div
                          style={{

                            marginTop: "6px",

                            fontSize: "11px",

                            opacity: 0.8,

                          }}
                        >

                          {

                            file.verified

                              ? "✓ ML-DSA Verified"

                              : "⚠ Unverified"

                          }

                        </div>

                      </div>

                      <button
                        className="file-card__btn"
                        onClick={() =>
                          downloadFile(file)
                        }
                      >

                        Download ↓

                      </button>

                    </div>

                  ))

                )

            }

          </div>

        </aside>

        {/* CHAT MAIN */}
        <div className="chatroom__main">

          {/* JOIN REQUESTS */}
          {

            isRoomOwner &&
            joinRequests.length > 0 && (

              <div className="join-requests">

                {

                  joinRequests.map((req) => (

                    <div
                      key={req._id}
                      className="join-request-card"
                    >

                      <div className="join-request-card__info">

                        <span className="join-request-card__tag">

                          // SECURE JOIN REQUEST

                        </span>

                        <p className="join-request-card__user">

                          <strong>

                            {

                              req.requestedBy.username

                            }

                          </strong>{" "}

                          wants to join this workspace.

                        </p>

                      </div>

                      <button
                        className="join-request-card__btn"
                        onClick={() =>
                          approveRequest(req)
                        }
                      >

                        Approve →

                      </button>

                    </div>

                  ))

                }

              </div>

            )

          }

          {/* CHAT PANEL */}
          <div className="chat-panel">

            {/* CHAT HEADER */}
            <div className="chat-panel__header">

              <div>

                <span className="chat-panel__tag">

                  // QUANTUM ENCRYPTED CHANNEL

                </span>

                <h2 className="chat-panel__title">

                  Live Secure Messaging

                </h2>

              </div>

              <div className="chat-panel__status">

                <span className="chat-panel__status-dot" />

                SECURE

              </div>

            </div>

            {/* MESSAGES */}
            <div className="chat-panel__messages">

              {

                messages.length === 0 && (

                  <div className="chat-panel__empty">

                    No secure messages yet.

                  </div>

                )

              }

              {

                messages.map((msg, index) => {

                  const isOwn =
                    msg.username === username;

                  return (

                    <div

                      key={index}

                      className={`msg ${

                        isOwn
                          ? "msg--own"
                          : "msg--other"

                      }`}

                    >

                      <div

                        className={`msg__bubble ${

                          isOwn
                            ? "msg__bubble--own"
                            : "msg__bubble--other"

                        }`}

                      >

                        <span className="msg__username">

                          {msg.username}

                        </span>

                        <p className="msg__text">

                          {msg.message}

                        </p>

                        <div
                          style={{

                            marginTop: "6px",

                            fontSize: "11px",

                            opacity: 0.8,

                          }}
                        >

                          {

                            msg.verified

                              ? "✓ ML-DSA Verified"

                              : "⚠ Signature Invalid"

                          }

                        </div>

                      </div>

                    </div>

                  );

                })

              }

              <div ref={messagesEndRef} />

            </div>

            {/* INPUT */}
            <div className="chat-panel__input-bar">

              <input

                type="text"

                className="chat-input"

                placeholder="Enter secure message..."

                value={message}

                onChange={(e) =>
                  setMessage(e.target.value)
                }

                onKeyDown={handleKeyDown}

                autoComplete="off"

                spellCheck="false"

              />

              <button

                className="chat-send-btn"

                onClick={sendMessage}

              >

                Send →

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ChatRoom;