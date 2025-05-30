import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import menu from "../../data/sidebar";
import { setLogout } from "../../redux/features/auth/authSlice";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((open) => !open);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <div className="layout">
      <aside className={`sidebar${isOpen ? " open" : ""}`}>
        <div className="sidebar-header">
          <button className="toggle-button" onClick={toggle} aria-label="Toggle sidebar">
            <HiMenuAlt3 />
          </button>
        </div>
        <nav className="menu">
          {menu.map((item, index) => (
            <SidebarItem key={index} item={item} isOpen={isOpen} />
          ))}
        </nav>
        <div className="footer">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>
      {isOpen && <div className="sidebar-overlay" onClick={toggle}></div>}
      <main className={`main-content${isOpen ? " sidebar-open" : ""}`}>{children}</main>
    </div>
  );
};

export default Sidebar;
