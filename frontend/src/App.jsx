import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RoomPortal from "./pages/RoomPortal";
import ChatRoom from "./pages/ChatRoom";

import { darkTheme } from "./styles/themes/dark";
import { lightTheme } from "./styles/themes/light";

Object.entries(darkTheme).forEach(([key, value]) => {
  document.documentElement.style.setProperty(
    `--${key}`,
    value
  );
});

function App() {

  return (

    <BrowserRouter>
      <div className="bg-grid" />
      <Routes>
        
        {/* PUBLIC ROUTES */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* PROTECTED APP ROUTES */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/rooms"
          element={<RoomPortal />}
        />

        <Route
          path="/chat/:roomId"
          element={<ChatRoom />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;