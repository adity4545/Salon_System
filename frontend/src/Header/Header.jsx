import React from "react";
import { Link } from "react-router-dom";
import salonLogo from "../assets/salonLogo.png";
import { ShowOnLogin, ShowOnLogout } from "../components/protect/HiddenLink";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/">
              <img src={salonLogo} alt="Salon Logo" className="logo" />
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <ul className="navbar-items">
                <ShowOnLogout>
                  <li>
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                  <li>
                    <Link to="/login" className="nav-link">
                      <button className="btn btn-primary">Login</button>
                    </Link>
                  </li>
                </ShowOnLogout>
                <ShowOnLogin>
                  <li>
                    <Link to="/dashboard" className="nav-link">
                      <button className="btn btn-primary">Dashboard</button>
                    </Link>
                  </li>
                </ShowOnLogin>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
