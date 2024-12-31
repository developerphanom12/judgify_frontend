import React, { useEffect, useState } from "react";
import "./Layout.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/logoaward.png";
import overview from "../../Assets/overview.png";
import manage from "../../Assets/manage.png";
import coupann from "../../Assets/coupann.png";
import { RxDashboard } from "react-icons/rx";
import { Sidemenu, Sidesubmenu } from "../../Components/Global/GlobalText";
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
import { IoIosArrowForward } from "react-icons/io";
import { matchPath } from "react-router-dom";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  const userFlowCheck = useSelector((state) => state?.users?.userFlowCheck);
  const userFlowtoken = localStorage.getItem("token");

  useEffect(() => {}, [dispatch]);
  const [selectedLink, setSelectedLink] = useState("dashboard");
  const [userselectedLink, setUserSelectedLink] = useState("dashboard");

  const location = useLocation();
  const isUserSubmissionDetails =
    location.pathname === "/user-submission-details";

  const navigate = useNavigate();

  const isAdminFlowRoute = [
    "/event-overview",
    "/event-details",
    "/submissionid",
    "/backdoor-access",
    "/award-directory",
    "/award-category",
    "/forms",
    "/coupans",
    "/top-bar",
    "/jury-round",
    "/jury-round-data",
    "/create-jury-round-post",
    "/create-jury-round",
    "/successfully-created-judge-round",
    "/shortlist-entry-form",
    "/view-group",
    "/jury-assignment",
    "/customise-allocation",
    "/nominee-listing",
    "/order-list",
    "/entrants-list",
    "/finance-report",
    "/jury-score-report",
    "/entry-form-report",
  ].includes(location.pathname);

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

  useEffect(() => {
    const path = location.pathname;
    if (matchPath({ path: "/update-jury-post/:roundId", exact: true }, path)) {
      console.log("Matched update-jury-post path");
      setSelectedLink("juryrounds");
    }
    else if (path === "/event-overview") {
      setSelectedLink("eventoverview");
    } else if (path === "/event-details") {
      setSelectedLink("eventdetails");
    } else if (path === "/award-category") {
      setSelectedLink("awardcategory");
    } else if (path === "/forms") {
      setSelectedLink("forms");
    } else if (path === "/jury-round") {
      setSelectedLink("juryrounds");
    } else if (path === "/jury-assignment") {
      setSelectedLink("juryassignment");
    } else if (path === "/customise-allocation") {
      setSelectedLink("customiseallocation");
    } else if (path === "/nominee-listing") {
      setSelectedLink("nominee");
    } else if (path === "/order-list") {
      setSelectedLink("orders");
    } else if (path === "/finance-report") {
      setSelectedLink("financereport");
    } else if (path === "/jury-score-report") {
      setSelectedLink("juryscorereport");
    } else if (path === "/entry-form-report") {
      setSelectedLink("entryformreport");
      
    } 
    

    else if (path === "/create-jury-round-post") {
      setSelectedLink("juryrounds");
      
    }
    else if (path === "/successfully-created-judge-round") {
      setSelectedLink("juryrounds");
      
    }
    
    else if (path === "/coupans") {
      setSelectedLink("coupans");
    } else {
      setSelectedLink("dashboard");  // Default to dashboard if no match
    }
    console.log("Current Path:", location.pathname);

  }, [location.pathname]);  //

  return (
    <>
      <div className="main_bar">
        {userCheck && token ? (
          <>
            {isAdminFlowRoute ? (
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
                      to="/event-overview"
                      className={
                        selectedLink === "eventoverview" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("eventoverview")}
                    >
                      <img src={overview} alt="event_icon" />
                      <span>
                        <Sidemenu className="s-color">Event Overview </Sidemenu>
                      </span>
                    </Link>


                  {/* MAnage Event Start */}
                    <Link>
                      <img src={event} alt="event_icon" />
                      <span>
                        <Sidemenu className="s-color">Manage Event </Sidemenu>
                      </span>
                    </Link>

                    <Link
                      to="/event-details"
                      className={
                        selectedLink === "eventdetails" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("eventdetails")}
                       style={{marginLeft:"10px"}}
                    >
                      <IoIosArrowForward  style={{ height: "15px" }} />

                      <span>
                        <Sidesubmenu>Event Details</Sidesubmenu>
                      </span>
                    </Link>


                    <Link
                      to="/award-category"
                      className={
                        selectedLink === "awardcategory" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("awardcategory")}
                   style={{marginLeft:"10px"}}
                    >
                     <IoIosArrowForward  style={{ height: "15px" }} />
                      <span>
                        <Sidesubmenu>Award Categories</Sidesubmenu>
                      </span>
                    </Link>

                    <Link
                      to="/forms"
                      className={
                        selectedLink === "forms" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("forms")}
                   style={{marginLeft:"10px"}}
                    >
                     <IoIosArrowForward  style={{ height: "15px" }} />

                      <span>
                        <Sidesubmenu>Forms</Sidesubmenu>
                      </span>
                    </Link>

                  {/* MAnage Event End */}


                  {/* MAnage Jury Start */}
                   <Link>
                       <img src={manage} alt="event_icon"/>
                        <span>
                        <Sidemenu className="s-color">Manage Jury </Sidemenu>
                        </span>
                    </Link>

                    <Link
                      to="/jury-round"
                      className={
                        selectedLink === "juryrounds" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("juryrounds")}
                   style={{marginLeft:"10px"}}
                    >
                   <IoIosArrowForward  style={{ height: "15px" }} />
                      <span>
                        <Sidesubmenu>Jury Rounds</Sidesubmenu>
                      </span>
                    </Link>

                    <Link
                      to="/jury-assignment"
                      className={
                        selectedLink === "juryassignment" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("juryassignment")}
                   style={{marginLeft:"10px"}}
                    >
                      <IoIosArrowForward  style={{ height: "15px" }} />

                      <span>
                        <Sidesubmenu>Jury Assignment</Sidesubmenu>
                      </span>
                    </Link>

                    <Link
                      to="/customise-allocation"
                      className={
                        selectedLink === "customiseallocation" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("customiseallocation")}
                   style={{marginLeft:"10px"}}
                    >
                    <IoIosArrowForward  style={{ height: "15px" }} />


                      <span>
                        <Sidesubmenu>Customise Allocation</Sidesubmenu>
                      </span>
                    </Link>


                   {/* MAnage Jury End */}

                  {/* Manage Entry Form Start */}
                  <Link>
                        <img src={manage} alt="event_icon"/>
                        <span>
                        <Sidemenu className="s-color">Manage Entry form</Sidemenu>
                        </span>
                    </Link>

                    <Link
                      to="/nominee-listing"
                      className={
                        selectedLink === "nominee" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("nominee")}
                   style={{marginLeft:"10px"}}
                    >
                     <IoIosArrowForward  style={{ height: "15px" }} />
                      <span>
                        <Sidesubmenu>Nominee</Sidesubmenu>
                      </span>
                    </Link>

                    <Link
                      to="/order-list"
                      className={
                        selectedLink === "orders" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("orders")}
                   style={{marginLeft:"10px"}}
                    >
                      <IoIosArrowForward  style={{ height: "15px" }} />

                      <span>
                        <Sidesubmenu>Orders</Sidesubmenu>
                      </span>
                    </Link>
                  {/* Manage Entry Form End */}


                  {/* Manage Reports Start */}

                  <Link>
                        <img src={manage} alt="event_icon"/>
                        <span>
                        <Sidemenu className="s-color">Manage Reports</Sidemenu>
                        </span>
                    </Link>

                    <Link
                      to="/finance-report"
                      className={
                        selectedLink === "financereport" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("financereport")}
                   style={{marginLeft:"10px"}}
                    >
                     
                     <IoIosArrowForward  style={{ height: "15px" }} />
                      <span>
                        <Sidesubmenu>Finance Report</Sidesubmenu>
                      </span>
                    </Link>

                    <Link
                      to="/jury-score-report"
                      className={
                        selectedLink === "juryscorereport" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("juryscorereport")}
                   style={{marginLeft:"10px"}}
                    >
                      <IoIosArrowForward  style={{ height: "15px" }} />

                      <span>
                        <Sidesubmenu>Jury Score Report</Sidesubmenu>
                      </span>
                    </Link>


                    
                    <Link
                      to="/entry-form-report"
                      className={
                        selectedLink === "entryformreport" ? "selected" : ""
                      }
                      onClick={() => handleLinkClick("entryformreport")}
                   style={{marginLeft:"10px"}}
                    >
                      <IoIosArrowForward  style={{ height: "15px" }} />

                      <span>
                        <Sidesubmenu>Entry Form Report</Sidesubmenu>
                      </span>
                    </Link>




                  {/* Manage Reports End */}

                    <Link
                      to="/coupans"
                      className={selectedLink === "coupans" ? "selected" : ""}
                      onClick={() => handleLinkClick("coupans")}
                    >
                      <img src={coupann} alt="event_icon"/>

                      <span>
                        <Sidemenu>Coupans</Sidemenu>
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
                      className={
                        selectedLink === "adminprofile" ? "selected" : ""
                      }
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
            )}
          </>
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
                      className={userselectedLink === "/" ? "selected" : "/"}
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
                      <LuGraduationCap style={{ height: "15px" }} />

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
