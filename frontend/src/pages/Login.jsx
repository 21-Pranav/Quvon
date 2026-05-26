import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

import {
  generateKyberKeyPair,
  storePrivateKey,
  getPrivateKey,
} from "../services/pqcService";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      // LOGIN API
      const response = await API.post(
        "/auth/login",
        formData
      );

      const user = response.data.user;

      // CHECK PRIVATE KEY
      let privateKey = getPrivateKey();

      // PRIVATE KEY LOST
      if (!privateKey) {
        const recoveryPhrase = prompt(
          "Browser secure data missing.\n\nEnter your recovery phrase to restore your quantum identity."
        );

        if (!recoveryPhrase) {
          alert("Recovery phrase required");
          return;
        }

        // REGENERATE SAME KEYS
        const regeneratedKeys =
          await generateKyberKeyPair(
            recoveryPhrase
          );

        // VERIFY PUBLIC KEY
        if (
          regeneratedKeys.publicKey !==
          user.publicKey
        ) {
          alert("Invalid recovery phrase");
          return;
        }

        // RESTORE PRIVATE KEY
        storePrivateKey(
          regeneratedKeys.privateKey
        );

        console.log(
          "PRIVATE KEY RESTORED"
        );
      }

      // SAVE SESSION
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <Link to="/" className="back-home btn btn-primary btn-md">
        ← Back to Landing
      </Link>

      <div className="login-card">

        <h1 className="login-title">
          LOGIN
        </h1>

        <p className="login-subtitle">
          Access your secure quantum-resistant workspace.
        </p>

        <div className="login-form">

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="login-input"
          />

          <button
            onClick={handleLogin}
            className="btn btn-primary btn-lg"
          >
            {loading
              ? "Authenticating..."
              : "Secure Login"}
          </button>

          <p className="login-footer">
            Don’t have an account?

            <Link
              to="/register"
              className="register-link"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;