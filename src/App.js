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
import EditFieldModal from "./Components/Admin-Creating-New-Event/MyEvents/RegistrationForm/RegistrationChild/EditFieldModal";
import FormCanvas from "./Components/Admin-Creating-New-Event/MyEvents/RegistrationForm/RegistrationChild/FormCanvas";
import FormPreview from "./Components/Admin-Creating-New-Event/MyEvents/RegistrationForm/RegistrationChild/FormPreview";
import Side from "./Components/Admin-Creating-New-Event/MyEvents/RegistrationForm/RegistrationChild/Side";
import LoaderDot from "./Components/LoaderDot";
import { LoadingProvider } from "./Components/LoadingContext";

import { Coupans } from "./Components/Admin-Flow-While-Existing-Event/Coupans/Coupans";
import { TopBar } from "./Components/Admin-Flow-While-Existing-Event/TopBar/TopBar";
import { Forms } from "./Components/Admin-Flow-While-Existing-Event/ManageEvent/Forms/Forms/Forms";
import { EventDetails } from "./Components/Admin-Flow-While-Existing-Event/ManageEvent/EventDetails/EventDetail/EventDetails";
import { SubmissionId } from "./Components/Admin-Flow-While-Existing-Event/ManageEvent/EventDetails/SumbissionId/SubmissionId";
import { BackdoorAccess } from "./Components/Admin-Flow-While-Existing-Event/ManageEvent/EventDetails/BackdoorAccess/BackdoorAccess";
import { AwardDirectory } from "./Components/Admin-Flow-While-Existing-Event/ManageEvent/EventDetails/AwardDirectory/AwardDirectory";
import { JuryRound } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/JuryRound/JuryRounds/JuryRound";
import { JuryRoundExistingData } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/JuryRound/JuryRoundExistingData/JuryRoundExistingData";
// import { CreateJuryRound } from "./Components/Admin-Flow-While-Existing-Event/CreateJuryRound/CreateJuryRound";
// import { CreateJuryRoundPost } from "./Components/Admin-Flow-While-Existing-Event/CreateJuryRound/CreateJuryRoundPost";

import { ViewGroup } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/JuryRound/ViewGroup/ViewGroup";
import { ShortListEntryForm } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/JuryRound/ShortListEntryForm/ShortListEntryForm";
import { CreateJuryRoundPost } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/JuryRound/CreateJuryRound/CreateJuryRoundPost";
import { CreateJuryRound } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/JuryRound/CreateJuryRound/CreateJuryRound";
import { JuryAssignment } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/JuryAssignment/JuryAssignment";
import { CustomiseAllocation } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/CustomiseAllocation/CustomiseAllocation";
import { Nominee } from "./Components/Admin-Flow-While-Existing-Event/Manage Entry Form/Nominee/Nominee";
import { Orders } from "./Components/Admin-Flow-While-Existing-Event/Manage Entry Form/Orders/Orders";
import { Entrants } from "./Components/Admin-Flow-While-Existing-Event/Manage Entry Form/Entrants/Entrants";
import { FinanceReport } from "./Components/Admin-Flow-While-Existing-Event/ManageReports/FinanceReport/FinanceReport";
import { JuryScoreReport } from "./Components/Admin-Flow-While-Existing-Event/ManageReports/JuryScoreReport/JuryScoreReport";
import { EntryFormReport } from "./Components/Admin-Flow-While-Existing-Event/ManageReports/EntryFormReport/EntryFormReport";
import { SuccessfullyCreateJudgeRound } from "./Components/Admin-Flow-While-Existing-Event/ManageJury/JuryRound/SuccessfullyCreateJudgeRound/SuccessfullyCreateJudgeRound";
import { EventOverview } from "./Components/Admin-Flow-While-Existing-Event/EventOverview/EventOverview";
import { AwardCategory } from "./Components/Admin-Flow-While-Existing-Event/ManageEvent/AwardCategory/AwardCategory";
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
      <LoadingProvider>
        <LoaderDot />
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
                <Route path="/test" element={<Test />}/>

                <Route
                  path="/event-live-preview"
                  element={<EventLivePreview />}
                />

                <Route path="/sidebar" element={<Sidebar />}/>
                {/* ------- */}

                <Route
                  path="/registration-form"
                  element={<RegistrationForm />}
                />
                <Route path="/edit-field-modal" element={<EditFieldModal />}/>
                <Route path="/form-canvas" element={<FormCanvas />} />
                <Route path="/form-preview" element={<FormPreview />} />
                <Route path="/side" element={<Side />} />
                <Route path="/preview-loader" element={<LoaderDot />} />

                {/* Admin Flow While Existing Event ------- */}

             
                <Route path="/event-overview" element={<EventOverview/>}/>
                <Route path="/event-details" element={<EventDetails/>}/>
                <Route path="/submissionid" element={<SubmissionId/>}/>
                <Route path="/backdoor-access" element={<BackdoorAccess/>}/>
                <Route path="/award-directory" element={<AwardDirectory/>}/>
                <Route path="/award-category" element={<AwardCategory/>}/>
                <Route path="/forms" element={<Forms />}/>
                <Route path="/coupans" element={<Coupans />}/>
                <Route path="/top-bar" element={<TopBar />}/>
                <Route path="/jury-round" element={<JuryRound />}/>
                <Route
                  path="/jury-round-data"
                  element={<JuryRoundExistingData />}
                />

                <Route
                  path="/create-jury-round-post"
                  element={<CreateJuryRoundPost />}
                />

                <Route
                  path="/create-jury-round"
                  element={<CreateJuryRound />}
                />

            <Route
                  path="/successfully-created-judge-round"
                  element={<SuccessfullyCreateJudgeRound />}
                />
                <Route
                  path="/shortlist-entry-form"
                  element={<ShortListEntryForm/>}
                />
                <Route path="/view-group" element={<ViewGroup/>}/>
                <Route path="/jury-assignment" element={<JuryAssignment/>}/>
                <Route path="/customise-allocation" element={<CustomiseAllocation/>}/>
                <Route path="/nominee-listing" element={<Nominee/>}/>
                <Route path="/order-list" element={<Orders/>}/>
                <Route path="/entrants-list" element={<Entrants/>}/>
                <Route path="/finance-report" element={<FinanceReport/>}/>
                <Route path="/jury-score-report" element={<JuryScoreReport/>}/>
                <Route path="/entry-form-report" element={<EntryFormReport/>}/>

                {/* Admin Flow While Existing Event ------- */}
             

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
      </LoadingProvider>
    </div>
  );
}

export default App;
