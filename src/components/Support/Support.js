import React from 'react';
import logo from '../../../src/Logo.svg';
import { useHistory, Link } from "react-router-dom";
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
                <Link to="/userdashboard"> <button className="home-text">
                  <FaHome className="home-icon" />
                  <span className="home-te">Home</span></button>
                </Link>
              </div>

              <div className="support-container">
                <Link to="/profile">
                  <button className="support-text">
                    <RiProfileLine className="support-icon" />
                    <span className="support-te"> Profile </span>
                  </button>
                </Link>
              </div>

              <div className="support-container">
                <Link to="/support">
                  <button className="support-text">
                    <MdSettings className="support-icon" />
                    <span className="support-te"> support</span>
                  </button>
                </Link>
              </div>

              <div className="setting-container">
                <Link to="/settings">
                  <button className="setting-text">
                    <FcSupport className="setting-icon" />
                    <span className="setting-te">settings</span>
                  </button>
                </Link>
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
