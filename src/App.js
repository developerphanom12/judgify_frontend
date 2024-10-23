import "./App.css";
import { Login } from "./Components/Admin-Creating-New-Event/LoginPages/Login/Login";
import { Layout } from "./MainLayout/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./MainLayout/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Layout>
     
        <Routes>
        <Route path="login" element={<Login />}/>
          <Route path="/sidebar" element={<Sidebar/>}/>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
