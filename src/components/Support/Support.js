import React from 'react';
import logo from '../../../src/Logo.svg';
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { FcSupport } from "react-icons/fc";
import { MdSettings } from "react-icons/md";
import { RiProfileLine } from 'react-icons/ri';
import { IoMdLogOut } from 'react-icons/io';
import Nav from '../UserDashboard/Nav';
import '../../App.css';
import "./supportdashboard.css";


const Support = ({ setAuth }) => {

  let history = useHistory();
  function landingPage() {
    history.push("/");
  };

  function loginPage() {
    history.push("/");
    window.location.reload();
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      // setAuth(false);
      toast.success("Logout successfully");
      window.location.reload();
      loginPage();
    } catch (err) {
      console.error(err.message);
    }
  };


  return (
    <div className="supportdashboard">
        <header>
            <Nav />
        </header>


      <div className="dashboard-container">
        <div className="dashboard-handler">
          <div className="sidebar">
            <ul className="sidebar-list">
              <div className="home-container">
                <NavLink 
                  to="/userdashboard"
                  activeClassName="active"
                  > <button className="home-text">
                    <div>
                      <i class="fa fa-home fa-3x home-fa "></i>
                    </div> 
                  <span className="home-te">Home</span></button>
                </NavLink>
              </div>

              <div className="profile-container">
                <NavLink 
                  to="/profile"
                  activeClassName="active">
                  <button className="profile-text">
                    <div>
                      <i class="fa fa-users fa-3x profile-fa"></i>
                    </div>
                    <span className="support-te"> Profile </span>
                  </button>
                </NavLink>
              </div>

              <div className="support-container">
                <NavLink 
                    to="/support"
                    activeClassName="active"
                    >
                  <button className="support-text">
                    <div>
                      <i class="fa fa-question-circle fa-3x support-fa"></i>
                    </div>
                    <span className="support-te"> support</span>
                  </button>
                </NavLink>
              </div>

              <div className="setting-container">
                <NavLink 
                  to="/settings"
                  activeClassName="active"
                  >
                  <button className="setting-text">
                    <div>
                      <i class="fa fa-cog fa-3x setting-fa"></i>
                    </div>
                    <span className="setting-te">settings</span>
                  </button>
                </NavLink>
              </div>

              <div className="logout-container">
                <button className="logout-text" onClick={e => logout(e)}>
                  <IoMdLogOut className="logout-icon" />
                  <span className="logout-te"> Log out</span>
                </button>
              </div>
            </ul>
          </div>

          <div className="space">
            <div>
              <h1>Keep claim. We will upload the Support very soon</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Support;
