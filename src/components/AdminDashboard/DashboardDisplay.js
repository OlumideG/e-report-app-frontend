import React,{useState} from "react";
import Chart from "../Chart/Chart";
import AdminNav from "./AdminNav";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FcSupport } from "react-icons/fc";
import { MdSettings, MdImportContacts } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { FaHome } from "react-icons/fa";
import "../UserDashboard/UserDashboard.css";
import Nav from "../UserDashboard/Nav";
import "../../App.css";
import "./Admin.css";
import "../../components/UserDashboard/UserDashboard.css";
// MdDashboard

const DashboardDisplay = ({ setAdminAuth }) => {
  const [forwardedReports, setForwardedReports] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);

  const allForwardedReports = () => {

    fetch(`https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/forwarded`)
      .then(res => res.json())
      .then(result => {
        setForwardedReports(result.length)

        // console.log(result)
      })
      .catch(err => {
        console.log(err.message);

      })
  }

  allForwardedReports()

  const allpendingReports = () => {

    fetch(`https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/pending`)
      .then(res => res.json())
      .then(result => {
        setPendingReports(result.length)

        // console.log(result)
      })
      .catch(err => {
        console.log(err.message);

      })
  }

  allpendingReports()


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

  return (
    <div className="user-dashboard chat">
      <header className="">
        {/*nav-tool */}
        <AdminNav />
      </header>

      <div className="dashboard-container ">
        <div className="dashboard-handler">
          <div className="sidebar">
            <ul className="sidebar-list">
              <div className="home-container">
                <Link to="/admindashboard">
                  <button className="home-text">
                    <FaHome className="home-icon" />
                    <h3 className="home-te">Home</h3>
                  </button>
                </Link>
              </div>
              <div className="profile-container">
                <Link to="/dashboardDisplay">
                  <button className="profile-text">
                    <MdIcons.MdDashboard className="profile-icon" />
                    <h3 className="profile-te"> Dashboard </h3>
                  </button>
                </Link>
              </div>

              <div className="support-container">
                <Link to="/adminSupport">
                  <button className="support-text">
                    <MdSettings className="support-icon" />
                    <h3 className="support-te"> support</h3>
                  </button>
                </Link>
              </div>

              <div className="setting-container">
                <Link to="/adminSettings">
                  <button className="setting-text">
                    <FcSupport className="setting-icon" />
                    <h3 className="setting-te">settings</h3>
                  </button>
                </Link>
              </div>

              <div className="logout-container">
                <button className="logout-text" onClick={(e) => logout(e)}>
                  <IoMdLogOut className="logout-icon" />
                  <span className="logout-te"> Log out</span>
                </button>
              </div>
            </ul>
          </div>

      <div className="dashboard-content">
            <div className="chartCards">
              <div className="chartPending">
                <h1>{pendingReports}</h1>

                <p>Pending</p>
              </div>

              <div className="chartForwarded">
                <h1>{forwardedReports}</h1>

                <p> Forwarded</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/*
      <div className="chart">
        <Chart className="chartBody" />
      </div>
    */}
    </div>
  );
};

export default DashboardDisplay;
