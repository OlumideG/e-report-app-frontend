import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import logo from "../../../src/Logo.svg";
import { FaBars } from "react-icons/fa";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { AdminSidebarData } from "./AdminSidebarData";

const AdminNav = ({ setAdminAuth }) => {
  const [sidebars, setSideBars] = useState(false);

  const showSidebar = () => {
    setSideBars(!sidebars);
  };

        const logout = async (e) => {
                e.preventDefault();
                try {
                        localStorage.removeItem("token");
                        setAdminAuth(false);
                        window.location.reload();
                        toast.success("Logout successfully");
                } catch (err) {
                        console.error(err.message);
                }
        };


  const bellNotification = () => {
    // e.preventDefault();
    try {
      console.log("notification!!!");
    } catch (err) {
      console.error(err.message);
    }
  };

  let history = useHistory();
  function landingPage() {
    history.push("/");
  }

 
  return (
    <>
      <div className="navigation_toolbar nav-tool">
        <div>
          <Link to="#" >
            <FaBars className="menu-bars" onClick={showSidebar} />
          </Link>
        </div>

        <div className="nav-logo">
          <img src={logo} alt="Logo" onClick={landingPage} />
        </div>

        <div className="spacer" />

        <div style={{}}>
          <button onClick={bellNotification}>
            <i className="fa fa-bell fa-3x" style={{ marginLeft: "10px" }}></i>
          </button>

          {/* <button onClick={(e) => logout(e)} className="btn btn-danger">
                        Logout
                </button> */}
        </div>
      </div>

      <nav className={sidebars ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineClose onClick={showSidebar} />
            </Link>
          </li>
          {AdminSidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}

          
            <button onClick={(e) => logout(e)}>Logout</button>
          
        </ul>
      </nav>
    </>
  );
};

export default AdminNav;
