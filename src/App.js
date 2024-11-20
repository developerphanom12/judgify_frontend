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

function App() {
  const userCheck = useSelector((state) => state?.users?.userCheck);
  const token = localStorage.getItem("token");
  const isAuthenticated = userCheck && token;

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
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-password" element={<NewPassword />} />

          {/* Protected Routes */}

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
                path="/create-new-event/:id"
                element={<CreateNewEvent />}
              />
              <Route path="/award-categories" element={<AwardCategories />} />

              <Route path="/stripe-setting" element={<StripeSetting />} />
              <Route
                path="/event-live-preview"
                element={<EventLivePreview />}
              />
              <Route path="/sidebar" element={<Sidebar />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
