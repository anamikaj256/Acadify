import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { UserProvider } from "./context/UserContext";


import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CGPA from "./pages/CGPA";
import Assignments from "./pages/Assignments";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      
      <Sidebar Provider open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Routes>
            
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/cgpa" element={<CGPA />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <UserProvider>
    <Router>
      <Toaster position="top-center" />
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </UserProvider>
);

export default App;   
