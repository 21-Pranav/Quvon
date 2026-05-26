import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  generateRoomAESKey,
  encryptWithAES,
  encapsulateSharedSecret,
} from "../services/cryptoService";

import "../styles/RoomPortal.css";

function RoomPortal() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [waitingApproval, setWaitingApproval] = useState(false);

  // WAIT FOR APPROVAL
  useEffect(() => {
    if (!waitingApproval) return;

    const interval = setInterval(async () => {
      try {
        const response = await API.get(`/rooms/join/${roomId}`);
        const room = response.data.room;

        if (room.encryptedKeys?.[user.username]) {
          clearInterval(interval);
          navigate(`/chat/${roomId}`);
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [waitingApproval, roomId, navigate, user.username]);

  // CREATE SECURE ROOM
  const createRoom = async () => {
    try {
      setLoading(true);

      const roomAESKey = await generateRoomAESKey();
      const roomKeyBase64 = btoa(String.fromCharCode(...roomAESKey));
      localStorage.setItem("activeRoomAESKey", JSON.stringify(roomKeyBase64));

      const { kemCiphertext, sharedSecret } = await encapsulateSharedSecret(user.publicKey);
      const encryptedResult = await encryptWithAES(roomKeyBase64, sharedSecret);

      const encryptedKeys = {
        [user.username]: {
          kemCiphertext,
          encryptedRoomKey: encryptedResult.ciphertext,
          iv: encryptedResult.iv,
        },
      };

      const response = await API.post("/rooms/create", {
        createdBy: user.username,
        encryptedKeys,
      });

      navigate(`/chat/${response.data.roomId}`);
    } catch (error) {
      console.log(error);
      alert("Failed to create secure room");
    } finally {
      setLoading(false);
    }
  };

  // JOIN ROOM
  const joinRoom = async () => {
    if (!roomId.trim()) return;

    try {
      setLoading(true);
      await API.get(`/rooms/join/${roomId}`);
      await API.post("/join-requests/create", {
        roomId,
        username: user.username,
      });
      setWaitingApproval(true);
    } catch (error) {
      console.log(error);
      alert("Failed to send join request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portal">

      {/* DECORATIVE GRID BACKGROUND */}
      <div className="portal__grid-bg" aria-hidden="true" />

      <div className="portal__inner">

        {/* PAGE LABEL */}
        <div className="portal__header">
          <span className="portal__header-tag">// WORKSPACE PORTAL</span>
          <h1 className="portal__header-title">Select an Action</h1>
        </div>

        <div className="portal__cards">

          {/* ── CREATE ROOM ── */}
          <div className="portal-card portal-card--create">
            <div className="portal-card__accent" />

            <div className="portal-card__top">
              <span className="portal-card__tag portal-card__tag--primary">// CREATE ROOM</span>
              <h2 className="portal-card__title">Create Secure Workspace</h2>
              <p className="portal-card__desc">
                Generate an encrypted collaboration room with persistent secure communication using ML-KEM post-quantum encryption.
              </p>
            </div>

            <div className="portal-card__bottom">
              <div className="portal-card__meta">
                <span className="portal-card__meta-item">
                  <span className="portal-card__meta-dot portal-card__meta-dot--primary" />
                  AES-256 Room Key
                </span>
                <span className="portal-card__meta-item">
                  <span className="portal-card__meta-dot portal-card__meta-dot--primary" />
                  ML-KEM Encapsulation
                </span>
              </div>

              <button
                className="portal-btn portal-btn--primary"
                onClick={createRoom}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="portal-btn__spinner" />
                    Initializing Encryption...
                  </>
                ) : (
                  "Create Secure Room →"
                )}
              </button>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="portal__divider" aria-hidden="true">
            <span className="portal__divider-label">OR</span>
          </div>

          {/* ── JOIN ROOM ── */}
          <div className="portal-card portal-card--join">
            <div className="portal-card__accent portal-card__accent--info" />

            <div className="portal-card__top">
              <span className="portal-card__tag portal-card__tag--info">// JOIN ROOM</span>
              <h2 className="portal-card__title">Join Existing Workspace</h2>
              <p className="portal-card__desc">
                Access a persistent secure room using an encrypted invite code. Your request will be reviewed by the room creator.
              </p>
            </div>

            <div className="portal-card__bottom">
              <div className="portal-card__input-group">
                <label className="portal-card__input-label" htmlFor="roomId">
                  Invite Code
                </label>
                <input
                  id="roomId"
                  type="text"
                  placeholder="e.g. 7f3a-c9b2-..."
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && joinRoom()}
                  disabled={waitingApproval}
                  className="portal-input"
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>

              <button
                className={`portal-btn ${waitingApproval ? "portal-btn--waiting" : "portal-btn--ghost"}`}
                onClick={joinRoom}
                disabled={loading || waitingApproval}
              >
                {waitingApproval ? (
                  <>
                    <span className="portal-btn__pulse" />
                    Waiting for Approval...
                  </>
                ) : loading ? (
                  <>
                    <span className="portal-btn__spinner portal-btn__spinner--info" />
                    Joining...
                  </>
                ) : (
                  "Send Join Request →"
                )}
              </button>

              {waitingApproval && (
                <div className="portal-card__notice">
                  <span className="portal-card__notice-tag">// ACCESS PENDING</span>
                  <p className="portal-card__notice-text">
                    Join request sent. Polling for creator approval every 3 seconds.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RoomPortal;