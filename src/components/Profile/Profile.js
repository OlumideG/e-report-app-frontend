import React, { useState, useEffect } from 'react';
import logo from '../../../src/Logo.svg';
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { FcSupport } from "react-icons/fc";
import { RiProfileLine } from 'react-icons/ri';
import { MdSettings } from "react-icons/md";
import { IoMdLogOut } from 'react-icons/io';
import Nav from "../UserDashboard/Nav";
import decode from 'jwt-decode';
import '../../App.css';
import '../UserDashboard/UserDashboard.css';
import "./profiledashboard.css";



const User = ({ info, index }) =>
    <div>
        <div className="welcome-user">
            <h1 className="welcome-user-text capital-letter">Name:  {info.first_name} {info.last_name}</h1>
            <h1 className="welcome-user-text">Email: {info.user_email}</h1>
        </div>
    </div>

const Profile = ({ setAuth }) => {
    const [reports, setReports] = useState([])

    const [name, setName] = useState([
        { first_name: "" },
        { last_name: "" }
    ])

    useEffect(() => {


        const { user } = decode(localStorage.token);
        // console.log(localStorage.token, "Local Storage Token");
        // console.log(user, "The user")

        fetch(`https://ancient-citadel-22859.herokuapp.com/dashboard/home/${user}`)
            .then(res => res.json())
            .then(result => {
                setReports(result)
                // console.log(result)
            })
            .catch(err => {
                console.log(err.message);

            })



        fetch(`https://ancient-citadel-22859.herokuapp.com/userinfo/username/${user}`)
            .then(response => response.json())
            .then(username => {
                setName(username)

                // console.log(username)
            })
            .catch(err => {
                console.log(err.message);

            })
    }, []);


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
        <div className="profiledashboard">
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
                                    >
                                 <button className="home-text">
                                        <div>
                                            <i class="fa fa-home fa-3x home-fa "></i>
                                        </div>  
                                    <span className="home-te">Home</span>
                                    </button>
                                </NavLink>
                            </div>

                            <div className="profile-container">
                                <NavLink to="/profile"
                                    activeClassName="active"
                                >
                                    <button className="profile-text">
                                        <div>
                                            <i class="fa fa-users fa-3x profile-fa"></i>
                                        </div>
                                        <span className="profile-te"> Profile </span>
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
                        {
                            name.map((info, index) => (
                                <User
                                    key={index}
                                    index={index}
                                    info={info}
                                />
                            ))}
                    </div>
                     <div>
                     <h1>Total Reports Number :{reports.length}</h1>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile;
