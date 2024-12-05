import React, { useEffect, useState } from "react";
// import { Sidebar } from "../Sidebar/Sidebar";
import "./Layout.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/logoaward.png";
import { RxDashboard } from "react-icons/rx";
import { Sidemenu } from "../../Components/Global/GlobalText";
import event from "../../Assets/event.png";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  userCheckAction,
  userDataAction,
  UserDetails,
  userFlowCheckAction,
  userFlowDataAction,
} from "../../Components/Redux/Users/action";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");

  const userFlowCheck = useSelector((state) => state?.users?.userFlowCheck);
  const userFlowtoken = localStorage.getItem("token");

  useEffect(() => {}, [dispatch]);
  const [selectedLink, setSelectedLink] = useState("dashboard");
  const [userselectedLink, setUserSelectedLink] = useState("dashboard");

  const location = useLocation(); // Get the current route
  const isUserSubmissionDetails =
    location.pathname === "/user-submission-details"; //

  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const handleUserLinkClick = (link) => {
    setUserSelectedLink(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userCheckAction(false));
    dispatch(UserDetails(""));
    dispatch(userDataAction(""));
    navigate("/login");
  };

  const handleUserFlowLogout = () => {
    localStorage.removeItem("token");
    dispatch(userFlowCheckAction(false));
    dispatch(UserDetails(""));
    dispatch(userFlowDataAction(""));
    navigate("/user-login");
  };

  return (
    <>
      <div className="main_bar">
        {userCheck && token ? (
          <div className="sideBar">
            <div className="logo_img">
              <img src={logo} alt="logo" />
            </div>

            <div className="menu_div">
              <div className="menu_click_div">
                <Link
                  to="/dashboard"
                  className={selectedLink === "dashboard" ? "selected" : ""}
                  onClick={() => handleLinkClick("dashboard")}
                >
                  <RxDashboard />
                  <span>
                    <Sidemenu className="s-color">Dashboard</Sidemenu>
                  </span>
                </Link>

                <Link
                  to="/my-events"
                  className={selectedLink === "myevents" ? "selected" : ""}
                  onClick={() => handleLinkClick("myevents")}
                >
                  <img src={event} alt="event_icon" />
                  <span>
                    <Sidemenu className="s-color">My Events</Sidemenu>
                  </span>
                </Link>

                <Link
                  to="/admin-profile"
                  className={selectedLink === "adminprofile" ? "selected" : ""}
                  onClick={() => handleLinkClick("adminprofile")}
                >
                  <LuGraduationCap style={{ height: "20px" }} />

                  <span>
                    <Sidemenu>Admin Profile</Sidemenu>
                  </span>
                </Link>
              </div>

              <div className="Logout_main_div">
                {userCheck && token ? (
                  <div className="logout_div" onClick={handleLogout}>
                    <MdOutlineLogout />

                    <span>
                      <Sidemenu className="s-color">Logout</Sidemenu>
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

         {userFlowCheck && userFlowtoken ? ( 
          <>
            {!isUserSubmissionDetails && (

              <div className="sideBar">
                <div className="logo_img">
                  <img src={logo} alt="logo" />
                </div>

                <div className="menu_div">
                  <div className="menu_click_div">
                    <Link
                      to="/user-dashboard"
                      className={
                        userselectedLink === "dashboard" ? "selected" : ""
                      }
                      onClick={() => handleUserLinkClick("dashboard")}
                    >
                      <RxDashboard />
                      <span>
                        <Sidemenu className="s-color">Dashboard</Sidemenu>
                      </span>
                    </Link>

                    <Link
                      to="/"
                      className={
                        userselectedLink === "/"
                          ? "selected"
                          : "/"
                      }
                      // onClick={() =>
                      //   handleUserLinkClick("dashboard")
                      // }
                    >
                      <img src={event} alt="event_icon" />
                      <span>
                        <Sidemenu className="s-color">
                          Submission Details
                        </Sidemenu>
                      </span>
                    </Link>

                    {/* <Link
                      to="/user-registration-profile"
                      className={
                        userselectedLink === "userregistrationprofile"
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        handleUserLinkClick("userregistrationprofile")
                      }
                    >
                      <LuGraduationCap style={{ height: "20px" }} />

                      <span>
                        <Sidemenu>My Profile</Sidemenu>
                      </span>
                    </Link> */}


                  </div>

                  <div className="Logout_main_div">
                    {userFlowCheck && userFlowtoken ? (
                      <div
                        className="logout_div"
                        onClick={handleUserFlowLogout}
                      >
                        <MdOutlineLogout />

                        <span>
                          <Sidemenu className="s-color">Logout</Sidemenu>
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              
           )} 


          </>
        ) : (
          ""
        )}

        <div className="main_body">{children}</div>
      </div>
    </>
  );
};
