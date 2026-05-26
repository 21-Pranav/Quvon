import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import RoomCard from "../components/dashboard/RoomCard";
import PendingCard from "../components/dashboard/PendingCard";
import SectionPanel from "../components/dashboard/SectionPanel";

import "../styles/dashboard.css";

function Dashboard() {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [rooms, setRooms] =
    useState([]);

  const [pendingRequests, setPendingRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // LOAD DASHBOARD DATA
  useEffect(() => {

    const loadDashboard =
      async () => {

        try {

          const roomResponse =
            await API.get(

              `/rooms/user/${user.username}`

            );

          setRooms(
            roomResponse.data.rooms
          );

          const requestResponse =
            await API.get(

              `/join-requests/user/${user.username}`

            );

          setPendingRequests(

            requestResponse.data.requests

          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    loadDashboard();

  }, [user.username]);

  // FILTER ROOMS
  const createdRooms =
    rooms.filter(

      (room) =>

        room.createdBy ===
        user.username

    );

  const joinedRooms =
    rooms.filter(

      (room) =>

        room.createdBy !==
        user.username

    );

  // LOGOUT HANDLER
  const handleLogout =
    (permanent = false) => {

      // REMOVE SESSION
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      // REMOVE ROOM CACHE
      Object.keys(localStorage)
        .forEach((key) => {

          if (

            key.startsWith(
              "roomKey_"
            )

          ) {

            localStorage.removeItem(
              key
            );

          }

        });

      // PERMANENT LOGOUT
      if (permanent) {

        localStorage.removeItem(
          "kyberPrivateKey"
        );

        localStorage.removeItem(
          "recoveryPhrase"
        );

      }

      window.location.href = "/";

    };

  // LOADING
  if (loading) {

    return (

      <div className="dashboard-loading">

        <div className="dashboard-loading__inner">

          <span className="dashboard-loading__tag">

            // INITIALIZING

          </span>

          <p className="dashboard-loading__text">

            Loading Secure Workspace

          </p>

          <div className="dashboard-loading__bar">

            <div className="dashboard-loading__fill" />

          </div>

        </div>

      </div>

    );

  }

  return (

    <div className="dashboard">

      {/* HERO BAND */}
      <div className="dashboard__hero">

        <div className="dashboard__hero-inner">

          <div className="dashboard__hero-left">

            <span className="dashboard__tag">

              // QUANTUMSHIELD SECURE WORKSPACE

            </span>

            <h1 className="dashboard__heading">

              <span className="dashboard__heading-muted">

                Hello,

              </span>

              <span className="dashboard__heading-name">

                {user?.username}

              </span>

            </h1>

          </div>

          <div className="dashboard__hero-actions">

            <button
              className="btn btn-primary btn-md"
              onClick={() =>
                navigate("/rooms")
              }
            >

              Chatroom Workspace↗
            </button>

            <button
              className="btn btn-secondary btn-md"
              onClick={() =>
                handleLogout(false)
              }
            >

              Logout

            </button>

            <button
              className="btn btn-danger btn-md"
              onClick={() => {

                const confirmed =
                  window.confirm(

`This will permanently remove:

• Private Key
• Recovery Phrase
• Cached Room Keys
• Session Data

from this browser.

Continue?`

                  );

                if (confirmed) {

                  handleLogout(true);

                }

              }}
            >

              Permanent Logout

            </button>

          </div>

        </div>

        {/* STAT STRIP */}
        <div className="stat-strip">

          <div className="stat-strip__item stat-strip__item--primary">

            <span className="stat-strip__value">

              {createdRooms.length}

            </span>

            <span className="stat-strip__label">

              Owned Rooms

            </span>

          </div>

          <div className="stat-strip__divider" />

          <div className="stat-strip__item">

            <span className="stat-strip__value">

              {joinedRooms.length}

            </span>

            <span className="stat-strip__label">

              Joined Rooms

            </span>

          </div>

          <div className="stat-strip__divider" />

          <div className="stat-strip__item stat-strip__item--warning">

            <span className="stat-strip__value">

              {pendingRequests.length}

            </span>

            <span className="stat-strip__label">

              Pending

            </span>

          </div>

        </div>

      </div>

      {/* PANELS */}
      <div className="dashboard__body">

        <SectionPanel
          label="// OWNED"
          title="My Secure Rooms"
          count={createdRooms.length}
          accent="primary"
          empty="No secure workspaces created yet."
        >

          {

            createdRooms.map((room) => (

              <RoomCard
                key={room._id}
                room={room}
                isOwner={true}
                onOpen={() =>

                  navigate(
                    `/chat/${room.roomId}`
                  )

                }
              />

            ))

          }

        </SectionPanel>

        <SectionPanel
          label="// SHARED"
          title="Joined Secure Rooms"
          count={joinedRooms.length}
          accent="info"
          empty="No joined workspaces yet."
        >

          {

            joinedRooms.map((room) => (

              <RoomCard
                key={room._id}
                room={room}
                isOwner={false}
                onOpen={() =>

                  navigate(
                    `/chat/${room.roomId}`
                  )

                }
              />

            ))

          }

        </SectionPanel>

        <SectionPanel
          label="// QUEUE"
          title="Pending Approvals"
          count={pendingRequests.length}
          accent="warning"
          empty="No pending room approvals."
        >

          {

            pendingRequests.map((req) => (

              <PendingCard
                key={req._id}
                request={req}
              />

            ))

          }

        </SectionPanel>

      </div>

    </div>

  );

}

export default Dashboard;