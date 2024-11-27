import "./App.css";
import { Login } from "./Components/Admin-Creating-New-Event/LoginPages/Login/Login";
import { Layout } from "./MainLayout/Layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from "./MainLayout/Sidebar/Sidebar";
import { ForgetPassword } from "./Components/Admin-Creating-New-Event/LoginPages/ForgetPassword/ForgetPassword";
import { Register } from "./Components/Admin-Creating-New-Event/LoginPages/Register/Register";
import { Dashboard } from "./Components/Admin-Creating-New-Event/Dashboard/Dashboard";
import { MyEvents } from "./Components/Admin-Creating-New-Event/MyEvents/MyEvent/MyEvents";
import { AdminProfile } from "./Components/Admin-Creating-New-Event/AdminProfile/AdminProfile";
import { TitleBar } from "./Components/Global/TitleBar/TitleBar";
import { RegistrationForm } from "./Components/Admin-Creating-New-Event/MyEvents/RegistrationForm/RegistrationForm";
import { CreateNewEvent } from "./Components/Admin-Creating-New-Event/MyEvents/CreateNewEvent/CreateNewEvent";
import { StripeSetting } from "./Components/Admin-Creating-New-Event/MyEvents/StripeSetting/StripeSetting";
import { EventLivePreview } from "./Components/EventLivePreview/EventLivePreview";
import { useSelector } from "react-redux";
import { Otp } from "./Components/Admin-Creating-New-Event/LoginPages/Otp/Otp";
import { NewPassword } from "./Components/Admin-Creating-New-Event/LoginPages/NewPassword/NewPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AwardCategories } from "./Components/Admin-Creating-New-Event/MyEvents/AwardCategories/AwardCategories";
import { CreateNewEventPost } from "./Components/Admin-Creating-New-Event/MyEvents/CreateNewEvent/CreateNewEventPost";
import { AwardCategoriesPost } from "./Components/Admin-Creating-New-Event/MyEvents/AwardCategories/AwardCategoriesPost";
import { Test } from "./Components/Admin-Creating-New-Event/Test/Test";
import { UserRegister } from "./Components/User-Flow-While-Registration/UserLoginPages/UserRegister/UserRegister";
import { UserLogin } from "./Components/User-Flow-While-Registration/UserLoginPages/UserLogin/UserLogin";
import { UserSubmissionDetails } from "./Components/User-Flow-While-Registration/UserSubmissionDetails/UserSubmissionDetails";
import { UserRegistrationProfile } from "./Components/User-Flow-While-Registration/UserRegistrationProfile/UserRegistrationProfile";
import { UserDashboard } from "./Components/User-Flow-While-Registration/UserDashboard/UserDashboard";
import { UserTitlebar } from "./Components/Global/User-Flow/UserTitleBar/UserTitleBar";
import { UserPendingPayment } from "./Components/User-Flow-While-Registration/UserPendingPayment/UserPendingPayment";
import { UserBottomBar } from "./Components/Global/User-Flow/UserBottomBar/UserBottomBar";
import { UserForgetPassword } from "./Components/User-Flow-While-Registration/UserLoginPages/UserForgetPassword/UserForgetPassword";
import { UserNewPassword } from "./Components/User-Flow-While-Registration/UserLoginPages/UserNewPassword/UserNewPassword";
import { UserOtp } from "./Components/User-Flow-While-Registration/UserLoginPages/UserOTP/UserOtp";
// import Formapp from "./Components/Admin-Creating-New-Event/MyEvents/RegistrationForm/ParentRegistrationForm/Formapp";

function App() {
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  const isAuthenticated = userCheck && token;

  const userFlowCheck = useSelector((state) => state?.users?.userFlowCheck);
  const userFlowtoken = localStorage.getItem("token");
  const userFlowAuthenticated = userFlowCheck && userFlowtoken;

  return (
    <div className="App">
      <Layout>
        <ToastContainer
          className="toast-container"
          toastClassName="toast-message"
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route
            path="/user-forget-password"
            element={<UserForgetPassword />}
          />
          <Route path="/user-otp" element={<UserOtp />} />

          <Route path="/user-new-password" element={<UserNewPassword />} />

          <Route
            path="/user-submission-details"
            element={<UserSubmissionDetails />}
          />

          {isAuthenticated ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-events" element={<MyEvents />} />
              <Route path="/admin-profile" element={<AdminProfile />} />
              <Route path="/title-bar" element={<TitleBar />} />
              <Route path="/registration-form" element={<RegistrationForm />} />
              <Route path="/create-new-event" element={<CreateNewEvent />} />
              <Route
                path="/create-new-event-post"
                element={<CreateNewEventPost />}
              />
              <Route
                path="/create-new-event/:id"
                element={<CreateNewEvent />}
              />
              <Route path="/award-categories" element={<AwardCategories />} />
              <Route
                path="/award-categories-post"
                element={<AwardCategoriesPost />}
              />

              <Route path="/stripe-setting" element={<StripeSetting />} />
              <Route path="/test" element={<Test />} />
              <Route
                path="/event-live-preview"
                element={<EventLivePreview />}
              />
              <Route path="/sidebar" element={<Sidebar />} />
              {/* <Route path="/form-app" element={<Formapp />} /> */}

            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          )}

          {userFlowAuthenticated ? (
            <>
              <Route
                path="/user-registration-profile"
                element={<UserRegistrationProfile />}
              />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/user-titleBar" element={<UserTitlebar />} />
              <Route path="/user-bottom-bar" element={<UserBottomBar />} />
              <Route
                path="/user-pending-payment"
                element={<UserPendingPayment />}
              />
            </>
          ) : (
            <>
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/user-register" element={<UserRegister />} />
            </>
          )}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
