import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Model from "../ModelLogin";
import SignupModel from "../ModelSignup";
//import "./styles/index.css";
import { useState } from "react";
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from "react-toastify";
export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [signupModelOpen, setSignupModelOpen] = useState(false);
  const handleLoginModel = () => {
    setModelOpen(true);
  };
  const handleSignupModel = () => {
    setSignupModelOpen(true);
  };
  return (
    <>
      <nav className="nav">
        <Link to="/" className="sitetitle">GS KIBYAGIRA</Link>
        <ul className={`links ${isMobile ? "mobile" : ""}`}>
          {/* <CustomLink className="alink" to="/books">About Us</CustomLink> */}
          <CustomLink className="alink" to="/login">Mission & Vision</CustomLink>
          <CustomLink className="alink" to="/login">About Us</CustomLink>
          <CustomLink className="alink" to="/login">Contact Us</CustomLink>
          <li className="alink" onClick={handleLoginModel}>LAMIS</li>
          <li className="alink" onClick={handleSignupModel}>Signup</li>
        </ul>
        <button onClick={() => setIsMobile(!isMobile)} className="mobile">
          {isMobile ? <CloseIcon /> : <DehazeIcon className="dehazeicon" />}
        </button>
      </nav>
      <ToastContainer position="top-center" />
      {modelOpen && <Model closeModel={() => setModelOpen(false)} />}
      {signupModelOpen && <SignupModel closeModel={() => setSignupModelOpen(false)} />}
    </>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
