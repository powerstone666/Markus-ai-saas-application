import Sidebar from "./Navbar/sidebar"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from "./Navbar/navbar";
import Dashboard from "./Components/dashboard";
import {BrowserRouter as Router, Route, Routes,useLocation} from 'react-router-dom';
import Conversation from "./Components/conversation";
import CodeGeneration from "./Components/codegeneration";
import ImageGeneration from "./Components/imagegeneration";
import MusicGeneration from "./Components/musicgeneration";
import Aisearch from "./Components/aiseaarch";

const MainComponent = () => {
  const location = useLocation();
  
  // Define routes where the Navbar should be hidden
  const hideNavbarRoutes = ["/app"]; // Add more paths to this array if needed

  return (
    <>
      <Sidebar />
      <main className="md:pl-72">
        {/* Conditionally render the Navbar */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/codegeneration" element={<CodeGeneration/>} />
          <Route path="/imagegeneration" element={<ImageGeneration/>} />
          <Route path="/musicgeneration" element={<MusicGeneration/>} />
          <Route path="/aisearch" element={<Aisearch/>} />
        </Routes>
      </main>
    </>
  );
};

// Wrap your main component in the Router in App.js
export default function App() {
  return (
    <Router>
      <MainComponent />
    </Router>
  );
}