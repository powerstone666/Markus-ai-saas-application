import Sidebar from "./Navbar/sidebar";
import Navbar from "./Navbar/navbar";
import Dashboard from "./Components/Dashboard/dashboard";
import Conversation from "./Components/Conversation/conversation";
import CodeGeneration from "./Components/Codegeneration/codegeneration";
import ImageGeneration from "./Components/ImageGeneration/imagegeneration";
import MusicGeneration from "./Components/Music/musicgeneration";
import Aisearch from "./Components/AISearch/aiseaarch";
import Landing from "./Components/Landing/landing";
import Register from "./Components/Authentication/register";
import Signin from "./Components/Authentication/signin";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import { useContext } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Context } from "./main";

export default function App() {
  const location = useLocation();
  const context = useContext(Context);
  const token = context.token;

  const hideNavbarRoutes = ["/", "/register", "/login"];
  const applyPaddingRoutes = [
    "/dashboard",
    "/conversation",
    "/codegeneration",
    "/imagegeneration",
    "/musicgeneration",
    "/aisearch",
  ];
  const shouldShowNavigation = !hideNavbarRoutes.includes(location.pathname);
  const shouldApplyPadding = applyPaddingRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowNavigation && <Sidebar />}
      <main className={shouldApplyPadding ? "md:pl-72" : ""}>
        {shouldShowNavigation && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" /> : <Signin />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/conversation"
            element={
              <PrivateRoute>
                <Conversation />
              </PrivateRoute>
            }
          />
          <Route
            path="/codegeneration"
            element={
              <PrivateRoute>
                <CodeGeneration />
              </PrivateRoute>
            }
          />
          <Route
            path="/imagegeneration"
            element={
              <PrivateRoute>
                <ImageGeneration />
              </PrivateRoute>
            }
          />
          <Route
            path="/musicgeneration"
            element={
              <PrivateRoute>
                <MusicGeneration />
              </PrivateRoute>
            }
          />
          <Route
            path="/aisearch"
            element={
              <PrivateRoute>
                <Aisearch />
              </PrivateRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
