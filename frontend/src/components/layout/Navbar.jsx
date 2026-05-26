import { Link } from "react-router-dom";

import "../../styles/NavBar.css";

function Navbar() {

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  return (

    <nav className="qs-nav">

      <a href="/" className="nav-logo">

        Quvon

      </a>

      <div className="nav-status">

        <div className="status-dot" />

        SYS ONLINE — ENCRYPTION ACTIVE

      </div>

      <div className="nav-links">

        <a href="#features" className="nav-link">

          Features

        </a>

        <a href="#security" className="nav-link">

          Security

        </a>

        {

          token ? (

            <>

              <div className="nav-user">

                {user?.username}

              </div>

              <Link
                to="/dashboard"
                className="nav-link active-link"
              >

                Dashboard

              </Link>

            </>

          ) : (

            <Link
              to="/login"
              className="nav-link active-link"
            >

              Login

            </Link>

          )

        }

      </div>

    </nav>

  );

}

export default Navbar;