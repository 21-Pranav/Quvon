import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Register.css";

import RecoveryPhraseModal from "../components/auth/RecoveryPhraseModal";

import {
  generateRecoveryPhrase,
  generateKyberKeyPair,
  generateDilithiumKeyPair,
  storePrivateKey,
  storeDilithiumPrivateKey,
  storeRecoveryPhrase,
} from "../services/pqcService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: "",
    email: "",
    password: "",

  });

  const [loading, setLoading] =
    useState(false);

  const [modalPhrase, setModalPhrase] =
    useState(null);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });

  };

  const handleRegister =
  async () => {

    try {

      setLoading(true);

      // GENERATE RECOVERY PHRASE
      const recoveryPhrase =
        generateRecoveryPhrase();

      // GENERATE KYBER KEYS
      const kyberKeys =
        await generateKyberKeyPair(

          recoveryPhrase

        );

      // GENERATE DILITHIUM KEYS
      const dilithiumKeys =
        await generateDilithiumKeyPair(

          recoveryPhrase

        );

      // STORE PRIVATE KEYS
      storePrivateKey(
        kyberKeys.privateKey
      );

      storeDilithiumPrivateKey(
        dilithiumKeys.privateKey
      );

      // STORE RECOVERY PHRASE
      storeRecoveryPhrase(
        recoveryPhrase
      );

      // REGISTER USER
      await API.post(

        "/auth/register",

        {

          username:
            formData.username,

          email:
            formData.email,

          password:
            formData.password,

          // KYBER
          publicKey:
            kyberKeys.publicKey,

          // DILITHIUM
          signPublicKey:
            dilithiumKeys.publicKey

        }

      );

      setModalPhrase(
        recoveryPhrase
      );

    } catch (error) {

      console.error(error);

      alert(

        error.response?.data?.error ??

        "Registration failed. Please try again."

      );

    } finally {

      setLoading(false);

    }

  };

  const handleModalConfirm =
  () => {

    setModalPhrase(null);

    navigate("/login");

  };

  return (

    <div className="register-container">

      <Link
        to="/"
        className="back-home btn btn-primary btn-md"
      >

        ← Back to Landing

      </Link>

      <div className="register-card">

        <h1 className="register-title">
          REGISTER
        </h1>

        <p className="register-subtitle">

          Join QuantumShield and establish secure
          post-quantum encrypted communication.

        </p>

        <div className="register-form">

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            className="register-input"
          />

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
            className="register-input"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="register-input"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="btn btn-primary btn-lg"
          >

            {

              loading

                ? "Generating Quantum Identity..."

                : "Create Secure Account"

            }

          </button>

          <p className="register-footer">

            Already have an account?{" "}

            <Link
              to="/login"
              className="login-link"
            >

              Login

            </Link>

          </p>

        </div>
      </div>

      {

        modalPhrase && (

          <RecoveryPhraseModal

            phrase={modalPhrase}

            onConfirm={handleModalConfirm}

          />

        )

      }

    </div>

  );

}

export default Register;