import { useState } from "react";
import { NavLink } from "react-router-dom";
const activeLink = ({ isActive }) => (isActive ? "active" : "link");
const activeSublink = ({ isActive }) => (isActive ? "active" : "link");

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  if (item.childrens) {
    return (
      <div
        className={
          expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"
        }
      >
        <div className="sidebar-title" onClick={() => setExpandMenu(!expandMenu)} style={{ cursor: 'pointer' }}>
          <span>
            {item.icon && <div className="icon">{item.icon}</div>}
            <div>{item.title}</div>
          </span>
          <div className="dropdown-indicator" style={{ marginLeft: 'auto', fontWeight: 700 }}>
            {expandMenu ? "▲" : "▼"}
          </div>
        </div>
        {expandMenu && (
          <div className="sidebar-dropdown-menu">
            {item.childrens.map((child, index) => (
              <div key={index} className="s-child">
                <NavLink to={child.path} className={activeSublink} style={{ display: 'block' }}>
                  {child.icon && <span className="icon">{child.icon}</span>}
                  <span>{child.title}</span>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeLink}>
        <div className="sidebar-item s-parent">
          <div className="sidebar-title">
            <span>
              {item.icon && <div className="icon">{item.icon}</div>}
              <div>{item.title}</div>
            </span>
          </div>
        </div>
      </NavLink>
    );
  }
};

export default SidebarItem;
