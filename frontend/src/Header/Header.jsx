import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShowOnLogin, ShowOnLogout } from "../components/protect/HiddenLink";
import { selectUser, setLogout } from "../redux/features/auth/authSlice";
import { logoutUser } from "../services/authService";
import "./Header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const logout = async () => {
    await logoutUser();
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <header className="header-minimal">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="header-logo-link">Salon<span>360</span></Link>
        </div>
        <nav className={`header-nav${menuOpen ? " open" : ""}`}>
          <ul className="header-nav-list">
            <ShowOnLogout>
              <li><Link to="/register" className="header-link">Register</Link></li>
              <li><Link to="/login" className="header-link">Login</Link></li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li><Link to="/home" className="header-link">Home</Link></li>
              <li><Link to="/dashboard" className="header-link">Dashboard</Link></li>
              <li><button className="header-btn-logout" onClick={logout}>Logout</button></li>
              <li className="header-user">{user?.name}</li>
            </ShowOnLogin>
          </ul>
        </nav>
        <button className="header-hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;