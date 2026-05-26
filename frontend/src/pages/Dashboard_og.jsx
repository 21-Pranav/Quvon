import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
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

          // FETCH USER ROOMS
          const roomResponse =
            await API.get(

              `/rooms/user/${user.username}`

            );

          setRooms(
            roomResponse.data.rooms
          );

          // FETCH PENDING REQUESTS
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

  // SECURE LOGOUT
  const handleLogout = () => {

    // REMOVE ROOM KEYS
    Object.keys(localStorage).forEach(

      (key) => {

        if (

          key.startsWith(
            "roomKey_"
          )

        ) {

          localStorage.removeItem(
            key
          );

        }

      }

    );

    // REMOVE SESSION DATA
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "kyberPrivateKey"
    );

    // REDIRECT
    window.location.href =
      "/login";

  };

  // LOADING
  if (loading) {

    return (

      <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">

        <h1 className="text-3xl text-[#00ff9f]">

          Loading Secure Workspace...

        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#050816] text-white">

      {/* HEADER */}
      <div className="border-b border-[#00ff9f15] bg-[#081018cc] backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">

          <div>

            <p className="text-[#00ff9f] uppercase tracking-[4px] text-sm mb-3">

              QuantumShield Secure Workspace

            </p>

            <h1 className="text-5xl font-bold">

              Welcome,
              <span className="text-[#00ff9f]">

                {" "}
                {user?.username}

              </span>

            </h1>

          </div>

          <div className="flex gap-4">

            <button
              onClick={() =>
                navigate("/rooms")
              }
              className="px-6 py-4 rounded-2xl bg-[#00ff9f] text-black font-semibold hover:scale-[1.03] transition-all"
            >

              Open Workspace Portal

            </button>

            <button
              onClick={handleLogout}
              className="px-6 py-4 rounded-2xl border border-[#00ff9f20] hover:border-[#00ff9f60] transition-all"
            >

              Logout

            </button>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">

        {/* CREATED ROOMS */}
        <div className="bg-[#081018cc] border border-[#00ff9f15] rounded-3xl p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <p className="text-[#00ff9f] uppercase tracking-[4px] text-sm mb-2">

                OWNED WORKSPACES

              </p>

              <h2 className="text-3xl font-bold">

                My Secure Rooms

              </h2>

            </div>

            <div className="text-[#00ff9f] text-2xl font-bold">

              {createdRooms.length}

            </div>

          </div>

          {createdRooms.length === 0 ? (

            <div className="text-gray-500 text-lg">

              No secure workspaces created yet.

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-5">

              {createdRooms.map((room) => (

                <div
                  key={room._id}
                  className="bg-[#050816] border border-[#00ff9f15] rounded-2xl p-6 flex items-center justify-between"
                >

                  <div>

                    <p className="text-[#00ff9f] text-sm mb-2">

                      ROOM ID

                    </p>

                    <h3 className="text-2xl font-bold mb-2">

                      {room.roomId}

                    </h3>

                    <p className="text-green-400">

                      Owner Access

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/chat/${room.roomId}`
                      )
                    }
                    className="px-5 py-3 rounded-xl bg-[#00ff9f] text-black font-semibold"
                  >

                    Open

                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* JOINED ROOMS */}
        <div className="bg-[#081018cc] border border-[#00ff9f15] rounded-3xl p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <p className="text-[#00ff9f] uppercase tracking-[4px] text-sm mb-2">

                SHARED WORKSPACES

              </p>

              <h2 className="text-3xl font-bold">

                Joined Secure Rooms

              </h2>

            </div>

            <div className="text-[#00ff9f] text-2xl font-bold">

              {joinedRooms.length}

            </div>

          </div>

          {joinedRooms.length === 0 ? (

            <div className="text-gray-500 text-lg">

              No joined workspaces yet.

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-5">

              {joinedRooms.map((room) => (

                <div
                  key={room._id}
                  className="bg-[#050816] border border-[#00ff9f15] rounded-2xl p-6 flex items-center justify-between"
                >

                  <div>

                    <p className="text-[#00ff9f] text-sm mb-2">

                      ROOM ID

                    </p>

                    <h3 className="text-2xl font-bold mb-2">

                      {room.roomId}

                    </h3>

                    <p className="text-blue-400">

                      Shared Access

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/chat/${room.roomId}`
                      )
                    }
                    className="px-5 py-3 rounded-xl border border-[#00ff9f20] hover:border-[#00ff9f60] transition-all"
                  >

                    Open

                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* PENDING REQUESTS */}
        <div className="bg-[#081018cc] border border-yellow-500/10 rounded-3xl p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <p className="text-yellow-400 uppercase tracking-[4px] text-sm mb-2">

                ACCESS REQUESTS

              </p>

              <h2 className="text-3xl font-bold">

                Pending Approvals

              </h2>

            </div>

            <div className="text-yellow-400 text-2xl font-bold">

              {pendingRequests.length}

            </div>

          </div>

          {pendingRequests.length === 0 ? (

            <div className="text-gray-500 text-lg">

              No pending room approvals.

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-5">

              {pendingRequests.map((req) => (

                <div
                  key={req._id}
                  className="bg-[#050816] border border-yellow-500/10 rounded-2xl p-6"
                >

                  <p className="text-yellow-400 text-sm mb-2">

                    ROOM ID

                  </p>

                  <h3 className="text-2xl font-bold mb-3">

                    {req.roomId}

                  </h3>

                  <p className="text-yellow-300">

                    Waiting for creator approval

                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;