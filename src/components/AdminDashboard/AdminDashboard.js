import React, { useState, useEffect } from "react";
import logo from "../../../src/Logo.svg";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FcSupport } from "react-icons/fc";
import { MdSettings } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { FaHome } from "react-icons/fa";
import decode from "jwt-decode";
import Chart from "../Chart/Chart";
import "../UserDashboard/UserDashboard.css";
import AdminNav from "./AdminNav";
import "./Admin.css";
import "../../App.css";

// const Cards = ({ info, index, deleteReport,forwardReport }) => {
//      return(
//       <div className="todo">
//       <div className="card" style={{ width: "18rem" }}>
//         <div className="card-body">
//           <h5 className="card-title font-weight-bold text-uppercase form-font">{info.category} at {info.address} </h5>
//           <p className="card-text"> Report Id: {info.id} </p>
//           <p className="card-text"> User Id: {info.user_id} </p>
//           <p className="card-text">Report status: {info.status} </p>
//           <p className="card-text"> Private Report: {info.privatereport.toString()} </p>
//           <p className="card-text">Local Government: {info.localgovernment} </p>
//           <p className="card-text"> {info.details} </p>
//           <img className="card-img-top" src={info.imageurl} alt="report" style={{ width: "200px", height: "150px" }} />
//           <div className="edit-delete">
//           <button onClick={() => forwardReport(index, info)}> <i className="fa fa-mail-forward fa-2x"></i></button>
//             <button onClick={() => deleteReport(index, info)}> <i className="fa fa-trash fa-2x"></i></button>
//           </div>

//         </div>
//       </div>
//     </div>

//      )

// }

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div className="accordion-wrapper">
        <div
          className={`accordion-title ${isOpen ? "open" : ""}`}
          onClick={() => setOpen(!isOpen)}
        >
          {title}
        </div>
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

const AdminReportCards = ({ info, index, deleteReport, forwardReport }) => (
  <div className="todoAdmin">
    <div className="wrapperAdmin">
      {/* <div className="card-body"> */}
      <div className={"card-body-admin"}>
        <div className="card-body-title">
          <h5 className="card-title">
            {info.category} at {info.address}
          </h5>
          <h5 className="card-title"> {info.localgovernment}</h5>
          <h5 className="card-title"> {info.status}</h5>
        </div>

        <div className="accordion-body-admin">
          <Accordion className="title-admin" title="More">
            <div
              className="myview-admin">
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={info.imageurl}
                >
                  <img
                    className="card-img"
                    src={info.imageurl}
                    alt=""
                    style={{ width: "200px", height: "150px" }}
                  />
                </a>
              </div>
              <div className="accordion-details">
                <h5 className="card-title">Report Id: {info.id}</h5>
                <h5 className="card-title">User ID: {info.user_id}</h5>
                <h5 className="card-title">
                  Private Report: {info.privatereport.toString()}
                </h5>
                <h5 className="card-title">Report Status: {info.status}</h5>
                <h5 className="card-title">Report Date: {info.date}</h5>
                <h5 className="card-title"> Report Time: {info.time}</h5>
                <h5 className="card-title">
                  Report Local Government: {info.localgovernment}
                </h5>
                <div className="word-break">
                  <h5 className="card-title">
                    {" "}
                    Report Details: {info.details}
                  </h5>
                </div>
              </div>
            </div>
          </Accordion>
        </div>

        {/*
        <div className="">
        <button className="editbutton" style={{}}>{info.time}</button>
        </div>
        */}

        <div className="delbutton-body">
          <button
            className="delbutton-1"
            onClick={() => forwardReport(index, info)}
          >
            {" "}
            <i className="fa fa-mail-forward fa-2x"></i>
          </button>
          <button
            className="delbutton-2"
            style={{
              fontSize: "14px",
              position: "relative",
              bottom: "60px",
              left: "740px",
            }}
            onClick={() => deleteReport(index, info)}
          >
            {" "}
            <i className="fa fa-trash fa-2x"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
);

function AdminDashboard({ setAdminAuth, index, info }) {
  const [adminSearch, setAdminSearch] = useState("");
  const [adminFilteredReports, setAdminFilteredReports] = useState([]);
  const [forwardedReports, setForwardedReports] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);

  const [reports, setReports] = useState([
    {
      category: "",
      address: "",
      details: "",
      imageurl: "",
      status: "",
      privatereport: false,
      localgovernment: "",
      user_id: "",
    },
  ]);

  let history = useHistory();
  function landingPage() {
    history.push("/");
  }

  // const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch(
        "https://ancient-citadel-22859.herokuapp.com/dashboard/",
        {
          method: "POST",
          headers: { jwt_token: localStorage.token },
        }
      );

      const parseData = await res.json();
      console.log(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Logging out of the application
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAdminAuth(false);
      toast.success("Logout successfully");

       window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();

    // const { admin } =  decode(localStorage.token);
    // console.log(localStorage.token,"Local Storage Token");
    // console.log(admin, "The Admin user")

    fetch(`https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home`)
      .then((res) => res.json())
      .then((result) => {
        setReports(result);

        // console.log(result)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    // search through reports
    setAdminFilteredReports(
      reports.filter(
        (report) =>
          report.address.toLowerCase().includes(adminSearch.toLowerCase()) ||
          report.category.toLowerCase().includes(adminSearch.toLowerCase()) ||
          report.details.toLowerCase().includes(adminSearch.toLowerCase()) ||
          report.localgovernment
            .toLowerCase()
            .includes(adminSearch.toLowerCase()) ||
          report.status.toLowerCase().includes(adminSearch.toLowerCase()) ||
          report.date.toLowerCase().includes(adminSearch.toLowerCase())
      )
    );
  }, [adminSearch, reports]);

  const deleteReport = (x, info) => {
    // console.log("deleted");
    const reportNumber = `${info.id}`;
    // console.log(x)
    // console.log(reportNumber)
    fetch(
      `https://ancient-citadel-22859.herokuapp.com/dashboard/home/${reportNumber}`,
      {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "DELETE",
        mode: "cors",
      }
    );
    window.location.reload();
    toast.success(`Report ${reportNumber} Deleted`);
  };

  const forwardReport = (x, info) => {
    const reportNumber = `${info.id}`;
    // console.log(x)
    // console.log(reportNumber)
    fetch(
      `https://ancient-citadel-22859.herokuapp.com/dashboard/forwarded/${reportNumber}`,
      {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "PATCH",
        mode: "cors",
      }
    );
    // window.location.reload();
    toast.success(`Report ${reportNumber} Forwaded`);
  };

  const allForwardedReports = () => {
    fetch(
      `https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/forwarded`
    )
      .then((res) => res.json())
      .then((result) => {
        setForwardedReports(result.length);

        // console.log(result)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  allForwardedReports();

  const allpendingReports = () => {
    fetch(
      `https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/pending`
    )
      .then((res) => res.json())
      .then((result) => {
        setPendingReports(result.length);

        // console.log(result)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  allpendingReports();


  const allReportsButton = () => {
    // console.log("all reports")

    fetch(`https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home`)
      .then((res) => res.json())
      .then((result) => {
        setReports(result);

        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const forwardedReportsButton = () => {
    console.log("forwarded reports");

    fetch(
      `https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/forwarded`
    )
      .then((res) => res.json())
      .then((result) => {
        setReports(result);

        // console.log(result)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const pendingReportsButton = () => {
    // console.log("pending reports")

    fetch(
      `https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/pending`
    )
      .then((res) => res.json())
      .then((result) => {
        setReports(result);

        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const privateReportsButton = () => {
    // console.log("private reports")

    fetch(
      `https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/private`
    )
      .then((res) => res.json())
      .then((result) => {
        setReports(result);

        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="user-dashboard">
      {/*
      <nav className="navbar navbar-light" style={{ backgroundColor: "#27496D" }}>
        <img src={logo} alt="Logo" onClick={landingPage} />
        <div style={{ display: "flex" }}>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search"
              placeholder="Search all reports"
              onChange={(e) => setAdminSearch(e.target.value)}
            />
    */}
      {/* <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button> */}
      {/* </form> */}
      {/* <i className="fa fa-user fa-3x" style={{ marginLeft: "10px" }}></i> */}
      {/* <h2>Welcome {name}</h2> */}
      {/*
          <button onClick={e => logout(e)} className="btn btn-danger">
            Logout
          </button>
        </div>
      </nav>
          */}

      <header className="">
        <AdminNav />
      </header>
      {/* SideBar */}

      <div className="dashboard-container">
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

          <div className="dashboard-content dc-admin">
          {/*
            <div>
              <h1> forwarded Reports number:{forwardedReports}</h1>
              <h1> pending Reports number:{pendingReports}</h1>
              <h1> Total Reports : {forwardedReports + pendingReports}</h1>
            </div>
          */} 

            <div className='admin-welcome'>
                  <h5>Welcome Admin</h5>
                  <p>You have {forwardedReports + pendingReports} total reports </p>
            </div>

            <div className="admin-part-2">
              <div className="history-container">
                <button className="history-text" onClick={allReportsButton}>
                  All
                </button>
              </div>

              <div className="nearby-reports">
                <button
                  className="nearby-reports-text"
                  onClick={forwardedReportsButton}
                >
                  Forwarded
                </button>
              </div>

              <div className="nearby-reports">
                <button
                  className="nearby-reports-text"
                  onClick={pendingReportsButton}
                >
                  Pending
                </button>
              </div>

              <div className="nearby-reports">
                <button
                  className="nearby-reports-text"
                  onClick={privateReportsButton}
                >
                  Private
                </button>
              </div>
            </div>

            <div className="todo-list">
              {reports === 0 ? (
                <div>Nothing Here</div>
              ) : (
                adminFilteredReports.map((info, index) => (
                  //   <Cards
                  //     key={index}
                  //     index={index}
                  //     info={info}
                  //     deleteReport={deleteReport}
                  //     forwardReport ={forwardReport}
                  //   />
                  // ))}

                  <AdminReportCards
                    key={index}
                    index={index}
                    info={info}
                    deleteReport={deleteReport}
                    forwardReport={forwardReport}
                  />
                ))
              )}
            </div>
          {/*
            <div className="chartContainer">
              <div className="chart">
                <Chart />
              </div>
            </div>
          */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
